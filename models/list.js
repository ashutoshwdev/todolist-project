const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
	name: {
		type: String
	}
});
// Custom List schema
const listSchema = mongoose.Schema({
    name: {
        type: String
    },
    items:{
        type: [itemsSchema]
    } 
});
const CustomList = mongoose.model("List", listSchema); // Creating custom list in database

module.exports = CustomList;