const mongoose = require('mongoose');
const mongoURI = //Add your MongoDB URI

const ConnectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const fetched_data = await mongoose.connection.db.collection("food_items");

        try {
            const data = await fetched_data.find({}).toArray();
            const foodCategory = await mongoose.connection.db.collection("food_category");
            
            try {
                const catData = await foodCategory.find({}).toArray();
                global.food_items = data;
                global.foodCategory = catData;
            } catch (err) {
                console.error('Error fetching food categories:', err);
                throw err;
            }

        } catch (err) {
            console.error('Error fetching food items:', err);
            throw err;
        }

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Re-throw to propagate error to caller
    }
}

module.exports = ConnectToMongo;
