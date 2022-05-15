const mongoose = require('mongoose');

// Creating Schema of an item
const itemsSchema = new mongoose.Schema({
	name: {
		type: String
	}
});


const List = mongoose.model("item", itemsSchema);


module.exports = List;



