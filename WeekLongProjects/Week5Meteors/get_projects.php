<?php
// get_projects.php
// This script scans the current directory for folders and returns them as a JSON object.

/**
 * A helper function to format a folder name like 'project-alpha'
 * into a more readable title like 'Project Alpha'.
 * @param string $folderName The name of the folder.
 * @return string The formatted, capitalized name.
 */
function formatFolderName($folderName) {
    return ucwords(str_replace('-', ' ', $folderName));
}

// Get the path to the directory where this PHP script is located.
$directory = __DIR__;

// Scan the directory to get a list of all files and folders.
$contents = scandir($directory);

// This is where we will store the project data.
$projects = [];

// Loop through every item found in the directory.
foreach ($contents as $item) {
    // We only want items that are directories.
    // We also need to ignore the special '.' and '..' directories.
    if (is_dir($item) && $item != '.' && $item != '..') {
        
        // If it's a valid project folder, create an entry for it.
        $projectData = [
            'folder' => $item,
            'name' => formatFolderName($item),
            'description' => 'A project located in the \'' . $item . '\' directory.'
        ];

        // Add this project's data to our main projects array.
        $projects[] = $projectData;
    }
}

// Set the content type header to application/json.
// This tells the browser that it's receiving JSON data.
header('Content-Type: application/json');

// Encode the PHP array into a JSON string and print it.
// The JavaScript in index.html will receive this output.
echo json_encode($projects);

?>
