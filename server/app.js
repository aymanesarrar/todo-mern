const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongo = require("mongodb").MongoClient;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 3001;

const url =
  "mongodb+srv://@cluster0.twosw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  if (err) console.log(err);
  //   client.close();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const trips = client.db("tripcost").collection("trips");
app.use(express.json());
app.use(cors());
app.post("/trip", (req, res) => {
  const name = req.body.name;
  console.log(req.body);
  trips.insertOne({ name: name }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  trips.deleteOne({ _id: ObjectId(id) }, (result, err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});
app.get("/trips", (req, res) => {
  trips.find().toArray((err, items) => {
    if (err) {
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ trips: items });
  });
});
app.post("/expense", (req, res) => {});
app.get("/expenses", (req, res) => {});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
