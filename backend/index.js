const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
var cors=require('cors');
const app = express();
const port = 5000;

app.use(cors())//cors help us to fetch our  data from the browser
app.use(express.json()); //this is amiddleware which is used to use things inside request.body

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
// app.get('/', (req, res) => {
//   res.send('Hello World! and sid')
// })

app.listen(port, () => {
  console.log(`Drive-o-Sid backend listening at http://localhost:${port}`);
});
