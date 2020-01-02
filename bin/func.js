define(["require", "exports", "../lib/break_infinity.min.js"], function (require, exports, Decimal) {
    "use strict";
    exports.__esModule = true;
    var Element = /** @class */ (function () {
        function Element(ei) {
            this.ei = ei;
            var element = document.createElement(ei.type);
            if (ei.append) {
                document.getElementById(ei.append).appendChild(element);
            }
            if (ei.innerHTML) {
                element.innerHTML = ei.innerHTML;
            }
            if (ei.id) {
                element.id = ei.id;
            }
            // if (ei.onclick) {element.addEventListener('click',function(){ei.onclick})}; breaks with some buttons
            if (ei.onclick) {
                element.onclick = ei.onclick;
            }
            if (ei["class"]) {
                element.className = ei["class"];
            }
        }
        return Element;
    }());
    exports.Element = Element;
    function ZoomTR(size) {
        // Zoom into tr_'s height
        var mantissa = size.m;
        var zoomed = new Decimal(1);
        //zoomed.e = size.e;
        //zoomed.e *= -1;
        document.getElementById("zoomed").innerHTML = "(" + Number(Math.pow(10, size.e)) + "x zoomed out)";
        document.getElementById("tr").style.height = mantissa * 40 + "px";
        document.getElementById("tr").style.width = Number(500 / (size.e * size.e)).toFixed(0) + "px";
    }
    exports.ZoomTR = ZoomTR;
    function NewCat(ei) {
        var cat = new Element(ei);
    }
    exports.NewCat = NewCat;
    function OpenCat(e) {
    }
    exports.OpenCat = OpenCat;
});
//export function RemoveCat() {}
