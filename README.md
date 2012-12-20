### brood.js

Tiny set of helpers to implement 
[differential inheritance](http://en.wikipedia.org/wiki/Differential_inheritance) 
conveniently in JavaScript.



- No more fake *classes*
- No `new` operator
- No `instanceof` operator
- No constructor functions



- Everything is an object.
- All objects are spawned from other objects via a `spawn()` method.
- Objects have an optional `init()` function for initialization.


Inspired by [Douglas Crockford](http://javascript.crockford.com/prototypal.html)
and [selfish.js](https://github.com/Gozala/selfish) and the true prototypal nature of JavaScript.


