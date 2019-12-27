import Decimal = require("../lib/break_eternity.min.js");

export var trsize = new Decimal(1);
export var rand0 = new Decimal(1);
export var mult0 = new Decimal(1);

for (let i = 0; i < 1; i++) {
	let rand = Math.random()
	if (rand >= 0.5) {
		mult0 = Decimal.multiply(mult0,1+rand);
	} else {
		mult0 = Decimal.multiply(mult0,1-rand);
	}
}

for (let i = 0; i < 5; i++) {
	let rand = Math.random()
	if (rand >= 0.5) {
		rand0 = Decimal.multiply(rand0,Decimal.plus(mult0,rand));
	} else {
		rand0 = Decimal.multiply(rand0,Decimal.minus(mult0,rand));
	}
}

for (let i = 0; i < rand0.toNumber(); i++) {
	let rand = Math.random()
	if (rand >= 0.5) {
		trsize = trsize.times(1+rand);
	} else {
		trsize = trsize.times(1-rand);
	}
}

console.log(rand0.toString());
console.log(trsize.toString());

let size = trsize.toStringWithDecimalPlaces(2);
console.log(size);
document.getElementById("trsize").innerHTML = "Your tr_ is " + size + " meters tall!";
document.getElementById("tr").style.height = trsize.times(100)  + "px";
