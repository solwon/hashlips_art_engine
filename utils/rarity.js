const basePath = process.cwd();
const fs = require("fs");
const layersDir = `${basePath}/layers`;

const { layerConfigurations } = require(`${basePath}/src/config.js`);

const { getElements } = require("../src/main.js");
const csvOutput = `${basePath}/rarity.csv`

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];
let rarityCsv = [];

const getDirName = (_layerName) => {
  if (_layerName == 'Fur_YesEars' || _layerName == 'Fur_NoEars') return 'Furs';
  if (_layerName == 'Headwear_YesEars' || _layerName == 'Headwear_NoEars') return 'Headwears';
  return _layerName;
}

// intialize layers to chart
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
    // get elements for each layer
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${getDirName(layer.name)}/`);
    elements.forEach((element) => {
      // just get name and weight for each element
      let rarityDataElement = {
        trait: element.name,
        weight: element.weight.toFixed(0),
        occurrence: 0, // initialize at 0
      };
      elementsForLayer.push(rarityDataElement);
    });
    let layerName =
      layer.options?.["displayName"] != undefined
        ? layer.options?.["displayName"]
        : layer.name;
    // don't include duplicate layers
    if (!rarityData.includes(layer.name)) {
      // add elements for each layer to chart
      rarityData[layerName] = elementsForLayer;
    }
  });
});

// fill up rarity chart with occurrences from metadata
data.forEach((element) => {
  let attributes = element.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
        // keep track of occurrences
        rarityDataTrait.occurrence++;
      }
    });
  });
});

// convert occurrences to occurence string
for (var layer in rarityData) {
  for (var attribute in rarityData[layer]) {
    // get chance
    let chance =
      ((rarityData[layer][attribute].occurrence / editionSize) * 100).toFixed(2);

    // show two decimal places in percent
    rarityData[layer][attribute].number = rarityData[layer][attribute].occurrence;
    rarityData[layer][attribute].chance = chance;
    rarityData[layer][attribute].occurrence =
      `${rarityData[layer][attribute].occurrence} in ${editionSize} editions (${chance} %)`;
  }
}

// print out rarity data
for (var layer in rarityData) {
  // console.log(`Trait type: ${layer}`);
  rarityCsv.push(['layer', 'trait', 'weight', 'occurrence', 'ratio']);
  for (var trait in rarityData[layer]) {
    // console.log(rarityData[layer][trait]);
    rarityCsv.push([layer, rarityData[layer][trait].trait, rarityData[layer][trait].weight, rarityData[layer][trait].number, rarityData[layer][trait].chance]);
  }
  // console.log();
}
fs.writeFileSync(csvOutput, rarityCsv.map(element => element.join(',')).join('\n'));
