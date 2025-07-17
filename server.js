// server.js
// A simple web server using ONLY built-in Node.js modules.
// This does not require 'npm' or any external dependencies like 'express'.

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const projectsDirectory = __dirname; // The directory where this script is running.

/**
 * A helper function to convert a folder name (like 'project-alpha') 
 * into a more readable title (like 'Project Alpha').
 * @param {string} folderName - The name of the folder.
 * @returns {string} A formatted, capitalized name.
 */
function formatFolderName(folderName) {
    return folderName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// A simple map of file extensions to their corresponding MIME types.
// This helps the browser understand what kind of file it's receiving.
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

// Create the HTTP server
const server = http.createServer((req, res) => {

    // --- API Endpoint Logic ---
    // If the browser requests the project list
    if (req.url === '/api/projects') {
        fs.readdir(projectsDirectory, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.error("Could not list the directory.", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Error reading projects directory" }));
                return;
            }

            const projectFolders = files
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name)
                .filter(name => !name.startsWith('.') && name !== 'node_modules');

            const projectsData = projectFolders.map(folder => ({
                folder: folder,
                name: formatFolderName(folder),
                description: `A project located in the '${folder}' directory.`
            }));
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(projectsData));
        });
        return; // End execution for the API endpoint
    }

    // --- Static File Serving Logic ---
    // For all other requests, try to serve a file.
    let requestedUrl = req.url === '/' ? '/index.html' : req.url;
    
    // Security: Sanitize the file path to prevent access to parent directories.
    let filePath = path.join(projectsDirectory, path.normalize(requestedUrl).replace(/^(\.\.[\/\\])+/, ''));

    // If the request is for a directory (e.g., /project-alpha/), look for an index.html inside it.
    fs.stat(filePath, (err, stats) => {
        if (stats && stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                // If the file doesn't exist, send a 404 Not Found error.
                if (error.code == 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1><p>The requested file was not found on this server.</p>', 'utf-8');
                } else {
                    // For other errors, send a 500 Internal Server Error.
                    res.writeHead(500);
                    res.end('Sorry, an error occurred: '+error.code+' ..\n');
                }
            } else {
                // If the file is found, send it with the correct content type.
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });
});



// Start listening for requests on the specified port.
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`To run, use the command: node ${path.basename(__filename)}`);
});

