// p5.js setup function runs everytime the window is loaded
function setup() {

    // p5.js canvas command
    // background(255, 0, 0);
    noCanvas();
    // capture from the default video source
    const video = createCapture(VIDEO);
    video.size(320, 240);

    // script to display rainbow async
    // catchRainbow();

    // async function catchRainbow() {
    //     const response = await fetch('rainbow.jpg');
    //     console.log(response);
    //     const blob = await response.blob()
    //     const rainbow = document.getElementById("rainbow");
    //     rainbow.src = URL.createObjectURL(blob);
    // }

    // non-async await way of writing async functions; using .then()
    const response = fetch('exampleText.txt').then(response => {
        return response.blob();
    }).then(blob => {
        return blob.text();
    }).then(text => console.log(text));

    let position, lat, long;
    // let position = {
    //     coords: {
    //         latitude: 1.3795328,
    //         longitude: 103.8942208
    //     },
    // };


    // how to write a function that returns a promise
    // must be declared before calling the function, it's not hoisted up
    const delay = (time) => {
        return new Promise((resolve, reject) => {
            if (isNaN(time)) {
                reject(Error("time must be a number!"));
            }
            setTimeout(resolve, time);
        })
    };


    delay(10000).then((response) => console.log("Returned after 10 seconds"))
        // console.log("test:", test);

    // function delay(time) {
    //     return new Promise((resolve, reject) => {
    //         if (isNaN(time)) {
    //             reject(Error("time cannot be negative"))
    //         }
    //         setTimeout(resolve, time);
    //     })
    // }
    // resolve, not resolve(); else no delay




    if ('geolocation' in navigator) {
        console.log('geolocation is available');


        navigator.geolocation.getCurrentPosition((_position) => {
            position = _position;
            lat = position.coords.latitude;
            long = position.coords.longitude;

            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = long;
            const map = L.map('map').setView([lat, long], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
                // id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1
                    // accessToken: process.env.map_accessToken
            }).addTo(map);




            const typedMessage = document.getElementById('typed-message');

            const submitButton = document.getElementById('submit-button');
            const sendPositionResponse = document.getElementById('send-position-response');

            submitButton.onclick = async() => {

                const mood = typedMessage.value;
                // need to loadPixels from the video capture
                video.loadPixels();
                // canvas.toDataURL() method will store an image resource
                const image64 = video.canvas.toDataURL();

                const data = {
                    lat,
                    long,
                    mood,
                    image64
                };

                L.marker([lat, long]).addTo(map);

                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                };
                // sends a fetch post request to the /api endpoint
                // Able to use await here because the enveloping function is set as async
                const response = await fetch('/api', options);
                // turns the response to json object
                const jsonObj = await response.json()
                console.log(jsonObj);
                typedMessage.value = "";
                sendPositionResponse.textContent = "Mood recorded: " + jsonObj.mood;

            }






        })



    } else {
        console.log('geolocation not available');
    }




}