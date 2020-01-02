define(["require", "exports", "../lib/break_infinity.min.js", "./func"], function (require, exports, Decimal, f) {
    "use strict";
    exports.__esModule = true;
    exports.tick = 100;
    exports.tr_size = new Decimal(1);
    exports.grows = new Decimal(1);
    exports.dicespeed = 10;
    var gtamount = 0;
    function Grow() {
        exports.tr_size = exports.tr_size.plus(exports.grows);
        f.ZoomTR(exports.tr_size);
    }
    function UpgradeGrow() {
        if (exports.tr_size.gte(exports.upgradegrowbuttoncost)) {
            exports.tr_size = exports.tr_size.minus(exports.upgradegrowbuttoncost);
            exports.upgradegrowbuttoncost = exports.upgradegrowbuttoncost.times(2);
            document.getElementById("upgradegrowbutton").innerHTML = "\n\t\tUpgrade Grow! Button<br>\n\t\t\t<b>Costs " + exports.upgradegrowbuttoncost.toString() + " meters</b>\t\n\t\t";
            exports.grows = exports.grows.plus(1);
            f.ZoomTR(exports.tr_size);
        }
    }
    function AutoGrow() {
        if (exports.tr_size.gte(exports.autogrowbuttoncost)) {
            exports.tr_size = exports.tr_size.minus(exports.autogrowbuttoncost);
            exports.autogrowbuttoncost = exports.autogrowbuttoncost.times(2);
            exports.autogrowinterval--;
            document.getElementById("autogrowbutton").innerHTML = "\n\t\tUpgrade Auto Grow! Button to " + exports.autogrowinterval.toString() + " seconds<br>\n\t\t\t<b>Costs " + exports.autogrowbuttoncost.toString() + " meters</b>\t\n\t\t";
            exports.auto = true;
            if (exports.autogrowinterval == 1) {
                document.getElementById("autogrowbutton").innerHTML = "<b>\n\t\tUpgrade complete</b>\t\n\t\t";
            }
        }
    }
    function SpawnGoldTR() {
        var goldtr = new f.Element({
            type: "div",
            id: "goldtr" + gtamount,
            "class": "goldtr",
            append: "goldtrspace",
            onclick: function () {
                exports.tr_size = exports.tr_size.plus(Math.pow(10, exports.tr_size.e));
                f.ZoomTR(exports.tr_size);
                this.remove();
            }
        });
        document.getElementById("goldtr" + gtamount).style.width = "80px";
        document.getElementById("goldtr" + gtamount).style.height = "80px";
        document.getElementById("goldtr" + gtamount).style.left = (Math.random() * 90) + "%";
        document.getElementById("goldtr" + gtamount).style.top = (Math.random() * 90) + "%";
        gtamount++;
    }
    function Save() {
        var savestate = [exports.tr_size.toString(), exports.grows.toString(),
            exports.upgradegrowbuttoncost.toString(), exports.autogrowbuttoncost.toString(),
            exports.autogrowinterval, exports.auto];
        var savestatejson = JSON.stringify(savestate);
        localStorage.setItem("trsave", window.btoa(savestatejson));
    }
    function Load() {
        var loadstate = localStorage.getItem("trsave");
        loadstate = window.atob(loadstate);
        var ls = JSON.parse(loadstate);
        exports.tr_size = new Decimal(ls[0]);
        exports.grows = new Decimal(ls[1]);
        exports.upgradegrowbuttoncost = new Decimal(ls[2]);
        exports.autogrowbuttoncost = new Decimal(ls[3]);
        exports.auto = ls[4];
    }
    var zoominterval = 1;
    var goldtrinterval = 1;
    f.ZoomTR(exports.tr_size);
    window.setInterval(function () {
        if (zoominterval > exports.dicespeed) {
            zoominterval = 0;
            f.ZoomTR(exports.tr_size);
        }
        if (exports.auto && exports.autogrowi > exports.autogrowinterval) {
            exports.autogrowi = 0;
            Grow();
        }
        if (goldtrinterval > 360) {
            goldtrinterval = 0;
        }
        zoominterval++;
        exports.autogrowi++;
        goldtrinterval += 8;
        if (Math.random() >= 0.996) {
            SpawnGoldTR();
        }
        ;
        var goldtrs = Array.from(document.getElementsByClassName("goldtr"));
        for (var i = 0; i < goldtrs.length; i++) {
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
        document.getElementById("trsize").innerHTML = "Your tr_ is " + exports.tr_size.toString() + " meters tall!";
    }, exports.tick);
    /* CATEGORIES */
    // var growcat = new f.NewCat({
    // 	type: "button",
    // 	id: "growcat",
    // 	class: "cat",
    // 	onclick: function(){},
    // 	append: "catlist",
    // 	innerHTML: "Grow"
    // })
    var growbutton = new f.Element({
        type: "button",
        id: "growbutton",
        onclick: function () { Grow(); },
        append: "catelements",
        innerHTML: "Grow!"
    });
    var upgradegrowbutton = new f.Element({
        type: "button",
        id: "upgradegrowbutton",
        onclick: function () { UpgradeGrow(); },
        append: "catelements",
        innerHTML: "\n\tUpgrade Grow! Button<br>\n\t\t<b>Costs 10 meters</b>\t\n\t"
    });
    exports.upgradegrowbuttoncost = new Decimal(10);
    var autogrowbutton = new f.Element({
        type: "button",
        id: "autogrowbutton",
        onclick: function () { AutoGrow(); },
        append: "catelements",
        innerHTML: "\n\tAuto Grow! Button<br>\n\t\t<b>Costs 100 meters</b>\t\n\t"
    });
    exports.autogrowbuttoncost = new Decimal(100);
    exports.autogrowinterval = 4;
    exports.autogrowi = 0;
    exports.auto = false;
    var savebutton = new f.Element({
        type: "button",
        id: "savebutton",
        onclick: function () { Save(); },
        append: "catelements",
        innerHTML: "Saves the world (and your game)"
    });
    var loadbutton = new f.Element({
        type: "button",
        id: "loadbutton",
        onclick: function () { Load(); },
        append: "catelements",
        innerHTML: "Loads the game (not the world)"
    });
});
