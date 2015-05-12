# Map
a very basic Map data-structure


##usage 

```javascript
var m = map(
  [{}, [], "", 0, /foo/, new Date()],
  ["object", "array", "string", "number", "regexp", "date"]
);

console.log(m, m.values, m.keys);
console.log("key of 'number'", m.keyOf('number'));
console.log("index of 0", m.indexOf(0), "value at index 3", m.values[3]);

m.set(map, "map");

console.log(m.get(map))

console.log("set in", m.setIn(["foo", map, Date, 8], "test"));
console.log(m.getIn(["foo", map, Date, 8]));

m.each(function(k, v) {
  console.log("key", k, "value", v);
});
```


[usage demo](http://plnkr.co/edit/nVPEQwbg1GUW1SyRZyf4?p=preview)

