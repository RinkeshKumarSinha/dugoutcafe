const mongoose = require('mongoose');

const mongoURI =  "mongodb+srv://rinkesh:toor@cluster0.8biap.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"; // Update with your MongoDB connection string

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
        if (err) {
            console.error("Error connecting to MongoDB:", err);
            return callback(err, null, null); // Return the error to the callback
        }

        console.log("Connected to MongoDB");

        try {
            const foodCollection = mongoose.connection.db.collection("food_items");
            const foodData = await foodCollection.find({}).toArray();
            console.log(foodData);
            const categoryCollection = mongoose.connection.db.collection("foodCategory");
            const categoryData = await categoryCollection.find({}).toArray();
            console.log(categoryData);
            callback(null, foodData, categoryData); // Pass the results to the callback
        } catch (error) {
            console.error("Error fetching data from collections:", error);
            callback(error, null, null); // Return the error to the callback
        }
    });
};
