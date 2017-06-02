# exports Typescript commonjs global compiled files to be written on window for webpack

## Installation

```
npm install ts-global-module-loader
```

## Usage
For code that generated from Typescript that looks like that:

``` javascript
var services;
(function (services) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    services.Foo = Foo;
})(services || (services = {}));
```

``` javascript
require("ts-global-module-loader?./file.js");
```
will modify the code file's source to:
``` javascript
var services = window["services"];
(function (services) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    services.Foo = Foo;
})(services || (services = {}));
window["services"] = (services);
```
Inspired by https://github.com/webpack/exports-loader;

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)