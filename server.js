console.log('may node be with you');
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var connectionString= 'mongodb+srv://giant:Ninjaman123@cluster0.rmkua.mongodb.net/test?retryWrites=true&w=majority';

app.listen(3000, function() {
    console.log('listening on 3000')
})
app.use(bodyParser.urlencoded({ extended: true }))

  MongoClient.connect (connectionString, {
    useUnifiedTopology: true
  }) 
  .then(client => {
    console.log('Connected to Database')
  const db = client.db('Carapp')
  const carCollection = db.collection('car')
  app.post('/car', (req, res) => {
    carCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
      console.log(req.body)
    })
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
      db.collection('car').find().toArray()
      .then(results => {
        console.log(results)
      })  
      .catch(error => console.error(error))  
    })
  })
  