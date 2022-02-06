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
    console.log("I got a post request!")
    const data = request.body;
    const timeNow = Date.now();
    data.timestamp = timeNow;

    // write to file
    // addToFile("user_data.json", JSON.stringify(data));
    // save to user data array
    // userDataArray.push(data);

    database.insert(data);
    console.log(database);

    // send a response back to client
    response.json({
        message: "Recorded in database, time: " + data.timestamp,
        latitude: data.lat,
        longitude: data.long
    });
});

function addToFile(_filename, _data) {
    fs.appendFile(_filename, _data + "\n",
        (err) => {
            if (err) { console.log(err) }
        })
}



// untill https://www.youtube.com/watch?v=3ls013DBcww&ab_channel=TheCodingTrain