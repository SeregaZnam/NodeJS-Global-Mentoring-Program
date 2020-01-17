import express, { response } from 'express';
import config from './config';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(config.get("port"), () => {
  console.log(`Server is running at ${config.get("port")}!`);
})