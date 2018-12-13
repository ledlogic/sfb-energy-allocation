function emptyTurns() {
	var arr = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	return arr;
}

var DISPLAY_TURNS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var TURNS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
var POWERS = [
    {
    	type: "POWER",
    	key: "WARP",
    	name: "WARP ENGINE POWER"
    },
    {
    	type: "POWER",
   		key: "IMPL",
    	name: "IMPULSE ENGINE POWER"
    },
    {
    	type: "POWER",
    	key: "RCTR",
    	name: "REACTOR POWER"
    },
    {
    	type: "POWER",
   		key: "TOTAL_POWER",
    	name: "TOTAL POWER AVAILABLE",
    	expression: "WARP+IMPL+RCTR"
    },
    {
    	type: "BATTERY",
   		key: "BATTERY_POWER",
    	name: "BATTERY POWER AVAILABLE"
    },
    {
    	type: "BATTERY",
   		key: "BATTERY_DISCHARGED",
    	name: "BATTERY CAPACITY DISCHARGED"
    },
    {
    	type: "BATTERY",
   		key: "RECHARGE",
    	name: "RECHARGE BATTERIES"
    },
    {
    	type: "SYSTEM",
   		key: "LIFE_SUPPORT",
    	name: "LIFE SUPPORT"
    },
    {
    	type: "SYSTEM",
   		key: "AFC",
    	name: "ACTIVE FIRE CONTROL"
    },
    {
    	type: "WEAPON",
   		key: "PHASER_CHARGE",
    	name: "CHARGE PHASER CAPACITORS"
    },
    {
    	type: "NOTES",
   		key: "PHASER_USED",
    	name: "PHASER CAPACITORS USED"
    },
    {
    	type: "WEAPON",
   		key: "HWA",
    	name: "HEAVY WEAPONS A"
    },
    {
    	type: "WEAPON",
   		key: "HWB",
    	name: "HEAVY WEAPONS B"
    },
    {
    	type: "WEAPON",
   		key: "HWC",
    	name: "HEAVY WEAPONS C"
    },
    {
    	type: "WEAPON",
   		key: "HWD",
    	name: "HEAVY WEAPONS D"
    },
    {
    	type: "DEFENSE",
   		key: "SHIELDS",
    	name: "ACTIVATE SHIELDS"
    },
    {
    	type: "DEFENSE",
   		key: "GENERAL",
    	name: "GENERAL REINFORCEMENT"
    },
    {
    	type: "DEFENSE",
   		key: "SPECIFIC1",
    	name: "SPECIFIC 1"
    },
    {
    	type: "DEFENSE",
   		key: "SPECIFIC2",
    	name: "SPECIFIC 2"
    },
    {
    	type: "DEFENSE",
   		key: "SPECIFIC3",
    	name: "SPECIFIC 3"
    },
    {
    	type: "DEFENSE",
   		key: "SPECIFIC4",
    	name: "SPECIFIC 4"
    },
    {
    	type: "DEFENSE",
   		key: "SPECIFIC5",
    	name: "SPECIFIC 6"
    },
    {
    	type: "DEFENSE",
   		key: "SPECIFIC6",
    	name: "SPECIFIC 6"
    },
    {
    	type: "MOVEMENT",
   		key: "MOVE",
    	name: "ENERGY FOR MOVEMENT"
    },
    {
    	type: "MOVEMENT",
   		key: "HET",
    	name: "HIGH ENERGY TURN"
    },
    {
    	type: "MOVEMENT",
   		key: "EM",
    	name: "ERRATIC MANEUVERING"
    },
    {
    	type: "SYSTEM",
   		key: "DAMCON",
    	name: "DAMAGE CONTROL"
    },
    {
    	type: "SYSTEM",
   		key: "TRAC",
    	name: "TRACTOR / NEGATIVE TRACTOR"
    },
    {
    	type: "SYSTEM",
   		key: "TRANS",
    	name: "TRANSPORTERS"
    },
    {
    	type: "SYSTEM",
   		key: "ECM",
    	name: "ECM"
    },
    {
    	type: "SYSTEM",
   		key: "ECCM",
    	name: "ECCM"
    },
    {
    	type: "SYSTEM",
   		key: "LABS",
    	name: "LABS"
    },
    {
    	type: "WEAPON",
   		key: "WILD",
    	name: "WILD WEASEL"
    },
    {
    	type: "WEAPON",
   		key: "SUICIDE",
    	name: "SUICIDE SHUTTLE"
    },
    {
    	type: "WEAPON",
   		key: "CLOAK",
    	name: "CLOAKING DEVICE"
    },
    {
    	type: "POWER",
   		key: "USED",
    	name: "TOTAL POWER USED",
    	expression: "TYPE:SYSTEM+TYPE:WEAPON+TYPE:DEFENSE+TYPE:MOVEMENT"
    },
    {
    	type: "POWER",
   		key: "BATT_USED",
    	name: "BATTERY POWER USED"
    },
    {
    	type: "NOTES",
   		key: "NOTE1",
    	name: "NOTE 1"
    },
    {
    	type: "NOTES",
   		key: "NOTE2",
    	name: "NOTE 2"
    },
    {
    	type: "NOTES",
   		key: "NOTE3",
    	name: "NOTE 3"
    },
    {
    	type: "NOTES",
   		key: "NOTE4",
    	name: "NOTE 4"
    },
    {
    	type: "NOTES",
   		key: "NOTE5",
    	name: "NOTE 5"
    }
];

for (var i=0;i<POWERS.length;i++) {
	if (typeof POWERS[i].expression == "undefined") {
		POWERS[i].turns = emptyTurns();
	}
}

new Vue({
  el: '#energyallocation',
  data: {
	displayturns: DISPLAY_TURNS,
	turns: TURNS,
	powers: POWERS
  },
  methods: {
	calculatepower: function(i, turn) {
		var power = this.$data.powers[i];
		var expression = power.expression;
		var newexpression = expression;
		var regexp = /([\w\:]+)/gm;
		var match = null;
		while (match = regexp.exec(expression)) {
			var key = match[0];
			var value = this.eval(key, turn);
			//console.log("calculatepower; key=" + key + ", value=" + value);
			newexpression = newexpression.replace(key, value);
		}
		//console.log("calculatepower; newexpression=" + newexpression);
		var ret = eval(newexpression);
		//console.log("calculatepower; newexpression=" + newexpression + ";ret=" + ret);
		return ret;
	},
	eval: function(key, turn) {
		//console.log("eval; key=" + key + ";turn=" + turn);
		var colonIndex = key.indexOf(":");
		var typekey = null;
		if (colonIndex > -1) {
			typekey = key.substring(colonIndex+1);
			key = null;
		}
		var val = 0;
		for (var i=0;i<this.$data.powers.length;i++) {
			var power = this.$data.powers[i];
			if (key && (key === power.key)) {
				val += parseInt(power.turns[turn],10);
				return val;
				//console.log("key=" + key + "; turn=" + turn + "; val=" + val);
			} else if (typekey && (typekey === power.type)) {
				val += parseInt(power.turns[turn], 10);
				//console.log("key=" + key + "; turn=" + turn + "; val=" + val);
			}
		}
		return val;
	},
	powerlabelclass: function (row) {
		var ret = "";
		ret += " " + ((typeof(row.expression) != "undefined") ? "power-label-expression" : "power-label-text");
		ret += (typeof(row.type) != "undefined") ? " " + row.type.toLowerCase() : "";
		return ret;
	},
	poweritemclass: function(row) {
		var ret = "";
		ret += " " + ((typeof(row.expression) != "undefined") ? "power-item-expression" : "power-item-text");
		ret += (typeof(row.type) != "undefined") ? " " + row.type.toLowerCase() : "";
		return ret;
	},
	tabindex: function (i, turn) {
		return (10+i) + (200*turn);
	}
  }
});