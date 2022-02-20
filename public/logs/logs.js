let position = {
    coords: {
        latitude: 1.3795328,
        longitude: 103.8942208
    },
};

if ('geolocation' in navigator) {
    console.log('geolocation is available');

    navigator.geolocation.getCurrentPosition((_position) => {
        console.log(_position);
        position = _position;

    });
} else {
    console.log('geolocation not available');
}

getData();
async function getData() {
    const response = await fetch('/api');
    const json = await response.json()
    console.log(json);

    for (item of json) {
        const root = document.createElement('div');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');
        const spacing = document.createElement('br');


        mood.textContent = `mood: ${item.mood}`;
        geo.textContent = `${item.lat} ; ${item.long}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;
        image.alt = "Soo's home"

        root.append(mood, geo, date, image);
        document.body.append(root);
        document.body.append(spacing);
        L.marker([item.lat, item.long]).addTo(map);
    }

}
const map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
        // accessToken: process.env.map_accessToken
}).addTo(map);