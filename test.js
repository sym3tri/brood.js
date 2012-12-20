function print(msg) {
  document.getElementById('out').innerHTML += msg + '<br>';
}

Shape = brood.spawn({
  name: 'shape',
  color: '',
  init: function(color) {
    this.color = color || 'transparent';
  },
  getArea: function () {
    return 'unable to calculate area';
  },
  setColor: function(color) {
    this.color = color;
  },
  describe: function () {
    print('I am a: ' + this.name);
    print('color: ' + this.color);
    print('area: ' + this.getArea());
    print('-----');
  }
});
Shape.init();
Shape.describe();


var Rect = Shape.spawn({
  length: null,
  width: null,
  init: function (length, width, color) {
    // Explicit name kind of sucks but is used to prevent infinite loops
    // when the "this" context changes
    //
    // Essentially equivalent to
    // Object.getPrototypeOf(Rect).init.call(this, color);
    // TODO: should multilevel method overrides even be allowed?
    Rect.origin.init.call(this, color);
    this.name = 'Rect';
    this.length = length;
    this.width = width;
  },
  getArea: function () {
    return this.length * this.width;
  }
});
Rect.init(2, 3, 'blue');
Rect.describe();


// A square is a rectangle but slightly different.
var Square = Rect.spawn({
  init: function (sideLength, color) {
    Square.origin.init.call(this, sideLength, sideLength, color);
    this.name = 'Square';
  }
});
Square.init(4, 'green');
Square.describe();

// a circle is its own shape
var Circle = Shape.spawn({
  init: function (radius, color) {
    Circle.origin.init.call(this, color);  // call origin's constructor
    this.radius = radius;
    this.name = 'Circle';
  },
  // override getarea()
  getArea: function () {
    return this.radius * this.radius * Math.PI;
  }
});
Circle.init(3, 'purple');
Circle.describe();
Circle.mixin({ foo: function () { return 'foo'; } });

print('Circle.foo(): ' + Circle.foo());


////////////
print('');
print('Circle.hasSamePrototype(Square): ' + Circle.hasSamePrototype(Square));
print('Square.hasSamePrototype(Rect): ' + Square.hasSamePrototype(Rect));
print('Circle.hasSamePrototype(Rect): ' + Circle.hasSamePrototype(Rect));


