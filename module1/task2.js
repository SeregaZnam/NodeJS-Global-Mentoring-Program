const csv = require('csvtojson');
const fs = require('fs');
const pathCSV = './csv';
const pathTXT = './txt';

csv({
  headers: ["book", "author", "amount", "price"],
  includeColumns: /(book|author|price)/,
  colParser: {
    "book": "string",
    "author": "string",
    "price": "number"
  }
})
  .fromFile(`${pathCSV}/file.csv`)
  .then((json) => {
    let data = json.map((obj) => JSON.stringify(obj)).join('\n');
    fs.writeFile(`${pathTXT}/file.txt`, data, (error, data) => {
      if(error) console.log(error)
    });
  });
