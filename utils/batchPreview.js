const basePath = process.cwd();
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const buildTypes = ['yesEars', 'noEars'];
const buildTypeNums = [27, 18];

const { preview } = require(`${basePath}/src/config.js`);

function getDivinity(attributes) {
  for (const element of attributes) {
    if (element.trait_type == 'Divine Protection') {
      return element.value;
    }
  }
  return '';
}

for (let i = 0; i < 2; i++) {
  for (let j = 0; j < buildTypeNums[i]; j++) {
    let buildDir = `${basePath}/build_${buildTypes[i]}${j.toString().padStart(2, '0')}`;
    // read json data
    let rawdata = '';
    if (!preview.sorted) {
      rawdata = fs.readFileSync(`${buildDir}/json/_metadata.json`);
    } else {
      rawdata = fs.readFileSync(`${buildDir}/json/_sortedMetadata.json`);
    }
    const metadataList = JSON.parse(rawdata);

    const saveProjectPreviewImage = async (_data) => {
      // Extract from preview config
      let { thumbWidth, thumbPerRow, imageRatio, imageName, numbering } = preview;
      // Calculate height on the fly
      const thumbHeight = thumbWidth * imageRatio;
      // Prepare canvas
      const previewCanvasWidth = thumbWidth * thumbPerRow;
      const previewCanvasHeight =
        thumbHeight * Math.ceil(_data.length / thumbPerRow);
      // Shout from the mountain tops
      console.log(
        `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} thumbnails.`
      );

      // Initiate the canvas now that we have calculated everything
      if (preview.sorted) {
        imageName = "sortedPreview.png";
      }
      const previewPath = `${buildDir}/${imageName}`;
      const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight);
      const previewCtx = previewCanvas.getContext("2d");

      // Iterate all NFTs and insert thumbnail into preview image
      // Don't want to rely on "edition" for assuming index
      for (let index = 0; index < _data.length; index++) {
        const nft = _data[index];
        await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => {
          previewCtx.font = "20px Arial";
          previewCtx.drawImage(
            image,
            thumbWidth * (index % thumbPerRow),
            thumbHeight * Math.trunc(index / thumbPerRow),
            thumbWidth,
            thumbHeight
          );
          if (numbering) {
            previewCtx.fillText(nft.edition.toString(), thumbWidth * (index % thumbPerRow), thumbHeight * Math.trunc(index / thumbPerRow) + 20);
            previewCtx.fillText(getDivinity(nft.attributes), thumbWidth * (index % thumbPerRow), thumbHeight * Math.trunc(index / thumbPerRow) + 40);
          }
        });
      }

      // Write Project Preview to file
      fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
      console.log(`Project preview image located at: ${previewPath}`);
    };

    saveProjectPreviewImage(metadataList);
  }
}