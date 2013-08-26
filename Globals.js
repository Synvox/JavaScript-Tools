/**
 * Scans an object for global properties
 * Just copy it into your browser console and hit return.
 * 
 * @param  {Object} obj
 * @return {Object} results.{total, categories}
 */
(function(obj){

	var ignoredProps = ["top", "window", "location", "external", "document"],
	    properties = Object.keys(obj),
	    total = 0,
	    types = {}

	properties.forEach(function(prop){
		var pure = false;
		
		for(var i in ignoredProps) {
			if (ignoredProps[i] == prop) {
				pure = true;
				break;
			}
		}

		if (!pure) {
			total++;

			var type = typeof obj[prop] + "s";
			
			if (types[type] === undefined)
				types[type] = {};

			types[type][prop] = obj[prop];
		}
	});

	return {
		total: total,
		categories: types
	};

})(window);