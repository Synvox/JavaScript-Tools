/**
 * Diff Function
 *
 * Usage:
 *   diff([1,2,3], [1,2,3,4]) -> [undefined, undefined, undefined, 4]
 *   diff({name: "over"},{name: "over", age: 9000}) -> {age: 9000}
 * 
 * @param  {object|array} a Old Object
 * @param  {object|array} b New Object
 * @return {object}         Object that contains the absolute differences
 */
var diff = function diff(a, b, c) {

	var c;
	if (Array.isArray(a) && Array.isArray(b))
		c = [];
	else
		c = {};

	[a, b].forEach(function(obj){
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (typeof obj[prop] === "object" && obj[prop] !== null) {

					if (JSON.stringify(a[prop]) !== JSON.stringify(b[prop]))
						c[prop] = diff(a[prop], b[prop], c);

				} else {

					if(a === undefined)
						a = Array.isArray(b) ? [] : {};

					if(b === undefined)
						b = Array.isArray(a) ? {} : [];

					if (a[prop] !== b[prop]) {
						c[prop] = b[prop];
					}

				}
			}
		}
	});
	return c;
}