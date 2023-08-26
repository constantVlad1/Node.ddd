const express = require('express');
const app = express();
const port = 3000;

const add = (value1,value2) => parseInt(value1) + parseInt(value2);
const substract = (value1,value2) => parseInt(value1) - parseInt(value2);
const multiply = (value1,value2) => parseInt(value1) * parseInt(value2);
const divide = (value1,value2) => parseInt(value1) / parseInt(value2);

const okResult = (result) => ({
    result: result,
    message: "Everythok!"
});

function badRequestResponse() {
    return {
        sum: null,
        message: "both 'value1' and 'value2' and mandatory in the query string"
    };
}

const myLogger = (req, res, next) => {
    const visitTime = new Date();
    console.log(`visited ${req.url} at ${visitTime.toLocaleString()}`);
    next();
  };
app.use(myLogger);

app.get('/add', (req,res) => {
    if(req.query.hasOwnProperty("value1")
    && req.query.hasOwnProperty("value2")) {
let value1 = req.query.value1;
let value2 = req.query.value2
let sum = add(value1,value2)
res.status(200).send(okResult(sum))
} else {
 res.status(400).send(badRequestResponse())
}
})

/add/10/2
app.get('/add/:value1/:value2', (req,res) => {
    const value1 = parseInt(req.params.value1)
    const value2 = parseInt(req.params.value2)
let sum = add(value1,value2)
res.status(200).send(okResult(sum))
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// http://localhost:3000/add?value1=10&value2=2
// http://localhost:3000/substract?value1=10&value2=2
// http://localhost:3000/multiply?value1=10&value2=2
// http://localhost:3000/divide?value1=10&value2=2


