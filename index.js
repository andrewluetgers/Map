
(function() {
	var root = this, previous_map = root.map;

	function map(keys, values) {return new Map(keys, values);}
	function Map(keys, values) {this.clear(keys, values);}

	Map.prototype = {

		set: function(key, value) {
			var i = this.indexOf(key);
			this.keys[i] = key;
			this.values[i] = value;
			return i !== this.keys.length;
		},

		get: function(key) {
			return this.values[this.indexOf(key)];
		},

		getIn: function(keyPath) {
			var current = this,
				keyPath = keyPath || [],
				key;

			for(var i= 0, len=keyPath.length; i<len; i++) {
				key = keyPath[i];
				current = current.get(key);
				if (current === undefined) {
					break;
				}
			}

			return current;
		},

		setIn: function(keyPath, value) {
			var current = this,
				keyPath = keyPath || [],
				_cur;

			keyPath.forEach(function(key, index) {
				if (index + 1 === keyPath.length) {
					current.set(key, value);
				} else {
					_cur = current.get(key);
					if (!_cur) {
						_cur = map();
						current.set(key, _cur);
					}
					current = _cur;
				}
			});

			return this;
		},

		indexOf: function(key) {
			var i = this.keys.indexOf(key);
			return i === -1 ? this.keys.length : i;
		},

		keyOf: function(val) {
			return this.keys[this.values.indexOf(val)];
		},

		each: function(fn) {
			var self = this;
			this.keys.forEach(function(key) {
				return fn(key, self.values[self.indexOf(key)]);
			});

			return this;
		},

		remove: function(key) {
			var i = this.indexOf(key);
			if (i !== this.keys.length) {
				this.keys.splice(i, 1);
				this.values.splice(i, 1);
			}
			return this;
		},

		clear: function(keys, values) {
			this.keys = keys || [];
			this.values = values || [];
			return this;
		},

		noConflict: function() {
			root.map = previous_map;
			return map;
		}
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = map;
		}
		exports.map = map;
	} else {
		root.map = map;
	}

}).call(this);

