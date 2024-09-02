const csv = require("csv-parser");
const fs = require("fs");

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    let headers = [],
      data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headersCSV) => {
        headers = headersCSV.map((header) => header.toLowerCase());
      })
      .on("data", (dataCSV) => {
        for (let key in dataCSV) {
          if (key !== key.toLowerCase()) {
            dataCSV[key.toLowerCase()] = dataCSV[key];
            delete dataCSV[key];
          }
        }
        data.push(dataCSV);
      })
      .on("end", () => {
        resolve({ headers, data });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
module.exports = parseCSV;
