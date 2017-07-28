require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AutoGrowInput":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AutoGrowInput = (function(superClass) {
  var _reflowSiblings, _resizeParent;

  extend(AutoGrowInput, superClass);

  Events.Input = "AutoGrowInput.OnInput";

  Events.Focus = "AutoGrowInput.OnFocus";

  Events.Blur = "AutoGrowInput.OnBlur";

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
    this.textarea.onfocus = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        return _this.emit(Events.Focus, _this.textarea.value, _this);
      };
    })(this);
    this.textarea.onblur = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (!(_this.textarea.placeholder === _this.options.placeHolder || (_this.options.placeHolder == null))) {
          _this.textarea.placeholder = _this.options.placeHolder;
        }
        return _this.emit(Events.Blur, _this.textarea.value, _this);
      };
    })(this);
    this.textarea.oninput = (function(_this) {
      return function() {
        var ref1;
        _this.isEmpty = !(((ref1 = _this.textarea.value) != null ? ref1.length : void 0) > 0);
        return _this.emit(Events.Input, _this.textarea.value, _this);
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


},{}],"CameraLayer":[function(require,module,exports){
var CameraLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CameraLayer = (function(superClass) {
  extend(CameraLayer, superClass);

  function CameraLayer(options) {
    var baseOptions, customProps, ref, ref1, ref2, ref3, ref4;
    if (options == null) {
      options = {};
    }
    customProps = {
      facing: true,
      flipped: true,
      autoFlip: true,
      resolution: true,
      fit: true
    };
    baseOptions = Object.keys(options).filter(function(key) {
      return !customProps[key];
    }).reduce(function(clone, key) {
      clone[key] = options[key];
      return clone;
    }, {});
    CameraLayer.__super__.constructor.call(this, baseOptions);
    this._facing = (ref = options.facing) != null ? ref : 'back';
    this._flipped = (ref1 = options.flipped) != null ? ref1 : false;
    this._autoFlip = (ref2 = options.autoFlip) != null ? ref2 : true;
    this._resolution = (ref3 = options.resolution) != null ? ref3 : 480;
    this._started = false;
    this._device = null;
    this._matchedFacing = 'unknown';
    this._stream = null;
    this._scheduledRestart = null;
    this._recording = null;
    this.backgroundColor = 'transparent';
    this.clip = true;
    this.player.src = '';
    this.player.autoplay = true;
    this.player.muted = true;
    this.player.style.objectFit = (ref4 = options.fit) != null ? ref4 : 'cover';
  }

  CameraLayer.define('facing', {
    get: function() {
      return this._facing;
    },
    set: function(facing) {
      this._facing = facing === 'front' ? facing : 'back';
      return this._setRestart();
    }
  });

  CameraLayer.define('flipped', {
    get: function() {
      return this._flipped;
    },
    set: function(flipped) {
      this._flipped = flipped;
      return this._setRestart();
    }
  });

  CameraLayer.define('autoFlip', {
    get: function() {
      return this._autoFlip;
    },
    set: function(autoFlip) {
      this._autoFlip = autoFlip;
      return this._setRestart();
    }
  });

  CameraLayer.define('resolution', {
    get: function() {
      return this._resolution;
    },
    set: function(resolution) {
      this._resolution = resolution;
      return this._setRestart();
    }
  });

  CameraLayer.define('fit', {
    get: function() {
      return this.player.style.objectFit;
    },
    set: function(fit) {
      return this.player.style.objectFit = fit;
    }
  });

  CameraLayer.define('isRecording', {
    get: function() {
      var ref;
      return ((ref = this._recording) != null ? ref.recorder.state : void 0) === 'recording';
    }
  });

  CameraLayer.prototype.toggleFacing = function() {
    this._facing = this._facing === 'front' ? 'back' : 'front';
    return this._setRestart();
  };

  CameraLayer.prototype.capture = function(width, height, ratio) {
    var canvas, context, url;
    if (width == null) {
      width = this.width;
    }
    if (height == null) {
      height = this.height;
    }
    if (ratio == null) {
      ratio = window.devicePixelRatio;
    }
    canvas = document.createElement("canvas");
    canvas.width = ratio * width;
    canvas.height = ratio * height;
    context = canvas.getContext("2d");
    this.draw(context);
    url = canvas.toDataURL();
    this.emit('capture', url);
    return url;
  };

  CameraLayer.prototype.draw = function(context) {
    var clipBox, cover, layerBox, ref, videoBox, videoHeight, videoWidth, x, y;
    if (!context) {
      return;
    }
    cover = function(srcW, srcH, dstW, dstH) {
      var scale, scaleX, scaleY;
      scaleX = dstW / srcW;
      scaleY = dstH / srcH;
      scale = scaleX > scaleY ? scaleX : scaleY;
      return {
        width: srcW * scale,
        height: srcH * scale
      };
    };
    ref = this.player, videoWidth = ref.videoWidth, videoHeight = ref.videoHeight;
    clipBox = {
      width: context.canvas.width,
      height: context.canvas.height
    };
    layerBox = cover(this.width, this.height, clipBox.width, clipBox.height);
    videoBox = cover(videoWidth, videoHeight, layerBox.width, layerBox.height);
    x = (clipBox.width - videoBox.width) / 2;
    y = (clipBox.height - videoBox.height) / 2;
    return context.drawImage(this.player, x, y, videoBox.width, videoBox.height);
  };

  CameraLayer.prototype.start = function() {
    return this._enumerateDevices().then((function(_this) {
      return function(devices) {
        var device, i, len;
        devices = devices.filter(function(device) {
          return device.kind === 'videoinput';
        });
        for (i = 0, len = devices.length; i < len; i++) {
          device = devices[i];
          if (device.label.indexOf(_this._facing) !== -1) {
            _this._matchedFacing = _this._facing;
            return device;
          }
        }
        _this._matchedFacing = 'unknown';
        if (devices.length > 0) {
          return devices[0];
        } else {
          return Promise.reject();
        }
      };
    })(this)).then((function(_this) {
      return function(device) {
        var constraints, ref;
        if (!device || device.deviceId === ((ref = _this._device) != null ? ref.deviceId : void 0)) {
          return;
        }
        _this.stop();
        _this._device = device;
        constraints = {
          video: {
            mandatory: {
              minWidth: _this._resolution,
              minHeight: _this._resolution
            },
            optional: [
              {
                sourceId: _this._device.deviceId
              }
            ]
          },
          audio: true
        };
        return _this._getUserMedia(constraints);
      };
    })(this)).then((function(_this) {
      return function(stream) {
        _this.player.src = URL.createObjectURL(stream);
        _this._started = true;
        _this._stream = stream;
        return _this._flip();
      };
    })(this))["catch"](function(error) {
      return console.error(error);
    });
  };

  CameraLayer.prototype.stop = function() {
    var ref;
    this._started = false;
    this.player.pause();
    this.player.src = '';
    if ((ref = this._stream) != null) {
      ref.getTracks().forEach(function(track) {
        return track.stop();
      });
    }
    this._stream = null;
    this._device = null;
    if (this._scheduledRestart) {
      cancelAnimationFrame(this._scheduledRestart);
      return this._scheduledRestart = null;
    }
  };

  CameraLayer.prototype.startRecording = function() {
    var chunks, recorder;
    if (this._recording) {
      this._recording.recorder.stop();
      this._recording = null;
    }
    chunks = [];
    recorder = new MediaRecorder(this._stream, {
      mimeType: 'video/webm'
    });
    recorder.addEventListener('start', (function(_this) {
      return function(event) {
        return _this.emit('startrecording');
      };
    })(this));
    recorder.addEventListener('dataavailable', function(event) {
      return chunks.push(event.data);
    });
    recorder.addEventListener('stop', (function(_this) {
      return function(event) {
        var blob, url;
        blob = new Blob(chunks);
        url = window.URL.createObjectURL(blob);
        _this.emit('stoprecording');
        return _this.emit('record', url);
      };
    })(this));
    recorder.start();
    return this._recording = {
      recorder: recorder,
      chunks: chunks
    };
  };

  CameraLayer.prototype.stopRecording = function() {
    if (!this._recording) {
      return;
    }
    this._recording.recorder.stop();
    return this._recording = null;
  };

  CameraLayer.prototype.onCapture = function(callback) {
    return this.on('capture', callback);
  };

  CameraLayer.prototype.onStartRecording = function(callback) {
    return this.on('startrecording', callback);
  };

  CameraLayer.prototype.onStopRecording = function(callback) {
    return this.on('stoprecording', callback);
  };

  CameraLayer.prototype.onRecord = function(callback) {
    return this.on('record', callback);
  };

  CameraLayer.prototype._setRestart = function() {
    if (!this._started || this._scheduledRestart) {
      return;
    }
    return this._scheduledRestart = requestAnimationFrame((function(_this) {
      return function() {
        _this._scheduledRestart = null;
        return _this.start();
      };
    })(this));
  };

  CameraLayer.prototype._flip = function() {
    var x;
    if (this._autoFlip) {
      this._flipped = this._matchedFacing === 'front';
    }
    x = this._flipped ? -1 : 1;
    return this.player.style.webkitTransform = "scale(" + x + ", 1)";
  };

  CameraLayer.prototype._enumerateDevices = function() {
    try {
      return navigator.mediaDevices.enumerateDevices();
    } catch (error1) {
      return Promise.reject();
    }
  };

  CameraLayer.prototype._getUserMedia = function(constraints) {
    return new Promise(function(resolve, reject) {
      var gum;
      try {
        gum = navigator.getUserMedia || navigator.webkitGetUserMedia;
        return gum.call(navigator, constraints, resolve, reject);
      } catch (error1) {
        return reject();
      }
    });
  };

  return CameraLayer;

})(VideoLayer);

if (typeof module !== "undefined" && module !== null) {
  module.exports = CameraLayer;
}

Framer.CameraLayer = CameraLayer;


},{}],"Pointer":[function(require,module,exports){
exports.Pointer = (function() {
  var clientCoords, coords, offsetArgumentError, offsetCoords, screenArgumentError;

  function Pointer() {}

  Pointer.screen = function(event, layer) {
    var e, screenCoords;
    if (!((event != null) && (layer != null))) {
      screenArgumentError();
    }
    e = offsetCoords(event);
    if (e.x && e.y) {
      screenCoords = layer.screenFrame;
      e.x += screenCoords.x;
      e.y += screenCoords.y;
    } else {
      e = clientCoords(event);
    }
    return e;
  };

  Pointer.offset = function(event, layer) {
    var e, targetScreenCoords;
    if (!((event != null) && (layer != null))) {
      offsetArgumentError();
    }
    e = offsetCoords(event);
    if (!((e.x != null) && (e.y != null))) {
      e = clientCoords(event);
      targetScreenCoords = layer.screenFrame;
      e.x -= targetScreenCoords.x;
      e.y -= targetScreenCoords.y;
    }
    return e;
  };

  offsetCoords = function(ev) {
    var e;
    e = Events.touchEvent(ev);
    return coords(e.offsetX, e.offsetY);
  };

  clientCoords = function(ev) {
    var e;
    e = Events.touchEvent(ev);
    return coords(e.clientX, e.clientY);
  };

  coords = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  screenArgumentError = function() {
    error(null);
    return console.error("Pointer.screen() Error: You must pass event & layer arguments. \n\nExample: layer.on Events.TouchStart,(event,layer) -> Pointer.screen(event, layer)");
  };

  offsetArgumentError = function() {
    error(null);
    return console.error("Pointer.offset() Error: You must pass event & layer arguments. \n\nExample: layer.on Events.TouchStart,(event,layer) -> Pointer.offset(event, layer)");
  };

  return Pointer;

})();


},{}],"androidRipple":[function(require,module,exports){
var Pointer;

Pointer = require("Pointer").Pointer;

exports.Ripple = function(event, layer) {
  var animation, color, eventCoords, pressFeedback, rippleCircle;
  eventCoords = Pointer.offset(event, layer);
  color = "black";
  animation = {
    curve: "ease-out",
    time: .4
  };
  pressFeedback = new Layer({
    superLayer: this,
    name: "pressFeedback",
    width: layer.width,
    height: layer.height,
    opacity: 0,
    backgroundColor: color
  });
  pressFeedback.states.add({
    pressed: {
      opacity: .04
    }
  });
  pressFeedback.states["switch"]("pressed", animation);
  rippleCircle = new Layer({
    superLayer: this,
    name: "rippleCircle",
    borderRadius: "50%",
    midX: eventCoords.x,
    midY: eventCoords.y,
    opacity: .16,
    backgroundColor: color
  });
  rippleCircle.states.add({
    pressed: {
      scale: layer.width / 60,
      opacity: 0
    }
  });
  rippleCircle.states["switch"]("pressed", animation);
  return Utils.delay(0.3, function() {
    pressFeedback.states.next("default", animation);
    return pressFeedback.on(Events.AnimationEnd, function() {
      rippleCircle.destroy();
      return pressFeedback.destroy();
    });
  });
};


},{"Pointer":"Pointer"}],"firebase":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Firebase = (function(superClass) {
  var request;

  extend(Firebase, superClass);

  Firebase.define("status", {
    get: function() {
      return this._status;
    }
  });

  function Firebase(options) {
    var base, base1, base2;
    this.options = options != null ? options : {};
    this.projectID = (base = this.options).projectID != null ? base.projectID : base.projectID = null;
    this.secret = (base1 = this.options).secret != null ? base1.secret : base1.secret = null;
    this.debug = (base2 = this.options).debug != null ? base2.debug : base2.debug = false;
    if (this._status == null) {
      this._status = "disconnected";
    }
    this.secretEndPoint = this.secret ? "?auth=" + this.secret : "?";
    Firebase.__super__.constructor.apply(this, arguments);
    if (this.debug) {
      console.log("Firebase: Connecting to Firebase Project '" + this.projectID + "' ... \n URL: 'https://" + this.projectID + ".firebaseio.com'");
    }
    this.onChange("connection");
  }

  request = function(project, secret, path, callback, method, data, parameters, debug) {
    var url, xhttp;
    url = "https://" + project + ".firebaseio.com" + path + ".json" + secret;
    if (parameters !== void 0) {
      if (parameters.shallow) {
        url += "&shallow=true";
      }
      if (parameters.format === "export") {
        url += "&format=export";
      }
      switch (parameters.print) {
        case "pretty":
          url += "&print=pretty";
          break;
        case "silent":
          url += "&print=silent";
      }
      if (typeof parameters.download === "string") {
        url += "&download=" + parameters.download;
        window.open(url, "_self");
      }
      if (typeof parameters.orderBy === "string") {
        url += "&orderBy=" + '"' + parameters.orderBy + '"';
      }
      if (typeof parameters.limitToFirst === "number") {
        print(url += "&limitToFirst=" + parameters.limitToFirst);
      }
      if (typeof parameters.limitToLast === "number") {
        url += "&limitToLast=" + parameters.limitToLast;
      }
      if (typeof parameters.startAt === "number") {
        url += "&startAt=" + parameters.startAt;
      }
      if (typeof parameters.endAt === "number") {
        url += "&endAt=" + parameters.endAt;
      }
      if (typeof parameters.equalTo === "number") {
        url += "&equalTo=" + parameters.equalTo;
      }
    }
    xhttp = new XMLHttpRequest;
    if (debug) {
      console.log("Firebase: New '" + method + "'-request with data: '" + (JSON.stringify(data)) + "' \n URL: '" + url + "'");
    }
    xhttp.onreadystatechange = (function(_this) {
      return function() {
        if (parameters !== void 0) {
          if (parameters.print === "silent" || typeof parameters.download === "string") {
            return;
          }
        }
        switch (xhttp.readyState) {
          case 0:
            if (debug) {
              console.log("Firebase: Request not initialized \n URL: '" + url + "'");
            }
            break;
          case 1:
            if (debug) {
              console.log("Firebase: Server connection established \n URL: '" + url + "'");
            }
            break;
          case 2:
            if (debug) {
              console.log("Firebase: Request received \n URL: '" + url + "'");
            }
            break;
          case 3:
            if (debug) {
              console.log("Firebase: Processing request \n URL: '" + url + "'");
            }
            break;
          case 4:
            if (callback != null) {
              callback(JSON.parse(xhttp.responseText));
            }
            if (debug) {
              console.log("Firebase: Request finished, response: '" + (JSON.parse(xhttp.responseText)) + "' \n URL: '" + url + "'");
            }
        }
        if (xhttp.status === "404") {
          if (debug) {
            return console.warn("Firebase: Invalid request, page not found \n URL: '" + url + "'");
          }
        }
      };
    })(this);
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    return xhttp.send(data = "" + (JSON.stringify(data)));
  };

  Firebase.prototype.get = function(path, callback, parameters) {
    return request(this.projectID, this.secretEndPoint, path, callback, "GET", null, parameters, this.debug);
  };

  Firebase.prototype.put = function(path, data, callback, parameters) {
    return request(this.projectID, this.secretEndPoint, path, callback, "PUT", data, parameters, this.debug);
  };

  Firebase.prototype.post = function(path, data, callback, parameters) {
    return request(this.projectID, this.secretEndPoint, path, callback, "POST", data, parameters, this.debug);
  };

  Firebase.prototype.patch = function(path, data, callback, parameters) {
    return request(this.projectID, this.secretEndPoint, path, callback, "PATCH", data, parameters, this.debug);
  };

  Firebase.prototype["delete"] = function(path, callback, parameters) {
    return request(this.projectID, this.secretEndPoint, path, callback, "DELETE", null, parameters, this.debug);
  };

  Firebase.prototype.onChange = function(path, callback) {
    var currentStatus, source, url;
    if (path === "connection") {
      url = "https://" + this.projectID + ".firebaseio.com/.json" + this.secretEndPoint;
      currentStatus = "disconnected";
      source = new EventSource(url);
      source.addEventListener("open", (function(_this) {
        return function() {
          if (currentStatus === "disconnected") {
            _this._status = "connected";
            if (callback != null) {
              callback("connected");
            }
            if (_this.debug) {
              console.log("Firebase: Connection to Firebase Project '" + _this.projectID + "' established");
            }
          }
          return currentStatus = "connected";
        };
      })(this));
      return source.addEventListener("error", (function(_this) {
        return function() {
          if (currentStatus === "connected") {
            _this._status = "disconnected";
            if (callback != null) {
              callback("disconnected");
            }
            if (_this.debug) {
              console.warn("Firebase: Connection to Firebase Project '" + _this.projectID + "' closed");
            }
          }
          return currentStatus = "disconnected";
        };
      })(this));
    } else {
      url = "https://" + this.projectID + ".firebaseio.com" + path + ".json" + this.secretEndPoint;
      source = new EventSource(url);
      if (this.debug) {
        console.log("Firebase: Listening to changes made to '" + path + "' \n URL: '" + url + "'");
      }
      source.addEventListener("put", (function(_this) {
        return function(ev) {
          if (callback != null) {
            callback(JSON.parse(ev.data).data, "put", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
          }
          if (_this.debug) {
            return console.log("Firebase: Received changes made to '" + path + "' via 'PUT': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
          }
        };
      })(this));
      return source.addEventListener("patch", (function(_this) {
        return function(ev) {
          if (callback != null) {
            callback(JSON.parse(ev.data).data, "patch", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
          }
          if (_this.debug) {
            return console.log("Firebase: Received changes made to '" + path + "' via 'PATCH': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
          }
        };
      })(this));
    }
  };

  return Firebase;

})(Framer.BaseClass);


},{}],"html2canvas":[function(require,module,exports){
(function (global){
/*
  html2canvas 0.5.0-beta3 <http://html2canvas.hertzen.com>
  Copyright (c) 2016 Niklas von Hertzen

  Released under  License
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.html2canvas=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
var log = _dereq_('./log');

function restoreOwnerScroll(ownerDocument, x, y) {
    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
        ownerDocument.defaultView.scrollTo(x, y);
    }
}

function cloneCanvasContents(canvas, clonedCanvas) {
    try {
        if (clonedCanvas) {
            clonedCanvas.width = canvas.width;
            clonedCanvas.height = canvas.height;
            clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        }
    } catch(e) {
        log("Unable to copy canvas content from", canvas, e);
    }
}

function cloneNode(node, javascriptEnabled) {
    var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

    var child = node.firstChild;
    while(child) {
        if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
            clone.appendChild(cloneNode(child, javascriptEnabled));
        }
        child = child.nextSibling;
    }

    if (node.nodeType === 1) {
        clone._scrollTop = node.scrollTop;
        clone._scrollLeft = node.scrollLeft;
        if (node.nodeName === "CANVAS") {
            cloneCanvasContents(node, clone);
        } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
            clone.value = node.value;
        }
    }

    return clone;
}

function initNode(node) {
    if (node.nodeType === 1) {
        node.scrollTop = node._scrollTop;
        node.scrollLeft = node._scrollLeft;

        var child = node.firstChild;
        while(child) {
            initNode(child);
            child = child.nextSibling;
        }
    }
}

module.exports = function(ownerDocument, containerDocument, width, height, options, x ,y) {
    var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
    var container = containerDocument.createElement("iframe");

    container.className = "html2canvas-container";
    container.style.visibility = "hidden";
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0px";
    container.style.border = "0";
    container.width = width;
    container.height = height;
    container.scrolling = "no"; // ios won't scroll without it
    containerDocument.body.appendChild(container);

    return new Promise(function(resolve) {
        var documentClone = container.contentWindow.document;

        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
         if window url is about:blank, we can assign the url to current by writing onto the document
         */
        container.contentWindow.onload = container.onload = function() {
            var interval = setInterval(function() {
                if (documentClone.body.childNodes.length > 0) {
                    initNode(documentClone.documentElement);
                    clearInterval(interval);
                    if (options.type === "view") {
                        container.contentWindow.scrollTo(x, y);
                        if ((/(iPad|iPhone|iPod)/g).test(navigator.userAgent) && (container.contentWindow.scrollY !== y || container.contentWindow.scrollX !== x)) {
                            documentClone.documentElement.style.top = (-y) + "px";
                            documentClone.documentElement.style.left = (-x) + "px";
                            documentClone.documentElement.style.position = 'absolute';
                        }
                    }
                    resolve(container);
                }
            }, 50);
        };

        documentClone.open();
        documentClone.write("<!DOCTYPE html><html></html>");
        // Chrome scrolls the parent document for some reason after the write to the cloned window???
        restoreOwnerScroll(ownerDocument, x, y);
        documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
        documentClone.close();
    });
};

},{"./log":13}],3:[function(_dereq_,module,exports){
// http://dev.w3.org/csswg/css-color/

function Color(value) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = null;
    var result = this.fromArray(value) ||
        this.namedColor(value) ||
        this.rgb(value) ||
        this.rgba(value) ||
        this.hex6(value) ||
        this.hex3(value);
}

Color.prototype.darken = function(amount) {
    var a = 1 - amount;
    return  new Color([
        Math.round(this.r * a),
        Math.round(this.g * a),
        Math.round(this.b * a),
        this.a
    ]);
};

Color.prototype.isTransparent = function() {
    return this.a === 0;
};

Color.prototype.isBlack = function() {
    return this.r === 0 && this.g === 0 && this.b === 0;
};

Color.prototype.fromArray = function(array) {
    if (Array.isArray(array)) {
        this.r = Math.min(array[0], 255);
        this.g = Math.min(array[1], 255);
        this.b = Math.min(array[2], 255);
        if (array.length > 3) {
            this.a = array[3];
        }
    }

    return (Array.isArray(array));
};

var _hex3 = /^#([a-f0-9]{3})$/i;

Color.prototype.hex3 = function(value) {
    var match = null;
    if ((match = value.match(_hex3)) !== null) {
        this.r = parseInt(match[1][0] + match[1][0], 16);
        this.g = parseInt(match[1][1] + match[1][1], 16);
        this.b = parseInt(match[1][2] + match[1][2], 16);
    }
    return match !== null;
};

var _hex6 = /^#([a-f0-9]{6})$/i;

Color.prototype.hex6 = function(value) {
    var match = null;
    if ((match = value.match(_hex6)) !== null) {
        this.r = parseInt(match[1].substring(0, 2), 16);
        this.g = parseInt(match[1].substring(2, 4), 16);
        this.b = parseInt(match[1].substring(4, 6), 16);
    }
    return match !== null;
};


var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

Color.prototype.rgb = function(value) {
    var match = null;
    if ((match = value.match(_rgb)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
    }
    return match !== null;
};

var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

Color.prototype.rgba = function(value) {
    var match = null;
    if ((match = value.match(_rgba)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
        this.a = Number(match[4]);
    }
    return match !== null;
};

Color.prototype.toString = function() {
    return this.a !== null && this.a !== 1 ?
    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
};

Color.prototype.namedColor = function(value) {
    value = value.toLowerCase();
    var color = colors[value];
    if (color) {
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];
    } else if (value === "transparent") {
        this.r = this.g = this.b = this.a = 0;
        return true;
    }

    return !!color;
};

Color.prototype.isColor = true;

// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
var colors = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
};

module.exports = Color;

},{}],4:[function(_dereq_,module,exports){
var Support = _dereq_('./support');
var CanvasRenderer = _dereq_('./renderers/canvas');
var ImageLoader = _dereq_('./imageloader');
var NodeParser = _dereq_('./nodeparser');
var NodeContainer = _dereq_('./nodecontainer');
var log = _dereq_('./log');
var utils = _dereq_('./utils');
var createWindowClone = _dereq_('./clone');
var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;
var getBounds = utils.getBounds;

var html2canvasNodeAttribute = "data-html2canvas-node";
var html2canvasCloneIndex = 0;

function html2canvas(nodeList, options) {
    var index = html2canvasCloneIndex++;
    options = options || {};
    if (options.logging) {
        log.options.logging = true;
        log.options.start = Date.now();
    }

    options.async = typeof(options.async) === "undefined" ? true : options.async;
    options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
    options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
    options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
    options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
    options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
    options.strict = !!options.strict;

    if (typeof(nodeList) === "string") {
        if (typeof(options.proxy) !== "string") {
            return Promise.reject("Proxy must be used when rendering url");
        }
        var width = options.width != null ? options.width : window.innerWidth;
        var height = options.height != null ? options.height : window.innerHeight;
        return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
            return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
        });
    }

    var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
    node.setAttribute(html2canvasNodeAttribute + index, index);
    return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
        if (typeof(options.onrendered) === "function") {
            log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
            options.onrendered(canvas);
        }
        return canvas;
    });
}

html2canvas.CanvasRenderer = CanvasRenderer;
html2canvas.NodeContainer = NodeContainer;
html2canvas.log = log;
html2canvas.utils = utils;

var html2canvasExport = (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") ? function() {
    return Promise.reject("No canvas support");
} : html2canvas;

module.exports = html2canvasExport;

if (typeof(define) === 'function' && define.amd) {
    define('html2canvas', [], function() {
        return html2canvasExport;
    });
}

function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
    return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
        log("Document cloned");
        var attributeName = html2canvasNodeAttribute + html2canvasIndex;
        var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
        document.querySelector(selector).removeAttribute(attributeName);
        var clonedWindow = container.contentWindow;
        var node = clonedWindow.document.querySelector(selector);
        var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
        return oncloneHandler.then(function() {
            return renderWindow(node, container, options, windowWidth, windowHeight);
        });
    });
}

function renderWindow(node, container, options, windowWidth, windowHeight) {
    var clonedWindow = container.contentWindow;
    var support = new Support(clonedWindow.document);
    var imageLoader = new ImageLoader(options, support);
    var bounds = getBounds(node);
    var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
    var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
    var renderer = new options.renderer(width, height, imageLoader, options, document);
    var parser = new NodeParser(node, renderer, support, imageLoader, options);
    return parser.ready.then(function() {
        log("Finished rendering");
        var canvas;

        if (options.type === "view") {
            canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
        } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
            canvas = renderer.canvas;
        } else {
            canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0});
        }

        cleanupContainer(container, options);
        return canvas;
    });
}

function cleanupContainer(container, options) {
    if (options.removeContainer) {
        container.parentNode.removeChild(container);
        log("Cleaned up container");
    }
}

function crop(canvas, bounds) {
    var croppedCanvas = document.createElement("canvas");
    var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
    var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
    var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
    var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
    croppedCanvas.width = bounds.width;
    croppedCanvas.height =  bounds.height;
    var width = x2-x1;
    var height = y2-y1;
    log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", width, "height:", height);
    log("Resulting crop with width", bounds.width, "and height", bounds.height, "with x", x1, "and y", y1);
    croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, bounds.x, bounds.y, width, height);
    return croppedCanvas;
}

function documentWidth (doc) {
    return Math.max(
        Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
        Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
        Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
    );
}

function documentHeight (doc) {
    return Math.max(
        Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
        Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
        Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
    );
}

function absoluteUrl(url) {
    var link = document.createElement("a");
    link.href = url;
    link.href = link.href;
    return link;
}

},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var smallImage = _dereq_('./utils').smallImage;

function DummyImageContainer(src) {
    this.src = src;
    log("DummyImageContainer for", src);
    if (!this.promise || !this.image) {
        log("Initiating DummyImageContainer");
        DummyImageContainer.prototype.image = new Image();
        var image = this.image;
        DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
            image.onload = resolve;
            image.onerror = reject;
            image.src = smallImage();
            if (image.complete === true) {
                resolve(image);
            }
        });
    }
}

module.exports = DummyImageContainer;

},{"./log":13,"./utils":26}],6:[function(_dereq_,module,exports){
var smallImage = _dereq_('./utils').smallImage;

function Font(family, size) {
    var container = document.createElement('div'),
        img = document.createElement('img'),
        span = document.createElement('span'),
        sampleText = 'Hidden Text',
        baseline,
        middle;

    container.style.visibility = "hidden";
    container.style.fontFamily = family;
    container.style.fontSize = size;
    container.style.margin = 0;
    container.style.padding = 0;

    document.body.appendChild(container);

    img.src = smallImage();
    img.width = 1;
    img.height = 1;

    img.style.margin = 0;
    img.style.padding = 0;
    img.style.verticalAlign = "baseline";

    span.style.fontFamily = family;
    span.style.fontSize = size;
    span.style.margin = 0;
    span.style.padding = 0;

    span.appendChild(document.createTextNode(sampleText));
    container.appendChild(span);
    container.appendChild(img);
    baseline = (img.offsetTop - span.offsetTop) + 1;

    container.removeChild(span);
    container.appendChild(document.createTextNode(sampleText));

    container.style.lineHeight = "normal";
    img.style.verticalAlign = "super";

    middle = (img.offsetTop-container.offsetTop) + 1;

    document.body.removeChild(container);

    this.baseline = baseline;
    this.lineWidth = 1;
    this.middle = middle;
}

module.exports = Font;

},{"./utils":26}],7:[function(_dereq_,module,exports){
var Font = _dereq_('./font');

function FontMetrics() {
    this.data = {};
}

FontMetrics.prototype.getMetrics = function(family, size) {
    if (this.data[family + "-" + size] === undefined) {
        this.data[family + "-" + size] = new Font(family, size);
    }
    return this.data[family + "-" + size];
};

module.exports = FontMetrics;

},{"./font":6}],8:[function(_dereq_,module,exports){
var utils = _dereq_('./utils');
var getBounds = utils.getBounds;
var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

function FrameContainer(container, sameOrigin, options) {
    this.image = null;
    this.src = container;
    var self = this;
    var bounds = getBounds(container);
    this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
        if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
            container.contentWindow.onload = container.onload = function() {
                resolve(container);
            };
        } else {
            resolve(container);
        }
    })).then(function(container) {
        var html2canvas = _dereq_('./core');
        return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
    }).then(function(canvas) {
        return self.image = canvas;
    });
}

FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
    var container = this.src;
    return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
};

module.exports = FrameContainer;

},{"./core":4,"./proxy":16,"./utils":26}],9:[function(_dereq_,module,exports){
function GradientContainer(imageData) {
    this.src = imageData.value;
    this.colorStops = [];
    this.type = null;
    this.x0 = 0.5;
    this.y0 = 0.5;
    this.x1 = 0.5;
    this.y1 = 0.5;
    this.promise = Promise.resolve(true);
}

GradientContainer.TYPES = {
    LINEAR: 1,
    RADIAL: 2
};

// TODO: support hsl[a], negative %/length values
// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;

module.exports = GradientContainer;

},{}],10:[function(_dereq_,module,exports){
function ImageContainer(src, cors) {
    this.src = src;
    this.image = new Image();
    var self = this;
    this.tainted = null;
    this.promise = new Promise(function(resolve, reject) {
        self.image.onload = resolve;
        self.image.onerror = reject;
        if (cors) {
            self.image.crossOrigin = "anonymous";
        }
        self.image.src = src;
        if (self.image.complete === true) {
            resolve(self.image);
        }
    });
}

module.exports = ImageContainer;

},{}],11:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var ImageContainer = _dereq_('./imagecontainer');
var DummyImageContainer = _dereq_('./dummyimagecontainer');
var ProxyImageContainer = _dereq_('./proxyimagecontainer');
var FrameContainer = _dereq_('./framecontainer');
var SVGContainer = _dereq_('./svgcontainer');
var SVGNodeContainer = _dereq_('./svgnodecontainer');
var LinearGradientContainer = _dereq_('./lineargradientcontainer');
var WebkitGradientContainer = _dereq_('./webkitgradientcontainer');
var bind = _dereq_('./utils').bind;

function ImageLoader(options, support) {
    this.link = null;
    this.options = options;
    this.support = support;
    this.origin = this.getOrigin(window.location.href);
}

ImageLoader.prototype.findImages = function(nodes) {
    var images = [];
    nodes.reduce(function(imageNodes, container) {
        switch(container.node.nodeName) {
        case "IMG":
            return imageNodes.concat([{
                args: [container.node.src],
                method: "url"
            }]);
        case "svg":
        case "IFRAME":
            return imageNodes.concat([{
                args: [container.node],
                method: container.node.nodeName
            }]);
        }
        return imageNodes;
    }, []).forEach(this.addImage(images, this.loadImage), this);
    return images;
};

ImageLoader.prototype.findBackgroundImage = function(images, container) {
    container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
    return images;
};

ImageLoader.prototype.addImage = function(images, callback) {
    return function(newImage) {
        newImage.args.forEach(function(image) {
            if (!this.imageExists(images, image)) {
                images.splice(0, 0, callback.call(this, newImage));
                log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
            }
        }, this);
    };
};

ImageLoader.prototype.hasImageBackground = function(imageData) {
    return imageData.method !== "none";
};

ImageLoader.prototype.loadImage = function(imageData) {
    if (imageData.method === "url") {
        var src = imageData.args[0];
        if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
            return new SVGContainer(src);
        } else if (src.match(/data:image\/.*;base64,/i)) {
            return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
        } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
            return new ImageContainer(src, false);
        } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
            return new ImageContainer(src, true);
        } else if (this.options.proxy) {
            return new ProxyImageContainer(src, this.options.proxy);
        } else {
            return new DummyImageContainer(src);
        }
    } else if (imageData.method === "linear-gradient") {
        return new LinearGradientContainer(imageData);
    } else if (imageData.method === "gradient") {
        return new WebkitGradientContainer(imageData);
    } else if (imageData.method === "svg") {
        return new SVGNodeContainer(imageData.args[0], this.support.svg);
    } else if (imageData.method === "IFRAME") {
        return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
    } else {
        return new DummyImageContainer(imageData);
    }
};

ImageLoader.prototype.isSVG = function(src) {
    return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
};

ImageLoader.prototype.imageExists = function(images, src) {
    return images.some(function(image) {
        return image.src === src;
    });
};

ImageLoader.prototype.isSameOrigin = function(url) {
    return (this.getOrigin(url) === this.origin);
};

ImageLoader.prototype.getOrigin = function(url) {
    var link = this.link || (this.link = document.createElement("a"));
    link.href = url;
    link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
    return link.protocol + link.hostname + link.port;
};

ImageLoader.prototype.getPromise = function(container) {
    return this.timeout(container, this.options.imageTimeout)['catch'](function() {
        var dummy = new DummyImageContainer(container.src);
        return dummy.promise.then(function(image) {
            container.image = image;
        });
    });
};

ImageLoader.prototype.get = function(src) {
    var found = null;
    return this.images.some(function(img) {
        return (found = img).src === src;
    }) ? found : null;
};

ImageLoader.prototype.fetch = function(nodes) {
    this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
    this.images.forEach(function(image, index) {
        image.promise.then(function() {
            log("Succesfully loaded image #"+ (index+1), image);
        }, function(e) {
            log("Failed loading image #"+ (index+1), image, e);
        });
    });
    this.ready = Promise.all(this.images.map(this.getPromise, this));
    log("Finished searching images");
    return this;
};

ImageLoader.prototype.timeout = function(container, timeout) {
    var timer;
    var promise = Promise.race([container.promise, new Promise(function(res, reject) {
        timer = setTimeout(function() {
            log("Timed out loading image", container);
            reject(container);
        }, timeout);
    })]).then(function(container) {
        clearTimeout(timer);
        return container;
    });
    promise['catch'](function() {
        clearTimeout(timer);
    });
    return promise;
};

module.exports = ImageLoader;

},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(_dereq_,module,exports){
var GradientContainer = _dereq_('./gradientcontainer');
var Color = _dereq_('./color');

function LinearGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = GradientContainer.TYPES.LINEAR;

    var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test( imageData.args[0] ) ||
        !GradientContainer.REGEXP_COLORSTOP.test( imageData.args[0] );

    if (hasDirection) {
        imageData.args[0].split(/\s+/).reverse().forEach(function(position, index) {
            switch(position) {
            case "left":
                this.x0 = 0;
                this.x1 = 1;
                break;
            case "top":
                this.y0 = 0;
                this.y1 = 1;
                break;
            case "right":
                this.x0 = 1;
                this.x1 = 0;
                break;
            case "bottom":
                this.y0 = 1;
                this.y1 = 0;
                break;
            case "to":
                var y0 = this.y0;
                var x0 = this.x0;
                this.y0 = this.y1;
                this.x0 = this.x1;
                this.x1 = x0;
                this.y1 = y0;
                break;
            case "center":
                break; // centered by default
            // Firefox internally converts position keywords to percentages:
            // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position
            default: // percentage or absolute length
                // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
                var ratio = parseFloat(position, 10) * 1e-2;
                if (isNaN(ratio)) { // invalid or unhandled value
                    break;
                }
                if (index === 0) {
                    this.y0 = ratio;
                    this.y1 = 1 - this.y0;
                } else {
                    this.x0 = ratio;
                    this.x1 = 1 - this.x0;
                }
                break;
            }
        }, this);
    } else {
        this.y0 = 0;
        this.y1 = 1;
    }

    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
        var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
        var value = +colorStopMatch[2];
        var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"
        return {
            color: new Color(colorStopMatch[1]),
            // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
            stop: unit === "%" ? value / 100 : null
        };
    });

    if (this.colorStops[0].stop === null) {
        this.colorStops[0].stop = 0;
    }

    if (this.colorStops[this.colorStops.length - 1].stop === null) {
        this.colorStops[this.colorStops.length - 1].stop = 1;
    }

    // calculates and fills-in explicit stop positions when omitted from rule
    this.colorStops.forEach(function(colorStop, index) {
        if (colorStop.stop === null) {
            this.colorStops.slice(index).some(function(find, count) {
                if (find.stop !== null) {
                    colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
                    return true;
                } else {
                    return false;
                }
            }, this);
        }
    }, this);
}

LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;

module.exports = LinearGradientContainer;

},{"./color":3,"./gradientcontainer":9}],13:[function(_dereq_,module,exports){
var logger = function() {
    if (logger.options.logging && window.console && window.console.log) {
        Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - logger.options.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
    }
};

logger.options = {logging: false};
module.exports = logger;

},{}],14:[function(_dereq_,module,exports){
var Color = _dereq_('./color');
var utils = _dereq_('./utils');
var getBounds = utils.getBounds;
var parseBackgrounds = utils.parseBackgrounds;
var offsetBounds = utils.offsetBounds;

function NodeContainer(node, parent) {
    this.node = node;
    this.parent = parent;
    this.stack = null;
    this.bounds = null;
    this.borders = null;
    this.clip = [];
    this.backgroundClip = [];
    this.offsetBounds = null;
    this.visible = null;
    this.computedStyles = null;
    this.colors = {};
    this.styles = {};
    this.backgroundImages = null;
    this.transformData = null;
    this.transformMatrix = null;
    this.isPseudoElement = false;
    this.opacity = null;
}

NodeContainer.prototype.cloneTo = function(stack) {
    stack.visible = this.visible;
    stack.borders = this.borders;
    stack.bounds = this.bounds;
    stack.clip = this.clip;
    stack.backgroundClip = this.backgroundClip;
    stack.computedStyles = this.computedStyles;
    stack.styles = this.styles;
    stack.backgroundImages = this.backgroundImages;
    stack.opacity = this.opacity;
};

NodeContainer.prototype.getOpacity = function() {
    return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
};

NodeContainer.prototype.assignStack = function(stack) {
    this.stack = stack;
    stack.children.push(this);
};

NodeContainer.prototype.isElementVisible = function() {
    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
        this.css('display') !== "none" &&
        this.css('visibility') !== "hidden" &&
        !this.node.hasAttribute("data-html2canvas-ignore") &&
        (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
    );
};

NodeContainer.prototype.css = function(attribute) {
    if (!this.computedStyles) {
        this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
    }

    return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
};

NodeContainer.prototype.prefixedCss = function(attribute) {
    var prefixes = ["webkit", "moz", "ms", "o"];
    var value = this.css(attribute);
    if (value === undefined) {
        prefixes.some(function(prefix) {
            value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
            return value !== undefined;
        }, this);
    }
    return value === undefined ? null : value;
};

NodeContainer.prototype.computedStyle = function(type) {
    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
};

NodeContainer.prototype.cssInt = function(attribute) {
    var value = parseInt(this.css(attribute), 10);
    return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
};

NodeContainer.prototype.color = function(attribute) {
    return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
};

NodeContainer.prototype.cssFloat = function(attribute) {
    var value = parseFloat(this.css(attribute));
    return (isNaN(value)) ? 0 : value;
};

NodeContainer.prototype.fontWeight = function() {
    var weight = this.css("fontWeight");
    switch(parseInt(weight, 10)){
    case 401:
        weight = "bold";
        break;
    case 400:
        weight = "normal";
        break;
    }
    return weight;
};

NodeContainer.prototype.parseClip = function() {
    var matches = this.css('clip').match(this.CLIP);
    if (matches) {
        return {
            top: parseInt(matches[1], 10),
            right: parseInt(matches[2], 10),
            bottom: parseInt(matches[3], 10),
            left: parseInt(matches[4], 10)
        };
    }
    return null;
};

NodeContainer.prototype.parseBackgroundImages = function() {
    return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
};

NodeContainer.prototype.cssList = function(property, index) {
    var value = (this.css(property) || '').split(',');
    value = value[index || 0] || value[0] || 'auto';
    value = value.trim().split(' ');
    if (value.length === 1) {
        value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
    }
    return value;
};

NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
    var size = this.cssList("backgroundSize", index);
    var width, height;

    if (isPercentage(size[0])) {
        width = bounds.width * parseFloat(size[0]) / 100;
    } else if (/contain|cover/.test(size[0])) {
        var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
        return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
    } else {
        width = parseInt(size[0], 10);
    }

    if (size[0] === 'auto' && size[1] === 'auto') {
        height = image.height;
    } else if (size[1] === 'auto') {
        height = width / image.width * image.height;
    } else if (isPercentage(size[1])) {
        height =  bounds.height * parseFloat(size[1]) / 100;
    } else {
        height = parseInt(size[1], 10);
    }

    if (size[0] === 'auto') {
        width = height / image.height * image.width;
    }

    return {width: width, height: height};
};

NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
    var position = this.cssList('backgroundPosition', index);
    var left, top;

    if (isPercentage(position[0])){
        left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
    } else {
        left = parseInt(position[0], 10);
    }

    if (position[1] === 'auto') {
        top = left / image.width * image.height;
    } else if (isPercentage(position[1])){
        top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
    } else {
        top = parseInt(position[1], 10);
    }

    if (position[0] === 'auto') {
        left = top / image.height * image.width;
    }

    return {left: left, top: top};
};

NodeContainer.prototype.parseBackgroundRepeat = function(index) {
    return this.cssList("backgroundRepeat", index)[0];
};

NodeContainer.prototype.parseTextShadows = function() {
    var textShadow = this.css("textShadow");
    var results = [];

    if (textShadow && textShadow !== 'none') {
        var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
        for (var i = 0; shadows && (i < shadows.length); i++) {
            var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
            results.push({
                color: new Color(s[0]),
                offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
                offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
                blur: s[3] ? s[3].replace('px', '') : 0
            });
        }
    }
    return results;
};

NodeContainer.prototype.parseTransform = function() {
    if (!this.transformData) {
        if (this.hasTransform()) {
            var offset = this.parseBounds();
            var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
            origin[0] += offset.left;
            origin[1] += offset.top;
            this.transformData = {
                origin: origin,
                matrix: this.parseTransformMatrix()
            };
        } else {
            this.transformData = {
                origin: [0, 0],
                matrix: [1, 0, 0, 1, 0, 0]
            };
        }
    }
    return this.transformData;
};

NodeContainer.prototype.parseTransformMatrix = function() {
    if (!this.transformMatrix) {
        var transform = this.prefixedCss("transform");
        var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
        this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
    }
    return this.transformMatrix;
};

NodeContainer.prototype.parseBounds = function() {
    return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
};

NodeContainer.prototype.hasTransform = function() {
    return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
};

NodeContainer.prototype.getValue = function() {
    var value = this.node.value || "";
    if (this.node.tagName === "SELECT") {
        value = selectionValue(this.node);
    } else if (this.node.type === "password") {
        value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
    }
    return value.length === 0 ? (this.node.placeholder || "") : value;
};

NodeContainer.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/;
NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

function selectionValue(node) {
    var option = node.options[node.selectedIndex || 0];
    return option ? (option.text || "") : "";
}

function parseMatrix(match) {
    if (match && match[1] === "matrix") {
        return match[2].split(",").map(function(s) {
            return parseFloat(s.trim());
        });
    } else if (match && match[1] === "matrix3d") {
        var matrix3d = match[2].split(",").map(function(s) {
          return parseFloat(s.trim());
        });
        return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
    }
}

function isPercentage(value) {
    return value.toString().indexOf("%") !== -1;
}

function removePx(str) {
    return str.replace("px", "");
}

function asFloat(str) {
    return parseFloat(str);
}

module.exports = NodeContainer;

},{"./color":3,"./utils":26}],15:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var punycode = _dereq_('punycode');
var NodeContainer = _dereq_('./nodecontainer');
var TextContainer = _dereq_('./textcontainer');
var PseudoElementContainer = _dereq_('./pseudoelementcontainer');
var FontMetrics = _dereq_('./fontmetrics');
var Color = _dereq_('./color');
var StackingContext = _dereq_('./stackingcontext');
var utils = _dereq_('./utils');
var bind = utils.bind;
var getBounds = utils.getBounds;
var parseBackgrounds = utils.parseBackgrounds;
var offsetBounds = utils.offsetBounds;

function NodeParser(element, renderer, support, imageLoader, options) {
    log("Starting NodeParser");
    this.renderer = renderer;
    this.options = options;
    this.range = null;
    this.support = support;
    this.renderQueue = [];
    this.stack = new StackingContext(true, 1, element.ownerDocument, null);
    var parent = new NodeContainer(element, null);
    if (options.background) {
        renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
    }
    if (element === element.ownerDocument.documentElement) {
        // http://www.w3.org/TR/css3-background/#special-backgrounds
        var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
        renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
    }
    parent.visibile = parent.isElementVisible();
    this.createPseudoHideStyles(element.ownerDocument);
    this.disableAnimations(element.ownerDocument);
    this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
        return container.visible = container.isElementVisible();
    }).map(this.getPseudoElements, this));
    this.fontMetrics = new FontMetrics();
    log("Fetched nodes, total:", this.nodes.length);
    log("Calculate overflow clips");
    this.calculateOverflowClips();
    log("Start fetching images");
    this.images = imageLoader.fetch(this.nodes.filter(isElement));
    this.ready = this.images.ready.then(bind(function() {
        log("Images loaded, starting parsing");
        log("Creating stacking contexts");
        this.createStackingContexts();
        log("Sorting stacking contexts");
        this.sortStackingContexts(this.stack);
        this.parse(this.stack);
        log("Render queue created with " + this.renderQueue.length + " items");
        return new Promise(bind(function(resolve) {
            if (!options.async) {
                this.renderQueue.forEach(this.paint, this);
                resolve();
            } else if (typeof(options.async) === "function") {
                options.async.call(this, this.renderQueue, resolve);
            } else if (this.renderQueue.length > 0){
                this.renderIndex = 0;
                this.asyncRenderer(this.renderQueue, resolve);
            } else {
                resolve();
            }
        }, this));
    }, this));
}

NodeParser.prototype.calculateOverflowClips = function() {
    this.nodes.forEach(function(container) {
        if (isElement(container)) {
            if (isPseudoElement(container)) {
                container.appendToDOM();
            }
            container.borders = this.parseBorders(container);
            var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
            var cssClip = container.parseClip();
            if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
                clip.push([["rect",
                        container.bounds.left + cssClip.left,
                        container.bounds.top + cssClip.top,
                        cssClip.right - cssClip.left,
                        cssClip.bottom - cssClip.top
                ]]);
            }
            container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
            container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
            if (isPseudoElement(container)) {
                container.cleanDOM();
            }
        } else if (isTextNode(container)) {
            container.clip = hasParentClip(container) ? container.parent.clip : [];
        }
        if (!isPseudoElement(container)) {
            container.bounds = null;
        }
    }, this);
};

function hasParentClip(container) {
    return container.parent && container.parent.clip.length;
}

NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
    asyncTimer = asyncTimer || Date.now();
    this.paint(queue[this.renderIndex++]);
    if (queue.length === this.renderIndex) {
        resolve();
    } else if (asyncTimer + 20 > Date.now()) {
        this.asyncRenderer(queue, resolve, asyncTimer);
    } else {
        setTimeout(bind(function() {
            this.asyncRenderer(queue, resolve);
        }, this), 0);
    }
};

NodeParser.prototype.createPseudoHideStyles = function(document) {
    this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
        '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
};

NodeParser.prototype.disableAnimations = function(document) {
    this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
        '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
};

NodeParser.prototype.createStyles = function(document, styles) {
    var hidePseudoElements = document.createElement('style');
    hidePseudoElements.innerHTML = styles;
    document.body.appendChild(hidePseudoElements);
};

NodeParser.prototype.getPseudoElements = function(container) {
    var nodes = [[container]];
    if (container.node.nodeType === Node.ELEMENT_NODE) {
        var before = this.getPseudoElement(container, ":before");
        var after = this.getPseudoElement(container, ":after");

        if (before) {
            nodes.push(before);
        }

        if (after) {
            nodes.push(after);
        }
    }
    return flatten(nodes);
};

function toCamelCase(str) {
    return str.replace(/(\-[a-z])/g, function(match){
        return match.toUpperCase().replace('-','');
    });
}

NodeParser.prototype.getPseudoElement = function(container, type) {
    var style = container.computedStyle(type);
    if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
        return null;
    }

    var content = stripQuotes(style.content);
    var isImage = content.substr(0, 3) === 'url';
    var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
    var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

    for (var i = style.length-1; i >= 0; i--) {
        var property = toCamelCase(style.item(i));
        pseudoNode.style[property] = style[property];
    }

    pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

    if (isImage) {
        pseudoNode.src = parseBackgrounds(content)[0].args[0];
        return [pseudoContainer];
    } else {
        var text = document.createTextNode(content);
        pseudoNode.appendChild(text);
        return [pseudoContainer, new TextContainer(text, pseudoContainer)];
    }
};


NodeParser.prototype.getChildren = function(parentContainer) {
    return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
        var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
        return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
    }, this));
};

NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
    var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
    container.cloneTo(stack);
    var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
    parentStack.contexts.push(stack);
    container.stack = stack;
};

NodeParser.prototype.createStackingContexts = function() {
    this.nodes.forEach(function(container) {
        if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
            this.newStackingContext(container, true);
        } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
            this.newStackingContext(container, false);
        } else {
            container.assignStack(container.parent.stack);
        }
    }, this);
};

NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
    return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
};

NodeParser.prototype.isRootElement = function(container) {
    return container.parent === null;
};

NodeParser.prototype.sortStackingContexts = function(stack) {
    stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
    stack.contexts.forEach(this.sortStackingContexts, this);
};

NodeParser.prototype.parseTextBounds = function(container) {
    return function(text, index, textList) {
        if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
            if (this.support.rangeBounds && !container.parent.hasTransform()) {
                var offset = textList.slice(0, index).join("").length;
                return this.getRangeBounds(container.node, offset, text.length);
            } else if (container.node && typeof(container.node.data) === "string") {
                var replacementNode = container.node.splitText(text.length);
                var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
                container.node = replacementNode;
                return bounds;
            }
        } else if(!this.support.rangeBounds || container.parent.hasTransform()){
            container.node = container.node.splitText(text.length);
        }
        return {};
    };
};

NodeParser.prototype.getWrapperBounds = function(node, transform) {
    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
    var parent = node.parentNode,
        backupText = node.cloneNode(true);

    wrapper.appendChild(node.cloneNode(true));
    parent.replaceChild(wrapper, node);
    var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
    parent.replaceChild(backupText, wrapper);
    return bounds;
};

NodeParser.prototype.getRangeBounds = function(node, offset, length) {
    var range = this.range || (this.range = node.ownerDocument.createRange());
    range.setStart(node, offset);
    range.setEnd(node, offset + length);
    return range.getBoundingClientRect();
};

function ClearTransform() {}

NodeParser.prototype.parse = function(stack) {
    // http://www.w3.org/TR/CSS21/visuren.html#z-index
    var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
    var descendantElements = stack.children.filter(isElement);
    var descendantNonFloats = descendantElements.filter(not(isFloating));
    var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
    var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
    var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
    var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
    var text = stack.children.filter(isTextNode).filter(hasText);
    var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
    negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
        .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function(container) {
            this.renderQueue.push(container);
            if (isStackingContext(container)) {
                this.parse(container);
                this.renderQueue.push(new ClearTransform());
            }
        }, this);
};

NodeParser.prototype.paint = function(container) {
    try {
        if (container instanceof ClearTransform) {
            this.renderer.ctx.restore();
        } else if (isTextNode(container)) {
            if (isPseudoElement(container.parent)) {
                container.parent.appendToDOM();
            }
            this.paintText(container);
            if (isPseudoElement(container.parent)) {
                container.parent.cleanDOM();
            }
        } else {
            this.paintNode(container);
        }
    } catch(e) {
        log(e);
        if (this.options.strict) {
            throw e;
        }
    }
};

NodeParser.prototype.paintNode = function(container) {
    if (isStackingContext(container)) {
        this.renderer.setOpacity(container.opacity);
        this.renderer.ctx.save();
        if (container.hasTransform()) {
            this.renderer.setTransform(container.parseTransform());
        }
    }

    if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
        this.paintCheckbox(container);
    } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
        this.paintRadio(container);
    } else {
        this.paintElement(container);
    }
};

NodeParser.prototype.paintElement = function(container) {
    var bounds = container.parseBounds();
    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
    }, this);

    this.renderer.clip(container.clip, function() {
        this.renderer.renderBorders(container.borders.borders);
    }, this);

    this.renderer.clip(container.backgroundClip, function() {
        switch (container.node.nodeName) {
        case "svg":
        case "IFRAME":
            var imgContainer = this.images.get(container.node);
            if (imgContainer) {
                this.renderer.renderImage(container, bounds, container.borders, imgContainer);
            } else {
                log("Error loading <" + container.node.nodeName + ">", container.node);
            }
            break;
        case "IMG":
            var imageContainer = this.images.get(container.node.src);
            if (imageContainer) {
                this.renderer.renderImage(container, bounds, container.borders, imageContainer);
            } else {
                log("Error loading <img>", container.node.src);
            }
            break;
        case "CANVAS":
            this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
            break;
        case "SELECT":
        case "INPUT":
        case "TEXTAREA":
            this.paintFormValue(container);
            break;
        }
    }, this);
};

NodeParser.prototype.paintCheckbox = function(container) {
    var b = container.parseBounds();

    var size = Math.min(b.width, b.height);
    var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
    var r = [3, 3];
    var radius = [r, r, r, r];
    var borders = [1,1,1,1].map(function(w) {
        return {color: new Color('#A5A5A5'), width: w};
    });

    var borderPoints = calculateCurvePoints(bounds, radius, borders);

    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
        this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
        if (container.node.checked) {
            this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
            this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
        }
    }, this);
};

NodeParser.prototype.paintRadio = function(container) {
    var bounds = container.parseBounds();

    var size = Math.min(bounds.width, bounds.height) - 2;

    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
        if (container.node.checked) {
            this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
        }
    }, this);
};

NodeParser.prototype.paintFormValue = function(container) {
    var value = container.getValue();
    if (value.length > 0) {
        var document = container.node.ownerDocument;
        var wrapper = document.createElement('html2canvaswrapper');
        var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
            'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
            'boxSizing', 'whiteSpace', 'wordWrap'];

        properties.forEach(function(property) {
            try {
                wrapper.style[property] = container.css(property);
            } catch(e) {
                // Older IE has issues with "border"
                log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
            }
        });
        var bounds = container.parseBounds();
        wrapper.style.position = "fixed";
        wrapper.style.left = bounds.left + "px";
        wrapper.style.top = bounds.top + "px";
        wrapper.textContent = value;
        document.body.appendChild(wrapper);
        this.paintText(new TextContainer(wrapper.firstChild, container));
        document.body.removeChild(wrapper);
    }
};

NodeParser.prototype.paintText = function(container) {
    container.applyTextTransform();
    var characters = punycode.ucs2.decode(container.node.data);
    var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function(character) {
        return punycode.ucs2.encode([character]);
    });

    var weight = container.parent.fontWeight();
    var size = container.parent.css('fontSize');
    var family = container.parent.css('fontFamily');
    var shadows = container.parent.parseTextShadows();

    this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
    if (shadows.length) {
        // TODO: support multiple text shadows
        this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
    } else {
        this.renderer.clearShadow();
    }

    this.renderer.clip(container.parent.clip, function() {
        textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
            if (bounds) {
                this.renderer.text(textList[index], bounds.left, bounds.bottom);
                this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
            }
        }, this);
    }, this);
};

NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
    switch(container.css("textDecoration").split(" ")[0]) {
    case "underline":
        // Draws a line at the baseline of the font
        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
        this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
    case "overline":
        this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
        break;
    case "line-through":
        // TODO try and find exact position for line-through
        this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
    }
};

var borderColorTransforms = {
    inset: [
        ["darken", 0.60],
        ["darken", 0.10],
        ["darken", 0.10],
        ["darken", 0.60]
    ]
};

NodeParser.prototype.parseBorders = function(container) {
    var nodeBounds = container.parseBounds();
    var radius = getBorderRadiusData(container);
    var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
        var style = container.css('border' + side + 'Style');
        var color = container.color('border' + side + 'Color');
        if (style === "inset" && color.isBlack()) {
            color = new Color([255, 255, 255, color.a]); // this is wrong, but
        }
        var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
        return {
            width: container.cssInt('border' + side + 'Width'),
            color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
            args: null
        };
    });
    var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

    return {
        clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
        borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
    };
};

function calculateBorders(borders, nodeBounds, borderPoints, radius) {
    return borders.map(function(border, borderSide) {
        if (border.width > 0) {
            var bx = nodeBounds.left;
            var by = nodeBounds.top;
            var bw = nodeBounds.width;
            var bh = nodeBounds.height - (borders[2].width);

            switch(borderSide) {
            case 0:
                // top border
                bh = borders[0].width;
                border.args = drawSide({
                        c1: [bx, by],
                        c2: [bx + bw, by],
                        c3: [bx + bw - borders[1].width, by + bh],
                        c4: [bx + borders[3].width, by + bh]
                    }, radius[0], radius[1],
                    borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                break;
            case 1:
                // right border
                bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
                bw = borders[1].width;

                border.args = drawSide({
                        c1: [bx + bw, by],
                        c2: [bx + bw, by + bh + borders[2].width],
                        c3: [bx, by + bh],
                        c4: [bx, by + borders[0].width]
                    }, radius[1], radius[2],
                    borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                break;
            case 2:
                // bottom border
                by = (by + nodeBounds.height) - (borders[2].width);
                bh = borders[2].width;
                border.args = drawSide({
                        c1: [bx + bw, by + bh],
                        c2: [bx, by + bh],
                        c3: [bx + borders[3].width, by],
                        c4: [bx + bw - borders[3].width, by]
                    }, radius[2], radius[3],
                    borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                break;
            case 3:
                // left border
                bw = borders[3].width;
                border.args = drawSide({
                        c1: [bx, by + bh + borders[2].width],
                        c2: [bx, by],
                        c3: [bx + bw, by + borders[0].width],
                        c4: [bx + bw, by + bh]
                    }, radius[3], radius[0],
                    borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
                break;
            }
        }
        return border;
    });
}

NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
    var backgroundClip = container.css('backgroundClip'),
        borderArgs = [];

    switch(backgroundClip) {
    case "content-box":
    case "padding-box":
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
        break;

    default:
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
        break;
    }

    return borderArgs;
};

function getCurvePoints(x, y, r1, r2) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = (r1) * kappa, // control point offset horizontal
        oy = (r2) * kappa, // control point offset vertical
        xm = x + r1, // x-middle
        ym = y + r2; // y-middle
    return {
        topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
        topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
        bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
        bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
    };
}

function calculateCurvePoints(bounds, borderRadius, borders) {
    var x = bounds.left,
        y = bounds.top,
        width = bounds.width,
        height = bounds.height,

        tlh = borderRadius[0][0] < width / 2 ? borderRadius[0][0] : width / 2,
        tlv = borderRadius[0][1] < height / 2 ? borderRadius[0][1] : height / 2,
        trh = borderRadius[1][0] < width / 2 ? borderRadius[1][0] : width / 2,
        trv = borderRadius[1][1] < height / 2 ? borderRadius[1][1] : height / 2,
        brh = borderRadius[2][0] < width / 2 ? borderRadius[2][0] : width / 2,
        brv = borderRadius[2][1] < height / 2 ? borderRadius[2][1] : height / 2,
        blh = borderRadius[3][0] < width / 2 ? borderRadius[3][0] : width / 2,
        blv = borderRadius[3][1] < height / 2 ? borderRadius[3][1] : height / 2;

    var topWidth = width - trh,
        rightHeight = height - brv,
        bottomWidth = width - brh,
        leftHeight = height - blv;

    return {
        topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
        topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
        topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
        topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
        bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
        bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
        bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
        bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
    };
}

function bezierCurve(start, startControl, endControl, end) {
    var lerp = function (a, b, t) {
        return {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t
        };
    };

    return {
        start: start,
        startControl: startControl,
        endControl: endControl,
        end: end,
        subdivide: function(t) {
            var ab = lerp(start, startControl, t),
                bc = lerp(startControl, endControl, t),
                cd = lerp(endControl, end, t),
                abbc = lerp(ab, bc, t),
                bccd = lerp(bc, cd, t),
                dest = lerp(abbc, bccd, t);
            return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
        },
        curveTo: function(borderArgs) {
            borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
        },
        curveToReversed: function(borderArgs) {
            borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
        }
    };
}

function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
    var borderArgs = [];

    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
        outer1[1].curveTo(borderArgs);
    } else {
        borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
        borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
        outer2[0].curveTo(borderArgs);
        borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
        inner2[0].curveToReversed(borderArgs);
    } else {
        borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
        borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
    }

    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
        inner1[1].curveToReversed(borderArgs);
    } else {
        borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
    }

    return borderArgs;
}

function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
        corner1[0].curveTo(borderArgs);
        corner1[1].curveTo(borderArgs);
    } else {
        borderArgs.push(["line", x, y]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
        borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
    }
}

function negativeZIndex(container) {
    return container.cssInt("zIndex") < 0;
}

function positiveZIndex(container) {
    return container.cssInt("zIndex") > 0;
}

function zIndex0(container) {
    return container.cssInt("zIndex") === 0;
}

function inlineLevel(container) {
    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}

function isStackingContext(container) {
    return (container instanceof StackingContext);
}

function hasText(container) {
    return container.node.data.trim().length > 0;
}

function noLetterSpacing(container) {
    return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
}

function getBorderRadiusData(container) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
        var value = container.css('border' + side + 'Radius');
        var arr = value.split(" ");
        if (arr.length <= 1) {
            arr[1] = arr[0];
        }
        return arr.map(asInt);
    });
}

function renderableNode(node) {
    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
}

function isPositionedForStacking(container) {
    var position = container.css("position");
    var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
    return zIndex !== "auto";
}

function isPositioned(container) {
    return container.css("position") !== "static";
}

function isFloating(container) {
    return container.css("float") !== "none";
}

function isInlineBlock(container) {
    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}

function not(callback) {
    var context = this;
    return function() {
        return !callback.apply(context, arguments);
    };
}

function isElement(container) {
    return container.node.nodeType === Node.ELEMENT_NODE;
}

function isPseudoElement(container) {
    return container.isPseudoElement === true;
}

function isTextNode(container) {
    return container.node.nodeType === Node.TEXT_NODE;
}

function zIndexSort(contexts) {
    return function(a, b) {
        return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
    };
}

function hasOpacity(container) {
    return container.getOpacity() < 1;
}

function asInt(value) {
    return parseInt(value, 10);
}

function getWidth(border) {
    return border.width;
}

function nonIgnoredElement(nodeContainer) {
    return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
}

function flatten(arrays) {
    return [].concat.apply([], arrays);
}

function stripQuotes(content) {
    var first = content.substr(0, 1);
    return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
}

function getWords(characters) {
    var words = [], i = 0, onWordBoundary = false, word;
    while(characters.length) {
        if (isWordBoundary(characters[i]) === onWordBoundary) {
            word = characters.splice(0, i);
            if (word.length) {
                words.push(punycode.ucs2.encode(word));
            }
            onWordBoundary =! onWordBoundary;
            i = 0;
        } else {
            i++;
        }

        if (i >= characters.length) {
            word = characters.splice(0, i);
            if (word.length) {
                words.push(punycode.ucs2.encode(word));
            }
        }
    }
    return words;
}

function isWordBoundary(characterCode) {
    return [
        32, // <space>
        13, // \r
        10, // \n
        9, // \t
        45 // -
    ].indexOf(characterCode) !== -1;
}

function hasUnicode(string) {
    return (/[^\u0000-\u00ff]/).test(string);
}

module.exports = NodeParser;

},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,"punycode":1}],16:[function(_dereq_,module,exports){
var XHR = _dereq_('./xhr');
var utils = _dereq_('./utils');
var log = _dereq_('./log');
var createWindowClone = _dereq_('./clone');
var decode64 = utils.decode64;

function Proxy(src, proxyUrl, document) {
    var supportsCORS = ('withCredentials' in new XMLHttpRequest());
    if (!proxyUrl) {
        return Promise.reject("No proxy configured");
    }
    var callback = createCallback(supportsCORS);
    var url = createProxyUrl(proxyUrl, src, callback);

    return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
        return decode64(response.content);
    }));
}
var proxyCount = 0;

function ProxyURL(src, proxyUrl, document) {
    var supportsCORSImage = ('crossOrigin' in new Image());
    var callback = createCallback(supportsCORSImage);
    var url = createProxyUrl(proxyUrl, src, callback);
    return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
        return "data:" + response.type + ";base64," + response.content;
    }));
}

function jsonp(document, url, callback) {
    return new Promise(function(resolve, reject) {
        var s = document.createElement("script");
        var cleanup = function() {
            delete window.html2canvas.proxy[callback];
            document.body.removeChild(s);
        };
        window.html2canvas.proxy[callback] = function(response) {
            cleanup();
            resolve(response);
        };
        s.src = url;
        s.onerror = function(e) {
            cleanup();
            reject(e);
        };
        document.body.appendChild(s);
    });
}

function createCallback(useCORS) {
    return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
}

function createProxyUrl(proxyUrl, src, callback) {
    return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
}

function documentFromHTML(src) {
    return function(html) {
        var parser = new DOMParser(), doc;
        try {
            doc = parser.parseFromString(html, "text/html");
        } catch(e) {
            log("DOMParser not supported, falling back to createHTMLDocument");
            doc = document.implementation.createHTMLDocument("");
            try {
                doc.open();
                doc.write(html);
                doc.close();
            } catch(ee) {
                log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
                doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
            }
        }

        var b = doc.querySelector("base");
        if (!b || !b.href.host) {
            var base = doc.createElement("base");
            base.href = src;
            doc.head.insertBefore(base, doc.head.firstChild);
        }

        return doc;
    };
}

function loadUrlDocument(src, proxy, document, width, height, options) {
    return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
        return createWindowClone(doc, document, width, height, options, 0, 0);
    });
}

exports.Proxy = Proxy;
exports.ProxyURL = ProxyURL;
exports.loadUrlDocument = loadUrlDocument;

},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(_dereq_,module,exports){
var ProxyURL = _dereq_('./proxy').ProxyURL;

function ProxyImageContainer(src, proxy) {
    var link = document.createElement("a");
    link.href = src;
    src = link.href;
    this.src = src;
    this.image = new Image();
    var self = this;
    this.promise = new Promise(function(resolve, reject) {
        self.image.crossOrigin = "Anonymous";
        self.image.onload = resolve;
        self.image.onerror = reject;

        new ProxyURL(src, proxy, document).then(function(url) {
            self.image.src = url;
        })['catch'](reject);
    });
}

module.exports = ProxyImageContainer;

},{"./proxy":16}],18:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function PseudoElementContainer(node, parent, type) {
    NodeContainer.call(this, node, parent);
    this.isPseudoElement = true;
    this.before = type === ":before";
}

PseudoElementContainer.prototype.cloneTo = function(stack) {
    PseudoElementContainer.prototype.cloneTo.call(this, stack);
    stack.isPseudoElement = true;
    stack.before = this.before;
};

PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

PseudoElementContainer.prototype.appendToDOM = function() {
    if (this.before) {
        this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
    } else {
        this.parent.node.appendChild(this.node);
    }
    this.parent.node.className += " " + this.getHideClass();
};

PseudoElementContainer.prototype.cleanDOM = function() {
    this.node.parentNode.removeChild(this.node);
    this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
};

PseudoElementContainer.prototype.getHideClass = function() {
    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
};

PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

module.exports = PseudoElementContainer;

},{"./nodecontainer":14}],19:[function(_dereq_,module,exports){
var log = _dereq_('./log');

function Renderer(width, height, images, options, document) {
    this.width = width;
    this.height = height;
    this.images = images;
    this.options = options;
    this.document = document;
}

Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
    var paddingLeft = container.cssInt('paddingLeft'),
        paddingTop = container.cssInt('paddingTop'),
        paddingRight = container.cssInt('paddingRight'),
        paddingBottom = container.cssInt('paddingBottom'),
        borders = borderData.borders;

    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
    this.drawImage(
        imageContainer,
        0,
        0,
        imageContainer.image.width || width,
        imageContainer.image.height || height,
        bounds.left + paddingLeft + borders[3].width,
        bounds.top + paddingTop + borders[0].width,
        width,
        height
    );
};

Renderer.prototype.renderBackground = function(container, bounds, borderData) {
    if (bounds.height > 0 && bounds.width > 0) {
        this.renderBackgroundColor(container, bounds);
        this.renderBackgroundImage(container, bounds, borderData);
    }
};

Renderer.prototype.renderBackgroundColor = function(container, bounds) {
    var color = container.color("backgroundColor");
    if (!color.isTransparent()) {
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
    }
};

Renderer.prototype.renderBorders = function(borders) {
    borders.forEach(this.renderBorder, this);
};

Renderer.prototype.renderBorder = function(data) {
    if (!data.color.isTransparent() && data.args !== null) {
        this.drawShape(data.args, data.color);
    }
};

Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
    var backgroundImages = container.parseBackgroundImages();
    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
        switch(backgroundImage.method) {
        case "url":
            var image = this.images.get(backgroundImage.args[0]);
            if (image) {
                this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "linear-gradient":
        case "gradient":
            var gradientImage = this.images.get(backgroundImage.value);
            if (gradientImage) {
                this.renderBackgroundGradient(gradientImage, bounds, borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "none":
            break;
        default:
            log("Unknown background-image type", backgroundImage.args[0]);
        }
    }, this);
};

Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
    var repeat = container.parseBackgroundRepeat(index);
    switch (repeat) {
    case "repeat-x":
    case "repeat no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
        break;
    case "repeat-y":
    case "no-repeat repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
        break;
    case "no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
        break;
    default:
        this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
        break;
    }
};

module.exports = Renderer;

},{"./log":13}],20:[function(_dereq_,module,exports){
var Renderer = _dereq_('../renderer');
var LinearGradientContainer = _dereq_('../lineargradientcontainer');
var log = _dereq_('../log');

function CanvasRenderer(width, height) {
    Renderer.apply(this, arguments);
    this.canvas = this.options.canvas || this.document.createElement("canvas");
    if (!this.options.canvas) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    this.ctx = this.canvas.getContext("2d");
    this.taintCtx = this.document.createElement("canvas").getContext("2d");
    this.ctx.textBaseline = "bottom";
    this.variables = {};
    log("Initialized CanvasRenderer with size", width, "x", height);
}

CanvasRenderer.prototype = Object.create(Renderer.prototype);

CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
    return this.ctx;
};

CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
    this.setFillStyle(color).fillRect(left, top, width, height);
};

CanvasRenderer.prototype.circle = function(left, top, size, color) {
    this.setFillStyle(color);
    this.ctx.beginPath();
    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.fill();
};

CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
    this.circle(left, top, size, color);
    this.ctx.strokeStyle = strokeColor.toString();
    this.ctx.stroke();
};

CanvasRenderer.prototype.drawShape = function(shape, color) {
    this.shape(shape);
    this.setFillStyle(color).fill();
};

CanvasRenderer.prototype.taints = function(imageContainer) {
    if (imageContainer.tainted === null) {
        this.taintCtx.drawImage(imageContainer.image, 0, 0);
        try {
            this.taintCtx.getImageData(0, 0, 1, 1);
            imageContainer.tainted = false;
        } catch(e) {
            this.taintCtx = document.createElement("canvas").getContext("2d");
            imageContainer.tainted = true;
        }
    }

    return imageContainer.tainted;
};

CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!this.taints(imageContainer) || this.options.allowTaint) {
        this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
};

CanvasRenderer.prototype.clip = function(shapes, callback, context) {
    this.ctx.save();
    shapes.filter(hasEntries).forEach(function(shape) {
        this.shape(shape).clip();
    }, this);
    callback.call(context);
    this.ctx.restore();
};

CanvasRenderer.prototype.shape = function(shape) {
    this.ctx.beginPath();
    shape.forEach(function(point, index) {
        if (point[0] === "rect") {
            this.ctx.rect.apply(this.ctx, point.slice(1));
        } else {
            this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
        }
    }, this);
    this.ctx.closePath();
    return this.ctx;
};

CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
};

CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
    this.setVariable("shadowColor", color.toString())
        .setVariable("shadowOffsetY", offsetX)
        .setVariable("shadowOffsetX", offsetY)
        .setVariable("shadowBlur", blur);
};

CanvasRenderer.prototype.clearShadow = function() {
    this.setVariable("shadowColor", "rgba(0,0,0,0)");
};

CanvasRenderer.prototype.setOpacity = function(opacity) {
    this.ctx.globalAlpha = opacity;
};

CanvasRenderer.prototype.setTransform = function(transform) {
    this.ctx.translate(transform.origin[0], transform.origin[1]);
    this.ctx.transform.apply(this.ctx, transform.matrix);
    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
};

CanvasRenderer.prototype.setVariable = function(property, value) {
    if (this.variables[property] !== value) {
        this.variables[property] = this.ctx[property] = value;
    }

    return this;
};

CanvasRenderer.prototype.text = function(text, left, bottom) {
    this.ctx.fillText(text, left, bottom);
};

CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
    var shape = [
        ["line", Math.round(left), Math.round(top)],
        ["line", Math.round(left + width), Math.round(top)],
        ["line", Math.round(left + width), Math.round(height + top)],
        ["line", Math.round(left), Math.round(height + top)]
    ];
    this.clip([shape], function() {
        this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
    }, this);
};

CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
    this.ctx.translate(offsetX, offsetY);
    this.ctx.fill();
    this.ctx.translate(-offsetX, -offsetY);
};

CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
    if (gradientImage instanceof LinearGradientContainer) {
        var gradient = this.ctx.createLinearGradient(
            bounds.left + bounds.width * gradientImage.x0,
            bounds.top + bounds.height * gradientImage.y0,
            bounds.left +  bounds.width * gradientImage.x1,
            bounds.top +  bounds.height * gradientImage.y1);
        gradientImage.colorStops.forEach(function(colorStop) {
            gradient.addColorStop(colorStop.stop, colorStop.color.toString());
        });
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
    }
};

CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
    var image = imageContainer.image;
    if(image.width === size.width && image.height === size.height) {
        return image;
    }

    var ctx, canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
    return canvas;
};

function hasEntries(array) {
    return array.length > 0;
}

module.exports = CanvasRenderer;

},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function StackingContext(hasOwnStacking, opacity, element, parent) {
    NodeContainer.call(this, element, parent);
    this.ownStacking = hasOwnStacking;
    this.contexts = [];
    this.children = [];
    this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
}

StackingContext.prototype = Object.create(NodeContainer.prototype);

StackingContext.prototype.getParentStack = function(context) {
    var parentStack = (this.parent) ? this.parent.stack : null;
    return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
};

module.exports = StackingContext;

},{"./nodecontainer":14}],22:[function(_dereq_,module,exports){
function Support(document) {
    this.rangeBounds = this.testRangeBounds(document);
    this.cors = this.testCORS();
    this.svg = this.testSVG();
}

Support.prototype.testRangeBounds = function(document) {
    var range, testElement, rangeBounds, rangeHeight, support = false;

    if (document.createRange) {
        range = document.createRange();
        if (range.getBoundingClientRect) {
            testElement = document.createElement('boundtest');
            testElement.style.height = "123px";
            testElement.style.display = "block";
            document.body.appendChild(testElement);

            range.selectNode(testElement);
            rangeBounds = range.getBoundingClientRect();
            rangeHeight = rangeBounds.height;

            if (rangeHeight === 123) {
                support = true;
            }
            document.body.removeChild(testElement);
        }
    }

    return support;
};

Support.prototype.testCORS = function() {
    return typeof((new Image()).crossOrigin) !== "undefined";
};

Support.prototype.testSVG = function() {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var ctx =  canvas.getContext("2d");
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

    try {
        ctx.drawImage(img, 0, 0);
        canvas.toDataURL();
    } catch(e) {
        return false;
    }
    return true;
};

module.exports = Support;

},{}],23:[function(_dereq_,module,exports){
var XHR = _dereq_('./xhr');
var decode64 = _dereq_('./utils').decode64;

function SVGContainer(src) {
    this.src = src;
    this.image = null;
    var self = this;

    this.promise = this.hasFabric().then(function() {
        return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
    }).then(function(svg) {
        return new Promise(function(resolve) {
            window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
        });
    });
}

SVGContainer.prototype.hasFabric = function() {
    return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
};

SVGContainer.prototype.inlineFormatting = function(src) {
    return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
};

SVGContainer.prototype.removeContentType = function(src) {
    return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
};

SVGContainer.prototype.isInline = function(src) {
    return (/^data:image\/svg\+xml/i.test(src));
};

SVGContainer.prototype.createCanvas = function(resolve) {
    var self = this;
    return function (objects, options) {
        var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
        self.image = canvas.lowerCanvasEl;
        canvas
            .setWidth(options.width)
            .setHeight(options.height)
            .add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options))
            .renderAll();
        resolve(canvas.lowerCanvasEl);
    };
};

SVGContainer.prototype.decode64 = function(str) {
    return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
};

module.exports = SVGContainer;

},{"./utils":26,"./xhr":28}],24:[function(_dereq_,module,exports){
var SVGContainer = _dereq_('./svgcontainer');

function SVGNodeContainer(node, _native) {
    this.src = node;
    this.image = null;
    var self = this;

    this.promise = _native ? new Promise(function(resolve, reject) {
        self.image = new Image();
        self.image.onload = resolve;
        self.image.onerror = reject;
        self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
        if (self.image.complete === true) {
            resolve(self.image);
        }
    }) : this.hasFabric().then(function() {
        return new Promise(function(resolve) {
            window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
        });
    });
}

SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

module.exports = SVGNodeContainer;

},{"./svgcontainer":23}],25:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function TextContainer(node, parent) {
    NodeContainer.call(this, node, parent);
}

TextContainer.prototype = Object.create(NodeContainer.prototype);

TextContainer.prototype.applyTextTransform = function() {
    this.node.data = this.transform(this.parent.css("textTransform"));
};

TextContainer.prototype.transform = function(transform) {
    var text = this.node.data;
    switch(transform){
        case "lowercase":
            return text.toLowerCase();
        case "capitalize":
            return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
        case "uppercase":
            return text.toUpperCase();
        default:
            return text;
    }
};

function capitalize(m, p1, p2) {
    if (m.length > 0) {
        return p1 + p2.toUpperCase();
    }
}

module.exports = TextContainer;

},{"./nodecontainer":14}],26:[function(_dereq_,module,exports){
exports.smallImage = function smallImage() {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
};

exports.bind = function(callback, context) {
    return function() {
        return callback.apply(context, arguments);
    };
};

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

exports.decode64 = function(base64) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

    var output = "";

    for (i = 0; i < len; i+=4) {
        encoded1 = chars.indexOf(base64[i]);
        encoded2 = chars.indexOf(base64[i+1]);
        encoded3 = chars.indexOf(base64[i+2]);
        encoded4 = chars.indexOf(base64[i+3]);

        byte1 = (encoded1 << 2) | (encoded2 >> 4);
        byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        byte3 = ((encoded3 & 3) << 6) | encoded4;
        if (encoded3 === 64) {
            output += String.fromCharCode(byte1);
        } else if (encoded4 === 64 || encoded4 === -1) {
            output += String.fromCharCode(byte1, byte2);
        } else{
            output += String.fromCharCode(byte1, byte2, byte3);
        }
    }

    return output;
};

exports.getBounds = function(node) {
    if (node.getBoundingClientRect) {
        var clientRect = node.getBoundingClientRect();
        var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
        return {
            top: clientRect.top,
            bottom: clientRect.bottom || (clientRect.top + clientRect.height),
            right: clientRect.left + width,
            left: clientRect.left,
            width:  width,
            height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
        };
    }
    return {};
};

exports.offsetBounds = function(node) {
    var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {top: 0, left: 0};

    return {
        top: node.offsetTop + parent.top,
        bottom: node.offsetTop + node.offsetHeight + parent.top,
        right: node.offsetLeft + parent.left + node.offsetWidth,
        left: node.offsetLeft + parent.left,
        width: node.offsetWidth,
        height: node.offsetHeight
    };
};

exports.parseBackgrounds = function(backgroundImage) {
    var whitespace = ' \r\n\t',
        method, definition, prefix, prefix_i, block, results = [],
        mode = 0, numParen = 0, quote, args;
    var appendResult = function() {
        if(method) {
            if (definition.substr(0, 1) === '"') {
                definition = definition.substr(1, definition.length - 2);
            }
            if (definition) {
                args.push(definition);
            }
            if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
                prefix = method.substr(0, prefix_i);
                method = method.substr(prefix_i);
            }
            results.push({
                prefix: prefix,
                method: method.toLowerCase(),
                value: block,
                args: args,
                image: null
            });
        }
        args = [];
        method = prefix = definition = block = '';
    };
    args = [];
    method = prefix = definition = block = '';
    backgroundImage.split("").forEach(function(c) {
        if (mode === 0 && whitespace.indexOf(c) > -1) {
            return;
        }
        switch(c) {
        case '"':
            if(!quote) {
                quote = c;
            } else if(quote === c) {
                quote = null;
            }
            break;
        case '(':
            if(quote) {
                break;
            } else if(mode === 0) {
                mode = 1;
                block += c;
                return;
            } else {
                numParen++;
            }
            break;
        case ')':
            if (quote) {
                break;
            } else if(mode === 1) {
                if(numParen === 0) {
                    mode = 0;
                    block += c;
                    appendResult();
                    return;
                } else {
                    numParen--;
                }
            }
            break;

        case ',':
            if (quote) {
                break;
            } else if(mode === 0) {
                appendResult();
                return;
            } else if (mode === 1) {
                if (numParen === 0 && !method.match(/^url$/i)) {
                    args.push(definition);
                    definition = '';
                    block += c;
                    return;
                }
            }
            break;
        }

        block += c;
        if (mode === 0) {
            method += c;
        } else {
            definition += c;
        }
    });

    appendResult();
    return results;
};

},{}],27:[function(_dereq_,module,exports){
var GradientContainer = _dereq_('./gradientcontainer');

function WebkitGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = imageData.args[0] === "linear" ? GradientContainer.TYPES.LINEAR : GradientContainer.TYPES.RADIAL;
}

WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

module.exports = WebkitGradientContainer;

},{"./gradientcontainer":9}],28:[function(_dereq_,module,exports){
function XHR(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.statusText));
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

module.exports = XHR;

},{}]},{},[4])(4)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"input":[function(require,module,exports){
var growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 30;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    Input.__super__.constructor.call(this, options);
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.cssText = "outline: none; font-size: " + options.fontSize + "px; line-height: " + options.lineHeight + "px; padding: " + options.padding + "px; width: " + options.width + "px; height: " + options.height + "px; border: none; background-image: url(about:blank); background-color: " + options.backgroundColor + ";";
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if (options.goButton) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aXRhY2hlbi9Eb2N1bWVudHMvU1AyMDE3L3ZpdmlkL3ZpdmlkLmZyYW1lci9tb2R1bGVzL2h0bWwyY2FudmFzLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9maXJlYmFzZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aXRhY2hlbi9Eb2N1bWVudHMvU1AyMDE3L3ZpdmlkL3ZpdmlkLmZyYW1lci9tb2R1bGVzL2FuZHJvaWRSaXBwbGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9Qb2ludGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvQ2FtZXJhTGF5ZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9BdXRvR3Jvd0lucHV0LmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsImV4cG9ydHMua2V5Ym9hcmRMYXllciA9IG5ldyBMYXllclxuXHR4OjAsIHk6U2NyZWVuLmhlaWdodCwgd2lkdGg6U2NyZWVuLndpZHRoLCBoZWlnaHQ6NDMyXG5cdGh0bWw6XCI8aW1nIHN0eWxlPSd3aWR0aDogMTAwJTsnIHNyYz0nbW9kdWxlcy9rZXlib2FyZC5wbmcnLz5cIlxuXG4jc2NyZWVuIHdpZHRoIHZzLiBzaXplIG9mIGltYWdlIHdpZHRoXG5ncm93dGhSYXRpbyA9IFNjcmVlbi53aWR0aCAvIDczMlxuaW1hZ2VIZWlnaHQgPSBncm93dGhSYXRpbyAqIDQzMlxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzID1cblx0c2hvd246IFxuXHRcdHk6IFNjcmVlbi5oZWlnaHQgLSBpbWFnZUhlaWdodFxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDE1KVwiXG5cbmNsYXNzIGV4cG9ydHMuSW5wdXQgZXh0ZW5kcyBMYXllclxuXHRAZGVmaW5lIFwic3R5bGVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC5zdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0Xy5leHRlbmQgQGlucHV0LnN0eWxlLCB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnZhbHVlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAaW5wdXQudmFsdWUgPSB2YWx1ZVxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuc2V0dXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLndpZHRoID89IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuY2xpcCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID89IDYwXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwicmdiYSgyNTUsIDYwLCA0NywgLjUpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDMwXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDMwXG5cdFx0b3B0aW9ucy5wYWRkaW5nID89IDEwXG5cdFx0b3B0aW9ucy50ZXh0ID89IFwiXCJcblx0XHRvcHRpb25zLnBsYWNlaG9sZGVyID89IFwiXCJcblx0XHRvcHRpb25zLnZpcnR1YWxLZXlib2FyZCA/PSBpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gZmFsc2UgZWxzZSB0cnVlXG5cdFx0b3B0aW9ucy50eXBlID89IFwidGV4dFwiXG5cdFx0b3B0aW9ucy5nb0J1dHRvbiA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuYXV0b0NvcnJlY3QgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvQ29tcGxldGUgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLnNwZWxsQ2hlY2sgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvZm9jdXMgPz0gZmFsc2VcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvcj9cblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdEBpbnB1dC5pZCA9IFwiaW5wdXQtI3tfLm5vdygpfVwiXG5cdFx0QGlucHV0LnN0eWxlLmNzc1RleHQgPSBcIm91dGxpbmU6IG5vbmU7IGZvbnQtc2l6ZTogI3tvcHRpb25zLmZvbnRTaXplfXB4OyBsaW5lLWhlaWdodDogI3tvcHRpb25zLmxpbmVIZWlnaHR9cHg7IHBhZGRpbmc6ICN7b3B0aW9ucy5wYWRkaW5nfXB4OyB3aWR0aDogI3tvcHRpb25zLndpZHRofXB4OyBoZWlnaHQ6ICN7b3B0aW9ucy5oZWlnaHR9cHg7IGJvcmRlcjogbm9uZTsgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFib3V0OmJsYW5rKTsgYmFja2dyb3VuZC1jb2xvcjogI3tvcHRpb25zLmJhY2tncm91bmRDb2xvcn07XCJcblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NvcnJlY3RcIiwgb3B0aW9ucy5hdXRvQ29ycmVjdFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29tcGxldGVcIiwgb3B0aW9ucy5hdXRvQ29tcGxldGVcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NhcGl0YWxpemVcIiwgb3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZVxuXHRcdGlmIG9wdGlvbnMuYXV0b2ZvY3VzID09IHRydWVcblx0XHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvZm9jdXNcIiwgdHJ1ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJzcGVsbGNoZWNrXCIsIG9wdGlvbnMuc3BlbGxDaGVja1xuXHRcdEBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImZvcm1cIlxuXG5cdFx0aWYgb3B0aW9ucy5nb0J1dHRvblxuXHRcdFx0QGZvcm0uYWN0aW9uID0gXCIjXCJcblx0XHRcdEBmb3JtLmFkZEV2ZW50TGlzdGVuZXIgXCJzdWJtaXRcIiwgKGV2ZW50KSAtPlxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRAZm9ybS5hcHBlbmRDaGlsZCBAaW5wdXRcblx0XHRAX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQGZvcm1cblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRAdXBkYXRlUGxhY2Vob2xkZXJDb2xvciBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgQHBsYWNlaG9sZGVyQ29sb3JcblxuXHRcdCNvbmx5IHNob3cgaG9ub3IgdmlydHVhbCBrZXlib2FyZCBvcHRpb24gd2hlbiBub3Qgb24gbW9iaWxlLFxuXHRcdCNvdGhlcndpc2UgaWdub3JlXG5cdFx0aWYgIVV0aWxzLmlzTW9iaWxlKCkgJiYgb3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgaXMgdHJ1ZVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYnJpbmdUb0Zyb250KClcblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlQ3ljbGUoKVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXG5cdHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3I6IChjb2xvcikgLT5cblx0XHRAcGxhY2Vob2xkZXJDb2xvciA9IGNvbG9yXG5cdFx0aWYgQHBhZ2VTdHlsZT9cblx0XHRcdGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQgQHBhZ2VTdHlsZVxuXHRcdEBwYWdlU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwic3R5bGVcIlxuXHRcdEBwYWdlU3R5bGUudHlwZSA9IFwidGV4dC9jc3NcIlxuXHRcdGNzcyA9IFwiIyN7QGlucHV0LmlkfTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BwbGFjZWhvbGRlckNvbG9yfTsgfVwiXG5cdFx0QHBhZ2VTdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSBjc3MpXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCBAcGFnZVN0eWxlXG5cblx0Zm9jdXM6ICgpIC0+XG5cdFx0QGlucHV0LmZvY3VzKClcblxuXHRvbkZvY3VzOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0Y2IuYXBwbHkoQClcblxuXHRvbkJsdXI6IChjYikgLT5cblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG4iLCIvKlxuICBodG1sMmNhbnZhcyAwLjUuMC1iZXRhMyA8aHR0cDovL2h0bWwyY2FudmFzLmhlcnR6ZW4uY29tPlxuICBDb3B5cmlnaHQgKGMpIDIwMTYgTmlrbGFzIHZvbiBIZXJ0emVuXG5cbiAgUmVsZWFzZWQgdW5kZXIgIExpY2Vuc2VcbiovXG5cbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGUpO2Vsc2V7dmFyIGY7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz9mPXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2Y9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYoZj1zZWxmKSxmLmh0bWwyY2FudmFzPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuLyohIGh0dHA6Ly9tdGhzLmJlL3B1bnljb2RlIHYxLjIuNCBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0LyoqIERldGVjdCBmcmVlIHZhcmlhYmxlcyAqL1xuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYHB1bnljb2RlYCBvYmplY3QuXG5cdCAqIEBuYW1lIHB1bnljb2RlXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKi9cblx0dmFyIHB1bnljb2RlLFxuXG5cdC8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblx0bWF4SW50ID0gMjE0NzQ4MzY0NywgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG5cdC8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cblx0YmFzZSA9IDM2LFxuXHR0TWluID0gMSxcblx0dE1heCA9IDI2LFxuXHRza2V3ID0gMzgsXG5cdGRhbXAgPSA3MDAsXG5cdGluaXRpYWxCaWFzID0gNzIsXG5cdGluaXRpYWxOID0gMTI4LCAvLyAweDgwXG5cdGRlbGltaXRlciA9ICctJywgLy8gJ1xceDJEJ1xuXG5cdC8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG5cdHJlZ2V4UHVueWNvZGUgPSAvXnhuLS0vLFxuXHRyZWdleE5vbkFTQ0lJID0gL1teIC1+XS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9cXHgyRXxcXHUzMDAyfFxcdUZGMEV8XFx1RkY2MS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cblx0LyoqIEVycm9yIG1lc3NhZ2VzICovXG5cdGVycm9ycyA9IHtcblx0XHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHRcdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0fSxcblxuXHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbixcblx0Zmxvb3IgPSBNYXRoLmZsb29yLFxuXHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXG5cdC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgKi9cblx0a2V5O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG5cdCAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cblx0ICovXG5cdGZ1bmN0aW9uIGVycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBSYW5nZUVycm9yKGVycm9yc1t0eXBlXSk7XG5cdH1cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGBBcnJheSNtYXBgIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeSBhcnJheVxuXHQgKiBpdGVtLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IGFycmF5IG9mIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXAoYXJyYXksIGZuKSB7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdGFycmF5W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc2ltcGxlIGBBcnJheSNtYXBgLWxpa2Ugd3JhcHBlciB0byB3b3JrIHdpdGggZG9tYWluIG5hbWUgc3RyaW5ncy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeVxuXHQgKiBjaGFyYWN0ZXIuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgc3RyaW5nIG9mIGNoYXJhY3RlcnMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrXG5cdCAqIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwRG9tYWluKHN0cmluZywgZm4pIHtcblx0XHRyZXR1cm4gbWFwKHN0cmluZy5zcGxpdChyZWdleFNlcGFyYXRvcnMpLCBmbikuam9pbignLicpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbnVtZXJpYyBjb2RlIHBvaW50cyBvZiBlYWNoIFVuaWNvZGVcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuXHQgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuXHQgKiBVQ1MtMiBleHBvc2VzIGFzIHNlcGFyYXRlIGNoYXJhY3RlcnMpIGludG8gYSBzaW5nbGUgY29kZSBwb2ludCxcblx0ICogbWF0Y2hpbmcgVVRGLTE2LlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmVuY29kZWBcblx0ICogQHNlZSA8aHR0cDovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIHRvIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHlcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIHRvIFVuaWNvZGUuIE9ubHkgdGhlXG5cdCAqIFB1bnljb2RlZCBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS4gaXQgZG9lc24ndFxuXHQgKiBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgb24gYSBzdHJpbmcgdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGNvbnZlcnRlZCB0b1xuXHQgKiBVbmljb2RlLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgUHVueWNvZGUgZG9tYWluIG5hbWUgdG8gY29udmVydCB0byBVbmljb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcblx0ICogc3RyaW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9Vbmljb2RlKGRvbWFpbikge1xuXHRcdHJldHVybiBtYXBEb21haW4oZG9tYWluLCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleFB1bnljb2RlLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/IGRlY29kZShzdHJpbmcuc2xpY2UoNCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBVbmljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSB0byBQdW55Y29kZS4gT25seSB0aGVcblx0ICogbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLiBpdCBkb2Vzbid0XG5cdCAqIG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluIEFTQ0lJLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgdG8gY29udmVydCwgYXMgYSBVbmljb2RlIHN0cmluZy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFB1bnljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBkb21haW4gbmFtZS5cblx0ICovXG5cdGZ1bmN0aW9uIHRvQVNDSUkoZG9tYWluKSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihkb21haW4sIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4Tm9uQVNDSUkudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gJ3huLS0nICsgZW5jb2RlKHN0cmluZylcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG5cdHB1bnljb2RlID0ge1xuXHRcdC8qKlxuXHRcdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBTdHJpbmdcblx0XHQgKi9cblx0XHQndmVyc2lvbic6ICcxLjIuNCcsXG5cdFx0LyoqXG5cdFx0ICogQW4gb2JqZWN0IG9mIG1ldGhvZHMgdG8gY29udmVydCBmcm9tIEphdmFTY3JpcHQncyBpbnRlcm5hbCBjaGFyYWN0ZXJcblx0XHQgKiByZXByZXNlbnRhdGlvbiAoVUNTLTIpIHRvIFVuaWNvZGUgY29kZSBwb2ludHMsIGFuZCBiYWNrLlxuXHRcdCAqIEBzZWUgPGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IHB1bnljb2RlO1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKGtleSBpbiBwdW55Y29kZSkge1xuXHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5wdW55Y29kZSA9IHB1bnljb2RlO1xuXHR9XG5cbn0odGhpcykpO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se31dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIGxvZyA9IF9kZXJlcV8oJy4vbG9nJyk7XG5cbmZ1bmN0aW9uIHJlc3RvcmVPd25lclNjcm9sbChvd25lckRvY3VtZW50LCB4LCB5KSB7XG4gICAgaWYgKG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgJiYgKHggIT09IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcucGFnZVhPZmZzZXQgfHwgeSAhPT0gb3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5wYWdlWU9mZnNldCkpIHtcbiAgICAgICAgb3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5zY3JvbGxUbyh4LCB5KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lQ2FudmFzQ29udGVudHMoY2FudmFzLCBjbG9uZWRDYW52YXMpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAoY2xvbmVkQ2FudmFzKSB7XG4gICAgICAgICAgICBjbG9uZWRDYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgICAgICBjbG9uZWRDYW52YXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgIGNsb25lZENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikucHV0SW1hZ2VEYXRhKGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCksIDAsIDApO1xuICAgICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGxvZyhcIlVuYWJsZSB0byBjb3B5IGNhbnZhcyBjb250ZW50IGZyb21cIiwgY2FudmFzLCBlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lTm9kZShub2RlLCBqYXZhc2NyaXB0RW5hYmxlZCkge1xuICAgIHZhciBjbG9uZSA9IG5vZGUubm9kZVR5cGUgPT09IDMgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlLm5vZGVWYWx1ZSkgOiBub2RlLmNsb25lTm9kZShmYWxzZSk7XG5cbiAgICB2YXIgY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgd2hpbGUoY2hpbGQpIHtcbiAgICAgICAgaWYgKGphdmFzY3JpcHRFbmFibGVkID09PSB0cnVlIHx8IGNoaWxkLm5vZGVUeXBlICE9PSAxIHx8IGNoaWxkLm5vZGVOYW1lICE9PSAnU0NSSVBUJykge1xuICAgICAgICAgICAgY2xvbmUuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKGNoaWxkLCBqYXZhc2NyaXB0RW5hYmxlZCkpO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmc7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgY2xvbmUuX3Njcm9sbFRvcCA9IG5vZGUuc2Nyb2xsVG9wO1xuICAgICAgICBjbG9uZS5fc2Nyb2xsTGVmdCA9IG5vZGUuc2Nyb2xsTGVmdDtcbiAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09IFwiQ0FOVkFTXCIpIHtcbiAgICAgICAgICAgIGNsb25lQ2FudmFzQ29udGVudHMobm9kZSwgY2xvbmUpO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZU5hbWUgPT09IFwiVEVYVEFSRUFcIiB8fCBub2RlLm5vZGVOYW1lID09PSBcIlNFTEVDVFwiKSB7XG4gICAgICAgICAgICBjbG9uZS52YWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGluaXROb2RlKG5vZGUpIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICBub2RlLnNjcm9sbFRvcCA9IG5vZGUuX3Njcm9sbFRvcDtcbiAgICAgICAgbm9kZS5zY3JvbGxMZWZ0ID0gbm9kZS5fc2Nyb2xsTGVmdDtcblxuICAgICAgICB2YXIgY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlKGNoaWxkKSB7XG4gICAgICAgICAgICBpbml0Tm9kZShjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG93bmVyRG9jdW1lbnQsIGNvbnRhaW5lckRvY3VtZW50LCB3aWR0aCwgaGVpZ2h0LCBvcHRpb25zLCB4ICx5KSB7XG4gICAgdmFyIGRvY3VtZW50RWxlbWVudCA9IGNsb25lTm9kZShvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgb3B0aW9ucy5qYXZhc2NyaXB0RW5hYmxlZCk7XG4gICAgdmFyIGNvbnRhaW5lciA9IGNvbnRhaW5lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG5cbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJodG1sMmNhbnZhcy1jb250YWluZXJcIjtcbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCItMTAwMDBweFwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBcIjBweFwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5ib3JkZXIgPSBcIjBcIjtcbiAgICBjb250YWluZXIud2lkdGggPSB3aWR0aDtcbiAgICBjb250YWluZXIuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnRhaW5lci5zY3JvbGxpbmcgPSBcIm5vXCI7IC8vIGlvcyB3b24ndCBzY3JvbGwgd2l0aG91dCBpdFxuICAgIGNvbnRhaW5lckRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIHZhciBkb2N1bWVudENsb25lID0gY29udGFpbmVyLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG5cbiAgICAgICAgLyogQ2hyb21lIGRvZXNuJ3QgZGV0ZWN0IHJlbGF0aXZlIGJhY2tncm91bmQtaW1hZ2VzIGFzc2lnbmVkIGluIGlubGluZSA8c3R5bGU+IHNoZWV0cyB3aGVuIGZldGNoZWQgdGhyb3VnaCBnZXRDb21wdXRlZFN0eWxlXG4gICAgICAgICBpZiB3aW5kb3cgdXJsIGlzIGFib3V0OmJsYW5rLCB3ZSBjYW4gYXNzaWduIHRoZSB1cmwgdG8gY3VycmVudCBieSB3cml0aW5nIG9udG8gdGhlIGRvY3VtZW50XG4gICAgICAgICAqL1xuICAgICAgICBjb250YWluZXIuY29udGVudFdpbmRvdy5vbmxvYWQgPSBjb250YWluZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnRDbG9uZS5ib2R5LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpbml0Tm9kZShkb2N1bWVudENsb25lLmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50eXBlID09PSBcInZpZXdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRlbnRXaW5kb3cuc2Nyb2xsVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKC8oaVBhZHxpUGhvbmV8aVBvZCkvZykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAoY29udGFpbmVyLmNvbnRlbnRXaW5kb3cuc2Nyb2xsWSAhPT0geSB8fCBjb250YWluZXIuY29udGVudFdpbmRvdy5zY3JvbGxYICE9PSB4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50Q2xvbmUuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnRvcCA9ICgteSkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRDbG9uZS5kb2N1bWVudEVsZW1lbnQuc3R5bGUubGVmdCA9ICgteCkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRDbG9uZS5kb2N1bWVudEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnRDbG9uZS5vcGVuKCk7XG4gICAgICAgIGRvY3VtZW50Q2xvbmUud3JpdGUoXCI8IURPQ1RZUEUgaHRtbD48aHRtbD48L2h0bWw+XCIpO1xuICAgICAgICAvLyBDaHJvbWUgc2Nyb2xscyB0aGUgcGFyZW50IGRvY3VtZW50IGZvciBzb21lIHJlYXNvbiBhZnRlciB0aGUgd3JpdGUgdG8gdGhlIGNsb25lZCB3aW5kb3c/Pz9cbiAgICAgICAgcmVzdG9yZU93bmVyU2Nyb2xsKG93bmVyRG9jdW1lbnQsIHgsIHkpO1xuICAgICAgICBkb2N1bWVudENsb25lLnJlcGxhY2VDaGlsZChkb2N1bWVudENsb25lLmFkb3B0Tm9kZShkb2N1bWVudEVsZW1lbnQpLCBkb2N1bWVudENsb25lLmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIGRvY3VtZW50Q2xvbmUuY2xvc2UoKTtcbiAgICB9KTtcbn07XG5cbn0se1wiLi9sb2dcIjoxM31dLDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yL1xuXG5mdW5jdGlvbiBDb2xvcih2YWx1ZSkge1xuICAgIHRoaXMuciA9IDA7XG4gICAgdGhpcy5nID0gMDtcbiAgICB0aGlzLmIgPSAwO1xuICAgIHRoaXMuYSA9IG51bGw7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuZnJvbUFycmF5KHZhbHVlKSB8fFxuICAgICAgICB0aGlzLm5hbWVkQ29sb3IodmFsdWUpIHx8XG4gICAgICAgIHRoaXMucmdiKHZhbHVlKSB8fFxuICAgICAgICB0aGlzLnJnYmEodmFsdWUpIHx8XG4gICAgICAgIHRoaXMuaGV4Nih2YWx1ZSkgfHxcbiAgICAgICAgdGhpcy5oZXgzKHZhbHVlKTtcbn1cblxuQ29sb3IucHJvdG90eXBlLmRhcmtlbiA9IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgIHZhciBhID0gMSAtIGFtb3VudDtcbiAgICByZXR1cm4gIG5ldyBDb2xvcihbXG4gICAgICAgIE1hdGgucm91bmQodGhpcy5yICogYSksXG4gICAgICAgIE1hdGgucm91bmQodGhpcy5nICogYSksXG4gICAgICAgIE1hdGgucm91bmQodGhpcy5iICogYSksXG4gICAgICAgIHRoaXMuYVxuICAgIF0pO1xufTtcblxuQ29sb3IucHJvdG90eXBlLmlzVHJhbnNwYXJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hID09PSAwO1xufTtcblxuQ29sb3IucHJvdG90eXBlLmlzQmxhY2sgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yID09PSAwICYmIHRoaXMuZyA9PT0gMCAmJiB0aGlzLmIgPT09IDA7XG59O1xuXG5Db2xvci5wcm90b3R5cGUuZnJvbUFycmF5ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICAgICAgdGhpcy5yID0gTWF0aC5taW4oYXJyYXlbMF0sIDI1NSk7XG4gICAgICAgIHRoaXMuZyA9IE1hdGgubWluKGFycmF5WzFdLCAyNTUpO1xuICAgICAgICB0aGlzLmIgPSBNYXRoLm1pbihhcnJheVsyXSwgMjU1KTtcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIHRoaXMuYSA9IGFycmF5WzNdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KGFycmF5KSk7XG59O1xuXG52YXIgX2hleDMgPSAvXiMoW2EtZjAtOV17M30pJC9pO1xuXG5Db2xvci5wcm90b3R5cGUuaGV4MyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICBpZiAoKG1hdGNoID0gdmFsdWUubWF0Y2goX2hleDMpKSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnIgPSBwYXJzZUludChtYXRjaFsxXVswXSArIG1hdGNoWzFdWzBdLCAxNik7XG4gICAgICAgIHRoaXMuZyA9IHBhcnNlSW50KG1hdGNoWzFdWzFdICsgbWF0Y2hbMV1bMV0sIDE2KTtcbiAgICAgICAgdGhpcy5iID0gcGFyc2VJbnQobWF0Y2hbMV1bMl0gKyBtYXRjaFsxXVsyXSwgMTYpO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2ggIT09IG51bGw7XG59O1xuXG52YXIgX2hleDYgPSAvXiMoW2EtZjAtOV17Nn0pJC9pO1xuXG5Db2xvci5wcm90b3R5cGUuaGV4NiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICBpZiAoKG1hdGNoID0gdmFsdWUubWF0Y2goX2hleDYpKSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnIgPSBwYXJzZUludChtYXRjaFsxXS5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICAgICAgdGhpcy5nID0gcGFyc2VJbnQobWF0Y2hbMV0uc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gICAgICAgIHRoaXMuYiA9IHBhcnNlSW50KG1hdGNoWzFdLnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2ggIT09IG51bGw7XG59O1xuXG5cbnZhciBfcmdiID0gL15yZ2JcXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKlxcKSQvO1xuXG5Db2xvci5wcm90b3R5cGUucmdiID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgbWF0Y2ggPSBudWxsO1xuICAgIGlmICgobWF0Y2ggPSB2YWx1ZS5tYXRjaChfcmdiKSkgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yID0gTnVtYmVyKG1hdGNoWzFdKTtcbiAgICAgICAgdGhpcy5nID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICAgICAgdGhpcy5iID0gTnVtYmVyKG1hdGNoWzNdKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoICE9PSBudWxsO1xufTtcblxudmFyIF9yZ2JhID0gL15yZ2JhXFwoXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGQ/XFwuP1xcZCspXFxzKlxcKSQvO1xuXG5Db2xvci5wcm90b3R5cGUucmdiYSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICBpZiAoKG1hdGNoID0gdmFsdWUubWF0Y2goX3JnYmEpKSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnIgPSBOdW1iZXIobWF0Y2hbMV0pO1xuICAgICAgICB0aGlzLmcgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgICAgICB0aGlzLmIgPSBOdW1iZXIobWF0Y2hbM10pO1xuICAgICAgICB0aGlzLmEgPSBOdW1iZXIobWF0Y2hbNF0pO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2ggIT09IG51bGw7XG59O1xuXG5Db2xvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hICE9PSBudWxsICYmIHRoaXMuYSAhPT0gMSA/XG4gICAgXCJyZ2JhKFwiICsgW3RoaXMuciwgdGhpcy5nLCB0aGlzLmIsIHRoaXMuYV0uam9pbihcIixcIikgKyBcIilcIiA6XG4gICAgXCJyZ2IoXCIgKyBbdGhpcy5yLCB0aGlzLmcsIHRoaXMuYl0uam9pbihcIixcIikgKyBcIilcIjtcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5uYW1lZENvbG9yID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGNvbG9yID0gY29sb3JzW3ZhbHVlXTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5yID0gY29sb3JbMF07XG4gICAgICAgIHRoaXMuZyA9IGNvbG9yWzFdO1xuICAgICAgICB0aGlzLmIgPSBjb2xvclsyXTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgdGhpcy5yID0gdGhpcy5nID0gdGhpcy5iID0gdGhpcy5hID0gMDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhY29sb3I7XG59O1xuXG5Db2xvci5wcm90b3R5cGUuaXNDb2xvciA9IHRydWU7XG5cbi8vIEpTT04uc3RyaW5naWZ5KFtdLnNsaWNlLmNhbGwoJCQoJy5uYW1lZC1jb2xvci10YWJsZSB0cicpLCAxKS5tYXAoZnVuY3Rpb24ocm93KSB7IHJldHVybiBbcm93LmNoaWxkTm9kZXNbM10udGV4dENvbnRlbnQsIHJvdy5jaGlsZE5vZGVzWzVdLnRleHRDb250ZW50LnRyaW0oKS5zcGxpdChcIixcIikubWFwKE51bWJlcildIH0pLnJlZHVjZShmdW5jdGlvbihkYXRhLCByb3cpIHtkYXRhW3Jvd1swXV0gPSByb3dbMV07IHJldHVybiBkYXRhfSwge30pKVxudmFyIGNvbG9ycyA9IHtcbiAgICBcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXG4gICAgXCJhbnRpcXVld2hpdGVcIjogWzI1MCwgMjM1LCAyMTVdLFxuICAgIFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwiYXF1YW1hcmluZVwiOiBbMTI3LCAyNTUsIDIxMl0sXG4gICAgXCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXG4gICAgXCJiZWlnZVwiOiBbMjQ1LCAyNDUsIDIyMF0sXG4gICAgXCJiaXNxdWVcIjogWzI1NSwgMjI4LCAxOTZdLFxuICAgIFwiYmxhY2tcIjogWzAsIDAsIDBdLFxuICAgIFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxuICAgIFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcbiAgICBcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXG4gICAgXCJicm93blwiOiBbMTY1LCA0MiwgNDJdLFxuICAgIFwiYnVybHl3b29kXCI6IFsyMjIsIDE4NCwgMTM1XSxcbiAgICBcImNhZGV0Ymx1ZVwiOiBbOTUsIDE1OCwgMTYwXSxcbiAgICBcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcbiAgICBcImNob2NvbGF0ZVwiOiBbMjEwLCAxMDUsIDMwXSxcbiAgICBcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxuICAgIFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxuICAgIFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxuICAgIFwiY3JpbXNvblwiOiBbMjIwLCAyMCwgNjBdLFxuICAgIFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXG4gICAgXCJkYXJrY3lhblwiOiBbMCwgMTM5LCAxMzldLFxuICAgIFwiZGFya2dvbGRlbnJvZFwiOiBbMTg0LCAxMzQsIDExXSxcbiAgICBcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcbiAgICBcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXG4gICAgXCJkYXJrbWFnZW50YVwiOiBbMTM5LCAwLCAxMzldLFxuICAgIFwiZGFya29saXZlZ3JlZW5cIjogWzg1LCAxMDcsIDQ3XSxcbiAgICBcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcbiAgICBcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXG4gICAgXCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxuICAgIFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXG4gICAgXCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxuICAgIFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxuICAgIFwiZGFya3NsYXRlZ3JheVwiOiBbNDcsIDc5LCA3OV0sXG4gICAgXCJkYXJrc2xhdGVncmV5XCI6IFs0NywgNzksIDc5XSxcbiAgICBcImRhcmt0dXJxdW9pc2VcIjogWzAsIDIwNiwgMjA5XSxcbiAgICBcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcbiAgICBcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxuICAgIFwiZGVlcHNreWJsdWVcIjogWzAsIDE5MSwgMjU1XSxcbiAgICBcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgXCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxuICAgIFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXG4gICAgXCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXG4gICAgXCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxuICAgIFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwiZ2FpbnNib3JvXCI6IFsyMjAsIDIyMCwgMjIwXSxcbiAgICBcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxuICAgIFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxuICAgIFwiZ29sZGVucm9kXCI6IFsyMTgsIDE2NSwgMzJdLFxuICAgIFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJncmVlblwiOiBbMCwgMTI4LCAwXSxcbiAgICBcImdyZWVueWVsbG93XCI6IFsxNzMsIDI1NSwgNDddLFxuICAgIFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXG4gICAgXCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcbiAgICBcImluZGlhbnJlZFwiOiBbMjA1LCA5MiwgOTJdLFxuICAgIFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcbiAgICBcIml2b3J5XCI6IFsyNTUsIDI1NSwgMjQwXSxcbiAgICBcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcbiAgICBcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcbiAgICBcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxuICAgIFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXG4gICAgXCJsZW1vbmNoaWZmb25cIjogWzI1NSwgMjUwLCAyMDVdLFxuICAgIFwibGlnaHRibHVlXCI6IFsxNzMsIDIxNiwgMjMwXSxcbiAgICBcImxpZ2h0Y29yYWxcIjogWzI0MCwgMTI4LCAxMjhdLFxuICAgIFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcbiAgICBcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcbiAgICBcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJsaWdodGdyZWVuXCI6IFsxNDQsIDIzOCwgMTQ0XSxcbiAgICBcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxuICAgIFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxuICAgIFwibGlnaHRzZWFncmVlblwiOiBbMzIsIDE3OCwgMTcwXSxcbiAgICBcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXG4gICAgXCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJsaWdodHN0ZWVsYmx1ZVwiOiBbMTc2LCAxOTYsIDIyMl0sXG4gICAgXCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXG4gICAgXCJsaW1lXCI6IFswLCAyNTUsIDBdLFxuICAgIFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXG4gICAgXCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXG4gICAgXCJtYWdlbnRhXCI6IFsyNTUsIDAsIDI1NV0sXG4gICAgXCJtYXJvb25cIjogWzEyOCwgMCwgMF0sXG4gICAgXCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcbiAgICBcIm1lZGl1bWJsdWVcIjogWzAsIDAsIDIwNV0sXG4gICAgXCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXG4gICAgXCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTldLFxuICAgIFwibWVkaXVtc2VhZ3JlZW5cIjogWzYwLCAxNzksIDExM10sXG4gICAgXCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxuICAgIFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcbiAgICBcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcbiAgICBcIm1lZGl1bXZpb2xldHJlZFwiOiBbMTk5LCAyMSwgMTMzXSxcbiAgICBcIm1pZG5pZ2h0Ymx1ZVwiOiBbMjUsIDI1LCAxMTJdLFxuICAgIFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcbiAgICBcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXG4gICAgXCJtb2NjYXNpblwiOiBbMjU1LCAyMjgsIDE4MV0sXG4gICAgXCJuYXZham93aGl0ZVwiOiBbMjU1LCAyMjIsIDE3M10sXG4gICAgXCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxuICAgIFwib2xkbGFjZVwiOiBbMjUzLCAyNDUsIDIzMF0sXG4gICAgXCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxuICAgIFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxuICAgIFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXG4gICAgXCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxuICAgIFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcbiAgICBcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxuICAgIFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcbiAgICBcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxuICAgIFwicGFsZXZpb2xldHJlZFwiOiBbMjE5LCAxMTIsIDE0N10sXG4gICAgXCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcbiAgICBcInBlYWNocHVmZlwiOiBbMjU1LCAyMTgsIDE4NV0sXG4gICAgXCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxuICAgIFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXG4gICAgXCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcbiAgICBcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxuICAgIFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXG4gICAgXCJyZWJlY2NhcHVycGxlXCI6IFsxMDIsIDUxLCAxNTNdLFxuICAgIFwicmVkXCI6IFsyNTUsIDAsIDBdLFxuICAgIFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcbiAgICBcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcbiAgICBcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXG4gICAgXCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxuICAgIFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcbiAgICBcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXG4gICAgXCJzZWFzaGVsbFwiOiBbMjU1LCAyNDUsIDIzOF0sXG4gICAgXCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcbiAgICBcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXG4gICAgXCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcbiAgICBcInNsYXRlYmx1ZVwiOiBbMTA2LCA5MCwgMjA1XSxcbiAgICBcInNsYXRlZ3JheVwiOiBbMTEyLCAxMjgsIDE0NF0sXG4gICAgXCJzbGF0ZWdyZXlcIjogWzExMiwgMTI4LCAxNDRdLFxuICAgIFwic25vd1wiOiBbMjU1LCAyNTAsIDI1MF0sXG4gICAgXCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxuICAgIFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxuICAgIFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcbiAgICBcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcbiAgICBcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxuICAgIFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXG4gICAgXCJ0dXJxdW9pc2VcIjogWzY0LCAyMjQsIDIwOF0sXG4gICAgXCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxuICAgIFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxuICAgIFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdLFxuICAgIFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXG4gICAgXCJ5ZWxsb3dcIjogWzI1NSwgMjU1LCAwXSxcbiAgICBcInllbGxvd2dyZWVuXCI6IFsxNTQsIDIwNSwgNTBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yO1xuXG59LHt9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBTdXBwb3J0ID0gX2RlcmVxXygnLi9zdXBwb3J0Jyk7XG52YXIgQ2FudmFzUmVuZGVyZXIgPSBfZGVyZXFfKCcuL3JlbmRlcmVycy9jYW52YXMnKTtcbnZhciBJbWFnZUxvYWRlciA9IF9kZXJlcV8oJy4vaW1hZ2Vsb2FkZXInKTtcbnZhciBOb2RlUGFyc2VyID0gX2RlcmVxXygnLi9ub2RlcGFyc2VyJyk7XG52YXIgTm9kZUNvbnRhaW5lciA9IF9kZXJlcV8oJy4vbm9kZWNvbnRhaW5lcicpO1xudmFyIGxvZyA9IF9kZXJlcV8oJy4vbG9nJyk7XG52YXIgdXRpbHMgPSBfZGVyZXFfKCcuL3V0aWxzJyk7XG52YXIgY3JlYXRlV2luZG93Q2xvbmUgPSBfZGVyZXFfKCcuL2Nsb25lJyk7XG52YXIgbG9hZFVybERvY3VtZW50ID0gX2RlcmVxXygnLi9wcm94eScpLmxvYWRVcmxEb2N1bWVudDtcbnZhciBnZXRCb3VuZHMgPSB1dGlscy5nZXRCb3VuZHM7XG5cbnZhciBodG1sMmNhbnZhc05vZGVBdHRyaWJ1dGUgPSBcImRhdGEtaHRtbDJjYW52YXMtbm9kZVwiO1xudmFyIGh0bWwyY2FudmFzQ2xvbmVJbmRleCA9IDA7XG5cbmZ1bmN0aW9uIGh0bWwyY2FudmFzKG5vZGVMaXN0LCBvcHRpb25zKSB7XG4gICAgdmFyIGluZGV4ID0gaHRtbDJjYW52YXNDbG9uZUluZGV4Kys7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKG9wdGlvbnMubG9nZ2luZykge1xuICAgICAgICBsb2cub3B0aW9ucy5sb2dnaW5nID0gdHJ1ZTtcbiAgICAgICAgbG9nLm9wdGlvbnMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIG9wdGlvbnMuYXN5bmMgPSB0eXBlb2Yob3B0aW9ucy5hc3luYykgPT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogb3B0aW9ucy5hc3luYztcbiAgICBvcHRpb25zLmFsbG93VGFpbnQgPSB0eXBlb2Yob3B0aW9ucy5hbGxvd1RhaW50KSA9PT0gXCJ1bmRlZmluZWRcIiA/IGZhbHNlIDogb3B0aW9ucy5hbGxvd1RhaW50O1xuICAgIG9wdGlvbnMucmVtb3ZlQ29udGFpbmVyID0gdHlwZW9mKG9wdGlvbnMucmVtb3ZlQ29udGFpbmVyKSA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBvcHRpb25zLnJlbW92ZUNvbnRhaW5lcjtcbiAgICBvcHRpb25zLmphdmFzY3JpcHRFbmFibGVkID0gdHlwZW9mKG9wdGlvbnMuamF2YXNjcmlwdEVuYWJsZWQpID09PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBvcHRpb25zLmphdmFzY3JpcHRFbmFibGVkO1xuICAgIG9wdGlvbnMuaW1hZ2VUaW1lb3V0ID0gdHlwZW9mKG9wdGlvbnMuaW1hZ2VUaW1lb3V0KSA9PT0gXCJ1bmRlZmluZWRcIiA/IDEwMDAwIDogb3B0aW9ucy5pbWFnZVRpbWVvdXQ7XG4gICAgb3B0aW9ucy5yZW5kZXJlciA9IHR5cGVvZihvcHRpb25zLnJlbmRlcmVyKSA9PT0gXCJmdW5jdGlvblwiID8gb3B0aW9ucy5yZW5kZXJlciA6IENhbnZhc1JlbmRlcmVyO1xuICAgIG9wdGlvbnMuc3RyaWN0ID0gISFvcHRpb25zLnN0cmljdDtcblxuICAgIGlmICh0eXBlb2Yobm9kZUxpc3QpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICh0eXBlb2Yob3B0aW9ucy5wcm94eSkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIlByb3h5IG11c3QgYmUgdXNlZCB3aGVuIHJlbmRlcmluZyB1cmxcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCAhPSBudWxsID8gb3B0aW9ucy53aWR0aCA6IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgIT0gbnVsbCA/IG9wdGlvbnMuaGVpZ2h0IDogd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICByZXR1cm4gbG9hZFVybERvY3VtZW50KGFic29sdXRlVXJsKG5vZGVMaXN0KSwgb3B0aW9ucy5wcm94eSwgZG9jdW1lbnQsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyV2luZG93KGNvbnRhaW5lci5jb250ZW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgY29udGFpbmVyLCBvcHRpb25zLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSAoKG5vZGVMaXN0ID09PSB1bmRlZmluZWQpID8gW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF0gOiAoKG5vZGVMaXN0Lmxlbmd0aCkgPyBub2RlTGlzdCA6IFtub2RlTGlzdF0pKVswXTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZShodG1sMmNhbnZhc05vZGVBdHRyaWJ1dGUgKyBpbmRleCwgaW5kZXgpO1xuICAgIHJldHVybiByZW5kZXJEb2N1bWVudChub2RlLm93bmVyRG9jdW1lbnQsIG9wdGlvbnMsIG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5pbm5lcldpZHRoLCBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuaW5uZXJIZWlnaHQsIGluZGV4KS50aGVuKGZ1bmN0aW9uKGNhbnZhcykge1xuICAgICAgICBpZiAodHlwZW9mKG9wdGlvbnMub25yZW5kZXJlZCkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbG9nKFwib3B0aW9ucy5vbnJlbmRlcmVkIGlzIGRlcHJlY2F0ZWQsIGh0bWwyY2FudmFzIHJldHVybnMgYSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIGNhbnZhc1wiKTtcbiAgICAgICAgICAgIG9wdGlvbnMub25yZW5kZXJlZChjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfSk7XG59XG5cbmh0bWwyY2FudmFzLkNhbnZhc1JlbmRlcmVyID0gQ2FudmFzUmVuZGVyZXI7XG5odG1sMmNhbnZhcy5Ob2RlQ29udGFpbmVyID0gTm9kZUNvbnRhaW5lcjtcbmh0bWwyY2FudmFzLmxvZyA9IGxvZztcbmh0bWwyY2FudmFzLnV0aWxzID0gdXRpbHM7XG5cbnZhciBodG1sMmNhbnZhc0V4cG9ydCA9ICh0eXBlb2YoZG9jdW1lbnQpID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZihPYmplY3QuY3JlYXRlKSAhPT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZihkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQpICE9PSBcImZ1bmN0aW9uXCIpID8gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiTm8gY2FudmFzIHN1cHBvcnRcIik7XG59IDogaHRtbDJjYW52YXM7XG5cbm1vZHVsZS5leHBvcnRzID0gaHRtbDJjYW52YXNFeHBvcnQ7XG5cbmlmICh0eXBlb2YoZGVmaW5lKSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCdodG1sMmNhbnZhcycsIFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGh0bWwyY2FudmFzRXhwb3J0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEb2N1bWVudChkb2N1bWVudCwgb3B0aW9ucywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCwgaHRtbDJjYW52YXNJbmRleCkge1xuICAgIHJldHVybiBjcmVhdGVXaW5kb3dDbG9uZShkb2N1bWVudCwgZG9jdW1lbnQsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQsIG9wdGlvbnMsIGRvY3VtZW50LmRlZmF1bHRWaWV3LnBhZ2VYT2Zmc2V0LCBkb2N1bWVudC5kZWZhdWx0Vmlldy5wYWdlWU9mZnNldCkudGhlbihmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgbG9nKFwiRG9jdW1lbnQgY2xvbmVkXCIpO1xuICAgICAgICB2YXIgYXR0cmlidXRlTmFtZSA9IGh0bWwyY2FudmFzTm9kZUF0dHJpYnV0ZSArIGh0bWwyY2FudmFzSW5kZXg7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IFwiW1wiICsgYXR0cmlidXRlTmFtZSArIFwiPSdcIiArIGh0bWwyY2FudmFzSW5kZXggKyBcIiddXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgdmFyIGNsb25lZFdpbmRvdyA9IGNvbnRhaW5lci5jb250ZW50V2luZG93O1xuICAgICAgICB2YXIgbm9kZSA9IGNsb25lZFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgdmFyIG9uY2xvbmVIYW5kbGVyID0gKHR5cGVvZihvcHRpb25zLm9uY2xvbmUpID09PSBcImZ1bmN0aW9uXCIpID8gUHJvbWlzZS5yZXNvbHZlKG9wdGlvbnMub25jbG9uZShjbG9uZWRXaW5kb3cuZG9jdW1lbnQpKSA6IFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgcmV0dXJuIG9uY2xvbmVIYW5kbGVyLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyV2luZG93KG5vZGUsIGNvbnRhaW5lciwgb3B0aW9ucywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJXaW5kb3cobm9kZSwgY29udGFpbmVyLCBvcHRpb25zLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KSB7XG4gICAgdmFyIGNsb25lZFdpbmRvdyA9IGNvbnRhaW5lci5jb250ZW50V2luZG93O1xuICAgIHZhciBzdXBwb3J0ID0gbmV3IFN1cHBvcnQoY2xvbmVkV2luZG93LmRvY3VtZW50KTtcbiAgICB2YXIgaW1hZ2VMb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIob3B0aW9ucywgc3VwcG9ydCk7XG4gICAgdmFyIGJvdW5kcyA9IGdldEJvdW5kcyhub2RlKTtcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLnR5cGUgPT09IFwidmlld1wiID8gd2luZG93V2lkdGggOiBkb2N1bWVudFdpZHRoKGNsb25lZFdpbmRvdy5kb2N1bWVudCk7XG4gICAgdmFyIGhlaWdodCA9IG9wdGlvbnMudHlwZSA9PT0gXCJ2aWV3XCIgPyB3aW5kb3dIZWlnaHQgOiBkb2N1bWVudEhlaWdodChjbG9uZWRXaW5kb3cuZG9jdW1lbnQpO1xuICAgIHZhciByZW5kZXJlciA9IG5ldyBvcHRpb25zLnJlbmRlcmVyKHdpZHRoLCBoZWlnaHQsIGltYWdlTG9hZGVyLCBvcHRpb25zLCBkb2N1bWVudCk7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBOb2RlUGFyc2VyKG5vZGUsIHJlbmRlcmVyLCBzdXBwb3J0LCBpbWFnZUxvYWRlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5yZWFkeS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2coXCJGaW5pc2hlZCByZW5kZXJpbmdcIik7XG4gICAgICAgIHZhciBjYW52YXM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgICAgICAgIGNhbnZhcyA9IGNyb3AocmVuZGVyZXIuY2FudmFzLCB7d2lkdGg6IHJlbmRlcmVyLmNhbnZhcy53aWR0aCwgaGVpZ2h0OiByZW5kZXJlci5jYW52YXMuaGVpZ2h0LCB0b3A6IDAsIGxlZnQ6IDAsIHg6IDAsIHk6IDB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSBjbG9uZWRXaW5kb3cuZG9jdW1lbnQuYm9keSB8fCBub2RlID09PSBjbG9uZWRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IG9wdGlvbnMuY2FudmFzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNhbnZhcyA9IHJlbmRlcmVyLmNhbnZhcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbnZhcyA9IGNyb3AocmVuZGVyZXIuY2FudmFzLCB7d2lkdGg6ICBvcHRpb25zLndpZHRoICE9IG51bGwgPyBvcHRpb25zLndpZHRoIDogYm91bmRzLndpZHRoLCBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0ICE9IG51bGwgPyBvcHRpb25zLmhlaWdodCA6IGJvdW5kcy5oZWlnaHQsIHRvcDogYm91bmRzLnRvcCwgbGVmdDogYm91bmRzLmxlZnQsIHg6IDAsIHk6IDB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFudXBDb250YWluZXIoY29udGFpbmVyLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYW51cENvbnRhaW5lcihjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5yZW1vdmVDb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgbG9nKFwiQ2xlYW5lZCB1cCBjb250YWluZXJcIik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcm9wKGNhbnZhcywgYm91bmRzKSB7XG4gICAgdmFyIGNyb3BwZWRDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIHZhciB4MSA9IE1hdGgubWluKGNhbnZhcy53aWR0aCAtIDEsIE1hdGgubWF4KDAsIGJvdW5kcy5sZWZ0KSk7XG4gICAgdmFyIHgyID0gTWF0aC5taW4oY2FudmFzLndpZHRoLCBNYXRoLm1heCgxLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCkpO1xuICAgIHZhciB5MSA9IE1hdGgubWluKGNhbnZhcy5oZWlnaHQgLSAxLCBNYXRoLm1heCgwLCBib3VuZHMudG9wKSk7XG4gICAgdmFyIHkyID0gTWF0aC5taW4oY2FudmFzLmhlaWdodCwgTWF0aC5tYXgoMSwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQpKTtcbiAgICBjcm9wcGVkQ2FudmFzLndpZHRoID0gYm91bmRzLndpZHRoO1xuICAgIGNyb3BwZWRDYW52YXMuaGVpZ2h0ID0gIGJvdW5kcy5oZWlnaHQ7XG4gICAgdmFyIHdpZHRoID0geDIteDE7XG4gICAgdmFyIGhlaWdodCA9IHkyLXkxO1xuICAgIGxvZyhcIkNyb3BwaW5nIGNhbnZhcyBhdDpcIiwgXCJsZWZ0OlwiLCBib3VuZHMubGVmdCwgXCJ0b3A6XCIsIGJvdW5kcy50b3AsIFwid2lkdGg6XCIsIHdpZHRoLCBcImhlaWdodDpcIiwgaGVpZ2h0KTtcbiAgICBsb2coXCJSZXN1bHRpbmcgY3JvcCB3aXRoIHdpZHRoXCIsIGJvdW5kcy53aWR0aCwgXCJhbmQgaGVpZ2h0XCIsIGJvdW5kcy5oZWlnaHQsIFwid2l0aCB4XCIsIHgxLCBcImFuZCB5XCIsIHkxKTtcbiAgICBjcm9wcGVkQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKS5kcmF3SW1hZ2UoY2FudmFzLCB4MSwgeTEsIHdpZHRoLCBoZWlnaHQsIGJvdW5kcy54LCBib3VuZHMueSwgd2lkdGgsIGhlaWdodCk7XG4gICAgcmV0dXJuIGNyb3BwZWRDYW52YXM7XG59XG5cbmZ1bmN0aW9uIGRvY3VtZW50V2lkdGggKGRvYykge1xuICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgTWF0aC5tYXgoZG9jLmJvZHkuc2Nyb2xsV2lkdGgsIGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgpLFxuICAgICAgICBNYXRoLm1heChkb2MuYm9keS5vZmZzZXRXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCksXG4gICAgICAgIE1hdGgubWF4KGRvYy5ib2R5LmNsaWVudFdpZHRoLCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGRvY3VtZW50SGVpZ2h0IChkb2MpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgIE1hdGgubWF4KGRvYy5ib2R5LnNjcm9sbEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQpLFxuICAgICAgICBNYXRoLm1heChkb2MuYm9keS5vZmZzZXRIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSxcbiAgICAgICAgTWF0aC5tYXgoZG9jLmJvZHkuY2xpZW50SGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodClcbiAgICApO1xufVxuXG5mdW5jdGlvbiBhYnNvbHV0ZVVybCh1cmwpIHtcbiAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBsaW5rLmhyZWYgPSBsaW5rLmhyZWY7XG4gICAgcmV0dXJuIGxpbms7XG59XG5cbn0se1wiLi9jbG9uZVwiOjIsXCIuL2ltYWdlbG9hZGVyXCI6MTEsXCIuL2xvZ1wiOjEzLFwiLi9ub2RlY29udGFpbmVyXCI6MTQsXCIuL25vZGVwYXJzZXJcIjoxNSxcIi4vcHJveHlcIjoxNixcIi4vcmVuZGVyZXJzL2NhbnZhc1wiOjIwLFwiLi9zdXBwb3J0XCI6MjIsXCIuL3V0aWxzXCI6MjZ9XSw1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBsb2cgPSBfZGVyZXFfKCcuL2xvZycpO1xudmFyIHNtYWxsSW1hZ2UgPSBfZGVyZXFfKCcuL3V0aWxzJykuc21hbGxJbWFnZTtcblxuZnVuY3Rpb24gRHVtbXlJbWFnZUNvbnRhaW5lcihzcmMpIHtcbiAgICB0aGlzLnNyYyA9IHNyYztcbiAgICBsb2coXCJEdW1teUltYWdlQ29udGFpbmVyIGZvclwiLCBzcmMpO1xuICAgIGlmICghdGhpcy5wcm9taXNlIHx8ICF0aGlzLmltYWdlKSB7XG4gICAgICAgIGxvZyhcIkluaXRpYXRpbmcgRHVtbXlJbWFnZUNvbnRhaW5lclwiKTtcbiAgICAgICAgRHVtbXlJbWFnZUNvbnRhaW5lci5wcm90b3R5cGUuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdmFyIGltYWdlID0gdGhpcy5pbWFnZTtcbiAgICAgICAgRHVtbXlJbWFnZUNvbnRhaW5lci5wcm90b3R5cGUucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIGltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBzbWFsbEltYWdlKCk7XG4gICAgICAgICAgICBpZiAoaW1hZ2UuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IER1bW15SW1hZ2VDb250YWluZXI7XG5cbn0se1wiLi9sb2dcIjoxMyxcIi4vdXRpbHNcIjoyNn1dLDY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIHNtYWxsSW1hZ2UgPSBfZGVyZXFfKCcuL3V0aWxzJykuc21hbGxJbWFnZTtcblxuZnVuY3Rpb24gRm9udChmYW1pbHksIHNpemUpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxuICAgICAgICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgICAgICBzYW1wbGVUZXh0ID0gJ0hpZGRlbiBUZXh0JyxcbiAgICAgICAgYmFzZWxpbmUsXG4gICAgICAgIG1pZGRsZTtcblxuICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBjb250YWluZXIuc3R5bGUuZm9udEZhbWlseSA9IGZhbWlseTtcbiAgICBjb250YWluZXIuc3R5bGUuZm9udFNpemUgPSBzaXplO1xuICAgIGNvbnRhaW5lci5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gMDtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIGltZy5zcmMgPSBzbWFsbEltYWdlKCk7XG4gICAgaW1nLndpZHRoID0gMTtcbiAgICBpbWcuaGVpZ2h0ID0gMTtcblxuICAgIGltZy5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIGltZy5zdHlsZS5wYWRkaW5nID0gMDtcbiAgICBpbWcuc3R5bGUudmVydGljYWxBbGlnbiA9IFwiYmFzZWxpbmVcIjtcblxuICAgIHNwYW4uc3R5bGUuZm9udEZhbWlseSA9IGZhbWlseTtcbiAgICBzcGFuLnN0eWxlLmZvbnRTaXplID0gc2l6ZTtcbiAgICBzcGFuLnN0eWxlLm1hcmdpbiA9IDA7XG4gICAgc3Bhbi5zdHlsZS5wYWRkaW5nID0gMDtcblxuICAgIHNwYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2FtcGxlVGV4dCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICBiYXNlbGluZSA9IChpbWcub2Zmc2V0VG9wIC0gc3Bhbi5vZmZzZXRUb3ApICsgMTtcblxuICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChzcGFuKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2FtcGxlVGV4dCkpO1xuXG4gICAgY29udGFpbmVyLnN0eWxlLmxpbmVIZWlnaHQgPSBcIm5vcm1hbFwiO1xuICAgIGltZy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCJzdXBlclwiO1xuXG4gICAgbWlkZGxlID0gKGltZy5vZmZzZXRUb3AtY29udGFpbmVyLm9mZnNldFRvcCkgKyAxO1xuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuXG4gICAgdGhpcy5iYXNlbGluZSA9IGJhc2VsaW5lO1xuICAgIHRoaXMubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLm1pZGRsZSA9IG1pZGRsZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb250O1xuXG59LHtcIi4vdXRpbHNcIjoyNn1dLDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIEZvbnQgPSBfZGVyZXFfKCcuL2ZvbnQnKTtcblxuZnVuY3Rpb24gRm9udE1ldHJpY3MoKSB7XG4gICAgdGhpcy5kYXRhID0ge307XG59XG5cbkZvbnRNZXRyaWNzLnByb3RvdHlwZS5nZXRNZXRyaWNzID0gZnVuY3Rpb24oZmFtaWx5LCBzaXplKSB7XG4gICAgaWYgKHRoaXMuZGF0YVtmYW1pbHkgKyBcIi1cIiArIHNpemVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5kYXRhW2ZhbWlseSArIFwiLVwiICsgc2l6ZV0gPSBuZXcgRm9udChmYW1pbHksIHNpemUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRhW2ZhbWlseSArIFwiLVwiICsgc2l6ZV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZvbnRNZXRyaWNzO1xuXG59LHtcIi4vZm9udFwiOjZ9XSw4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciB1dGlscyA9IF9kZXJlcV8oJy4vdXRpbHMnKTtcbnZhciBnZXRCb3VuZHMgPSB1dGlscy5nZXRCb3VuZHM7XG52YXIgbG9hZFVybERvY3VtZW50ID0gX2RlcmVxXygnLi9wcm94eScpLmxvYWRVcmxEb2N1bWVudDtcblxuZnVuY3Rpb24gRnJhbWVDb250YWluZXIoY29udGFpbmVyLCBzYW1lT3JpZ2luLCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbWFnZSA9IG51bGw7XG4gICAgdGhpcy5zcmMgPSBjb250YWluZXI7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBib3VuZHMgPSBnZXRCb3VuZHMoY29udGFpbmVyKTtcbiAgICB0aGlzLnByb21pc2UgPSAoIXNhbWVPcmlnaW4gPyB0aGlzLnByb3h5TG9hZChvcHRpb25zLnByb3h5LCBib3VuZHMsIG9wdGlvbnMpIDogbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICBpZiAoY29udGFpbmVyLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuVVJMID09PSBcImFib3V0OmJsYW5rXCIgfHwgY29udGFpbmVyLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jb250ZW50V2luZG93Lm9ubG9hZCA9IGNvbnRhaW5lci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfSkpLnRoZW4oZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBodG1sMmNhbnZhcyA9IF9kZXJlcV8oJy4vY29yZScpO1xuICAgICAgICByZXR1cm4gaHRtbDJjYW52YXMoY29udGFpbmVyLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7dHlwZTogJ3ZpZXcnLCB3aWR0aDogY29udGFpbmVyLndpZHRoLCBoZWlnaHQ6IGNvbnRhaW5lci5oZWlnaHQsIHByb3h5OiBvcHRpb25zLnByb3h5LCBqYXZhc2NyaXB0RW5hYmxlZDogb3B0aW9ucy5qYXZhc2NyaXB0RW5hYmxlZCwgcmVtb3ZlQ29udGFpbmVyOiBvcHRpb25zLnJlbW92ZUNvbnRhaW5lciwgYWxsb3dUYWludDogb3B0aW9ucy5hbGxvd1RhaW50LCBpbWFnZVRpbWVvdXQ6IG9wdGlvbnMuaW1hZ2VUaW1lb3V0IC8gMn0pO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmltYWdlID0gY2FudmFzO1xuICAgIH0pO1xufVxuXG5GcmFtZUNvbnRhaW5lci5wcm90b3R5cGUucHJveHlMb2FkID0gZnVuY3Rpb24ocHJveHksIGJvdW5kcywgb3B0aW9ucykge1xuICAgIHZhciBjb250YWluZXIgPSB0aGlzLnNyYztcbiAgICByZXR1cm4gbG9hZFVybERvY3VtZW50KGNvbnRhaW5lci5zcmMsIHByb3h5LCBjb250YWluZXIub3duZXJEb2N1bWVudCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0LCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRnJhbWVDb250YWluZXI7XG5cbn0se1wiLi9jb3JlXCI6NCxcIi4vcHJveHlcIjoxNixcIi4vdXRpbHNcIjoyNn1dLDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuZnVuY3Rpb24gR3JhZGllbnRDb250YWluZXIoaW1hZ2VEYXRhKSB7XG4gICAgdGhpcy5zcmMgPSBpbWFnZURhdGEudmFsdWU7XG4gICAgdGhpcy5jb2xvclN0b3BzID0gW107XG4gICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICB0aGlzLngwID0gMC41O1xuICAgIHRoaXMueTAgPSAwLjU7XG4gICAgdGhpcy54MSA9IDAuNTtcbiAgICB0aGlzLnkxID0gMC41O1xuICAgIHRoaXMucHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbn1cblxuR3JhZGllbnRDb250YWluZXIuVFlQRVMgPSB7XG4gICAgTElORUFSOiAxLFxuICAgIFJBRElBTDogMlxufTtcblxuLy8gVE9ETzogc3VwcG9ydCBoc2xbYV0sIG5lZ2F0aXZlICUvbGVuZ3RoIHZhbHVlc1xuLy8gVE9ETzogc3VwcG9ydCA8YW5nbGU+IChlLmcuIC0/XFxkezEsM30oPzpcXC5cXGQrKWRlZywgZXRjLiA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0NTUy9hbmdsZSApXG5HcmFkaWVudENvbnRhaW5lci5SRUdFWFBfQ09MT1JTVE9QID0gL15cXHMqKHJnYmE/XFwoXFxzKlxcZHsxLDN9LFxccypcXGR7MSwzfSxcXHMqXFxkezEsM30oPzosXFxzKlswLTlcXC5dKyk/XFxzKlxcKXxbYS16XXszLDIwfXwjW2EtZjAtOV17Myw2fSkoPzpcXHMrKFxcZHsxLDN9KD86XFwuXFxkKyk/KSglfHB4KT8pPyg/Olxcc3wkKS9pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYWRpZW50Q29udGFpbmVyO1xuXG59LHt9XSwxMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5mdW5jdGlvbiBJbWFnZUNvbnRhaW5lcihzcmMsIGNvcnMpIHtcbiAgICB0aGlzLnNyYyA9IHNyYztcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMudGFpbnRlZCA9IG51bGw7XG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYuaW1hZ2Uub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgc2VsZi5pbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICBpZiAoY29ycykge1xuICAgICAgICAgICAgc2VsZi5pbWFnZS5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCI7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pbWFnZS5zcmMgPSBzcmM7XG4gICAgICAgIGlmIChzZWxmLmltYWdlLmNvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHNlbGYuaW1hZ2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VDb250YWluZXI7XG5cbn0se31dLDExOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBsb2cgPSBfZGVyZXFfKCcuL2xvZycpO1xudmFyIEltYWdlQ29udGFpbmVyID0gX2RlcmVxXygnLi9pbWFnZWNvbnRhaW5lcicpO1xudmFyIER1bW15SW1hZ2VDb250YWluZXIgPSBfZGVyZXFfKCcuL2R1bW15aW1hZ2Vjb250YWluZXInKTtcbnZhciBQcm94eUltYWdlQ29udGFpbmVyID0gX2RlcmVxXygnLi9wcm94eWltYWdlY29udGFpbmVyJyk7XG52YXIgRnJhbWVDb250YWluZXIgPSBfZGVyZXFfKCcuL2ZyYW1lY29udGFpbmVyJyk7XG52YXIgU1ZHQ29udGFpbmVyID0gX2RlcmVxXygnLi9zdmdjb250YWluZXInKTtcbnZhciBTVkdOb2RlQ29udGFpbmVyID0gX2RlcmVxXygnLi9zdmdub2RlY29udGFpbmVyJyk7XG52YXIgTGluZWFyR3JhZGllbnRDb250YWluZXIgPSBfZGVyZXFfKCcuL2xpbmVhcmdyYWRpZW50Y29udGFpbmVyJyk7XG52YXIgV2Via2l0R3JhZGllbnRDb250YWluZXIgPSBfZGVyZXFfKCcuL3dlYmtpdGdyYWRpZW50Y29udGFpbmVyJyk7XG52YXIgYmluZCA9IF9kZXJlcV8oJy4vdXRpbHMnKS5iaW5kO1xuXG5mdW5jdGlvbiBJbWFnZUxvYWRlcihvcHRpb25zLCBzdXBwb3J0KSB7XG4gICAgdGhpcy5saW5rID0gbnVsbDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuc3VwcG9ydCA9IHN1cHBvcnQ7XG4gICAgdGhpcy5vcmlnaW4gPSB0aGlzLmdldE9yaWdpbih3aW5kb3cubG9jYXRpb24uaHJlZik7XG59XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5maW5kSW1hZ2VzID0gZnVuY3Rpb24obm9kZXMpIHtcbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgbm9kZXMucmVkdWNlKGZ1bmN0aW9uKGltYWdlTm9kZXMsIGNvbnRhaW5lcikge1xuICAgICAgICBzd2l0Y2goY29udGFpbmVyLm5vZGUubm9kZU5hbWUpIHtcbiAgICAgICAgY2FzZSBcIklNR1wiOlxuICAgICAgICAgICAgcmV0dXJuIGltYWdlTm9kZXMuY29uY2F0KFt7XG4gICAgICAgICAgICAgICAgYXJnczogW2NvbnRhaW5lci5ub2RlLnNyY10sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcInVybFwiXG4gICAgICAgICAgICB9XSk7XG4gICAgICAgIGNhc2UgXCJzdmdcIjpcbiAgICAgICAgY2FzZSBcIklGUkFNRVwiOlxuICAgICAgICAgICAgcmV0dXJuIGltYWdlTm9kZXMuY29uY2F0KFt7XG4gICAgICAgICAgICAgICAgYXJnczogW2NvbnRhaW5lci5ub2RlXSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IGNvbnRhaW5lci5ub2RlLm5vZGVOYW1lXG4gICAgICAgICAgICB9XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltYWdlTm9kZXM7XG4gICAgfSwgW10pLmZvckVhY2godGhpcy5hZGRJbWFnZShpbWFnZXMsIHRoaXMubG9hZEltYWdlKSwgdGhpcyk7XG4gICAgcmV0dXJuIGltYWdlcztcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5maW5kQmFja2dyb3VuZEltYWdlID0gZnVuY3Rpb24oaW1hZ2VzLCBjb250YWluZXIpIHtcbiAgICBjb250YWluZXIucGFyc2VCYWNrZ3JvdW5kSW1hZ2VzKCkuZmlsdGVyKHRoaXMuaGFzSW1hZ2VCYWNrZ3JvdW5kKS5mb3JFYWNoKHRoaXMuYWRkSW1hZ2UoaW1hZ2VzLCB0aGlzLmxvYWRJbWFnZSksIHRoaXMpO1xuICAgIHJldHVybiBpbWFnZXM7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuYWRkSW1hZ2UgPSBmdW5jdGlvbihpbWFnZXMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG5ld0ltYWdlKSB7XG4gICAgICAgIG5ld0ltYWdlLmFyZ3MuZm9yRWFjaChmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmltYWdlRXhpc3RzKGltYWdlcywgaW1hZ2UpKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzLnNwbGljZSgwLCAwLCBjYWxsYmFjay5jYWxsKHRoaXMsIG5ld0ltYWdlKSk7XG4gICAgICAgICAgICAgICAgbG9nKCdBZGRlZCBpbWFnZSAjJyArIChpbWFnZXMubGVuZ3RoKSwgdHlwZW9mKGltYWdlKSA9PT0gXCJzdHJpbmdcIiA/IGltYWdlLnN1YnN0cmluZygwLCAxMDApIDogaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xufTtcblxuSW1hZ2VMb2FkZXIucHJvdG90eXBlLmhhc0ltYWdlQmFja2dyb3VuZCA9IGZ1bmN0aW9uKGltYWdlRGF0YSkge1xuICAgIHJldHVybiBpbWFnZURhdGEubWV0aG9kICE9PSBcIm5vbmVcIjtcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5sb2FkSW1hZ2UgPSBmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICBpZiAoaW1hZ2VEYXRhLm1ldGhvZCA9PT0gXCJ1cmxcIikge1xuICAgICAgICB2YXIgc3JjID0gaW1hZ2VEYXRhLmFyZ3NbMF07XG4gICAgICAgIGlmICh0aGlzLmlzU1ZHKHNyYykgJiYgIXRoaXMuc3VwcG9ydC5zdmcgJiYgIXRoaXMub3B0aW9ucy5hbGxvd1RhaW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNWR0NvbnRhaW5lcihzcmMpO1xuICAgICAgICB9IGVsc2UgaWYgKHNyYy5tYXRjaCgvZGF0YTppbWFnZVxcLy4qO2Jhc2U2NCwvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW1hZ2VDb250YWluZXIoc3JjLnJlcGxhY2UoL3VybFxcKFsnXCJdezAsfXxbJ1wiXXswLH1cXCkkL2lnLCAnJyksIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2FtZU9yaWdpbihzcmMpIHx8IHRoaXMub3B0aW9ucy5hbGxvd1RhaW50ID09PSB0cnVlIHx8IHRoaXMuaXNTVkcoc3JjKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbWFnZUNvbnRhaW5lcihzcmMsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN1cHBvcnQuY29ycyAmJiAhdGhpcy5vcHRpb25zLmFsbG93VGFpbnQgJiYgdGhpcy5vcHRpb25zLnVzZUNPUlMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW1hZ2VDb250YWluZXIoc3JjLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucHJveHkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJveHlJbWFnZUNvbnRhaW5lcihzcmMsIHRoaXMub3B0aW9ucy5wcm94eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IER1bW15SW1hZ2VDb250YWluZXIoc3JjKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW1hZ2VEYXRhLm1ldGhvZCA9PT0gXCJsaW5lYXItZ3JhZGllbnRcIikge1xuICAgICAgICByZXR1cm4gbmV3IExpbmVhckdyYWRpZW50Q29udGFpbmVyKGltYWdlRGF0YSk7XG4gICAgfSBlbHNlIGlmIChpbWFnZURhdGEubWV0aG9kID09PSBcImdyYWRpZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBXZWJraXRHcmFkaWVudENvbnRhaW5lcihpbWFnZURhdGEpO1xuICAgIH0gZWxzZSBpZiAoaW1hZ2VEYXRhLm1ldGhvZCA9PT0gXCJzdmdcIikge1xuICAgICAgICByZXR1cm4gbmV3IFNWR05vZGVDb250YWluZXIoaW1hZ2VEYXRhLmFyZ3NbMF0sIHRoaXMuc3VwcG9ydC5zdmcpO1xuICAgIH0gZWxzZSBpZiAoaW1hZ2VEYXRhLm1ldGhvZCA9PT0gXCJJRlJBTUVcIikge1xuICAgICAgICByZXR1cm4gbmV3IEZyYW1lQ29udGFpbmVyKGltYWdlRGF0YS5hcmdzWzBdLCB0aGlzLmlzU2FtZU9yaWdpbihpbWFnZURhdGEuYXJnc1swXS5zcmMpLCB0aGlzLm9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgRHVtbXlJbWFnZUNvbnRhaW5lcihpbWFnZURhdGEpO1xuICAgIH1cbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5pc1NWRyA9IGZ1bmN0aW9uKHNyYykge1xuICAgIHJldHVybiBzcmMuc3Vic3RyaW5nKHNyYy5sZW5ndGggLSAzKS50b0xvd2VyQ2FzZSgpID09PSBcInN2Z1wiIHx8IFNWR0NvbnRhaW5lci5wcm90b3R5cGUuaXNJbmxpbmUoc3JjKTtcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5pbWFnZUV4aXN0cyA9IGZ1bmN0aW9uKGltYWdlcywgc3JjKSB7XG4gICAgcmV0dXJuIGltYWdlcy5zb21lKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIHJldHVybiBpbWFnZS5zcmMgPT09IHNyYztcbiAgICB9KTtcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5pc1NhbWVPcmlnaW4gPSBmdW5jdGlvbih1cmwpIHtcbiAgICByZXR1cm4gKHRoaXMuZ2V0T3JpZ2luKHVybCkgPT09IHRoaXMub3JpZ2luKTtcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbih1cmwpIHtcbiAgICB2YXIgbGluayA9IHRoaXMubGluayB8fCAodGhpcy5saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBsaW5rLmhyZWYgPSBsaW5rLmhyZWY7IC8vIElFOSwgTE9MISAtIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvbmlrbGFzdmgvMmU0OGIvXG4gICAgcmV0dXJuIGxpbmsucHJvdG9jb2wgKyBsaW5rLmhvc3RuYW1lICsgbGluay5wb3J0O1xufTtcblxuSW1hZ2VMb2FkZXIucHJvdG90eXBlLmdldFByb21pc2UgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICByZXR1cm4gdGhpcy50aW1lb3V0KGNvbnRhaW5lciwgdGhpcy5vcHRpb25zLmltYWdlVGltZW91dClbJ2NhdGNoJ10oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkdW1teSA9IG5ldyBEdW1teUltYWdlQ29udGFpbmVyKGNvbnRhaW5lci5zcmMpO1xuICAgICAgICByZXR1cm4gZHVtbXkucHJvbWlzZS50aGVuKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgdmFyIGZvdW5kID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5pbWFnZXMuc29tZShmdW5jdGlvbihpbWcpIHtcbiAgICAgICAgcmV0dXJuIChmb3VuZCA9IGltZykuc3JjID09PSBzcmM7XG4gICAgfSkgPyBmb3VuZCA6IG51bGw7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbihub2Rlcykge1xuICAgIHRoaXMuaW1hZ2VzID0gbm9kZXMucmVkdWNlKGJpbmQodGhpcy5maW5kQmFja2dyb3VuZEltYWdlLCB0aGlzKSwgdGhpcy5maW5kSW1hZ2VzKG5vZGVzKSk7XG4gICAgdGhpcy5pbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWFnZSwgaW5kZXgpIHtcbiAgICAgICAgaW1hZ2UucHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9nKFwiU3VjY2VzZnVsbHkgbG9hZGVkIGltYWdlICNcIisgKGluZGV4KzEpLCBpbWFnZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxvZyhcIkZhaWxlZCBsb2FkaW5nIGltYWdlICNcIisgKGluZGV4KzEpLCBpbWFnZSwgZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMucmVhZHkgPSBQcm9taXNlLmFsbCh0aGlzLmltYWdlcy5tYXAodGhpcy5nZXRQcm9taXNlLCB0aGlzKSk7XG4gICAgbG9nKFwiRmluaXNoZWQgc2VhcmNoaW5nIGltYWdlc1wiKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24oY29udGFpbmVyLCB0aW1lb3V0KSB7XG4gICAgdmFyIHRpbWVyO1xuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yYWNlKFtjb250YWluZXIucHJvbWlzZSwgbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzLCByZWplY3QpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9nKFwiVGltZWQgb3V0IGxvYWRpbmcgaW1hZ2VcIiwgY29udGFpbmVyKTtcbiAgICAgICAgICAgIHJlamVjdChjb250YWluZXIpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICB9KV0pLnRoZW4oZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSk7XG4gICAgcHJvbWlzZVsnY2F0Y2gnXShmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VMb2FkZXI7XG5cbn0se1wiLi9kdW1teWltYWdlY29udGFpbmVyXCI6NSxcIi4vZnJhbWVjb250YWluZXJcIjo4LFwiLi9pbWFnZWNvbnRhaW5lclwiOjEwLFwiLi9saW5lYXJncmFkaWVudGNvbnRhaW5lclwiOjEyLFwiLi9sb2dcIjoxMyxcIi4vcHJveHlpbWFnZWNvbnRhaW5lclwiOjE3LFwiLi9zdmdjb250YWluZXJcIjoyMyxcIi4vc3Znbm9kZWNvbnRhaW5lclwiOjI0LFwiLi91dGlsc1wiOjI2LFwiLi93ZWJraXRncmFkaWVudGNvbnRhaW5lclwiOjI3fV0sMTI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIEdyYWRpZW50Q29udGFpbmVyID0gX2RlcmVxXygnLi9ncmFkaWVudGNvbnRhaW5lcicpO1xudmFyIENvbG9yID0gX2RlcmVxXygnLi9jb2xvcicpO1xuXG5mdW5jdGlvbiBMaW5lYXJHcmFkaWVudENvbnRhaW5lcihpbWFnZURhdGEpIHtcbiAgICBHcmFkaWVudENvbnRhaW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9IEdyYWRpZW50Q29udGFpbmVyLlRZUEVTLkxJTkVBUjtcblxuICAgIHZhciBoYXNEaXJlY3Rpb24gPSBMaW5lYXJHcmFkaWVudENvbnRhaW5lci5SRUdFWFBfRElSRUNUSU9OLnRlc3QoIGltYWdlRGF0YS5hcmdzWzBdICkgfHxcbiAgICAgICAgIUdyYWRpZW50Q29udGFpbmVyLlJFR0VYUF9DT0xPUlNUT1AudGVzdCggaW1hZ2VEYXRhLmFyZ3NbMF0gKTtcblxuICAgIGlmIChoYXNEaXJlY3Rpb24pIHtcbiAgICAgICAgaW1hZ2VEYXRhLmFyZ3NbMF0uc3BsaXQoL1xccysvKS5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbihwb3NpdGlvbiwgaW5kZXgpIHtcbiAgICAgICAgICAgIHN3aXRjaChwb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLngwID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLngxID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnkwID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkxID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgIHRoaXMueDAgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMueDEgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgICAgIHRoaXMueTAgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMueTEgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRvXCI6XG4gICAgICAgICAgICAgICAgdmFyIHkwID0gdGhpcy55MDtcbiAgICAgICAgICAgICAgICB2YXIgeDAgPSB0aGlzLngwO1xuICAgICAgICAgICAgICAgIHRoaXMueTAgPSB0aGlzLnkxO1xuICAgICAgICAgICAgICAgIHRoaXMueDAgPSB0aGlzLngxO1xuICAgICAgICAgICAgICAgIHRoaXMueDEgPSB4MDtcbiAgICAgICAgICAgICAgICB0aGlzLnkxID0geTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgICAgICAgICAgYnJlYWs7IC8vIGNlbnRlcmVkIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIC8vIEZpcmVmb3ggaW50ZXJuYWxseSBjb252ZXJ0cyBwb3NpdGlvbiBrZXl3b3JkcyB0byBwZXJjZW50YWdlczpcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTAvV0QtQ1NTMi0yMDEwMTIwNy9jb2xvcnMuaHRtbCNwcm9wZGVmLWJhY2tncm91bmQtcG9zaXRpb25cbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIHBlcmNlbnRhZ2Ugb3IgYWJzb2x1dGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBhYnNvbHV0ZSBzdGFydCBwb2ludCBwb3NpdGlvbnMgKGUuZy4sIHVzZSBib3VuZHMgdG8gY29udmVydCBweCB0byBhIHJhdGlvKVxuICAgICAgICAgICAgICAgIHZhciByYXRpbyA9IHBhcnNlRmxvYXQocG9zaXRpb24sIDEwKSAqIDFlLTI7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHJhdGlvKSkgeyAvLyBpbnZhbGlkIG9yIHVuaGFuZGxlZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueTAgPSByYXRpbztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55MSA9IDEgLSB0aGlzLnkwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueDAgPSByYXRpbztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54MSA9IDEgLSB0aGlzLngwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy55MCA9IDA7XG4gICAgICAgIHRoaXMueTEgPSAxO1xuICAgIH1cblxuICAgIHRoaXMuY29sb3JTdG9wcyA9IGltYWdlRGF0YS5hcmdzLnNsaWNlKGhhc0RpcmVjdGlvbiA/IDEgOiAwKS5tYXAoZnVuY3Rpb24oY29sb3JTdG9wKSB7XG4gICAgICAgIHZhciBjb2xvclN0b3BNYXRjaCA9IGNvbG9yU3RvcC5tYXRjaChHcmFkaWVudENvbnRhaW5lci5SRUdFWFBfQ09MT1JTVE9QKTtcbiAgICAgICAgdmFyIHZhbHVlID0gK2NvbG9yU3RvcE1hdGNoWzJdO1xuICAgICAgICB2YXIgdW5pdCA9IHZhbHVlID09PSAwID8gXCIlXCIgOiBjb2xvclN0b3BNYXRjaFszXTsgLy8gdHJlYXQgXCIwXCIgYXMgXCIwJVwiXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKGNvbG9yU3RvcE1hdGNoWzFdKSxcbiAgICAgICAgICAgIC8vIFRPRE86IHN1cHBvcnQgYWJzb2x1dGUgc3RvcCBwb3NpdGlvbnMgKGUuZy4sIGNvbXB1dGUgZ3JhZGllbnQgbGluZSBsZW5ndGggJiBjb252ZXJ0IHB4IHRvIHJhdGlvKVxuICAgICAgICAgICAgc3RvcDogdW5pdCA9PT0gXCIlXCIgPyB2YWx1ZSAvIDEwMCA6IG51bGxcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbG9yU3RvcHNbMF0uc3RvcCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbG9yU3RvcHNbMF0uc3RvcCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29sb3JTdG9wc1t0aGlzLmNvbG9yU3RvcHMubGVuZ3RoIC0gMV0uc3RvcCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbG9yU3RvcHNbdGhpcy5jb2xvclN0b3BzLmxlbmd0aCAtIDFdLnN0b3AgPSAxO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZXMgYW5kIGZpbGxzLWluIGV4cGxpY2l0IHN0b3AgcG9zaXRpb25zIHdoZW4gb21pdHRlZCBmcm9tIHJ1bGVcbiAgICB0aGlzLmNvbG9yU3RvcHMuZm9yRWFjaChmdW5jdGlvbihjb2xvclN0b3AsIGluZGV4KSB7XG4gICAgICAgIGlmIChjb2xvclN0b3Auc3RvcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvclN0b3BzLnNsaWNlKGluZGV4KS5zb21lKGZ1bmN0aW9uKGZpbmQsIGNvdW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQuc3RvcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb2xvclN0b3Auc3RvcCA9ICgoZmluZC5zdG9wIC0gdGhpcy5jb2xvclN0b3BzW2luZGV4IC0gMV0uc3RvcCkgLyAoY291bnQgKyAxKSkgKyB0aGlzLmNvbG9yU3RvcHNbaW5kZXggLSAxXS5zdG9wO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LCB0aGlzKTtcbn1cblxuTGluZWFyR3JhZGllbnRDb250YWluZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcmFkaWVudENvbnRhaW5lci5wcm90b3R5cGUpO1xuXG4vLyBUT0RPOiBzdXBwb3J0IDxhbmdsZT4gKGUuZy4gLT9cXGR7MSwzfSg/OlxcLlxcZCspZGVnLCBldGMuIDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvQ1NTL2FuZ2xlIClcbkxpbmVhckdyYWRpZW50Q29udGFpbmVyLlJFR0VYUF9ESVJFQ1RJT04gPSAvXlxccyooPzp0b3xsZWZ0fHJpZ2h0fHRvcHxib3R0b218Y2VudGVyfFxcZHsxLDN9KD86XFwuXFxkKyk/JT8pKD86XFxzfCQpL2k7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZWFyR3JhZGllbnRDb250YWluZXI7XG5cbn0se1wiLi9jb2xvclwiOjMsXCIuL2dyYWRpZW50Y29udGFpbmVyXCI6OX1dLDEzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBsb2dnZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAobG9nZ2VyLm9wdGlvbnMubG9nZ2luZyAmJiB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cpIHtcbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbCh3aW5kb3cuY29uc29sZS5sb2csICh3aW5kb3cuY29uc29sZSkpLmFwcGx5KHdpbmRvdy5jb25zb2xlLCBbKERhdGUubm93KCkgLSBsb2dnZXIub3B0aW9ucy5zdGFydCkgKyBcIm1zXCIsIFwiaHRtbDJjYW52YXM6XCJdLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpKTtcbiAgICB9XG59O1xuXG5sb2dnZXIub3B0aW9ucyA9IHtsb2dnaW5nOiBmYWxzZX07XG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2dlcjtcblxufSx7fV0sMTQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIENvbG9yID0gX2RlcmVxXygnLi9jb2xvcicpO1xudmFyIHV0aWxzID0gX2RlcmVxXygnLi91dGlscycpO1xudmFyIGdldEJvdW5kcyA9IHV0aWxzLmdldEJvdW5kcztcbnZhciBwYXJzZUJhY2tncm91bmRzID0gdXRpbHMucGFyc2VCYWNrZ3JvdW5kcztcbnZhciBvZmZzZXRCb3VuZHMgPSB1dGlscy5vZmZzZXRCb3VuZHM7XG5cbmZ1bmN0aW9uIE5vZGVDb250YWluZXIobm9kZSwgcGFyZW50KSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLnN0YWNrID0gbnVsbDtcbiAgICB0aGlzLmJvdW5kcyA9IG51bGw7XG4gICAgdGhpcy5ib3JkZXJzID0gbnVsbDtcbiAgICB0aGlzLmNsaXAgPSBbXTtcbiAgICB0aGlzLmJhY2tncm91bmRDbGlwID0gW107XG4gICAgdGhpcy5vZmZzZXRCb3VuZHMgPSBudWxsO1xuICAgIHRoaXMudmlzaWJsZSA9IG51bGw7XG4gICAgdGhpcy5jb21wdXRlZFN0eWxlcyA9IG51bGw7XG4gICAgdGhpcy5jb2xvcnMgPSB7fTtcbiAgICB0aGlzLnN0eWxlcyA9IHt9O1xuICAgIHRoaXMuYmFja2dyb3VuZEltYWdlcyA9IG51bGw7XG4gICAgdGhpcy50cmFuc2Zvcm1EYXRhID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zZm9ybU1hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5pc1BzZXVkb0VsZW1lbnQgPSBmYWxzZTtcbiAgICB0aGlzLm9wYWNpdHkgPSBudWxsO1xufVxuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5jbG9uZVRvID0gZnVuY3Rpb24oc3RhY2spIHtcbiAgICBzdGFjay52aXNpYmxlID0gdGhpcy52aXNpYmxlO1xuICAgIHN0YWNrLmJvcmRlcnMgPSB0aGlzLmJvcmRlcnM7XG4gICAgc3RhY2suYm91bmRzID0gdGhpcy5ib3VuZHM7XG4gICAgc3RhY2suY2xpcCA9IHRoaXMuY2xpcDtcbiAgICBzdGFjay5iYWNrZ3JvdW5kQ2xpcCA9IHRoaXMuYmFja2dyb3VuZENsaXA7XG4gICAgc3RhY2suY29tcHV0ZWRTdHlsZXMgPSB0aGlzLmNvbXB1dGVkU3R5bGVzO1xuICAgIHN0YWNrLnN0eWxlcyA9IHRoaXMuc3R5bGVzO1xuICAgIHN0YWNrLmJhY2tncm91bmRJbWFnZXMgPSB0aGlzLmJhY2tncm91bmRJbWFnZXM7XG4gICAgc3RhY2sub3BhY2l0eSA9IHRoaXMub3BhY2l0eTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLmdldE9wYWNpdHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcGFjaXR5ID09PSBudWxsID8gKHRoaXMub3BhY2l0eSA9IHRoaXMuY3NzRmxvYXQoJ29wYWNpdHknKSkgOiB0aGlzLm9wYWNpdHk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5hc3NpZ25TdGFjayA9IGZ1bmN0aW9uKHN0YWNrKSB7XG4gICAgdGhpcy5zdGFjayA9IHN0YWNrO1xuICAgIHN0YWNrLmNoaWxkcmVuLnB1c2godGhpcyk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5pc0VsZW1lbnRWaXNpYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgPyB0aGlzLnBhcmVudC52aXNpYmxlIDogKFxuICAgICAgICB0aGlzLmNzcygnZGlzcGxheScpICE9PSBcIm5vbmVcIiAmJlxuICAgICAgICB0aGlzLmNzcygndmlzaWJpbGl0eScpICE9PSBcImhpZGRlblwiICYmXG4gICAgICAgICF0aGlzLm5vZGUuaGFzQXR0cmlidXRlKFwiZGF0YS1odG1sMmNhbnZhcy1pZ25vcmVcIikgJiZcbiAgICAgICAgKHRoaXMubm9kZS5ub2RlTmFtZSAhPT0gXCJJTlBVVFwiIHx8IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpICE9PSBcImhpZGRlblwiKVxuICAgICk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICBpZiAoIXRoaXMuY29tcHV0ZWRTdHlsZXMpIHtcbiAgICAgICAgdGhpcy5jb21wdXRlZFN0eWxlcyA9IHRoaXMuaXNQc2V1ZG9FbGVtZW50ID8gdGhpcy5wYXJlbnQuY29tcHV0ZWRTdHlsZSh0aGlzLmJlZm9yZSA/IFwiOmJlZm9yZVwiIDogXCI6YWZ0ZXJcIikgOiB0aGlzLmNvbXB1dGVkU3R5bGUobnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3R5bGVzW2F0dHJpYnV0ZV0gfHwgKHRoaXMuc3R5bGVzW2F0dHJpYnV0ZV0gPSB0aGlzLmNvbXB1dGVkU3R5bGVzW2F0dHJpYnV0ZV0pO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUucHJlZml4ZWRDc3MgPSBmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICB2YXIgcHJlZml4ZXMgPSBbXCJ3ZWJraXRcIiwgXCJtb3pcIiwgXCJtc1wiLCBcIm9cIl07XG4gICAgdmFyIHZhbHVlID0gdGhpcy5jc3MoYXR0cmlidXRlKTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcmVmaXhlcy5zb21lKGZ1bmN0aW9uKHByZWZpeCkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNzcyhwcmVmaXggKyBhdHRyaWJ1dGUuc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBhdHRyaWJ1dGUuc3Vic3RyKDEpKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyBudWxsIDogdmFsdWU7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5jb21wdXRlZFN0eWxlID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHJldHVybiB0aGlzLm5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubm9kZSwgdHlwZSk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5jc3NJbnQgPSBmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICB2YXIgdmFsdWUgPSBwYXJzZUludCh0aGlzLmNzcyhhdHRyaWJ1dGUpLCAxMCk7XG4gICAgcmV0dXJuIChpc05hTih2YWx1ZSkpID8gMCA6IHZhbHVlOyAvLyBib3JkZXJzIGluIG9sZCBJRSBhcmUgdGhyb3dpbmcgJ21lZGl1bScgZm9yIGRlbW8uaHRtbFxufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuY29sb3IgPSBmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcnNbYXR0cmlidXRlXSB8fCAodGhpcy5jb2xvcnNbYXR0cmlidXRlXSA9IG5ldyBDb2xvcih0aGlzLmNzcyhhdHRyaWJ1dGUpKSk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5jc3NGbG9hdCA9IGZ1bmN0aW9uKGF0dHJpYnV0ZSkge1xuICAgIHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5jc3MoYXR0cmlidXRlKSk7XG4gICAgcmV0dXJuIChpc05hTih2YWx1ZSkpID8gMCA6IHZhbHVlO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuZm9udFdlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3ZWlnaHQgPSB0aGlzLmNzcyhcImZvbnRXZWlnaHRcIik7XG4gICAgc3dpdGNoKHBhcnNlSW50KHdlaWdodCwgMTApKXtcbiAgICBjYXNlIDQwMTpcbiAgICAgICAgd2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDAwOlxuICAgICAgICB3ZWlnaHQgPSBcIm5vcm1hbFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHdlaWdodDtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlQ2xpcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXRjaGVzID0gdGhpcy5jc3MoJ2NsaXAnKS5tYXRjaCh0aGlzLkNMSVApO1xuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHBhcnNlSW50KG1hdGNoZXNbMV0sIDEwKSxcbiAgICAgICAgICAgIHJpZ2h0OiBwYXJzZUludChtYXRjaGVzWzJdLCAxMCksXG4gICAgICAgICAgICBib3R0b206IHBhcnNlSW50KG1hdGNoZXNbM10sIDEwKSxcbiAgICAgICAgICAgIGxlZnQ6IHBhcnNlSW50KG1hdGNoZXNbNF0sIDEwKVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlQmFja2dyb3VuZEltYWdlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRJbWFnZXMgfHwgKHRoaXMuYmFja2dyb3VuZEltYWdlcyA9IHBhcnNlQmFja2dyb3VuZHModGhpcy5jc3MoXCJiYWNrZ3JvdW5kSW1hZ2VcIikpKTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLmNzc0xpc3QgPSBmdW5jdGlvbihwcm9wZXJ0eSwgaW5kZXgpIHtcbiAgICB2YXIgdmFsdWUgPSAodGhpcy5jc3MocHJvcGVydHkpIHx8ICcnKS5zcGxpdCgnLCcpO1xuICAgIHZhbHVlID0gdmFsdWVbaW5kZXggfHwgMF0gfHwgdmFsdWVbMF0gfHwgJ2F1dG8nO1xuICAgIHZhbHVlID0gdmFsdWUudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YWx1ZSA9IFt2YWx1ZVswXSwgaXNQZXJjZW50YWdlKHZhbHVlWzBdKSA/ICdhdXRvJyA6IHZhbHVlWzBdXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUucGFyc2VCYWNrZ3JvdW5kU2l6ZSA9IGZ1bmN0aW9uKGJvdW5kcywgaW1hZ2UsIGluZGV4KSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLmNzc0xpc3QoXCJiYWNrZ3JvdW5kU2l6ZVwiLCBpbmRleCk7XG4gICAgdmFyIHdpZHRoLCBoZWlnaHQ7XG5cbiAgICBpZiAoaXNQZXJjZW50YWdlKHNpemVbMF0pKSB7XG4gICAgICAgIHdpZHRoID0gYm91bmRzLndpZHRoICogcGFyc2VGbG9hdChzaXplWzBdKSAvIDEwMDtcbiAgICB9IGVsc2UgaWYgKC9jb250YWlufGNvdmVyLy50ZXN0KHNpemVbMF0pKSB7XG4gICAgICAgIHZhciB0YXJnZXRSYXRpbyA9IGJvdW5kcy53aWR0aCAvIGJvdW5kcy5oZWlnaHQsIGN1cnJlbnRSYXRpbyA9IGltYWdlLndpZHRoIC8gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gKHRhcmdldFJhdGlvIDwgY3VycmVudFJhdGlvIF4gc2l6ZVswXSA9PT0gJ2NvbnRhaW4nKSA/ICB7d2lkdGg6IGJvdW5kcy5oZWlnaHQgKiBjdXJyZW50UmF0aW8sIGhlaWdodDogYm91bmRzLmhlaWdodH0gOiB7d2lkdGg6IGJvdW5kcy53aWR0aCwgaGVpZ2h0OiBib3VuZHMud2lkdGggLyBjdXJyZW50UmF0aW99O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZHRoID0gcGFyc2VJbnQoc2l6ZVswXSwgMTApO1xuICAgIH1cblxuICAgIGlmIChzaXplWzBdID09PSAnYXV0bycgJiYgc2l6ZVsxXSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKHNpemVbMV0gPT09ICdhdXRvJykge1xuICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGltYWdlLndpZHRoICogaW1hZ2UuaGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAoaXNQZXJjZW50YWdlKHNpemVbMV0pKSB7XG4gICAgICAgIGhlaWdodCA9ICBib3VuZHMuaGVpZ2h0ICogcGFyc2VGbG9hdChzaXplWzFdKSAvIDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludChzaXplWzFdLCAxMCk7XG4gICAgfVxuXG4gICAgaWYgKHNpemVbMF0gPT09ICdhdXRvJykge1xuICAgICAgICB3aWR0aCA9IGhlaWdodCAvIGltYWdlLmhlaWdodCAqIGltYWdlLndpZHRoO1xuICAgIH1cblxuICAgIHJldHVybiB7d2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5wYXJzZUJhY2tncm91bmRQb3NpdGlvbiA9IGZ1bmN0aW9uKGJvdW5kcywgaW1hZ2UsIGluZGV4LCBiYWNrZ3JvdW5kU2l6ZSkge1xuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuY3NzTGlzdCgnYmFja2dyb3VuZFBvc2l0aW9uJywgaW5kZXgpO1xuICAgIHZhciBsZWZ0LCB0b3A7XG5cbiAgICBpZiAoaXNQZXJjZW50YWdlKHBvc2l0aW9uWzBdKSl7XG4gICAgICAgIGxlZnQgPSAoYm91bmRzLndpZHRoIC0gKGJhY2tncm91bmRTaXplIHx8IGltYWdlKS53aWR0aCkgKiAocGFyc2VGbG9hdChwb3NpdGlvblswXSkgLyAxMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlZnQgPSBwYXJzZUludChwb3NpdGlvblswXSwgMTApO1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvblsxXSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHRvcCA9IGxlZnQgLyBpbWFnZS53aWR0aCAqIGltYWdlLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKGlzUGVyY2VudGFnZShwb3NpdGlvblsxXSkpe1xuICAgICAgICB0b3AgPSAgKGJvdW5kcy5oZWlnaHQgLSAoYmFja2dyb3VuZFNpemUgfHwgaW1hZ2UpLmhlaWdodCkgKiBwYXJzZUZsb2F0KHBvc2l0aW9uWzFdKSAvIDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b3AgPSBwYXJzZUludChwb3NpdGlvblsxXSwgMTApO1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvblswXSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIGxlZnQgPSB0b3AgLyBpbWFnZS5oZWlnaHQgKiBpbWFnZS53aWR0aDtcbiAgICB9XG5cbiAgICByZXR1cm4ge2xlZnQ6IGxlZnQsIHRvcDogdG9wfTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlQmFja2dyb3VuZFJlcGVhdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzTGlzdChcImJhY2tncm91bmRSZXBlYXRcIiwgaW5kZXgpWzBdO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUucGFyc2VUZXh0U2hhZG93cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZXh0U2hhZG93ID0gdGhpcy5jc3MoXCJ0ZXh0U2hhZG93XCIpO1xuICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICBpZiAodGV4dFNoYWRvdyAmJiB0ZXh0U2hhZG93ICE9PSAnbm9uZScpIHtcbiAgICAgICAgdmFyIHNoYWRvd3MgPSB0ZXh0U2hhZG93Lm1hdGNoKHRoaXMuVEVYVF9TSEFET1dfUFJPUEVSVFkpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgc2hhZG93cyAmJiAoaSA8IHNoYWRvd3MubGVuZ3RoKTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcyA9IHNoYWRvd3NbaV0ubWF0Y2godGhpcy5URVhUX1NIQURPV19WQUxVRVMpO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKHNbMF0pLFxuICAgICAgICAgICAgICAgIG9mZnNldFg6IHNbMV0gPyBwYXJzZUZsb2F0KHNbMV0ucmVwbGFjZSgncHgnLCAnJykpIDogMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiBzWzJdID8gcGFyc2VGbG9hdChzWzJdLnJlcGxhY2UoJ3B4JywgJycpKSA6IDAsXG4gICAgICAgICAgICAgICAgYmx1cjogc1szXSA/IHNbM10ucmVwbGFjZSgncHgnLCAnJykgOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlVHJhbnNmb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnRyYW5zZm9ybURhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzVHJhbnNmb3JtKCkpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnBhcnNlQm91bmRzKCk7XG4gICAgICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy5wcmVmaXhlZENzcyhcInRyYW5zZm9ybU9yaWdpblwiKS5zcGxpdChcIiBcIikubWFwKHJlbW92ZVB4KS5tYXAoYXNGbG9hdCk7XG4gICAgICAgICAgICBvcmlnaW5bMF0gKz0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgICBvcmlnaW5bMV0gKz0gb2Zmc2V0LnRvcDtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgICAgICBtYXRyaXg6IHRoaXMucGFyc2VUcmFuc2Zvcm1NYXRyaXgoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW46IFswLCAwXSxcbiAgICAgICAgICAgICAgICBtYXRyaXg6IFsxLCAwLCAwLCAxLCAwLCAwXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1EYXRhO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUucGFyc2VUcmFuc2Zvcm1NYXRyaXggPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMudHJhbnNmb3JtTWF0cml4KSB7XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnByZWZpeGVkQ3NzKFwidHJhbnNmb3JtXCIpO1xuICAgICAgICB2YXIgbWF0cml4ID0gdHJhbnNmb3JtID8gcGFyc2VNYXRyaXgodHJhbnNmb3JtLm1hdGNoKHRoaXMuTUFUUklYX1BST1BFUlRZKSkgOiBudWxsO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybU1hdHJpeCA9IG1hdHJpeCA/IG1hdHJpeCA6IFsxLCAwLCAwLCAxLCAwLCAwXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtTWF0cml4O1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUucGFyc2VCb3VuZHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5ib3VuZHMgfHwgKHRoaXMuYm91bmRzID0gdGhpcy5oYXNUcmFuc2Zvcm0oKSA/IG9mZnNldEJvdW5kcyh0aGlzLm5vZGUpIDogZ2V0Qm91bmRzKHRoaXMubm9kZSkpO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuaGFzVHJhbnNmb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VUcmFuc2Zvcm1NYXRyaXgoKS5qb2luKFwiLFwiKSAhPT0gXCIxLDAsMCwxLDAsMFwiIHx8ICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5oYXNUcmFuc2Zvcm0oKSk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMubm9kZS52YWx1ZSB8fCBcIlwiO1xuICAgIGlmICh0aGlzLm5vZGUudGFnTmFtZSA9PT0gXCJTRUxFQ1RcIikge1xuICAgICAgICB2YWx1ZSA9IHNlbGVjdGlvblZhbHVlKHRoaXMubm9kZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGUudHlwZSA9PT0gXCJwYXNzd29yZFwiKSB7XG4gICAgICAgIHZhbHVlID0gQXJyYXkodmFsdWUubGVuZ3RoICsgMSkuam9pbignXFx1MjAyMicpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA9PT0gMCA/ICh0aGlzLm5vZGUucGxhY2Vob2xkZXIgfHwgXCJcIikgOiB2YWx1ZTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLk1BVFJJWF9QUk9QRVJUWSA9IC8obWF0cml4fG1hdHJpeDNkKVxcKCguKylcXCkvO1xuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuVEVYVF9TSEFET1dfUFJPUEVSVFkgPSAvKChyZ2JhfHJnYilcXChbXlxcKV0rXFwpKFxccy0/XFxkK3B4KXswLH0pL2c7XG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5URVhUX1NIQURPV19WQUxVRVMgPSAvKC0/XFxkK3B4KXwoIy4rKXwocmdiXFwoLitcXCkpfChyZ2JhXFwoLitcXCkpL2c7XG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5DTElQID0gL15yZWN0XFwoKFxcZCspcHgsPyAoXFxkKylweCw/IChcXGQrKXB4LD8gKFxcZCspcHhcXCkkLztcblxuZnVuY3Rpb24gc2VsZWN0aW9uVmFsdWUobm9kZSkge1xuICAgIHZhciBvcHRpb24gPSBub2RlLm9wdGlvbnNbbm9kZS5zZWxlY3RlZEluZGV4IHx8IDBdO1xuICAgIHJldHVybiBvcHRpb24gPyAob3B0aW9uLnRleHQgfHwgXCJcIikgOiBcIlwiO1xufVxuXG5mdW5jdGlvbiBwYXJzZU1hdHJpeChtYXRjaCkge1xuICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSA9PT0gXCJtYXRyaXhcIikge1xuICAgICAgICByZXR1cm4gbWF0Y2hbMl0uc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzLnRyaW0oKSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0gPT09IFwibWF0cml4M2RcIikge1xuICAgICAgICB2YXIgbWF0cml4M2QgPSBtYXRjaFsyXS5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzLnRyaW0oKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW21hdHJpeDNkWzBdLCBtYXRyaXgzZFsxXSwgbWF0cml4M2RbNF0sIG1hdHJpeDNkWzVdLCBtYXRyaXgzZFsxMl0sIG1hdHJpeDNkWzEzXV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1BlcmNlbnRhZ2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKFwiJVwiKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVB4KHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShcInB4XCIsIFwiXCIpO1xufVxuXG5mdW5jdGlvbiBhc0Zsb2F0KHN0cikge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZUNvbnRhaW5lcjtcblxufSx7XCIuL2NvbG9yXCI6MyxcIi4vdXRpbHNcIjoyNn1dLDE1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBsb2cgPSBfZGVyZXFfKCcuL2xvZycpO1xudmFyIHB1bnljb2RlID0gX2RlcmVxXygncHVueWNvZGUnKTtcbnZhciBOb2RlQ29udGFpbmVyID0gX2RlcmVxXygnLi9ub2RlY29udGFpbmVyJyk7XG52YXIgVGV4dENvbnRhaW5lciA9IF9kZXJlcV8oJy4vdGV4dGNvbnRhaW5lcicpO1xudmFyIFBzZXVkb0VsZW1lbnRDb250YWluZXIgPSBfZGVyZXFfKCcuL3BzZXVkb2VsZW1lbnRjb250YWluZXInKTtcbnZhciBGb250TWV0cmljcyA9IF9kZXJlcV8oJy4vZm9udG1ldHJpY3MnKTtcbnZhciBDb2xvciA9IF9kZXJlcV8oJy4vY29sb3InKTtcbnZhciBTdGFja2luZ0NvbnRleHQgPSBfZGVyZXFfKCcuL3N0YWNraW5nY29udGV4dCcpO1xudmFyIHV0aWxzID0gX2RlcmVxXygnLi91dGlscycpO1xudmFyIGJpbmQgPSB1dGlscy5iaW5kO1xudmFyIGdldEJvdW5kcyA9IHV0aWxzLmdldEJvdW5kcztcbnZhciBwYXJzZUJhY2tncm91bmRzID0gdXRpbHMucGFyc2VCYWNrZ3JvdW5kcztcbnZhciBvZmZzZXRCb3VuZHMgPSB1dGlscy5vZmZzZXRCb3VuZHM7XG5cbmZ1bmN0aW9uIE5vZGVQYXJzZXIoZWxlbWVudCwgcmVuZGVyZXIsIHN1cHBvcnQsIGltYWdlTG9hZGVyLCBvcHRpb25zKSB7XG4gICAgbG9nKFwiU3RhcnRpbmcgTm9kZVBhcnNlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnJhbmdlID0gbnVsbDtcbiAgICB0aGlzLnN1cHBvcnQgPSBzdXBwb3J0O1xuICAgIHRoaXMucmVuZGVyUXVldWUgPSBbXTtcbiAgICB0aGlzLnN0YWNrID0gbmV3IFN0YWNraW5nQ29udGV4dCh0cnVlLCAxLCBlbGVtZW50Lm93bmVyRG9jdW1lbnQsIG51bGwpO1xuICAgIHZhciBwYXJlbnQgPSBuZXcgTm9kZUNvbnRhaW5lcihlbGVtZW50LCBudWxsKTtcbiAgICBpZiAob3B0aW9ucy5iYWNrZ3JvdW5kKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlY3RhbmdsZSgwLCAwLCByZW5kZXJlci53aWR0aCwgcmVuZGVyZXIuaGVpZ2h0LCBuZXcgQ29sb3Iob3B0aW9ucy5iYWNrZ3JvdW5kKSk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50ID09PSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtYmFja2dyb3VuZC8jc3BlY2lhbC1iYWNrZ3JvdW5kc1xuICAgICAgICB2YXIgY2FudmFzQmFja2dyb3VuZCA9IG5ldyBOb2RlQ29udGFpbmVyKHBhcmVudC5jb2xvcignYmFja2dyb3VuZENvbG9yJykuaXNUcmFuc3BhcmVudCgpID8gZWxlbWVudC5vd25lckRvY3VtZW50LmJvZHkgOiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBudWxsKTtcbiAgICAgICAgcmVuZGVyZXIucmVjdGFuZ2xlKDAsIDAsIHJlbmRlcmVyLndpZHRoLCByZW5kZXJlci5oZWlnaHQsIGNhbnZhc0JhY2tncm91bmQuY29sb3IoJ2JhY2tncm91bmRDb2xvcicpKTtcbiAgICB9XG4gICAgcGFyZW50LnZpc2liaWxlID0gcGFyZW50LmlzRWxlbWVudFZpc2libGUoKTtcbiAgICB0aGlzLmNyZWF0ZVBzZXVkb0hpZGVTdHlsZXMoZWxlbWVudC5vd25lckRvY3VtZW50KTtcbiAgICB0aGlzLmRpc2FibGVBbmltYXRpb25zKGVsZW1lbnQub3duZXJEb2N1bWVudCk7XG4gICAgdGhpcy5ub2RlcyA9IGZsYXR0ZW4oW3BhcmVudF0uY29uY2F0KHRoaXMuZ2V0Q2hpbGRyZW4ocGFyZW50KSkuZmlsdGVyKGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gY29udGFpbmVyLnZpc2libGUgPSBjb250YWluZXIuaXNFbGVtZW50VmlzaWJsZSgpO1xuICAgIH0pLm1hcCh0aGlzLmdldFBzZXVkb0VsZW1lbnRzLCB0aGlzKSk7XG4gICAgdGhpcy5mb250TWV0cmljcyA9IG5ldyBGb250TWV0cmljcygpO1xuICAgIGxvZyhcIkZldGNoZWQgbm9kZXMsIHRvdGFsOlwiLCB0aGlzLm5vZGVzLmxlbmd0aCk7XG4gICAgbG9nKFwiQ2FsY3VsYXRlIG92ZXJmbG93IGNsaXBzXCIpO1xuICAgIHRoaXMuY2FsY3VsYXRlT3ZlcmZsb3dDbGlwcygpO1xuICAgIGxvZyhcIlN0YXJ0IGZldGNoaW5nIGltYWdlc1wiKTtcbiAgICB0aGlzLmltYWdlcyA9IGltYWdlTG9hZGVyLmZldGNoKHRoaXMubm9kZXMuZmlsdGVyKGlzRWxlbWVudCkpO1xuICAgIHRoaXMucmVhZHkgPSB0aGlzLmltYWdlcy5yZWFkeS50aGVuKGJpbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvZyhcIkltYWdlcyBsb2FkZWQsIHN0YXJ0aW5nIHBhcnNpbmdcIik7XG4gICAgICAgIGxvZyhcIkNyZWF0aW5nIHN0YWNraW5nIGNvbnRleHRzXCIpO1xuICAgICAgICB0aGlzLmNyZWF0ZVN0YWNraW5nQ29udGV4dHMoKTtcbiAgICAgICAgbG9nKFwiU29ydGluZyBzdGFja2luZyBjb250ZXh0c1wiKTtcbiAgICAgICAgdGhpcy5zb3J0U3RhY2tpbmdDb250ZXh0cyh0aGlzLnN0YWNrKTtcbiAgICAgICAgdGhpcy5wYXJzZSh0aGlzLnN0YWNrKTtcbiAgICAgICAgbG9nKFwiUmVuZGVyIHF1ZXVlIGNyZWF0ZWQgd2l0aCBcIiArIHRoaXMucmVuZGVyUXVldWUubGVuZ3RoICsgXCIgaXRlbXNcIik7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShiaW5kKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUXVldWUuZm9yRWFjaCh0aGlzLnBhaW50LCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihvcHRpb25zLmFzeW5jKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hc3luYy5jYWxsKHRoaXMsIHRoaXMucmVuZGVyUXVldWUsIHJlc29sdmUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlbmRlclF1ZXVlLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNSZW5kZXJlcih0aGlzLnJlbmRlclF1ZXVlLCByZXNvbHZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgfSwgdGhpcykpO1xufVxuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5jYWxjdWxhdGVPdmVyZmxvd0NsaXBzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoaXNFbGVtZW50KGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIGlmIChpc1BzZXVkb0VsZW1lbnQoY29udGFpbmVyKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRUb0RPTSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLmJvcmRlcnMgPSB0aGlzLnBhcnNlQm9yZGVycyhjb250YWluZXIpO1xuICAgICAgICAgICAgdmFyIGNsaXAgPSAoY29udGFpbmVyLmNzcygnb3ZlcmZsb3cnKSA9PT0gXCJoaWRkZW5cIikgPyBbY29udGFpbmVyLmJvcmRlcnMuY2xpcF0gOiBbXTtcbiAgICAgICAgICAgIHZhciBjc3NDbGlwID0gY29udGFpbmVyLnBhcnNlQ2xpcCgpO1xuICAgICAgICAgICAgaWYgKGNzc0NsaXAgJiYgW1wiYWJzb2x1dGVcIiwgXCJmaXhlZFwiXS5pbmRleE9mKGNvbnRhaW5lci5jc3MoJ3Bvc2l0aW9uJykpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNsaXAucHVzaChbW1wicmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmJvdW5kcy5sZWZ0ICsgY3NzQ2xpcC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmJvdW5kcy50b3AgKyBjc3NDbGlwLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsaXAucmlnaHQgLSBjc3NDbGlwLmxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGlwLmJvdHRvbSAtIGNzc0NsaXAudG9wXG4gICAgICAgICAgICAgICAgXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLmNsaXAgPSBoYXNQYXJlbnRDbGlwKGNvbnRhaW5lcikgPyBjb250YWluZXIucGFyZW50LmNsaXAuY29uY2F0KGNsaXApIDogY2xpcDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5iYWNrZ3JvdW5kQ2xpcCA9IChjb250YWluZXIuY3NzKCdvdmVyZmxvdycpICE9PSBcImhpZGRlblwiKSA/IGNvbnRhaW5lci5jbGlwLmNvbmNhdChbY29udGFpbmVyLmJvcmRlcnMuY2xpcF0pIDogY29udGFpbmVyLmNsaXA7XG4gICAgICAgICAgICBpZiAoaXNQc2V1ZG9FbGVtZW50KGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xlYW5ET00oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc1RleHROb2RlKGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGlwID0gaGFzUGFyZW50Q2xpcChjb250YWluZXIpID8gY29udGFpbmVyLnBhcmVudC5jbGlwIDogW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1BzZXVkb0VsZW1lbnQoY29udGFpbmVyKSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmJvdW5kcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LCB0aGlzKTtcbn07XG5cbmZ1bmN0aW9uIGhhc1BhcmVudENsaXAoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5wYXJlbnQgJiYgY29udGFpbmVyLnBhcmVudC5jbGlwLmxlbmd0aDtcbn1cblxuTm9kZVBhcnNlci5wcm90b3R5cGUuYXN5bmNSZW5kZXJlciA9IGZ1bmN0aW9uKHF1ZXVlLCByZXNvbHZlLCBhc3luY1RpbWVyKSB7XG4gICAgYXN5bmNUaW1lciA9IGFzeW5jVGltZXIgfHwgRGF0ZS5ub3coKTtcbiAgICB0aGlzLnBhaW50KHF1ZXVlW3RoaXMucmVuZGVySW5kZXgrK10pO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IHRoaXMucmVuZGVySW5kZXgpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgIH0gZWxzZSBpZiAoYXN5bmNUaW1lciArIDIwID4gRGF0ZS5ub3coKSkge1xuICAgICAgICB0aGlzLmFzeW5jUmVuZGVyZXIocXVldWUsIHJlc29sdmUsIGFzeW5jVGltZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoYmluZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuYXN5bmNSZW5kZXJlcihxdWV1ZSwgcmVzb2x2ZSk7XG4gICAgICAgIH0sIHRoaXMpLCAwKTtcbiAgICB9XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5jcmVhdGVQc2V1ZG9IaWRlU3R5bGVzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgICB0aGlzLmNyZWF0ZVN0eWxlcyhkb2N1bWVudCwgJy4nICsgUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuUFNFVURPX0hJREVfRUxFTUVOVF9DTEFTU19CRUZPUkUgKyAnOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXCIgIWltcG9ydGFudDsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9JyArXG4gICAgICAgICcuJyArIFBzZXVkb0VsZW1lbnRDb250YWluZXIucHJvdG90eXBlLlBTRVVET19ISURFX0VMRU1FTlRfQ0xBU1NfQUZURVIgKyAnOmFmdGVyIHsgY29udGVudDogXCJcIiAhaW1wb3J0YW50OyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0nKTtcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLmRpc2FibGVBbmltYXRpb25zID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgICB0aGlzLmNyZWF0ZVN0eWxlcyhkb2N1bWVudCwgJyogeyAtd2Via2l0LWFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50OyAtbW96LWFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50OyAtby1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDsgYW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQ7ICcgK1xuICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uOiBub25lICFpbXBvcnRhbnQ7IC1tb3otdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50OyAtby10cmFuc2l0aW9uOiBub25lICFpbXBvcnRhbnQ7IHRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDt9Jyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5jcmVhdGVTdHlsZXMgPSBmdW5jdGlvbihkb2N1bWVudCwgc3R5bGVzKSB7XG4gICAgdmFyIGhpZGVQc2V1ZG9FbGVtZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgaGlkZVBzZXVkb0VsZW1lbnRzLmlubmVySFRNTCA9IHN0eWxlcztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhpZGVQc2V1ZG9FbGVtZW50cyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5nZXRQc2V1ZG9FbGVtZW50cyA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHZhciBub2RlcyA9IFtbY29udGFpbmVyXV07XG4gICAgaWYgKGNvbnRhaW5lci5ub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICB2YXIgYmVmb3JlID0gdGhpcy5nZXRQc2V1ZG9FbGVtZW50KGNvbnRhaW5lciwgXCI6YmVmb3JlXCIpO1xuICAgICAgICB2YXIgYWZ0ZXIgPSB0aGlzLmdldFBzZXVkb0VsZW1lbnQoY29udGFpbmVyLCBcIjphZnRlclwiKTtcblxuICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKGJlZm9yZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goYWZ0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmbGF0dGVuKG5vZGVzKTtcbn07XG5cbmZ1bmN0aW9uIHRvQ2FtZWxDYXNlKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFxcLVthLXpdKS9nLCBmdW5jdGlvbihtYXRjaCl7XG4gICAgICAgIHJldHVybiBtYXRjaC50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoJy0nLCcnKTtcbiAgICB9KTtcbn1cblxuTm9kZVBhcnNlci5wcm90b3R5cGUuZ2V0UHNldWRvRWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgdHlwZSkge1xuICAgIHZhciBzdHlsZSA9IGNvbnRhaW5lci5jb21wdXRlZFN0eWxlKHR5cGUpO1xuICAgIGlmKCFzdHlsZSB8fCAhc3R5bGUuY29udGVudCB8fCBzdHlsZS5jb250ZW50ID09PSBcIm5vbmVcIiB8fCBzdHlsZS5jb250ZW50ID09PSBcIi1tb3otYWx0LWNvbnRlbnRcIiB8fCBzdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgY29udGVudCA9IHN0cmlwUXVvdGVzKHN0eWxlLmNvbnRlbnQpO1xuICAgIHZhciBpc0ltYWdlID0gY29udGVudC5zdWJzdHIoMCwgMykgPT09ICd1cmwnO1xuICAgIHZhciBwc2V1ZG9Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpc0ltYWdlID8gJ2ltZycgOiAnaHRtbDJjYW52YXNwc2V1ZG9lbGVtZW50Jyk7XG4gICAgdmFyIHBzZXVkb0NvbnRhaW5lciA9IG5ldyBQc2V1ZG9FbGVtZW50Q29udGFpbmVyKHBzZXVkb05vZGUsIGNvbnRhaW5lciwgdHlwZSk7XG5cbiAgICBmb3IgKHZhciBpID0gc3R5bGUubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eSA9IHRvQ2FtZWxDYXNlKHN0eWxlLml0ZW0oaSkpO1xuICAgICAgICBwc2V1ZG9Ob2RlLnN0eWxlW3Byb3BlcnR5XSA9IHN0eWxlW3Byb3BlcnR5XTtcbiAgICB9XG5cbiAgICBwc2V1ZG9Ob2RlLmNsYXNzTmFtZSA9IFBzZXVkb0VsZW1lbnRDb250YWluZXIucHJvdG90eXBlLlBTRVVET19ISURFX0VMRU1FTlRfQ0xBU1NfQkVGT1JFICsgXCIgXCIgKyBQc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5QU0VVRE9fSElERV9FTEVNRU5UX0NMQVNTX0FGVEVSO1xuXG4gICAgaWYgKGlzSW1hZ2UpIHtcbiAgICAgICAgcHNldWRvTm9kZS5zcmMgPSBwYXJzZUJhY2tncm91bmRzKGNvbnRlbnQpWzBdLmFyZ3NbMF07XG4gICAgICAgIHJldHVybiBbcHNldWRvQ29udGFpbmVyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICBwc2V1ZG9Ob2RlLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICByZXR1cm4gW3BzZXVkb0NvbnRhaW5lciwgbmV3IFRleHRDb250YWluZXIodGV4dCwgcHNldWRvQ29udGFpbmVyKV07XG4gICAgfVxufTtcblxuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKHBhcmVudENvbnRhaW5lcikge1xuICAgIHJldHVybiBmbGF0dGVuKFtdLmZpbHRlci5jYWxsKHBhcmVudENvbnRhaW5lci5ub2RlLmNoaWxkTm9kZXMsIHJlbmRlcmFibGVOb2RlKS5tYXAoZnVuY3Rpb24obm9kZSkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gW25vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFID8gbmV3IFRleHRDb250YWluZXIobm9kZSwgcGFyZW50Q29udGFpbmVyKSA6IG5ldyBOb2RlQ29udGFpbmVyKG5vZGUsIHBhcmVudENvbnRhaW5lcildLmZpbHRlcihub25JZ25vcmVkRWxlbWVudCk7XG4gICAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBjb250YWluZXIubGVuZ3RoICYmIG5vZGUudGFnTmFtZSAhPT0gXCJURVhUQVJFQVwiID8gKGNvbnRhaW5lclswXS5pc0VsZW1lbnRWaXNpYmxlKCkgPyBjb250YWluZXIuY29uY2F0KHRoaXMuZ2V0Q2hpbGRyZW4oY29udGFpbmVyWzBdKSkgOiBbXSkgOiBjb250YWluZXI7XG4gICAgfSwgdGhpcykpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUubmV3U3RhY2tpbmdDb250ZXh0ID0gZnVuY3Rpb24oY29udGFpbmVyLCBoYXNPd25TdGFja2luZykge1xuICAgIHZhciBzdGFjayA9IG5ldyBTdGFja2luZ0NvbnRleHQoaGFzT3duU3RhY2tpbmcsIGNvbnRhaW5lci5nZXRPcGFjaXR5KCksIGNvbnRhaW5lci5ub2RlLCBjb250YWluZXIucGFyZW50KTtcbiAgICBjb250YWluZXIuY2xvbmVUbyhzdGFjayk7XG4gICAgdmFyIHBhcmVudFN0YWNrID0gaGFzT3duU3RhY2tpbmcgPyBzdGFjay5nZXRQYXJlbnRTdGFjayh0aGlzKSA6IHN0YWNrLnBhcmVudC5zdGFjaztcbiAgICBwYXJlbnRTdGFjay5jb250ZXh0cy5wdXNoKHN0YWNrKTtcbiAgICBjb250YWluZXIuc3RhY2sgPSBzdGFjaztcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLmNyZWF0ZVN0YWNraW5nQ29udGV4dHMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm5vZGVzLmZvckVhY2goZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIGlmIChpc0VsZW1lbnQoY29udGFpbmVyKSAmJiAodGhpcy5pc1Jvb3RFbGVtZW50KGNvbnRhaW5lcikgfHwgaGFzT3BhY2l0eShjb250YWluZXIpIHx8IGlzUG9zaXRpb25lZEZvclN0YWNraW5nKGNvbnRhaW5lcikgfHwgdGhpcy5pc0JvZHlXaXRoVHJhbnNwYXJlbnRSb290KGNvbnRhaW5lcikgfHwgY29udGFpbmVyLmhhc1RyYW5zZm9ybSgpKSkge1xuICAgICAgICAgICAgdGhpcy5uZXdTdGFja2luZ0NvbnRleHQoY29udGFpbmVyLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0VsZW1lbnQoY29udGFpbmVyKSAmJiAoKGlzUG9zaXRpb25lZChjb250YWluZXIpICYmIHpJbmRleDAoY29udGFpbmVyKSkgfHwgaXNJbmxpbmVCbG9jayhjb250YWluZXIpIHx8IGlzRmxvYXRpbmcoY29udGFpbmVyKSkpIHtcbiAgICAgICAgICAgIHRoaXMubmV3U3RhY2tpbmdDb250ZXh0KGNvbnRhaW5lciwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLmFzc2lnblN0YWNrKGNvbnRhaW5lci5wYXJlbnQuc3RhY2spO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5pc0JvZHlXaXRoVHJhbnNwYXJlbnRSb290ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5ub2RlLm5vZGVOYW1lID09PSBcIkJPRFlcIiAmJiBjb250YWluZXIucGFyZW50LmNvbG9yKCdiYWNrZ3JvdW5kQ29sb3InKS5pc1RyYW5zcGFyZW50KCk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5pc1Jvb3RFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5wYXJlbnQgPT09IG51bGw7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5zb3J0U3RhY2tpbmdDb250ZXh0cyA9IGZ1bmN0aW9uKHN0YWNrKSB7XG4gICAgc3RhY2suY29udGV4dHMuc29ydCh6SW5kZXhTb3J0KHN0YWNrLmNvbnRleHRzLnNsaWNlKDApKSk7XG4gICAgc3RhY2suY29udGV4dHMuZm9yRWFjaCh0aGlzLnNvcnRTdGFja2luZ0NvbnRleHRzLCB0aGlzKTtcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhcnNlVGV4dEJvdW5kcyA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbih0ZXh0LCBpbmRleCwgdGV4dExpc3QpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5wYXJlbnQuY3NzKFwidGV4dERlY29yYXRpb25cIikuc3Vic3RyKDAsIDQpICE9PSBcIm5vbmVcIiB8fCB0ZXh0LnRyaW0oKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN1cHBvcnQucmFuZ2VCb3VuZHMgJiYgIWNvbnRhaW5lci5wYXJlbnQuaGFzVHJhbnNmb3JtKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGV4dExpc3Quc2xpY2UoMCwgaW5kZXgpLmpvaW4oXCJcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJhbmdlQm91bmRzKGNvbnRhaW5lci5ub2RlLCBvZmZzZXQsIHRleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGUgJiYgdHlwZW9mKGNvbnRhaW5lci5ub2RlLmRhdGEpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50Tm9kZSA9IGNvbnRhaW5lci5ub2RlLnNwbGl0VGV4dCh0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0V3JhcHBlckJvdW5kcyhjb250YWluZXIubm9kZSwgY29udGFpbmVyLnBhcmVudC5oYXNUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLm5vZGUgPSByZXBsYWNlbWVudE5vZGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvdW5kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKCF0aGlzLnN1cHBvcnQucmFuZ2VCb3VuZHMgfHwgY29udGFpbmVyLnBhcmVudC5oYXNUcmFuc2Zvcm0oKSl7XG4gICAgICAgICAgICBjb250YWluZXIubm9kZSA9IGNvbnRhaW5lci5ub2RlLnNwbGl0VGV4dCh0ZXh0Lmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH07XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5nZXRXcmFwcGVyQm91bmRzID0gZnVuY3Rpb24obm9kZSwgdHJhbnNmb3JtKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbDJjYW52YXN3cmFwcGVyJyk7XG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgYmFja3VwVGV4dCA9IG5vZGUuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZCh3cmFwcGVyLCBub2RlKTtcbiAgICB2YXIgYm91bmRzID0gdHJhbnNmb3JtID8gb2Zmc2V0Qm91bmRzKHdyYXBwZXIpIDogZ2V0Qm91bmRzKHdyYXBwZXIpO1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoYmFja3VwVGV4dCwgd3JhcHBlcik7XG4gICAgcmV0dXJuIGJvdW5kcztcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLmdldFJhbmdlQm91bmRzID0gZnVuY3Rpb24obm9kZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICB2YXIgcmFuZ2UgPSB0aGlzLnJhbmdlIHx8ICh0aGlzLnJhbmdlID0gbm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZVJhbmdlKCkpO1xuICAgIHJhbmdlLnNldFN0YXJ0KG5vZGUsIG9mZnNldCk7XG4gICAgcmFuZ2Uuc2V0RW5kKG5vZGUsIG9mZnNldCArIGxlbmd0aCk7XG4gICAgcmV0dXJuIHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xufTtcblxuZnVuY3Rpb24gQ2xlYXJUcmFuc2Zvcm0oKSB7fVxuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHN0YWNrKSB7XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvdmlzdXJlbi5odG1sI3otaW5kZXhcbiAgICB2YXIgbmVnYXRpdmVaaW5kZXggPSBzdGFjay5jb250ZXh0cy5maWx0ZXIobmVnYXRpdmVaSW5kZXgpOyAvLyAyLiB0aGUgY2hpbGQgc3RhY2tpbmcgY29udGV4dHMgd2l0aCBuZWdhdGl2ZSBzdGFjayBsZXZlbHMgKG1vc3QgbmVnYXRpdmUgZmlyc3QpLlxuICAgIHZhciBkZXNjZW5kYW50RWxlbWVudHMgPSBzdGFjay5jaGlsZHJlbi5maWx0ZXIoaXNFbGVtZW50KTtcbiAgICB2YXIgZGVzY2VuZGFudE5vbkZsb2F0cyA9IGRlc2NlbmRhbnRFbGVtZW50cy5maWx0ZXIobm90KGlzRmxvYXRpbmcpKTtcbiAgICB2YXIgbm9uSW5saW5lTm9uUG9zaXRpb25lZERlc2NlbmRhbnRzID0gZGVzY2VuZGFudE5vbkZsb2F0cy5maWx0ZXIobm90KGlzUG9zaXRpb25lZCkpLmZpbHRlcihub3QoaW5saW5lTGV2ZWwpKTsgLy8gMyB0aGUgaW4tZmxvdywgbm9uLWlubGluZS1sZXZlbCwgbm9uLXBvc2l0aW9uZWQgZGVzY2VuZGFudHMuXG4gICAgdmFyIG5vblBvc2l0aW9uZWRGbG9hdHMgPSBkZXNjZW5kYW50RWxlbWVudHMuZmlsdGVyKG5vdChpc1Bvc2l0aW9uZWQpKS5maWx0ZXIoaXNGbG9hdGluZyk7IC8vIDQuIHRoZSBub24tcG9zaXRpb25lZCBmbG9hdHMuXG4gICAgdmFyIGluRmxvdyA9IGRlc2NlbmRhbnROb25GbG9hdHMuZmlsdGVyKG5vdChpc1Bvc2l0aW9uZWQpKS5maWx0ZXIoaW5saW5lTGV2ZWwpOyAvLyA1LiB0aGUgaW4tZmxvdywgaW5saW5lLWxldmVsLCBub24tcG9zaXRpb25lZCBkZXNjZW5kYW50cywgaW5jbHVkaW5nIGlubGluZSB0YWJsZXMgYW5kIGlubGluZSBibG9ja3MuXG4gICAgdmFyIHN0YWNrTGV2ZWwwID0gc3RhY2suY29udGV4dHMuY29uY2F0KGRlc2NlbmRhbnROb25GbG9hdHMuZmlsdGVyKGlzUG9zaXRpb25lZCkpLmZpbHRlcih6SW5kZXgwKTsgLy8gNi4gdGhlIGNoaWxkIHN0YWNraW5nIGNvbnRleHRzIHdpdGggc3RhY2sgbGV2ZWwgMCBhbmQgdGhlIHBvc2l0aW9uZWQgZGVzY2VuZGFudHMgd2l0aCBzdGFjayBsZXZlbCAwLlxuICAgIHZhciB0ZXh0ID0gc3RhY2suY2hpbGRyZW4uZmlsdGVyKGlzVGV4dE5vZGUpLmZpbHRlcihoYXNUZXh0KTtcbiAgICB2YXIgcG9zaXRpdmVaaW5kZXggPSBzdGFjay5jb250ZXh0cy5maWx0ZXIocG9zaXRpdmVaSW5kZXgpOyAvLyA3LiB0aGUgY2hpbGQgc3RhY2tpbmcgY29udGV4dHMgd2l0aCBwb3NpdGl2ZSBzdGFjayBsZXZlbHMgKGxlYXN0IHBvc2l0aXZlIGZpcnN0KS5cbiAgICBuZWdhdGl2ZVppbmRleC5jb25jYXQobm9uSW5saW5lTm9uUG9zaXRpb25lZERlc2NlbmRhbnRzKS5jb25jYXQobm9uUG9zaXRpb25lZEZsb2F0cylcbiAgICAgICAgLmNvbmNhdChpbkZsb3cpLmNvbmNhdChzdGFja0xldmVsMCkuY29uY2F0KHRleHQpLmNvbmNhdChwb3NpdGl2ZVppbmRleCkuZm9yRWFjaChmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUXVldWUucHVzaChjb250YWluZXIpO1xuICAgICAgICAgICAgaWYgKGlzU3RhY2tpbmdDb250ZXh0KGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJRdWV1ZS5wdXNoKG5ldyBDbGVhclRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5wYWludCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBDbGVhclRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5jdHgucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVGV4dE5vZGUoY29udGFpbmVyKSkge1xuICAgICAgICAgICAgaWYgKGlzUHNldWRvRWxlbWVudChjb250YWluZXIucGFyZW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wYXJlbnQuYXBwZW5kVG9ET00oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFpbnRUZXh0KGNvbnRhaW5lcik7XG4gICAgICAgICAgICBpZiAoaXNQc2V1ZG9FbGVtZW50KGNvbnRhaW5lci5wYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnBhcmVudC5jbGVhbkRPTSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYWludE5vZGUoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsb2coZSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFpbnROb2RlID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgaWYgKGlzU3RhY2tpbmdDb250ZXh0KGNvbnRhaW5lcikpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRPcGFjaXR5KGNvbnRhaW5lci5vcGFjaXR5KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5jdHguc2F2ZSgpO1xuICAgICAgICBpZiAoY29udGFpbmVyLmhhc1RyYW5zZm9ybSgpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFRyYW5zZm9ybShjb250YWluZXIucGFyc2VUcmFuc2Zvcm0oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29udGFpbmVyLm5vZGUubm9kZU5hbWUgPT09IFwiSU5QVVRcIiAmJiBjb250YWluZXIubm9kZS50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgdGhpcy5wYWludENoZWNrYm94KGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZS5ub2RlTmFtZSA9PT0gXCJJTlBVVFwiICYmIGNvbnRhaW5lci5ub2RlLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICB0aGlzLnBhaW50UmFkaW8oY29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhaW50RWxlbWVudChjb250YWluZXIpO1xuICAgIH1cbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhaW50RWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHZhciBib3VuZHMgPSBjb250YWluZXIucGFyc2VCb3VuZHMoKTtcbiAgICB0aGlzLnJlbmRlcmVyLmNsaXAoY29udGFpbmVyLmJhY2tncm91bmRDbGlwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJCYWNrZ3JvdW5kKGNvbnRhaW5lciwgYm91bmRzLCBjb250YWluZXIuYm9yZGVycy5ib3JkZXJzLm1hcChnZXRXaWR0aCkpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5jbGlwKGNvbnRhaW5lci5jbGlwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJCb3JkZXJzKGNvbnRhaW5lci5ib3JkZXJzLmJvcmRlcnMpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5jbGlwKGNvbnRhaW5lci5iYWNrZ3JvdW5kQ2xpcCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHN3aXRjaCAoY29udGFpbmVyLm5vZGUubm9kZU5hbWUpIHtcbiAgICAgICAgY2FzZSBcInN2Z1wiOlxuICAgICAgICBjYXNlIFwiSUZSQU1FXCI6XG4gICAgICAgICAgICB2YXIgaW1nQ29udGFpbmVyID0gdGhpcy5pbWFnZXMuZ2V0KGNvbnRhaW5lci5ub2RlKTtcbiAgICAgICAgICAgIGlmIChpbWdDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckltYWdlKGNvbnRhaW5lciwgYm91bmRzLCBjb250YWluZXIuYm9yZGVycywgaW1nQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKFwiRXJyb3IgbG9hZGluZyA8XCIgKyBjb250YWluZXIubm9kZS5ub2RlTmFtZSArIFwiPlwiLCBjb250YWluZXIubm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIklNR1wiOlxuICAgICAgICAgICAgdmFyIGltYWdlQ29udGFpbmVyID0gdGhpcy5pbWFnZXMuZ2V0KGNvbnRhaW5lci5ub2RlLnNyYyk7XG4gICAgICAgICAgICBpZiAoaW1hZ2VDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckltYWdlKGNvbnRhaW5lciwgYm91bmRzLCBjb250YWluZXIuYm9yZGVycywgaW1hZ2VDb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2coXCJFcnJvciBsb2FkaW5nIDxpbWc+XCIsIGNvbnRhaW5lci5ub2RlLnNyYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkNBTlZBU1wiOlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJJbWFnZShjb250YWluZXIsIGJvdW5kcywgY29udGFpbmVyLmJvcmRlcnMsIHtpbWFnZTogY29udGFpbmVyLm5vZGV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiU0VMRUNUXCI6XG4gICAgICAgIGNhc2UgXCJJTlBVVFwiOlxuICAgICAgICBjYXNlIFwiVEVYVEFSRUFcIjpcbiAgICAgICAgICAgIHRoaXMucGFpbnRGb3JtVmFsdWUoY29udGFpbmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5wYWludENoZWNrYm94ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgdmFyIGIgPSBjb250YWluZXIucGFyc2VCb3VuZHMoKTtcblxuICAgIHZhciBzaXplID0gTWF0aC5taW4oYi53aWR0aCwgYi5oZWlnaHQpO1xuICAgIHZhciBib3VuZHMgPSB7d2lkdGg6IHNpemUgLSAxLCBoZWlnaHQ6IHNpemUgLSAxLCB0b3A6IGIudG9wLCBsZWZ0OiBiLmxlZnR9O1xuICAgIHZhciByID0gWzMsIDNdO1xuICAgIHZhciByYWRpdXMgPSBbciwgciwgciwgcl07XG4gICAgdmFyIGJvcmRlcnMgPSBbMSwxLDEsMV0ubWFwKGZ1bmN0aW9uKHcpIHtcbiAgICAgICAgcmV0dXJuIHtjb2xvcjogbmV3IENvbG9yKCcjQTVBNUE1JyksIHdpZHRoOiB3fTtcbiAgICB9KTtcblxuICAgIHZhciBib3JkZXJQb2ludHMgPSBjYWxjdWxhdGVDdXJ2ZVBvaW50cyhib3VuZHMsIHJhZGl1cywgYm9yZGVycyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmNsaXAoY29udGFpbmVyLmJhY2tncm91bmRDbGlwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZWN0YW5nbGUoYm91bmRzLmxlZnQgKyAxLCBib3VuZHMudG9wICsgMSwgYm91bmRzLndpZHRoIC0gMiwgYm91bmRzLmhlaWdodCAtIDIsIG5ldyBDb2xvcihcIiNERURFREVcIikpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckJvcmRlcnMoY2FsY3VsYXRlQm9yZGVycyhib3JkZXJzLCBib3VuZHMsIGJvcmRlclBvaW50cywgcmFkaXVzKSk7XG4gICAgICAgIGlmIChjb250YWluZXIubm9kZS5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmZvbnQobmV3IENvbG9yKCcjNDI0MjQyJyksICdub3JtYWwnLCAnbm9ybWFsJywgJ2JvbGQnLCAoc2l6ZSAtIDMpICsgXCJweFwiLCAnYXJpYWwnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIudGV4dChcIlxcdTI3MTRcIiwgYm91bmRzLmxlZnQgKyBzaXplIC8gNiwgYm91bmRzLnRvcCArIHNpemUgLSAxKTtcbiAgICAgICAgfVxuICAgIH0sIHRoaXMpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFpbnRSYWRpbyA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHZhciBib3VuZHMgPSBjb250YWluZXIucGFyc2VCb3VuZHMoKTtcblxuICAgIHZhciBzaXplID0gTWF0aC5taW4oYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KSAtIDI7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmNsaXAoY29udGFpbmVyLmJhY2tncm91bmRDbGlwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5jaXJjbGVTdHJva2UoYm91bmRzLmxlZnQgKyAxLCBib3VuZHMudG9wICsgMSwgc2l6ZSwgbmV3IENvbG9yKCcjREVERURFJyksIDEsIG5ldyBDb2xvcignI0E1QTVBNScpKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5ub2RlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY2lyY2xlKE1hdGguY2VpbChib3VuZHMubGVmdCArIHNpemUgLyA0KSArIDEsIE1hdGguY2VpbChib3VuZHMudG9wICsgc2l6ZSAvIDQpICsgMSwgTWF0aC5mbG9vcihzaXplIC8gMiksIG5ldyBDb2xvcignIzQyNDI0MicpKTtcbiAgICAgICAgfVxuICAgIH0sIHRoaXMpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFpbnRGb3JtVmFsdWUgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250YWluZXIuZ2V0VmFsdWUoKTtcbiAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZG9jdW1lbnQgPSBjb250YWluZXIubm9kZS5vd25lckRvY3VtZW50O1xuICAgICAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwyY2FudmFzd3JhcHBlcicpO1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IFsnbGluZUhlaWdodCcsICd0ZXh0QWxpZ24nLCAnZm9udEZhbWlseScsICdmb250V2VpZ2h0JywgJ2ZvbnRTaXplJywgJ2NvbG9yJyxcbiAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsICdwYWRkaW5nVG9wJywgJ3BhZGRpbmdSaWdodCcsICdwYWRkaW5nQm90dG9tJyxcbiAgICAgICAgICAgICd3aWR0aCcsICdoZWlnaHQnLCAnYm9yZGVyTGVmdFN0eWxlJywgJ2JvcmRlclRvcFN0eWxlJywgJ2JvcmRlckxlZnRXaWR0aCcsICdib3JkZXJUb3BXaWR0aCcsXG4gICAgICAgICAgICAnYm94U2l6aW5nJywgJ3doaXRlU3BhY2UnLCAnd29yZFdyYXAnXTtcblxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlci5zdHlsZVtwcm9wZXJ0eV0gPSBjb250YWluZXIuY3NzKHByb3BlcnR5KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIC8vIE9sZGVyIElFIGhhcyBpc3N1ZXMgd2l0aCBcImJvcmRlclwiXG4gICAgICAgICAgICAgICAgbG9nKFwiaHRtbDJjYW52YXM6IFBhcnNlOiBFeGNlcHRpb24gY2F1Z2h0IGluIHJlbmRlckZvcm1WYWx1ZTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGJvdW5kcyA9IGNvbnRhaW5lci5wYXJzZUJvdW5kcygpO1xuICAgICAgICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgICB3cmFwcGVyLnN0eWxlLmxlZnQgPSBib3VuZHMubGVmdCArIFwicHhcIjtcbiAgICAgICAgd3JhcHBlci5zdHlsZS50b3AgPSBib3VuZHMudG9wICsgXCJweFwiO1xuICAgICAgICB3cmFwcGVyLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gICAgICAgIHRoaXMucGFpbnRUZXh0KG5ldyBUZXh0Q29udGFpbmVyKHdyYXBwZXIuZmlyc3RDaGlsZCwgY29udGFpbmVyKSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQod3JhcHBlcik7XG4gICAgfVxufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFpbnRUZXh0ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLmFwcGx5VGV4dFRyYW5zZm9ybSgpO1xuICAgIHZhciBjaGFyYWN0ZXJzID0gcHVueWNvZGUudWNzMi5kZWNvZGUoY29udGFpbmVyLm5vZGUuZGF0YSk7XG4gICAgdmFyIHRleHRMaXN0ID0gKCF0aGlzLm9wdGlvbnMubGV0dGVyUmVuZGVyaW5nIHx8IG5vTGV0dGVyU3BhY2luZyhjb250YWluZXIpKSAmJiAhaGFzVW5pY29kZShjb250YWluZXIubm9kZS5kYXRhKSA/IGdldFdvcmRzKGNoYXJhY3RlcnMpIDogY2hhcmFjdGVycy5tYXAoZnVuY3Rpb24oY2hhcmFjdGVyKSB7XG4gICAgICAgIHJldHVybiBwdW55Y29kZS51Y3MyLmVuY29kZShbY2hhcmFjdGVyXSk7XG4gICAgfSk7XG5cbiAgICB2YXIgd2VpZ2h0ID0gY29udGFpbmVyLnBhcmVudC5mb250V2VpZ2h0KCk7XG4gICAgdmFyIHNpemUgPSBjb250YWluZXIucGFyZW50LmNzcygnZm9udFNpemUnKTtcbiAgICB2YXIgZmFtaWx5ID0gY29udGFpbmVyLnBhcmVudC5jc3MoJ2ZvbnRGYW1pbHknKTtcbiAgICB2YXIgc2hhZG93cyA9IGNvbnRhaW5lci5wYXJlbnQucGFyc2VUZXh0U2hhZG93cygpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5mb250KGNvbnRhaW5lci5wYXJlbnQuY29sb3IoJ2NvbG9yJyksIGNvbnRhaW5lci5wYXJlbnQuY3NzKCdmb250U3R5bGUnKSwgY29udGFpbmVyLnBhcmVudC5jc3MoJ2ZvbnRWYXJpYW50JyksIHdlaWdodCwgc2l6ZSwgZmFtaWx5KTtcbiAgICBpZiAoc2hhZG93cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBtdWx0aXBsZSB0ZXh0IHNoYWRvd3NcbiAgICAgICAgdGhpcy5yZW5kZXJlci5mb250U2hhZG93KHNoYWRvd3NbMF0uY29sb3IsIHNoYWRvd3NbMF0ub2Zmc2V0WCwgc2hhZG93c1swXS5vZmZzZXRZLCBzaGFkb3dzWzBdLmJsdXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuY2xlYXJTaGFkb3coKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLmNsaXAoY29udGFpbmVyLnBhcmVudC5jbGlwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGV4dExpc3QubWFwKHRoaXMucGFyc2VUZXh0Qm91bmRzKGNvbnRhaW5lciksIHRoaXMpLmZvckVhY2goZnVuY3Rpb24oYm91bmRzLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGJvdW5kcykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIudGV4dCh0ZXh0TGlzdFtpbmRleF0sIGJvdW5kcy5sZWZ0LCBib3VuZHMuYm90dG9tKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRleHREZWNvcmF0aW9uKGNvbnRhaW5lci5wYXJlbnQsIGJvdW5kcywgdGhpcy5mb250TWV0cmljcy5nZXRNZXRyaWNzKGZhbWlseSwgc2l6ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnJlbmRlclRleHREZWNvcmF0aW9uID0gZnVuY3Rpb24oY29udGFpbmVyLCBib3VuZHMsIG1ldHJpY3MpIHtcbiAgICBzd2l0Y2goY29udGFpbmVyLmNzcyhcInRleHREZWNvcmF0aW9uXCIpLnNwbGl0KFwiIFwiKVswXSkge1xuICAgIGNhc2UgXCJ1bmRlcmxpbmVcIjpcbiAgICAgICAgLy8gRHJhd3MgYSBsaW5lIGF0IHRoZSBiYXNlbGluZSBvZiB0aGUgZm9udFxuICAgICAgICAvLyBUT0RPIEFzIHNvbWUgYnJvd3NlcnMgZGlzcGxheSB0aGUgbGluZSBhcyBtb3JlIHRoYW4gMXB4IGlmIHRoZSBmb250LXNpemUgaXMgYmlnLCBuZWVkIHRvIHRha2UgdGhhdCBpbnRvIGFjY291bnQgYm90aCBpbiBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlY3RhbmdsZShib3VuZHMubGVmdCwgTWF0aC5yb3VuZChib3VuZHMudG9wICsgbWV0cmljcy5iYXNlbGluZSArIG1ldHJpY3MubGluZVdpZHRoKSwgYm91bmRzLndpZHRoLCAxLCBjb250YWluZXIuY29sb3IoXCJjb2xvclwiKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJvdmVybGluZVwiOlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlY3RhbmdsZShib3VuZHMubGVmdCwgTWF0aC5yb3VuZChib3VuZHMudG9wKSwgYm91bmRzLndpZHRoLCAxLCBjb250YWluZXIuY29sb3IoXCJjb2xvclwiKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJsaW5lLXRocm91Z2hcIjpcbiAgICAgICAgLy8gVE9ETyB0cnkgYW5kIGZpbmQgZXhhY3QgcG9zaXRpb24gZm9yIGxpbmUtdGhyb3VnaFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlY3RhbmdsZShib3VuZHMubGVmdCwgTWF0aC5jZWlsKGJvdW5kcy50b3AgKyBtZXRyaWNzLm1pZGRsZSArIG1ldHJpY3MubGluZVdpZHRoKSwgYm91bmRzLndpZHRoLCAxLCBjb250YWluZXIuY29sb3IoXCJjb2xvclwiKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbnZhciBib3JkZXJDb2xvclRyYW5zZm9ybXMgPSB7XG4gICAgaW5zZXQ6IFtcbiAgICAgICAgW1wiZGFya2VuXCIsIDAuNjBdLFxuICAgICAgICBbXCJkYXJrZW5cIiwgMC4xMF0sXG4gICAgICAgIFtcImRhcmtlblwiLCAwLjEwXSxcbiAgICAgICAgW1wiZGFya2VuXCIsIDAuNjBdXG4gICAgXVxufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFyc2VCb3JkZXJzID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgdmFyIG5vZGVCb3VuZHMgPSBjb250YWluZXIucGFyc2VCb3VuZHMoKTtcbiAgICB2YXIgcmFkaXVzID0gZ2V0Qm9yZGVyUmFkaXVzRGF0YShjb250YWluZXIpO1xuICAgIHZhciBib3JkZXJzID0gW1wiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCJdLm1hcChmdW5jdGlvbihzaWRlLCBpbmRleCkge1xuICAgICAgICB2YXIgc3R5bGUgPSBjb250YWluZXIuY3NzKCdib3JkZXInICsgc2lkZSArICdTdHlsZScpO1xuICAgICAgICB2YXIgY29sb3IgPSBjb250YWluZXIuY29sb3IoJ2JvcmRlcicgKyBzaWRlICsgJ0NvbG9yJyk7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gXCJpbnNldFwiICYmIGNvbG9yLmlzQmxhY2soKSkge1xuICAgICAgICAgICAgY29sb3IgPSBuZXcgQ29sb3IoWzI1NSwgMjU1LCAyNTUsIGNvbG9yLmFdKTsgLy8gdGhpcyBpcyB3cm9uZywgYnV0XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbG9yVHJhbnNmb3JtID0gYm9yZGVyQ29sb3JUcmFuc2Zvcm1zW3N0eWxlXSA/IGJvcmRlckNvbG9yVHJhbnNmb3Jtc1tzdHlsZV1baW5kZXhdIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBjb250YWluZXIuY3NzSW50KCdib3JkZXInICsgc2lkZSArICdXaWR0aCcpLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yVHJhbnNmb3JtID8gY29sb3JbY29sb3JUcmFuc2Zvcm1bMF1dKGNvbG9yVHJhbnNmb3JtWzFdKSA6IGNvbG9yLFxuICAgICAgICAgICAgYXJnczogbnVsbFxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHZhciBib3JkZXJQb2ludHMgPSBjYWxjdWxhdGVDdXJ2ZVBvaW50cyhub2RlQm91bmRzLCByYWRpdXMsIGJvcmRlcnMpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xpcDogdGhpcy5wYXJzZUJhY2tncm91bmRDbGlwKGNvbnRhaW5lciwgYm9yZGVyUG9pbnRzLCBib3JkZXJzLCByYWRpdXMsIG5vZGVCb3VuZHMpLFxuICAgICAgICBib3JkZXJzOiBjYWxjdWxhdGVCb3JkZXJzKGJvcmRlcnMsIG5vZGVCb3VuZHMsIGJvcmRlclBvaW50cywgcmFkaXVzKVxuICAgIH07XG59O1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVCb3JkZXJzKGJvcmRlcnMsIG5vZGVCb3VuZHMsIGJvcmRlclBvaW50cywgcmFkaXVzKSB7XG4gICAgcmV0dXJuIGJvcmRlcnMubWFwKGZ1bmN0aW9uKGJvcmRlciwgYm9yZGVyU2lkZSkge1xuICAgICAgICBpZiAoYm9yZGVyLndpZHRoID4gMCkge1xuICAgICAgICAgICAgdmFyIGJ4ID0gbm9kZUJvdW5kcy5sZWZ0O1xuICAgICAgICAgICAgdmFyIGJ5ID0gbm9kZUJvdW5kcy50b3A7XG4gICAgICAgICAgICB2YXIgYncgPSBub2RlQm91bmRzLndpZHRoO1xuICAgICAgICAgICAgdmFyIGJoID0gbm9kZUJvdW5kcy5oZWlnaHQgLSAoYm9yZGVyc1syXS53aWR0aCk7XG5cbiAgICAgICAgICAgIHN3aXRjaChib3JkZXJTaWRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgLy8gdG9wIGJvcmRlclxuICAgICAgICAgICAgICAgIGJoID0gYm9yZGVyc1swXS53aWR0aDtcbiAgICAgICAgICAgICAgICBib3JkZXIuYXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMxOiBbYngsIGJ5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGMyOiBbYnggKyBidywgYnldLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzM6IFtieCArIGJ3IC0gYm9yZGVyc1sxXS53aWR0aCwgYnkgKyBiaF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjNDogW2J4ICsgYm9yZGVyc1szXS53aWR0aCwgYnkgKyBiaF1cbiAgICAgICAgICAgICAgICAgICAgfSwgcmFkaXVzWzBdLCByYWRpdXNbMV0sXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRJbm5lcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgLy8gcmlnaHQgYm9yZGVyXG4gICAgICAgICAgICAgICAgYnggPSBub2RlQm91bmRzLmxlZnQgKyBub2RlQm91bmRzLndpZHRoIC0gKGJvcmRlcnNbMV0ud2lkdGgpO1xuICAgICAgICAgICAgICAgIGJ3ID0gYm9yZGVyc1sxXS53aWR0aDtcblxuICAgICAgICAgICAgICAgIGJvcmRlci5hcmdzID0gZHJhd1NpZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYzE6IFtieCArIGJ3LCBieV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjMjogW2J4ICsgYncsIGJ5ICsgYmggKyBib3JkZXJzWzJdLndpZHRoXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGMzOiBbYngsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzQ6IFtieCwgYnkgKyBib3JkZXJzWzBdLndpZHRoXVxuICAgICAgICAgICAgICAgICAgICB9LCByYWRpdXNbMV0sIHJhZGl1c1syXSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0SW5uZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBib3JkZXJcbiAgICAgICAgICAgICAgICBieSA9IChieSArIG5vZGVCb3VuZHMuaGVpZ2h0KSAtIChib3JkZXJzWzJdLndpZHRoKTtcbiAgICAgICAgICAgICAgICBiaCA9IGJvcmRlcnNbMl0ud2lkdGg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjMTogW2J4ICsgYncsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzI6IFtieCwgYnkgKyBiaF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjMzogW2J4ICsgYm9yZGVyc1szXS53aWR0aCwgYnldLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzQ6IFtieCArIGJ3IC0gYm9yZGVyc1szXS53aWR0aCwgYnldXG4gICAgICAgICAgICAgICAgICAgIH0sIHJhZGl1c1syXSwgcmFkaXVzWzNdLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0SW5uZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0SW5uZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIC8vIGxlZnQgYm9yZGVyXG4gICAgICAgICAgICAgICAgYncgPSBib3JkZXJzWzNdLndpZHRoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5hcmdzID0gZHJhd1NpZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYzE6IFtieCwgYnkgKyBiaCArIGJvcmRlcnNbMl0ud2lkdGhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzI6IFtieCwgYnldLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzM6IFtieCArIGJ3LCBieSArIGJvcmRlcnNbMF0ud2lkdGhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzQ6IFtieCArIGJ3LCBieSArIGJoXVxuICAgICAgICAgICAgICAgICAgICB9LCByYWRpdXNbM10sIHJhZGl1c1swXSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvcmRlcjtcbiAgICB9KTtcbn1cblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFyc2VCYWNrZ3JvdW5kQ2xpcCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYm9yZGVyUG9pbnRzLCBib3JkZXJzLCByYWRpdXMsIGJvdW5kcykge1xuICAgIHZhciBiYWNrZ3JvdW5kQ2xpcCA9IGNvbnRhaW5lci5jc3MoJ2JhY2tncm91bmRDbGlwJyksXG4gICAgICAgIGJvcmRlckFyZ3MgPSBbXTtcblxuICAgIHN3aXRjaChiYWNrZ3JvdW5kQ2xpcCkge1xuICAgIGNhc2UgXCJjb250ZW50LWJveFwiOlxuICAgIGNhc2UgXCJwYWRkaW5nLWJveFwiOlxuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMF0sIHJhZGl1c1sxXSwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIsIGJvdW5kcy5sZWZ0ICsgYm9yZGVyc1szXS53aWR0aCwgYm91bmRzLnRvcCArIGJvcmRlcnNbMF0ud2lkdGgpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMV0sIHJhZGl1c1syXSwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAtIGJvcmRlcnNbMV0ud2lkdGgsIGJvdW5kcy50b3AgKyBib3JkZXJzWzBdLndpZHRoKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzJdLCByYWRpdXNbM10sIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAtIGJvcmRlcnNbMV0ud2lkdGgsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0IC0gYm9yZGVyc1syXS53aWR0aCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1szXSwgcmFkaXVzWzBdLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyLCBib3JkZXJQb2ludHMudG9wTGVmdElubmVyLCBib3VuZHMubGVmdCArIGJvcmRlcnNbM10ud2lkdGgsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0IC0gYm9yZGVyc1syXS53aWR0aCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzBdLCByYWRpdXNbMV0sIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3VuZHMubGVmdCwgYm91bmRzLnRvcCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1sxXSwgcmFkaXVzWzJdLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoLCBib3VuZHMudG9wKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzJdLCByYWRpdXNbM10sIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbM10sIHJhZGl1c1swXSwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm91bmRzLmxlZnQsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvcmRlckFyZ3M7XG59O1xuXG5mdW5jdGlvbiBnZXRDdXJ2ZVBvaW50cyh4LCB5LCByMSwgcjIpIHtcbiAgICB2YXIga2FwcGEgPSA0ICogKChNYXRoLnNxcnQoMikgLSAxKSAvIDMpO1xuICAgIHZhciBveCA9IChyMSkgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgaG9yaXpvbnRhbFxuICAgICAgICBveSA9IChyMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcbiAgICAgICAgeG0gPSB4ICsgcjEsIC8vIHgtbWlkZGxlXG4gICAgICAgIHltID0geSArIHIyOyAvLyB5LW1pZGRsZVxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcExlZnQ6IGJlemllckN1cnZlKHt4OiB4LCB5OiB5bX0sIHt4OiB4LCB5OiB5bSAtIG95fSwge3g6IHhtIC0gb3gsIHk6IHl9LCB7eDogeG0sIHk6IHl9KSxcbiAgICAgICAgdG9wUmlnaHQ6IGJlemllckN1cnZlKHt4OiB4LCB5OiB5fSwge3g6IHggKyBveCx5OiB5fSwge3g6IHhtLCB5OiB5bSAtIG95fSwge3g6IHhtLCB5OiB5bX0pLFxuICAgICAgICBib3R0b21SaWdodDogYmV6aWVyQ3VydmUoe3g6IHhtLCB5OiB5fSwge3g6IHhtLCB5OiB5ICsgb3l9LCB7eDogeCArIG94LCB5OiB5bX0sIHt4OiB4LCB5OiB5bX0pLFxuICAgICAgICBib3R0b21MZWZ0OiBiZXppZXJDdXJ2ZSh7eDogeG0sIHk6IHltfSwge3g6IHhtIC0gb3gsIHk6IHltfSwge3g6IHgsIHk6IHkgKyBveX0sIHt4OiB4LCB5Onl9KVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUN1cnZlUG9pbnRzKGJvdW5kcywgYm9yZGVyUmFkaXVzLCBib3JkZXJzKSB7XG4gICAgdmFyIHggPSBib3VuZHMubGVmdCxcbiAgICAgICAgeSA9IGJvdW5kcy50b3AsXG4gICAgICAgIHdpZHRoID0gYm91bmRzLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBib3VuZHMuaGVpZ2h0LFxuXG4gICAgICAgIHRsaCA9IGJvcmRlclJhZGl1c1swXVswXSA8IHdpZHRoIC8gMiA/IGJvcmRlclJhZGl1c1swXVswXSA6IHdpZHRoIC8gMixcbiAgICAgICAgdGx2ID0gYm9yZGVyUmFkaXVzWzBdWzFdIDwgaGVpZ2h0IC8gMiA/IGJvcmRlclJhZGl1c1swXVsxXSA6IGhlaWdodCAvIDIsXG4gICAgICAgIHRyaCA9IGJvcmRlclJhZGl1c1sxXVswXSA8IHdpZHRoIC8gMiA/IGJvcmRlclJhZGl1c1sxXVswXSA6IHdpZHRoIC8gMixcbiAgICAgICAgdHJ2ID0gYm9yZGVyUmFkaXVzWzFdWzFdIDwgaGVpZ2h0IC8gMiA/IGJvcmRlclJhZGl1c1sxXVsxXSA6IGhlaWdodCAvIDIsXG4gICAgICAgIGJyaCA9IGJvcmRlclJhZGl1c1syXVswXSA8IHdpZHRoIC8gMiA/IGJvcmRlclJhZGl1c1syXVswXSA6IHdpZHRoIC8gMixcbiAgICAgICAgYnJ2ID0gYm9yZGVyUmFkaXVzWzJdWzFdIDwgaGVpZ2h0IC8gMiA/IGJvcmRlclJhZGl1c1syXVsxXSA6IGhlaWdodCAvIDIsXG4gICAgICAgIGJsaCA9IGJvcmRlclJhZGl1c1szXVswXSA8IHdpZHRoIC8gMiA/IGJvcmRlclJhZGl1c1szXVswXSA6IHdpZHRoIC8gMixcbiAgICAgICAgYmx2ID0gYm9yZGVyUmFkaXVzWzNdWzFdIDwgaGVpZ2h0IC8gMiA/IGJvcmRlclJhZGl1c1szXVsxXSA6IGhlaWdodCAvIDI7XG5cbiAgICB2YXIgdG9wV2lkdGggPSB3aWR0aCAtIHRyaCxcbiAgICAgICAgcmlnaHRIZWlnaHQgPSBoZWlnaHQgLSBicnYsXG4gICAgICAgIGJvdHRvbVdpZHRoID0gd2lkdGggLSBicmgsXG4gICAgICAgIGxlZnRIZWlnaHQgPSBoZWlnaHQgLSBibHY7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3BMZWZ0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKHgsIHksIHRsaCwgdGx2KS50b3BMZWZ0LnN1YmRpdmlkZSgwLjUpLFxuICAgICAgICB0b3BMZWZ0SW5uZXI6IGdldEN1cnZlUG9pbnRzKHggKyBib3JkZXJzWzNdLndpZHRoLCB5ICsgYm9yZGVyc1swXS53aWR0aCwgTWF0aC5tYXgoMCwgdGxoIC0gYm9yZGVyc1szXS53aWR0aCksIE1hdGgubWF4KDAsIHRsdiAtIGJvcmRlcnNbMF0ud2lkdGgpKS50b3BMZWZ0LnN1YmRpdmlkZSgwLjUpLFxuICAgICAgICB0b3BSaWdodE91dGVyOiBnZXRDdXJ2ZVBvaW50cyh4ICsgdG9wV2lkdGgsIHksIHRyaCwgdHJ2KS50b3BSaWdodC5zdWJkaXZpZGUoMC41KSxcbiAgICAgICAgdG9wUmlnaHRJbm5lcjogZ2V0Q3VydmVQb2ludHMoeCArIE1hdGgubWluKHRvcFdpZHRoLCB3aWR0aCArIGJvcmRlcnNbM10ud2lkdGgpLCB5ICsgYm9yZGVyc1swXS53aWR0aCwgKHRvcFdpZHRoID4gd2lkdGggKyBib3JkZXJzWzNdLndpZHRoKSA/IDAgOnRyaCAtIGJvcmRlcnNbM10ud2lkdGgsIHRydiAtIGJvcmRlcnNbMF0ud2lkdGgpLnRvcFJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuICAgICAgICBib3R0b21SaWdodE91dGVyOiBnZXRDdXJ2ZVBvaW50cyh4ICsgYm90dG9tV2lkdGgsIHkgKyByaWdodEhlaWdodCwgYnJoLCBicnYpLmJvdHRvbVJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuICAgICAgICBib3R0b21SaWdodElubmVyOiBnZXRDdXJ2ZVBvaW50cyh4ICsgTWF0aC5taW4oYm90dG9tV2lkdGgsIHdpZHRoIC0gYm9yZGVyc1szXS53aWR0aCksIHkgKyBNYXRoLm1pbihyaWdodEhlaWdodCwgaGVpZ2h0ICsgYm9yZGVyc1swXS53aWR0aCksIE1hdGgubWF4KDAsIGJyaCAtIGJvcmRlcnNbMV0ud2lkdGgpLCAgYnJ2IC0gYm9yZGVyc1syXS53aWR0aCkuYm90dG9tUmlnaHQuc3ViZGl2aWRlKDAuNSksXG4gICAgICAgIGJvdHRvbUxlZnRPdXRlcjogZ2V0Q3VydmVQb2ludHMoeCwgeSArIGxlZnRIZWlnaHQsIGJsaCwgYmx2KS5ib3R0b21MZWZ0LnN1YmRpdmlkZSgwLjUpLFxuICAgICAgICBib3R0b21MZWZ0SW5uZXI6IGdldEN1cnZlUG9pbnRzKHggKyBib3JkZXJzWzNdLndpZHRoLCB5ICsgbGVmdEhlaWdodCwgTWF0aC5tYXgoMCwgYmxoIC0gYm9yZGVyc1szXS53aWR0aCksIGJsdiAtIGJvcmRlcnNbMl0ud2lkdGgpLmJvdHRvbUxlZnQuc3ViZGl2aWRlKDAuNSlcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBiZXppZXJDdXJ2ZShzdGFydCwgc3RhcnRDb250cm9sLCBlbmRDb250cm9sLCBlbmQpIHtcbiAgICB2YXIgbGVycCA9IGZ1bmN0aW9uIChhLCBiLCB0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBhLnggKyAoYi54IC0gYS54KSAqIHQsXG4gICAgICAgICAgICB5OiBhLnkgKyAoYi55IC0gYS55KSAqIHRcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBzdGFydENvbnRyb2w6IHN0YXJ0Q29udHJvbCxcbiAgICAgICAgZW5kQ29udHJvbDogZW5kQ29udHJvbCxcbiAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgIHN1YmRpdmlkZTogZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgdmFyIGFiID0gbGVycChzdGFydCwgc3RhcnRDb250cm9sLCB0KSxcbiAgICAgICAgICAgICAgICBiYyA9IGxlcnAoc3RhcnRDb250cm9sLCBlbmRDb250cm9sLCB0KSxcbiAgICAgICAgICAgICAgICBjZCA9IGxlcnAoZW5kQ29udHJvbCwgZW5kLCB0KSxcbiAgICAgICAgICAgICAgICBhYmJjID0gbGVycChhYiwgYmMsIHQpLFxuICAgICAgICAgICAgICAgIGJjY2QgPSBsZXJwKGJjLCBjZCwgdCksXG4gICAgICAgICAgICAgICAgZGVzdCA9IGxlcnAoYWJiYywgYmNjZCwgdCk7XG4gICAgICAgICAgICByZXR1cm4gW2JlemllckN1cnZlKHN0YXJ0LCBhYiwgYWJiYywgZGVzdCksIGJlemllckN1cnZlKGRlc3QsIGJjY2QsIGNkLCBlbmQpXTtcbiAgICAgICAgfSxcbiAgICAgICAgY3VydmVUbzogZnVuY3Rpb24oYm9yZGVyQXJncykge1xuICAgICAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImJlemllckN1cnZlXCIsIHN0YXJ0Q29udHJvbC54LCBzdGFydENvbnRyb2wueSwgZW5kQ29udHJvbC54LCBlbmRDb250cm9sLnksIGVuZC54LCBlbmQueV0pO1xuICAgICAgICB9LFxuICAgICAgICBjdXJ2ZVRvUmV2ZXJzZWQ6IGZ1bmN0aW9uKGJvcmRlckFyZ3MpIHtcbiAgICAgICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJiZXppZXJDdXJ2ZVwiLCBlbmRDb250cm9sLngsIGVuZENvbnRyb2wueSwgc3RhcnRDb250cm9sLngsIHN0YXJ0Q29udHJvbC55LCBzdGFydC54LCBzdGFydC55XSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkcmF3U2lkZShib3JkZXJEYXRhLCByYWRpdXMxLCByYWRpdXMyLCBvdXRlcjEsIGlubmVyMSwgb3V0ZXIyLCBpbm5lcjIpIHtcbiAgICB2YXIgYm9yZGVyQXJncyA9IFtdO1xuXG4gICAgaWYgKHJhZGl1czFbMF0gPiAwIHx8IHJhZGl1czFbMV0gPiAwKSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIG91dGVyMVsxXS5zdGFydC54LCBvdXRlcjFbMV0uc3RhcnQueV0pO1xuICAgICAgICBvdXRlcjFbMV0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goWyBcImxpbmVcIiwgYm9yZGVyRGF0YS5jMVswXSwgYm9yZGVyRGF0YS5jMVsxXV0pO1xuICAgIH1cblxuICAgIGlmIChyYWRpdXMyWzBdID4gMCB8fCByYWRpdXMyWzFdID4gMCkge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBvdXRlcjJbMF0uc3RhcnQueCwgb3V0ZXIyWzBdLnN0YXJ0LnldKTtcbiAgICAgICAgb3V0ZXIyWzBdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGlubmVyMlswXS5lbmQueCwgaW5uZXIyWzBdLmVuZC55XSk7XG4gICAgICAgIGlubmVyMlswXS5jdXJ2ZVRvUmV2ZXJzZWQoYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgYm9yZGVyRGF0YS5jMlswXSwgYm9yZGVyRGF0YS5jMlsxXV0pO1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBib3JkZXJEYXRhLmMzWzBdLCBib3JkZXJEYXRhLmMzWzFdXSk7XG4gICAgfVxuXG4gICAgaWYgKHJhZGl1czFbMF0gPiAwIHx8IHJhZGl1czFbMV0gPiAwKSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGlubmVyMVsxXS5lbmQueCwgaW5uZXIxWzFdLmVuZC55XSk7XG4gICAgICAgIGlubmVyMVsxXS5jdXJ2ZVRvUmV2ZXJzZWQoYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgYm9yZGVyRGF0YS5jNFswXSwgYm9yZGVyRGF0YS5jNFsxXV0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3JkZXJBcmdzO1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXMxLCByYWRpdXMyLCBjb3JuZXIxLCBjb3JuZXIyLCB4LCB5KSB7XG4gICAgaWYgKHJhZGl1czFbMF0gPiAwIHx8IHJhZGl1czFbMV0gPiAwKSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGNvcm5lcjFbMF0uc3RhcnQueCwgY29ybmVyMVswXS5zdGFydC55XSk7XG4gICAgICAgIGNvcm5lcjFbMF0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICAgICAgY29ybmVyMVsxXS5jdXJ2ZVRvKGJvcmRlckFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIHgsIHldKTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzMlswXSA+IDAgfHwgcmFkaXVzMlsxXSA+IDApIHtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgY29ybmVyMlswXS5zdGFydC54LCBjb3JuZXIyWzBdLnN0YXJ0LnldKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5lZ2F0aXZlWkluZGV4KGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIuY3NzSW50KFwiekluZGV4XCIpIDwgMDtcbn1cblxuZnVuY3Rpb24gcG9zaXRpdmVaSW5kZXgoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5jc3NJbnQoXCJ6SW5kZXhcIikgPiAwO1xufVxuXG5mdW5jdGlvbiB6SW5kZXgwKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIuY3NzSW50KFwiekluZGV4XCIpID09PSAwO1xufVxuXG5mdW5jdGlvbiBpbmxpbmVMZXZlbChjb250YWluZXIpIHtcbiAgICByZXR1cm4gW1wiaW5saW5lXCIsIFwiaW5saW5lLWJsb2NrXCIsIFwiaW5saW5lLXRhYmxlXCJdLmluZGV4T2YoY29udGFpbmVyLmNzcyhcImRpc3BsYXlcIikpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gaXNTdGFja2luZ0NvbnRleHQoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIChjb250YWluZXIgaW5zdGFuY2VvZiBTdGFja2luZ0NvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBoYXNUZXh0KGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIubm9kZS5kYXRhLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG5mdW5jdGlvbiBub0xldHRlclNwYWNpbmcoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuICgvXihub3JtYWx8bm9uZXwwcHgpJC8udGVzdChjb250YWluZXIucGFyZW50LmNzcyhcImxldHRlclNwYWNpbmdcIikpKTtcbn1cblxuZnVuY3Rpb24gZ2V0Qm9yZGVyUmFkaXVzRGF0YShjb250YWluZXIpIHtcbiAgICByZXR1cm4gW1wiVG9wTGVmdFwiLCBcIlRvcFJpZ2h0XCIsIFwiQm90dG9tUmlnaHRcIiwgXCJCb3R0b21MZWZ0XCJdLm1hcChmdW5jdGlvbihzaWRlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGNvbnRhaW5lci5jc3MoJ2JvcmRlcicgKyBzaWRlICsgJ1JhZGl1cycpO1xuICAgICAgICB2YXIgYXJyID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICBpZiAoYXJyLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBhcnJbMV0gPSBhcnJbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyci5tYXAoYXNJbnQpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJhYmxlTm9kZShub2RlKSB7XG4gICAgcmV0dXJuIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSB8fCBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSk7XG59XG5cbmZ1bmN0aW9uIGlzUG9zaXRpb25lZEZvclN0YWNraW5nKGNvbnRhaW5lcikge1xuICAgIHZhciBwb3NpdGlvbiA9IGNvbnRhaW5lci5jc3MoXCJwb3NpdGlvblwiKTtcbiAgICB2YXIgekluZGV4ID0gKFtcImFic29sdXRlXCIsIFwicmVsYXRpdmVcIiwgXCJmaXhlZFwiXS5pbmRleE9mKHBvc2l0aW9uKSAhPT0gLTEpID8gY29udGFpbmVyLmNzcyhcInpJbmRleFwiKSA6IFwiYXV0b1wiO1xuICAgIHJldHVybiB6SW5kZXggIT09IFwiYXV0b1wiO1xufVxuXG5mdW5jdGlvbiBpc1Bvc2l0aW9uZWQoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5jc3MoXCJwb3NpdGlvblwiKSAhPT0gXCJzdGF0aWNcIjtcbn1cblxuZnVuY3Rpb24gaXNGbG9hdGluZyhjb250YWluZXIpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmNzcyhcImZsb2F0XCIpICE9PSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gaXNJbmxpbmVCbG9jayhjb250YWluZXIpIHtcbiAgICByZXR1cm4gW1wiaW5saW5lLWJsb2NrXCIsIFwiaW5saW5lLXRhYmxlXCJdLmluZGV4T2YoY29udGFpbmVyLmNzcyhcImRpc3BsYXlcIikpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbm90KGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICFjYWxsYmFjay5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudChjb250YWluZXIpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLm5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFO1xufVxuXG5mdW5jdGlvbiBpc1BzZXVkb0VsZW1lbnQoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5pc1BzZXVkb0VsZW1lbnQgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzVGV4dE5vZGUoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5ub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERTtcbn1cblxuZnVuY3Rpb24gekluZGV4U29ydChjb250ZXh0cykge1xuICAgIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYS5jc3NJbnQoXCJ6SW5kZXhcIikgKyAoY29udGV4dHMuaW5kZXhPZihhKSAvIGNvbnRleHRzLmxlbmd0aCkpIC0gKGIuY3NzSW50KFwiekluZGV4XCIpICsgKGNvbnRleHRzLmluZGV4T2YoYikgLyBjb250ZXh0cy5sZW5ndGgpKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoYXNPcGFjaXR5KGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0T3BhY2l0eSgpIDwgMTtcbn1cblxuZnVuY3Rpb24gYXNJbnQodmFsdWUpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGgoYm9yZGVyKSB7XG4gICAgcmV0dXJuIGJvcmRlci53aWR0aDtcbn1cblxuZnVuY3Rpb24gbm9uSWdub3JlZEVsZW1lbnQobm9kZUNvbnRhaW5lcikge1xuICAgIHJldHVybiAobm9kZUNvbnRhaW5lci5ub2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSB8fCBbXCJTQ1JJUFRcIiwgXCJIRUFEXCIsIFwiVElUTEVcIiwgXCJPQkpFQ1RcIiwgXCJCUlwiLCBcIk9QVElPTlwiXS5pbmRleE9mKG5vZGVDb250YWluZXIubm9kZS5ub2RlTmFtZSkgPT09IC0xKTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbihhcnJheXMpIHtcbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xufVxuXG5mdW5jdGlvbiBzdHJpcFF1b3Rlcyhjb250ZW50KSB7XG4gICAgdmFyIGZpcnN0ID0gY29udGVudC5zdWJzdHIoMCwgMSk7XG4gICAgcmV0dXJuIChmaXJzdCA9PT0gY29udGVudC5zdWJzdHIoY29udGVudC5sZW5ndGggLSAxKSAmJiBmaXJzdC5tYXRjaCgvJ3xcIi8pKSA/IGNvbnRlbnQuc3Vic3RyKDEsIGNvbnRlbnQubGVuZ3RoIC0gMikgOiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiBnZXRXb3JkcyhjaGFyYWN0ZXJzKSB7XG4gICAgdmFyIHdvcmRzID0gW10sIGkgPSAwLCBvbldvcmRCb3VuZGFyeSA9IGZhbHNlLCB3b3JkO1xuICAgIHdoaWxlKGNoYXJhY3RlcnMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChpc1dvcmRCb3VuZGFyeShjaGFyYWN0ZXJzW2ldKSA9PT0gb25Xb3JkQm91bmRhcnkpIHtcbiAgICAgICAgICAgIHdvcmQgPSBjaGFyYWN0ZXJzLnNwbGljZSgwLCBpKTtcbiAgICAgICAgICAgIGlmICh3b3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHdvcmRzLnB1c2gocHVueWNvZGUudWNzMi5lbmNvZGUod29yZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Xb3JkQm91bmRhcnkgPSEgb25Xb3JkQm91bmRhcnk7XG4gICAgICAgICAgICBpID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpID49IGNoYXJhY3RlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB3b3JkID0gY2hhcmFjdGVycy5zcGxpY2UoMCwgaSk7XG4gICAgICAgICAgICBpZiAod29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3b3Jkcy5wdXNoKHB1bnljb2RlLnVjczIuZW5jb2RlKHdvcmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd29yZHM7XG59XG5cbmZ1bmN0aW9uIGlzV29yZEJvdW5kYXJ5KGNoYXJhY3RlckNvZGUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAzMiwgLy8gPHNwYWNlPlxuICAgICAgICAxMywgLy8gXFxyXG4gICAgICAgIDEwLCAvLyBcXG5cbiAgICAgICAgOSwgLy8gXFx0XG4gICAgICAgIDQ1IC8vIC1cbiAgICBdLmluZGV4T2YoY2hhcmFjdGVyQ29kZSkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBoYXNVbmljb2RlKHN0cmluZykge1xuICAgIHJldHVybiAoL1teXFx1MDAwMC1cXHUwMGZmXS8pLnRlc3Qoc3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlUGFyc2VyO1xuXG59LHtcIi4vY29sb3JcIjozLFwiLi9mb250bWV0cmljc1wiOjcsXCIuL2xvZ1wiOjEzLFwiLi9ub2RlY29udGFpbmVyXCI6MTQsXCIuL3BzZXVkb2VsZW1lbnRjb250YWluZXJcIjoxOCxcIi4vc3RhY2tpbmdjb250ZXh0XCI6MjEsXCIuL3RleHRjb250YWluZXJcIjoyNSxcIi4vdXRpbHNcIjoyNixcInB1bnljb2RlXCI6MX1dLDE2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBYSFIgPSBfZGVyZXFfKCcuL3hocicpO1xudmFyIHV0aWxzID0gX2RlcmVxXygnLi91dGlscycpO1xudmFyIGxvZyA9IF9kZXJlcV8oJy4vbG9nJyk7XG52YXIgY3JlYXRlV2luZG93Q2xvbmUgPSBfZGVyZXFfKCcuL2Nsb25lJyk7XG52YXIgZGVjb2RlNjQgPSB1dGlscy5kZWNvZGU2NDtcblxuZnVuY3Rpb24gUHJveHkoc3JjLCBwcm94eVVybCwgZG9jdW1lbnQpIHtcbiAgICB2YXIgc3VwcG9ydHNDT1JTID0gKCd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpKTtcbiAgICBpZiAoIXByb3h5VXJsKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIk5vIHByb3h5IGNvbmZpZ3VyZWRcIik7XG4gICAgfVxuICAgIHZhciBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKHN1cHBvcnRzQ09SUyk7XG4gICAgdmFyIHVybCA9IGNyZWF0ZVByb3h5VXJsKHByb3h5VXJsLCBzcmMsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiBzdXBwb3J0c0NPUlMgPyBYSFIodXJsKSA6IChqc29ucChkb2N1bWVudCwgdXJsLCBjYWxsYmFjaykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gZGVjb2RlNjQocmVzcG9uc2UuY29udGVudCk7XG4gICAgfSkpO1xufVxudmFyIHByb3h5Q291bnQgPSAwO1xuXG5mdW5jdGlvbiBQcm94eVVSTChzcmMsIHByb3h5VXJsLCBkb2N1bWVudCkge1xuICAgIHZhciBzdXBwb3J0c0NPUlNJbWFnZSA9ICgnY3Jvc3NPcmlnaW4nIGluIG5ldyBJbWFnZSgpKTtcbiAgICB2YXIgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhzdXBwb3J0c0NPUlNJbWFnZSk7XG4gICAgdmFyIHVybCA9IGNyZWF0ZVByb3h5VXJsKHByb3h5VXJsLCBzcmMsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gKHN1cHBvcnRzQ09SU0ltYWdlID8gUHJvbWlzZS5yZXNvbHZlKHVybCkgOiBqc29ucChkb2N1bWVudCwgdXJsLCBjYWxsYmFjaykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gXCJkYXRhOlwiICsgcmVzcG9uc2UudHlwZSArIFwiO2Jhc2U2NCxcIiArIHJlc3BvbnNlLmNvbnRlbnQ7XG4gICAgfSkpO1xufVxuXG5mdW5jdGlvbiBqc29ucChkb2N1bWVudCwgdXJsLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICB2YXIgY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVsZXRlIHdpbmRvdy5odG1sMmNhbnZhcy5wcm94eVtjYWxsYmFja107XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHMpO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuaHRtbDJjYW52YXMucHJveHlbY2FsbGJhY2tdID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9O1xuICAgICAgICBzLnNyYyA9IHVybDtcbiAgICAgICAgcy5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHMpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDYWxsYmFjayh1c2VDT1JTKSB7XG4gICAgcmV0dXJuICF1c2VDT1JTID8gXCJodG1sMmNhbnZhc19cIiArIERhdGUubm93KCkgKyBcIl9cIiArICgrK3Byb3h5Q291bnQpICsgXCJfXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApIDogXCJcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJveHlVcmwocHJveHlVcmwsIHNyYywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gcHJveHlVcmwgKyBcIj91cmw9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoc3JjKSArIChjYWxsYmFjay5sZW5ndGggPyBcIiZjYWxsYmFjaz1odG1sMmNhbnZhcy5wcm94eS5cIiArIGNhbGxiYWNrIDogXCJcIik7XG59XG5cbmZ1bmN0aW9uIGRvY3VtZW50RnJvbUhUTUwoc3JjKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKSwgZG9jO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBsb2coXCJET01QYXJzZXIgbm90IHN1cHBvcnRlZCwgZmFsbGluZyBiYWNrIHRvIGNyZWF0ZUhUTUxEb2N1bWVudFwiKTtcbiAgICAgICAgICAgIGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZG9jLm9wZW4oKTtcbiAgICAgICAgICAgICAgICBkb2Mud3JpdGUoaHRtbCk7XG4gICAgICAgICAgICAgICAgZG9jLmNsb3NlKCk7XG4gICAgICAgICAgICB9IGNhdGNoKGVlKSB7XG4gICAgICAgICAgICAgICAgbG9nKFwiY3JlYXRlSFRNTERvY3VtZW50IHdyaXRlIG5vdCBzdXBwb3J0ZWQsIGZhbGxpbmcgYmFjayB0byBkb2N1bWVudC5ib2R5LmlubmVySFRNTFwiKTtcbiAgICAgICAgICAgICAgICBkb2MuYm9keS5pbm5lckhUTUwgPSBodG1sOyAvLyBpZTkgZG9lc250IHN1cHBvcnQgd3JpdGluZyB0byBkb2N1bWVudEVsZW1lbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJiYXNlXCIpO1xuICAgICAgICBpZiAoIWIgfHwgIWIuaHJlZi5ob3N0KSB7XG4gICAgICAgICAgICB2YXIgYmFzZSA9IGRvYy5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKTtcbiAgICAgICAgICAgIGJhc2UuaHJlZiA9IHNyYztcbiAgICAgICAgICAgIGRvYy5oZWFkLmluc2VydEJlZm9yZShiYXNlLCBkb2MuaGVhZC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkb2M7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gbG9hZFVybERvY3VtZW50KHNyYywgcHJveHksIGRvY3VtZW50LCB3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm94eShzcmMsIHByb3h5LCB3aW5kb3cuZG9jdW1lbnQpLnRoZW4oZG9jdW1lbnRGcm9tSFRNTChzcmMpKS50aGVuKGZ1bmN0aW9uKGRvYykge1xuICAgICAgICByZXR1cm4gY3JlYXRlV2luZG93Q2xvbmUoZG9jLCBkb2N1bWVudCwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucywgMCwgMCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydHMuUHJveHkgPSBQcm94eTtcbmV4cG9ydHMuUHJveHlVUkwgPSBQcm94eVVSTDtcbmV4cG9ydHMubG9hZFVybERvY3VtZW50ID0gbG9hZFVybERvY3VtZW50O1xuXG59LHtcIi4vY2xvbmVcIjoyLFwiLi9sb2dcIjoxMyxcIi4vdXRpbHNcIjoyNixcIi4veGhyXCI6Mjh9XSwxNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUHJveHlVUkwgPSBfZGVyZXFfKCcuL3Byb3h5JykuUHJveHlVUkw7XG5cbmZ1bmN0aW9uIFByb3h5SW1hZ2VDb250YWluZXIoc3JjLCBwcm94eSkge1xuICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgbGluay5ocmVmID0gc3JjO1xuICAgIHNyYyA9IGxpbmsuaHJlZjtcbiAgICB0aGlzLnNyYyA9IHNyYztcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLmltYWdlLmNyb3NzT3JpZ2luID0gXCJBbm9ueW1vdXNcIjtcbiAgICAgICAgc2VsZi5pbWFnZS5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgICBzZWxmLmltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG5cbiAgICAgICAgbmV3IFByb3h5VVJMKHNyYywgcHJveHksIGRvY3VtZW50KS50aGVuKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgc2VsZi5pbWFnZS5zcmMgPSB1cmw7XG4gICAgICAgIH0pWydjYXRjaCddKHJlamVjdCk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJveHlJbWFnZUNvbnRhaW5lcjtcblxufSx7XCIuL3Byb3h5XCI6MTZ9XSwxODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgTm9kZUNvbnRhaW5lciA9IF9kZXJlcV8oJy4vbm9kZWNvbnRhaW5lcicpO1xuXG5mdW5jdGlvbiBQc2V1ZG9FbGVtZW50Q29udGFpbmVyKG5vZGUsIHBhcmVudCwgdHlwZSkge1xuICAgIE5vZGVDb250YWluZXIuY2FsbCh0aGlzLCBub2RlLCBwYXJlbnQpO1xuICAgIHRoaXMuaXNQc2V1ZG9FbGVtZW50ID0gdHJ1ZTtcbiAgICB0aGlzLmJlZm9yZSA9IHR5cGUgPT09IFwiOmJlZm9yZVwiO1xufVxuXG5Qc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5jbG9uZVRvID0gZnVuY3Rpb24oc3RhY2spIHtcbiAgICBQc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5jbG9uZVRvLmNhbGwodGhpcywgc3RhY2spO1xuICAgIHN0YWNrLmlzUHNldWRvRWxlbWVudCA9IHRydWU7XG4gICAgc3RhY2suYmVmb3JlID0gdGhpcy5iZWZvcmU7XG59O1xuXG5Qc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTm9kZUNvbnRhaW5lci5wcm90b3R5cGUpO1xuXG5Qc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5hcHBlbmRUb0RPTSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmJlZm9yZSkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub2RlLmluc2VydEJlZm9yZSh0aGlzLm5vZGUsIHRoaXMucGFyZW50Lm5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnQubm9kZS5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xuICAgIH1cbiAgICB0aGlzLnBhcmVudC5ub2RlLmNsYXNzTmFtZSArPSBcIiBcIiArIHRoaXMuZ2V0SGlkZUNsYXNzKCk7XG59O1xuXG5Qc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5jbGVhbkRPTSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgdGhpcy5wYXJlbnQubm9kZS5jbGFzc05hbWUgPSB0aGlzLnBhcmVudC5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKHRoaXMuZ2V0SGlkZUNsYXNzKCksIFwiXCIpO1xufTtcblxuUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuZ2V0SGlkZUNsYXNzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXNbXCJQU0VVRE9fSElERV9FTEVNRU5UX0NMQVNTX1wiICsgKHRoaXMuYmVmb3JlID8gXCJCRUZPUkVcIiA6IFwiQUZURVJcIildO1xufTtcblxuUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuUFNFVURPX0hJREVfRUxFTUVOVF9DTEFTU19CRUZPUkUgPSBcIl9fX2h0bWwyY2FudmFzX19fcHNldWRvZWxlbWVudF9iZWZvcmVcIjtcblBzZXVkb0VsZW1lbnRDb250YWluZXIucHJvdG90eXBlLlBTRVVET19ISURFX0VMRU1FTlRfQ0xBU1NfQUZURVIgPSBcIl9fX2h0bWwyY2FudmFzX19fcHNldWRvZWxlbWVudF9hZnRlclwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBzZXVkb0VsZW1lbnRDb250YWluZXI7XG5cbn0se1wiLi9ub2RlY29udGFpbmVyXCI6MTR9XSwxOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgbG9nID0gX2RlcmVxXygnLi9sb2cnKTtcblxuZnVuY3Rpb24gUmVuZGVyZXIod2lkdGgsIGhlaWdodCwgaW1hZ2VzLCBvcHRpb25zLCBkb2N1bWVudCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbn1cblxuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckltYWdlID0gZnVuY3Rpb24oY29udGFpbmVyLCBib3VuZHMsIGJvcmRlckRhdGEsIGltYWdlQ29udGFpbmVyKSB7XG4gICAgdmFyIHBhZGRpbmdMZWZ0ID0gY29udGFpbmVyLmNzc0ludCgncGFkZGluZ0xlZnQnKSxcbiAgICAgICAgcGFkZGluZ1RvcCA9IGNvbnRhaW5lci5jc3NJbnQoJ3BhZGRpbmdUb3AnKSxcbiAgICAgICAgcGFkZGluZ1JpZ2h0ID0gY29udGFpbmVyLmNzc0ludCgncGFkZGluZ1JpZ2h0JyksXG4gICAgICAgIHBhZGRpbmdCb3R0b20gPSBjb250YWluZXIuY3NzSW50KCdwYWRkaW5nQm90dG9tJyksXG4gICAgICAgIGJvcmRlcnMgPSBib3JkZXJEYXRhLmJvcmRlcnM7XG5cbiAgICB2YXIgd2lkdGggPSBib3VuZHMud2lkdGggLSAoYm9yZGVyc1sxXS53aWR0aCArIGJvcmRlcnNbM10ud2lkdGggKyBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodCk7XG4gICAgdmFyIGhlaWdodCA9IGJvdW5kcy5oZWlnaHQgLSAoYm9yZGVyc1swXS53aWR0aCArIGJvcmRlcnNbMl0ud2lkdGggKyBwYWRkaW5nVG9wICsgcGFkZGluZ0JvdHRvbSk7XG4gICAgdGhpcy5kcmF3SW1hZ2UoXG4gICAgICAgIGltYWdlQ29udGFpbmVyLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBpbWFnZUNvbnRhaW5lci5pbWFnZS53aWR0aCB8fCB3aWR0aCxcbiAgICAgICAgaW1hZ2VDb250YWluZXIuaW1hZ2UuaGVpZ2h0IHx8IGhlaWdodCxcbiAgICAgICAgYm91bmRzLmxlZnQgKyBwYWRkaW5nTGVmdCArIGJvcmRlcnNbM10ud2lkdGgsXG4gICAgICAgIGJvdW5kcy50b3AgKyBwYWRkaW5nVG9wICsgYm9yZGVyc1swXS53aWR0aCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodFxuICAgICk7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYm91bmRzLCBib3JkZXJEYXRhKSB7XG4gICAgaWYgKGJvdW5kcy5oZWlnaHQgPiAwICYmIGJvdW5kcy53aWR0aCA+IDApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJCYWNrZ3JvdW5kQ29sb3IoY29udGFpbmVyLCBib3VuZHMpO1xuICAgICAgICB0aGlzLnJlbmRlckJhY2tncm91bmRJbWFnZShjb250YWluZXIsIGJvdW5kcywgYm9yZGVyRGF0YSk7XG4gICAgfVxufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmRDb2xvciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYm91bmRzKSB7XG4gICAgdmFyIGNvbG9yID0gY29udGFpbmVyLmNvbG9yKFwiYmFja2dyb3VuZENvbG9yXCIpO1xuICAgIGlmICghY29sb3IuaXNUcmFuc3BhcmVudCgpKSB7XG4gICAgICAgIHRoaXMucmVjdGFuZ2xlKGJvdW5kcy5sZWZ0LCBib3VuZHMudG9wLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQsIGNvbG9yKTtcbiAgICB9XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQm9yZGVycyA9IGZ1bmN0aW9uKGJvcmRlcnMpIHtcbiAgICBib3JkZXJzLmZvckVhY2godGhpcy5yZW5kZXJCb3JkZXIsIHRoaXMpO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckJvcmRlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuY29sb3IuaXNUcmFuc3BhcmVudCgpICYmIGRhdGEuYXJncyAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRyYXdTaGFwZShkYXRhLmFyZ3MsIGRhdGEuY29sb3IpO1xuICAgIH1cbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kSW1hZ2UgPSBmdW5jdGlvbihjb250YWluZXIsIGJvdW5kcywgYm9yZGVyRGF0YSkge1xuICAgIHZhciBiYWNrZ3JvdW5kSW1hZ2VzID0gY29udGFpbmVyLnBhcnNlQmFja2dyb3VuZEltYWdlcygpO1xuICAgIGJhY2tncm91bmRJbWFnZXMucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24oYmFja2dyb3VuZEltYWdlLCBpbmRleCwgYXJyKSB7XG4gICAgICAgIHN3aXRjaChiYWNrZ3JvdW5kSW1hZ2UubWV0aG9kKSB7XG4gICAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHRoaXMuaW1hZ2VzLmdldChiYWNrZ3JvdW5kSW1hZ2UuYXJnc1swXSk7XG4gICAgICAgICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckJhY2tncm91bmRSZXBlYXRpbmcoY29udGFpbmVyLCBib3VuZHMsIGltYWdlLCBhcnIubGVuZ3RoIC0gKGluZGV4KzEpLCBib3JkZXJEYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKFwiRXJyb3IgbG9hZGluZyBiYWNrZ3JvdW5kLWltYWdlXCIsIGJhY2tncm91bmRJbWFnZS5hcmdzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibGluZWFyLWdyYWRpZW50XCI6XG4gICAgICAgIGNhc2UgXCJncmFkaWVudFwiOlxuICAgICAgICAgICAgdmFyIGdyYWRpZW50SW1hZ2UgPSB0aGlzLmltYWdlcy5nZXQoYmFja2dyb3VuZEltYWdlLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChncmFkaWVudEltYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJCYWNrZ3JvdW5kR3JhZGllbnQoZ3JhZGllbnRJbWFnZSwgYm91bmRzLCBib3JkZXJEYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKFwiRXJyb3IgbG9hZGluZyBiYWNrZ3JvdW5kLWltYWdlXCIsIGJhY2tncm91bmRJbWFnZS5hcmdzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibm9uZVwiOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBsb2coXCJVbmtub3duIGJhY2tncm91bmQtaW1hZ2UgdHlwZVwiLCBiYWNrZ3JvdW5kSW1hZ2UuYXJnc1swXSk7XG4gICAgICAgIH1cbiAgICB9LCB0aGlzKTtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kUmVwZWF0aW5nID0gZnVuY3Rpb24oY29udGFpbmVyLCBib3VuZHMsIGltYWdlQ29udGFpbmVyLCBpbmRleCwgYm9yZGVyRGF0YSkge1xuICAgIHZhciBzaXplID0gY29udGFpbmVyLnBhcnNlQmFja2dyb3VuZFNpemUoYm91bmRzLCBpbWFnZUNvbnRhaW5lci5pbWFnZSwgaW5kZXgpO1xuICAgIHZhciBwb3NpdGlvbiA9IGNvbnRhaW5lci5wYXJzZUJhY2tncm91bmRQb3NpdGlvbihib3VuZHMsIGltYWdlQ29udGFpbmVyLmltYWdlLCBpbmRleCwgc2l6ZSk7XG4gICAgdmFyIHJlcGVhdCA9IGNvbnRhaW5lci5wYXJzZUJhY2tncm91bmRSZXBlYXQoaW5kZXgpO1xuICAgIHN3aXRjaCAocmVwZWF0KSB7XG4gICAgY2FzZSBcInJlcGVhdC14XCI6XG4gICAgY2FzZSBcInJlcGVhdCBuby1yZXBlYXRcIjpcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVwZWF0U2hhcGUoaW1hZ2VDb250YWluZXIsIHBvc2l0aW9uLCBzaXplLCBib3VuZHMsIGJvdW5kcy5sZWZ0ICsgYm9yZGVyRGF0YVszXSwgYm91bmRzLnRvcCArIHBvc2l0aW9uLnRvcCArIGJvcmRlckRhdGFbMF0sIDk5OTk5LCBzaXplLmhlaWdodCwgYm9yZGVyRGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyZXBlYXQteVwiOlxuICAgIGNhc2UgXCJuby1yZXBlYXQgcmVwZWF0XCI6XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlcGVhdFNoYXBlKGltYWdlQ29udGFpbmVyLCBwb3NpdGlvbiwgc2l6ZSwgYm91bmRzLCBib3VuZHMubGVmdCArIHBvc2l0aW9uLmxlZnQgKyBib3JkZXJEYXRhWzNdLCBib3VuZHMudG9wICsgYm9yZGVyRGF0YVswXSwgc2l6ZS53aWR0aCwgOTk5OTksIGJvcmRlckRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwibm8tcmVwZWF0XCI6XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlcGVhdFNoYXBlKGltYWdlQ29udGFpbmVyLCBwb3NpdGlvbiwgc2l6ZSwgYm91bmRzLCBib3VuZHMubGVmdCArIHBvc2l0aW9uLmxlZnQgKyBib3JkZXJEYXRhWzNdLCBib3VuZHMudG9wICsgcG9zaXRpb24udG9wICsgYm9yZGVyRGF0YVswXSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQsIGJvcmRlckRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnJlbmRlckJhY2tncm91bmRSZXBlYXQoaW1hZ2VDb250YWluZXIsIHBvc2l0aW9uLCBzaXplLCB7dG9wOiBib3VuZHMudG9wLCBsZWZ0OiBib3VuZHMubGVmdH0sIGJvcmRlckRhdGFbM10sIGJvcmRlckRhdGFbMF0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyO1xuXG59LHtcIi4vbG9nXCI6MTN9XSwyMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUmVuZGVyZXIgPSBfZGVyZXFfKCcuLi9yZW5kZXJlcicpO1xudmFyIExpbmVhckdyYWRpZW50Q29udGFpbmVyID0gX2RlcmVxXygnLi4vbGluZWFyZ3JhZGllbnRjb250YWluZXInKTtcbnZhciBsb2cgPSBfZGVyZXFfKCcuLi9sb2cnKTtcblxuZnVuY3Rpb24gQ2FudmFzUmVuZGVyZXIod2lkdGgsIGhlaWdodCkge1xuICAgIFJlbmRlcmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLm9wdGlvbnMuY2FudmFzIHx8IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jYW52YXMpIHtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLnRhaW50Q3R4ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcImJvdHRvbVwiO1xuICAgIHRoaXMudmFyaWFibGVzID0ge307XG4gICAgbG9nKFwiSW5pdGlhbGl6ZWQgQ2FudmFzUmVuZGVyZXIgd2l0aCBzaXplXCIsIHdpZHRoLCBcInhcIiwgaGVpZ2h0KTtcbn1cblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZW5kZXJlci5wcm90b3R5cGUpO1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0RmlsbFN0eWxlID0gZnVuY3Rpb24oZmlsbFN0eWxlKSB7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdHlwZW9mKGZpbGxTdHlsZSkgPT09IFwib2JqZWN0XCIgJiYgISFmaWxsU3R5bGUuaXNDb2xvciA/IGZpbGxTdHlsZS50b1N0cmluZygpIDogZmlsbFN0eWxlO1xuICAgIHJldHVybiB0aGlzLmN0eDtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZWN0YW5nbGUgPSBmdW5jdGlvbihsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSB7XG4gICAgdGhpcy5zZXRGaWxsU3R5bGUoY29sb3IpLmZpbGxSZWN0KGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuY2lyY2xlID0gZnVuY3Rpb24obGVmdCwgdG9wLCBzaXplLCBjb2xvcikge1xuICAgIHRoaXMuc2V0RmlsbFN0eWxlKGNvbG9yKTtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMobGVmdCArIHNpemUgLyAyLCB0b3AgKyBzaXplIC8gMiwgc2l6ZSAvIDIsIDAsIE1hdGguUEkqMiwgdHJ1ZSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmNpcmNsZVN0cm9rZSA9IGZ1bmN0aW9uKGxlZnQsIHRvcCwgc2l6ZSwgY29sb3IsIHN0cm9rZSwgc3Ryb2tlQ29sb3IpIHtcbiAgICB0aGlzLmNpcmNsZShsZWZ0LCB0b3AsIHNpemUsIGNvbG9yKTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZHJhd1NoYXBlID0gZnVuY3Rpb24oc2hhcGUsIGNvbG9yKSB7XG4gICAgdGhpcy5zaGFwZShzaGFwZSk7XG4gICAgdGhpcy5zZXRGaWxsU3R5bGUoY29sb3IpLmZpbGwoKTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS50YWludHMgPSBmdW5jdGlvbihpbWFnZUNvbnRhaW5lcikge1xuICAgIGlmIChpbWFnZUNvbnRhaW5lci50YWludGVkID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMudGFpbnRDdHguZHJhd0ltYWdlKGltYWdlQ29udGFpbmVyLmltYWdlLCAwLCAwKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRDdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpO1xuICAgICAgICAgICAgaW1hZ2VDb250YWluZXIudGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRDdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGltYWdlQ29udGFpbmVyLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGltYWdlQ29udGFpbmVyLnRhaW50ZWQ7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZHJhd0ltYWdlID0gZnVuY3Rpb24oaW1hZ2VDb250YWluZXIsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCkge1xuICAgIGlmICghdGhpcy50YWludHMoaW1hZ2VDb250YWluZXIpIHx8IHRoaXMub3B0aW9ucy5hbGxvd1RhaW50KSB7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZUNvbnRhaW5lci5pbWFnZSwgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKTtcbiAgICB9XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuY2xpcCA9IGZ1bmN0aW9uKHNoYXBlcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgc2hhcGVzLmZpbHRlcihoYXNFbnRyaWVzKS5mb3JFYWNoKGZ1bmN0aW9uKHNoYXBlKSB7XG4gICAgICAgIHRoaXMuc2hhcGUoc2hhcGUpLmNsaXAoKTtcbiAgICB9LCB0aGlzKTtcbiAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zaGFwZSA9IGZ1bmN0aW9uKHNoYXBlKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgc2hhcGUuZm9yRWFjaChmdW5jdGlvbihwb2ludCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHBvaW50WzBdID09PSBcInJlY3RcIikge1xuICAgICAgICAgICAgdGhpcy5jdHgucmVjdC5hcHBseSh0aGlzLmN0eCwgcG9pbnQuc2xpY2UoMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHhbKGluZGV4ID09PSAwKSA/IFwibW92ZVRvXCIgOiBwb2ludFswXSArIFwiVG9cIiBdLmFwcGx5KHRoaXMuY3R4LCBwb2ludC5zbGljZSgxKSk7XG4gICAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gdGhpcy5jdHg7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZm9udCA9IGZ1bmN0aW9uKGNvbG9yLCBzdHlsZSwgdmFyaWFudCwgd2VpZ2h0LCBzaXplLCBmYW1pbHkpIHtcbiAgICB0aGlzLnNldEZpbGxTdHlsZShjb2xvcikuZm9udCA9IFtzdHlsZSwgdmFyaWFudCwgd2VpZ2h0LCBzaXplLCBmYW1pbHldLmpvaW4oXCIgXCIpLnNwbGl0KFwiLFwiKVswXTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5mb250U2hhZG93ID0gZnVuY3Rpb24oY29sb3IsIG9mZnNldFgsIG9mZnNldFksIGJsdXIpIHtcbiAgICB0aGlzLnNldFZhcmlhYmxlKFwic2hhZG93Q29sb3JcIiwgY29sb3IudG9TdHJpbmcoKSlcbiAgICAgICAgLnNldFZhcmlhYmxlKFwic2hhZG93T2Zmc2V0WVwiLCBvZmZzZXRYKVxuICAgICAgICAuc2V0VmFyaWFibGUoXCJzaGFkb3dPZmZzZXRYXCIsIG9mZnNldFkpXG4gICAgICAgIC5zZXRWYXJpYWJsZShcInNoYWRvd0JsdXJcIiwgYmx1cik7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuY2xlYXJTaGFkb3cgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFZhcmlhYmxlKFwic2hhZG93Q29sb3JcIiwgXCJyZ2JhKDAsMCwwLDApXCIpO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldE9wYWNpdHkgPSBmdW5jdGlvbihvcGFjaXR5KSB7XG4gICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSBvcGFjaXR5O1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRyYW5zZm9ybSkge1xuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0cmFuc2Zvcm0ub3JpZ2luWzBdLCB0cmFuc2Zvcm0ub3JpZ2luWzFdKTtcbiAgICB0aGlzLmN0eC50cmFuc2Zvcm0uYXBwbHkodGhpcy5jdHgsIHRyYW5zZm9ybS5tYXRyaXgpO1xuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSgtdHJhbnNmb3JtLm9yaWdpblswXSwgLXRyYW5zZm9ybS5vcmlnaW5bMV0pO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvcGVydHksIHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFyaWFibGVzW3Byb3BlcnR5XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy52YXJpYWJsZXNbcHJvcGVydHldID0gdGhpcy5jdHhbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHRleHQsIGxlZnQsIGJvdHRvbSkge1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIGxlZnQsIGJvdHRvbSk7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuYmFja2dyb3VuZFJlcGVhdFNoYXBlID0gZnVuY3Rpb24oaW1hZ2VDb250YWluZXIsIGJhY2tncm91bmRQb3NpdGlvbiwgc2l6ZSwgYm91bmRzLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIGJvcmRlckRhdGEpIHtcbiAgICB2YXIgc2hhcGUgPSBbXG4gICAgICAgIFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0KSwgTWF0aC5yb3VuZCh0b3ApXSxcbiAgICAgICAgW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQgKyB3aWR0aCksIE1hdGgucm91bmQodG9wKV0sXG4gICAgICAgIFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0ICsgd2lkdGgpLCBNYXRoLnJvdW5kKGhlaWdodCArIHRvcCldLFxuICAgICAgICBbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCksIE1hdGgucm91bmQoaGVpZ2h0ICsgdG9wKV1cbiAgICBdO1xuICAgIHRoaXMuY2xpcChbc2hhcGVdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJCYWNrZ3JvdW5kUmVwZWF0KGltYWdlQ29udGFpbmVyLCBiYWNrZ3JvdW5kUG9zaXRpb24sIHNpemUsIGJvdW5kcywgYm9yZGVyRGF0YVszXSwgYm9yZGVyRGF0YVswXSk7XG4gICAgfSwgdGhpcyk7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZFJlcGVhdCA9IGZ1bmN0aW9uKGltYWdlQ29udGFpbmVyLCBiYWNrZ3JvdW5kUG9zaXRpb24sIHNpemUsIGJvdW5kcywgYm9yZGVyTGVmdCwgYm9yZGVyVG9wKSB7XG4gICAgdmFyIG9mZnNldFggPSBNYXRoLnJvdW5kKGJvdW5kcy5sZWZ0ICsgYmFja2dyb3VuZFBvc2l0aW9uLmxlZnQgKyBib3JkZXJMZWZ0KSwgb2Zmc2V0WSA9IE1hdGgucm91bmQoYm91bmRzLnRvcCArIGJhY2tncm91bmRQb3NpdGlvbi50b3AgKyBib3JkZXJUb3ApO1xuICAgIHRoaXMuc2V0RmlsbFN0eWxlKHRoaXMuY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5yZXNpemVJbWFnZShpbWFnZUNvbnRhaW5lciwgc2l6ZSksIFwicmVwZWF0XCIpKTtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSgtb2Zmc2V0WCwgLW9mZnNldFkpO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmRHcmFkaWVudCA9IGZ1bmN0aW9uKGdyYWRpZW50SW1hZ2UsIGJvdW5kcykge1xuICAgIGlmIChncmFkaWVudEltYWdlIGluc3RhbmNlb2YgTGluZWFyR3JhZGllbnRDb250YWluZXIpIHtcbiAgICAgICAgdmFyIGdyYWRpZW50ID0gdGhpcy5jdHguY3JlYXRlTGluZWFyR3JhZGllbnQoXG4gICAgICAgICAgICBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAqIGdyYWRpZW50SW1hZ2UueDAsXG4gICAgICAgICAgICBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAqIGdyYWRpZW50SW1hZ2UueTAsXG4gICAgICAgICAgICBib3VuZHMubGVmdCArICBib3VuZHMud2lkdGggKiBncmFkaWVudEltYWdlLngxLFxuICAgICAgICAgICAgYm91bmRzLnRvcCArICBib3VuZHMuaGVpZ2h0ICogZ3JhZGllbnRJbWFnZS55MSk7XG4gICAgICAgIGdyYWRpZW50SW1hZ2UuY29sb3JTdG9wcy5mb3JFYWNoKGZ1bmN0aW9uKGNvbG9yU3RvcCkge1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcC5zdG9wLCBjb2xvclN0b3AuY29sb3IudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlY3RhbmdsZShib3VuZHMubGVmdCwgYm91bmRzLnRvcCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0LCBncmFkaWVudCk7XG4gICAgfVxufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlc2l6ZUltYWdlID0gZnVuY3Rpb24oaW1hZ2VDb250YWluZXIsIHNpemUpIHtcbiAgICB2YXIgaW1hZ2UgPSBpbWFnZUNvbnRhaW5lci5pbWFnZTtcbiAgICBpZihpbWFnZS53aWR0aCA9PT0gc2l6ZS53aWR0aCAmJiBpbWFnZS5oZWlnaHQgPT09IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9XG5cbiAgICB2YXIgY3R4LCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBzaXplLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG4gICAgcmV0dXJuIGNhbnZhcztcbn07XG5cbmZ1bmN0aW9uIGhhc0VudHJpZXMoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkubGVuZ3RoID4gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDYW52YXNSZW5kZXJlcjtcblxufSx7XCIuLi9saW5lYXJncmFkaWVudGNvbnRhaW5lclwiOjEyLFwiLi4vbG9nXCI6MTMsXCIuLi9yZW5kZXJlclwiOjE5fV0sMjE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIE5vZGVDb250YWluZXIgPSBfZGVyZXFfKCcuL25vZGVjb250YWluZXInKTtcblxuZnVuY3Rpb24gU3RhY2tpbmdDb250ZXh0KGhhc093blN0YWNraW5nLCBvcGFjaXR5LCBlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBOb2RlQ29udGFpbmVyLmNhbGwodGhpcywgZWxlbWVudCwgcGFyZW50KTtcbiAgICB0aGlzLm93blN0YWNraW5nID0gaGFzT3duU3RhY2tpbmc7XG4gICAgdGhpcy5jb250ZXh0cyA9IFtdO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB0aGlzLm9wYWNpdHkgPSAodGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5zdGFjay5vcGFjaXR5IDogMSkgKiBvcGFjaXR5O1xufVxuXG5TdGFja2luZ0NvbnRleHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShOb2RlQ29udGFpbmVyLnByb3RvdHlwZSk7XG5cblN0YWNraW5nQ29udGV4dC5wcm90b3R5cGUuZ2V0UGFyZW50U3RhY2sgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgdmFyIHBhcmVudFN0YWNrID0gKHRoaXMucGFyZW50KSA/IHRoaXMucGFyZW50LnN0YWNrIDogbnVsbDtcbiAgICByZXR1cm4gcGFyZW50U3RhY2sgPyAocGFyZW50U3RhY2sub3duU3RhY2tpbmcgPyBwYXJlbnRTdGFjayA6IHBhcmVudFN0YWNrLmdldFBhcmVudFN0YWNrKGNvbnRleHQpKSA6IGNvbnRleHQuc3RhY2s7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWNraW5nQ29udGV4dDtcblxufSx7XCIuL25vZGVjb250YWluZXJcIjoxNH1dLDIyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbmZ1bmN0aW9uIFN1cHBvcnQoZG9jdW1lbnQpIHtcbiAgICB0aGlzLnJhbmdlQm91bmRzID0gdGhpcy50ZXN0UmFuZ2VCb3VuZHMoZG9jdW1lbnQpO1xuICAgIHRoaXMuY29ycyA9IHRoaXMudGVzdENPUlMoKTtcbiAgICB0aGlzLnN2ZyA9IHRoaXMudGVzdFNWRygpO1xufVxuXG5TdXBwb3J0LnByb3RvdHlwZS50ZXN0UmFuZ2VCb3VuZHMgPSBmdW5jdGlvbihkb2N1bWVudCkge1xuICAgIHZhciByYW5nZSwgdGVzdEVsZW1lbnQsIHJhbmdlQm91bmRzLCByYW5nZUhlaWdodCwgc3VwcG9ydCA9IGZhbHNlO1xuXG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgaWYgKHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib3VuZHRlc3QnKTtcbiAgICAgICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTIzcHhcIjtcbiAgICAgICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZSh0ZXN0RWxlbWVudCk7XG4gICAgICAgICAgICByYW5nZUJvdW5kcyA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgcmFuZ2VIZWlnaHQgPSByYW5nZUJvdW5kcy5oZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmIChyYW5nZUhlaWdodCA9PT0gMTIzKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBwb3J0O1xufTtcblxuU3VwcG9ydC5wcm90b3R5cGUudGVzdENPUlMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdHlwZW9mKChuZXcgSW1hZ2UoKSkuY3Jvc3NPcmlnaW4pICE9PSBcInVuZGVmaW5lZFwiO1xufTtcblxuU3VwcG9ydC5wcm90b3R5cGUudGVzdFNWRyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB2YXIgY3R4ID0gIGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgaW1nLnNyYyA9IFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48L3N2Zz5cIjtcblxuICAgIHRyeSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgICAgY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwb3J0O1xuXG59LHt9XSwyMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgWEhSID0gX2RlcmVxXygnLi94aHInKTtcbnZhciBkZWNvZGU2NCA9IF9kZXJlcV8oJy4vdXRpbHMnKS5kZWNvZGU2NDtcblxuZnVuY3Rpb24gU1ZHQ29udGFpbmVyKHNyYykge1xuICAgIHRoaXMuc3JjID0gc3JjO1xuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucHJvbWlzZSA9IHRoaXMuaGFzRmFicmljKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChzZWxmLmlzSW5saW5lKHNyYykgPyBQcm9taXNlLnJlc29sdmUoc2VsZi5pbmxpbmVGb3JtYXR0aW5nKHNyYykpIDogWEhSKHNyYykpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24oc3ZnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICB3aW5kb3cuaHRtbDJjYW52YXMuc3ZnLmZhYnJpYy5sb2FkU1ZHRnJvbVN0cmluZyhzdmcsIHNlbGYuY3JlYXRlQ2FudmFzLmNhbGwoc2VsZiwgcmVzb2x2ZSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuU1ZHQ29udGFpbmVyLnByb3RvdHlwZS5oYXNGYWJyaWMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gIXdpbmRvdy5odG1sMmNhbnZhcy5zdmcgfHwgIXdpbmRvdy5odG1sMmNhbnZhcy5zdmcuZmFicmljID8gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaHRtbDJjYW52YXMuc3ZnLmpzIGlzIG5vdCBsb2FkZWQsIGNhbm5vdCByZW5kZXIgc3ZnXCIpKSA6IFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuU1ZHQ29udGFpbmVyLnByb3RvdHlwZS5pbmxpbmVGb3JtYXR0aW5nID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgcmV0dXJuICgvXmRhdGE6aW1hZ2VcXC9zdmdcXCt4bWw7YmFzZTY0LC8udGVzdChzcmMpKSA/IHRoaXMuZGVjb2RlNjQodGhpcy5yZW1vdmVDb250ZW50VHlwZShzcmMpKSA6IHRoaXMucmVtb3ZlQ29udGVudFR5cGUoc3JjKTtcbn07XG5cblNWR0NvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ29udGVudFR5cGUgPSBmdW5jdGlvbihzcmMpIHtcbiAgICByZXR1cm4gc3JjLnJlcGxhY2UoL15kYXRhOmltYWdlXFwvc3ZnXFwreG1sKDtiYXNlNjQpPywvLCcnKTtcbn07XG5cblNWR0NvbnRhaW5lci5wcm90b3R5cGUuaXNJbmxpbmUgPSBmdW5jdGlvbihzcmMpIHtcbiAgICByZXR1cm4gKC9eZGF0YTppbWFnZVxcL3N2Z1xcK3htbC9pLnRlc3Qoc3JjKSk7XG59O1xuXG5TVkdDb250YWluZXIucHJvdG90eXBlLmNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmplY3RzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBuZXcgd2luZG93Lmh0bWwyY2FudmFzLnN2Zy5mYWJyaWMuU3RhdGljQ2FudmFzKCdjJyk7XG4gICAgICAgIHNlbGYuaW1hZ2UgPSBjYW52YXMubG93ZXJDYW52YXNFbDtcbiAgICAgICAgY2FudmFzXG4gICAgICAgICAgICAuc2V0V2lkdGgob3B0aW9ucy53aWR0aClcbiAgICAgICAgICAgIC5zZXRIZWlnaHQob3B0aW9ucy5oZWlnaHQpXG4gICAgICAgICAgICAuYWRkKHdpbmRvdy5odG1sMmNhbnZhcy5zdmcuZmFicmljLnV0aWwuZ3JvdXBTVkdFbGVtZW50cyhvYmplY3RzLCBvcHRpb25zKSlcbiAgICAgICAgICAgIC5yZW5kZXJBbGwoKTtcbiAgICAgICAgcmVzb2x2ZShjYW52YXMubG93ZXJDYW52YXNFbCk7XG4gICAgfTtcbn07XG5cblNWR0NvbnRhaW5lci5wcm90b3R5cGUuZGVjb2RlNjQgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gKHR5cGVvZih3aW5kb3cuYXRvYikgPT09IFwiZnVuY3Rpb25cIikgPyB3aW5kb3cuYXRvYihzdHIpIDogZGVjb2RlNjQoc3RyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU1ZHQ29udGFpbmVyO1xuXG59LHtcIi4vdXRpbHNcIjoyNixcIi4veGhyXCI6Mjh9XSwyNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgU1ZHQ29udGFpbmVyID0gX2RlcmVxXygnLi9zdmdjb250YWluZXInKTtcblxuZnVuY3Rpb24gU1ZHTm9kZUNvbnRhaW5lcihub2RlLCBfbmF0aXZlKSB7XG4gICAgdGhpcy5zcmMgPSBub2RlO1xuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucHJvbWlzZSA9IF9uYXRpdmUgPyBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBzZWxmLmltYWdlLm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICAgIHNlbGYuaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgc2VsZi5pbWFnZS5zcmMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbCxcIiArIChuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyhub2RlKTtcbiAgICAgICAgaWYgKHNlbGYuaW1hZ2UuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJlc29sdmUoc2VsZi5pbWFnZSk7XG4gICAgICAgIH1cbiAgICB9KSA6IHRoaXMuaGFzRmFicmljKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5odG1sMmNhbnZhcy5zdmcuZmFicmljLnBhcnNlU1ZHRG9jdW1lbnQobm9kZSwgc2VsZi5jcmVhdGVDYW52YXMuY2FsbChzZWxmLCByZXNvbHZlKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5TVkdOb2RlQ29udGFpbmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU1ZHQ29udGFpbmVyLnByb3RvdHlwZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU1ZHTm9kZUNvbnRhaW5lcjtcblxufSx7XCIuL3N2Z2NvbnRhaW5lclwiOjIzfV0sMjU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIE5vZGVDb250YWluZXIgPSBfZGVyZXFfKCcuL25vZGVjb250YWluZXInKTtcblxuZnVuY3Rpb24gVGV4dENvbnRhaW5lcihub2RlLCBwYXJlbnQpIHtcbiAgICBOb2RlQ29udGFpbmVyLmNhbGwodGhpcywgbm9kZSwgcGFyZW50KTtcbn1cblxuVGV4dENvbnRhaW5lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5vZGVDb250YWluZXIucHJvdG90eXBlKTtcblxuVGV4dENvbnRhaW5lci5wcm90b3R5cGUuYXBwbHlUZXh0VHJhbnNmb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ub2RlLmRhdGEgPSB0aGlzLnRyYW5zZm9ybSh0aGlzLnBhcmVudC5jc3MoXCJ0ZXh0VHJhbnNmb3JtXCIpKTtcbn07XG5cblRleHRDb250YWluZXIucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRyYW5zZm9ybSkge1xuICAgIHZhciB0ZXh0ID0gdGhpcy5ub2RlLmRhdGE7XG4gICAgc3dpdGNoKHRyYW5zZm9ybSl7XG4gICAgICAgIGNhc2UgXCJsb3dlcmNhc2VcIjpcbiAgICAgICAgICAgIHJldHVybiB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6XG4gICAgICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC8oXnxcXHN8OnwtfFxcKHxcXCkpKFthLXpdKS9nLCBjYXBpdGFsaXplKTtcbiAgICAgICAgY2FzZSBcInVwcGVyY2FzZVwiOlxuICAgICAgICAgICAgcmV0dXJuIHRleHQudG9VcHBlckNhc2UoKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUobSwgcDEsIHAyKSB7XG4gICAgaWYgKG0ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gcDEgKyBwMi50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0Q29udGFpbmVyO1xuXG59LHtcIi4vbm9kZWNvbnRhaW5lclwiOjE0fV0sMjY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuZXhwb3J0cy5zbWFsbEltYWdlID0gZnVuY3Rpb24gc21hbGxJbWFnZSgpIHtcbiAgICByZXR1cm4gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTdcIjtcbn07XG5cbmV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xufTtcblxuLypcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlclxuICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiBOaWtsYXMgdm9uIEhlcnR6ZW5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG5leHBvcnRzLmRlY29kZTY0ID0gZnVuY3Rpb24oYmFzZTY0KSB7XG4gICAgdmFyIGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG4gICAgdmFyIGxlbiA9IGJhc2U2NC5sZW5ndGgsIGksIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0LCBieXRlMSwgYnl0ZTIsIGJ5dGUzO1xuXG4gICAgdmFyIG91dHB1dCA9IFwiXCI7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz00KSB7XG4gICAgICAgIGVuY29kZWQxID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaV0pO1xuICAgICAgICBlbmNvZGVkMiA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2krMV0pO1xuICAgICAgICBlbmNvZGVkMyA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2krMl0pO1xuICAgICAgICBlbmNvZGVkNCA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2krM10pO1xuXG4gICAgICAgIGJ5dGUxID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgICBieXRlMiA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICAgIGJ5dGUzID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgZW5jb2RlZDQ7XG4gICAgICAgIGlmIChlbmNvZGVkMyA9PT0gNjQpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGUxKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmNvZGVkNCA9PT0gNjQgfHwgZW5jb2RlZDQgPT09IC0xKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlMSwgYnl0ZTIpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlMSwgYnl0ZTIsIGJ5dGUzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnRzLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgdmFyIGNsaWVudFJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgd2lkdGggPSBub2RlLm9mZnNldFdpZHRoID09IG51bGwgPyBjbGllbnRSZWN0LndpZHRoIDogbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogY2xpZW50UmVjdC50b3AsXG4gICAgICAgICAgICBib3R0b206IGNsaWVudFJlY3QuYm90dG9tIHx8IChjbGllbnRSZWN0LnRvcCArIGNsaWVudFJlY3QuaGVpZ2h0KSxcbiAgICAgICAgICAgIHJpZ2h0OiBjbGllbnRSZWN0LmxlZnQgKyB3aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6IGNsaWVudFJlY3QubGVmdCxcbiAgICAgICAgICAgIHdpZHRoOiAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG5vZGUub2Zmc2V0SGVpZ2h0ID09IG51bGwgPyBjbGllbnRSZWN0LmhlaWdodCA6IG5vZGUub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7fTtcbn07XG5cbmV4cG9ydHMub2Zmc2V0Qm91bmRzID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBwYXJlbnQgPSBub2RlLm9mZnNldFBhcmVudCA/IGV4cG9ydHMub2Zmc2V0Qm91bmRzKG5vZGUub2Zmc2V0UGFyZW50KSA6IHt0b3A6IDAsIGxlZnQ6IDB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBub2RlLm9mZnNldFRvcCArIHBhcmVudC50b3AsXG4gICAgICAgIGJvdHRvbTogbm9kZS5vZmZzZXRUb3AgKyBub2RlLm9mZnNldEhlaWdodCArIHBhcmVudC50b3AsXG4gICAgICAgIHJpZ2h0OiBub2RlLm9mZnNldExlZnQgKyBwYXJlbnQubGVmdCArIG5vZGUub2Zmc2V0V2lkdGgsXG4gICAgICAgIGxlZnQ6IG5vZGUub2Zmc2V0TGVmdCArIHBhcmVudC5sZWZ0LFxuICAgICAgICB3aWR0aDogbm9kZS5vZmZzZXRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBub2RlLm9mZnNldEhlaWdodFxuICAgIH07XG59O1xuXG5leHBvcnRzLnBhcnNlQmFja2dyb3VuZHMgPSBmdW5jdGlvbihiYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICB2YXIgd2hpdGVzcGFjZSA9ICcgXFxyXFxuXFx0JyxcbiAgICAgICAgbWV0aG9kLCBkZWZpbml0aW9uLCBwcmVmaXgsIHByZWZpeF9pLCBibG9jaywgcmVzdWx0cyA9IFtdLFxuICAgICAgICBtb2RlID0gMCwgbnVtUGFyZW4gPSAwLCBxdW90ZSwgYXJncztcbiAgICB2YXIgYXBwZW5kUmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKG1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24uc3Vic3RyKDAsIDEpID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24uc3Vic3RyKDEsIGRlZmluaXRpb24ubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXRob2Quc3Vic3RyKDAsIDEpID09PSAnLScgJiYgKHByZWZpeF9pID0gbWV0aG9kLmluZGV4T2YoJy0nLCAxICkgKyAxKSA+IDApIHtcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBtZXRob2Quc3Vic3RyKDAsIHByZWZpeF9pKTtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBtZXRob2Quc3Vic3RyKHByZWZpeF9pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgcHJlZml4OiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYmxvY2ssXG4gICAgICAgICAgICAgICAgYXJnczogYXJncyxcbiAgICAgICAgICAgICAgICBpbWFnZTogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXJncyA9IFtdO1xuICAgICAgICBtZXRob2QgPSBwcmVmaXggPSBkZWZpbml0aW9uID0gYmxvY2sgPSAnJztcbiAgICB9O1xuICAgIGFyZ3MgPSBbXTtcbiAgICBtZXRob2QgPSBwcmVmaXggPSBkZWZpbml0aW9uID0gYmxvY2sgPSAnJztcbiAgICBiYWNrZ3JvdW5kSW1hZ2Uuc3BsaXQoXCJcIikuZm9yRWFjaChmdW5jdGlvbihjKSB7XG4gICAgICAgIGlmIChtb2RlID09PSAwICYmIHdoaXRlc3BhY2UuaW5kZXhPZihjKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoKGMpIHtcbiAgICAgICAgY2FzZSAnXCInOlxuICAgICAgICAgICAgaWYoIXF1b3RlKSB7XG4gICAgICAgICAgICAgICAgcXVvdGUgPSBjO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHF1b3RlID09PSBjKSB7XG4gICAgICAgICAgICAgICAgcXVvdGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJygnOlxuICAgICAgICAgICAgaWYocXVvdGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZihtb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbW9kZSA9IDE7XG4gICAgICAgICAgICAgICAgYmxvY2sgKz0gYztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bVBhcmVuKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnKSc6XG4gICAgICAgICAgICBpZiAocXVvdGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZihtb2RlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgaWYobnVtUGFyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZFJlc3VsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtUGFyZW4tLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICcsJzpcbiAgICAgICAgICAgIGlmIChxdW90ZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG1vZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBhcHBlbmRSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAobnVtUGFyZW4gPT09IDAgJiYgIW1ldGhvZC5tYXRjaCgvXnVybCQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgIGlmIChtb2RlID09PSAwKSB7XG4gICAgICAgICAgICBtZXRob2QgKz0gYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlZmluaXRpb24gKz0gYztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYXBwZW5kUmVzdWx0KCk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG59LHt9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgR3JhZGllbnRDb250YWluZXIgPSBfZGVyZXFfKCcuL2dyYWRpZW50Y29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIFdlYmtpdEdyYWRpZW50Q29udGFpbmVyKGltYWdlRGF0YSkge1xuICAgIEdyYWRpZW50Q29udGFpbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gaW1hZ2VEYXRhLmFyZ3NbMF0gPT09IFwibGluZWFyXCIgPyBHcmFkaWVudENvbnRhaW5lci5UWVBFUy5MSU5FQVIgOiBHcmFkaWVudENvbnRhaW5lci5UWVBFUy5SQURJQUw7XG59XG5cbldlYmtpdEdyYWRpZW50Q29udGFpbmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3JhZGllbnRDb250YWluZXIucHJvdG90eXBlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJraXRHcmFkaWVudENvbnRhaW5lcjtcblxufSx7XCIuL2dyYWRpZW50Y29udGFpbmVyXCI6OX1dLDI4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbmZ1bmN0aW9uIFhIUih1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG5cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoeGhyLnN0YXR1c1RleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gWEhSO1xuXG59LHt9XX0se30sWzRdKSg0KVxufSk7IiwiXG5cbiMgRG9jdW1lbnRhdGlvbiBvZiB0aGlzIE1vZHVsZTogaHR0cHM6Ly9naXRodWIuY29tL21hcmNrcmVubi9mcmFtZXItRmlyZWJhc2VcbiMgLS0tLS0tIDogLS0tLS0tLSBGaXJlYmFzZSBSRVNUIEFQSTogaHR0cHM6Ly9maXJlYmFzZS5nb29nbGUuY29tL2RvY3MvcmVmZXJlbmNlL3Jlc3QvZGF0YWJhc2UvXG5cbiMgRmlyZWJhc2UgUkVTVCBBUEkgQ2xhc3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBleHBvcnRzLkZpcmViYXNlIGV4dGVuZHMgRnJhbWVyLkJhc2VDbGFzc1xuXG5cblx0QC5kZWZpbmUgXCJzdGF0dXNcIixcblx0XHRnZXQ6IC0+IEBfc3RhdHVzICMgcmVhZE9ubHlcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBwcm9qZWN0SUQgPSBAb3B0aW9ucy5wcm9qZWN0SUQgPz0gbnVsbFxuXHRcdEBzZWNyZXQgICAgPSBAb3B0aW9ucy5zZWNyZXQgICAgPz0gbnVsbFxuXHRcdEBkZWJ1ZyAgICAgPSBAb3B0aW9ucy5kZWJ1ZyAgICAgPz0gZmFsc2Vcblx0XHRAX3N0YXR1cyAgICAgICAgICAgICAgICAgICAgICAgID89IFwiZGlzY29ubmVjdGVkXCJcblxuXHRcdEBzZWNyZXRFbmRQb2ludCA9IGlmIEBzZWNyZXQgdGhlbiBcIj9hdXRoPSN7QHNlY3JldH1cIiBlbHNlIFwiP1wiICMgaG90Zml4XG5cdFx0c3VwZXJcblxuXHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IENvbm5lY3RpbmcgdG8gRmlyZWJhc2UgUHJvamVjdCAnI3tAcHJvamVjdElEfScgLi4uIFxcbiBVUkw6ICdodHRwczovLyN7QHByb2plY3RJRH0uZmlyZWJhc2Vpby5jb20nXCIgaWYgQGRlYnVnXG5cdFx0QC5vbkNoYW5nZSBcImNvbm5lY3Rpb25cIlxuXG5cblx0cmVxdWVzdCA9IChwcm9qZWN0LCBzZWNyZXQsIHBhdGgsIGNhbGxiYWNrLCBtZXRob2QsIGRhdGEsIHBhcmFtZXRlcnMsIGRlYnVnKSAtPlxuXG5cdFx0dXJsID0gXCJodHRwczovLyN7cHJvamVjdH0uZmlyZWJhc2Vpby5jb20je3BhdGh9Lmpzb24je3NlY3JldH1cIlxuXG5cblx0XHR1bmxlc3MgcGFyYW1ldGVycyBpcyB1bmRlZmluZWRcblx0XHRcdGlmIHBhcmFtZXRlcnMuc2hhbGxvdyAgICAgICAgICAgIHRoZW4gdXJsICs9IFwiJnNoYWxsb3c9dHJ1ZVwiXG5cdFx0XHRpZiBwYXJhbWV0ZXJzLmZvcm1hdCBpcyBcImV4cG9ydFwiIHRoZW4gdXJsICs9IFwiJmZvcm1hdD1leHBvcnRcIlxuXG5cdFx0XHRzd2l0Y2ggcGFyYW1ldGVycy5wcmludFxuXHRcdFx0XHR3aGVuIFwicHJldHR5XCIgdGhlbiB1cmwgKz0gXCImcHJpbnQ9cHJldHR5XCJcblx0XHRcdFx0d2hlbiBcInNpbGVudFwiIHRoZW4gdXJsICs9IFwiJnByaW50PXNpbGVudFwiXG5cblx0XHRcdGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmRvd25sb2FkIGlzIFwic3RyaW5nXCJcblx0XHRcdFx0dXJsICs9IFwiJmRvd25sb2FkPSN7cGFyYW1ldGVycy5kb3dubG9hZH1cIlxuXHRcdFx0XHR3aW5kb3cub3Blbih1cmwsXCJfc2VsZlwiKVxuXG5cdFx0XHR1cmwgKz0gXCImb3JkZXJCeT1cIiArICdcIicgKyBwYXJhbWV0ZXJzLm9yZGVyQnkgKyAnXCInIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLm9yZGVyQnkgICAgICBpcyBcInN0cmluZ1wiXG5cdFx0XHRwcmludCB1cmwgKz0gXCImbGltaXRUb0ZpcnN0PSN7cGFyYW1ldGVycy5saW1pdFRvRmlyc3R9XCIgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5saW1pdFRvRmlyc3QgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmxpbWl0VG9MYXN0PSN7cGFyYW1ldGVycy5saW1pdFRvTGFzdH1cIiAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMubGltaXRUb0xhc3QgIGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZzdGFydEF0PSN7cGFyYW1ldGVycy5zdGFydEF0fVwiICAgICAgICAgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLnN0YXJ0QXQgICAgICBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImZW5kQXQ9I3twYXJhbWV0ZXJzLmVuZEF0fVwiICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5lbmRBdCAgICAgICAgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmVxdWFsVG89I3twYXJhbWV0ZXJzLmVxdWFsVG99XCIgICAgICAgICAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMuZXF1YWxUbyAgICAgIGlzIFwibnVtYmVyXCJcblxuXHRcdHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0XG5cdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogTmV3ICcje21ldGhvZH0nLXJlcXVlc3Qgd2l0aCBkYXRhOiAnI3tKU09OLnN0cmluZ2lmeShkYXRhKX0nIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblx0XHR4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSA9PlxuXG5cdFx0XHR1bmxlc3MgcGFyYW1ldGVycyBpcyB1bmRlZmluZWRcblx0XHRcdFx0aWYgcGFyYW1ldGVycy5wcmludCBpcyBcInNpbGVudFwiIG9yIHR5cGVvZiBwYXJhbWV0ZXJzLmRvd25sb2FkIGlzIFwic3RyaW5nXCIgdGhlbiByZXR1cm4gIyB1Z2hcblxuXHRcdFx0c3dpdGNoIHhodHRwLnJlYWR5U3RhdGVcblx0XHRcdFx0d2hlbiAwIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVxdWVzdCBub3QgaW5pdGlhbGl6ZWQgXFxuIFVSTDogJyN7dXJsfSdcIiAgICAgICBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDEgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBTZXJ2ZXIgY29ubmVjdGlvbiBlc3RhYmxpc2hlZCBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gMiB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlcXVlc3QgcmVjZWl2ZWQgXFxuIFVSTDogJyN7dXJsfSdcIiAgICAgICAgICAgICAgaWYgZGVidWdcblx0XHRcdFx0d2hlbiAzIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogUHJvY2Vzc2luZyByZXF1ZXN0IFxcbiBVUkw6ICcje3VybH0nXCIgICAgICAgICAgICBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDRcblx0XHRcdFx0XHRjYWxsYmFjayhKU09OLnBhcnNlKHhodHRwLnJlc3BvbnNlVGV4dCkpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlcXVlc3QgZmluaXNoZWQsIHJlc3BvbnNlOiAnI3tKU09OLnBhcnNlKHhodHRwLnJlc3BvbnNlVGV4dCl9JyBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cblx0XHRcdGlmIHhodHRwLnN0YXR1cyBpcyBcIjQwNFwiXG5cdFx0XHRcdGNvbnNvbGUud2FybiBcIkZpcmViYXNlOiBJbnZhbGlkIHJlcXVlc3QsIHBhZ2Ugbm90IGZvdW5kIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblxuXG5cdFx0eGh0dHAub3BlbihtZXRob2QsIHVybCwgdHJ1ZSlcblx0XHR4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKVxuXHRcdHhodHRwLnNlbmQoZGF0YSA9IFwiI3tKU09OLnN0cmluZ2lmeShkYXRhKX1cIilcblxuXG5cblx0IyBBdmFpbGFibGUgbWV0aG9kc1xuXG5cdGdldDogICAgKHBhdGgsIGNhbGxiYWNrLCAgICAgICBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiR0VUXCIsICAgIG51bGwsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cHV0OiAgICAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldEVuZFBvaW50LCBwYXRoLCBjYWxsYmFjaywgXCJQVVRcIiwgICAgZGF0YSwgcGFyYW1ldGVycywgQGRlYnVnKVxuXHRwb3N0OiAgIChwYXRoLCBkYXRhLCBjYWxsYmFjaywgcGFyYW1ldGVycykgLT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIlBPU1RcIiwgICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHBhdGNoOiAgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiUEFUQ0hcIiwgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0ZGVsZXRlOiAocGF0aCwgY2FsbGJhY2ssICAgICAgIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldEVuZFBvaW50LCBwYXRoLCBjYWxsYmFjaywgXCJERUxFVEVcIiwgbnVsbCwgcGFyYW1ldGVycywgQGRlYnVnKVxuXG5cblxuXHRvbkNoYW5nZTogKHBhdGgsIGNhbGxiYWNrKSAtPlxuXG5cblx0XHRpZiBwYXRoIGlzIFwiY29ubmVjdGlvblwiXG5cblx0XHRcdHVybCA9IFwiaHR0cHM6Ly8je0Bwcm9qZWN0SUR9LmZpcmViYXNlaW8uY29tLy5qc29uI3tAc2VjcmV0RW5kUG9pbnR9XCJcblx0XHRcdGN1cnJlbnRTdGF0dXMgPSBcImRpc2Nvbm5lY3RlZFwiXG5cdFx0XHRzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UodXJsKVxuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcIm9wZW5cIiwgPT5cblx0XHRcdFx0aWYgY3VycmVudFN0YXR1cyBpcyBcImRpc2Nvbm5lY3RlZFwiXG5cdFx0XHRcdFx0QC5fc3RhdHVzID0gXCJjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdGNhbGxiYWNrKFwiY29ubmVjdGVkXCIpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IENvbm5lY3Rpb24gdG8gRmlyZWJhc2UgUHJvamVjdCAnI3tAcHJvamVjdElEfScgZXN0YWJsaXNoZWRcIiBpZiBAZGVidWdcblx0XHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiY29ubmVjdGVkXCJcblxuXHRcdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJlcnJvclwiLCA9PlxuXHRcdFx0XHRpZiBjdXJyZW50U3RhdHVzIGlzIFwiY29ubmVjdGVkXCJcblx0XHRcdFx0XHRALl9zdGF0dXMgPSBcImRpc2Nvbm5lY3RlZFwiXG5cdFx0XHRcdFx0Y2FsbGJhY2soXCJkaXNjb25uZWN0ZWRcIikgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuIFwiRmlyZWJhc2U6IENvbm5lY3Rpb24gdG8gRmlyZWJhc2UgUHJvamVjdCAnI3tAcHJvamVjdElEfScgY2xvc2VkXCIgaWYgQGRlYnVnXG5cdFx0XHRcdGN1cnJlbnRTdGF0dXMgPSBcImRpc2Nvbm5lY3RlZFwiXG5cblxuXHRcdGVsc2VcblxuXHRcdFx0dXJsID0gXCJodHRwczovLyN7QHByb2plY3RJRH0uZmlyZWJhc2Vpby5jb20je3BhdGh9Lmpzb24je0BzZWNyZXRFbmRQb2ludH1cIlxuXHRcdFx0c291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybClcblx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IExpc3RlbmluZyB0byBjaGFuZ2VzIG1hZGUgdG8gJyN7cGF0aH0nIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgQGRlYnVnXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwicHV0XCIsIChldikgPT5cblx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInB1dFwiLCBKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGgsIF8udGFpbChKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGguc3BsaXQoXCIvXCIpLDEpKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVjZWl2ZWQgY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyB2aWEgJ1BVVCc6ICN7SlNPTi5wYXJzZShldi5kYXRhKS5kYXRhfSBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIEBkZWJ1Z1xuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcInBhdGNoXCIsIChldikgPT5cblx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInBhdGNoXCIsIEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aCwgXy50YWlsKEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aC5zcGxpdChcIi9cIiksMSkpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZWNlaXZlZCBjaGFuZ2VzIG1hZGUgdG8gJyN7cGF0aH0nIHZpYSAnUEFUQ0gnOiAje0pTT04ucGFyc2UoZXYuZGF0YSkuZGF0YX0gXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBAZGVidWdcbiIsIiMgTW9kdWxlIGNyZWF0ZWQgYnkgQWFyb24gSmFtZXMgfCBBcHJpbCAxNnRoLCAyMDE2XG4jXG4jIFBvaW50ZXIgTW9kdWxlIGJ5IEpvcmRhbiBEb2Jzb24gaXMgcmVxdWlyZWQgZm9yIHRoaXMgbW9kdWxlXG4jIEluc3RhbGwgdGhpcyBtb2R1bGUgZmlyc3QgaGVyZTogaHR0cDovL2JpdC5seS8xbGdtTnBUXG4jXG4jIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgYXQgdGhlIHRvcCBvZiB5b3VyIHByb2plY3QgdG8gYWNjZXNzIHRoaXMgbW9kdWxlOlxuIyBhbmRyb2lkID0gcmVxdWlyZSBcImFuZHJvaWRSaXBwbGVcIlxuI1xuIyBUbyBhZGQgcmlwcGxlIHRvIGxheWVyLCB1c2UgdGhpcyBsaW5lIG9mIGNvZGU6XG4jIGxheWVyTmFtZS5vbihFdmVudHMuQ2xpY2ssIGFuZHJvaWQucmlwcGxlKVxuIyBSZXBsYWNlIGxheWVyTmFtZSB3aXRoIHRoZSBuYW1lIG9mIHlvdXIgbGF5ZXJcbiNcbiMgQXZhaWxhYmxlIG9wdGlvbnM6XG4jIFlvdSBjYW4gdXNlIGFueSBFdmVudCB3aXRoIHRoaXMgbW9kdWxlXG5cbntQb2ludGVyfSA9IHJlcXVpcmUgXCJQb2ludGVyXCJcblxuIyBjcmVhdGUgcmlwcGxlIGZ1bmN0aW9uXG5leHBvcnRzLlJpcHBsZSA9IChldmVudCwgbGF5ZXIpIC0+XG5cdGV2ZW50Q29vcmRzID0gUG9pbnRlci5vZmZzZXQoZXZlbnQsIGxheWVyKVxuXG5cdCMgQ2hhbmdlIGNvbG9yIG9mIHJpcHBsZVxuXHRjb2xvciA9IFwiYmxhY2tcIlxuXHRhbmltYXRpb24gPSBjdXJ2ZTogXCJlYXNlLW91dFwiLCB0aW1lOiAuNFxuXG5cdCMgQ3JlYXRlIGxheWVycyBvbiBDbGlja1xuXHRwcmVzc0ZlZWRiYWNrID0gbmV3IExheWVyXG5cdFx0c3VwZXJMYXllcjogQFxuXHRcdG5hbWU6IFwicHJlc3NGZWVkYmFja1wiXG5cdFx0d2lkdGg6IGxheWVyLndpZHRoXG5cdFx0aGVpZ2h0OiBsYXllci5oZWlnaHRcblx0XHRvcGFjaXR5OiAwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvclxuXHRwcmVzc0ZlZWRiYWNrLnN0YXRlcy5hZGRcblx0XHRwcmVzc2VkOiBvcGFjaXR5OiAuMDRcblx0cHJlc3NGZWVkYmFjay5zdGF0ZXMuc3dpdGNoKFwicHJlc3NlZFwiLCBhbmltYXRpb24pXG5cblx0cmlwcGxlQ2lyY2xlID0gbmV3IExheWVyXG5cdFx0c3VwZXJMYXllcjogQFxuXHRcdG5hbWU6IFwicmlwcGxlQ2lyY2xlXCJcblx0XHRib3JkZXJSYWRpdXM6IFwiNTAlXCJcblx0XHRtaWRYOiBldmVudENvb3Jkcy54XG5cdFx0bWlkWTogZXZlbnRDb29yZHMueVxuXHRcdG9wYWNpdHk6IC4xNlxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0cmlwcGxlQ2lyY2xlLnN0YXRlcy5hZGRcblx0XHRwcmVzc2VkOiBzY2FsZTogbGF5ZXIud2lkdGggLyA2MCwgb3BhY2l0eTogMCxcblx0cmlwcGxlQ2lyY2xlLnN0YXRlcy5zd2l0Y2goXCJwcmVzc2VkXCIsIGFuaW1hdGlvbilcblxuXHQjIERlc3Ryb3kgbGF5ZXJzIGFmdGVyIENsaWNrXG5cdFV0aWxzLmRlbGF5IDAuMywgLT5cblx0XHRwcmVzc0ZlZWRiYWNrLnN0YXRlcy5uZXh0KFwiZGVmYXVsdFwiLCBhbmltYXRpb24pXG5cdFx0cHJlc3NGZWVkYmFjay5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdFx0cmlwcGxlQ2lyY2xlLmRlc3Ryb3koKVxuXHRcdFx0cHJlc3NGZWVkYmFjay5kZXN0cm95KClcbiIsIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBDcmVhdGVkIGJ5IEpvcmRhbiBSb2JlcnQgRG9ic29uIG9uIDE0IEF1Z3VzdCAyMDE1XG4jIFxuIyBVc2UgdG8gbm9ybWFsaXplIHNjcmVlbiAmIG9mZnNldCB4LHkgdmFsdWVzIGZyb20gY2xpY2sgb3IgdG91Y2ggZXZlbnRzLlxuI1xuIyBUbyBHZXQgU3RhcnRlZC4uLlxuI1xuIyAxLiBQbGFjZSB0aGlzIGZpbGUgaW4gRnJhbWVyIFN0dWRpbyBtb2R1bGVzIGRpcmVjdG9yeVxuI1xuIyAyLiBJbiB5b3VyIHByb2plY3QgaW5jbHVkZTpcbiMgICAgIHtQb2ludGVyfSA9IHJlcXVpcmUgXCJQb2ludGVyXCJcbiNcbiMgMy4gRm9yIHNjcmVlbiBjb29yZGluYXRlczogXG4jICAgICBidG4ub24gRXZlbnRzLkNsaWNrLCAoZXZlbnQsIGxheWVyKSAtPiBwcmludCBQb2ludGVyLnNjcmVlbihldmVudCwgbGF5ZXIpXG4jIFxuIyA0LiBGb3IgbGF5ZXIgb2Zmc2V0IGNvb3JkaW5hdGVzOiBcbiMgICAgIGJ0bi5vbiBFdmVudHMuQ2xpY2ssIChldmVudCwgbGF5ZXIpIC0+IHByaW50IFBvaW50ZXIub2Zmc2V0KGV2ZW50LCBsYXllcilcbiNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5jbGFzcyBleHBvcnRzLlBvaW50ZXJcblxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBQdWJsaWMgTWV0aG9kcyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cblx0QHNjcmVlbiA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0c2NyZWVuQXJndW1lbnRFcnJvcigpIHVubGVzcyBldmVudD8gYW5kIGxheWVyP1xuXHRcdGUgPSBvZmZzZXRDb29yZHMgZXZlbnRcblx0XHRpZiBlLnggYW5kIGUueVxuXHRcdFx0IyBNb3VzZSBFdmVudFxuXHRcdFx0c2NyZWVuQ29vcmRzID0gbGF5ZXIuc2NyZWVuRnJhbWVcblx0XHRcdGUueCArPSBzY3JlZW5Db29yZHMueFxuXHRcdFx0ZS55ICs9IHNjcmVlbkNvb3Jkcy55XG5cdFx0ZWxzZVxuXHRcdFx0IyBUb3VjaCBFdmVudFxuXHRcdFx0ZSA9IGNsaWVudENvb3JkcyBldmVudFxuXHRcdHJldHVybiBlXG5cdFx0XHRcblx0QG9mZnNldCA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0b2Zmc2V0QXJndW1lbnRFcnJvcigpIHVubGVzcyBldmVudD8gYW5kIGxheWVyP1xuXHRcdGUgPSBvZmZzZXRDb29yZHMgZXZlbnRcblx0XHR1bmxlc3MgZS54PyBhbmQgZS55P1xuXHRcdFx0IyBUb3VjaCBFdmVudFxuXHRcdFx0ZSA9IGNsaWVudENvb3JkcyBldmVudFxuXHRcdFx0dGFyZ2V0U2NyZWVuQ29vcmRzID0gbGF5ZXIuc2NyZWVuRnJhbWVcblx0XHRcdGUueCAtPSB0YXJnZXRTY3JlZW5Db29yZHMueFxuXHRcdFx0ZS55IC09IHRhcmdldFNjcmVlbkNvb3Jkcy55XG5cdFx0cmV0dXJuIGVcblx0XG5cdCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHQjIFByaXZhdGUgSGVscGVyIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0XG5cdG9mZnNldENvb3JkcyA9IChldikgIC0+IGUgPSBFdmVudHMudG91Y2hFdmVudCBldjsgcmV0dXJuIGNvb3JkcyBlLm9mZnNldFgsIGUub2Zmc2V0WVxuXHRjbGllbnRDb29yZHMgPSAoZXYpICAtPiBlID0gRXZlbnRzLnRvdWNoRXZlbnQgZXY7IHJldHVybiBjb29yZHMgZS5jbGllbnRYLCBlLmNsaWVudFlcblx0Y29vcmRzICAgICAgID0gKHgseSkgLT4gcmV0dXJuIHg6eCwgeTp5XG5cdFxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBFcnJvciBIYW5kbGVyIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdFxuXHRzY3JlZW5Bcmd1bWVudEVycm9yID0gLT5cblx0XHRlcnJvciBudWxsXG5cdFx0Y29uc29sZS5lcnJvciBcIlwiXCJcblx0XHRcdFBvaW50ZXIuc2NyZWVuKCkgRXJyb3I6IFlvdSBtdXN0IHBhc3MgZXZlbnQgJiBsYXllciBhcmd1bWVudHMuIFxcblxuXHRcdFx0RXhhbXBsZTogbGF5ZXIub24gRXZlbnRzLlRvdWNoU3RhcnQsKGV2ZW50LGxheWVyKSAtPiBQb2ludGVyLnNjcmVlbihldmVudCwgbGF5ZXIpXCJcIlwiXG5cdFx0XHRcblx0b2Zmc2V0QXJndW1lbnRFcnJvciA9IC0+XG5cdFx0ZXJyb3IgbnVsbFxuXHRcdGNvbnNvbGUuZXJyb3IgXCJcIlwiXG5cdFx0XHRQb2ludGVyLm9mZnNldCgpIEVycm9yOiBZb3UgbXVzdCBwYXNzIGV2ZW50ICYgbGF5ZXIgYXJndW1lbnRzLiBcXG5cblx0XHRcdEV4YW1wbGU6IGxheWVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LChldmVudCxsYXllcikgLT4gUG9pbnRlci5vZmZzZXQoZXZlbnQsIGxheWVyKVwiXCJcIiIsImNsYXNzIENhbWVyYUxheWVyIGV4dGVuZHMgVmlkZW9MYXllclxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBjdXN0b21Qcm9wcyA9XG4gICAgICBmYWNpbmc6IHRydWVcbiAgICAgIGZsaXBwZWQ6IHRydWVcbiAgICAgIGF1dG9GbGlwOiB0cnVlXG4gICAgICByZXNvbHV0aW9uOiB0cnVlXG4gICAgICBmaXQ6IHRydWVcblxuICAgIGJhc2VPcHRpb25zID0gT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgIC5maWx0ZXIgKGtleSkgLT4gIWN1c3RvbVByb3BzW2tleV1cbiAgICAgIC5yZWR1Y2UgKGNsb25lLCBrZXkpIC0+XG4gICAgICAgIGNsb25lW2tleV0gPSBvcHRpb25zW2tleV1cbiAgICAgICAgY2xvbmVcbiAgICAgICwge31cblxuICAgIHN1cGVyKGJhc2VPcHRpb25zKVxuXG4gICAgQF9mYWNpbmcgPSBvcHRpb25zLmZhY2luZyA/ICdiYWNrJ1xuICAgIEBfZmxpcHBlZCA9IG9wdGlvbnMuZmxpcHBlZCA/IGZhbHNlXG4gICAgQF9hdXRvRmxpcCA9IG9wdGlvbnMuYXV0b0ZsaXAgPyB0cnVlXG4gICAgQF9yZXNvbHV0aW9uID0gb3B0aW9ucy5yZXNvbHV0aW9uID8gNDgwXG5cbiAgICBAX3N0YXJ0ZWQgPSBmYWxzZVxuICAgIEBfZGV2aWNlID0gbnVsbFxuICAgIEBfbWF0Y2hlZEZhY2luZyA9ICd1bmtub3duJ1xuICAgIEBfc3RyZWFtID0gbnVsbFxuICAgIEBfc2NoZWR1bGVkUmVzdGFydCA9IG51bGxcbiAgICBAX3JlY29yZGluZyA9IG51bGxcblxuICAgIEBiYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnXG4gICAgQGNsaXAgPSB0cnVlXG5cbiAgICBAcGxheWVyLnNyYyA9ICcnXG4gICAgQHBsYXllci5hdXRvcGxheSA9IHRydWVcbiAgICBAcGxheWVyLm11dGVkID0gdHJ1ZVxuICAgIEBwbGF5ZXIuc3R5bGUub2JqZWN0Rml0ID0gb3B0aW9ucy5maXQgPyAnY292ZXInXG5cbiAgQGRlZmluZSAnZmFjaW5nJyxcbiAgICBnZXQ6IC0+IEBfZmFjaW5nXG4gICAgc2V0OiAoZmFjaW5nKSAtPlxuICAgICAgQF9mYWNpbmcgPSBpZiBmYWNpbmcgPT0gJ2Zyb250JyB0aGVuIGZhY2luZyBlbHNlICdiYWNrJ1xuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdmbGlwcGVkJyxcbiAgICBnZXQ6IC0+IEBfZmxpcHBlZFxuICAgIHNldDogKGZsaXBwZWQpIC0+XG4gICAgICBAX2ZsaXBwZWQgPSBmbGlwcGVkXG4gICAgICBAX3NldFJlc3RhcnQoKVxuXG4gIEBkZWZpbmUgJ2F1dG9GbGlwJyxcbiAgICBnZXQ6IC0+IEBfYXV0b0ZsaXBcbiAgICBzZXQ6IChhdXRvRmxpcCkgLT5cbiAgICAgIEBfYXV0b0ZsaXAgPSBhdXRvRmxpcFxuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdyZXNvbHV0aW9uJyxcbiAgICBnZXQ6IC0+IEBfcmVzb2x1dGlvblxuICAgIHNldDogKHJlc29sdXRpb24pIC0+XG4gICAgICBAX3Jlc29sdXRpb24gPSByZXNvbHV0aW9uXG4gICAgICBAX3NldFJlc3RhcnQoKVxuXG4gIEBkZWZpbmUgJ2ZpdCcsXG4gICAgZ2V0OiAtPiBAcGxheWVyLnN0eWxlLm9iamVjdEZpdFxuICAgIHNldDogKGZpdCkgLT4gQHBsYXllci5zdHlsZS5vYmplY3RGaXQgPSBmaXRcblxuICBAZGVmaW5lICdpc1JlY29yZGluZycsXG4gICAgZ2V0OiAtPiBAX3JlY29yZGluZz8ucmVjb3JkZXIuc3RhdGUgPT0gJ3JlY29yZGluZydcblxuICB0b2dnbGVGYWNpbmc6IC0+XG4gICAgQF9mYWNpbmcgPSBpZiBAX2ZhY2luZyA9PSAnZnJvbnQnIHRoZW4gJ2JhY2snIGVsc2UgJ2Zyb250J1xuICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgY2FwdHVyZTogKHdpZHRoID0gQHdpZHRoLCBoZWlnaHQgPSBAaGVpZ2h0LCByYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSAtPlxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbiAgICBjYW52YXMud2lkdGggPSByYXRpbyAqIHdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IHJhdGlvICogaGVpZ2h0XG5cbiAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuICAgIEBkcmF3KGNvbnRleHQpXG5cbiAgICB1cmwgPSBjYW52YXMudG9EYXRhVVJMKClcbiAgICBAZW1pdCgnY2FwdHVyZScsIHVybClcblxuICAgIHVybFxuXG4gIGRyYXc6IChjb250ZXh0KSAtPlxuICAgIHJldHVybiB1bmxlc3MgY29udGV4dFxuXG4gICAgY292ZXIgPSAoc3JjVywgc3JjSCwgZHN0VywgZHN0SCkgLT5cbiAgICAgIHNjYWxlWCA9IGRzdFcgLyBzcmNXXG4gICAgICBzY2FsZVkgPSBkc3RIIC8gc3JjSFxuICAgICAgc2NhbGUgPSBpZiBzY2FsZVggPiBzY2FsZVkgdGhlbiBzY2FsZVggZWxzZSBzY2FsZVlcbiAgICAgIHdpZHRoOiBzcmNXICogc2NhbGUsIGhlaWdodDogc3JjSCAqIHNjYWxlXG5cbiAgICB7dmlkZW9XaWR0aCwgdmlkZW9IZWlnaHR9ID0gQHBsYXllclxuXG4gICAgY2xpcEJveCA9IHdpZHRoOiBjb250ZXh0LmNhbnZhcy53aWR0aCwgaGVpZ2h0OiBjb250ZXh0LmNhbnZhcy5oZWlnaHRcbiAgICBsYXllckJveCA9IGNvdmVyKEB3aWR0aCwgQGhlaWdodCwgY2xpcEJveC53aWR0aCwgY2xpcEJveC5oZWlnaHQpXG4gICAgdmlkZW9Cb3ggPSBjb3Zlcih2aWRlb1dpZHRoLCB2aWRlb0hlaWdodCwgbGF5ZXJCb3gud2lkdGgsIGxheWVyQm94LmhlaWdodClcblxuICAgIHggPSAoY2xpcEJveC53aWR0aCAtIHZpZGVvQm94LndpZHRoKSAvIDJcbiAgICB5ID0gKGNsaXBCb3guaGVpZ2h0IC0gdmlkZW9Cb3guaGVpZ2h0KSAvIDJcblxuICAgIGNvbnRleHQuZHJhd0ltYWdlKEBwbGF5ZXIsIHgsIHksIHZpZGVvQm94LndpZHRoLCB2aWRlb0JveC5oZWlnaHQpXG5cbiAgc3RhcnQ6IC0+XG4gICAgQF9lbnVtZXJhdGVEZXZpY2VzKClcbiAgICAudGhlbiAoZGV2aWNlcykgPT5cbiAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlciAoZGV2aWNlKSAtPiBkZXZpY2Uua2luZCA9PSAndmlkZW9pbnB1dCdcblxuICAgICAgZm9yIGRldmljZSBpbiBkZXZpY2VzXG4gICAgICAgIGlmIGRldmljZS5sYWJlbC5pbmRleE9mKEBfZmFjaW5nKSAhPSAtMVxuICAgICAgICAgIEBfbWF0Y2hlZEZhY2luZyA9IEBfZmFjaW5nXG4gICAgICAgICAgcmV0dXJuIGRldmljZVxuXG4gICAgICBAX21hdGNoZWRGYWNpbmcgPSAndW5rbm93bidcblxuICAgICAgaWYgZGV2aWNlcy5sZW5ndGggPiAwIHRoZW4gZGV2aWNlc1swXSBlbHNlIFByb21pc2UucmVqZWN0KClcblxuICAgIC50aGVuIChkZXZpY2UpID0+XG4gICAgICByZXR1cm4gaWYgIWRldmljZSB8fCBkZXZpY2UuZGV2aWNlSWQgPT0gQF9kZXZpY2U/LmRldmljZUlkXG5cbiAgICAgIEBzdG9wKClcbiAgICAgIEBfZGV2aWNlID0gZGV2aWNlXG5cbiAgICAgIGNvbnN0cmFpbnRzID1cbiAgICAgICAgdmlkZW86XG4gICAgICAgICAgbWFuZGF0b3J5OiB7bWluV2lkdGg6IEBfcmVzb2x1dGlvbiwgbWluSGVpZ2h0OiBAX3Jlc29sdXRpb259XG4gICAgICAgICAgb3B0aW9uYWw6IFt7c291cmNlSWQ6IEBfZGV2aWNlLmRldmljZUlkfV1cbiAgICAgICAgYXVkaW86XG4gICAgICAgICAgdHJ1ZVxuXG4gICAgICBAX2dldFVzZXJNZWRpYShjb25zdHJhaW50cylcblxuICAgIC50aGVuIChzdHJlYW0pID0+XG4gICAgICBAcGxheWVyLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKVxuICAgICAgQF9zdGFydGVkID0gdHJ1ZVxuICAgICAgQF9zdHJlYW0gPSBzdHJlYW1cbiAgICAgIEBfZmxpcCgpXG5cbiAgICAuY2F0Y2ggKGVycm9yKSAtPlxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcblxuICBzdG9wOiAtPlxuICAgIEBfc3RhcnRlZCA9IGZhbHNlXG5cbiAgICBAcGxheWVyLnBhdXNlKClcbiAgICBAcGxheWVyLnNyYyA9ICcnXG5cbiAgICBAX3N0cmVhbT8uZ2V0VHJhY2tzKCkuZm9yRWFjaCAodHJhY2spIC0+IHRyYWNrLnN0b3AoKVxuICAgIEBfc3RyZWFtID0gbnVsbFxuICAgIEBfZGV2aWNlID0gbnVsbFxuXG4gICAgaWYgQF9zY2hlZHVsZWRSZXN0YXJ0XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShAX3NjaGVkdWxlZFJlc3RhcnQpXG4gICAgICBAX3NjaGVkdWxlZFJlc3RhcnQgPSBudWxsXG5cbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgaWYgQF9yZWNvcmRpbmdcbiAgICAgIEBfcmVjb3JkaW5nLnJlY29yZGVyLnN0b3AoKVxuICAgICAgQF9yZWNvcmRpbmcgPSBudWxsXG5cbiAgICBjaHVua3MgPSBbXVxuXG4gICAgcmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcihAX3N0cmVhbSwge21pbWVUeXBlOiAndmlkZW8vd2VibSd9KVxuICAgIHJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIgJ3N0YXJ0JywgKGV2ZW50KSA9PiBAZW1pdCgnc3RhcnRyZWNvcmRpbmcnKVxuICAgIHJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIgJ2RhdGFhdmFpbGFibGUnLCAoZXZlbnQpIC0+IGNodW5rcy5wdXNoKGV2ZW50LmRhdGEpXG4gICAgcmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lciAnc3RvcCcsIChldmVudCkgPT5cbiAgICAgIGJsb2IgPSBuZXcgQmxvYihjaHVua3MpXG4gICAgICB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgICAgQGVtaXQoJ3N0b3ByZWNvcmRpbmcnKVxuICAgICAgQGVtaXQoJ3JlY29yZCcsIHVybClcblxuICAgIHJlY29yZGVyLnN0YXJ0KClcblxuICAgIEBfcmVjb3JkaW5nID0ge3JlY29yZGVyLCBjaHVua3N9XG5cbiAgc3RvcFJlY29yZGluZzogLT5cbiAgICByZXR1cm4gaWYgIUBfcmVjb3JkaW5nXG4gICAgQF9yZWNvcmRpbmcucmVjb3JkZXIuc3RvcCgpXG4gICAgQF9yZWNvcmRpbmcgPSBudWxsXG5cbiAgb25DYXB0dXJlOiAoY2FsbGJhY2spIC0+IEBvbignY2FwdHVyZScsIGNhbGxiYWNrKVxuICBvblN0YXJ0UmVjb3JkaW5nOiAoY2FsbGJhY2spIC0+IEBvbignc3RhcnRyZWNvcmRpbmcnLCBjYWxsYmFjaylcbiAgb25TdG9wUmVjb3JkaW5nOiAoY2FsbGJhY2spIC0+IEBvbignc3RvcHJlY29yZGluZycsIGNhbGxiYWNrKVxuICBvblJlY29yZDogKGNhbGxiYWNrKSAtPiBAb24oJ3JlY29yZCcsIGNhbGxiYWNrKVxuXG4gIF9zZXRSZXN0YXJ0OiAtPlxuICAgIHJldHVybiBpZiAhQF9zdGFydGVkIHx8IEBfc2NoZWR1bGVkUmVzdGFydFxuXG4gICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0+XG4gICAgICBAX3NjaGVkdWxlZFJlc3RhcnQgPSBudWxsXG4gICAgICBAc3RhcnQoKVxuXG4gIF9mbGlwOiAtPlxuICAgIEBfZmxpcHBlZCA9IEBfbWF0Y2hlZEZhY2luZyA9PSAnZnJvbnQnIGlmIEBfYXV0b0ZsaXBcbiAgICB4ID0gaWYgQF9mbGlwcGVkIHRoZW4gLTEgZWxzZSAxXG4gICAgQHBsYXllci5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcInNjYWxlKCN7eH0sIDEpXCJcblxuICBfZW51bWVyYXRlRGV2aWNlczogLT5cbiAgICB0cnlcbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXG4gICAgY2F0Y2hcbiAgICAgIFByb21pc2UucmVqZWN0KClcblxuICBfZ2V0VXNlck1lZGlhOiAoY29uc3RyYWludHMpIC0+XG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgIHRyeVxuICAgICAgICBndW0gPSBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWFcbiAgICAgICAgZ3VtLmNhbGwobmF2aWdhdG9yLCBjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgY2F0Y2hcbiAgICAgICAgcmVqZWN0KClcblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmFMYXllciBpZiBtb2R1bGU/XG5GcmFtZXIuQ2FtZXJhTGF5ZXIgPSBDYW1lcmFMYXllclxuIiwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIEF1dG9Hcm93IFRleHRhcmVhXG4jIEJ5IEJsYWluZSBCaWxsaW5nc2xleSBNYXkgMjksIDIwMTZcbiNcbiMgRnJhbmtlbnN0ZWluZWQgaGVhdmlseSBmcm9tIEpvcmRhbiBEb2Jzb24ncyBJbnB1dEZpZWxkIHN0dWZmIFxuIyBhbmQgdGhlIGpRdWVyeSBBdXRvZ3JvdyBwbHVnaW4uXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuIyBBZnRlciBhZGRpbmcgdGhlIG1vZHVsZSwgYWRkIHRoaXMgdG8geW91ciBGcmFtZXIgcHJvdG90eXBlOlxuIyB7QXV0b0dyb3dJbnB1dH0gPSByZXF1aXJlIFwiQXV0b0dyb3dJbnB1dFwiXG5cbiMgVGhlbiB5b3UgY2FuIHdyaXRlIGNvb2wgc3R1ZmYgbGlrZTpcbiMgdGV4dCA9IG5ldyBBdXRvR3Jvd0lucHV0XG4jICAgcmVmbG93U2libGluZ3M6IHRydWUgb3IgZmFsc2UsIHdpbGwgbW92ZSBzdHVmZiB1bmRlciBpdCBhcyBpdCBjaGFuZ2VzIGhlaWdodC5cbiMgICByZXNpemVQYXJlbnQ6IHRydWUgb3IgZmFsc2UsIHdpbGwgcmVzaXplIHRoZSBwYXJlbnQgaWYgdGhpbmdzIGdldCB0b28gbG9uZy5cbiMgICBwYWRkaW5nOiBleDogXCIxNnB4IDE2cHggMzZweCAxNnB4XCIgLSBqdXN0IGEgQ1NTIGRlY2xhcmF0aW9uIGZvciBhbnkgcGFkZGluZyB5b3UnZCBsaWtlLlxuIyAgIHBsYWNlSG9sZGVyOiBleDogXCJUeXBlIHlvdXIgY29tbWVudHNcIiAtIHdoYXRldmVyIHlvdSB3YW50IHRoZSBwbGFjZWhvbGRlciB0ZXh0IHRvIGJlLlxuIyAgIHZhbHVlOiBleDogXCJTaWx0IGlzLi4uXCIgLSBzdGFydGVyIHZhbHVlIGlmIHlvdSB3YW50IHRleHQgYWxyZWFkeSBpbiB0aGVyZS5cblxuXG5cbmNsYXNzIGV4cG9ydHMuQXV0b0dyb3dJbnB1dCBleHRlbmRzIExheWVyXG5cbiAgIyBFdmVudHNcbiAgRXZlbnRzLklucHV0ICAgPSBcIkF1dG9Hcm93SW5wdXQuT25JbnB1dFwiXG4gIEV2ZW50cy5Gb2N1cyAgID0gXCJBdXRvR3Jvd0lucHV0Lk9uRm9jdXNcIlxuICBFdmVudHMuQmx1ciAgICA9IFwiQXV0b0dyb3dJbnB1dC5PbkJsdXJcIlxuICBcbiAgY29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cbiAgICBAcGFyZW50T2dIZWlnaHQgPSBudWxsXG4gICAgQG9wdGlvbnMubGluZUhlaWdodCA9IFwiI3tAb3B0aW9ucy5saW5lSGVpZ2h0fXB4XCIgaWYgQG9wdGlvbnMubGluZUhlaWdodD9cblxuICAgICMgRnJhbWVyIExheWVyIFByb3BzXG4gICAgQG9wdGlvbnMubGluZUhlaWdodCAgICAgICA/PSBcIjQ4cHhcIlxuICAgIEBvcHRpb25zLm5hbWUgICAgICAgICAgICAgPz0gXCJBdXRvR3Jvd0lucHV0XCJcbiAgICBAb3B0aW9ucy5jb2xvciAgICAgICAgICAgID89IFwiIzIxMjEyMVwiXG4gICAgQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yICA/PSBcIndoaXRlXCJcbiAgICBAb3B0aW9ucy5oZWlnaHQgICAgICAgICAgID89IDIwMFxuICAgIEBvcHRpb25zLmJvcmRlclJhZGl1cyAgICAgPz0gMFxuICAgIEBvcHRpb25zLndpZHRoICAgICAgICAgICAgPz0gNDAwXG5cbiAgICAjIEN1c3RvbSBMYXllciBQcm9wcyAgICBcbiAgICBAb3B0aW9ucy5mb250U2l6ZSAgICAgICAgICAgICA/PSAzMlxuICAgIEBvcHRpb25zLmZvbnRXZWlnaHQgICAgICAgICAgID89IDMwMFxuICAgIEBvcHRpb25zLnBhZGRpbmcgICAgICAgICAgICAgID89IFwiMFwiXG4gICAgQG9wdGlvbnMuZm9udEZhbWlseSAgICAgICAgICAgPz0gXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EgTmV1ZVwiXG4gICAgQG9wdGlvbnMubWluSGVpZ2h0ICAgICAgICAgICAgPz0gQC5vcHRpb25zLmhlaWdodFxuICAgIEBvcHRpb25zLnBsYWNlSG9sZGVyICAgICAgICAgID89IFwiVHlwZSBzb21ldGhpbmdcIlxuICAgIEBvcHRpb25zLnJlc2l6ZVBhcmVudCAgICAgICAgID89IGZhbHNlXG4gICAgQG9wdGlvbnMucGFyZW50Qm90dG9tUGFkZGluZyAgPz0gMFxuICAgIEBvcHRpb25zLnJlZmxvd1NpYmxpbmdzICAgICAgID89IGZhbHNlXG5cbiAgICBzdXBlciBAb3B0aW9uc1xuICAgIGlmIEBvcHRpb25zLnJlc2l6ZVBhcmVudCA9PSB0cnVlIHRoZW4gQHBhcmVudE9nSGVpZ2h0ID0gQG9wdGlvbnMucGFyZW50LmhlaWdodFxuICAgIFxuICAgICNDcmVhdGUgdGhlIHRleHRhcmVhXG4gICAgQHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInRleHRhcmVhXCJcbiAgICBcbiAgICAjIEdpdmUgaXQgdGhlIGNvbnRlbnQgaWYgc29tZSBpcyBkZWZpbmVkXG4gICAgQHRleHRhcmVhLnZhbHVlID0gQG9wdGlvbnMudmFsdWUgaWYgQG9wdGlvbnMudmFsdWU/XG4gICAgQHRleHRhcmVhLnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXIgaWYgQG9wdGlvbnMucGxhY2VIb2xkZXI/XG4gICAgXG4gICAgIyBBZGQgaXQgdG8gdGhlIEZyYW1lciBMYXllclxuICAgIEBfZWxlbWVudC5hcHBlbmRDaGlsZCBAdGV4dGFyZWFcblxuICAgICNEZWZpbmUgc3R5bGVzIGZvciB0aGUgdGV4dGFyZWFcbiAgICBAX3RleHRBcmVhU3R5bGUgPVxuICAgICAgZm9udDogXCIje0BvcHRpb25zLmZvbnRXZWlnaHR9ICN7QG9wdGlvbnMuZm9udFNpemV9cHgvI3tAb3B0aW9ucy5saW5lSGVpZ2h0fSAje0BvcHRpb25zLmZvbnRGYW1pbHl9XCJcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuICAgICAgaGVpZ2h0OiBcIjEwMCVcIlxuICAgICAgd2lkdGg6ICBcIjEwMCVcIlxuICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCJcbiAgICAgIHJlc2l6ZTogXCJub25lXCJcbiAgICAgIHBhZGRpbmcgOiBAb3B0aW9ucy5wYWRkaW5nXG4gICAgICBtYXJnaW46IFwiMFwiXG4gICAgICBcIi13ZWJraXQtYXBwZWFyYW5jZVwiOiBcIm5vbmVcIlxuICAgICAgXCJib3gtc2l6aW5nXCIgOiBcImJvcmRlci1ib3hcIlxuXG4gICAgIyBBZGQgdGhvc2Ugc3R5bGVzIHRvIHRoZSB0ZXh0YXJlYVxuICAgIEB0ZXh0YXJlYS5zdHlsZVtrZXldICA9IHZhbCBmb3Iga2V5LCB2YWwgb2YgQF90ZXh0QXJlYVN0eWxlXG4gICAgQHRleHRhcmVhLnN0eWxlLmNvbG9yID0gQG9wdGlvbnMuY29sb3IgaWYgQG9wdGlvbnMuY29sb3I/XG5cbiAgICAjVXBkYXRlIHRoZSBoZWlnaHQgd2hlbmV2ZXIgYW55dGhpbmcgY2hhbmdlcy5cbiAgICBAdGV4dGFyZWEub25rZXlkb3duID0gPT4gQF91cGRhdGUoKVxuICAgIEB0ZXh0YXJlYS5vbmtleXVwID0gPT4gQF91cGRhdGUoKVxuICAgIEB0ZXh0YXJlYS5jaGFuZ2UgPSA9PiBAX3VwZGF0ZSgpXG4gICAgQHRleHRhcmVhLm9uZm9jdXMgPSA9PlxuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwXG4gICAgICBAZW1pdChFdmVudHMuRm9jdXMsIEB0ZXh0YXJlYS52YWx1ZSwgQClcblxuICAgIEB0ZXh0YXJlYS5vbmJsdXIgID0gPT5cbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMFxuICAgICAgdW5sZXNzIEB0ZXh0YXJlYS5wbGFjZWhvbGRlciBpcyBAb3B0aW9ucy5wbGFjZUhvbGRlciBvciAhQG9wdGlvbnMucGxhY2VIb2xkZXI/XG4gICAgICAgIEB0ZXh0YXJlYS5wbGFjZWhvbGRlciA9IEBvcHRpb25zLnBsYWNlSG9sZGVyXG4gICAgICBAZW1pdChFdmVudHMuQmx1ciwgQHRleHRhcmVhLnZhbHVlLCBAKVxuXG4gICAgQHRleHRhcmVhLm9uaW5wdXQgPSA9PlxuICAgICAgQGlzRW1wdHkgPSAhKCBAdGV4dGFyZWEudmFsdWU/Lmxlbmd0aCA+IDApXG4gICAgICBAZW1pdChFdmVudHMuSW5wdXQsIEB0ZXh0YXJlYS52YWx1ZSwgQClcbiAgICBcbiAgX3Jlc2l6ZVBhcmVudCA9IChsYXllciwgcGFyZW50TWluSGVpZ2h0LCBib3R0b21QYWRkaW5nKSAtPlxuICAgICMgVmFyaWFibGUgZm9yIHBhcmVudFxuICAgIGxheWVyUGFyZW50ID0gbGF5ZXIucGFyZW50XG4gICAgXG4gICAgIyBBcnJheSB0byBzdG9yZSBhbGwgY2hpbGRyZW4ncyBtYXhZc1xuICAgIGFsbENoaWxkcmVuTWF4WXMgPSBbXVxuICAgIFxuICAgICMgUHVzaCBlYWNoIG1heFkgdG8gYW4gYXJyYXlcbiAgICBmb3IgbWF4IGluIGxheWVyUGFyZW50LmNoaWxkcmVuXG4gICAgICBhbGxDaGlsZHJlbk1heFlzLnB1c2gobWF4Lm1heFkpXG4gICAgICBcbiAgICAjIEZpbmQgdGhlIGJvdHRvbS1tb3N0IG1heFkgdmFsdWVcbiAgICB0YWxsZXN0Q2hpbGRNYXhZID0gTWF0aC5tYXguYXBwbHkobnVsbCwgYWxsQ2hpbGRyZW5NYXhZcylcbiAgICBcbiAgICAjIFN0b3JlIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBib3R0b20gb2YgdGhhdCBhbmQgdGhlIHBhcmVudCBsYXllclxuICAgIGxheWVyUGFyZW50LmhlaWdodCA9IE1hdGgubWF4KHRhbGxlc3RDaGlsZE1heFkgKyBib3R0b21QYWRkaW5nLCBwYXJlbnRNaW5IZWlnaHQpXG4gICAgXG4gICAgIyBUT0RPIC0gTWFpbnRhaW4gdGhlIGJvdHRvbSBwYWRkaW5nIG9mIHRoZSBwYXJlbnQuXG4gICAgXG4gICMgUmVmbG93IGFsbCB0aGUgc2libGluZ3MgdW5kZXIgdGhlIHRleHQgbGF5ZXJcbiAgX3JlZmxvd1NpYmxpbmdzID0gKGxheWVyLCBsYXllck1heFkpIC0+XG4gICAgbGF5ZXJMaXN0ID0gbGF5ZXIucGFyZW50LmNoaWxkcmVuXG4gICAgZm9yIGEgaW4gW2xheWVyTGlzdC5pbmRleE9mKGxheWVyKSsxLi4ubGF5ZXJMaXN0Lmxlbmd0aF1cbiAgICAgIHlEaWZmID0gbGF5ZXJMaXN0W2FdLnkgLSBsYXllck1heFlcbiAgICAgIGxheWVyTGlzdFthXS55ID0gbGF5ZXIubWF4WSArIHlEaWZmXG4gICAgIyBUT0RPIC0gcmVkbyB0aGlzIHdpdGhvdXQgdGhlIGFzc3VtcHRpb24gdGhhdCBhbGwgc2libGluZ3MgYWZ0ZXIgdGhlIGxheWVyIGFyZSBiZWxvdyBpdC5cbiAgICAgIFxuICAjIFVwZGF0ZSBoZWlnaHQgZnVuY3Rpb25cbiAgX3VwZGF0ZTogPT5cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBsYXllck1heFkgPSBALm1heFlcbiAgICAgICMgQWRkIGJhY2sgYW55IGxpbmUgYnJlYWtzIHRoYXQgdGhlIHZhbHVlIG1ldGhvZCBnZXRzIHJpZGUgb2ZcbiAgICAgIF90cnVlVmFsdWUgPSBAdGV4dGFyZWEudmFsdWUucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+Jm5ic3A7XCIpO1xuICAgICAgXG4gICAgICAjIElmIGl0J3MgZW1wdHksIG1ha2Ugc3VyZSB0aGVyZSdzIGEgbGV0dGVyIGluIHRoZXJlIHRvIGNhbGN1bGF0ZSAqc29tZXRoaW5nKlxuICAgICAgaWYgX3RydWVWYWx1ZS50cmltKCkgPT0gXCJcIiB0aGVuIF90cnVlVmFsdWUgPSBcImFcIlxuICAgICAgXG4gICAgICAjIENhbGN1bGF0ZSB0aGUgaGVpZ2h0ISEhXG4gICAgICBjYWxjSGVpZ2h0ID0gVXRpbHMucm91bmQoVXRpbHMudGV4dFNpemUoX3RydWVWYWx1ZSwgQF90ZXh0QXJlYVN0eWxlLCB7d2lkdGg6IEAud2lkdGh9KS5oZWlnaHQsIDApXG4gICAgICBcbiAgICAgICMgU2V0IHRoZSBoZWlnaHQgdG8gZWl0aGVyIHRoZSBjYWxjdWxhdGVkIGhlaWdodCwgb3IgdGhlIG1pbkhlaWdodCwgd2hpY2hldmVyIGlzIGdyZWF0ZXIuXG4gICAgICBALmhlaWdodCA9IE1hdGgubWF4KGNhbGNIZWlnaHQsIEBvcHRpb25zLm1pbkhlaWdodClcbiAgICAgIGlmIEBvcHRpb25zLnJlZmxvd1NpYmxpbmdzID09IHRydWUgdGhlbiBfcmVmbG93U2libGluZ3MoQCwgbGF5ZXJNYXhZKVxuICAgICAgaWYgQG9wdGlvbnMucmVzaXplUGFyZW50ID09IHRydWUgdGhlbiBfcmVzaXplUGFyZW50KEAsIEBwYXJlbnRPZ0hlaWdodCwgQG9wdGlvbnMucGFyZW50Qm90dG9tUGFkZGluZylcblxuI090aGVyIGlkZWFzIFxuIyBUT0RPOiBJZiB0aGUgaGVpZ2h0IGlzIHNldCB0YWxsZXIgdGhhbiB0aGUgbWluaGVpZ2h0IG9wdGlvbiwgd2hlbiB5b3UgdHlwZSBpdCBnbGl0Y2hlcyB0byB0aGUgbWluSGVpZ2h0IG9wdGlvbi5cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBUUFBO0FEcUJBLElBQUE7Ozs7QUFBTSxPQUFPLENBQUM7QUFHWixNQUFBOzs7O0VBQUEsTUFBTSxDQUFDLEtBQVAsR0FBaUI7O0VBQ2pCLE1BQU0sQ0FBQyxLQUFQLEdBQWlCOztFQUNqQixNQUFNLENBQUMsSUFBUCxHQUFpQjs7RUFFSix1QkFBQyxPQUFEO0FBQ1gsUUFBQTtJQURZLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztJQUNyQixJQUFDLENBQUEsY0FBRCxHQUFrQjtJQUNsQixJQUFvRCwrQkFBcEQ7TUFBQSxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsR0FBeUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFWLEdBQXFCLEtBQTdDOzs7VUFHUSxDQUFDLGFBQW9COzs7V0FDckIsQ0FBQyxPQUFvQjs7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QyxJQUFyQixDQUE1RCxHQUFzRixZQUF0RixHQUFrRyxHQUFsRyxHQUFzRyxHQUFsSCxFQUFBOztRQUZnQztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakMsRUEvQkQ7O0VBSFM7Ozs7R0EvRW9CLE1BQU0sQ0FBQzs7Ozs7QURQdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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
