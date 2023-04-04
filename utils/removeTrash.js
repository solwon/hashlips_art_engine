const fs = require('fs');
const layerPath = process.cwd() + '/layers';

// delete all files named .bridgesort and desktop.ini in all folders under layerPath
const deleteTrash = (path) => {
    const dirs = fs.readdirSync(path);
    dirs.forEach(directory => {
        const dirPath = path + '/' + directory;
        const files = fs.readdirSync(dirPath);
        if (directory == 'Furs' || directory == 'Headwears') {
            files.forEach(file => fs.rmSync(dirPath + '/' + file));
        } else {
            files.forEach(file => {
                if (file == '.BridgeSort' || file == 'desktop.ini' || file == 'Icon_' || file == '.DS_Store') {
                    fs.rmSync(dirPath + '/' + file);
                } else if (directory == 'Fur_NoEars' || directory == 'Fur_YesEars') {
                    fs.copyFile(dirPath + '/' + file, layerPath + '/Furs/' + file, () => {});
                } else if (directory == 'Headwear_NoEars' || directory == 'Headwear_YesEars') {
                    fs.copyFile(dirPath + '/' + file, layerPath + '/Headwears/' + file, () => {});
                }
            });
        }
    });
}

deleteTrash(layerPath);