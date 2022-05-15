const express = require("express");
const router = express.Router();
const CustomList = require("../models/list");
const List  = require("../models/item");
// const defaultItems = require("./index");
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

router.get("/:customRoute", (req, res) => {
    const customListName = _.capitalize(req.params.customRoute);
	CustomList.findOne({name: customListName}, (err, result) => {
		if(!result){
			const list1 = new CustomList({
				name: customListName,
				items: defaultItems
			});
			list1.save();
			res.redirect("/new/" + customListName);
		} else {
			res.render("index", {listTitle: result.name, addedItems: result.items });
		}
    });
});

module.exports = router;