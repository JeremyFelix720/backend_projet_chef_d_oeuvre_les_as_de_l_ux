import express from "express"
import "dotenv/config"
import cors from 'cors'
import bodyParser from "body-parser";

export default function Root(){

  const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;
  
  require('dotenv').config();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/toto', (req, res) => {
      res.send('Toto');
    });
  
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  
};