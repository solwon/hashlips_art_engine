const fs = require('fs');
const path = require("path");
const { of } = require('ipfs-only-hash');
const { readFileSync } = require('fs-extra');

const basePath = process.cwd();
const buildDir = `${basePath}/build/json`;
const inputDir = `${basePath}/build/images`;
const baseUri = "ipfs://";

const getImages = (_dir) => {
    try {
      return fs
        .readdirSync(_dir)
        .filter((item) => {
          let extension = path.extname(`${_dir}${item}`);
          if (extension == ".png" || extension == ".jpg") {
            return item;
          }
        })
        .map((i) => {
          return {
            filename: i,
            path: `${_dir}/${i}`,
          };
        });
    } catch {
      return null;
    }
  };


const writeMetaData = (_data) => {
    fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
}


const addCID = async () => {
    const images = getImages(inputDir);
    const metadata = JSON.parse(readFileSync(`${basePath}/build/json/_metadata.json`), 'utf8');
    let newMetadataList = [];
    for (const item of metadata) {
        let itemName = item.image.replace("/", "");
        let itemPath = `${inputDir}/${itemName}`;
        let itemData = readFileSync(itemPath);
        await of(itemData).then((cid) => {
            item["image"] = `${baseUri}${cid}`;
        });
        newMetadataList.push(item);
        // console.log(item);
    }
    writeMetaData(JSON.stringify(newMetadataList, undefined, 2));
};


addCID();
