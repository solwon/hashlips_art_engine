const fs = require("fs");
const basePath = process.cwd();
const exporterDir = `${basePath}/utils/exporter`;
const metadataDir = `${exporterDir}/metadata`;
const dnasDir = `${exporterDir}/dnas`;

const metadataFile = '_metadata.json';
const pickedEditions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
const dnasFile = '_dna.json';
const DNA_DELIMITER = '-';

const rawMetadata = fs.readFileSync(`${metadataDir}/${metadataFile}`);
const metadata = JSON.parse(rawMetadata);

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

const getFileName = (layer, value) => {
    let layerName = layer;
    if (layer in layerDict) {
        layerName = layerDict[layer];
    }
    const fileList = fs.readdirSync(`${basePath}/layers/${layerName}`);
    for (const file of fileList) {
        if (file.startsWith(value)) {
            return file;
        }
    }
    return undefined;
} 

let pickedDnas = [];
for (let data of metadata) {
    if (pickedEditions.includes(data.edition)) {
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
            if (attribute.trait_type == 'Divine Protection') {
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
    }
}
if (fs.existsSync(`${dnasDir}/${dnasFile}`)) {
    fs.rmSync(`${dnasDir}/${dnasFile}`);
}

fs.writeFileSync(`${dnasDir}/${dnasFile}`, JSON.stringify(pickedDnas, null, 2));