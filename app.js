import express from "express";

const app = express()
const port = 8080;

let id = 0;
const doweets = [];

// middlewares
app.use(express.json());

app.get('/doweets', (req, res) => {
    res.status(200).send(doweets);
});

app.post('/doweets',(req, res) => {
    const doweet = {...req.body, id: id++};
    doweets.push(doweet);
    res.status(201).send(doweet);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
