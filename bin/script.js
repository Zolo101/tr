define(["require", "exports", "../lib/break_eternity.min.js"], function (require, exports, Decimal) {
    "use strict";
    exports.__esModule = true;
    exports.trsize = new Decimal(1);
    exports.rand0 = new Decimal(1);
    exports.mult0 = new Decimal(1);
    for (var i = 0; i < 1; i++) {
        var rand = Math.random();
        if (rand >= 0.5) {
            exports.mult0 = Decimal.multiply(exports.mult0, 1 + rand);
        }
        else {
            exports.mult0 = Decimal.multiply(exports.mult0, 1 - rand);
        }
    }
    for (var i = 0; i < 5; i++) {
        var rand = Math.random();
        if (rand >= 0.5) {
            exports.rand0 = Decimal.multiply(exports.rand0, Decimal.plus(exports.mult0, rand));
        }
        else {
            exports.rand0 = Decimal.multiply(exports.rand0, Decimal.minus(exports.mult0, rand));
        }
    }
    for (var i = 0; i < exports.rand0.toNumber(); i++) {
        var rand = Math.random();
        if (rand >= 0.5) {
            exports.trsize = exports.trsize.times(1 + rand);
        }
        else {
            exports.trsize = exports.trsize.times(1 - rand);
        }
    }
    console.log(exports.rand0.toString());
    console.log(exports.trsize.toString());
    var size = exports.trsize.toStringWithDecimalPlaces(2);
    console.log(size);
    document.getElementById("trsize").innerHTML = "Your tr_ is " + size + " meters tall!";
    document.getElementById("tr").style.height = exports.trsize.times(100) + "px";
});
