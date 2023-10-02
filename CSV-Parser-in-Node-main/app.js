const expressFileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const fastCSV = require('@fast-csv/parse');
const app = require('express')();
const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const cookieParser = require('cookie-parser');
const db=require('./model/data.model');
const { Sequelize } = require('sequelize');
app.use(express.json())

app.use(express.urlencoded({urlencoded: true}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options("*", cors());
const port = 3360;
app.listen(port, () => {
  console.log(`app listening at http://0.0.0.0:${port}.`);
});
app.use(expressFileUpload());


db.Sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});


app.post('/parseCSV', async (req, res) => {
  const file = req.files.file;
  if (!file || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const fileUploadPath = __dirname + '/csvFiles/' + file.name;
  const uploadedFileReadStream = fs.createReadStream(fileUploadPath);
  const csvRows = [];
    uploadedFileReadStream
    .pipe(fastCSV.parse({ headers: true, ignoreEmpty: true }))
    .on('error', error => console.error('error', error))
    .on('data', row => csvRows.push(row))
    .on('end', (rowCount) => res.status(200).json({csvRows, rowCount}));
})
module.exports=app;