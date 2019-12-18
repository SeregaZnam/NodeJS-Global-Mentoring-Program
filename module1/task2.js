import csv from 'csvtojson';
import fs from 'fs';
import path from 'path'
import { pipeline } from 'stream';

if (process.argv[2] === 'ram') {
  const pathCSVFileRAM = path.join(__dirname, 'csv', 'file.r.csv');
  const pathTXTFileRAM = path.join(__dirname, 'txt', 'file.r.txt');
  const writableStream = fs.createWriteStream(pathTXTFileRAM);

  csv({
    headers: ['book', 'author', 'amount', 'price'],
    includeColumns: /(book|author|price)/,
    colParser: {
      'book': 'string',
      'author': 'string',
      'price': 'number'
    }
  }).fromFile(pathCSVFileRAM).pipe(writableStream);
} else {
  const pathCSVFile = path.join(__dirname, 'csv', 'file.csv');
  const pathTXTFile = path.join(__dirname, 'txt', 'file.txt');
  
  csv({
    headers: ['book', 'author', 'amount', 'price'],
    includeColumns: /(book|author|price)/,
    colParser: {
      'book': 'string',
      'author': 'string',
      'price': 'number'
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
