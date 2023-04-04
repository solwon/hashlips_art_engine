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

const orders = ['Background', 'Clothing', 'Fur', 'Eyes', 'Eyewear', 'Mouth'];

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
        objName = obj;
        if (obj == 'Fur') {
            if (obj.includes('_headwear')) {
                objName = 'Fur_NoEars';
            } else {
                objName = 'Fur_YesEars';
            }
        }
        layers[obj] = getElements(`${layersDir}/${objName}/`);
    }
    return layers;
};

const setup = layersSetup(orders);

function compare(a, b) {
    for (let i = 0; i < orders.length; i++) {
        const aAtt = a.attributes.find(x => x.trait_type == orders[i]);
        const bAtt = b.attributes.find(x => x.trait_type == orders[i]);
        const aValue = aAtt ? aAtt.value : false;
        const bValue = bAtt ? bAtt.value : false;
        // const aValue = a.attributes.find(x => x.trait_type == orders[i]).value;
        // const bValue = b.attributes.find(x => x.trait_type == orders[i]).value;
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
