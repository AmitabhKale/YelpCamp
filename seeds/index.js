const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedhelpers');
const Campground = require('../models/campground');

// Connection String for mongoDB
mongoose.connect('mongodb://localhost:27017/yelp-campDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Checking the Connection 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

//  This Method will Delete all the data and reloads it with random data 
const seedDb = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random100 = Math.floor(Math.random() * 70);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, at expedita? Blanditiis laboriosam veniam est rem excepturi corrupti fugit dolorem sequi debitis iure! Quasivoluptates assumenda libero quaerat obcaecati!',
            price

        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})