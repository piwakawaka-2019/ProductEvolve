
const fs = require('fs');

let writeToFile = (filePath,data,unicode = 'utf8') => {
    fs.writeFile(filePath, data, unicode, (err) => {
        if(err)
            console.log(err);
    });
}

let appendToFile = (filePath,data,unicode = 'utf8') => {
    fs.appendFile(filePath, data, (err) => {
        if (err) throw err;
        console.log('Data appended');
    });
}


module.exports = {
    write: writeToFile,
    append: appendToFile
}
