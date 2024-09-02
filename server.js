const express = require("express");
const path = require("path");
const parseCSV = require("./utils/parseCSV");
const parseMessages = require("./utils/parseMessages");
const sendEmail = require("./utils/sendEmail");
const uploadCSV = require("./utils/upload");
const app = express();
const PORT = 8082;

//!Define the path of Uploaded CSV file
const filePath = path.join(__dirname, "uploads/file.csv");

//!Middleware
//to parse form data
app.use(express.urlencoded({ extended: false }));
//to render staic files
app.use(express.static(path.join(__dirname, "public")));

let headers, data;
let messages = [];

//!Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/home.html"));
});

app.post("/send", uploadCSV.single("file"), async (req, res) => {
  const message = req.body.message;
  const csvToJSON = await parseCSV(filePath);
  headers = csvToJSON.headers;
  data = csvToJSON.data;
  console.log(message + headers + data);

  //!Change message according to the CSV file and update data
  messages = await parseMessages(headers, data, message);
  //console.log(messages);

  // //!Sending Mail- UNCOMMET TO MAIL
  // messages.forEach(async (message, index) => {
  //   await sendEmail(data[index].email, "Test", message);
  // });
  res.send("Done");
});

//!Start the server
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));
