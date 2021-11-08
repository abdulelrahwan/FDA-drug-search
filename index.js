const express = require('express')
var request = require('request');

const app = express()
const port = 3000

const drugInfo = {}

app.get('/drug/:drug', (req, res) => {
  request('https://api.fda.gov/drug/label.json?search=openfda.brand_name:'+req.params.drug, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    body = JSON.parse(body);
    console.log(body.meta)

    drugInfo.description = body.results[0].description
    drugInfo.precautions = body.results[0].precautions
    drugInfo["indications_and_usage"] = body.results[0]["indications_and_usage"]

    //Some drugs have 'warnings' others have 'warnings_and_cautions' :/
    drugInfo.warnings = body.results[0].warnings
    drugInfo["warnings_and_cautions"] = body.results[0]["warnings_and_cautions"]
    res.send(drugInfo)

  }
})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


