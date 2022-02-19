const express = require('express');
const app = express();
const fs = require('fs')
const Datastore = require('nedb');
require('dotenv').config();
// console.log(process.env.map_accessToken);


// process.env.PORT refers to the env port wherever this is run
// if there's one, use it, else use 3000
const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({ name: 'soohian', status: '💪' });
// database.insert({ name: 'soohian', status: '💡' });

const userDataArray = [];
let imageId = 0;

// homework
// to store the image data as a file, then store the path to the file in the database

app.post('/api', (request, response) => {
    // handle the post request
    const data = request.body;
    const timeNow = Date.now();
    data.timestamp = timeNow;
    const filepath = saveImageToFolder(data);
    data.image64 = filepath;
    database.insert(data);
    // send a json response back to client
    response.json(data);
    // write to file
    // addToFile("user_data.json", JSON.stringify(data));
    // or save to user data array
    // userDataArray.push(data);
});


function saveImageToFolder(data) {
    const image_string = data.image64.replace("data:image/png;base64,", "");
    const buf = Buffer.from(image_string, "base64");
    const filename = "public/capturedImages/cam_" + imageId + ".png";
    fs.writeFile(filename, buf, (err) => { console.error(err) });
    imageId++;
    return filename;
}



// This is the same function as saving to nedb database. Except that one is saved with id
// We can probably also generate an id, a consecutive one id++ or something hashed?
function addToFile(_filename, _data) {
    fs.appendFile(_filename, _data + "\n",
        (err) => {
            if (err) { console.log(err) }
        })
}

// for all.html page
app.get('/api', (request, response) => {
    // finds everything in database and returns it
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        const data_copy = data;
        for (item of data_copy) {
            item.image64 = item.image64.replace("public", "");
        }
        response.json(data_copy);
    })

})

// untill https://www.youtube.com/watch?v=3ls013DBcww&ab_channel=TheCodingTrain
// untill https://youtu.be/q-lUgFxwjEM (lesson 2.5)

// untill https://www.youtube.com/watch?v=Rz886HkV1j4&ab_channel=TheCodingTrain (3.5 deployment)
// untill https://www.youtube.com/watch?v=nZaZ2dB6pow&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=7&ab_channel=TheCodingTrain (check in on the map)

// https://www.youtube.com/watch?v=9Rhsb3GU2Iw&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=14&ab_channel=TheCodingTrain

// 2.7 https://www.youtube.com/watch?v=1mnpn6q25FI&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=15&ab_channel=TheCodingTrain