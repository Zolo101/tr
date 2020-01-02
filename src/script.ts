import Decimal = require("../lib/break_infinity.min.js");
import * as f from "./func"; // Functions

export const tick = 100;
export var tr_size = new Decimal(1);

export var grows = new Decimal(1);
export var dicespeed = 10;

var gtamount = 0;

function Grow() {
	tr_size = tr_size.plus(grows);
	f.ZoomTR(tr_size);
}

function UpgradeGrow() {
	if (tr_size.gte(upgradegrowbuttoncost)) {
		tr_size = tr_size.minus(upgradegrowbuttoncost);
		upgradegrowbuttoncost = upgradegrowbuttoncost.times(2);
		document.getElementById("upgradegrowbutton").innerHTML = `
		Upgrade Grow! Button<br>
			<b>Costs ` + upgradegrowbuttoncost.toString() + ` meters</b>	
		`;
		grows = grows.plus(1);
		f.ZoomTR(tr_size);
	}
}

function AutoGrow() {
	if (tr_size.gte(autogrowbuttoncost)) {
		tr_size = tr_size.minus(autogrowbuttoncost);
		autogrowbuttoncost = autogrowbuttoncost.times(2);
		autogrowinterval--;
		document.getElementById("autogrowbutton").innerHTML = `
		Upgrade Auto Grow! Button to ` + autogrowinterval.toString() + ` seconds<br>
			<b>Costs ` + autogrowbuttoncost.toString() + ` meters</b>	
		`;
		auto = true;
		if (autogrowinterval == 1) {
			document.getElementById("autogrowbutton").innerHTML = `<b>
		Upgrade complete</b>	
		`;
		}
	}
}

function SpawnGoldTR() {
	let goldtr = new f.Element({
		type: "div",
		id: "goldtr" + gtamount,
		class: "goldtr",
		append: "goldtrspace",
		onclick: function(){
			tr_size = tr_size.plus(10**tr_size.e);
			f.ZoomTR(tr_size);
			this.remove();
		},
	})

	document.getElementById("goldtr" + gtamount).style.width = "80px";
	document.getElementById("goldtr" + gtamount).style.height = "80px";

	document.getElementById("goldtr" + gtamount).style.left = (Math.random()*90)+"%";
	document.getElementById("goldtr" + gtamount).style.top = (Math.random()*90)+"%";
	gtamount++;
}

function Save() {
	var savestate = [tr_size.toString(),grows.toString(),
		upgradegrowbuttoncost.toString(),autogrowbuttoncost.toString(),
		autogrowinterval,auto];

	var savestatejson = JSON.stringify(savestate);

	localStorage.setItem("trsave",window.btoa(savestatejson));
}

function Load() {
	var loadstate = localStorage.getItem("trsave");
	loadstate = window.atob(loadstate);
	var ls = JSON.parse(loadstate);

	tr_size = new Decimal(ls[0]);
	grows = new Decimal(ls[1]);
	upgradegrowbuttoncost = new Decimal(ls[2]);
	autogrowbuttoncost = new Decimal(ls[3]);
	auto = ls[4];
}

var zoominterval = 1;
var goldtrinterval = 1;
f.ZoomTR(tr_size);
window.setInterval(function() {
	if (zoominterval>dicespeed) {zoominterval=0;f.ZoomTR(tr_size);}
	
	if (auto && autogrowi>autogrowinterval) {autogrowi=0;Grow();}
	
	if (goldtrinterval>360) {goldtrinterval=0;}

	zoominterval++;
	autogrowi++;
	goldtrinterval+=8;

	if (Math.random() >= 0.996) {
		SpawnGoldTR();
	};

	let goldtrs = Array.from(document.getElementsByClassName("goldtr"));
	for (let i = 0; i < goldtrs.length; i++) {
		var element = goldtrs[i];
		// @ts-ignore
		element.style.filter = "hue-rotate(" + goldtrinterval + "deg) drop-shadow(0px 0px 10px black)";
	}
		
	/*
	
	While this whole bit of if statements look ugly, they are actually
	faster than the other options (that do look nicer).
	
	https://stackoverflow.com/questions/6665997/switch-statement-for-greater-than-less-than
	
	
	if (tr_size.lte(0.01)) {var size = tr_size.toStringWithDecimalPlaces(6)}
	if (tr_size.lte(1)) {var size = tr_size.toStringWithDecimalPlaces(4)}  
	if (tr_size.lte(100)) {var size = tr_size.toStringWithDecimalPlaces(2)}
	if (tr_size.lte(10000)) {var size = tr_size.toString()} */

	document.getElementById("trsize").innerHTML = "Your tr_ is " + tr_size.toString() + " meters tall!";
}, tick)

/* CATEGORIES */

// var growcat = new f.NewCat({
// 	type: "button",
// 	id: "growcat",
// 	class: "cat",
// 	onclick: function(){},
// 	append: "catlist",
// 	innerHTML: "Grow"
// })

let growbutton = new f.Element({
	type: "button",
	id: "growbutton",
	onclick: function(){Grow()},
	append: "catelements", // temp
	innerHTML: "Grow!"
})

let upgradegrowbutton = new f.Element({
	type: "button",
	id: "upgradegrowbutton",
	onclick: function(){UpgradeGrow()},
	append: "catelements", // temp
	innerHTML: `
	Upgrade Grow! Button<br>
		<b>Costs 10 meters</b>	
	`
})

export var upgradegrowbuttoncost = new Decimal(10);

let autogrowbutton = new f.Element({
	type: "button",
	id: "autogrowbutton",
	onclick: function(){AutoGrow()},
	append: "catelements", // temp
	innerHTML: `
	Auto Grow! Button<br>
		<b>Costs 100 meters</b>	
	`
})

export var autogrowbuttoncost = new Decimal(100);
export var autogrowinterval = 4;
export var autogrowi = 0;
export var auto = false;

let savebutton = new f.Element({
	type: "button",
	id: "savebutton",
	onclick: function(){Save()},
	append: "catelements", // temp
	innerHTML: `Saves the world (and your game)`
})

let loadbutton = new f.Element({
	type: "button",
	id: "loadbutton",
	onclick: function(){Load()},
	append: "catelements", // temp
	innerHTML: `Loads the game (not the world)`
})