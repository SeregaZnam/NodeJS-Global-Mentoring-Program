import express, { response } from 'express';
import http from 'http';
import users from './users.json';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(express.json());
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', (req, res) => {
  // res.send('Hello World!')
  const indexTemplatePath = path.join(__dirname, 'templates', 'index.html');

  fs.readFile(indexTemplatePath, (err, data) => {
    res.setHeader('Content-Type', 'text/html');
    if (!err) {
      res.statusCode = 200;
      res.write(data);
      res.end();
    }
  });
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

app.get('/users', (req, res) => {
  res.json(users);
})

app.get('/users/:id', (req, res) => {
  const userID = users.find(user => user.id == req.params.id);
  res.json(userID);
});

app.post('/users', urlencodedParser, (req, res) => {
  const usersPath = path.join(__dirname, 'users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const userData = req.body;
  const newUser = {
    id: userData.id,
    login: userData.login,
    password: userData.password,
    age: userData.age,
    isDeleted: false
  }
  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.status(200).send();
});

app.put('/update/:id', urlencodedParser, (req, res) => {
  const usersPath = path.join(__dirname, 'users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  users.forEach(user => {
    if (user.id == req.params.id) {
      user.login = req.body.login;
      user.password = req.body.password;
      user.age = req.body.age;
    }
  });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.json(users.find(user => user.id == req.params.id));
  res.status(200).send();
});
