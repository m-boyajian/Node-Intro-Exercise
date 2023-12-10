// Write a function, cat. It should take one argument, ***path***, and it should read the file with that path, and print the contents of that file. Then, write some code that calls that function, allowing you to specify the path argument via the command line.
const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      process.exit(1);
    } else {
    console.log(data);
    }
  });
}

cat(process.argv[2]);