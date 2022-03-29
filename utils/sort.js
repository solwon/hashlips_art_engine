const fs = require("fs");

const basePath = process.cwd();
const layersDir = `${basePath}/layers`;
const buildDir = `${basePath}/build`;
const metaDir = `${buildDir}/json`;
const {
    baseUri,
    description,
    namePrefix,
    rarityDelimiter,
  } = require(`${basePath}/src/config.js`);


let rawdata = fs.readFileSync(`${buildDir}/json/_metadata.json`);
let data = JSON.parse(rawdata);
const size = data.length;

const orders = ['Background', 'Fur', 'Eyes', 'Mouth'];

const getRarityWeight = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = Number(
        nameWithoutExtension.split(rarityDelimiter).pop()
    );
    if (isNaN(nameWithoutWeight)) {
        nameWithoutWeight = 1;
    }
    return nameWithoutWeight;
};

const cleanName = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
    return nameWithoutWeight;
};

const getElements = (path) => {
    elements = {};
    const list = fs.readdirSync(path).filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
    for (const obj of list) {
        if (obj.includes("-")) {
            throw new Error(`layer name can not contain dashes, please fix: ${obj}`);
        }
        elements[cleanName(obj)] = getRarityWeight(obj);
    }
    return elements;
};

const layersSetup = (layersOrder) => {
    layers = {};
    for (const obj of layersOrder) {
        layers[obj] = getElements(`${layersDir}/${obj}/`);
    }
    return layers;
};

const setup = layersSetup(orders);

function compare(a, b) {
    for (let i = 0; i < orders.length; i++) {
        const aValue = a.attributes.find(x => x.trait_type == orders[i]).value;
        const bValue = b.attributes.find(x => x.trait_type == orders[i]).value;
        if (aValue) {
            if (bValue) {
                const aWeight = setup[orders[i]][aValue];
                const bWeight = setup[orders[i]][bValue];
                if (aWeight == bWeight) {
                    if (aValue == bValue) continue;
                    else return -(aValue.localeCompare(bValue));
                }
                return bWeight - aWeight;
            } else {
                return 1;
            }
        } else {
            if (bValue) {
                return -1;
            } else {
                continue;
            }
        }
    }
    return 0;
}

data = data.sort(compare);
fs.writeFileSync(`${buildDir}/json/_sortedMetadata.json`, JSON.stringify(data, null, 2));
