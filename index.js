function Map(keys, values) {return new _Map(keys, values)}
function _Map(keys, values) {this.clear(keys, values);}

_Map.prototype = {

	set: function(key, value) {
		var i = this.indexOf(key);
		this._keys[i] = key;
		this._values[i] = value;
		return i !== this._keys.length;
	},

	get: function(key) {
		return this._values[this.indexOf(key)];
	},

	remove: function(key) {
		var i = this.indexOf(key);
		if (i !== this._keys.length) {
			this._keys.splice(i, 1);
			this._values.splice(i, 1);
		}
		return this;
	},

	clear: function(keys, values) {
		this._keys = keys || [];
		this._values = values || [];
		return this;
	},

	keys: function() {
		return [].concat(this._keys);
	},

	values: function() {
		return [].concat(this._values);
	},

	indexOf: function(key) {
		var i = this._keys.indexOf(key);
		return i === -1 ? this._keys.length : i;
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
					_cur = Map();
					current.set(key, _cur);
				}
				current = _cur;
			}
		});

		return this;
	},

	each: function(fn) {
		var self = this;
		this._keys.forEach(function(key) {
			return fn(key, self._values[self.indexOf(key)]);
		});

		return this;
	}
};