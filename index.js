const express = require('express');
const app = express();
const fs = require('fs')
const Datastore = require('nedb');

require('dotenv').config()
    // console.log(process.env.map_accessToken);

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({ name: 'soohian', status: '💪' });
// database.insert({ name: 'soohian', status: '💡' });

const userDataArray = []

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
    // save to user data array
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