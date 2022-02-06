const express = require('express');
const app = express();
const fs = require('fs')

require('dotenv').config()
    // console.log(process.env.map_accessToken);

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// app.use(express.static(__dirname + '/public'));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

const userDataArray = []

app.post('/api', (request, response) => {
    // handle the post request
    console.log("I got a post request!")
    const data = request.body;
    // write to file
    addToFile("user_data.json", JSON.stringify(data));
    // save to user data array
    userDataArray.push(data);
    console.log("user data array saved", data)

    // send a response back to client
    response.json({
        message: 'Send back to client!',
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