require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AutoGrowInput":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AutoGrowInput = (function(superClass) {
  var _reflowSiblings, _resizeParent;

  extend(AutoGrowInput, superClass);

  Events.Input = "InputField.OnInput";

  Events.Focus = "InputField.OnFocus";

  Events.Blur = "InputField.OnBlur";

  function AutoGrowInput(options) {
    var base, base1, base10, base11, base12, base13, base14, base15, base2, base3, base4, base5, base6, base7, base8, base9, key, ref, val;
    this.options = options != null ? options : {};
    this._update = bind(this._update, this);
    this.parentOgHeight = null;
    if (this.options.lineHeight != null) {
      this.options.lineHeight = this.options.lineHeight + "px";
    }
    if ((base = this.options).lineHeight == null) {
      base.lineHeight = "48px";
    }
    if ((base1 = this.options).name == null) {
      base1.name = "AutoGrowInput";
    }
    if ((base2 = this.options).color == null) {
      base2.color = "#212121";
    }
    if ((base3 = this.options).backgroundColor == null) {
      base3.backgroundColor = "white";
    }
    if ((base4 = this.options).height == null) {
      base4.height = 200;
    }
    if ((base5 = this.options).borderRadius == null) {
      base5.borderRadius = 0;
    }
    if ((base6 = this.options).width == null) {
      base6.width = 400;
    }
    if ((base7 = this.options).fontSize == null) {
      base7.fontSize = 32;
    }
    if ((base8 = this.options).fontWeight == null) {
      base8.fontWeight = 300;
    }
    if ((base9 = this.options).padding == null) {
      base9.padding = "0";
    }
    if ((base10 = this.options).fontFamily == null) {
      base10.fontFamily = "-apple-system, Helvetica Neue";
    }
    if ((base11 = this.options).minHeight == null) {
      base11.minHeight = this.options.height;
    }
    if ((base12 = this.options).placeHolder == null) {
      base12.placeHolder = "Type something";
    }
    if ((base13 = this.options).resizeParent == null) {
      base13.resizeParent = false;
    }
    if ((base14 = this.options).parentBottomPadding == null) {
      base14.parentBottomPadding = 0;
    }
    if ((base15 = this.options).reflowSiblings == null) {
      base15.reflowSiblings = false;
    }
    AutoGrowInput.__super__.constructor.call(this, this.options);
    if (this.options.resizeParent === true) {
      this.parentOgHeight = this.options.parent.height;
    }
    this.textarea = document.createElement("textarea");
    if (this.options.value != null) {
      this.textarea.value = this.options.value;
    }
    if (this.options.placeHolder != null) {
      this.textarea.placeholder = this.options.placeHolder;
    }
    this._element.appendChild(this.textarea);
    this._textAreaStyle = {
      font: this.options.fontWeight + " " + this.options.fontSize + "px/" + this.options.lineHeight + " " + this.options.fontFamily,
      outline: "none",
      backgroundColor: "transparent",
      height: "100%",
      width: "100%",
      overflow: "hidden",
      resize: "none",
      padding: this.options.padding,
      margin: "0",
      "-webkit-appearance": "none",
      "box-sizing": "border-box"
    };
    ref = this._textAreaStyle;
    for (key in ref) {
      val = ref[key];
      this.textarea.style[key] = val;
    }
    if (this.options.color != null) {
      this.textarea.style.color = this.options.color;
    }
    this.textarea.onkeydown = (function(_this) {
      return function() {
        return _this._update();
      };
    })(this);
    this.textarea.onkeyup = (function(_this) {
      return function() {
        return _this._update();
      };
    })(this);
    this.textarea.change = (function(_this) {
      return function() {
        return _this._update();
      };
    })(this);
  }

  _resizeParent = function(layer, parentMinHeight, bottomPadding) {
    var allChildrenMaxYs, i, layerParent, len, max, ref, tallestChildMaxY;
    layerParent = layer.parent;
    allChildrenMaxYs = [];
    ref = layerParent.children;
    for (i = 0, len = ref.length; i < len; i++) {
      max = ref[i];
      allChildrenMaxYs.push(max.maxY);
    }
    tallestChildMaxY = Math.max.apply(null, allChildrenMaxYs);
    return layerParent.height = Math.max(tallestChildMaxY + bottomPadding, parentMinHeight);
  };

  _reflowSiblings = function(layer, layerMaxY) {
    var a, i, layerList, ref, ref1, results, yDiff;
    layerList = layer.parent.children;
    results = [];
    for (a = i = ref = layerList.indexOf(layer) + 1, ref1 = layerList.length; ref <= ref1 ? i < ref1 : i > ref1; a = ref <= ref1 ? ++i : --i) {
      yDiff = layerList[a].y - layerMaxY;
      results.push(layerList[a].y = layer.maxY + yDiff);
    }
    return results;
  };

  AutoGrowInput.prototype._update = function() {
    return setTimeout((function(_this) {
      return function() {
        var _trueValue, calcHeight, layerMaxY;
        layerMaxY = _this.maxY;
        _trueValue = _this.textarea.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n/g, "<br/>&nbsp;");
        if (_trueValue.trim() === "") {
          _trueValue = "a";
        }
        calcHeight = Utils.round(Utils.textSize(_trueValue, _this._textAreaStyle, {
          width: _this.width
        }).height, 0);
        _this.height = Math.max(calcHeight, _this.options.minHeight);
        if (_this.options.reflowSiblings === true) {
          _reflowSiblings(_this, layerMaxY);
        }
        if (_this.options.resizeParent === true) {
          return _resizeParent(_this, _this.parentOgHeight, _this.options.parentBottomPadding);
        }
      };
    })(this));
  };

  return AutoGrowInput;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQgZXhhbXBsZXMvQmFzaWNBdXRvR3Jvdy5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aXRhY2hlbi9Eb2N1bWVudHMvU1AyMDE3L3ZpdmlkL3ZpdmlkIGV4YW1wbGVzL0Jhc2ljQXV0b0dyb3cuZnJhbWVyL21vZHVsZXMvQXV0b0dyb3dJbnB1dC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQXV0b0dyb3cgVGV4dGFyZWFcbiMgQnkgQmxhaW5lIEJpbGxpbmdzbGV5IE1heSAyOSwgMjAxNlxuI1xuIyBGcmFua2Vuc3RlaW5lZCBoZWF2aWx5IGZyb20gSm9yZGFuIERvYnNvbidzIElucHV0RmllbGQgc3R1ZmYgXG4jIGFuZCB0aGUgalF1ZXJ5IEF1dG9ncm93IHBsdWdpbi5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4jIEFmdGVyIGFkZGluZyB0aGUgbW9kdWxlLCBhZGQgdGhpcyB0byB5b3VyIEZyYW1lciBwcm90b3R5cGU6XG4jIHtBdXRvR3Jvd0lucHV0fSA9IHJlcXVpcmUgXCJBdXRvR3Jvd0lucHV0XCJcblxuIyBUaGVuIHlvdSBjYW4gd3JpdGUgY29vbCBzdHVmZiBsaWtlOlxuIyB0ZXh0ID0gbmV3IEF1dG9Hcm93SW5wdXRcbiMgXHRyZWZsb3dTaWJsaW5nczogdHJ1ZSBvciBmYWxzZSwgd2lsbCBtb3ZlIHN0dWZmIHVuZGVyIGl0IGFzIGl0IGNoYW5nZXMgaGVpZ2h0LlxuIyBcdHJlc2l6ZVBhcmVudDogdHJ1ZSBvciBmYWxzZSwgd2lsbCByZXNpemUgdGhlIHBhcmVudCBpZiB0aGluZ3MgZ2V0IHRvbyBsb25nLlxuIyBcdHBhZGRpbmc6IGV4OiBcIjE2cHggMTZweCAzNnB4IDE2cHhcIiAtIGp1c3QgYSBDU1MgZGVjbGFyYXRpb24gZm9yIGFueSBwYWRkaW5nIHlvdSdkIGxpa2UuXG4jIFx0cGxhY2VIb2xkZXI6IGV4OiBcIlR5cGUgeW91ciBjb21tZW50c1wiIC0gd2hhdGV2ZXIgeW91IHdhbnQgdGhlIHBsYWNlaG9sZGVyIHRleHQgdG8gYmUuXG4jICAgdmFsdWU6IGV4OiBcIlNpbHQgaXMuLi5cIiAtIHN0YXJ0ZXIgdmFsdWUgaWYgeW91IHdhbnQgdGV4dCBhbHJlYWR5IGluIHRoZXJlLlxuXG5cblxuY2xhc3MgZXhwb3J0cy5BdXRvR3Jvd0lucHV0IGV4dGVuZHMgTGF5ZXJcblxuXHQjIEV2ZW50c1xuXHRFdmVudHMuSW5wdXQgICA9IFwiSW5wdXRGaWVsZC5PbklucHV0XCJcblx0RXZlbnRzLkZvY3VzICAgPSBcIklucHV0RmllbGQuT25Gb2N1c1wiXG5cdEV2ZW50cy5CbHVyICAgID0gXCJJbnB1dEZpZWxkLk9uQmx1clwiXG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBwYXJlbnRPZ0hlaWdodCA9IG51bGxcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0ID0gXCIje0BvcHRpb25zLmxpbmVIZWlnaHR9cHhcIiBpZiBAb3B0aW9ucy5saW5lSGVpZ2h0P1xuXG5cdFx0IyBGcmFtZXIgTGF5ZXIgUHJvcHNcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0XHRcdD89IFwiNDhweFwiXG5cdFx0QG9wdGlvbnMubmFtZVx0XHRcdFx0Pz0gXCJBdXRvR3Jvd0lucHV0XCJcblx0XHRAb3B0aW9ucy5jb2xvclx0XHRcdD89IFwiIzIxMjEyMVwiXG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yXHQ/PSBcIndoaXRlXCJcblx0XHRAb3B0aW9ucy5oZWlnaHRcdFx0XHQ/PSAyMDBcblx0XHRAb3B0aW9ucy5ib3JkZXJSYWRpdXNcdFx0Pz0gMFxuXHRcdEBvcHRpb25zLndpZHRoXHRcdFx0Pz0gNDAwXG5cblx0XHQjIEN1c3RvbSBMYXllciBQcm9wc1x0XHRcblx0XHRAb3B0aW9ucy5mb250U2l6ZVx0XHRcdD89IDMyXG5cdFx0QG9wdGlvbnMuZm9udFdlaWdodFx0XHQ/PSAzMDBcblx0XHRAb3B0aW9ucy5wYWRkaW5nXHRcdFx0Pz0gXCIwXCJcblx0XHRAb3B0aW9ucy5mb250RmFtaWx5XHRcdD89IFwiLWFwcGxlLXN5c3RlbSwgSGVsdmV0aWNhIE5ldWVcIlxuXHRcdEBvcHRpb25zLm1pbkhlaWdodFx0XHRcdD89IEAub3B0aW9ucy5oZWlnaHRcblx0XHRAb3B0aW9ucy5wbGFjZUhvbGRlclx0XHQ/PSBcIlR5cGUgc29tZXRoaW5nXCJcblxuXHRcdFxuXHRcdEBvcHRpb25zLnJlc2l6ZVBhcmVudFx0XHQ/PSBmYWxzZVxuXHRcdEBvcHRpb25zLnBhcmVudEJvdHRvbVBhZGRpbmcgPz0gMFxuXHRcdEBvcHRpb25zLnJlZmxvd1NpYmxpbmdzXHRcdD89IGZhbHNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdGlmIEBvcHRpb25zLnJlc2l6ZVBhcmVudCA9PSB0cnVlIHRoZW4gQHBhcmVudE9nSGVpZ2h0ID0gQG9wdGlvbnMucGFyZW50LmhlaWdodFxuXHRcdFxuXHRcdCNDcmVhdGUgdGhlIHRleHRhcmVhXG5cdFx0QHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInRleHRhcmVhXCJcblx0XHRcblx0XHQjIEdpdmUgaXQgdGhlIGNvbnRlbnQgaWYgc29tZSBpcyBkZWZpbmVkXG5cdFx0QHRleHRhcmVhLnZhbHVlID0gQG9wdGlvbnMudmFsdWUgaWYgQG9wdGlvbnMudmFsdWU/XG5cdFx0QHRleHRhcmVhLnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXIgaWYgQG9wdGlvbnMucGxhY2VIb2xkZXI/XG5cdFx0XG5cdFx0IyBBZGQgaXQgdG8gdGhlIEZyYW1lciBMYXllclxuXHRcdEBfZWxlbWVudC5hcHBlbmRDaGlsZCBAdGV4dGFyZWFcblxuXHRcdCNEZWZpbmUgc3R5bGVzIGZvciB0aGUgdGV4dGFyZWFcblx0XHRAX3RleHRBcmVhU3R5bGUgPVxuXHRcdFx0Zm9udDogXCIje0BvcHRpb25zLmZvbnRXZWlnaHR9ICN7QG9wdGlvbnMuZm9udFNpemV9cHgvI3tAb3B0aW9ucy5saW5lSGVpZ2h0fSAje0BvcHRpb25zLmZvbnRGYW1pbHl9XCJcblx0XHRcdG91dGxpbmU6IFwibm9uZVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0aGVpZ2h0OiBcIjEwMCVcIlxuXHRcdFx0d2lkdGg6ICBcIjEwMCVcIlxuXHRcdFx0b3ZlcmZsb3c6IFwiaGlkZGVuXCJcblx0XHRcdHJlc2l6ZTogXCJub25lXCJcblx0XHRcdHBhZGRpbmcgOiBAb3B0aW9ucy5wYWRkaW5nXG5cdFx0XHRtYXJnaW46IFwiMFwiXG5cdFx0XHRcIi13ZWJraXQtYXBwZWFyYW5jZVwiOiBcIm5vbmVcIlxuXHRcdFx0XCJib3gtc2l6aW5nXCIgOiBcImJvcmRlci1ib3hcIlxuXG5cdFx0IyBBZGQgdGhvc2Ugc3R5bGVzIHRvIHRoZSB0ZXh0YXJlYVxuXHRcdEB0ZXh0YXJlYS5zdHlsZVtrZXldICA9IHZhbCBmb3Iga2V5LCB2YWwgb2YgQF90ZXh0QXJlYVN0eWxlXG5cdFx0QHRleHRhcmVhLnN0eWxlLmNvbG9yID0gQG9wdGlvbnMuY29sb3IgaWYgQG9wdGlvbnMuY29sb3I/XG5cblx0XHQjVXBkYXRlIHRoZSBoZWlnaHQgd2hlbmV2ZXIgYW55dGhpbmcgY2hhbmdlcy5cblx0XHRAdGV4dGFyZWEub25rZXlkb3duID0gPT4gQF91cGRhdGUoKVxuXHRcdEB0ZXh0YXJlYS5vbmtleXVwID0gPT4gQF91cGRhdGUoKVxuXHRcdEB0ZXh0YXJlYS5jaGFuZ2UgPSA9PiBAX3VwZGF0ZSgpXG5cdF9yZXNpemVQYXJlbnQgPSAobGF5ZXIsIHBhcmVudE1pbkhlaWdodCwgYm90dG9tUGFkZGluZykgLT5cblx0XHQjIFZhcmlhYmxlIGZvciBwYXJlbnRcblx0XHRsYXllclBhcmVudCA9IGxheWVyLnBhcmVudFxuXHRcdFxuXHRcdCMgQXJyYXkgdG8gc3RvcmUgYWxsIGNoaWxkcmVuJ3MgbWF4WXNcblx0XHRhbGxDaGlsZHJlbk1heFlzID0gW11cblx0XHRcblx0XHQjIFB1c2ggZWFjaCBtYXhZIHRvIGFuIGFycmF5XG5cdFx0Zm9yIG1heCBpbiBsYXllclBhcmVudC5jaGlsZHJlblxuXHRcdFx0YWxsQ2hpbGRyZW5NYXhZcy5wdXNoKG1heC5tYXhZKVxuXHRcdFx0XG5cdFx0IyBGaW5kIHRoZSBib3R0b20tbW9zdCBtYXhZIHZhbHVlXG5cdFx0dGFsbGVzdENoaWxkTWF4WSA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGFsbENoaWxkcmVuTWF4WXMpXG5cdFx0XG5cdFx0IyBTdG9yZSB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoYXQgYW5kIHRoZSBwYXJlbnQgbGF5ZXJcblx0XHRsYXllclBhcmVudC5oZWlnaHQgPSBNYXRoLm1heCh0YWxsZXN0Q2hpbGRNYXhZICsgYm90dG9tUGFkZGluZywgcGFyZW50TWluSGVpZ2h0KVxuXHRcdFxuXHRcdCMgVE9ETyAtIE1haW50YWluIHRoZSBib3R0b20gcGFkZGluZyBvZiB0aGUgcGFyZW50LlxuXHRcdFxuXHQjIFJlZmxvdyBhbGwgdGhlIHNpYmxpbmdzIHVuZGVyIHRoZSB0ZXh0IGxheWVyXG5cdF9yZWZsb3dTaWJsaW5ncyA9IChsYXllciwgbGF5ZXJNYXhZKSAtPlxuXHRcdGxheWVyTGlzdCA9IGxheWVyLnBhcmVudC5jaGlsZHJlblxuXHRcdGZvciBhIGluIFtsYXllckxpc3QuaW5kZXhPZihsYXllcikrMS4uLmxheWVyTGlzdC5sZW5ndGhdXG5cdFx0XHR5RGlmZiA9IGxheWVyTGlzdFthXS55IC0gbGF5ZXJNYXhZXG5cdFx0XHRsYXllckxpc3RbYV0ueSA9IGxheWVyLm1heFkgKyB5RGlmZlxuXHRcdCMgVE9ETyAtIHJlZG8gdGhpcyB3aXRob3V0IHRoZSBhc3N1bXB0aW9uIHRoYXQgYWxsIHNpYmxpbmdzIGFmdGVyIHRoZSBsYXllciBhcmUgYmVsb3cgaXQuXG5cdFx0XHRcblx0IyBVcGRhdGUgaGVpZ2h0IGZ1bmN0aW9uXG5cdF91cGRhdGU6ID0+XG5cdFx0c2V0VGltZW91dCA9PlxuXHRcdFx0bGF5ZXJNYXhZID0gQC5tYXhZXG5cdFx0XHQjIEFkZCBiYWNrIGFueSBsaW5lIGJyZWFrcyB0aGF0IHRoZSB2YWx1ZSBtZXRob2QgZ2V0cyByaWRlIG9mXG5cdFx0XHRfdHJ1ZVZhbHVlID0gQHRleHRhcmVhLnZhbHVlLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPiZuYnNwO1wiKTtcblx0XHRcdFxuXHRcdFx0IyBJZiBpdCdzIGVtcHR5LCBtYWtlIHN1cmUgdGhlcmUncyBhIGxldHRlciBpbiB0aGVyZSB0byBjYWxjdWxhdGUgKnNvbWV0aGluZypcblx0XHRcdGlmIF90cnVlVmFsdWUudHJpbSgpID09IFwiXCIgdGhlbiBfdHJ1ZVZhbHVlID0gXCJhXCJcblx0XHRcdFxuXHRcdFx0IyBDYWxjdWxhdGUgdGhlIGhlaWdodCEhIVxuXHRcdFx0Y2FsY0hlaWdodCA9IFV0aWxzLnJvdW5kKFV0aWxzLnRleHRTaXplKF90cnVlVmFsdWUsIEBfdGV4dEFyZWFTdHlsZSwge3dpZHRoOiBALndpZHRofSkuaGVpZ2h0LCAwKVxuXHRcdFx0XG5cdFx0XHQjIFNldCB0aGUgaGVpZ2h0IHRvIGVpdGhlciB0aGUgY2FsY3VsYXRlZCBoZWlnaHQsIG9yIHRoZSBtaW5IZWlnaHQsIHdoaWNoZXZlciBpcyBncmVhdGVyLlxuXHRcdFx0QC5oZWlnaHQgPSBNYXRoLm1heChjYWxjSGVpZ2h0LCBAb3B0aW9ucy5taW5IZWlnaHQpXG5cdFx0XHRpZiBAb3B0aW9ucy5yZWZsb3dTaWJsaW5ncyA9PSB0cnVlIHRoZW4gX3JlZmxvd1NpYmxpbmdzKEAsIGxheWVyTWF4WSlcblx0XHRcdGlmIEBvcHRpb25zLnJlc2l6ZVBhcmVudCA9PSB0cnVlIHRoZW4gX3Jlc2l6ZVBhcmVudChALCBAcGFyZW50T2dIZWlnaHQsIEBvcHRpb25zLnBhcmVudEJvdHRvbVBhZGRpbmcpXG5cbiNPdGhlciBpZGVhcyBcbiMgVE9ETzogSWYgdGhlIGhlaWdodCBpcyBzZXQgdGFsbGVyIHRoYW4gdGhlIG1pbmhlaWdodCBvcHRpb24sIHdoZW4geW91IHR5cGUgaXQgZ2xpdGNoZXMgdG8gdGhlIG1pbkhlaWdodCBvcHRpb24uIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURxQkEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQztBQUdiLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsS0FBUCxHQUFpQjs7RUFDakIsTUFBTSxDQUFDLEtBQVAsR0FBaUI7O0VBQ2pCLE1BQU0sQ0FBQyxJQUFQLEdBQWlCOztFQUVKLHVCQUFDLE9BQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLDRCQUFELFVBQVM7O0lBQ3RCLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQW9ELCtCQUFwRDtNQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUF5QixJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVYsR0FBcUIsS0FBN0M7OztVQUdRLENBQUMsYUFBZTs7O1dBQ2hCLENBQUMsT0FBVzs7O1dBQ1osQ0FBQyxRQUFXOzs7V0FDWixDQUFDLGtCQUFtQjs7O1dBQ3BCLENBQUMsU0FBWTs7O1dBQ2IsQ0FBQyxlQUFpQjs7O1dBQ2xCLENBQUMsUUFBVzs7O1dBR1osQ0FBQyxXQUFjOzs7V0FDZixDQUFDLGFBQWU7OztXQUNoQixDQUFDLFVBQWE7OztZQUNkLENBQUMsYUFBZTs7O1lBQ2hCLENBQUMsWUFBZSxJQUFDLENBQUMsT0FBTyxDQUFDOzs7WUFDMUIsQ0FBQyxjQUFnQjs7O1lBR2pCLENBQUMsZUFBaUI7OztZQUNsQixDQUFDLHNCQUF1Qjs7O1lBQ3hCLENBQUMsaUJBQW1COztJQUU1QiwrQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULEtBQXlCLElBQTVCO01BQXNDLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUMsQ0FB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
