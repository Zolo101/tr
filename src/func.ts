import Decimal = require("../lib/break_infinity.min.js");

export class Element { // copypasted from zelocoin incremental lol
	constructor(public ei: ElementInfo) {
		let element = document.createElement(ei.type);
		if (ei.append) {
			document.getElementById(ei.append).appendChild(element);
		}
		if (ei.innerHTML) {element.innerHTML = ei.innerHTML;}
		if (ei.id) {element.id = ei.id;}
		// if (ei.onclick) {element.addEventListener('click',function(){ei.onclick})}; breaks with some buttons
		if (ei.onclick) {element.onclick = ei.onclick;}
		if (ei.class) {element.className = ei.class; }
	}
}

export interface ElementInfo {
	type: string;
	id?: string;
	class?: string;
	onclick?: any;
	append?: string;
	innerHTML?: any;
}

export function ZoomTR(size) {
    // Zoom into tr_'s height
    let mantissa = size.m;
    let zoomed = new Decimal(1);
    //zoomed.e = size.e;
    //zoomed.e *= -1;
    document.getElementById("zoomed").innerHTML = "(" + Number(10**size.e) + "x zoomed out)"
    document.getElementById("tr").style.height = mantissa*40 + "px";
    document.getElementById("tr").style.width = Number(500/(size.e*size.e)).toFixed(0) + "px";
}

export function NewCat(ei: ElementInfo) {
	let cat = new Element(ei);

}

export function OpenCat(e: Element) {

}

//export function RemoveCat() {}