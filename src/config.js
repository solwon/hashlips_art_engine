const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);
const { pickedDna } = require(`${basePath}/src/dnalist.js`);


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
    isSelection: true,
    growEditionSizeTo: pickedDna.length,
    layersOrder: [
      {
        name: "Divine_Protection",
        options: {
          displayName: "Divine Protection",
          bypassDNA: true,
        },
      },
      { name: "Background" },
      { name: "Sign" },
      {
        name: "Furs",
        options: {
          displayName: "Fur",
        }
      },
      { name: "Tabby" },
      {
        name: "Accesories",
        options: {
          displayName: "Accesory"
        }
      },
      { name: "Clothing" },
      { name: "Eyes" },
      { name: "Eyeware" },
      { name: "Mouth" },
    ],
  },
  {
    isSelection: false,
    growEditionSizeTo: 100,
    layersOrder: [
      {
        name: "Divine_Protection",
        options: {
          displayName: "Divine Protection",
          bypassDNA: true,
        },
      },
      { name: "Background" },
      { name: "Sign" },
      {
        name: "Fur_YesEars",
        options: {
          displayName: "Fur",
        }
      },
      { name: "Tabby" },
      {
        name: "Accesory_YesEars",
        options: {
          displayName: "Accesory"
        }
      },
      { name: "Clothing" },
      { name: "Eyes" },
      { name: "Eyeware" },
      { name: "Mouth" },
    ],
  },
  // {
  //   growEditionSizeTo: 4900,
  //   layersOrder: [
  //     { name: "Background" },
  //     {
  //       name: "Divine_Protection",
  //       options: {
  //         displayName: "Divine Protection"
  //         bypassDNA: true,
  //       },
  //     },
  //     { name: "Sign" },
  //     {
  //       name: "Fur_NoEars",
  //       options: {
  //         displayName: "Fur",
  //       }
  //     },
  //     { name: "Tabby" },
  //     {
  //       name: "Accesory_NoEars",
  //       options: {
  //         displayName: "Accesory"
  //       }
  //     },
  //     { name: "Clothing" },
  //     { name: "Eyes" },
  //     { name: "Eyeware" },
  //     { name: "Mouth" },
  //   ],
  // },
];

const layerConfigurationsWithEars = [
  {
    growEditionSizeTo: 1089,
    layersOrder: [
      { name: "Background" },
      { 
        name: "Divine_Protection",
        options: {
          displayName: "Divine Protection"
        },
      },
      { name: "Sign" },
      {
        name: "Fur_YesEars",
        options: {
          displayName: "Fur",
        }
      },
      { name: "Tabby" },
      { name: "Clothing" },
      {
        name: "Accesory_YesEars",
        options: {
          displayName: "Accesory"
        }
      },
      { name: "Eyes" },
      { name: "Eyeware" },
      { name: "Mouth" },
    ],
  },
];
const layerConfigurationsWithoutEars = [
  {
    growEditionSizeTo: 1089,
    layersOrder: [
      { name: "Background" },
      {
        name: "Divine_Protection",
        options: {
          displayName: "Divine Protection"
        },
      },
      { name: "Sign" },
      {
        name: "Fur_NoEars",
        options: {
          displayName: "Fur",
        }
      },
      { name: "Tabby" },
      { name: "Clothing" },
      {
        name: "Accesory_NoEars",
        options: {
          displayName: "Accesory"
        }
      },
      { name: "Eyes" },
      { name: "Eyeware" },
      { name: "Mouth" },
    ],
  },
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
  thumbPerRow: 70,
  thumbWidth: 350,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
  numbering: true,
  sorted: true,
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
  layerConfigurationsWithEars,
  layerConfigurationsWithoutEars,
  pickedDna,
};
