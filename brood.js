var brood = (function () {
  'use strict';

  var propertyDefaults, Base, brood;

  brood = Object.freeze(
    Object.create(Object.prototype, {

      // get a completely empty object with no prototype
      empty: {
        value: function (props) {
          var obj = Object.create(null);
          this.propCopy(obj, props);
          return obj;
        }
      },

      // similar to _.extend() but es5 safe
      propCopy: {
        value: function (target) {
          var sources = Array.prototype.slice.call(arguments, 1);
          sources.forEach(function (src) {
            Object.getOwnPropertyNames(src).forEach(function (propName) {
              Object.defineProperty(target, propName,
                Object.getOwnPropertyDescriptor(src, propName));
            });
          });
          return target;
        }
      },

      // convenience pass-thru to extend the base object
      spawn: {
        value: function (props) {
          return Base.spawn(props);
        }
      }

    })
  );

  // default property descriptor
  // TODO: make these defaults configurable somehow
  propertyDefaults = brood.empty({
    writable: true,
    configurable: true,
    enumerable: true
  });

  // convenience to use the default property descriptors and optionally override
  // TODO: maybe add logic for getters/setters???
  function defaults(props) {
    return brood.propCopy(Object.create(null), propertyDefaults, props);
  }

  // convert "arguments" object into a real array
  function convertArgs(args) {
    return Array.prototype.slice.call(args, 0);
  }


  // All objects inherit from Base to get enhanced functionality
  Base = Object.freeze(
    Object.create(Object.prototype, {

      // direct access to nearest parent in prototype chain
      origin: {
        get: function () {
          return Object.getPrototypeOf(this);
        }
      },

      // extends the current object by making it the prototype of a new object
      // optionally apply properties to the new object inline
      spawn: defaults({
        value: function (props) {
          var propsObject, newObj;

          if (props) {
            propsObject = Object.create(null);
            Object.getOwnPropertyNames(props).forEach(function (propName) {
                propsObject[propName] = defaults({
                  value: props[propName]
                });
            });
          }

          // TODO: auto-call the init() function before returning?

          newObj = Object.create(this, propsObject);
          return newObj;
        }
      }),

      // copy all properties from other objects to this one
      mixin: defaults({
        value: function () {
          var args = convertArgs(arguments);
          args.unshift(this);
          brood.propCopy.apply(brood, args);
        }
      }),

      // copy all properties form this object to another obj
      mixout: defaults({
        value: function (targetObj) {
          var args = convertArgs(arguments);
          args.push(this);
          brood.propCopy.apply(brood, args);
        }
      }),

      // determine if this has the same prototype of obj
      hasSamePrototype: defaults({
        value: function (obj) {
          return this.origin === obj.origin;
        }
      }),

      // placeholder, should be overridden
      init: defaults({
        value: function () {
          // noop. override me!
        }
      })

    })
  );

  return brood;
}());
