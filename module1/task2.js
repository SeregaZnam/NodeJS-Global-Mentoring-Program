import csv from "csvtojson";
import fs from 'fs';
import { pipeline } from 'stream';

if (process.argv[2] === 'ram') {
  const pathCSVFileRAM = './csv/file.r.csv';
  const pathTXTFileRAM = './txt/file.r.txt';
  const readableStream = fs.createReadStream(pathCSVFileRAM);
  const writableStream = fs.createWriteStream(pathTXTFileRAM);

  csv({
    headers: ["book", "author", "amount", "price"],
    includeColumns: /(book|author|price)/,
    colParser: {
      "book": "string",
      "author": "string",
      "price": "number"
    }
  }).fromFile(pathCSVFileRAM).pipe(writableStream);
} else {
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
}