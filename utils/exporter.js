const fs = require("fs");
const basePath = process.cwd();
const exporterDir = `${basePath}/utils/exporter`;
const metadataDir = `${exporterDir}/metadata`;
const dnasDir = `${exporterDir}/dnas`;

const metadataFile = '_metadata.json';
const pickedEditions = []; // range(1, x) to reserve first x editions
const dnasFile = '_dna.json';
const DNA_DELIMITER = '-';
const RARITY_DELIMITER = '#';

const rawMetadata = fs.readFileSync(`${metadataDir}/${metadataFile}`);
const metadata = JSON.parse(rawMetadata);

const pickedCSV = fs.readFileSync('./utils/pickedEditions.csv', {encoding: 'utf8'});
const parsedCSV = pickedCSV.split('\r\n');
console.log(parsedCSV);
parsedCSV.pop();
parsedCSV.forEach(ele => pickedEditions.push(Number(ele)));

const layerOrder = [
    'Divinity',
    'Background',
    'Sign',
    'Fur',
    'Tabby',
    'Headwear',
    'Clothing',
    'Eyes',
    'Eyewear',
    'Mouth'
]
const layerDict = {
    'Fur': 'Furs',
    'Headwear': 'Headwears'
}

const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

const getCleanedName = (filename) => {
    const nameWithoutExtension = filename.split('.')[0];
    const cleanedName = nameWithoutExtension.split(RARITY_DELIMITER)[0];
    return cleanedName;
}

const getFileName = (layer, value) => {
    let layerName = layer;
    if (layer in layerDict) {
        layerName = layerDict[layer];
    }
    const fileList = fs.readdirSync(`${basePath}/layers/${layerName}`);
    for (const file of fileList) {
        if (file.startsWith(value)) {
            // console.log(file);
            let cleanedName = getCleanedName(file);
            return cleanedName;
        }
    }
    Error(`${layer} ${value} not found`);
    return undefined;
} 

let pickedDnas = [];
let usedEditions = [];
console.log(pickedEditions);
let counter = 0;
for (let data of metadata) {
    if (pickedEditions.includes(data.edition)) {
        usedEditions.push(data.edition);
        let attributes = data.attributes;
        let rawDna = [];
        let i = 0, j = 0;
        while (i < layerOrder.length) {
            let layer = layerOrder[i];
            let attribute = attributes[j];
            let fileName = getFileName(layer, attribute.value);
            if (fileName != undefined) {
                i++;
                j++;
            } else {
                fileName = getFileName(layer, 'none');
                i++;
            }
            if (attribute.trait_type == 'Divinity' || attribute.trait_type == 'Background') {
                rawDna.push(`${fileName}?bypassDNA=true`);
            } else {
                rawDna.push(fileName);
            }
        }
        // for (let attribute of attributes) {
        //     const fileName = getFileName(attribute.trait_type, attribute.value);
        //     if (attribute.trait_type == 'Divine Protection') {
        //         rawDna.push(`${fileName}?bypassDNA=true`)
        //     } else {
        //         rawDna.push(fileName);
        //     }
        // }
        pickedDnas.push(rawDna.join(DNA_DELIMITER));
        counter++;
    }
}
if (fs.existsSync(`${dnasDir}/${dnasFile}`)) {
    fs.rmSync(`${dnasDir}/${dnasFile}`);
}

fs.writeFileSync(`${dnasDir}/${dnasFile}`, JSON.stringify(pickedDnas, null, 2));
console.log(counter);
console.log(usedEditions);