const express = require("express");
const router = express.Router();
const List  = require("../models/item");
const CustomList = require("../models/list");

router.post("/", (req, res)=>{
    const delItemId = req.body.deleteCheckBox;
	const listName = req.body.listName;
	if(listName === "Today"){
		List.findByIdAndDelete(delItemId, function(err){
			if(err){
				console.log("Item not deleted");
			} else{
				res.redirect("/");
			}
		});
	} else {
		CustomList.findOneAndUpdate({name: listName},{$pull: {items: {_id: delItemId}}} , (err, result) => {
			if(!err){
				res.redirect("/new/" + listName);
			}
		});
	}
});

module.exports = router;