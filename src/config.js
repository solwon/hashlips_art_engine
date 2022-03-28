const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "TESTC";
const description = "This is Test Cat";
const baseUri = "ipfs://QmRbDHmU9f8pPsGMfU4uPyFhcbwMpVJYP1A6SWGqKbdjKM";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 200,
    layersOrder: [
      { name: "Background" },
      { name: "Fur1" },
      { name: "Eyes" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 400,
    layersOrder: [
      { name: "Background" },
      { name: "Fur2" },
      { name: "Eyes" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 600,
    layersOrder: [
      { name: "Background" },
      { name: "Fur3" },
      { name: "Eyes" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 800,
    layersOrder: [
      { name: "Background" },
      { name: "Fur4" },
      { name: "Eyes" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 1000,
    layersOrder: [
      { name: "Background" },
      { name: "Fur5" },
      { name: "Eyes" },
      { name: "Mouth" },
    ],
  },
  {
    growEditionSizeTo: 1200,
    layersOrder: [
      { name: "Background" },
      { name: "Fur6" },
      { name: "Eyes" },
      { name: "Mouth" },
    ],
  },
  // {
  //   growEditionSizeTo: 205,
  //   layersOrder: [
  //     { name: "01.BG" },
  //     { name: "02.Fur" },
  //     { name: "03.Tabby" },
  //     { name: "06.Eyes" },
  //     { name: "07.Mouth" },
  //     { name: "08.Nose" },
  //     { name: "09.Headgears" },
  //   ],
  // },
  // {
  //   growEditionSizeTo: 235,
  //   layersOrder: [
  //     { name: "01.BG" },
  //     { name: "02.Fur" },
  //     { name: "03.Tabby" },
  //     { name: "06.Eyes" },
  //     { name: "07.Mouth" },
  //     { name: "08.Nose" },
  //     { name: "10.Hat" },
  //   ],
  // },
  // {
  //   growEditionSizeTo: 250,
  //   layersOrder: [
  //     { name: "01.BG" },
  //     { name: "02.Fur" },
  //     { name: "03.Tabby" },
  //     { name: "06.Eyes" },
  //     { name: "07.Mouth" },
  //     { name: "08.Nose" },
  //     { name: "09.Headgears" },
  //     { name: "10.Hat" },
  //   ],
  // }
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 2000,
  height: 2000,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 64 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 20,
  thumbWidth: 400,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
  numbering: true,
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
