const express = require('express');
const app = express();
const fs = require('fs')
const Datastore = require('nedb');
require('dotenv').config();
// console.log(process.env.map_accessToken);


// process.env.PORT refers to the env port wherever this is run
// if there's one, use it, else use 3000
const port = process.env.PORT || 3000;


app.listen(port, () => console.log('listening at ${port}'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({ name: 'soohian', status: '💪' });
// database.insert({ name: 'soohian', status: '💡' });

const userDataArray = []

app.get('/api', (request, response) => {
    // finds everything in database and returns it
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })

})


app.post('/api', (request, response) => {
    // handle the post request
    const data = request.body;
    const timeNow = Date.now();
    data.timestamp = timeNow;
    database.insert(data);
    // send a json response back to client
    response.json(data);
    // write to file
    // addToFile("user_data.json", JSON.stringify(data));
    // or save to user data array
    // userDataArray.push(data);
});


// This is the same function as saving to nedb database. Except that one is saved with id
// We can probably also generate an id, a consecutive one id++ or something hashed?
function addToFile(_filename, _data) {
    fs.appendFile(_filename, _data + "\n",
        (err) => {
            if (err) { console.log(err) }
        })
}



// untill https://www.youtube.com/watch?v=3ls013DBcww&ab_channel=TheCodingTrain
// untill https://youtu.be/q-lUgFxwjEM (lesson 2.5)


// untill https://www.youtube.com/watch?v=Rz886HkV1j4&ab_channel=TheCodingTrain (3.5 deployment)