import csv from "csvtojson";
import fs from 'fs';

const pathCSVFile = './csv/file.csv';
const pathTXTFile = './txt/file.txt';

csv({
  headers: ["book", "author", "amount", "price"],
  includeColumns: /(book|author|price)/,
  colParser: {
    "book": "string",
    "author": "string",
    "price": "number"
  }
})
  .fromFile(pathCSVFile)
  .then((json) => {
    let data = json.map((obj) => JSON.stringify(obj)).join('\n');
    fs.writeFile(pathTXTFile, data, (error, data) => {
      if(error) console.log(error)
    });
  });
