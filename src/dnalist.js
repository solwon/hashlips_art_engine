const rawDNA = require('../utils/exporter/dnas/_dna.json');
// const dnaData = JSON.parse(rawDNA);
const dnaList = new Set(rawDNA);

const pickedDna = Array.from(dnaList);

module.exports = {
    pickedDna
}