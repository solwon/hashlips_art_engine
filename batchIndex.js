const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/batchMain.js`);

(() => {
  buildSetup();
  startCreating();
  buildSetup2();
  startCreating2();
  buildSetup3();
  startCreating3();
  buildSetup4();
  startCreating4();
  buildSetup5();
  startCreating5();
  buildSetup6();
  startCreating6();
})();
