const express = require("express");
const router = express.Router();
const List  = require("../models/item");
const CustomList = require("../models/list");
const _ = require("lodash");

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
			List.insertMany(defaultItems);
			res.redirect("/");
		} else{
			res.render("index", {listTitle: "Today", addedItems: foundItems});
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
			res.redirect("/" + _.lowerCase(listName));
		});
	}
});

router.get("/:customRoute", (req, res) => {
    const customListName = _.capitalize(req.params.customRoute);
	CustomList.findOne({name: customListName}, (err, result) => {
		if(!result){
			const list1 = new CustomList({
				name: customListName,
				items: defaultItems
			});
			list1.save();
			res.redirect("/" + _.lowerCase(req.params.customRoute));
		} else {
			res.render("index", {listTitle: result.name, addedItems: result.items });
		}
    });
});



module.exports = router;