const express = require("express");
const router = express.Router();
const List  = require("../models/item");
const CustomList = require("../models/list");

// Documents to insert default items inside database
const item1 = new List({
	name: "Welcome to your todo list!"
});
const item2 = new List({
	name: "Hit the + button to add items"
});
const item3 = new List({
	name: "<-- Hit this to delete an item"
});
const defaultItems = [item1, item2, item3];


router.get("/", (req,res)=>{
    // Fetching default items
	List.find({}, function(err, foundItems){
		if(foundItems.length === 0){
			List.insertMany(defaultItems, function(err){
				if(err){
					console.log("Default Items not inserted");
				} else{
					console.log("Default items inserted");
				}
			});
			res.redirect("/");
		} else{
			res.render("index", {listTitle: "Today", addedItems: foundItems });
		}
	});
});

router.post("/", (req, res)=>{
    const newItem = req.body.item;
	const listName = req.body.button;

	const item = new List({
		name: newItem
	});
    //checking if list is 
	if(listName === "Today"){
		item.save();
		res.redirect("/");
	} else {
		CustomList.findOne({name: listName}, (err, foundList) => {
			foundList.items.push(item);
			foundList.save();
			res.redirect("/new/" + listName);
		});
	}
});



module.exports = router;