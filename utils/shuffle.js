const fs = require("fs");

const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const imageDir = `${buildDir}/images`;
const metaDir = `${buildDir}/json`;
const {
    baseUri,
    description,
    namePrefix,
  } = require(`${basePath}/src/config.js`);

const size = 30;

const list = [...Array(size).keys()].map(x => ++x);

function shuffle(array) {
    let newArray = [].concat(array);
    let currentIndex = newArray.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]];
    }
  
    return newArray;
}

shuffledList = shuffle(list);
// console.log(shuffledList[0]);
// console.log(list);
for (const i of list) {
    // const file = `${imageDir}/${i}.png`;
    const meta = `${metaDir}/${i}.json`;
    // fs.rename(file, `${imageDir}/${i + size}.png`, function (err) { if (err) console.log(err);});
    fs.rename(meta, `${metaDir}/${i + size}.json`, function (err) { if (err) console.log(err);});
}
for (const i of list) {
    // const file = `${imageDir}/${i + size}.png`;
    const meta = `${metaDir}/${i + size}.json`;
    // fs.rename(file, `${imageDir}/${shuffledList[i - 1]}.png`, function (err) { if (err) console.log(err);});
    fs.rename(meta, `${metaDir}/${shuffledList[i - 1]}.json`, function (err) { if (err) console.log(err);});
}
for (const i of list) {
    console.log(i);
    let metajson = fs.readFileSync(`${metaDir}/${shuffledList[i - 1]}.json`);
    let data = JSON.parse(metajson);
    data.name = `${namePrefix} #${shuffledList[i - 1]}`;
    data.image = `${baseUri}/${data.edition}.png`;
    fs.writeFileSync(`${metaDir}/${shuffledList[i - 1]}.json`, JSON.stringify(data, null, 2));
}
