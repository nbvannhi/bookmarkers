import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("collection-service listening on port 8080");
});
