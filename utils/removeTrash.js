const fs = require('fs');
const layerPath = process.cwd() + '/layers';

// delete all files named .bridgesort and desktop.ini in all folders under layerPath
const deleteTrash = (path) => {
    const dirs = fs.readdirSync(path);
    dirs.forEach(directory => {
        const dirPath = path + '/' + directory;
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (file == '.BridgeSort' || file == 'desktop.ini') {
                fs.rmSync(dirPath + '/' + file);
            }
        })
    });
}

deleteTrash(layerPath);