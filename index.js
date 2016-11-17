/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Felix Mosheev
 */
var loaderUtils = require('loader-utils');
var SourceNode = require("source-map").SourceNode;
var SourceMapConsumer = require("source-map").SourceMapConsumer;
var FOOTER = "/*** EXPORTS FROM exports-loader ***/\n";

function getTsModules(content) {
  var ret = {};
  var result;
  var matcher = /}\)\(([^. ]+) \|\| \(\1 = \{}\)\);/g;
  while (result = matcher.exec(content)) {
    ret[result[1]] = result[1];
  }

  return ret;
}

module.exports = function (content, sourceMap) {
  if (this.cacheable) this.cacheable();
  var exports = [];
  var modules = getTsModules(content);

  var keys = Object.keys(modules);
  keys.forEach(function (mod) {
    exports.push("window[" + JSON.stringify(mod) + "] = (" + mod + ");");
  });

  if (sourceMap) {
    var currentRequest = loaderUtils.getCurrentRequest(this);
    var node = SourceNode.fromStringWithSourceMap(content, new SourceMapConsumer(sourceMap));
    node.add("\n\n" + FOOTER + exports.join("\n"));
    var result = node.toStringWithSourceMap({
      file: currentRequest
    });
    this.callback(null, result.code, result.map.toJSON());
    return;
  }
  return content + "\n\n" + FOOTER + exports.join("\n");
};
