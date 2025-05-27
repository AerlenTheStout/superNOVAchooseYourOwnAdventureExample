This repo is an example of what the supernova folder in the public_html directory of a user's timberlea server could look like. Here the index.html acts as a starting point to look through all the adventures. 

Then each persons adventure would be in its own seperate directory with a index.html starting point.

To get each camper's folder to the server use
`scp -r StudentsFolder jyorke@timberlea.cs.dal.ca:public_html/superNOVA`

Aswell after putting a new file in the superNOVA folder you must do this command to allow the webserver to see the files
`chmod -R a+rX PathToParentDirectoryFromCurrentDirectory`