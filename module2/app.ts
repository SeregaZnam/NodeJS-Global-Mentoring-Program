import express, { response } from 'express';
import config from './config';
import userRoutes from './routes/userRoutes';
import { sequelize } from './utils/database';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(config.get("port"), async () => {
  console.log(`Server is running at ${config.get("port")}!`);
  
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
