/**
 * CONTROLLER
 * by Ryan Allred on 9/28/2013
 * MIT License
 */

/**
 * Controller Class
 * @this {Controller}
 * @param {object} obj The Object to controll
 */
var Controller  = (function(){
	var controllers = [];

	function Controller(obj) {
		var self = this;

		self.obj = obj;
		self.data = {};
		self.bindings = {};

		Object.defineProperty(obj, 'boundTo', {
			value: self.boundTo.bind(self),
			writable: false,
			enumerable: false,
			configurable: false
		});

		Object.defineProperty(obj, 'property', {
			value: self.property.bind(self),
			writable: false,
			enumerable: false,
			configurable: false
		});

		Object.defineProperty(obj, 'toJSON', {
			value: self.toJSON.bind(self),
			writable: false,
			enumerable: false,
			configurable: false
		});
	}

	Controller.prototype = {
		boundTo: function(){
			console.log(this);
		},

		/**
		 * [property description]
		 * @param  {string} name    The name of the property
		 * @param  {string} type    Type of the property, eg: string, bool, integer, float, or date
		 * @param  {object} options Other settings for the binding, eg: min, and max
		 * @return {object}         The caller, for method chaining
		 */
		property: function(name, type, options){
			var self = this;

			switch(type) {
				case 'string':
					options.value = '';
					break;
				case 'bool':
					options.value = false;
					break;
				case 'integer':
					options.value = 0;
					break;
				case 'float':
					options.value = 0;
					break;
				case 'date':
					options.value = new Date();
					break;
			}

			self.data[name] = options.value;

			Object.defineProperty(self.obj, name, {
				get: self.getter(name, type, options),
				set: self.setter(name, type, options),
				enumerable: true,
				configurable: false
			});

			return self.obj;
		},

		getter: function(name, type, options) {
			var self = this;
			return function(){ return self.data[name]; };
		},

		setter: function(name, type, options) {
			var self = this;
			return function(val){
				
				var good = false;

				switch(type) {
					case 'string':
						if (typeof val === 'string')
							good = true;
						break;
					case 'bool':
						if (typeof val === 'boolean')
							good = true;
						break;
					case 'integer':
						if (typeof val === 'number' && val % 1 === 0)
							good = true;
						break;
					case 'float':
						if (typeof val === 'number')
							good = true;
						break;
					case 'date':
						if (val instanceof Date)
							good = true;
						break;
				}

				if (!good) {
					console.error('TypeError setting property "' + name + '"');
					console.trace();
				}

				if (type === 'integer' || type === 'number') {
					if (options.min && val < options.min) {
						console.error('RangeError setting property "' + name + '" value is below minimum');
						console.trace();
					}
					if (options.max && val > options.max) {
						console.error('RangeError setting property "' + name + '" value is above maximum');
						console.trace();
					}
				}

				self.data[name] = val;
			};
		},

		/**
		 * Returns a JSON string of the data for the calling object.
		 * @return {string} JSON string
		 */
		toJSON: function(){
			return JSON.stringify(this.data);
		}
	};

	return Controller;

})();