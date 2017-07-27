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


},{}],"firebase":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aXRhY2hlbi9Eb2N1bWVudHMvU1AyMDE3L3ZpdmlkL3ZpdmlkLmZyYW1lci9tb2R1bGVzL2h0bWwyY2FudmFzLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9maXJlYmFzZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aXRhY2hlbi9Eb2N1bWVudHMvU1AyMDE3L3ZpdmlkL3ZpdmlkLmZyYW1lci9tb2R1bGVzL0NhbWVyYUxheWVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvQXV0b0dyb3dJbnB1dC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJleHBvcnRzLmtleWJvYXJkTGF5ZXIgPSBuZXcgTGF5ZXJcblx0eDowLCB5OlNjcmVlbi5oZWlnaHQsIHdpZHRoOlNjcmVlbi53aWR0aCwgaGVpZ2h0OjQzMlxuXHRodG1sOlwiPGltZyBzdHlsZT0nd2lkdGg6IDEwMCU7JyBzcmM9J21vZHVsZXMva2V5Ym9hcmQucG5nJy8+XCJcblxuI3NjcmVlbiB3aWR0aCB2cy4gc2l6ZSBvZiBpbWFnZSB3aWR0aFxuZ3Jvd3RoUmF0aW8gPSBTY3JlZW4ud2lkdGggLyA3MzJcbmltYWdlSGVpZ2h0ID0gZ3Jvd3RoUmF0aW8gKiA0MzJcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcyA9XG5cdHNob3duOiBcblx0XHR5OiBTY3JlZW4uaGVpZ2h0IC0gaW1hZ2VIZWlnaHRcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0Y3VydmU6IFwic3ByaW5nKDUwMCw1MCwxNSlcIlxuXG5jbGFzcyBleHBvcnRzLklucHV0IGV4dGVuZHMgTGF5ZXJcblx0QGRlZmluZSBcInN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQuc3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdF8uZXh0ZW5kIEBpbnB1dC5zdHlsZSwgdmFsdWVcblxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGlucHV0LnZhbHVlID0gdmFsdWVcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNldHVwID89IGZhbHNlXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmNsaXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmhlaWdodCA/PSA2MFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcInJnYmEoMjU1LCA2MCwgNDcsIC41KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAzMFxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAzMFxuXHRcdG9wdGlvbnMucGFkZGluZyA/PSAxMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlwiXG5cdFx0b3B0aW9ucy5wbGFjZWhvbGRlciA/PSBcIlwiXG5cdFx0b3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgPz0gaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXHRcdG9wdGlvbnMudHlwZSA/PSBcInRleHRcIlxuXHRcdG9wdGlvbnMuZ29CdXR0b24gPz0gZmFsc2Vcblx0XHRvcHRpb25zLmF1dG9Db3JyZWN0ID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NvbXBsZXRlID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NhcGl0YWxpemUgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5zcGVsbENoZWNrID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b2ZvY3VzID89IGZhbHNlXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAcGxhY2Vob2xkZXJDb2xvciA9IG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvciBpZiBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3I/XG5cdFx0QGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImlucHV0XCJcblx0XHRAaW5wdXQuaWQgPSBcImlucHV0LSN7Xy5ub3coKX1cIlxuXHRcdEBpbnB1dC5zdHlsZS5jc3NUZXh0ID0gXCJvdXRsaW5lOiBub25lOyBmb250LXNpemU6ICN7b3B0aW9ucy5mb250U2l6ZX1weDsgbGluZS1oZWlnaHQ6ICN7b3B0aW9ucy5saW5lSGVpZ2h0fXB4OyBwYWRkaW5nOiAje29wdGlvbnMucGFkZGluZ31weDsgd2lkdGg6ICN7b3B0aW9ucy53aWR0aH1weDsgaGVpZ2h0OiAje29wdGlvbnMuaGVpZ2h0fXB4OyBib3JkZXI6IG5vbmU7IGJhY2tncm91bmQtaW1hZ2U6IHVybChhYm91dDpibGFuayk7IGJhY2tncm91bmQtY29sb3I6ICN7b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3J9O1wiXG5cdFx0QGlucHV0LnZhbHVlID0gb3B0aW9ucy50ZXh0XG5cdFx0QGlucHV0LnR5cGUgPSBvcHRpb25zLnR5cGVcblx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb3JyZWN0XCIsIG9wdGlvbnMuYXV0b0NvcnJlY3Rcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NvbXBsZXRlXCIsIG9wdGlvbnMuYXV0b0NvbXBsZXRlXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jYXBpdGFsaXplXCIsIG9wdGlvbnMuYXV0b0NhcGl0YWxpemVcblx0XHRpZiBvcHRpb25zLmF1dG9mb2N1cyA9PSB0cnVlXG5cdFx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2ZvY3VzXCIsIHRydWVcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwic3BlbGxjaGVja1wiLCBvcHRpb25zLnNwZWxsQ2hlY2tcblx0XHRAZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJmb3JtXCJcblxuXHRcdGlmIG9wdGlvbnMuZ29CdXR0b25cblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZUN5Y2xlKClcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuIiwiLypcbiAgaHRtbDJjYW52YXMgMC41LjAtYmV0YTMgPGh0dHA6Ly9odG1sMmNhbnZhcy5oZXJ0emVuLmNvbT5cbiAgQ29weXJpZ2h0IChjKSAyMDE2IE5pa2xhcyB2b24gSGVydHplblxuXG4gIFJlbGVhc2VkIHVuZGVyICBMaWNlbnNlXG4qL1xuXG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5odG1sMmNhbnZhcz1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qISBodHRwOi8vbXRocy5iZS9wdW55Y29kZSB2MS4yLjQgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXiAtfl0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvXFx4MkV8XFx1MzAwMnxcXHVGRjBFfFxcdUZGNjEvZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0XHRhcnJheVtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3MuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0cmV0dXJuIG1hcChzdHJpbmcuc3BsaXQocmVnZXhTZXBhcmF0b3JzKSwgZm4pLmpvaW4oJy4nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGRlY29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgY291bnRlciA9IDAsXG5cdFx0ICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG5cdFx0ICAgIHZhbHVlLFxuXHRcdCAgICBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmRlY29kZWBcblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZW5jb2RlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvZGVQb2ludHMgVGhlIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHRyZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuXHQgKiBAc2VlIGBkaWdpdFRvQmFzaWMoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQgKGZvciB1c2UgaW5cblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuXHQgKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0XHRpZiAoY29kZVBvaW50IC0gNDggPCAxMCkge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDIyO1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gNjUgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDY1O1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gOTcgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDk3O1xuXHRcdH1cblx0XHRyZXR1cm4gYmFzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGlzIGBkaWdpdGAsIHdoaWNoIG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZVxuXHQgKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcblx0ICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcblx0ICogaWYgYGZsYWdgIGlzIG5vbi16ZXJvIGFuZCBgZGlnaXRgIGhhcyBubyB1cHBlcmNhc2UgZm9ybS5cblx0ICovXG5cdGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHRcdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdFx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdFx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuXHQgKiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGFwdChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcblx0XHR2YXIgayA9IDA7XG5cdFx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0XHRkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG5cdFx0Zm9yICgvKiBubyBpbml0aWFsaXphdGlvbiAqLzsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdFx0Ly8gRG9uJ3QgdXNlIFVDUy0yXG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0XHQgICAgb3V0LFxuXHRcdCAgICBpID0gMCxcblx0XHQgICAgbiA9IGluaXRpYWxOLFxuXHRcdCAgICBiaWFzID0gaW5pdGlhbEJpYXMsXG5cdFx0ICAgIGJhc2ljLFxuXHRcdCAgICBqLFxuXHRcdCAgICBpbmRleCxcblx0XHQgICAgb2xkaSxcblx0XHQgICAgdyxcblx0XHQgICAgayxcblx0XHQgICAgZGlnaXQsXG5cdFx0ICAgIHQsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBiYXNlTWludXNUO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50czogbGV0IGBiYXNpY2AgYmUgdGhlIG51bWJlciBvZiBpbnB1dCBjb2RlXG5cdFx0Ly8gcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBkZWxpbWl0ZXIsIG9yIGAwYCBpZiB0aGVyZSBpcyBub25lLCB0aGVuIGNvcHlcblx0XHQvLyB0aGUgZmlyc3QgYmFzaWMgY29kZSBwb2ludHMgdG8gdGhlIG91dHB1dC5cblxuXHRcdGJhc2ljID0gaW5wdXQubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcblx0XHRpZiAoYmFzaWMgPCAwKSB7XG5cdFx0XHRiYXNpYyA9IDA7XG5cdFx0fVxuXG5cdFx0Zm9yIChqID0gMDsgaiA8IGJhc2ljOyArK2opIHtcblx0XHRcdC8vIGlmIGl0J3Mgbm90IGEgYmFzaWMgY29kZSBwb2ludFxuXHRcdFx0aWYgKGlucHV0LmNoYXJDb2RlQXQoaikgPj0gMHg4MCkge1xuXHRcdFx0XHRlcnJvcignbm90LWJhc2ljJyk7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaChpbnB1dC5jaGFyQ29kZUF0KGopKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGRlY29kaW5nIGxvb3A6IHN0YXJ0IGp1c3QgYWZ0ZXIgdGhlIGxhc3QgZGVsaW1pdGVyIGlmIGFueSBiYXNpYyBjb2RlXG5cdFx0Ly8gcG9pbnRzIHdlcmUgY29waWVkOyBzdGFydCBhdCB0aGUgYmVnaW5uaW5nIG90aGVyd2lzZS5cblxuXHRcdGZvciAoaW5kZXggPSBiYXNpYyA+IDAgPyBiYXNpYyArIDEgOiAwOyBpbmRleCA8IGlucHV0TGVuZ3RoOyAvKiBubyBmaW5hbCBleHByZXNzaW9uICovKSB7XG5cblx0XHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHRcdC8vIERlY29kZSBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyIGludG8gYGRlbHRhYCxcblx0XHRcdC8vIHdoaWNoIGdldHMgYWRkZWQgdG8gYGlgLiBUaGUgb3ZlcmZsb3cgY2hlY2tpbmcgaXMgZWFzaWVyXG5cdFx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdFx0Ly8gdmFsdWUgYXQgdGhlIGVuZCB0byBvYnRhaW4gYGRlbHRhYC5cblx0XHRcdGZvciAob2xkaSA9IGksIHcgPSAxLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblxuXHRcdFx0XHRpZiAoaW5kZXggPj0gaW5wdXRMZW5ndGgpIHtcblx0XHRcdFx0XHRlcnJvcignaW52YWxpZC1pbnB1dCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGlnaXQgPSBiYXNpY1RvRGlnaXQoaW5wdXQuY2hhckNvZGVBdChpbmRleCsrKSk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0ID49IGJhc2UgfHwgZGlnaXQgPiBmbG9vcigobWF4SW50IC0gaSkgLyB3KSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aSArPSBkaWdpdCAqIHc7XG5cdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA8IHQpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0aWYgKHcgPiBmbG9vcihtYXhJbnQgLyBiYXNlTWludXNUKSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dyAqPSBiYXNlTWludXNUO1xuXG5cdFx0XHR9XG5cblx0XHRcdG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdFx0YmlhcyA9IGFkYXB0KGkgLSBvbGRpLCBvdXQsIG9sZGkgPT0gMCk7XG5cblx0XHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0XHQvLyBpbmNyZW1lbnRpbmcgYG5gIGVhY2ggdGltZSwgc28gd2UnbGwgZml4IHRoYXQgbm93OlxuXHRcdFx0aWYgKGZsb29yKGkgLyBvdXQpID4gbWF4SW50IC0gbikge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRcdGkgJT0gb3V0O1xuXG5cdFx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0XG5cdFx0XHRvdXRwdXQuc3BsaWNlKGkrKywgMCwgbik7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdWNzMmVuY29kZShvdXRwdXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyB0byBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5XG5cdCAqIHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHRcdHZhciBuLFxuXHRcdCAgICBkZWx0YSxcblx0XHQgICAgaGFuZGxlZENQQ291bnQsXG5cdFx0ICAgIGJhc2ljTGVuZ3RoLFxuXHRcdCAgICBiaWFzLFxuXHRcdCAgICBqLFxuXHRcdCAgICBtLFxuXHRcdCAgICBxLFxuXHRcdCAgICBrLFxuXHRcdCAgICB0LFxuXHRcdCAgICBjdXJyZW50VmFsdWUsXG5cdFx0ICAgIG91dHB1dCA9IFtdLFxuXHRcdCAgICAvKiogYGlucHV0TGVuZ3RoYCB3aWxsIGhvbGQgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyBpbiBgaW5wdXRgLiAqL1xuXHRcdCAgICBpbnB1dExlbmd0aCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50UGx1c09uZSxcblx0XHQgICAgYmFzZU1pbnVzVCxcblx0XHQgICAgcU1pbnVzVDtcblxuXHRcdC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIFVuaWNvZGVcblx0XHRpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG5cdFx0Ly8gQ2FjaGUgdGhlIGxlbmd0aFxuXHRcdGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3RhdGVcblx0XHRuID0gaW5pdGlhbE47XG5cdFx0ZGVsdGEgPSAwO1xuXHRcdGJpYXMgPSBpbml0aWFsQmlhcztcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHNcblx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoY3VycmVudFZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cblx0XHQvLyBgaGFuZGxlZENQQ291bnRgIGlzIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgdGhhdCBoYXZlIGJlZW4gaGFuZGxlZDtcblx0XHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cblx0XHQvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyAtIGlmIGl0IGlzIG5vdCBlbXB0eSAtIHdpdGggYSBkZWxpbWl0ZXJcblx0XHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRcdG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBlbmNvZGluZyBsb29wOlxuXHRcdHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG5cblx0XHRcdC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHRcblx0XHRcdC8vIGxhcmdlciBvbmU6XG5cdFx0XHRmb3IgKG0gPSBtYXhJbnQsIGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcblx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPixcblx0XHRcdC8vIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93XG5cdFx0XHRoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0XHRpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcblx0XHRcdG4gPSBtO1xuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09IG4pIHtcblx0XHRcdFx0XHQvLyBSZXByZXNlbnQgZGVsdGEgYXMgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlclxuXHRcdFx0XHRcdGZvciAocSA9IGRlbHRhLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblx0XHRcdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXHRcdFx0XHRcdFx0aWYgKHEgPCB0KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cU1pbnVzVCA9IHEgLSB0O1xuXHRcdFx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goXG5cdFx0XHRcdFx0XHRcdHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNULCAwKSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT0gYmFzaWNMZW5ndGgpO1xuXHRcdFx0XHRcdGRlbHRhID0gMDtcblx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCsrZGVsdGE7XG5cdFx0XHQrK247XG5cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dC5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSB0byBVbmljb2RlLiBPbmx5IHRoZVxuXHQgKiBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHdpbGwgYmUgY29udmVydGVkLCBpLmUuIGl0IGRvZXNuJ3Rcblx0ICogbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBjb252ZXJ0ZWQgdG9cblx0ICogVW5pY29kZS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIFB1bnljb2RlIGRvbWFpbiBuYW1lIHRvIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShkb21haW4pIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGRvbWFpbiwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgdG8gUHVueWNvZGUuIE9ubHkgdGhlXG5cdCAqIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS4gaXQgZG9lc24ndFxuXHQgKiBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpbiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lIHRvIGNvbnZlcnQsIGFzIGEgVW5pY29kZSBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGRvbWFpbikge1xuXHRcdHJldHVybiBtYXBEb21haW4oZG9tYWluLCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xuXHRwdW55Y29kZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0ICovXG5cdFx0J3ZlcnNpb24nOiAnMS4yLjQnLFxuXHRcdC8qKlxuXHRcdCAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG5cdFx0ICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cblx0XHQgKiBAc2VlIDxodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIE9iamVjdFxuXHRcdCAqL1xuXHRcdCd1Y3MyJzoge1xuXHRcdFx0J2RlY29kZSc6IHVjczJkZWNvZGUsXG5cdFx0XHQnZW5jb2RlJzogdWNzMmVuY29kZVxuXHRcdH0sXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0XHQndG9Vbmljb2RlJzogdG9Vbmljb2RlXG5cdH07XG5cblx0LyoqIEV4cG9zZSBgcHVueWNvZGVgICovXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKCdwdW55Y29kZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHB1bnljb2RlO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHt9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBsb2cgPSBfZGVyZXFfKCcuL2xvZycpO1xuXG5mdW5jdGlvbiByZXN0b3JlT3duZXJTY3JvbGwob3duZXJEb2N1bWVudCwgeCwgeSkge1xuICAgIGlmIChvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3ICYmICh4ICE9PSBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LnBhZ2VYT2Zmc2V0IHx8IHkgIT09IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcucGFnZVlPZmZzZXQpKSB7XG4gICAgICAgIG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuc2Nyb2xsVG8oeCwgeSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbG9uZUNhbnZhc0NvbnRlbnRzKGNhbnZhcywgY2xvbmVkQ2FudmFzKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGNsb25lZENhbnZhcykge1xuICAgICAgICAgICAgY2xvbmVkQ2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgY2xvbmVkQ2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgICBjbG9uZWRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLnB1dEltYWdlRGF0YShjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpLCAwLCAwKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsb2coXCJVbmFibGUgdG8gY29weSBjYW52YXMgY29udGVudCBmcm9tXCIsIGNhbnZhcywgZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbG9uZU5vZGUobm9kZSwgamF2YXNjcmlwdEVuYWJsZWQpIHtcbiAgICB2YXIgY2xvbmUgPSBub2RlLm5vZGVUeXBlID09PSAzID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZS5ub2RlVmFsdWUpIDogbm9kZS5jbG9uZU5vZGUoZmFsc2UpO1xuXG4gICAgdmFyIGNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgIHdoaWxlKGNoaWxkKSB7XG4gICAgICAgIGlmIChqYXZhc2NyaXB0RW5hYmxlZCA9PT0gdHJ1ZSB8fCBjaGlsZC5ub2RlVHlwZSAhPT0gMSB8fCBjaGlsZC5ub2RlTmFtZSAhPT0gJ1NDUklQVCcpIHtcbiAgICAgICAgICAgIGNsb25lLmFwcGVuZENoaWxkKGNsb25lTm9kZShjaGlsZCwgamF2YXNjcmlwdEVuYWJsZWQpKTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgIGNsb25lLl9zY3JvbGxUb3AgPSBub2RlLnNjcm9sbFRvcDtcbiAgICAgICAgY2xvbmUuX3Njcm9sbExlZnQgPSBub2RlLnNjcm9sbExlZnQ7XG4gICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSBcIkNBTlZBU1wiKSB7XG4gICAgICAgICAgICBjbG9uZUNhbnZhc0NvbnRlbnRzKG5vZGUsIGNsb25lKTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVOYW1lID09PSBcIlRFWFRBUkVBXCIgfHwgbm9kZS5ub2RlTmFtZSA9PT0gXCJTRUxFQ1RcIikge1xuICAgICAgICAgICAgY2xvbmUudmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBpbml0Tm9kZShub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgbm9kZS5zY3JvbGxUb3AgPSBub2RlLl9zY3JvbGxUb3A7XG4gICAgICAgIG5vZGUuc2Nyb2xsTGVmdCA9IG5vZGUuX3Njcm9sbExlZnQ7XG5cbiAgICAgICAgdmFyIGNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICB3aGlsZShjaGlsZCkge1xuICAgICAgICAgICAgaW5pdE5vZGUoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQgPSBjaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvd25lckRvY3VtZW50LCBjb250YWluZXJEb2N1bWVudCwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucywgeCAseSkge1xuICAgIHZhciBkb2N1bWVudEVsZW1lbnQgPSBjbG9uZU5vZGUob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIG9wdGlvbnMuamF2YXNjcmlwdEVuYWJsZWQpO1xuICAgIHZhciBjb250YWluZXIgPSBjb250YWluZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuXG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiaHRtbDJjYW52YXMtY29udGFpbmVyXCI7XG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IFwiLTEwMDAwcHhcIjtcbiAgICBjb250YWluZXIuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICBjb250YWluZXIuc3R5bGUuYm9yZGVyID0gXCIwXCI7XG4gICAgY29udGFpbmVyLndpZHRoID0gd2lkdGg7XG4gICAgY29udGFpbmVyLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb250YWluZXIuc2Nyb2xsaW5nID0gXCJub1wiOyAvLyBpb3Mgd29uJ3Qgc2Nyb2xsIHdpdGhvdXQgaXRcbiAgICBjb250YWluZXJEb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICB2YXIgZG9jdW1lbnRDbG9uZSA9IGNvbnRhaW5lci5jb250ZW50V2luZG93LmRvY3VtZW50O1xuXG4gICAgICAgIC8qIENocm9tZSBkb2Vzbid0IGRldGVjdCByZWxhdGl2ZSBiYWNrZ3JvdW5kLWltYWdlcyBhc3NpZ25lZCBpbiBpbmxpbmUgPHN0eWxlPiBzaGVldHMgd2hlbiBmZXRjaGVkIHRocm91Z2ggZ2V0Q29tcHV0ZWRTdHlsZVxuICAgICAgICAgaWYgd2luZG93IHVybCBpcyBhYm91dDpibGFuaywgd2UgY2FuIGFzc2lnbiB0aGUgdXJsIHRvIGN1cnJlbnQgYnkgd3JpdGluZyBvbnRvIHRoZSBkb2N1bWVudFxuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbmVyLmNvbnRlbnRXaW5kb3cub25sb2FkID0gY29udGFpbmVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50Q2xvbmUuYm9keS5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdE5vZGUoZG9jdW1lbnRDbG9uZS5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250ZW50V2luZG93LnNjcm9sbFRvKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgvKGlQYWR8aVBob25lfGlQb2QpL2cpLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgKGNvbnRhaW5lci5jb250ZW50V2luZG93LnNjcm9sbFkgIT09IHkgfHwgY29udGFpbmVyLmNvbnRlbnRXaW5kb3cuc2Nyb2xsWCAhPT0geCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudENsb25lLmRvY3VtZW50RWxlbWVudC5zdHlsZS50b3AgPSAoLXkpICsgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50Q2xvbmUuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmxlZnQgPSAoLXgpICsgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50Q2xvbmUuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50Q2xvbmUub3BlbigpO1xuICAgICAgICBkb2N1bWVudENsb25lLndyaXRlKFwiPCFET0NUWVBFIGh0bWw+PGh0bWw+PC9odG1sPlwiKTtcbiAgICAgICAgLy8gQ2hyb21lIHNjcm9sbHMgdGhlIHBhcmVudCBkb2N1bWVudCBmb3Igc29tZSByZWFzb24gYWZ0ZXIgdGhlIHdyaXRlIHRvIHRoZSBjbG9uZWQgd2luZG93Pz8/XG4gICAgICAgIHJlc3RvcmVPd25lclNjcm9sbChvd25lckRvY3VtZW50LCB4LCB5KTtcbiAgICAgICAgZG9jdW1lbnRDbG9uZS5yZXBsYWNlQ2hpbGQoZG9jdW1lbnRDbG9uZS5hZG9wdE5vZGUoZG9jdW1lbnRFbGVtZW50KSwgZG9jdW1lbnRDbG9uZS5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICBkb2N1bWVudENsb25lLmNsb3NlKCk7XG4gICAgfSk7XG59O1xuXG59LHtcIi4vbG9nXCI6MTN9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy1jb2xvci9cblxuZnVuY3Rpb24gQ29sb3IodmFsdWUpIHtcbiAgICB0aGlzLnIgPSAwO1xuICAgIHRoaXMuZyA9IDA7XG4gICAgdGhpcy5iID0gMDtcbiAgICB0aGlzLmEgPSBudWxsO1xuICAgIHZhciByZXN1bHQgPSB0aGlzLmZyb21BcnJheSh2YWx1ZSkgfHxcbiAgICAgICAgdGhpcy5uYW1lZENvbG9yKHZhbHVlKSB8fFxuICAgICAgICB0aGlzLnJnYih2YWx1ZSkgfHxcbiAgICAgICAgdGhpcy5yZ2JhKHZhbHVlKSB8fFxuICAgICAgICB0aGlzLmhleDYodmFsdWUpIHx8XG4gICAgICAgIHRoaXMuaGV4Myh2YWx1ZSk7XG59XG5cbkNvbG9yLnByb3RvdHlwZS5kYXJrZW4gPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgICB2YXIgYSA9IDEgLSBhbW91bnQ7XG4gICAgcmV0dXJuICBuZXcgQ29sb3IoW1xuICAgICAgICBNYXRoLnJvdW5kKHRoaXMuciAqIGEpLFxuICAgICAgICBNYXRoLnJvdW5kKHRoaXMuZyAqIGEpLFxuICAgICAgICBNYXRoLnJvdW5kKHRoaXMuYiAqIGEpLFxuICAgICAgICB0aGlzLmFcbiAgICBdKTtcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5pc1RyYW5zcGFyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYSA9PT0gMDtcbn07XG5cbkNvbG9yLnByb3RvdHlwZS5pc0JsYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuciA9PT0gMCAmJiB0aGlzLmcgPT09IDAgJiYgdGhpcy5iID09PSAwO1xufTtcblxuQ29sb3IucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgICAgIHRoaXMuciA9IE1hdGgubWluKGFycmF5WzBdLCAyNTUpO1xuICAgICAgICB0aGlzLmcgPSBNYXRoLm1pbihhcnJheVsxXSwgMjU1KTtcbiAgICAgICAgdGhpcy5iID0gTWF0aC5taW4oYXJyYXlbMl0sIDI1NSk7XG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB0aGlzLmEgPSBhcnJheVszXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShhcnJheSkpO1xufTtcblxudmFyIF9oZXgzID0gL14jKFthLWYwLTldezN9KSQvaTtcblxuQ29sb3IucHJvdG90eXBlLmhleDMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBtYXRjaCA9IG51bGw7XG4gICAgaWYgKChtYXRjaCA9IHZhbHVlLm1hdGNoKF9oZXgzKSkgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yID0gcGFyc2VJbnQobWF0Y2hbMV1bMF0gKyBtYXRjaFsxXVswXSwgMTYpO1xuICAgICAgICB0aGlzLmcgPSBwYXJzZUludChtYXRjaFsxXVsxXSArIG1hdGNoWzFdWzFdLCAxNik7XG4gICAgICAgIHRoaXMuYiA9IHBhcnNlSW50KG1hdGNoWzFdWzJdICsgbWF0Y2hbMV1bMl0sIDE2KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoICE9PSBudWxsO1xufTtcblxudmFyIF9oZXg2ID0gL14jKFthLWYwLTldezZ9KSQvaTtcblxuQ29sb3IucHJvdG90eXBlLmhleDYgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBtYXRjaCA9IG51bGw7XG4gICAgaWYgKChtYXRjaCA9IHZhbHVlLm1hdGNoKF9oZXg2KSkgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yID0gcGFyc2VJbnQobWF0Y2hbMV0uc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gICAgICAgIHRoaXMuZyA9IHBhcnNlSW50KG1hdGNoWzFdLnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICAgICAgICB0aGlzLmIgPSBwYXJzZUludChtYXRjaFsxXS5zdWJzdHJpbmcoNCwgNiksIDE2KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoICE9PSBudWxsO1xufTtcblxuXG52YXIgX3JnYiA9IC9ecmdiXFwoXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccypcXCkkLztcblxuQ29sb3IucHJvdG90eXBlLnJnYiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICBpZiAoKG1hdGNoID0gdmFsdWUubWF0Y2goX3JnYikpICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuciA9IE51bWJlcihtYXRjaFsxXSk7XG4gICAgICAgIHRoaXMuZyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgICAgIHRoaXMuYiA9IE51bWJlcihtYXRjaFszXSk7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaCAhPT0gbnVsbDtcbn07XG5cbnZhciBfcmdiYSA9IC9ecmdiYVxcKFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkP1xcLj9cXGQrKVxccypcXCkkLztcblxuQ29sb3IucHJvdG90eXBlLnJnYmEgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBtYXRjaCA9IG51bGw7XG4gICAgaWYgKChtYXRjaCA9IHZhbHVlLm1hdGNoKF9yZ2JhKSkgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yID0gTnVtYmVyKG1hdGNoWzFdKTtcbiAgICAgICAgdGhpcy5nID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICAgICAgdGhpcy5iID0gTnVtYmVyKG1hdGNoWzNdKTtcbiAgICAgICAgdGhpcy5hID0gTnVtYmVyKG1hdGNoWzRdKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoICE9PSBudWxsO1xufTtcblxuQ29sb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYSAhPT0gbnVsbCAmJiB0aGlzLmEgIT09IDEgP1xuICAgIFwicmdiYShcIiArIFt0aGlzLnIsIHRoaXMuZywgdGhpcy5iLCB0aGlzLmFdLmpvaW4oXCIsXCIpICsgXCIpXCIgOlxuICAgIFwicmdiKFwiICsgW3RoaXMuciwgdGhpcy5nLCB0aGlzLmJdLmpvaW4oXCIsXCIpICsgXCIpXCI7XG59O1xuXG5Db2xvci5wcm90b3R5cGUubmFtZWRDb2xvciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBjb2xvciA9IGNvbG9yc1t2YWx1ZV07XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuciA9IGNvbG9yWzBdO1xuICAgICAgICB0aGlzLmcgPSBjb2xvclsxXTtcbiAgICAgICAgdGhpcy5iID0gY29sb3JbMl07XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgIHRoaXMuciA9IHRoaXMuZyA9IHRoaXMuYiA9IHRoaXMuYSA9IDA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiAhIWNvbG9yO1xufTtcblxuQ29sb3IucHJvdG90eXBlLmlzQ29sb3IgPSB0cnVlO1xuXG4vLyBKU09OLnN0cmluZ2lmeShbXS5zbGljZS5jYWxsKCQkKCcubmFtZWQtY29sb3ItdGFibGUgdHInKSwgMSkubWFwKGZ1bmN0aW9uKHJvdykgeyByZXR1cm4gW3Jvdy5jaGlsZE5vZGVzWzNdLnRleHRDb250ZW50LCByb3cuY2hpbGROb2Rlc1s1XS50ZXh0Q29udGVudC50cmltKCkuc3BsaXQoXCIsXCIpLm1hcChOdW1iZXIpXSB9KS5yZWR1Y2UoZnVuY3Rpb24oZGF0YSwgcm93KSB7ZGF0YVtyb3dbMF1dID0gcm93WzFdOyByZXR1cm4gZGF0YX0sIHt9KSlcbnZhciBjb2xvcnMgPSB7XG4gICAgXCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxuICAgIFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcbiAgICBcImFxdWFcIjogWzAsIDI1NSwgMjU1XSxcbiAgICBcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxuICAgIFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxuICAgIFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxuICAgIFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcbiAgICBcImJsYWNrXCI6IFswLCAwLCAwXSxcbiAgICBcImJsYW5jaGVkYWxtb25kXCI6IFsyNTUsIDIzNSwgMjA1XSxcbiAgICBcImJsdWVcIjogWzAsIDAsIDI1NV0sXG4gICAgXCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxuICAgIFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcbiAgICBcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXG4gICAgXCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXG4gICAgXCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXG4gICAgXCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXG4gICAgXCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcbiAgICBcImNvcm5mbG93ZXJibHVlXCI6IFsxMDAsIDE0OSwgMjM3XSxcbiAgICBcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcbiAgICBcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcbiAgICBcImN5YW5cIjogWzAsIDI1NSwgMjU1XSxcbiAgICBcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxuICAgIFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcbiAgICBcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXG4gICAgXCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXG4gICAgXCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJkYXJra2hha2lcIjogWzE4OSwgMTgzLCAxMDddLFxuICAgIFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcbiAgICBcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXG4gICAgXCJkYXJrb3JhbmdlXCI6IFsyNTUsIDE0MCwgMF0sXG4gICAgXCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxuICAgIFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcbiAgICBcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxuICAgIFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcbiAgICBcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcbiAgICBcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxuICAgIFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXG4gICAgXCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXG4gICAgXCJkYXJrdmlvbGV0XCI6IFsxNDgsIDAsIDIxMV0sXG4gICAgXCJkZWVwcGlua1wiOiBbMjU1LCAyMCwgMTQ3XSxcbiAgICBcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXG4gICAgXCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwiZG9kZ2VyYmx1ZVwiOiBbMzAsIDE0NCwgMjU1XSxcbiAgICBcImZpcmVicmlja1wiOiBbMTc4LCAzNCwgMzRdLFxuICAgIFwiZmxvcmFsd2hpdGVcIjogWzI1NSwgMjUwLCAyNDBdLFxuICAgIFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcbiAgICBcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcbiAgICBcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXG4gICAgXCJnaG9zdHdoaXRlXCI6IFsyNDgsIDI0OCwgMjU1XSxcbiAgICBcImdvbGRcIjogWzI1NSwgMjE1LCAwXSxcbiAgICBcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcbiAgICBcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxuICAgIFwiZ3JlZW5cIjogWzAsIDEyOCwgMF0sXG4gICAgXCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcbiAgICBcImdyZXlcIjogWzEyOCwgMTI4LCAxMjhdLFxuICAgIFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxuICAgIFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXG4gICAgXCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcbiAgICBcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXG4gICAgXCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXG4gICAgXCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXG4gICAgXCJsYXZlbmRlclwiOiBbMjMwLCAyMzAsIDI1MF0sXG4gICAgXCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcbiAgICBcImxhd25ncmVlblwiOiBbMTI0LCAyNTIsIDBdLFxuICAgIFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcbiAgICBcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXG4gICAgXCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcbiAgICBcImxpZ2h0Y3lhblwiOiBbMjI0LCAyNTUsIDI1NV0sXG4gICAgXCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXG4gICAgXCJsaWdodGdyYXlcIjogWzIxMSwgMjExLCAyMTFdLFxuICAgIFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXG4gICAgXCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxuICAgIFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcbiAgICBcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcbiAgICBcImxpZ2h0c2VhZ3JlZW5cIjogWzMyLCAxNzgsIDE3MF0sXG4gICAgXCJsaWdodHNreWJsdWVcIjogWzEzNSwgMjA2LCAyNTBdLFxuICAgIFwibGlnaHRzbGF0ZWdyYXlcIjogWzExOSwgMTM2LCAxNTNdLFxuICAgIFwibGlnaHRzbGF0ZWdyZXlcIjogWzExOSwgMTM2LCAxNTNdLFxuICAgIFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxuICAgIFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxuICAgIFwibGltZVwiOiBbMCwgMjU1LCAwXSxcbiAgICBcImxpbWVncmVlblwiOiBbNTAsIDIwNSwgNTBdLFxuICAgIFwibGluZW5cIjogWzI1MCwgMjQwLCAyMzBdLFxuICAgIFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxuICAgIFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXG4gICAgXCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxuICAgIFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxuICAgIFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE5XSxcbiAgICBcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxuICAgIFwibWVkaXVtc2xhdGVibHVlXCI6IFsxMjMsIDEwNCwgMjM4XSxcbiAgICBcIm1lZGl1bXNwcmluZ2dyZWVuXCI6IFswLCAyNTAsIDE1NF0sXG4gICAgXCJtZWRpdW10dXJxdW9pc2VcIjogWzcyLCAyMDksIDIwNF0sXG4gICAgXCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXG4gICAgXCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcbiAgICBcIm1pbnRjcmVhbVwiOiBbMjQ1LCAyNTUsIDI1MF0sXG4gICAgXCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxuICAgIFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxuICAgIFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxuICAgIFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcbiAgICBcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxuICAgIFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcbiAgICBcIm9saXZlZHJhYlwiOiBbMTA3LCAxNDIsIDM1XSxcbiAgICBcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxuICAgIFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcbiAgICBcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXG4gICAgXCJwYWxlZ29sZGVucm9kXCI6IFsyMzgsIDIzMiwgMTcwXSxcbiAgICBcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXG4gICAgXCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcbiAgICBcInBhbGV2aW9sZXRyZWRcIjogWzIxOSwgMTEyLCAxNDddLFxuICAgIFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXG4gICAgXCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxuICAgIFwicGVydVwiOiBbMjA1LCAxMzMsIDYzXSxcbiAgICBcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxuICAgIFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXG4gICAgXCJwb3dkZXJibHVlXCI6IFsxNzYsIDIyNCwgMjMwXSxcbiAgICBcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxuICAgIFwicmViZWNjYXB1cnBsZVwiOiBbMTAyLCA1MSwgMTUzXSxcbiAgICBcInJlZFwiOiBbMjU1LCAwLCAwXSxcbiAgICBcInJvc3licm93blwiOiBbMTg4LCAxNDMsIDE0M10sXG4gICAgXCJyb3lhbGJsdWVcIjogWzY1LCAxMDUsIDIyNV0sXG4gICAgXCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxuICAgIFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcbiAgICBcInNhbmR5YnJvd25cIjogWzI0NCwgMTY0LCA5Nl0sXG4gICAgXCJzZWFncmVlblwiOiBbNDYsIDEzOSwgODddLFxuICAgIFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxuICAgIFwic2llbm5hXCI6IFsxNjAsIDgyLCA0NV0sXG4gICAgXCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxuICAgIFwic2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDIzNV0sXG4gICAgXCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXG4gICAgXCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxuICAgIFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcbiAgICBcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxuICAgIFwic3ByaW5nZ3JlZW5cIjogWzAsIDI1NSwgMTI3XSxcbiAgICBcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcbiAgICBcInRhblwiOiBbMjEwLCAxODAsIDE0MF0sXG4gICAgXCJ0ZWFsXCI6IFswLCAxMjgsIDEyOF0sXG4gICAgXCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcbiAgICBcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxuICAgIFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxuICAgIFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcbiAgICBcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcbiAgICBcIndoaXRlXCI6IFsyNTUsIDI1NSwgMjU1XSxcbiAgICBcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxuICAgIFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXG4gICAgXCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvcjtcblxufSx7fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgU3VwcG9ydCA9IF9kZXJlcV8oJy4vc3VwcG9ydCcpO1xudmFyIENhbnZhc1JlbmRlcmVyID0gX2RlcmVxXygnLi9yZW5kZXJlcnMvY2FudmFzJyk7XG52YXIgSW1hZ2VMb2FkZXIgPSBfZGVyZXFfKCcuL2ltYWdlbG9hZGVyJyk7XG52YXIgTm9kZVBhcnNlciA9IF9kZXJlcV8oJy4vbm9kZXBhcnNlcicpO1xudmFyIE5vZGVDb250YWluZXIgPSBfZGVyZXFfKCcuL25vZGVjb250YWluZXInKTtcbnZhciBsb2cgPSBfZGVyZXFfKCcuL2xvZycpO1xudmFyIHV0aWxzID0gX2RlcmVxXygnLi91dGlscycpO1xudmFyIGNyZWF0ZVdpbmRvd0Nsb25lID0gX2RlcmVxXygnLi9jbG9uZScpO1xudmFyIGxvYWRVcmxEb2N1bWVudCA9IF9kZXJlcV8oJy4vcHJveHknKS5sb2FkVXJsRG9jdW1lbnQ7XG52YXIgZ2V0Qm91bmRzID0gdXRpbHMuZ2V0Qm91bmRzO1xuXG52YXIgaHRtbDJjYW52YXNOb2RlQXR0cmlidXRlID0gXCJkYXRhLWh0bWwyY2FudmFzLW5vZGVcIjtcbnZhciBodG1sMmNhbnZhc0Nsb25lSW5kZXggPSAwO1xuXG5mdW5jdGlvbiBodG1sMmNhbnZhcyhub2RlTGlzdCwgb3B0aW9ucykge1xuICAgIHZhciBpbmRleCA9IGh0bWwyY2FudmFzQ2xvbmVJbmRleCsrO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLmxvZ2dpbmcpIHtcbiAgICAgICAgbG9nLm9wdGlvbnMubG9nZ2luZyA9IHRydWU7XG4gICAgICAgIGxvZy5vcHRpb25zLnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmFzeW5jID0gdHlwZW9mKG9wdGlvbnMuYXN5bmMpID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IG9wdGlvbnMuYXN5bmM7XG4gICAgb3B0aW9ucy5hbGxvd1RhaW50ID0gdHlwZW9mKG9wdGlvbnMuYWxsb3dUYWludCkgPT09IFwidW5kZWZpbmVkXCIgPyBmYWxzZSA6IG9wdGlvbnMuYWxsb3dUYWludDtcbiAgICBvcHRpb25zLnJlbW92ZUNvbnRhaW5lciA9IHR5cGVvZihvcHRpb25zLnJlbW92ZUNvbnRhaW5lcikgPT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogb3B0aW9ucy5yZW1vdmVDb250YWluZXI7XG4gICAgb3B0aW9ucy5qYXZhc2NyaXB0RW5hYmxlZCA9IHR5cGVvZihvcHRpb25zLmphdmFzY3JpcHRFbmFibGVkKSA9PT0gXCJ1bmRlZmluZWRcIiA/IGZhbHNlIDogb3B0aW9ucy5qYXZhc2NyaXB0RW5hYmxlZDtcbiAgICBvcHRpb25zLmltYWdlVGltZW91dCA9IHR5cGVvZihvcHRpb25zLmltYWdlVGltZW91dCkgPT09IFwidW5kZWZpbmVkXCIgPyAxMDAwMCA6IG9wdGlvbnMuaW1hZ2VUaW1lb3V0O1xuICAgIG9wdGlvbnMucmVuZGVyZXIgPSB0eXBlb2Yob3B0aW9ucy5yZW5kZXJlcikgPT09IFwiZnVuY3Rpb25cIiA/IG9wdGlvbnMucmVuZGVyZXIgOiBDYW52YXNSZW5kZXJlcjtcbiAgICBvcHRpb25zLnN0cmljdCA9ICEhb3B0aW9ucy5zdHJpY3Q7XG5cbiAgICBpZiAodHlwZW9mKG5vZGVMaXN0KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAodHlwZW9mKG9wdGlvbnMucHJveHkpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJQcm94eSBtdXN0IGJlIHVzZWQgd2hlbiByZW5kZXJpbmcgdXJsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggIT0gbnVsbCA/IG9wdGlvbnMud2lkdGggOiB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0ICE9IG51bGwgPyBvcHRpb25zLmhlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgcmV0dXJuIGxvYWRVcmxEb2N1bWVudChhYnNvbHV0ZVVybChub2RlTGlzdCksIG9wdGlvbnMucHJveHksIGRvY3VtZW50LCB3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKS50aGVuKGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlbmRlcldpbmRvdyhjb250YWluZXIuY29udGVudFdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGNvbnRhaW5lciwgb3B0aW9ucywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBub2RlID0gKChub2RlTGlzdCA9PT0gdW5kZWZpbmVkKSA/IFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdIDogKChub2RlTGlzdC5sZW5ndGgpID8gbm9kZUxpc3QgOiBbbm9kZUxpc3RdKSlbMF07XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoaHRtbDJjYW52YXNOb2RlQXR0cmlidXRlICsgaW5kZXgsIGluZGV4KTtcbiAgICByZXR1cm4gcmVuZGVyRG9jdW1lbnQobm9kZS5vd25lckRvY3VtZW50LCBvcHRpb25zLCBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuaW5uZXJXaWR0aCwgbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmlubmVySGVpZ2h0LCBpbmRleCkudGhlbihmdW5jdGlvbihjYW52YXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZihvcHRpb25zLm9ucmVuZGVyZWQpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGxvZyhcIm9wdGlvbnMub25yZW5kZXJlZCBpcyBkZXByZWNhdGVkLCBodG1sMmNhbnZhcyByZXR1cm5zIGEgUHJvbWlzZSBjb250YWluaW5nIHRoZSBjYW52YXNcIik7XG4gICAgICAgICAgICBvcHRpb25zLm9ucmVuZGVyZWQoY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH0pO1xufVxuXG5odG1sMmNhbnZhcy5DYW52YXNSZW5kZXJlciA9IENhbnZhc1JlbmRlcmVyO1xuaHRtbDJjYW52YXMuTm9kZUNvbnRhaW5lciA9IE5vZGVDb250YWluZXI7XG5odG1sMmNhbnZhcy5sb2cgPSBsb2c7XG5odG1sMmNhbnZhcy51dGlscyA9IHV0aWxzO1xuXG52YXIgaHRtbDJjYW52YXNFeHBvcnQgPSAodHlwZW9mKGRvY3VtZW50KSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YoT2JqZWN0LmNyZWF0ZSkgIT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KSAhPT0gXCJmdW5jdGlvblwiKSA/IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIk5vIGNhbnZhcyBzdXBwb3J0XCIpO1xufSA6IGh0bWwyY2FudmFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGh0bWwyY2FudmFzRXhwb3J0O1xuXG5pZiAodHlwZW9mKGRlZmluZSkgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgnaHRtbDJjYW52YXMnLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBodG1sMmNhbnZhc0V4cG9ydDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRG9jdW1lbnQoZG9jdW1lbnQsIG9wdGlvbnMsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQsIGh0bWwyY2FudmFzSW5kZXgpIHtcbiAgICByZXR1cm4gY3JlYXRlV2luZG93Q2xvbmUoZG9jdW1lbnQsIGRvY3VtZW50LCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0LCBvcHRpb25zLCBkb2N1bWVudC5kZWZhdWx0Vmlldy5wYWdlWE9mZnNldCwgZG9jdW1lbnQuZGVmYXVsdFZpZXcucGFnZVlPZmZzZXQpLnRoZW4oZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIGxvZyhcIkRvY3VtZW50IGNsb25lZFwiKTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBodG1sMmNhbnZhc05vZGVBdHRyaWJ1dGUgKyBodG1sMmNhbnZhc0luZGV4O1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBcIltcIiArIGF0dHJpYnV0ZU5hbWUgKyBcIj0nXCIgKyBodG1sMmNhbnZhc0luZGV4ICsgXCInXVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIHZhciBjbG9uZWRXaW5kb3cgPSBjb250YWluZXIuY29udGVudFdpbmRvdztcbiAgICAgICAgdmFyIG5vZGUgPSBjbG9uZWRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIHZhciBvbmNsb25lSGFuZGxlciA9ICh0eXBlb2Yob3B0aW9ucy5vbmNsb25lKSA9PT0gXCJmdW5jdGlvblwiKSA/IFByb21pc2UucmVzb2x2ZShvcHRpb25zLm9uY2xvbmUoY2xvbmVkV2luZG93LmRvY3VtZW50KSkgOiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIHJldHVybiBvbmNsb25lSGFuZGxlci50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlbmRlcldpbmRvdyhub2RlLCBjb250YWluZXIsIG9wdGlvbnMsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyV2luZG93KG5vZGUsIGNvbnRhaW5lciwgb3B0aW9ucywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCkge1xuICAgIHZhciBjbG9uZWRXaW5kb3cgPSBjb250YWluZXIuY29udGVudFdpbmRvdztcbiAgICB2YXIgc3VwcG9ydCA9IG5ldyBTdXBwb3J0KGNsb25lZFdpbmRvdy5kb2N1bWVudCk7XG4gICAgdmFyIGltYWdlTG9hZGVyID0gbmV3IEltYWdlTG9hZGVyKG9wdGlvbnMsIHN1cHBvcnQpO1xuICAgIHZhciBib3VuZHMgPSBnZXRCb3VuZHMobm9kZSk7XG4gICAgdmFyIHdpZHRoID0gb3B0aW9ucy50eXBlID09PSBcInZpZXdcIiA/IHdpbmRvd1dpZHRoIDogZG9jdW1lbnRXaWR0aChjbG9uZWRXaW5kb3cuZG9jdW1lbnQpO1xuICAgIHZhciBoZWlnaHQgPSBvcHRpb25zLnR5cGUgPT09IFwidmlld1wiID8gd2luZG93SGVpZ2h0IDogZG9jdW1lbnRIZWlnaHQoY2xvbmVkV2luZG93LmRvY3VtZW50KTtcbiAgICB2YXIgcmVuZGVyZXIgPSBuZXcgb3B0aW9ucy5yZW5kZXJlcih3aWR0aCwgaGVpZ2h0LCBpbWFnZUxvYWRlciwgb3B0aW9ucywgZG9jdW1lbnQpO1xuICAgIHZhciBwYXJzZXIgPSBuZXcgTm9kZVBhcnNlcihub2RlLCByZW5kZXJlciwgc3VwcG9ydCwgaW1hZ2VMb2FkZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiBwYXJzZXIucmVhZHkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgbG9nKFwiRmluaXNoZWQgcmVuZGVyaW5nXCIpO1xuICAgICAgICB2YXIgY2FudmFzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnR5cGUgPT09IFwidmlld1wiKSB7XG4gICAgICAgICAgICBjYW52YXMgPSBjcm9wKHJlbmRlcmVyLmNhbnZhcywge3dpZHRoOiByZW5kZXJlci5jYW52YXMud2lkdGgsIGhlaWdodDogcmVuZGVyZXIuY2FudmFzLmhlaWdodCwgdG9wOiAwLCBsZWZ0OiAwLCB4OiAwLCB5OiAwfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gY2xvbmVkV2luZG93LmRvY3VtZW50LmJvZHkgfHwgbm9kZSA9PT0gY2xvbmVkV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBvcHRpb25zLmNhbnZhcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBjYW52YXMgPSByZW5kZXJlci5jYW52YXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW52YXMgPSBjcm9wKHJlbmRlcmVyLmNhbnZhcywge3dpZHRoOiAgb3B0aW9ucy53aWR0aCAhPSBudWxsID8gb3B0aW9ucy53aWR0aCA6IGJvdW5kcy53aWR0aCwgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCAhPSBudWxsID8gb3B0aW9ucy5oZWlnaHQgOiBib3VuZHMuaGVpZ2h0LCB0b3A6IGJvdW5kcy50b3AsIGxlZnQ6IGJvdW5kcy5sZWZ0LCB4OiAwLCB5OiAwfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhbnVwQ29udGFpbmVyKGNvbnRhaW5lciwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFudXBDb250YWluZXIoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMucmVtb3ZlQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIGxvZyhcIkNsZWFuZWQgdXAgY29udGFpbmVyXCIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JvcChjYW52YXMsIGJvdW5kcykge1xuICAgIHZhciBjcm9wcGVkQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB2YXIgeDEgPSBNYXRoLm1pbihjYW52YXMud2lkdGggLSAxLCBNYXRoLm1heCgwLCBib3VuZHMubGVmdCkpO1xuICAgIHZhciB4MiA9IE1hdGgubWluKGNhbnZhcy53aWR0aCwgTWF0aC5tYXgoMSwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGgpKTtcbiAgICB2YXIgeTEgPSBNYXRoLm1pbihjYW52YXMuaGVpZ2h0IC0gMSwgTWF0aC5tYXgoMCwgYm91bmRzLnRvcCkpO1xuICAgIHZhciB5MiA9IE1hdGgubWluKGNhbnZhcy5oZWlnaHQsIE1hdGgubWF4KDEsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0KSk7XG4gICAgY3JvcHBlZENhbnZhcy53aWR0aCA9IGJvdW5kcy53aWR0aDtcbiAgICBjcm9wcGVkQ2FudmFzLmhlaWdodCA9ICBib3VuZHMuaGVpZ2h0O1xuICAgIHZhciB3aWR0aCA9IHgyLXgxO1xuICAgIHZhciBoZWlnaHQgPSB5Mi15MTtcbiAgICBsb2coXCJDcm9wcGluZyBjYW52YXMgYXQ6XCIsIFwibGVmdDpcIiwgYm91bmRzLmxlZnQsIFwidG9wOlwiLCBib3VuZHMudG9wLCBcIndpZHRoOlwiLCB3aWR0aCwgXCJoZWlnaHQ6XCIsIGhlaWdodCk7XG4gICAgbG9nKFwiUmVzdWx0aW5nIGNyb3Agd2l0aCB3aWR0aFwiLCBib3VuZHMud2lkdGgsIFwiYW5kIGhlaWdodFwiLCBib3VuZHMuaGVpZ2h0LCBcIndpdGggeFwiLCB4MSwgXCJhbmQgeVwiLCB5MSk7XG4gICAgY3JvcHBlZENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikuZHJhd0ltYWdlKGNhbnZhcywgeDEsIHkxLCB3aWR0aCwgaGVpZ2h0LCBib3VuZHMueCwgYm91bmRzLnksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHJldHVybiBjcm9wcGVkQ2FudmFzO1xufVxuXG5mdW5jdGlvbiBkb2N1bWVudFdpZHRoIChkb2MpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgIE1hdGgubWF4KGRvYy5ib2R5LnNjcm9sbFdpZHRoLCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoKSxcbiAgICAgICAgTWF0aC5tYXgoZG9jLmJvZHkub2Zmc2V0V2lkdGgsIGRvYy5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGgpLFxuICAgICAgICBNYXRoLm1heChkb2MuYm9keS5jbGllbnRXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcbiAgICApO1xufVxuXG5mdW5jdGlvbiBkb2N1bWVudEhlaWdodCAoZG9jKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICBNYXRoLm1heChkb2MuYm9keS5zY3JvbGxIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSxcbiAgICAgICAgTWF0aC5tYXgoZG9jLmJvZHkub2Zmc2V0SGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCksXG4gICAgICAgIE1hdGgubWF4KGRvYy5ib2R5LmNsaWVudEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gYWJzb2x1dGVVcmwodXJsKSB7XG4gICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgbGluay5ocmVmID0gbGluay5ocmVmO1xuICAgIHJldHVybiBsaW5rO1xufVxuXG59LHtcIi4vY2xvbmVcIjoyLFwiLi9pbWFnZWxvYWRlclwiOjExLFwiLi9sb2dcIjoxMyxcIi4vbm9kZWNvbnRhaW5lclwiOjE0LFwiLi9ub2RlcGFyc2VyXCI6MTUsXCIuL3Byb3h5XCI6MTYsXCIuL3JlbmRlcmVycy9jYW52YXNcIjoyMCxcIi4vc3VwcG9ydFwiOjIyLFwiLi91dGlsc1wiOjI2fV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgbG9nID0gX2RlcmVxXygnLi9sb2cnKTtcbnZhciBzbWFsbEltYWdlID0gX2RlcmVxXygnLi91dGlscycpLnNtYWxsSW1hZ2U7XG5cbmZ1bmN0aW9uIER1bW15SW1hZ2VDb250YWluZXIoc3JjKSB7XG4gICAgdGhpcy5zcmMgPSBzcmM7XG4gICAgbG9nKFwiRHVtbXlJbWFnZUNvbnRhaW5lciBmb3JcIiwgc3JjKTtcbiAgICBpZiAoIXRoaXMucHJvbWlzZSB8fCAhdGhpcy5pbWFnZSkge1xuICAgICAgICBsb2coXCJJbml0aWF0aW5nIER1bW15SW1hZ2VDb250YWluZXJcIik7XG4gICAgICAgIER1bW15SW1hZ2VDb250YWluZXIucHJvdG90eXBlLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHZhciBpbWFnZSA9IHRoaXMuaW1hZ2U7XG4gICAgICAgIER1bW15SW1hZ2VDb250YWluZXIucHJvdG90eXBlLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc21hbGxJbWFnZSgpO1xuICAgICAgICAgICAgaWYgKGltYWdlLmNvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEdW1teUltYWdlQ29udGFpbmVyO1xuXG59LHtcIi4vbG9nXCI6MTMsXCIuL3V0aWxzXCI6MjZ9XSw2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBzbWFsbEltYWdlID0gX2RlcmVxXygnLi91dGlscycpLnNtYWxsSW1hZ2U7XG5cbmZ1bmN0aW9uIEZvbnQoZmFtaWx5LCBzaXplKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICAgICAgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICAgICAgc2FtcGxlVGV4dCA9ICdIaWRkZW4gVGV4dCcsXG4gICAgICAgIGJhc2VsaW5lLFxuICAgICAgICBtaWRkbGU7XG5cbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgY29udGFpbmVyLnN0eWxlLmZvbnRGYW1pbHkgPSBmYW1pbHk7XG4gICAgY29udGFpbmVyLnN0eWxlLmZvbnRTaXplID0gc2l6ZTtcbiAgICBjb250YWluZXIuc3R5bGUubWFyZ2luID0gMDtcbiAgICBjb250YWluZXIuc3R5bGUucGFkZGluZyA9IDA7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICBpbWcuc3JjID0gc21hbGxJbWFnZSgpO1xuICAgIGltZy53aWR0aCA9IDE7XG4gICAgaW1nLmhlaWdodCA9IDE7XG5cbiAgICBpbWcuc3R5bGUubWFyZ2luID0gMDtcbiAgICBpbWcuc3R5bGUucGFkZGluZyA9IDA7XG4gICAgaW1nLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcImJhc2VsaW5lXCI7XG5cbiAgICBzcGFuLnN0eWxlLmZvbnRGYW1pbHkgPSBmYW1pbHk7XG4gICAgc3Bhbi5zdHlsZS5mb250U2l6ZSA9IHNpemU7XG4gICAgc3Bhbi5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIHNwYW4uc3R5bGUucGFkZGluZyA9IDA7XG5cbiAgICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNhbXBsZVRleHQpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgYmFzZWxpbmUgPSAoaW1nLm9mZnNldFRvcCAtIHNwYW4ub2Zmc2V0VG9wKSArIDE7XG5cbiAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoc3Bhbik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNhbXBsZVRleHQpKTtcblxuICAgIGNvbnRhaW5lci5zdHlsZS5saW5lSGVpZ2h0ID0gXCJub3JtYWxcIjtcbiAgICBpbWcuc3R5bGUudmVydGljYWxBbGlnbiA9IFwic3VwZXJcIjtcblxuICAgIG1pZGRsZSA9IChpbWcub2Zmc2V0VG9wLWNvbnRhaW5lci5vZmZzZXRUb3ApICsgMTtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIHRoaXMuYmFzZWxpbmUgPSBiYXNlbGluZTtcbiAgICB0aGlzLmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5taWRkbGUgPSBtaWRkbGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9udDtcblxufSx7XCIuL3V0aWxzXCI6MjZ9XSw3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBGb250ID0gX2RlcmVxXygnLi9mb250Jyk7XG5cbmZ1bmN0aW9uIEZvbnRNZXRyaWNzKCkge1xuICAgIHRoaXMuZGF0YSA9IHt9O1xufVxuXG5Gb250TWV0cmljcy5wcm90b3R5cGUuZ2V0TWV0cmljcyA9IGZ1bmN0aW9uKGZhbWlseSwgc2l6ZSkge1xuICAgIGlmICh0aGlzLmRhdGFbZmFtaWx5ICsgXCItXCIgKyBzaXplXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZGF0YVtmYW1pbHkgKyBcIi1cIiArIHNpemVdID0gbmV3IEZvbnQoZmFtaWx5LCBzaXplKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtmYW1pbHkgKyBcIi1cIiArIHNpemVdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb250TWV0cmljcztcblxufSx7XCIuL2ZvbnRcIjo2fV0sODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgdXRpbHMgPSBfZGVyZXFfKCcuL3V0aWxzJyk7XG52YXIgZ2V0Qm91bmRzID0gdXRpbHMuZ2V0Qm91bmRzO1xudmFyIGxvYWRVcmxEb2N1bWVudCA9IF9kZXJlcV8oJy4vcHJveHknKS5sb2FkVXJsRG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIEZyYW1lQ29udGFpbmVyKGNvbnRhaW5lciwgc2FtZU9yaWdpbiwgb3B0aW9ucykge1xuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuICAgIHRoaXMuc3JjID0gY29udGFpbmVyO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYm91bmRzID0gZ2V0Qm91bmRzKGNvbnRhaW5lcik7XG4gICAgdGhpcy5wcm9taXNlID0gKCFzYW1lT3JpZ2luID8gdGhpcy5wcm94eUxvYWQob3B0aW9ucy5wcm94eSwgYm91bmRzLCBvcHRpb25zKSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5jb250ZW50V2luZG93LmRvY3VtZW50LlVSTCA9PT0gXCJhYm91dDpibGFua1wiIHx8IGNvbnRhaW5lci5jb250ZW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY29udGVudFdpbmRvdy5vbmxvYWQgPSBjb250YWluZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjb250YWluZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0pKS50aGVuKGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgaHRtbDJjYW52YXMgPSBfZGVyZXFfKCcuL2NvcmUnKTtcbiAgICAgICAgcmV0dXJuIGh0bWwyY2FudmFzKGNvbnRhaW5lci5jb250ZW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge3R5cGU6ICd2aWV3Jywgd2lkdGg6IGNvbnRhaW5lci53aWR0aCwgaGVpZ2h0OiBjb250YWluZXIuaGVpZ2h0LCBwcm94eTogb3B0aW9ucy5wcm94eSwgamF2YXNjcmlwdEVuYWJsZWQ6IG9wdGlvbnMuamF2YXNjcmlwdEVuYWJsZWQsIHJlbW92ZUNvbnRhaW5lcjogb3B0aW9ucy5yZW1vdmVDb250YWluZXIsIGFsbG93VGFpbnQ6IG9wdGlvbnMuYWxsb3dUYWludCwgaW1hZ2VUaW1lb3V0OiBvcHRpb25zLmltYWdlVGltZW91dCAvIDJ9KTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKGNhbnZhcykge1xuICAgICAgICByZXR1cm4gc2VsZi5pbWFnZSA9IGNhbnZhcztcbiAgICB9KTtcbn1cblxuRnJhbWVDb250YWluZXIucHJvdG90eXBlLnByb3h5TG9hZCA9IGZ1bmN0aW9uKHByb3h5LCBib3VuZHMsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5zcmM7XG4gICAgcmV0dXJuIGxvYWRVcmxEb2N1bWVudChjb250YWluZXIuc3JjLCBwcm94eSwgY29udGFpbmVyLm93bmVyRG9jdW1lbnQsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCwgb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZyYW1lQ29udGFpbmVyO1xuXG59LHtcIi4vY29yZVwiOjQsXCIuL3Byb3h5XCI6MTYsXCIuL3V0aWxzXCI6MjZ9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbmZ1bmN0aW9uIEdyYWRpZW50Q29udGFpbmVyKGltYWdlRGF0YSkge1xuICAgIHRoaXMuc3JjID0gaW1hZ2VEYXRhLnZhbHVlO1xuICAgIHRoaXMuY29sb3JTdG9wcyA9IFtdO1xuICAgIHRoaXMudHlwZSA9IG51bGw7XG4gICAgdGhpcy54MCA9IDAuNTtcbiAgICB0aGlzLnkwID0gMC41O1xuICAgIHRoaXMueDEgPSAwLjU7XG4gICAgdGhpcy55MSA9IDAuNTtcbiAgICB0aGlzLnByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG59XG5cbkdyYWRpZW50Q29udGFpbmVyLlRZUEVTID0ge1xuICAgIExJTkVBUjogMSxcbiAgICBSQURJQUw6IDJcbn07XG5cbi8vIFRPRE86IHN1cHBvcnQgaHNsW2FdLCBuZWdhdGl2ZSAlL2xlbmd0aCB2YWx1ZXNcbi8vIFRPRE86IHN1cHBvcnQgPGFuZ2xlPiAoZS5nLiAtP1xcZHsxLDN9KD86XFwuXFxkKylkZWcsIGV0Yy4gOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9DU1MvYW5nbGUgKVxuR3JhZGllbnRDb250YWluZXIuUkVHRVhQX0NPTE9SU1RPUCA9IC9eXFxzKihyZ2JhP1xcKFxccypcXGR7MSwzfSxcXHMqXFxkezEsM30sXFxzKlxcZHsxLDN9KD86LFxccypbMC05XFwuXSspP1xccypcXCl8W2Etel17MywyMH18I1thLWYwLTldezMsNn0pKD86XFxzKyhcXGR7MSwzfSg/OlxcLlxcZCspPykoJXxweCk/KT8oPzpcXHN8JCkvaTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmFkaWVudENvbnRhaW5lcjtcblxufSx7fV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuZnVuY3Rpb24gSW1hZ2VDb250YWluZXIoc3JjLCBjb3JzKSB7XG4gICAgdGhpcy5zcmMgPSBzcmM7XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnRhaW50ZWQgPSBudWxsO1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLmltYWdlLm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICAgIHNlbGYuaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgaWYgKGNvcnMpIHtcbiAgICAgICAgICAgIHNlbGYuaW1hZ2UuY3Jvc3NPcmlnaW4gPSBcImFub255bW91c1wiO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW1hZ2Uuc3JjID0gc3JjO1xuICAgICAgICBpZiAoc2VsZi5pbWFnZS5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShzZWxmLmltYWdlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlQ29udGFpbmVyO1xuXG59LHt9XSwxMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgbG9nID0gX2RlcmVxXygnLi9sb2cnKTtcbnZhciBJbWFnZUNvbnRhaW5lciA9IF9kZXJlcV8oJy4vaW1hZ2Vjb250YWluZXInKTtcbnZhciBEdW1teUltYWdlQ29udGFpbmVyID0gX2RlcmVxXygnLi9kdW1teWltYWdlY29udGFpbmVyJyk7XG52YXIgUHJveHlJbWFnZUNvbnRhaW5lciA9IF9kZXJlcV8oJy4vcHJveHlpbWFnZWNvbnRhaW5lcicpO1xudmFyIEZyYW1lQ29udGFpbmVyID0gX2RlcmVxXygnLi9mcmFtZWNvbnRhaW5lcicpO1xudmFyIFNWR0NvbnRhaW5lciA9IF9kZXJlcV8oJy4vc3ZnY29udGFpbmVyJyk7XG52YXIgU1ZHTm9kZUNvbnRhaW5lciA9IF9kZXJlcV8oJy4vc3Znbm9kZWNvbnRhaW5lcicpO1xudmFyIExpbmVhckdyYWRpZW50Q29udGFpbmVyID0gX2RlcmVxXygnLi9saW5lYXJncmFkaWVudGNvbnRhaW5lcicpO1xudmFyIFdlYmtpdEdyYWRpZW50Q29udGFpbmVyID0gX2RlcmVxXygnLi93ZWJraXRncmFkaWVudGNvbnRhaW5lcicpO1xudmFyIGJpbmQgPSBfZGVyZXFfKCcuL3V0aWxzJykuYmluZDtcblxuZnVuY3Rpb24gSW1hZ2VMb2FkZXIob3B0aW9ucywgc3VwcG9ydCkge1xuICAgIHRoaXMubGluayA9IG51bGw7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnN1cHBvcnQgPSBzdXBwb3J0O1xuICAgIHRoaXMub3JpZ2luID0gdGhpcy5nZXRPcmlnaW4od2luZG93LmxvY2F0aW9uLmhyZWYpO1xufVxuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuZmluZEltYWdlcyA9IGZ1bmN0aW9uKG5vZGVzKSB7XG4gICAgdmFyIGltYWdlcyA9IFtdO1xuICAgIG5vZGVzLnJlZHVjZShmdW5jdGlvbihpbWFnZU5vZGVzLCBjb250YWluZXIpIHtcbiAgICAgICAgc3dpdGNoKGNvbnRhaW5lci5ub2RlLm5vZGVOYW1lKSB7XG4gICAgICAgIGNhc2UgXCJJTUdcIjpcbiAgICAgICAgICAgIHJldHVybiBpbWFnZU5vZGVzLmNvbmNhdChbe1xuICAgICAgICAgICAgICAgIGFyZ3M6IFtjb250YWluZXIubm9kZS5zcmNdLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJ1cmxcIlxuICAgICAgICAgICAgfV0pO1xuICAgICAgICBjYXNlIFwic3ZnXCI6XG4gICAgICAgIGNhc2UgXCJJRlJBTUVcIjpcbiAgICAgICAgICAgIHJldHVybiBpbWFnZU5vZGVzLmNvbmNhdChbe1xuICAgICAgICAgICAgICAgIGFyZ3M6IFtjb250YWluZXIubm9kZV0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBjb250YWluZXIubm9kZS5ub2RlTmFtZVxuICAgICAgICAgICAgfV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWFnZU5vZGVzO1xuICAgIH0sIFtdKS5mb3JFYWNoKHRoaXMuYWRkSW1hZ2UoaW1hZ2VzLCB0aGlzLmxvYWRJbWFnZSksIHRoaXMpO1xuICAgIHJldHVybiBpbWFnZXM7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuZmluZEJhY2tncm91bmRJbWFnZSA9IGZ1bmN0aW9uKGltYWdlcywgY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLnBhcnNlQmFja2dyb3VuZEltYWdlcygpLmZpbHRlcih0aGlzLmhhc0ltYWdlQmFja2dyb3VuZCkuZm9yRWFjaCh0aGlzLmFkZEltYWdlKGltYWdlcywgdGhpcy5sb2FkSW1hZ2UpLCB0aGlzKTtcbiAgICByZXR1cm4gaW1hZ2VzO1xufTtcblxuSW1hZ2VMb2FkZXIucHJvdG90eXBlLmFkZEltYWdlID0gZnVuY3Rpb24oaW1hZ2VzLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbihuZXdJbWFnZSkge1xuICAgICAgICBuZXdJbWFnZS5hcmdzLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbWFnZUV4aXN0cyhpbWFnZXMsIGltYWdlKSkge1xuICAgICAgICAgICAgICAgIGltYWdlcy5zcGxpY2UoMCwgMCwgY2FsbGJhY2suY2FsbCh0aGlzLCBuZXdJbWFnZSkpO1xuICAgICAgICAgICAgICAgIGxvZygnQWRkZWQgaW1hZ2UgIycgKyAoaW1hZ2VzLmxlbmd0aCksIHR5cGVvZihpbWFnZSkgPT09IFwic3RyaW5nXCIgPyBpbWFnZS5zdWJzdHJpbmcoMCwgMTAwKSA6IGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfTtcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5oYXNJbWFnZUJhY2tncm91bmQgPSBmdW5jdGlvbihpbWFnZURhdGEpIHtcbiAgICByZXR1cm4gaW1hZ2VEYXRhLm1ldGhvZCAhPT0gXCJub25lXCI7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUubG9hZEltYWdlID0gZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgaWYgKGltYWdlRGF0YS5tZXRob2QgPT09IFwidXJsXCIpIHtcbiAgICAgICAgdmFyIHNyYyA9IGltYWdlRGF0YS5hcmdzWzBdO1xuICAgICAgICBpZiAodGhpcy5pc1NWRyhzcmMpICYmICF0aGlzLnN1cHBvcnQuc3ZnICYmICF0aGlzLm9wdGlvbnMuYWxsb3dUYWludCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTVkdDb250YWluZXIoc3JjKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcmMubWF0Y2goL2RhdGE6aW1hZ2VcXC8uKjtiYXNlNjQsL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEltYWdlQ29udGFpbmVyKHNyYy5yZXBsYWNlKC91cmxcXChbJ1wiXXswLH18WydcIl17MCx9XFwpJC9pZywgJycpLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NhbWVPcmlnaW4oc3JjKSB8fCB0aGlzLm9wdGlvbnMuYWxsb3dUYWludCA9PT0gdHJ1ZSB8fCB0aGlzLmlzU1ZHKHNyYykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW1hZ2VDb250YWluZXIoc3JjLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdXBwb3J0LmNvcnMgJiYgIXRoaXMub3B0aW9ucy5hbGxvd1RhaW50ICYmIHRoaXMub3B0aW9ucy51c2VDT1JTKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEltYWdlQ29udGFpbmVyKHNyYywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnByb3h5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3h5SW1hZ2VDb250YWluZXIoc3JjLCB0aGlzLm9wdGlvbnMucHJveHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEdW1teUltYWdlQ29udGFpbmVyKHNyYyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGltYWdlRGF0YS5tZXRob2QgPT09IFwibGluZWFyLWdyYWRpZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5lYXJHcmFkaWVudENvbnRhaW5lcihpbWFnZURhdGEpO1xuICAgIH0gZWxzZSBpZiAoaW1hZ2VEYXRhLm1ldGhvZCA9PT0gXCJncmFkaWVudFwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgV2Via2l0R3JhZGllbnRDb250YWluZXIoaW1hZ2VEYXRhKTtcbiAgICB9IGVsc2UgaWYgKGltYWdlRGF0YS5tZXRob2QgPT09IFwic3ZnXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTVkdOb2RlQ29udGFpbmVyKGltYWdlRGF0YS5hcmdzWzBdLCB0aGlzLnN1cHBvcnQuc3ZnKTtcbiAgICB9IGVsc2UgaWYgKGltYWdlRGF0YS5tZXRob2QgPT09IFwiSUZSQU1FXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGcmFtZUNvbnRhaW5lcihpbWFnZURhdGEuYXJnc1swXSwgdGhpcy5pc1NhbWVPcmlnaW4oaW1hZ2VEYXRhLmFyZ3NbMF0uc3JjKSwgdGhpcy5vcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IER1bW15SW1hZ2VDb250YWluZXIoaW1hZ2VEYXRhKTtcbiAgICB9XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuaXNTVkcgPSBmdW5jdGlvbihzcmMpIHtcbiAgICByZXR1cm4gc3JjLnN1YnN0cmluZyhzcmMubGVuZ3RoIC0gMykudG9Mb3dlckNhc2UoKSA9PT0gXCJzdmdcIiB8fCBTVkdDb250YWluZXIucHJvdG90eXBlLmlzSW5saW5lKHNyYyk7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuaW1hZ2VFeGlzdHMgPSBmdW5jdGlvbihpbWFnZXMsIHNyYykge1xuICAgIHJldHVybiBpbWFnZXMuc29tZShmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICByZXR1cm4gaW1hZ2Uuc3JjID09PSBzcmM7XG4gICAgfSk7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuaXNTYW1lT3JpZ2luID0gZnVuY3Rpb24odXJsKSB7XG4gICAgcmV0dXJuICh0aGlzLmdldE9yaWdpbih1cmwpID09PSB0aGlzLm9yaWdpbik7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24odXJsKSB7XG4gICAgdmFyIGxpbmsgPSB0aGlzLmxpbmsgfHwgKHRoaXMubGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTtcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgbGluay5ocmVmID0gbGluay5ocmVmOyAvLyBJRTksIExPTCEgLSBodHRwOi8vanNmaWRkbGUubmV0L25pa2xhc3ZoLzJlNDhiL1xuICAgIHJldHVybiBsaW5rLnByb3RvY29sICsgbGluay5ob3N0bmFtZSArIGxpbmsucG9ydDtcbn07XG5cbkltYWdlTG9hZGVyLnByb3RvdHlwZS5nZXRQcm9taXNlID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHRoaXMudGltZW91dChjb250YWluZXIsIHRoaXMub3B0aW9ucy5pbWFnZVRpbWVvdXQpWydjYXRjaCddKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZHVtbXkgPSBuZXcgRHVtbXlJbWFnZUNvbnRhaW5lcihjb250YWluZXIuc3JjKTtcbiAgICAgICAgcmV0dXJuIGR1bW15LnByb21pc2UudGhlbihmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmltYWdlID0gaW1hZ2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuSW1hZ2VMb2FkZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHNyYykge1xuICAgIHZhciBmb3VuZCA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VzLnNvbWUoZnVuY3Rpb24oaW1nKSB7XG4gICAgICAgIHJldHVybiAoZm91bmQgPSBpbWcpLnNyYyA9PT0gc3JjO1xuICAgIH0pID8gZm91bmQgOiBudWxsO1xufTtcblxuSW1hZ2VMb2FkZXIucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24obm9kZXMpIHtcbiAgICB0aGlzLmltYWdlcyA9IG5vZGVzLnJlZHVjZShiaW5kKHRoaXMuZmluZEJhY2tncm91bmRJbWFnZSwgdGhpcyksIHRoaXMuZmluZEltYWdlcyhub2RlcykpO1xuICAgIHRoaXMuaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UsIGluZGV4KSB7XG4gICAgICAgIGltYWdlLnByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvZyhcIlN1Y2Nlc2Z1bGx5IGxvYWRlZCBpbWFnZSAjXCIrIChpbmRleCsxKSwgaW1hZ2UpO1xuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsb2coXCJGYWlsZWQgbG9hZGluZyBpbWFnZSAjXCIrIChpbmRleCsxKSwgaW1hZ2UsIGUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnJlYWR5ID0gUHJvbWlzZS5hbGwodGhpcy5pbWFnZXMubWFwKHRoaXMuZ2V0UHJvbWlzZSwgdGhpcykpO1xuICAgIGxvZyhcIkZpbmlzaGVkIHNlYXJjaGluZyBpbWFnZXNcIik7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5JbWFnZUxvYWRlci5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgdGltZW91dCkge1xuICAgIHZhciB0aW1lcjtcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmFjZShbY29udGFpbmVyLnByb21pc2UsIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlcywgcmVqZWN0KSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvZyhcIlRpbWVkIG91dCBsb2FkaW5nIGltYWdlXCIsIGNvbnRhaW5lcik7XG4gICAgICAgICAgICByZWplY3QoY29udGFpbmVyKTtcbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgfSldKS50aGVuKGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0pO1xuICAgIHByb21pc2VbJ2NhdGNoJ10oZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlTG9hZGVyO1xuXG59LHtcIi4vZHVtbXlpbWFnZWNvbnRhaW5lclwiOjUsXCIuL2ZyYW1lY29udGFpbmVyXCI6OCxcIi4vaW1hZ2Vjb250YWluZXJcIjoxMCxcIi4vbGluZWFyZ3JhZGllbnRjb250YWluZXJcIjoxMixcIi4vbG9nXCI6MTMsXCIuL3Byb3h5aW1hZ2Vjb250YWluZXJcIjoxNyxcIi4vc3ZnY29udGFpbmVyXCI6MjMsXCIuL3N2Z25vZGVjb250YWluZXJcIjoyNCxcIi4vdXRpbHNcIjoyNixcIi4vd2Via2l0Z3JhZGllbnRjb250YWluZXJcIjoyN31dLDEyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBHcmFkaWVudENvbnRhaW5lciA9IF9kZXJlcV8oJy4vZ3JhZGllbnRjb250YWluZXInKTtcbnZhciBDb2xvciA9IF9kZXJlcV8oJy4vY29sb3InKTtcblxuZnVuY3Rpb24gTGluZWFyR3JhZGllbnRDb250YWluZXIoaW1hZ2VEYXRhKSB7XG4gICAgR3JhZGllbnRDb250YWluZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSBHcmFkaWVudENvbnRhaW5lci5UWVBFUy5MSU5FQVI7XG5cbiAgICB2YXIgaGFzRGlyZWN0aW9uID0gTGluZWFyR3JhZGllbnRDb250YWluZXIuUkVHRVhQX0RJUkVDVElPTi50ZXN0KCBpbWFnZURhdGEuYXJnc1swXSApIHx8XG4gICAgICAgICFHcmFkaWVudENvbnRhaW5lci5SRUdFWFBfQ09MT1JTVE9QLnRlc3QoIGltYWdlRGF0YS5hcmdzWzBdICk7XG5cbiAgICBpZiAoaGFzRGlyZWN0aW9uKSB7XG4gICAgICAgIGltYWdlRGF0YS5hcmdzWzBdLnNwbGl0KC9cXHMrLykucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24ocG9zaXRpb24sIGluZGV4KSB7XG4gICAgICAgICAgICBzd2l0Y2gocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy54MCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy54MSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAgICAgICAgdGhpcy55MCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55MSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLngwID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLngxID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnkwID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnkxID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0b1wiOlxuICAgICAgICAgICAgICAgIHZhciB5MCA9IHRoaXMueTA7XG4gICAgICAgICAgICAgICAgdmFyIHgwID0gdGhpcy54MDtcbiAgICAgICAgICAgICAgICB0aGlzLnkwID0gdGhpcy55MTtcbiAgICAgICAgICAgICAgICB0aGlzLngwID0gdGhpcy54MTtcbiAgICAgICAgICAgICAgICB0aGlzLngxID0geDA7XG4gICAgICAgICAgICAgICAgdGhpcy55MSA9IHkwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBjZW50ZXJlZCBieSBkZWZhdWx0XG4gICAgICAgICAgICAvLyBGaXJlZm94IGludGVybmFsbHkgY29udmVydHMgcG9zaXRpb24ga2V5d29yZHMgdG8gcGVyY2VudGFnZXM6XG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDEwL1dELUNTUzItMjAxMDEyMDcvY29sb3JzLmh0bWwjcHJvcGRlZi1iYWNrZ3JvdW5kLXBvc2l0aW9uXG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBwZXJjZW50YWdlIG9yIGFic29sdXRlIGxlbmd0aFxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHN1cHBvcnQgYWJzb2x1dGUgc3RhcnQgcG9pbnQgcG9zaXRpb25zIChlLmcuLCB1c2UgYm91bmRzIHRvIGNvbnZlcnQgcHggdG8gYSByYXRpbylcbiAgICAgICAgICAgICAgICB2YXIgcmF0aW8gPSBwYXJzZUZsb2F0KHBvc2l0aW9uLCAxMCkgKiAxZS0yO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihyYXRpbykpIHsgLy8gaW52YWxpZCBvciB1bmhhbmRsZWQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkwID0gcmF0aW87XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueTEgPSAxIC0gdGhpcy55MDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLngwID0gcmF0aW87XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueDEgPSAxIC0gdGhpcy54MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMueTAgPSAwO1xuICAgICAgICB0aGlzLnkxID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yU3RvcHMgPSBpbWFnZURhdGEuYXJncy5zbGljZShoYXNEaXJlY3Rpb24gPyAxIDogMCkubWFwKGZ1bmN0aW9uKGNvbG9yU3RvcCkge1xuICAgICAgICB2YXIgY29sb3JTdG9wTWF0Y2ggPSBjb2xvclN0b3AubWF0Y2goR3JhZGllbnRDb250YWluZXIuUkVHRVhQX0NPTE9SU1RPUCk7XG4gICAgICAgIHZhciB2YWx1ZSA9ICtjb2xvclN0b3BNYXRjaFsyXTtcbiAgICAgICAgdmFyIHVuaXQgPSB2YWx1ZSA9PT0gMCA/IFwiJVwiIDogY29sb3JTdG9wTWF0Y2hbM107IC8vIHRyZWF0IFwiMFwiIGFzIFwiMCVcIlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6IG5ldyBDb2xvcihjb2xvclN0b3BNYXRjaFsxXSksXG4gICAgICAgICAgICAvLyBUT0RPOiBzdXBwb3J0IGFic29sdXRlIHN0b3AgcG9zaXRpb25zIChlLmcuLCBjb21wdXRlIGdyYWRpZW50IGxpbmUgbGVuZ3RoICYgY29udmVydCBweCB0byByYXRpbylcbiAgICAgICAgICAgIHN0b3A6IHVuaXQgPT09IFwiJVwiID8gdmFsdWUgLyAxMDAgOiBudWxsXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb2xvclN0b3BzWzBdLnN0b3AgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb2xvclN0b3BzWzBdLnN0b3AgPSAwO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbG9yU3RvcHNbdGhpcy5jb2xvclN0b3BzLmxlbmd0aCAtIDFdLnN0b3AgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb2xvclN0b3BzW3RoaXMuY29sb3JTdG9wcy5sZW5ndGggLSAxXS5zdG9wID0gMTtcbiAgICB9XG5cbiAgICAvLyBjYWxjdWxhdGVzIGFuZCBmaWxscy1pbiBleHBsaWNpdCBzdG9wIHBvc2l0aW9ucyB3aGVuIG9taXR0ZWQgZnJvbSBydWxlXG4gICAgdGhpcy5jb2xvclN0b3BzLmZvckVhY2goZnVuY3Rpb24oY29sb3JTdG9wLCBpbmRleCkge1xuICAgICAgICBpZiAoY29sb3JTdG9wLnN0b3AgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3JTdG9wcy5zbGljZShpbmRleCkuc29tZShmdW5jdGlvbihmaW5kLCBjb3VudCkge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kLnN0b3AgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JTdG9wLnN0b3AgPSAoKGZpbmQuc3RvcCAtIHRoaXMuY29sb3JTdG9wc1tpbmRleCAtIDFdLnN0b3ApIC8gKGNvdW50ICsgMSkpICsgdGhpcy5jb2xvclN0b3BzW2luZGV4IC0gMV0uc3RvcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG59XG5cbkxpbmVhckdyYWRpZW50Q29udGFpbmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3JhZGllbnRDb250YWluZXIucHJvdG90eXBlKTtcblxuLy8gVE9ETzogc3VwcG9ydCA8YW5nbGU+IChlLmcuIC0/XFxkezEsM30oPzpcXC5cXGQrKWRlZywgZXRjLiA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0NTUy9hbmdsZSApXG5MaW5lYXJHcmFkaWVudENvbnRhaW5lci5SRUdFWFBfRElSRUNUSU9OID0gL15cXHMqKD86dG98bGVmdHxyaWdodHx0b3B8Ym90dG9tfGNlbnRlcnxcXGR7MSwzfSg/OlxcLlxcZCspPyU/KSg/Olxcc3wkKS9pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmVhckdyYWRpZW50Q29udGFpbmVyO1xuXG59LHtcIi4vY29sb3JcIjozLFwiLi9ncmFkaWVudGNvbnRhaW5lclwiOjl9XSwxMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgbG9nZ2VyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvZ2dlci5vcHRpb25zLmxvZ2dpbmcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwod2luZG93LmNvbnNvbGUubG9nLCAod2luZG93LmNvbnNvbGUpKS5hcHBseSh3aW5kb3cuY29uc29sZSwgWyhEYXRlLm5vdygpIC0gbG9nZ2VyLm9wdGlvbnMuc3RhcnQpICsgXCJtc1wiLCBcImh0bWwyY2FudmFzOlwiXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKSk7XG4gICAgfVxufTtcblxubG9nZ2VyLm9wdGlvbnMgPSB7bG9nZ2luZzogZmFsc2V9O1xubW9kdWxlLmV4cG9ydHMgPSBsb2dnZXI7XG5cbn0se31dLDE0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBDb2xvciA9IF9kZXJlcV8oJy4vY29sb3InKTtcbnZhciB1dGlscyA9IF9kZXJlcV8oJy4vdXRpbHMnKTtcbnZhciBnZXRCb3VuZHMgPSB1dGlscy5nZXRCb3VuZHM7XG52YXIgcGFyc2VCYWNrZ3JvdW5kcyA9IHV0aWxzLnBhcnNlQmFja2dyb3VuZHM7XG52YXIgb2Zmc2V0Qm91bmRzID0gdXRpbHMub2Zmc2V0Qm91bmRzO1xuXG5mdW5jdGlvbiBOb2RlQ29udGFpbmVyKG5vZGUsIHBhcmVudCkge1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5zdGFjayA9IG51bGw7XG4gICAgdGhpcy5ib3VuZHMgPSBudWxsO1xuICAgIHRoaXMuYm9yZGVycyA9IG51bGw7XG4gICAgdGhpcy5jbGlwID0gW107XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ2xpcCA9IFtdO1xuICAgIHRoaXMub2Zmc2V0Qm91bmRzID0gbnVsbDtcbiAgICB0aGlzLnZpc2libGUgPSBudWxsO1xuICAgIHRoaXMuY29tcHV0ZWRTdHlsZXMgPSBudWxsO1xuICAgIHRoaXMuY29sb3JzID0ge307XG4gICAgdGhpcy5zdHlsZXMgPSB7fTtcbiAgICB0aGlzLmJhY2tncm91bmRJbWFnZXMgPSBudWxsO1xuICAgIHRoaXMudHJhbnNmb3JtRGF0YSA9IG51bGw7XG4gICAgdGhpcy50cmFuc2Zvcm1NYXRyaXggPSBudWxsO1xuICAgIHRoaXMuaXNQc2V1ZG9FbGVtZW50ID0gZmFsc2U7XG4gICAgdGhpcy5vcGFjaXR5ID0gbnVsbDtcbn1cblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuY2xvbmVUbyA9IGZ1bmN0aW9uKHN0YWNrKSB7XG4gICAgc3RhY2sudmlzaWJsZSA9IHRoaXMudmlzaWJsZTtcbiAgICBzdGFjay5ib3JkZXJzID0gdGhpcy5ib3JkZXJzO1xuICAgIHN0YWNrLmJvdW5kcyA9IHRoaXMuYm91bmRzO1xuICAgIHN0YWNrLmNsaXAgPSB0aGlzLmNsaXA7XG4gICAgc3RhY2suYmFja2dyb3VuZENsaXAgPSB0aGlzLmJhY2tncm91bmRDbGlwO1xuICAgIHN0YWNrLmNvbXB1dGVkU3R5bGVzID0gdGhpcy5jb21wdXRlZFN0eWxlcztcbiAgICBzdGFjay5zdHlsZXMgPSB0aGlzLnN0eWxlcztcbiAgICBzdGFjay5iYWNrZ3JvdW5kSW1hZ2VzID0gdGhpcy5iYWNrZ3JvdW5kSW1hZ2VzO1xuICAgIHN0YWNrLm9wYWNpdHkgPSB0aGlzLm9wYWNpdHk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5nZXRPcGFjaXR5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3BhY2l0eSA9PT0gbnVsbCA/ICh0aGlzLm9wYWNpdHkgPSB0aGlzLmNzc0Zsb2F0KCdvcGFjaXR5JykpIDogdGhpcy5vcGFjaXR5O1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuYXNzaWduU3RhY2sgPSBmdW5jdGlvbihzdGFjaykge1xuICAgIHRoaXMuc3RhY2sgPSBzdGFjaztcbiAgICBzdGFjay5jaGlsZHJlbi5wdXNoKHRoaXMpO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuaXNFbGVtZW50VmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFID8gdGhpcy5wYXJlbnQudmlzaWJsZSA6IChcbiAgICAgICAgdGhpcy5jc3MoJ2Rpc3BsYXknKSAhPT0gXCJub25lXCIgJiZcbiAgICAgICAgdGhpcy5jc3MoJ3Zpc2liaWxpdHknKSAhPT0gXCJoaWRkZW5cIiAmJlxuICAgICAgICAhdGhpcy5ub2RlLmhhc0F0dHJpYnV0ZShcImRhdGEtaHRtbDJjYW52YXMtaWdub3JlXCIpICYmXG4gICAgICAgICh0aGlzLm5vZGUubm9kZU5hbWUgIT09IFwiSU5QVVRcIiB8fCB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSAhPT0gXCJoaWRkZW5cIilcbiAgICApO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24oYXR0cmlidXRlKSB7XG4gICAgaWYgKCF0aGlzLmNvbXB1dGVkU3R5bGVzKSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZWRTdHlsZXMgPSB0aGlzLmlzUHNldWRvRWxlbWVudCA/IHRoaXMucGFyZW50LmNvbXB1dGVkU3R5bGUodGhpcy5iZWZvcmUgPyBcIjpiZWZvcmVcIiA6IFwiOmFmdGVyXCIpIDogdGhpcy5jb21wdXRlZFN0eWxlKG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0eWxlc1thdHRyaWJ1dGVdIHx8ICh0aGlzLnN0eWxlc1thdHRyaWJ1dGVdID0gdGhpcy5jb21wdXRlZFN0eWxlc1thdHRyaWJ1dGVdKTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnByZWZpeGVkQ3NzID0gZnVuY3Rpb24oYXR0cmlidXRlKSB7XG4gICAgdmFyIHByZWZpeGVzID0gW1wid2Via2l0XCIsIFwibW96XCIsIFwibXNcIiwgXCJvXCJdO1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuY3NzKGF0dHJpYnV0ZSk7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJlZml4ZXMuc29tZShmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jc3MocHJlZml4ICsgYXR0cmlidXRlLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgYXR0cmlidXRlLnN1YnN0cigxKSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHZhbHVlO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuY29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm5vZGUsIHR5cGUpO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuY3NzSW50ID0gZnVuY3Rpb24oYXR0cmlidXRlKSB7XG4gICAgdmFyIHZhbHVlID0gcGFyc2VJbnQodGhpcy5jc3MoYXR0cmlidXRlKSwgMTApO1xuICAgIHJldHVybiAoaXNOYU4odmFsdWUpKSA/IDAgOiB2YWx1ZTsgLy8gYm9yZGVycyBpbiBvbGQgSUUgYXJlIHRocm93aW5nICdtZWRpdW0nIGZvciBkZW1vLmh0bWxcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLmNvbG9yID0gZnVuY3Rpb24oYXR0cmlidXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JzW2F0dHJpYnV0ZV0gfHwgKHRoaXMuY29sb3JzW2F0dHJpYnV0ZV0gPSBuZXcgQ29sb3IodGhpcy5jc3MoYXR0cmlidXRlKSkpO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuY3NzRmxvYXQgPSBmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICB2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuY3NzKGF0dHJpYnV0ZSkpO1xuICAgIHJldHVybiAoaXNOYU4odmFsdWUpKSA/IDAgOiB2YWx1ZTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLmZvbnRXZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgd2VpZ2h0ID0gdGhpcy5jc3MoXCJmb250V2VpZ2h0XCIpO1xuICAgIHN3aXRjaChwYXJzZUludCh3ZWlnaHQsIDEwKSl7XG4gICAgY2FzZSA0MDE6XG4gICAgICAgIHdlaWdodCA9IFwiYm9sZFwiO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIDQwMDpcbiAgICAgICAgd2VpZ2h0ID0gXCJub3JtYWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB3ZWlnaHQ7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5wYXJzZUNsaXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHRoaXMuY3NzKCdjbGlwJykubWF0Y2godGhpcy5DTElQKTtcbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiBwYXJzZUludChtYXRjaGVzWzFdLCAxMCksXG4gICAgICAgICAgICByaWdodDogcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApLFxuICAgICAgICAgICAgYm90dG9tOiBwYXJzZUludChtYXRjaGVzWzNdLCAxMCksXG4gICAgICAgICAgICBsZWZ0OiBwYXJzZUludChtYXRjaGVzWzRdLCAxMClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5wYXJzZUJhY2tncm91bmRJbWFnZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZ3JvdW5kSW1hZ2VzIHx8ICh0aGlzLmJhY2tncm91bmRJbWFnZXMgPSBwYXJzZUJhY2tncm91bmRzKHRoaXMuY3NzKFwiYmFja2dyb3VuZEltYWdlXCIpKSk7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5jc3NMaXN0ID0gZnVuY3Rpb24ocHJvcGVydHksIGluZGV4KSB7XG4gICAgdmFyIHZhbHVlID0gKHRoaXMuY3NzKHByb3BlcnR5KSB8fCAnJykuc3BsaXQoJywnKTtcbiAgICB2YWx1ZSA9IHZhbHVlW2luZGV4IHx8IDBdIHx8IHZhbHVlWzBdIHx8ICdhdXRvJztcbiAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFsdWUgPSBbdmFsdWVbMF0sIGlzUGVyY2VudGFnZSh2YWx1ZVswXSkgPyAnYXV0bycgOiB2YWx1ZVswXV07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlQmFja2dyb3VuZFNpemUgPSBmdW5jdGlvbihib3VuZHMsIGltYWdlLCBpbmRleCkge1xuICAgIHZhciBzaXplID0gdGhpcy5jc3NMaXN0KFwiYmFja2dyb3VuZFNpemVcIiwgaW5kZXgpO1xuICAgIHZhciB3aWR0aCwgaGVpZ2h0O1xuXG4gICAgaWYgKGlzUGVyY2VudGFnZShzaXplWzBdKSkge1xuICAgICAgICB3aWR0aCA9IGJvdW5kcy53aWR0aCAqIHBhcnNlRmxvYXQoc2l6ZVswXSkgLyAxMDA7XG4gICAgfSBlbHNlIGlmICgvY29udGFpbnxjb3Zlci8udGVzdChzaXplWzBdKSkge1xuICAgICAgICB2YXIgdGFyZ2V0UmF0aW8gPSBib3VuZHMud2lkdGggLyBib3VuZHMuaGVpZ2h0LCBjdXJyZW50UmF0aW8gPSBpbWFnZS53aWR0aCAvIGltYWdlLmhlaWdodDtcbiAgICAgICAgcmV0dXJuICh0YXJnZXRSYXRpbyA8IGN1cnJlbnRSYXRpbyBeIHNpemVbMF0gPT09ICdjb250YWluJykgPyAge3dpZHRoOiBib3VuZHMuaGVpZ2h0ICogY3VycmVudFJhdGlvLCBoZWlnaHQ6IGJvdW5kcy5oZWlnaHR9IDoge3dpZHRoOiBib3VuZHMud2lkdGgsIGhlaWdodDogYm91bmRzLndpZHRoIC8gY3VycmVudFJhdGlvfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aWR0aCA9IHBhcnNlSW50KHNpemVbMF0sIDEwKTtcbiAgICB9XG5cbiAgICBpZiAoc2l6ZVswXSA9PT0gJ2F1dG8nICYmIHNpemVbMV0gPT09ICdhdXRvJykge1xuICAgICAgICBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChzaXplWzFdID09PSAnYXV0bycpIHtcbiAgICAgICAgaGVpZ2h0ID0gd2lkdGggLyBpbWFnZS53aWR0aCAqIGltYWdlLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKGlzUGVyY2VudGFnZShzaXplWzFdKSkge1xuICAgICAgICBoZWlnaHQgPSAgYm91bmRzLmhlaWdodCAqIHBhcnNlRmxvYXQoc2l6ZVsxXSkgLyAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoc2l6ZVsxXSwgMTApO1xuICAgIH1cblxuICAgIGlmIChzaXplWzBdID09PSAnYXV0bycpIHtcbiAgICAgICAgd2lkdGggPSBoZWlnaHQgLyBpbWFnZS5oZWlnaHQgKiBpbWFnZS53aWR0aDtcbiAgICB9XG5cbiAgICByZXR1cm4ge3dpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9O1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUucGFyc2VCYWNrZ3JvdW5kUG9zaXRpb24gPSBmdW5jdGlvbihib3VuZHMsIGltYWdlLCBpbmRleCwgYmFja2dyb3VuZFNpemUpIHtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLmNzc0xpc3QoJ2JhY2tncm91bmRQb3NpdGlvbicsIGluZGV4KTtcbiAgICB2YXIgbGVmdCwgdG9wO1xuXG4gICAgaWYgKGlzUGVyY2VudGFnZShwb3NpdGlvblswXSkpe1xuICAgICAgICBsZWZ0ID0gKGJvdW5kcy53aWR0aCAtIChiYWNrZ3JvdW5kU2l6ZSB8fCBpbWFnZSkud2lkdGgpICogKHBhcnNlRmxvYXQocG9zaXRpb25bMF0pIC8gMTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZWZ0ID0gcGFyc2VJbnQocG9zaXRpb25bMF0sIDEwKTtcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb25bMV0gPT09ICdhdXRvJykge1xuICAgICAgICB0b3AgPSBsZWZ0IC8gaW1hZ2Uud2lkdGggKiBpbWFnZS5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChpc1BlcmNlbnRhZ2UocG9zaXRpb25bMV0pKXtcbiAgICAgICAgdG9wID0gIChib3VuZHMuaGVpZ2h0IC0gKGJhY2tncm91bmRTaXplIHx8IGltYWdlKS5oZWlnaHQpICogcGFyc2VGbG9hdChwb3NpdGlvblsxXSkgLyAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdG9wID0gcGFyc2VJbnQocG9zaXRpb25bMV0sIDEwKTtcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb25bMF0gPT09ICdhdXRvJykge1xuICAgICAgICBsZWZ0ID0gdG9wIC8gaW1hZ2UuaGVpZ2h0ICogaW1hZ2Uud2lkdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtsZWZ0OiBsZWZ0LCB0b3A6IHRvcH07XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5wYXJzZUJhY2tncm91bmRSZXBlYXQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmNzc0xpc3QoXCJiYWNrZ3JvdW5kUmVwZWF0XCIsIGluZGV4KVswXTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlVGV4dFNoYWRvd3MgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGV4dFNoYWRvdyA9IHRoaXMuY3NzKFwidGV4dFNoYWRvd1wiKTtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgaWYgKHRleHRTaGFkb3cgJiYgdGV4dFNoYWRvdyAhPT0gJ25vbmUnKSB7XG4gICAgICAgIHZhciBzaGFkb3dzID0gdGV4dFNoYWRvdy5tYXRjaCh0aGlzLlRFWFRfU0hBRE9XX1BST1BFUlRZKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IHNoYWRvd3MgJiYgKGkgPCBzaGFkb3dzLmxlbmd0aCk7IGkrKykge1xuICAgICAgICAgICAgdmFyIHMgPSBzaGFkb3dzW2ldLm1hdGNoKHRoaXMuVEVYVF9TSEFET1dfVkFMVUVTKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG5ldyBDb2xvcihzWzBdKSxcbiAgICAgICAgICAgICAgICBvZmZzZXRYOiBzWzFdID8gcGFyc2VGbG9hdChzWzFdLnJlcGxhY2UoJ3B4JywgJycpKSA6IDAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WTogc1syXSA/IHBhcnNlRmxvYXQoc1syXS5yZXBsYWNlKCdweCcsICcnKSkgOiAwLFxuICAgICAgICAgICAgICAgIGJsdXI6IHNbM10gPyBzWzNdLnJlcGxhY2UoJ3B4JywgJycpIDogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5wYXJzZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy50cmFuc2Zvcm1EYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1RyYW5zZm9ybSgpKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5wYXJzZUJvdW5kcygpO1xuICAgICAgICAgICAgdmFyIG9yaWdpbiA9IHRoaXMucHJlZml4ZWRDc3MoXCJ0cmFuc2Zvcm1PcmlnaW5cIikuc3BsaXQoXCIgXCIpLm1hcChyZW1vdmVQeCkubWFwKGFzRmxvYXQpO1xuICAgICAgICAgICAgb3JpZ2luWzBdICs9IG9mZnNldC5sZWZ0O1xuICAgICAgICAgICAgb3JpZ2luWzFdICs9IG9mZnNldC50b3A7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybURhdGEgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luOiBvcmlnaW4sXG4gICAgICAgICAgICAgICAgbWF0cml4OiB0aGlzLnBhcnNlVHJhbnNmb3JtTWF0cml4KClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybURhdGEgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luOiBbMCwgMF0sXG4gICAgICAgICAgICAgICAgbWF0cml4OiBbMSwgMCwgMCwgMSwgMCwgMF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtRGF0YTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlVHJhbnNmb3JtTWF0cml4ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnRyYW5zZm9ybU1hdHJpeCkge1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5wcmVmaXhlZENzcyhcInRyYW5zZm9ybVwiKTtcbiAgICAgICAgdmFyIG1hdHJpeCA9IHRyYW5zZm9ybSA/IHBhcnNlTWF0cml4KHRyYW5zZm9ybS5tYXRjaCh0aGlzLk1BVFJJWF9QUk9QRVJUWSkpIDogbnVsbDtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1NYXRyaXggPSBtYXRyaXggPyBtYXRyaXggOiBbMSwgMCwgMCwgMSwgMCwgMF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybU1hdHJpeDtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLnBhcnNlQm91bmRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm91bmRzIHx8ICh0aGlzLmJvdW5kcyA9IHRoaXMuaGFzVHJhbnNmb3JtKCkgPyBvZmZzZXRCb3VuZHModGhpcy5ub2RlKSA6IGdldEJvdW5kcyh0aGlzLm5vZGUpKTtcbn07XG5cbk5vZGVDb250YWluZXIucHJvdG90eXBlLmhhc1RyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlVHJhbnNmb3JtTWF0cml4KCkuam9pbihcIixcIikgIT09IFwiMSwwLDAsMSwwLDBcIiB8fCAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuaGFzVHJhbnNmb3JtKCkpO1xufTtcblxuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLm5vZGUudmFsdWUgfHwgXCJcIjtcbiAgICBpZiAodGhpcy5ub2RlLnRhZ05hbWUgPT09IFwiU0VMRUNUXCIpIHtcbiAgICAgICAgdmFsdWUgPSBzZWxlY3Rpb25WYWx1ZSh0aGlzLm5vZGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnR5cGUgPT09IFwicGFzc3dvcmRcIikge1xuICAgICAgICB2YWx1ZSA9IEFycmF5KHZhbHVlLmxlbmd0aCArIDEpLmpvaW4oJ1xcdTIwMjInKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPT09IDAgPyAodGhpcy5ub2RlLnBsYWNlaG9sZGVyIHx8IFwiXCIpIDogdmFsdWU7XG59O1xuXG5Ob2RlQ29udGFpbmVyLnByb3RvdHlwZS5NQVRSSVhfUFJPUEVSVFkgPSAvKG1hdHJpeHxtYXRyaXgzZClcXCgoLispXFwpLztcbk5vZGVDb250YWluZXIucHJvdG90eXBlLlRFWFRfU0hBRE9XX1BST1BFUlRZID0gLygocmdiYXxyZ2IpXFwoW15cXCldK1xcKShcXHMtP1xcZCtweCl7MCx9KS9nO1xuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuVEVYVF9TSEFET1dfVkFMVUVTID0gLygtP1xcZCtweCl8KCMuKyl8KHJnYlxcKC4rXFwpKXwocmdiYVxcKC4rXFwpKS9nO1xuTm9kZUNvbnRhaW5lci5wcm90b3R5cGUuQ0xJUCA9IC9ecmVjdFxcKChcXGQrKXB4LD8gKFxcZCspcHgsPyAoXFxkKylweCw/IChcXGQrKXB4XFwpJC87XG5cbmZ1bmN0aW9uIHNlbGVjdGlvblZhbHVlKG5vZGUpIHtcbiAgICB2YXIgb3B0aW9uID0gbm9kZS5vcHRpb25zW25vZGUuc2VsZWN0ZWRJbmRleCB8fCAwXTtcbiAgICByZXR1cm4gb3B0aW9uID8gKG9wdGlvbi50ZXh0IHx8IFwiXCIpIDogXCJcIjtcbn1cblxuZnVuY3Rpb24gcGFyc2VNYXRyaXgobWF0Y2gpIHtcbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0gPT09IFwibWF0cml4XCIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoWzJdLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocy50cmltKCkpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoICYmIG1hdGNoWzFdID09PSBcIm1hdHJpeDNkXCIpIHtcbiAgICAgICAgdmFyIG1hdHJpeDNkID0gbWF0Y2hbMl0uc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocy50cmltKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFttYXRyaXgzZFswXSwgbWF0cml4M2RbMV0sIG1hdHJpeDNkWzRdLCBtYXRyaXgzZFs1XSwgbWF0cml4M2RbMTJdLCBtYXRyaXgzZFsxM11dO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNQZXJjZW50YWdlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZihcIiVcIikgIT09IC0xO1xufVxuXG5mdW5jdGlvbiByZW1vdmVQeChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoXCJweFwiLCBcIlwiKTtcbn1cblxuZnVuY3Rpb24gYXNGbG9hdChzdHIpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVDb250YWluZXI7XG5cbn0se1wiLi9jb2xvclwiOjMsXCIuL3V0aWxzXCI6MjZ9XSwxNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgbG9nID0gX2RlcmVxXygnLi9sb2cnKTtcbnZhciBwdW55Y29kZSA9IF9kZXJlcV8oJ3B1bnljb2RlJyk7XG52YXIgTm9kZUNvbnRhaW5lciA9IF9kZXJlcV8oJy4vbm9kZWNvbnRhaW5lcicpO1xudmFyIFRleHRDb250YWluZXIgPSBfZGVyZXFfKCcuL3RleHRjb250YWluZXInKTtcbnZhciBQc2V1ZG9FbGVtZW50Q29udGFpbmVyID0gX2RlcmVxXygnLi9wc2V1ZG9lbGVtZW50Y29udGFpbmVyJyk7XG52YXIgRm9udE1ldHJpY3MgPSBfZGVyZXFfKCcuL2ZvbnRtZXRyaWNzJyk7XG52YXIgQ29sb3IgPSBfZGVyZXFfKCcuL2NvbG9yJyk7XG52YXIgU3RhY2tpbmdDb250ZXh0ID0gX2RlcmVxXygnLi9zdGFja2luZ2NvbnRleHQnKTtcbnZhciB1dGlscyA9IF9kZXJlcV8oJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gdXRpbHMuYmluZDtcbnZhciBnZXRCb3VuZHMgPSB1dGlscy5nZXRCb3VuZHM7XG52YXIgcGFyc2VCYWNrZ3JvdW5kcyA9IHV0aWxzLnBhcnNlQmFja2dyb3VuZHM7XG52YXIgb2Zmc2V0Qm91bmRzID0gdXRpbHMub2Zmc2V0Qm91bmRzO1xuXG5mdW5jdGlvbiBOb2RlUGFyc2VyKGVsZW1lbnQsIHJlbmRlcmVyLCBzdXBwb3J0LCBpbWFnZUxvYWRlciwgb3B0aW9ucykge1xuICAgIGxvZyhcIlN0YXJ0aW5nIE5vZGVQYXJzZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5yYW5nZSA9IG51bGw7XG4gICAgdGhpcy5zdXBwb3J0ID0gc3VwcG9ydDtcbiAgICB0aGlzLnJlbmRlclF1ZXVlID0gW107XG4gICAgdGhpcy5zdGFjayA9IG5ldyBTdGFja2luZ0NvbnRleHQodHJ1ZSwgMSwgZWxlbWVudC5vd25lckRvY3VtZW50LCBudWxsKTtcbiAgICB2YXIgcGFyZW50ID0gbmV3IE5vZGVDb250YWluZXIoZWxlbWVudCwgbnVsbCk7XG4gICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZCkge1xuICAgICAgICByZW5kZXJlci5yZWN0YW5nbGUoMCwgMCwgcmVuZGVyZXIud2lkdGgsIHJlbmRlcmVyLmhlaWdodCwgbmV3IENvbG9yKG9wdGlvbnMuYmFja2dyb3VuZCkpO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudCA9PT0gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLWJhY2tncm91bmQvI3NwZWNpYWwtYmFja2dyb3VuZHNcbiAgICAgICAgdmFyIGNhbnZhc0JhY2tncm91bmQgPSBuZXcgTm9kZUNvbnRhaW5lcihwYXJlbnQuY29sb3IoJ2JhY2tncm91bmRDb2xvcicpLmlzVHJhbnNwYXJlbnQoKSA/IGVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5IDogZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgbnVsbCk7XG4gICAgICAgIHJlbmRlcmVyLnJlY3RhbmdsZSgwLCAwLCByZW5kZXJlci53aWR0aCwgcmVuZGVyZXIuaGVpZ2h0LCBjYW52YXNCYWNrZ3JvdW5kLmNvbG9yKCdiYWNrZ3JvdW5kQ29sb3InKSk7XG4gICAgfVxuICAgIHBhcmVudC52aXNpYmlsZSA9IHBhcmVudC5pc0VsZW1lbnRWaXNpYmxlKCk7XG4gICAgdGhpcy5jcmVhdGVQc2V1ZG9IaWRlU3R5bGVzKGVsZW1lbnQub3duZXJEb2N1bWVudCk7XG4gICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50Lm93bmVyRG9jdW1lbnQpO1xuICAgIHRoaXMubm9kZXMgPSBmbGF0dGVuKFtwYXJlbnRdLmNvbmNhdCh0aGlzLmdldENoaWxkcmVuKHBhcmVudCkpLmZpbHRlcihmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lci52aXNpYmxlID0gY29udGFpbmVyLmlzRWxlbWVudFZpc2libGUoKTtcbiAgICB9KS5tYXAodGhpcy5nZXRQc2V1ZG9FbGVtZW50cywgdGhpcykpO1xuICAgIHRoaXMuZm9udE1ldHJpY3MgPSBuZXcgRm9udE1ldHJpY3MoKTtcbiAgICBsb2coXCJGZXRjaGVkIG5vZGVzLCB0b3RhbDpcIiwgdGhpcy5ub2Rlcy5sZW5ndGgpO1xuICAgIGxvZyhcIkNhbGN1bGF0ZSBvdmVyZmxvdyBjbGlwc1wiKTtcbiAgICB0aGlzLmNhbGN1bGF0ZU92ZXJmbG93Q2xpcHMoKTtcbiAgICBsb2coXCJTdGFydCBmZXRjaGluZyBpbWFnZXNcIik7XG4gICAgdGhpcy5pbWFnZXMgPSBpbWFnZUxvYWRlci5mZXRjaCh0aGlzLm5vZGVzLmZpbHRlcihpc0VsZW1lbnQpKTtcbiAgICB0aGlzLnJlYWR5ID0gdGhpcy5pbWFnZXMucmVhZHkudGhlbihiaW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2coXCJJbWFnZXMgbG9hZGVkLCBzdGFydGluZyBwYXJzaW5nXCIpO1xuICAgICAgICBsb2coXCJDcmVhdGluZyBzdGFja2luZyBjb250ZXh0c1wiKTtcbiAgICAgICAgdGhpcy5jcmVhdGVTdGFja2luZ0NvbnRleHRzKCk7XG4gICAgICAgIGxvZyhcIlNvcnRpbmcgc3RhY2tpbmcgY29udGV4dHNcIik7XG4gICAgICAgIHRoaXMuc29ydFN0YWNraW5nQ29udGV4dHModGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMucGFyc2UodGhpcy5zdGFjayk7XG4gICAgICAgIGxvZyhcIlJlbmRlciBxdWV1ZSBjcmVhdGVkIHdpdGggXCIgKyB0aGlzLnJlbmRlclF1ZXVlLmxlbmd0aCArIFwiIGl0ZW1zXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYmluZChmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclF1ZXVlLmZvckVhY2godGhpcy5wYWludCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Yob3B0aW9ucy5hc3luYykgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXN5bmMuY2FsbCh0aGlzLCB0aGlzLnJlbmRlclF1ZXVlLCByZXNvbHZlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZW5kZXJRdWV1ZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmFzeW5jUmVuZGVyZXIodGhpcy5yZW5kZXJRdWV1ZSwgcmVzb2x2ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgIH0sIHRoaXMpKTtcbn1cblxuTm9kZVBhcnNlci5wcm90b3R5cGUuY2FsY3VsYXRlT3ZlcmZsb3dDbGlwcyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubm9kZXMuZm9yRWFjaChmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgaWYgKGlzRWxlbWVudChjb250YWluZXIpKSB7XG4gICAgICAgICAgICBpZiAoaXNQc2V1ZG9FbGVtZW50KGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kVG9ET00oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5ib3JkZXJzID0gdGhpcy5wYXJzZUJvcmRlcnMoY29udGFpbmVyKTtcbiAgICAgICAgICAgIHZhciBjbGlwID0gKGNvbnRhaW5lci5jc3MoJ292ZXJmbG93JykgPT09IFwiaGlkZGVuXCIpID8gW2NvbnRhaW5lci5ib3JkZXJzLmNsaXBdIDogW107XG4gICAgICAgICAgICB2YXIgY3NzQ2xpcCA9IGNvbnRhaW5lci5wYXJzZUNsaXAoKTtcbiAgICAgICAgICAgIGlmIChjc3NDbGlwICYmIFtcImFic29sdXRlXCIsIFwiZml4ZWRcIl0uaW5kZXhPZihjb250YWluZXIuY3NzKCdwb3NpdGlvbicpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjbGlwLnB1c2goW1tcInJlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5ib3VuZHMubGVmdCArIGNzc0NsaXAubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5ib3VuZHMudG9wICsgY3NzQ2xpcC50b3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGlwLnJpZ2h0IC0gY3NzQ2xpcC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xpcC5ib3R0b20gLSBjc3NDbGlwLnRvcFxuICAgICAgICAgICAgICAgIF1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGlwID0gaGFzUGFyZW50Q2xpcChjb250YWluZXIpID8gY29udGFpbmVyLnBhcmVudC5jbGlwLmNvbmNhdChjbGlwKSA6IGNsaXA7XG4gICAgICAgICAgICBjb250YWluZXIuYmFja2dyb3VuZENsaXAgPSAoY29udGFpbmVyLmNzcygnb3ZlcmZsb3cnKSAhPT0gXCJoaWRkZW5cIikgPyBjb250YWluZXIuY2xpcC5jb25jYXQoW2NvbnRhaW5lci5ib3JkZXJzLmNsaXBdKSA6IGNvbnRhaW5lci5jbGlwO1xuICAgICAgICAgICAgaWYgKGlzUHNldWRvRWxlbWVudChjb250YWluZXIpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsZWFuRE9NKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNUZXh0Tm9kZShjb250YWluZXIpKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xpcCA9IGhhc1BhcmVudENsaXAoY29udGFpbmVyKSA/IGNvbnRhaW5lci5wYXJlbnQuY2xpcCA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNQc2V1ZG9FbGVtZW50KGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5ib3VuZHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG59O1xuXG5mdW5jdGlvbiBoYXNQYXJlbnRDbGlwKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIucGFyZW50ICYmIGNvbnRhaW5lci5wYXJlbnQuY2xpcC5sZW5ndGg7XG59XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLmFzeW5jUmVuZGVyZXIgPSBmdW5jdGlvbihxdWV1ZSwgcmVzb2x2ZSwgYXN5bmNUaW1lcikge1xuICAgIGFzeW5jVGltZXIgPSBhc3luY1RpbWVyIHx8IERhdGUubm93KCk7XG4gICAgdGhpcy5wYWludChxdWV1ZVt0aGlzLnJlbmRlckluZGV4KytdKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSB0aGlzLnJlbmRlckluZGV4KSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICB9IGVsc2UgaWYgKGFzeW5jVGltZXIgKyAyMCA+IERhdGUubm93KCkpIHtcbiAgICAgICAgdGhpcy5hc3luY1JlbmRlcmVyKHF1ZXVlLCByZXNvbHZlLCBhc3luY1RpbWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGJpbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmFzeW5jUmVuZGVyZXIocXVldWUsIHJlc29sdmUpO1xuICAgICAgICB9LCB0aGlzKSwgMCk7XG4gICAgfVxufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUuY3JlYXRlUHNldWRvSGlkZVN0eWxlcyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gICAgdGhpcy5jcmVhdGVTdHlsZXMoZG9jdW1lbnQsICcuJyArIFBzZXVkb0VsZW1lbnRDb250YWluZXIucHJvdG90eXBlLlBTRVVET19ISURFX0VMRU1FTlRfQ0xBU1NfQkVGT1JFICsgJzpiZWZvcmUgeyBjb250ZW50OiBcIlwiICFpbXBvcnRhbnQ7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfScgK1xuICAgICAgICAnLicgKyBQc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5QU0VVRE9fSElERV9FTEVNRU5UX0NMQVNTX0FGVEVSICsgJzphZnRlciB7IGNvbnRlbnQ6IFwiXCIgIWltcG9ydGFudDsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9Jyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5kaXNhYmxlQW5pbWF0aW9ucyA9IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gICAgdGhpcy5jcmVhdGVTdHlsZXMoZG9jdW1lbnQsICcqIHsgLXdlYmtpdC1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDsgLW1vei1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDsgLW8tYW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQ7IGFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50OyAnICtcbiAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50OyAtbW96LXRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDsgLW8tdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50OyB0cmFuc2l0aW9uOiBub25lICFpbXBvcnRhbnQ7fScpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUuY3JlYXRlU3R5bGVzID0gZnVuY3Rpb24oZG9jdW1lbnQsIHN0eWxlcykge1xuICAgIHZhciBoaWRlUHNldWRvRWxlbWVudHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhpZGVQc2V1ZG9FbGVtZW50cy5pbm5lckhUTUwgPSBzdHlsZXM7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoaWRlUHNldWRvRWxlbWVudHMpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUuZ2V0UHNldWRvRWxlbWVudHMgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICB2YXIgbm9kZXMgPSBbW2NvbnRhaW5lcl1dO1xuICAgIGlmIChjb250YWluZXIubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgdmFyIGJlZm9yZSA9IHRoaXMuZ2V0UHNldWRvRWxlbWVudChjb250YWluZXIsIFwiOmJlZm9yZVwiKTtcbiAgICAgICAgdmFyIGFmdGVyID0gdGhpcy5nZXRQc2V1ZG9FbGVtZW50KGNvbnRhaW5lciwgXCI6YWZ0ZXJcIik7XG5cbiAgICAgICAgaWYgKGJlZm9yZSkge1xuICAgICAgICAgICAgbm9kZXMucHVzaChiZWZvcmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKGFmdGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmxhdHRlbihub2Rlcyk7XG59O1xuXG5mdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhcXC1bYS16XSkvZywgZnVuY3Rpb24obWF0Y2gpe1xuICAgICAgICByZXR1cm4gbWF0Y2gudG9VcHBlckNhc2UoKS5yZXBsYWNlKCctJywnJyk7XG4gICAgfSk7XG59XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLmdldFBzZXVkb0VsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIsIHR5cGUpIHtcbiAgICB2YXIgc3R5bGUgPSBjb250YWluZXIuY29tcHV0ZWRTdHlsZSh0eXBlKTtcbiAgICBpZighc3R5bGUgfHwgIXN0eWxlLmNvbnRlbnQgfHwgc3R5bGUuY29udGVudCA9PT0gXCJub25lXCIgfHwgc3R5bGUuY29udGVudCA9PT0gXCItbW96LWFsdC1jb250ZW50XCIgfHwgc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRlbnQgPSBzdHJpcFF1b3RlcyhzdHlsZS5jb250ZW50KTtcbiAgICB2YXIgaXNJbWFnZSA9IGNvbnRlbnQuc3Vic3RyKDAsIDMpID09PSAndXJsJztcbiAgICB2YXIgcHNldWRvTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXNJbWFnZSA/ICdpbWcnIDogJ2h0bWwyY2FudmFzcHNldWRvZWxlbWVudCcpO1xuICAgIHZhciBwc2V1ZG9Db250YWluZXIgPSBuZXcgUHNldWRvRWxlbWVudENvbnRhaW5lcihwc2V1ZG9Ob2RlLCBjb250YWluZXIsIHR5cGUpO1xuXG4gICAgZm9yICh2YXIgaSA9IHN0eWxlLmxlbmd0aC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgcHJvcGVydHkgPSB0b0NhbWVsQ2FzZShzdHlsZS5pdGVtKGkpKTtcbiAgICAgICAgcHNldWRvTm9kZS5zdHlsZVtwcm9wZXJ0eV0gPSBzdHlsZVtwcm9wZXJ0eV07XG4gICAgfVxuXG4gICAgcHNldWRvTm9kZS5jbGFzc05hbWUgPSBQc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5QU0VVRE9fSElERV9FTEVNRU5UX0NMQVNTX0JFRk9SRSArIFwiIFwiICsgUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuUFNFVURPX0hJREVfRUxFTUVOVF9DTEFTU19BRlRFUjtcblxuICAgIGlmIChpc0ltYWdlKSB7XG4gICAgICAgIHBzZXVkb05vZGUuc3JjID0gcGFyc2VCYWNrZ3JvdW5kcyhjb250ZW50KVswXS5hcmdzWzBdO1xuICAgICAgICByZXR1cm4gW3BzZXVkb0NvbnRhaW5lcl07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgcHNldWRvTm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIFtwc2V1ZG9Db250YWluZXIsIG5ldyBUZXh0Q29udGFpbmVyKHRleHQsIHBzZXVkb0NvbnRhaW5lcildO1xuICAgIH1cbn07XG5cblxuTm9kZVBhcnNlci5wcm90b3R5cGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihwYXJlbnRDb250YWluZXIpIHtcbiAgICByZXR1cm4gZmxhdHRlbihbXS5maWx0ZXIuY2FsbChwYXJlbnRDb250YWluZXIubm9kZS5jaGlsZE5vZGVzLCByZW5kZXJhYmxlTm9kZSkubWFwKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IFtub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSA/IG5ldyBUZXh0Q29udGFpbmVyKG5vZGUsIHBhcmVudENvbnRhaW5lcikgOiBuZXcgTm9kZUNvbnRhaW5lcihub2RlLCBwYXJlbnRDb250YWluZXIpXS5maWx0ZXIobm9uSWdub3JlZEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgY29udGFpbmVyLmxlbmd0aCAmJiBub2RlLnRhZ05hbWUgIT09IFwiVEVYVEFSRUFcIiA/IChjb250YWluZXJbMF0uaXNFbGVtZW50VmlzaWJsZSgpID8gY29udGFpbmVyLmNvbmNhdCh0aGlzLmdldENoaWxkcmVuKGNvbnRhaW5lclswXSkpIDogW10pIDogY29udGFpbmVyO1xuICAgIH0sIHRoaXMpKTtcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLm5ld1N0YWNraW5nQ29udGV4dCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgaGFzT3duU3RhY2tpbmcpIHtcbiAgICB2YXIgc3RhY2sgPSBuZXcgU3RhY2tpbmdDb250ZXh0KGhhc093blN0YWNraW5nLCBjb250YWluZXIuZ2V0T3BhY2l0eSgpLCBjb250YWluZXIubm9kZSwgY29udGFpbmVyLnBhcmVudCk7XG4gICAgY29udGFpbmVyLmNsb25lVG8oc3RhY2spO1xuICAgIHZhciBwYXJlbnRTdGFjayA9IGhhc093blN0YWNraW5nID8gc3RhY2suZ2V0UGFyZW50U3RhY2sodGhpcykgOiBzdGFjay5wYXJlbnQuc3RhY2s7XG4gICAgcGFyZW50U3RhY2suY29udGV4dHMucHVzaChzdGFjayk7XG4gICAgY29udGFpbmVyLnN0YWNrID0gc3RhY2s7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5jcmVhdGVTdGFja2luZ0NvbnRleHRzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoaXNFbGVtZW50KGNvbnRhaW5lcikgJiYgKHRoaXMuaXNSb290RWxlbWVudChjb250YWluZXIpIHx8IGhhc09wYWNpdHkoY29udGFpbmVyKSB8fCBpc1Bvc2l0aW9uZWRGb3JTdGFja2luZyhjb250YWluZXIpIHx8IHRoaXMuaXNCb2R5V2l0aFRyYW5zcGFyZW50Um9vdChjb250YWluZXIpIHx8IGNvbnRhaW5lci5oYXNUcmFuc2Zvcm0oKSkpIHtcbiAgICAgICAgICAgIHRoaXMubmV3U3RhY2tpbmdDb250ZXh0KGNvbnRhaW5lciwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNFbGVtZW50KGNvbnRhaW5lcikgJiYgKChpc1Bvc2l0aW9uZWQoY29udGFpbmVyKSAmJiB6SW5kZXgwKGNvbnRhaW5lcikpIHx8IGlzSW5saW5lQmxvY2soY29udGFpbmVyKSB8fCBpc0Zsb2F0aW5nKGNvbnRhaW5lcikpKSB7XG4gICAgICAgICAgICB0aGlzLm5ld1N0YWNraW5nQ29udGV4dChjb250YWluZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hc3NpZ25TdGFjayhjb250YWluZXIucGFyZW50LnN0YWNrKTtcbiAgICAgICAgfVxuICAgIH0sIHRoaXMpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUuaXNCb2R5V2l0aFRyYW5zcGFyZW50Um9vdCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIubm9kZS5ub2RlTmFtZSA9PT0gXCJCT0RZXCIgJiYgY29udGFpbmVyLnBhcmVudC5jb2xvcignYmFja2dyb3VuZENvbG9yJykuaXNUcmFuc3BhcmVudCgpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUuaXNSb290RWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIucGFyZW50ID09PSBudWxsO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUuc29ydFN0YWNraW5nQ29udGV4dHMgPSBmdW5jdGlvbihzdGFjaykge1xuICAgIHN0YWNrLmNvbnRleHRzLnNvcnQoekluZGV4U29ydChzdGFjay5jb250ZXh0cy5zbGljZSgwKSkpO1xuICAgIHN0YWNrLmNvbnRleHRzLmZvckVhY2godGhpcy5zb3J0U3RhY2tpbmdDb250ZXh0cywgdGhpcyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRleHRCb3VuZHMgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odGV4dCwgaW5kZXgsIHRleHRMaXN0KSB7XG4gICAgICAgIGlmIChjb250YWluZXIucGFyZW50LmNzcyhcInRleHREZWNvcmF0aW9uXCIpLnN1YnN0cigwLCA0KSAhPT0gXCJub25lXCIgfHwgdGV4dC50cmltKCkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdXBwb3J0LnJhbmdlQm91bmRzICYmICFjb250YWluZXIucGFyZW50Lmhhc1RyYW5zZm9ybSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRleHRMaXN0LnNsaWNlKDAsIGluZGV4KS5qb2luKFwiXCIpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSYW5nZUJvdW5kcyhjb250YWluZXIubm9kZSwgb2Zmc2V0LCB0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlICYmIHR5cGVvZihjb250YWluZXIubm9kZS5kYXRhKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudE5vZGUgPSBjb250YWluZXIubm9kZS5zcGxpdFRleHQodGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldFdyYXBwZXJCb3VuZHMoY29udGFpbmVyLm5vZGUsIGNvbnRhaW5lci5wYXJlbnQuaGFzVHJhbnNmb3JtKCkpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5ub2RlID0gcmVwbGFjZW1lbnROb2RlO1xuICAgICAgICAgICAgICAgIHJldHVybiBib3VuZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZighdGhpcy5zdXBwb3J0LnJhbmdlQm91bmRzIHx8IGNvbnRhaW5lci5wYXJlbnQuaGFzVHJhbnNmb3JtKCkpe1xuICAgICAgICAgICAgY29udGFpbmVyLm5vZGUgPSBjb250YWluZXIubm9kZS5zcGxpdFRleHQodGV4dC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9O1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUuZ2V0V3JhcHBlckJvdW5kcyA9IGZ1bmN0aW9uKG5vZGUsIHRyYW5zZm9ybSkge1xuICAgIHZhciB3cmFwcGVyID0gbm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwyY2FudmFzd3JhcHBlcicpO1xuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGUsXG4gICAgICAgIGJhY2t1cFRleHQgPSBub2RlLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQobm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQod3JhcHBlciwgbm9kZSk7XG4gICAgdmFyIGJvdW5kcyA9IHRyYW5zZm9ybSA/IG9mZnNldEJvdW5kcyh3cmFwcGVyKSA6IGdldEJvdW5kcyh3cmFwcGVyKTtcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGJhY2t1cFRleHQsIHdyYXBwZXIpO1xuICAgIHJldHVybiBib3VuZHM7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5nZXRSYW5nZUJvdW5kcyA9IGZ1bmN0aW9uKG5vZGUsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgdmFyIHJhbmdlID0gdGhpcy5yYW5nZSB8fCAodGhpcy5yYW5nZSA9IG5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVSYW5nZSgpKTtcbiAgICByYW5nZS5zZXRTdGFydChub2RlLCBvZmZzZXQpO1xuICAgIHJhbmdlLnNldEVuZChub2RlLCBvZmZzZXQgKyBsZW5ndGgpO1xuICAgIHJldHVybiByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn07XG5cbmZ1bmN0aW9uIENsZWFyVHJhbnNmb3JtKCkge31cblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihzdGFjaykge1xuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3Zpc3VyZW4uaHRtbCN6LWluZGV4XG4gICAgdmFyIG5lZ2F0aXZlWmluZGV4ID0gc3RhY2suY29udGV4dHMuZmlsdGVyKG5lZ2F0aXZlWkluZGV4KTsgLy8gMi4gdGhlIGNoaWxkIHN0YWNraW5nIGNvbnRleHRzIHdpdGggbmVnYXRpdmUgc3RhY2sgbGV2ZWxzIChtb3N0IG5lZ2F0aXZlIGZpcnN0KS5cbiAgICB2YXIgZGVzY2VuZGFudEVsZW1lbnRzID0gc3RhY2suY2hpbGRyZW4uZmlsdGVyKGlzRWxlbWVudCk7XG4gICAgdmFyIGRlc2NlbmRhbnROb25GbG9hdHMgPSBkZXNjZW5kYW50RWxlbWVudHMuZmlsdGVyKG5vdChpc0Zsb2F0aW5nKSk7XG4gICAgdmFyIG5vbklubGluZU5vblBvc2l0aW9uZWREZXNjZW5kYW50cyA9IGRlc2NlbmRhbnROb25GbG9hdHMuZmlsdGVyKG5vdChpc1Bvc2l0aW9uZWQpKS5maWx0ZXIobm90KGlubGluZUxldmVsKSk7IC8vIDMgdGhlIGluLWZsb3csIG5vbi1pbmxpbmUtbGV2ZWwsIG5vbi1wb3NpdGlvbmVkIGRlc2NlbmRhbnRzLlxuICAgIHZhciBub25Qb3NpdGlvbmVkRmxvYXRzID0gZGVzY2VuZGFudEVsZW1lbnRzLmZpbHRlcihub3QoaXNQb3NpdGlvbmVkKSkuZmlsdGVyKGlzRmxvYXRpbmcpOyAvLyA0LiB0aGUgbm9uLXBvc2l0aW9uZWQgZmxvYXRzLlxuICAgIHZhciBpbkZsb3cgPSBkZXNjZW5kYW50Tm9uRmxvYXRzLmZpbHRlcihub3QoaXNQb3NpdGlvbmVkKSkuZmlsdGVyKGlubGluZUxldmVsKTsgLy8gNS4gdGhlIGluLWZsb3csIGlubGluZS1sZXZlbCwgbm9uLXBvc2l0aW9uZWQgZGVzY2VuZGFudHMsIGluY2x1ZGluZyBpbmxpbmUgdGFibGVzIGFuZCBpbmxpbmUgYmxvY2tzLlxuICAgIHZhciBzdGFja0xldmVsMCA9IHN0YWNrLmNvbnRleHRzLmNvbmNhdChkZXNjZW5kYW50Tm9uRmxvYXRzLmZpbHRlcihpc1Bvc2l0aW9uZWQpKS5maWx0ZXIoekluZGV4MCk7IC8vIDYuIHRoZSBjaGlsZCBzdGFja2luZyBjb250ZXh0cyB3aXRoIHN0YWNrIGxldmVsIDAgYW5kIHRoZSBwb3NpdGlvbmVkIGRlc2NlbmRhbnRzIHdpdGggc3RhY2sgbGV2ZWwgMC5cbiAgICB2YXIgdGV4dCA9IHN0YWNrLmNoaWxkcmVuLmZpbHRlcihpc1RleHROb2RlKS5maWx0ZXIoaGFzVGV4dCk7XG4gICAgdmFyIHBvc2l0aXZlWmluZGV4ID0gc3RhY2suY29udGV4dHMuZmlsdGVyKHBvc2l0aXZlWkluZGV4KTsgLy8gNy4gdGhlIGNoaWxkIHN0YWNraW5nIGNvbnRleHRzIHdpdGggcG9zaXRpdmUgc3RhY2sgbGV2ZWxzIChsZWFzdCBwb3NpdGl2ZSBmaXJzdCkuXG4gICAgbmVnYXRpdmVaaW5kZXguY29uY2F0KG5vbklubGluZU5vblBvc2l0aW9uZWREZXNjZW5kYW50cykuY29uY2F0KG5vblBvc2l0aW9uZWRGbG9hdHMpXG4gICAgICAgIC5jb25jYXQoaW5GbG93KS5jb25jYXQoc3RhY2tMZXZlbDApLmNvbmNhdCh0ZXh0KS5jb25jYXQocG9zaXRpdmVaaW5kZXgpLmZvckVhY2goZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclF1ZXVlLnB1c2goY29udGFpbmVyKTtcbiAgICAgICAgICAgIGlmIChpc1N0YWNraW5nQ29udGV4dChjb250YWluZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUXVldWUucHVzaChuZXcgQ2xlYXJUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFpbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgQ2xlYXJUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1RleHROb2RlKGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIGlmIChpc1BzZXVkb0VsZW1lbnQoY29udGFpbmVyLnBhcmVudCkpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucGFyZW50LmFwcGVuZFRvRE9NKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBhaW50VGV4dChjb250YWluZXIpO1xuICAgICAgICAgICAgaWYgKGlzUHNldWRvRWxlbWVudChjb250YWluZXIucGFyZW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wYXJlbnQuY2xlYW5ET00oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFpbnROb2RlKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbG9nKGUpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0cmljdCkge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhaW50Tm9kZSA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIGlmIChpc1N0YWNraW5nQ29udGV4dChjb250YWluZXIpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0T3BhY2l0eShjb250YWluZXIub3BhY2l0eSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuY3R4LnNhdmUoKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5oYXNUcmFuc2Zvcm0oKSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRUcmFuc2Zvcm0oY29udGFpbmVyLnBhcnNlVHJhbnNmb3JtKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5lci5ub2RlLm5vZGVOYW1lID09PSBcIklOUFVUXCIgJiYgY29udGFpbmVyLm5vZGUudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgIHRoaXMucGFpbnRDaGVja2JveChjb250YWluZXIpO1xuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGUubm9kZU5hbWUgPT09IFwiSU5QVVRcIiAmJiBjb250YWluZXIubm9kZS50eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICAgICAgdGhpcy5wYWludFJhZGlvKGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYWludEVsZW1lbnQoY29udGFpbmVyKTtcbiAgICB9XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5wYWludEVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICB2YXIgYm91bmRzID0gY29udGFpbmVyLnBhcnNlQm91bmRzKCk7XG4gICAgdGhpcy5yZW5kZXJlci5jbGlwKGNvbnRhaW5lci5iYWNrZ3JvdW5kQ2xpcCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyQmFja2dyb3VuZChjb250YWluZXIsIGJvdW5kcywgY29udGFpbmVyLmJvcmRlcnMuYm9yZGVycy5tYXAoZ2V0V2lkdGgpKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMucmVuZGVyZXIuY2xpcChjb250YWluZXIuY2xpcCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyQm9yZGVycyhjb250YWluZXIuYm9yZGVycy5ib3JkZXJzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMucmVuZGVyZXIuY2xpcChjb250YWluZXIuYmFja2dyb3VuZENsaXAsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzd2l0Y2ggKGNvbnRhaW5lci5ub2RlLm5vZGVOYW1lKSB7XG4gICAgICAgIGNhc2UgXCJzdmdcIjpcbiAgICAgICAgY2FzZSBcIklGUkFNRVwiOlxuICAgICAgICAgICAgdmFyIGltZ0NvbnRhaW5lciA9IHRoaXMuaW1hZ2VzLmdldChjb250YWluZXIubm9kZSk7XG4gICAgICAgICAgICBpZiAoaW1nQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJJbWFnZShjb250YWluZXIsIGJvdW5kcywgY29udGFpbmVyLmJvcmRlcnMsIGltZ0NvbnRhaW5lcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZyhcIkVycm9yIGxvYWRpbmcgPFwiICsgY29udGFpbmVyLm5vZGUubm9kZU5hbWUgKyBcIj5cIiwgY29udGFpbmVyLm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJJTUdcIjpcbiAgICAgICAgICAgIHZhciBpbWFnZUNvbnRhaW5lciA9IHRoaXMuaW1hZ2VzLmdldChjb250YWluZXIubm9kZS5zcmMpO1xuICAgICAgICAgICAgaWYgKGltYWdlQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJJbWFnZShjb250YWluZXIsIGJvdW5kcywgY29udGFpbmVyLmJvcmRlcnMsIGltYWdlQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKFwiRXJyb3IgbG9hZGluZyA8aW1nPlwiLCBjb250YWluZXIubm9kZS5zcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJDQU5WQVNcIjpcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVySW1hZ2UoY29udGFpbmVyLCBib3VuZHMsIGNvbnRhaW5lci5ib3JkZXJzLCB7aW1hZ2U6IGNvbnRhaW5lci5ub2RlfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlNFTEVDVFwiOlxuICAgICAgICBjYXNlIFwiSU5QVVRcIjpcbiAgICAgICAgY2FzZSBcIlRFWFRBUkVBXCI6XG4gICAgICAgICAgICB0aGlzLnBhaW50Rm9ybVZhbHVlKGNvbnRhaW5lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sIHRoaXMpO1xufTtcblxuTm9kZVBhcnNlci5wcm90b3R5cGUucGFpbnRDaGVja2JveCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHZhciBiID0gY29udGFpbmVyLnBhcnNlQm91bmRzKCk7XG5cbiAgICB2YXIgc2l6ZSA9IE1hdGgubWluKGIud2lkdGgsIGIuaGVpZ2h0KTtcbiAgICB2YXIgYm91bmRzID0ge3dpZHRoOiBzaXplIC0gMSwgaGVpZ2h0OiBzaXplIC0gMSwgdG9wOiBiLnRvcCwgbGVmdDogYi5sZWZ0fTtcbiAgICB2YXIgciA9IFszLCAzXTtcbiAgICB2YXIgcmFkaXVzID0gW3IsIHIsIHIsIHJdO1xuICAgIHZhciBib3JkZXJzID0gWzEsMSwxLDFdLm1hcChmdW5jdGlvbih3KSB7XG4gICAgICAgIHJldHVybiB7Y29sb3I6IG5ldyBDb2xvcignI0E1QTVBNScpLCB3aWR0aDogd307XG4gICAgfSk7XG5cbiAgICB2YXIgYm9yZGVyUG9pbnRzID0gY2FsY3VsYXRlQ3VydmVQb2ludHMoYm91bmRzLCByYWRpdXMsIGJvcmRlcnMpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5jbGlwKGNvbnRhaW5lci5iYWNrZ3JvdW5kQ2xpcCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVjdGFuZ2xlKGJvdW5kcy5sZWZ0ICsgMSwgYm91bmRzLnRvcCArIDEsIGJvdW5kcy53aWR0aCAtIDIsIGJvdW5kcy5oZWlnaHQgLSAyLCBuZXcgQ29sb3IoXCIjREVERURFXCIpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJCb3JkZXJzKGNhbGN1bGF0ZUJvcmRlcnMoYm9yZGVycywgYm91bmRzLCBib3JkZXJQb2ludHMsIHJhZGl1cykpO1xuICAgICAgICBpZiAoY29udGFpbmVyLm5vZGUuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5mb250KG5ldyBDb2xvcignIzQyNDI0MicpLCAnbm9ybWFsJywgJ25vcm1hbCcsICdib2xkJywgKHNpemUgLSAzKSArIFwicHhcIiwgJ2FyaWFsJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnRleHQoXCJcXHUyNzE0XCIsIGJvdW5kcy5sZWZ0ICsgc2l6ZSAvIDYsIGJvdW5kcy50b3AgKyBzaXplIC0gMSk7XG4gICAgICAgIH1cbiAgICB9LCB0aGlzKTtcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhaW50UmFkaW8gPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICB2YXIgYm91bmRzID0gY29udGFpbmVyLnBhcnNlQm91bmRzKCk7XG5cbiAgICB2YXIgc2l6ZSA9IE1hdGgubWluKGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCkgLSAyO1xuXG4gICAgdGhpcy5yZW5kZXJlci5jbGlwKGNvbnRhaW5lci5iYWNrZ3JvdW5kQ2xpcCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuY2lyY2xlU3Ryb2tlKGJvdW5kcy5sZWZ0ICsgMSwgYm91bmRzLnRvcCArIDEsIHNpemUsIG5ldyBDb2xvcignI0RFREVERScpLCAxLCBuZXcgQ29sb3IoJyNBNUE1QTUnKSk7XG4gICAgICAgIGlmIChjb250YWluZXIubm9kZS5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNpcmNsZShNYXRoLmNlaWwoYm91bmRzLmxlZnQgKyBzaXplIC8gNCkgKyAxLCBNYXRoLmNlaWwoYm91bmRzLnRvcCArIHNpemUgLyA0KSArIDEsIE1hdGguZmxvb3Ioc2l6ZSAvIDIpLCBuZXcgQ29sb3IoJyM0MjQyNDInKSk7XG4gICAgICAgIH1cbiAgICB9LCB0aGlzKTtcbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhaW50Rm9ybVZhbHVlID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGFpbmVyLmdldFZhbHVlKCk7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGRvY3VtZW50ID0gY29udGFpbmVyLm5vZGUub3duZXJEb2N1bWVudDtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdodG1sMmNhbnZhc3dyYXBwZXInKTtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBbJ2xpbmVIZWlnaHQnLCAndGV4dEFsaWduJywgJ2ZvbnRGYW1pbHknLCAnZm9udFdlaWdodCcsICdmb250U2l6ZScsICdjb2xvcicsXG4gICAgICAgICAgICAncGFkZGluZ0xlZnQnLCAncGFkZGluZ1RvcCcsICdwYWRkaW5nUmlnaHQnLCAncGFkZGluZ0JvdHRvbScsXG4gICAgICAgICAgICAnd2lkdGgnLCAnaGVpZ2h0JywgJ2JvcmRlckxlZnRTdHlsZScsICdib3JkZXJUb3BTdHlsZScsICdib3JkZXJMZWZ0V2lkdGgnLCAnYm9yZGVyVG9wV2lkdGgnLFxuICAgICAgICAgICAgJ2JveFNpemluZycsICd3aGl0ZVNwYWNlJywgJ3dvcmRXcmFwJ107XG5cbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHdyYXBwZXIuc3R5bGVbcHJvcGVydHldID0gY29udGFpbmVyLmNzcyhwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBPbGRlciBJRSBoYXMgaXNzdWVzIHdpdGggXCJib3JkZXJcIlxuICAgICAgICAgICAgICAgIGxvZyhcImh0bWwyY2FudmFzOiBQYXJzZTogRXhjZXB0aW9uIGNhdWdodCBpbiByZW5kZXJGb3JtVmFsdWU6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBib3VuZHMgPSBjb250YWluZXIucGFyc2VCb3VuZHMoKTtcbiAgICAgICAgd3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgICAgd3JhcHBlci5zdHlsZS5sZWZ0ID0gYm91bmRzLmxlZnQgKyBcInB4XCI7XG4gICAgICAgIHdyYXBwZXIuc3R5bGUudG9wID0gYm91bmRzLnRvcCArIFwicHhcIjtcbiAgICAgICAgd3JhcHBlci50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuICAgICAgICB0aGlzLnBhaW50VGV4dChuZXcgVGV4dENvbnRhaW5lcih3cmFwcGVyLmZpcnN0Q2hpbGQsIGNvbnRhaW5lcikpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHdyYXBwZXIpO1xuICAgIH1cbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhaW50VGV4dCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lci5hcHBseVRleHRUcmFuc2Zvcm0oKTtcbiAgICB2YXIgY2hhcmFjdGVycyA9IHB1bnljb2RlLnVjczIuZGVjb2RlKGNvbnRhaW5lci5ub2RlLmRhdGEpO1xuICAgIHZhciB0ZXh0TGlzdCA9ICghdGhpcy5vcHRpb25zLmxldHRlclJlbmRlcmluZyB8fCBub0xldHRlclNwYWNpbmcoY29udGFpbmVyKSkgJiYgIWhhc1VuaWNvZGUoY29udGFpbmVyLm5vZGUuZGF0YSkgPyBnZXRXb3JkcyhjaGFyYWN0ZXJzKSA6IGNoYXJhY3RlcnMubWFwKGZ1bmN0aW9uKGNoYXJhY3Rlcikge1xuICAgICAgICByZXR1cm4gcHVueWNvZGUudWNzMi5lbmNvZGUoW2NoYXJhY3Rlcl0pO1xuICAgIH0pO1xuXG4gICAgdmFyIHdlaWdodCA9IGNvbnRhaW5lci5wYXJlbnQuZm9udFdlaWdodCgpO1xuICAgIHZhciBzaXplID0gY29udGFpbmVyLnBhcmVudC5jc3MoJ2ZvbnRTaXplJyk7XG4gICAgdmFyIGZhbWlseSA9IGNvbnRhaW5lci5wYXJlbnQuY3NzKCdmb250RmFtaWx5Jyk7XG4gICAgdmFyIHNoYWRvd3MgPSBjb250YWluZXIucGFyZW50LnBhcnNlVGV4dFNoYWRvd3MoKTtcblxuICAgIHRoaXMucmVuZGVyZXIuZm9udChjb250YWluZXIucGFyZW50LmNvbG9yKCdjb2xvcicpLCBjb250YWluZXIucGFyZW50LmNzcygnZm9udFN0eWxlJyksIGNvbnRhaW5lci5wYXJlbnQuY3NzKCdmb250VmFyaWFudCcpLCB3ZWlnaHQsIHNpemUsIGZhbWlseSk7XG4gICAgaWYgKHNoYWRvd3MubGVuZ3RoKSB7XG4gICAgICAgIC8vIFRPRE86IHN1cHBvcnQgbXVsdGlwbGUgdGV4dCBzaGFkb3dzXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZm9udFNoYWRvdyhzaGFkb3dzWzBdLmNvbG9yLCBzaGFkb3dzWzBdLm9mZnNldFgsIHNoYWRvd3NbMF0ub2Zmc2V0WSwgc2hhZG93c1swXS5ibHVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmNsZWFyU2hhZG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5jbGlwKGNvbnRhaW5lci5wYXJlbnQuY2xpcCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRleHRMaXN0Lm1hcCh0aGlzLnBhcnNlVGV4dEJvdW5kcyhjb250YWluZXIpLCB0aGlzKS5mb3JFYWNoKGZ1bmN0aW9uKGJvdW5kcywgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChib3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnRleHQodGV4dExpc3RbaW5kZXhdLCBib3VuZHMubGVmdCwgYm91bmRzLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUZXh0RGVjb3JhdGlvbihjb250YWluZXIucGFyZW50LCBib3VuZHMsIHRoaXMuZm9udE1ldHJpY3MuZ2V0TWV0cmljcyhmYW1pbHksIHNpemUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSwgdGhpcyk7XG59O1xuXG5Ob2RlUGFyc2VyLnByb3RvdHlwZS5yZW5kZXJUZXh0RGVjb3JhdGlvbiA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYm91bmRzLCBtZXRyaWNzKSB7XG4gICAgc3dpdGNoKGNvbnRhaW5lci5jc3MoXCJ0ZXh0RGVjb3JhdGlvblwiKS5zcGxpdChcIiBcIilbMF0pIHtcbiAgICBjYXNlIFwidW5kZXJsaW5lXCI6XG4gICAgICAgIC8vIERyYXdzIGEgbGluZSBhdCB0aGUgYmFzZWxpbmUgb2YgdGhlIGZvbnRcbiAgICAgICAgLy8gVE9ETyBBcyBzb21lIGJyb3dzZXJzIGRpc3BsYXkgdGhlIGxpbmUgYXMgbW9yZSB0aGFuIDFweCBpZiB0aGUgZm9udC1zaXplIGlzIGJpZywgbmVlZCB0byB0YWtlIHRoYXQgaW50byBhY2NvdW50IGJvdGggaW4gcG9zaXRpb24gYW5kIHNpemVcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZWN0YW5nbGUoYm91bmRzLmxlZnQsIE1hdGgucm91bmQoYm91bmRzLnRvcCArIG1ldHJpY3MuYmFzZWxpbmUgKyBtZXRyaWNzLmxpbmVXaWR0aCksIGJvdW5kcy53aWR0aCwgMSwgY29udGFpbmVyLmNvbG9yKFwiY29sb3JcIikpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwib3ZlcmxpbmVcIjpcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZWN0YW5nbGUoYm91bmRzLmxlZnQsIE1hdGgucm91bmQoYm91bmRzLnRvcCksIGJvdW5kcy53aWR0aCwgMSwgY29udGFpbmVyLmNvbG9yKFwiY29sb3JcIikpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwibGluZS10aHJvdWdoXCI6XG4gICAgICAgIC8vIFRPRE8gdHJ5IGFuZCBmaW5kIGV4YWN0IHBvc2l0aW9uIGZvciBsaW5lLXRocm91Z2hcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZWN0YW5nbGUoYm91bmRzLmxlZnQsIE1hdGguY2VpbChib3VuZHMudG9wICsgbWV0cmljcy5taWRkbGUgKyBtZXRyaWNzLmxpbmVXaWR0aCksIGJvdW5kcy53aWR0aCwgMSwgY29udGFpbmVyLmNvbG9yKFwiY29sb3JcIikpO1xuICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG52YXIgYm9yZGVyQ29sb3JUcmFuc2Zvcm1zID0ge1xuICAgIGluc2V0OiBbXG4gICAgICAgIFtcImRhcmtlblwiLCAwLjYwXSxcbiAgICAgICAgW1wiZGFya2VuXCIsIDAuMTBdLFxuICAgICAgICBbXCJkYXJrZW5cIiwgMC4xMF0sXG4gICAgICAgIFtcImRhcmtlblwiLCAwLjYwXVxuICAgIF1cbn07XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhcnNlQm9yZGVycyA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHZhciBub2RlQm91bmRzID0gY29udGFpbmVyLnBhcnNlQm91bmRzKCk7XG4gICAgdmFyIHJhZGl1cyA9IGdldEJvcmRlclJhZGl1c0RhdGEoY29udGFpbmVyKTtcbiAgICB2YXIgYm9yZGVycyA9IFtcIlRvcFwiLCBcIlJpZ2h0XCIsIFwiQm90dG9tXCIsIFwiTGVmdFwiXS5tYXAoZnVuY3Rpb24oc2lkZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gY29udGFpbmVyLmNzcygnYm9yZGVyJyArIHNpZGUgKyAnU3R5bGUnKTtcbiAgICAgICAgdmFyIGNvbG9yID0gY29udGFpbmVyLmNvbG9yKCdib3JkZXInICsgc2lkZSArICdDb2xvcicpO1xuICAgICAgICBpZiAoc3R5bGUgPT09IFwiaW5zZXRcIiAmJiBjb2xvci5pc0JsYWNrKCkpIHtcbiAgICAgICAgICAgIGNvbG9yID0gbmV3IENvbG9yKFsyNTUsIDI1NSwgMjU1LCBjb2xvci5hXSk7IC8vIHRoaXMgaXMgd3JvbmcsIGJ1dFxuICAgICAgICB9XG4gICAgICAgIHZhciBjb2xvclRyYW5zZm9ybSA9IGJvcmRlckNvbG9yVHJhbnNmb3Jtc1tzdHlsZV0gPyBib3JkZXJDb2xvclRyYW5zZm9ybXNbc3R5bGVdW2luZGV4XSA6IG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogY29udGFpbmVyLmNzc0ludCgnYm9yZGVyJyArIHNpZGUgKyAnV2lkdGgnKSxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclRyYW5zZm9ybSA/IGNvbG9yW2NvbG9yVHJhbnNmb3JtWzBdXShjb2xvclRyYW5zZm9ybVsxXSkgOiBjb2xvcixcbiAgICAgICAgICAgIGFyZ3M6IG51bGxcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgYm9yZGVyUG9pbnRzID0gY2FsY3VsYXRlQ3VydmVQb2ludHMobm9kZUJvdW5kcywgcmFkaXVzLCBib3JkZXJzKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNsaXA6IHRoaXMucGFyc2VCYWNrZ3JvdW5kQ2xpcChjb250YWluZXIsIGJvcmRlclBvaW50cywgYm9yZGVycywgcmFkaXVzLCBub2RlQm91bmRzKSxcbiAgICAgICAgYm9yZGVyczogY2FsY3VsYXRlQm9yZGVycyhib3JkZXJzLCBub2RlQm91bmRzLCBib3JkZXJQb2ludHMsIHJhZGl1cylcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlQm9yZGVycyhib3JkZXJzLCBub2RlQm91bmRzLCBib3JkZXJQb2ludHMsIHJhZGl1cykge1xuICAgIHJldHVybiBib3JkZXJzLm1hcChmdW5jdGlvbihib3JkZXIsIGJvcmRlclNpZGUpIHtcbiAgICAgICAgaWYgKGJvcmRlci53aWR0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBieCA9IG5vZGVCb3VuZHMubGVmdDtcbiAgICAgICAgICAgIHZhciBieSA9IG5vZGVCb3VuZHMudG9wO1xuICAgICAgICAgICAgdmFyIGJ3ID0gbm9kZUJvdW5kcy53aWR0aDtcbiAgICAgICAgICAgIHZhciBiaCA9IG5vZGVCb3VuZHMuaGVpZ2h0IC0gKGJvcmRlcnNbMl0ud2lkdGgpO1xuXG4gICAgICAgICAgICBzd2l0Y2goYm9yZGVyU2lkZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIC8vIHRvcCBib3JkZXJcbiAgICAgICAgICAgICAgICBiaCA9IGJvcmRlcnNbMF0ud2lkdGg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjMTogW2J4LCBieV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjMjogW2J4ICsgYncsIGJ5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGMzOiBbYnggKyBidyAtIGJvcmRlcnNbMV0ud2lkdGgsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzQ6IFtieCArIGJvcmRlcnNbM10ud2lkdGgsIGJ5ICsgYmhdXG4gICAgICAgICAgICAgICAgICAgIH0sIHJhZGl1c1swXSwgcmFkaXVzWzFdLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJQb2ludHMudG9wTGVmdE91dGVyLCBib3JkZXJQb2ludHMudG9wTGVmdElubmVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IGJvcmRlclxuICAgICAgICAgICAgICAgIGJ4ID0gbm9kZUJvdW5kcy5sZWZ0ICsgbm9kZUJvdW5kcy53aWR0aCAtIChib3JkZXJzWzFdLndpZHRoKTtcbiAgICAgICAgICAgICAgICBidyA9IGJvcmRlcnNbMV0ud2lkdGg7XG5cbiAgICAgICAgICAgICAgICBib3JkZXIuYXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMxOiBbYnggKyBidywgYnldLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzI6IFtieCArIGJ3LCBieSArIGJoICsgYm9yZGVyc1syXS53aWR0aF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjMzogW2J4LCBieSArIGJoXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGM0OiBbYngsIGJ5ICsgYm9yZGVyc1swXS53aWR0aF1cbiAgICAgICAgICAgICAgICAgICAgfSwgcmFkaXVzWzFdLCByYWRpdXNbMl0sXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRJbm5lciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gYm9yZGVyXG4gICAgICAgICAgICAgICAgYnkgPSAoYnkgKyBub2RlQm91bmRzLmhlaWdodCkgLSAoYm9yZGVyc1syXS53aWR0aCk7XG4gICAgICAgICAgICAgICAgYmggPSBib3JkZXJzWzJdLndpZHRoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5hcmdzID0gZHJhd1NpZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYzE6IFtieCArIGJ3LCBieSArIGJoXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGMyOiBbYngsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzM6IFtieCArIGJvcmRlcnNbM10ud2lkdGgsIGJ5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGM0OiBbYnggKyBidyAtIGJvcmRlcnNbM10ud2lkdGgsIGJ5XVxuICAgICAgICAgICAgICAgICAgICB9LCByYWRpdXNbMl0sIHJhZGl1c1szXSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAvLyBsZWZ0IGJvcmRlclxuICAgICAgICAgICAgICAgIGJ3ID0gYm9yZGVyc1szXS53aWR0aDtcbiAgICAgICAgICAgICAgICBib3JkZXIuYXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMxOiBbYngsIGJ5ICsgYmggKyBib3JkZXJzWzJdLndpZHRoXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGMyOiBbYngsIGJ5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGMzOiBbYnggKyBidywgYnkgKyBib3JkZXJzWzBdLndpZHRoXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGM0OiBbYnggKyBidywgYnkgKyBiaF1cbiAgICAgICAgICAgICAgICAgICAgfSwgcmFkaXVzWzNdLCByYWRpdXNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib3JkZXI7XG4gICAgfSk7XG59XG5cbk5vZGVQYXJzZXIucHJvdG90eXBlLnBhcnNlQmFja2dyb3VuZENsaXAgPSBmdW5jdGlvbihjb250YWluZXIsIGJvcmRlclBvaW50cywgYm9yZGVycywgcmFkaXVzLCBib3VuZHMpIHtcbiAgICB2YXIgYmFja2dyb3VuZENsaXAgPSBjb250YWluZXIuY3NzKCdiYWNrZ3JvdW5kQ2xpcCcpLFxuICAgICAgICBib3JkZXJBcmdzID0gW107XG5cbiAgICBzd2l0Y2goYmFja2dyb3VuZENsaXApIHtcbiAgICBjYXNlIFwiY29udGVudC1ib3hcIjpcbiAgICBjYXNlIFwicGFkZGluZy1ib3hcIjpcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzBdLCByYWRpdXNbMV0sIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3VuZHMubGVmdCArIGJvcmRlcnNbM10ud2lkdGgsIGJvdW5kcy50b3AgKyBib3JkZXJzWzBdLndpZHRoKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzFdLCByYWRpdXNbMl0sIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSBib3JkZXJzWzFdLndpZHRoLCBib3VuZHMudG9wICsgYm9yZGVyc1swXS53aWR0aCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1syXSwgcmFkaXVzWzNdLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSBib3JkZXJzWzFdLndpZHRoLCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIGJvcmRlcnNbMl0ud2lkdGgpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbM10sIHJhZGl1c1swXSwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lciwgYm91bmRzLmxlZnQgKyBib3JkZXJzWzNdLndpZHRoLCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIGJvcmRlcnNbMl0ud2lkdGgpO1xuICAgICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1swXSwgcmFkaXVzWzFdLCBib3JkZXJQb2ludHMudG9wTGVmdE91dGVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm91bmRzLmxlZnQsIGJvdW5kcy50b3ApO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMV0sIHJhZGl1c1syXSwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCwgYm91bmRzLnRvcCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1syXSwgcmFkaXVzWzNdLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGgsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzNdLCByYWRpdXNbMF0sIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvdW5kcy5sZWZ0LCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBib3JkZXJBcmdzO1xufTtcblxuZnVuY3Rpb24gZ2V0Q3VydmVQb2ludHMoeCwgeSwgcjEsIHIyKSB7XG4gICAgdmFyIGthcHBhID0gNCAqICgoTWF0aC5zcXJ0KDIpIC0gMSkgLyAzKTtcbiAgICB2YXIgb3ggPSAocjEpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IGhvcml6b250YWxcbiAgICAgICAgb3kgPSAocjIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IHZlcnRpY2FsXG4gICAgICAgIHhtID0geCArIHIxLCAvLyB4LW1pZGRsZVxuICAgICAgICB5bSA9IHkgKyByMjsgLy8geS1taWRkbGVcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3BMZWZ0OiBiZXppZXJDdXJ2ZSh7eDogeCwgeTogeW19LCB7eDogeCwgeTogeW0gLSBveX0sIHt4OiB4bSAtIG94LCB5OiB5fSwge3g6IHhtLCB5OiB5fSksXG4gICAgICAgIHRvcFJpZ2h0OiBiZXppZXJDdXJ2ZSh7eDogeCwgeTogeX0sIHt4OiB4ICsgb3gseTogeX0sIHt4OiB4bSwgeTogeW0gLSBveX0sIHt4OiB4bSwgeTogeW19KSxcbiAgICAgICAgYm90dG9tUmlnaHQ6IGJlemllckN1cnZlKHt4OiB4bSwgeTogeX0sIHt4OiB4bSwgeTogeSArIG95fSwge3g6IHggKyBveCwgeTogeW19LCB7eDogeCwgeTogeW19KSxcbiAgICAgICAgYm90dG9tTGVmdDogYmV6aWVyQ3VydmUoe3g6IHhtLCB5OiB5bX0sIHt4OiB4bSAtIG94LCB5OiB5bX0sIHt4OiB4LCB5OiB5ICsgb3l9LCB7eDogeCwgeTp5fSlcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVDdXJ2ZVBvaW50cyhib3VuZHMsIGJvcmRlclJhZGl1cywgYm9yZGVycykge1xuICAgIHZhciB4ID0gYm91bmRzLmxlZnQsXG4gICAgICAgIHkgPSBib3VuZHMudG9wLFxuICAgICAgICB3aWR0aCA9IGJvdW5kcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gYm91bmRzLmhlaWdodCxcblxuICAgICAgICB0bGggPSBib3JkZXJSYWRpdXNbMF1bMF0gPCB3aWR0aCAvIDIgPyBib3JkZXJSYWRpdXNbMF1bMF0gOiB3aWR0aCAvIDIsXG4gICAgICAgIHRsdiA9IGJvcmRlclJhZGl1c1swXVsxXSA8IGhlaWdodCAvIDIgPyBib3JkZXJSYWRpdXNbMF1bMV0gOiBoZWlnaHQgLyAyLFxuICAgICAgICB0cmggPSBib3JkZXJSYWRpdXNbMV1bMF0gPCB3aWR0aCAvIDIgPyBib3JkZXJSYWRpdXNbMV1bMF0gOiB3aWR0aCAvIDIsXG4gICAgICAgIHRydiA9IGJvcmRlclJhZGl1c1sxXVsxXSA8IGhlaWdodCAvIDIgPyBib3JkZXJSYWRpdXNbMV1bMV0gOiBoZWlnaHQgLyAyLFxuICAgICAgICBicmggPSBib3JkZXJSYWRpdXNbMl1bMF0gPCB3aWR0aCAvIDIgPyBib3JkZXJSYWRpdXNbMl1bMF0gOiB3aWR0aCAvIDIsXG4gICAgICAgIGJydiA9IGJvcmRlclJhZGl1c1syXVsxXSA8IGhlaWdodCAvIDIgPyBib3JkZXJSYWRpdXNbMl1bMV0gOiBoZWlnaHQgLyAyLFxuICAgICAgICBibGggPSBib3JkZXJSYWRpdXNbM11bMF0gPCB3aWR0aCAvIDIgPyBib3JkZXJSYWRpdXNbM11bMF0gOiB3aWR0aCAvIDIsXG4gICAgICAgIGJsdiA9IGJvcmRlclJhZGl1c1szXVsxXSA8IGhlaWdodCAvIDIgPyBib3JkZXJSYWRpdXNbM11bMV0gOiBoZWlnaHQgLyAyO1xuXG4gICAgdmFyIHRvcFdpZHRoID0gd2lkdGggLSB0cmgsXG4gICAgICAgIHJpZ2h0SGVpZ2h0ID0gaGVpZ2h0IC0gYnJ2LFxuICAgICAgICBib3R0b21XaWR0aCA9IHdpZHRoIC0gYnJoLFxuICAgICAgICBsZWZ0SGVpZ2h0ID0gaGVpZ2h0IC0gYmx2O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wTGVmdE91dGVyOiBnZXRDdXJ2ZVBvaW50cyh4LCB5LCB0bGgsIHRsdikudG9wTGVmdC5zdWJkaXZpZGUoMC41KSxcbiAgICAgICAgdG9wTGVmdElubmVyOiBnZXRDdXJ2ZVBvaW50cyh4ICsgYm9yZGVyc1szXS53aWR0aCwgeSArIGJvcmRlcnNbMF0ud2lkdGgsIE1hdGgubWF4KDAsIHRsaCAtIGJvcmRlcnNbM10ud2lkdGgpLCBNYXRoLm1heCgwLCB0bHYgLSBib3JkZXJzWzBdLndpZHRoKSkudG9wTGVmdC5zdWJkaXZpZGUoMC41KSxcbiAgICAgICAgdG9wUmlnaHRPdXRlcjogZ2V0Q3VydmVQb2ludHMoeCArIHRvcFdpZHRoLCB5LCB0cmgsIHRydikudG9wUmlnaHQuc3ViZGl2aWRlKDAuNSksXG4gICAgICAgIHRvcFJpZ2h0SW5uZXI6IGdldEN1cnZlUG9pbnRzKHggKyBNYXRoLm1pbih0b3BXaWR0aCwgd2lkdGggKyBib3JkZXJzWzNdLndpZHRoKSwgeSArIGJvcmRlcnNbMF0ud2lkdGgsICh0b3BXaWR0aCA+IHdpZHRoICsgYm9yZGVyc1szXS53aWR0aCkgPyAwIDp0cmggLSBib3JkZXJzWzNdLndpZHRoLCB0cnYgLSBib3JkZXJzWzBdLndpZHRoKS50b3BSaWdodC5zdWJkaXZpZGUoMC41KSxcbiAgICAgICAgYm90dG9tUmlnaHRPdXRlcjogZ2V0Q3VydmVQb2ludHMoeCArIGJvdHRvbVdpZHRoLCB5ICsgcmlnaHRIZWlnaHQsIGJyaCwgYnJ2KS5ib3R0b21SaWdodC5zdWJkaXZpZGUoMC41KSxcbiAgICAgICAgYm90dG9tUmlnaHRJbm5lcjogZ2V0Q3VydmVQb2ludHMoeCArIE1hdGgubWluKGJvdHRvbVdpZHRoLCB3aWR0aCAtIGJvcmRlcnNbM10ud2lkdGgpLCB5ICsgTWF0aC5taW4ocmlnaHRIZWlnaHQsIGhlaWdodCArIGJvcmRlcnNbMF0ud2lkdGgpLCBNYXRoLm1heCgwLCBicmggLSBib3JkZXJzWzFdLndpZHRoKSwgIGJydiAtIGJvcmRlcnNbMl0ud2lkdGgpLmJvdHRvbVJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuICAgICAgICBib3R0b21MZWZ0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKHgsIHkgKyBsZWZ0SGVpZ2h0LCBibGgsIGJsdikuYm90dG9tTGVmdC5zdWJkaXZpZGUoMC41KSxcbiAgICAgICAgYm90dG9tTGVmdElubmVyOiBnZXRDdXJ2ZVBvaW50cyh4ICsgYm9yZGVyc1szXS53aWR0aCwgeSArIGxlZnRIZWlnaHQsIE1hdGgubWF4KDAsIGJsaCAtIGJvcmRlcnNbM10ud2lkdGgpLCBibHYgLSBib3JkZXJzWzJdLndpZHRoKS5ib3R0b21MZWZ0LnN1YmRpdmlkZSgwLjUpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYmV6aWVyQ3VydmUoc3RhcnQsIHN0YXJ0Q29udHJvbCwgZW5kQ29udHJvbCwgZW5kKSB7XG4gICAgdmFyIGxlcnAgPSBmdW5jdGlvbiAoYSwgYiwgdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogYS54ICsgKGIueCAtIGEueCkgKiB0LFxuICAgICAgICAgICAgeTogYS55ICsgKGIueSAtIGEueSkgKiB0XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgc3RhcnRDb250cm9sOiBzdGFydENvbnRyb2wsXG4gICAgICAgIGVuZENvbnRyb2w6IGVuZENvbnRyb2wsXG4gICAgICAgIGVuZDogZW5kLFxuICAgICAgICBzdWJkaXZpZGU6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgIHZhciBhYiA9IGxlcnAoc3RhcnQsIHN0YXJ0Q29udHJvbCwgdCksXG4gICAgICAgICAgICAgICAgYmMgPSBsZXJwKHN0YXJ0Q29udHJvbCwgZW5kQ29udHJvbCwgdCksXG4gICAgICAgICAgICAgICAgY2QgPSBsZXJwKGVuZENvbnRyb2wsIGVuZCwgdCksXG4gICAgICAgICAgICAgICAgYWJiYyA9IGxlcnAoYWIsIGJjLCB0KSxcbiAgICAgICAgICAgICAgICBiY2NkID0gbGVycChiYywgY2QsIHQpLFxuICAgICAgICAgICAgICAgIGRlc3QgPSBsZXJwKGFiYmMsIGJjY2QsIHQpO1xuICAgICAgICAgICAgcmV0dXJuIFtiZXppZXJDdXJ2ZShzdGFydCwgYWIsIGFiYmMsIGRlc3QpLCBiZXppZXJDdXJ2ZShkZXN0LCBiY2NkLCBjZCwgZW5kKV07XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnZlVG86IGZ1bmN0aW9uKGJvcmRlckFyZ3MpIHtcbiAgICAgICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJiZXppZXJDdXJ2ZVwiLCBzdGFydENvbnRyb2wueCwgc3RhcnRDb250cm9sLnksIGVuZENvbnRyb2wueCwgZW5kQ29udHJvbC55LCBlbmQueCwgZW5kLnldKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3VydmVUb1JldmVyc2VkOiBmdW5jdGlvbihib3JkZXJBcmdzKSB7XG4gICAgICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wiYmV6aWVyQ3VydmVcIiwgZW5kQ29udHJvbC54LCBlbmRDb250cm9sLnksIHN0YXJ0Q29udHJvbC54LCBzdGFydENvbnRyb2wueSwgc3RhcnQueCwgc3RhcnQueV0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZHJhd1NpZGUoYm9yZGVyRGF0YSwgcmFkaXVzMSwgcmFkaXVzMiwgb3V0ZXIxLCBpbm5lcjEsIG91dGVyMiwgaW5uZXIyKSB7XG4gICAgdmFyIGJvcmRlckFyZ3MgPSBbXTtcblxuICAgIGlmIChyYWRpdXMxWzBdID4gMCB8fCByYWRpdXMxWzFdID4gMCkge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBvdXRlcjFbMV0uc3RhcnQueCwgb3V0ZXIxWzFdLnN0YXJ0LnldKTtcbiAgICAgICAgb3V0ZXIxWzFdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzFbMF0sIGJvcmRlckRhdGEuYzFbMV1dKTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzMlswXSA+IDAgfHwgcmFkaXVzMlsxXSA+IDApIHtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgb3V0ZXIyWzBdLnN0YXJ0LngsIG91dGVyMlswXS5zdGFydC55XSk7XG4gICAgICAgIG91dGVyMlswXS5jdXJ2ZVRvKGJvcmRlckFyZ3MpO1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBpbm5lcjJbMF0uZW5kLngsIGlubmVyMlswXS5lbmQueV0pO1xuICAgICAgICBpbm5lcjJbMF0uY3VydmVUb1JldmVyc2VkKGJvcmRlckFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGJvcmRlckRhdGEuYzJbMF0sIGJvcmRlckRhdGEuYzJbMV1dKTtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgYm9yZGVyRGF0YS5jM1swXSwgYm9yZGVyRGF0YS5jM1sxXV0pO1xuICAgIH1cblxuICAgIGlmIChyYWRpdXMxWzBdID4gMCB8fCByYWRpdXMxWzFdID4gMCkge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBpbm5lcjFbMV0uZW5kLngsIGlubmVyMVsxXS5lbmQueV0pO1xuICAgICAgICBpbm5lcjFbMV0uY3VydmVUb1JldmVyc2VkKGJvcmRlckFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGJvcmRlckRhdGEuYzRbMF0sIGJvcmRlckRhdGEuYzRbMV1dKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9yZGVyQXJncztcbn1cblxuZnVuY3Rpb24gcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzMSwgcmFkaXVzMiwgY29ybmVyMSwgY29ybmVyMiwgeCwgeSkge1xuICAgIGlmIChyYWRpdXMxWzBdID4gMCB8fCByYWRpdXMxWzFdID4gMCkge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBjb3JuZXIxWzBdLnN0YXJ0LngsIGNvcm5lcjFbMF0uc3RhcnQueV0pO1xuICAgICAgICBjb3JuZXIxWzBdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgICAgIGNvcm5lcjFbMV0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCB4LCB5XSk7XG4gICAgfVxuXG4gICAgaWYgKHJhZGl1czJbMF0gPiAwIHx8IHJhZGl1czJbMV0gPiAwKSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGNvcm5lcjJbMF0uc3RhcnQueCwgY29ybmVyMlswXS5zdGFydC55XSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBuZWdhdGl2ZVpJbmRleChjb250YWluZXIpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmNzc0ludChcInpJbmRleFwiKSA8IDA7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aXZlWkluZGV4KGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIuY3NzSW50KFwiekluZGV4XCIpID4gMDtcbn1cblxuZnVuY3Rpb24gekluZGV4MChjb250YWluZXIpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmNzc0ludChcInpJbmRleFwiKSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gaW5saW5lTGV2ZWwoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIFtcImlubGluZVwiLCBcImlubGluZS1ibG9ja1wiLCBcImlubGluZS10YWJsZVwiXS5pbmRleE9mKGNvbnRhaW5lci5jc3MoXCJkaXNwbGF5XCIpKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIGlzU3RhY2tpbmdDb250ZXh0KGNvbnRhaW5lcikge1xuICAgIHJldHVybiAoY29udGFpbmVyIGluc3RhbmNlb2YgU3RhY2tpbmdDb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gaGFzVGV4dChjb250YWluZXIpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLm5vZGUuZGF0YS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuZnVuY3Rpb24gbm9MZXR0ZXJTcGFjaW5nKGNvbnRhaW5lcikge1xuICAgIHJldHVybiAoL14obm9ybWFsfG5vbmV8MHB4KSQvLnRlc3QoY29udGFpbmVyLnBhcmVudC5jc3MoXCJsZXR0ZXJTcGFjaW5nXCIpKSk7XG59XG5cbmZ1bmN0aW9uIGdldEJvcmRlclJhZGl1c0RhdGEoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIFtcIlRvcExlZnRcIiwgXCJUb3BSaWdodFwiLCBcIkJvdHRvbVJpZ2h0XCIsIFwiQm90dG9tTGVmdFwiXS5tYXAoZnVuY3Rpb24oc2lkZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBjb250YWluZXIuY3NzKCdib3JkZXInICsgc2lkZSArICdSYWRpdXMnKTtcbiAgICAgICAgdmFyIGFyciA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgYXJyWzFdID0gYXJyWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnIubWFwKGFzSW50KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyYWJsZU5vZGUobm9kZSkge1xuICAgIHJldHVybiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpO1xufVxuXG5mdW5jdGlvbiBpc1Bvc2l0aW9uZWRGb3JTdGFja2luZyhjb250YWluZXIpIHtcbiAgICB2YXIgcG9zaXRpb24gPSBjb250YWluZXIuY3NzKFwicG9zaXRpb25cIik7XG4gICAgdmFyIHpJbmRleCA9IChbXCJhYnNvbHV0ZVwiLCBcInJlbGF0aXZlXCIsIFwiZml4ZWRcIl0uaW5kZXhPZihwb3NpdGlvbikgIT09IC0xKSA/IGNvbnRhaW5lci5jc3MoXCJ6SW5kZXhcIikgOiBcImF1dG9cIjtcbiAgICByZXR1cm4gekluZGV4ICE9PSBcImF1dG9cIjtcbn1cblxuZnVuY3Rpb24gaXNQb3NpdGlvbmVkKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIuY3NzKFwicG9zaXRpb25cIikgIT09IFwic3RhdGljXCI7XG59XG5cbmZ1bmN0aW9uIGlzRmxvYXRpbmcoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5jc3MoXCJmbG9hdFwiKSAhPT0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGlzSW5saW5lQmxvY2soY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIFtcImlubGluZS1ibG9ja1wiLCBcImlubGluZS10YWJsZVwiXS5pbmRleE9mKGNvbnRhaW5lci5jc3MoXCJkaXNwbGF5XCIpKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIG5vdChjYWxsYmFjaykge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhY2FsbGJhY2suYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpc0VsZW1lbnQoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5ub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERTtcbn1cblxuZnVuY3Rpb24gaXNQc2V1ZG9FbGVtZW50KGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIuaXNQc2V1ZG9FbGVtZW50ID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc1RleHROb2RlKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREU7XG59XG5cbmZ1bmN0aW9uIHpJbmRleFNvcnQoY29udGV4dHMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gKGEuY3NzSW50KFwiekluZGV4XCIpICsgKGNvbnRleHRzLmluZGV4T2YoYSkgLyBjb250ZXh0cy5sZW5ndGgpKSAtIChiLmNzc0ludChcInpJbmRleFwiKSArIChjb250ZXh0cy5pbmRleE9mKGIpIC8gY29udGV4dHMubGVuZ3RoKSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaGFzT3BhY2l0eShjb250YWluZXIpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldE9wYWNpdHkoKSA8IDE7XG59XG5cbmZ1bmN0aW9uIGFzSW50KHZhbHVlKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoKGJvcmRlcikge1xuICAgIHJldHVybiBib3JkZXIud2lkdGg7XG59XG5cbmZ1bmN0aW9uIG5vbklnbm9yZWRFbGVtZW50KG5vZGVDb250YWluZXIpIHtcbiAgICByZXR1cm4gKG5vZGVDb250YWluZXIubm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUgfHwgW1wiU0NSSVBUXCIsIFwiSEVBRFwiLCBcIlRJVExFXCIsIFwiT0JKRUNUXCIsIFwiQlJcIiwgXCJPUFRJT05cIl0uaW5kZXhPZihub2RlQ29udGFpbmVyLm5vZGUubm9kZU5hbWUpID09PSAtMSk7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXlzKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbn1cblxuZnVuY3Rpb24gc3RyaXBRdW90ZXMoY29udGVudCkge1xuICAgIHZhciBmaXJzdCA9IGNvbnRlbnQuc3Vic3RyKDAsIDEpO1xuICAgIHJldHVybiAoZmlyc3QgPT09IGNvbnRlbnQuc3Vic3RyKGNvbnRlbnQubGVuZ3RoIC0gMSkgJiYgZmlyc3QubWF0Y2goLyd8XCIvKSkgPyBjb250ZW50LnN1YnN0cigxLCBjb250ZW50Lmxlbmd0aCAtIDIpIDogY29udGVudDtcbn1cblxuZnVuY3Rpb24gZ2V0V29yZHMoY2hhcmFjdGVycykge1xuICAgIHZhciB3b3JkcyA9IFtdLCBpID0gMCwgb25Xb3JkQm91bmRhcnkgPSBmYWxzZSwgd29yZDtcbiAgICB3aGlsZShjaGFyYWN0ZXJzLmxlbmd0aCkge1xuICAgICAgICBpZiAoaXNXb3JkQm91bmRhcnkoY2hhcmFjdGVyc1tpXSkgPT09IG9uV29yZEJvdW5kYXJ5KSB7XG4gICAgICAgICAgICB3b3JkID0gY2hhcmFjdGVycy5zcGxpY2UoMCwgaSk7XG4gICAgICAgICAgICBpZiAod29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3b3Jkcy5wdXNoKHB1bnljb2RlLnVjczIuZW5jb2RlKHdvcmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uV29yZEJvdW5kYXJ5ID0hIG9uV29yZEJvdW5kYXJ5O1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSA+PSBjaGFyYWN0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgd29yZCA9IGNoYXJhY3RlcnMuc3BsaWNlKDAsIGkpO1xuICAgICAgICAgICAgaWYgKHdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgd29yZHMucHVzaChwdW55Y29kZS51Y3MyLmVuY29kZSh3b3JkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdvcmRzO1xufVxuXG5mdW5jdGlvbiBpc1dvcmRCb3VuZGFyeShjaGFyYWN0ZXJDb2RlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMzIsIC8vIDxzcGFjZT5cbiAgICAgICAgMTMsIC8vIFxcclxuICAgICAgICAxMCwgLy8gXFxuXG4gICAgICAgIDksIC8vIFxcdFxuICAgICAgICA0NSAvLyAtXG4gICAgXS5pbmRleE9mKGNoYXJhY3RlckNvZGUpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gaGFzVW5pY29kZShzdHJpbmcpIHtcbiAgICByZXR1cm4gKC9bXlxcdTAwMDAtXFx1MDBmZl0vKS50ZXN0KHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZVBhcnNlcjtcblxufSx7XCIuL2NvbG9yXCI6MyxcIi4vZm9udG1ldHJpY3NcIjo3LFwiLi9sb2dcIjoxMyxcIi4vbm9kZWNvbnRhaW5lclwiOjE0LFwiLi9wc2V1ZG9lbGVtZW50Y29udGFpbmVyXCI6MTgsXCIuL3N0YWNraW5nY29udGV4dFwiOjIxLFwiLi90ZXh0Y29udGFpbmVyXCI6MjUsXCIuL3V0aWxzXCI6MjYsXCJwdW55Y29kZVwiOjF9XSwxNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgWEhSID0gX2RlcmVxXygnLi94aHInKTtcbnZhciB1dGlscyA9IF9kZXJlcV8oJy4vdXRpbHMnKTtcbnZhciBsb2cgPSBfZGVyZXFfKCcuL2xvZycpO1xudmFyIGNyZWF0ZVdpbmRvd0Nsb25lID0gX2RlcmVxXygnLi9jbG9uZScpO1xudmFyIGRlY29kZTY0ID0gdXRpbHMuZGVjb2RlNjQ7XG5cbmZ1bmN0aW9uIFByb3h5KHNyYywgcHJveHlVcmwsIGRvY3VtZW50KSB7XG4gICAgdmFyIHN1cHBvcnRzQ09SUyA9ICgnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKSk7XG4gICAgaWYgKCFwcm94eVVybCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJObyBwcm94eSBjb25maWd1cmVkXCIpO1xuICAgIH1cbiAgICB2YXIgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhzdXBwb3J0c0NPUlMpO1xuICAgIHZhciB1cmwgPSBjcmVhdGVQcm94eVVybChwcm94eVVybCwgc3JjLCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4gc3VwcG9ydHNDT1JTID8gWEhSKHVybCkgOiAoanNvbnAoZG9jdW1lbnQsIHVybCwgY2FsbGJhY2spLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZTY0KHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgIH0pKTtcbn1cbnZhciBwcm94eUNvdW50ID0gMDtcblxuZnVuY3Rpb24gUHJveHlVUkwoc3JjLCBwcm94eVVybCwgZG9jdW1lbnQpIHtcbiAgICB2YXIgc3VwcG9ydHNDT1JTSW1hZ2UgPSAoJ2Nyb3NzT3JpZ2luJyBpbiBuZXcgSW1hZ2UoKSk7XG4gICAgdmFyIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soc3VwcG9ydHNDT1JTSW1hZ2UpO1xuICAgIHZhciB1cmwgPSBjcmVhdGVQcm94eVVybChwcm94eVVybCwgc3JjLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIChzdXBwb3J0c0NPUlNJbWFnZSA/IFByb21pc2UucmVzb2x2ZSh1cmwpIDoganNvbnAoZG9jdW1lbnQsIHVybCwgY2FsbGJhY2spLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIFwiZGF0YTpcIiArIHJlc3BvbnNlLnR5cGUgKyBcIjtiYXNlNjQsXCIgKyByZXNwb25zZS5jb250ZW50O1xuICAgIH0pKTtcbn1cblxuZnVuY3Rpb24ganNvbnAoZG9jdW1lbnQsIHVybCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3cuaHRtbDJjYW52YXMucHJveHlbY2FsbGJhY2tdO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzKTtcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93Lmh0bWwyY2FudmFzLnByb3h5W2NhbGxiYWNrXSA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5zcmMgPSB1cmw7XG4gICAgICAgIHMub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FsbGJhY2sodXNlQ09SUykge1xuICAgIHJldHVybiAhdXNlQ09SUyA/IFwiaHRtbDJjYW52YXNfXCIgKyBEYXRlLm5vdygpICsgXCJfXCIgKyAoKytwcm94eUNvdW50KSArIFwiX1wiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwMDAwKSA6IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3h5VXJsKHByb3h5VXJsLCBzcmMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHByb3h5VXJsICsgXCI/dXJsPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNyYykgKyAoY2FsbGJhY2subGVuZ3RoID8gXCImY2FsbGJhY2s9aHRtbDJjYW52YXMucHJveHkuXCIgKyBjYWxsYmFjayA6IFwiXCIpO1xufVxuXG5mdW5jdGlvbiBkb2N1bWVudEZyb21IVE1MKHNyYykge1xuICAgIHJldHVybiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHZhciBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCksIGRvYztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgbG9nKFwiRE9NUGFyc2VyIG5vdCBzdXBwb3J0ZWQsIGZhbGxpbmcgYmFjayB0byBjcmVhdGVIVE1MRG9jdW1lbnRcIik7XG4gICAgICAgICAgICBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJcIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRvYy5vcGVuKCk7XG4gICAgICAgICAgICAgICAgZG9jLndyaXRlKGh0bWwpO1xuICAgICAgICAgICAgICAgIGRvYy5jbG9zZSgpO1xuICAgICAgICAgICAgfSBjYXRjaChlZSkge1xuICAgICAgICAgICAgICAgIGxvZyhcImNyZWF0ZUhUTUxEb2N1bWVudCB3cml0ZSBub3Qgc3VwcG9ydGVkLCBmYWxsaW5nIGJhY2sgdG8gZG9jdW1lbnQuYm9keS5pbm5lckhUTUxcIik7XG4gICAgICAgICAgICAgICAgZG9jLmJvZHkuaW5uZXJIVE1MID0gaHRtbDsgLy8gaWU5IGRvZXNudCBzdXBwb3J0IHdyaXRpbmcgdG8gZG9jdW1lbnRFbGVtZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYiA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiYmFzZVwiKTtcbiAgICAgICAgaWYgKCFiIHx8ICFiLmhyZWYuaG9zdCkge1xuICAgICAgICAgICAgdmFyIGJhc2UgPSBkb2MuY3JlYXRlRWxlbWVudChcImJhc2VcIik7XG4gICAgICAgICAgICBiYXNlLmhyZWYgPSBzcmM7XG4gICAgICAgICAgICBkb2MuaGVhZC5pbnNlcnRCZWZvcmUoYmFzZSwgZG9jLmhlYWQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZG9jO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGxvYWRVcmxEb2N1bWVudChzcmMsIHByb3h5LCBkb2N1bWVudCwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJveHkoc3JjLCBwcm94eSwgd2luZG93LmRvY3VtZW50KS50aGVuKGRvY3VtZW50RnJvbUhUTUwoc3JjKSkudGhlbihmdW5jdGlvbihkb2MpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVdpbmRvd0Nsb25lKGRvYywgZG9jdW1lbnQsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMsIDAsIDApO1xuICAgIH0pO1xufVxuXG5leHBvcnRzLlByb3h5ID0gUHJveHk7XG5leHBvcnRzLlByb3h5VVJMID0gUHJveHlVUkw7XG5leHBvcnRzLmxvYWRVcmxEb2N1bWVudCA9IGxvYWRVcmxEb2N1bWVudDtcblxufSx7XCIuL2Nsb25lXCI6MixcIi4vbG9nXCI6MTMsXCIuL3V0aWxzXCI6MjYsXCIuL3hoclwiOjI4fV0sMTc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIFByb3h5VVJMID0gX2RlcmVxXygnLi9wcm94eScpLlByb3h5VVJMO1xuXG5mdW5jdGlvbiBQcm94eUltYWdlQ29udGFpbmVyKHNyYywgcHJveHkpIHtcbiAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGxpbmsuaHJlZiA9IHNyYztcbiAgICBzcmMgPSBsaW5rLmhyZWY7XG4gICAgdGhpcy5zcmMgPSBzcmM7XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5pbWFnZS5jcm9zc09yaWdpbiA9IFwiQW5vbnltb3VzXCI7XG4gICAgICAgIHNlbGYuaW1hZ2Uub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgc2VsZi5pbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgIG5ldyBQcm94eVVSTChzcmMsIHByb3h5LCBkb2N1bWVudCkudGhlbihmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgIHNlbGYuaW1hZ2Uuc3JjID0gdXJsO1xuICAgICAgICB9KVsnY2F0Y2gnXShyZWplY3QpO1xuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3h5SW1hZ2VDb250YWluZXI7XG5cbn0se1wiLi9wcm94eVwiOjE2fV0sMTg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIE5vZGVDb250YWluZXIgPSBfZGVyZXFfKCcuL25vZGVjb250YWluZXInKTtcblxuZnVuY3Rpb24gUHNldWRvRWxlbWVudENvbnRhaW5lcihub2RlLCBwYXJlbnQsIHR5cGUpIHtcbiAgICBOb2RlQ29udGFpbmVyLmNhbGwodGhpcywgbm9kZSwgcGFyZW50KTtcbiAgICB0aGlzLmlzUHNldWRvRWxlbWVudCA9IHRydWU7XG4gICAgdGhpcy5iZWZvcmUgPSB0eXBlID09PSBcIjpiZWZvcmVcIjtcbn1cblxuUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuY2xvbmVUbyA9IGZ1bmN0aW9uKHN0YWNrKSB7XG4gICAgUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuY2xvbmVUby5jYWxsKHRoaXMsIHN0YWNrKTtcbiAgICBzdGFjay5pc1BzZXVkb0VsZW1lbnQgPSB0cnVlO1xuICAgIHN0YWNrLmJlZm9yZSA9IHRoaXMuYmVmb3JlO1xufTtcblxuUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5vZGVDb250YWluZXIucHJvdG90eXBlKTtcblxuUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuYXBwZW5kVG9ET00gPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5iZWZvcmUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQubm9kZS5pbnNlcnRCZWZvcmUodGhpcy5ub2RlLCB0aGlzLnBhcmVudC5ub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5ub2RlKTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQubm9kZS5jbGFzc05hbWUgKz0gXCIgXCIgKyB0aGlzLmdldEhpZGVDbGFzcygpO1xufTtcblxuUHNldWRvRWxlbWVudENvbnRhaW5lci5wcm90b3R5cGUuY2xlYW5ET00gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xuICAgIHRoaXMucGFyZW50Lm5vZGUuY2xhc3NOYW1lID0gdGhpcy5wYXJlbnQubm9kZS5jbGFzc05hbWUucmVwbGFjZSh0aGlzLmdldEhpZGVDbGFzcygpLCBcIlwiKTtcbn07XG5cblBzZXVkb0VsZW1lbnRDb250YWluZXIucHJvdG90eXBlLmdldEhpZGVDbGFzcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzW1wiUFNFVURPX0hJREVfRUxFTUVOVF9DTEFTU19cIiArICh0aGlzLmJlZm9yZSA/IFwiQkVGT1JFXCIgOiBcIkFGVEVSXCIpXTtcbn07XG5cblBzZXVkb0VsZW1lbnRDb250YWluZXIucHJvdG90eXBlLlBTRVVET19ISURFX0VMRU1FTlRfQ0xBU1NfQkVGT1JFID0gXCJfX19odG1sMmNhbnZhc19fX3BzZXVkb2VsZW1lbnRfYmVmb3JlXCI7XG5Qc2V1ZG9FbGVtZW50Q29udGFpbmVyLnByb3RvdHlwZS5QU0VVRE9fSElERV9FTEVNRU5UX0NMQVNTX0FGVEVSID0gXCJfX19odG1sMmNhbnZhc19fX3BzZXVkb2VsZW1lbnRfYWZ0ZXJcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBQc2V1ZG9FbGVtZW50Q29udGFpbmVyO1xuXG59LHtcIi4vbm9kZWNvbnRhaW5lclwiOjE0fV0sMTk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIGxvZyA9IF9kZXJlcV8oJy4vbG9nJyk7XG5cbmZ1bmN0aW9uIFJlbmRlcmVyKHdpZHRoLCBoZWlnaHQsIGltYWdlcywgb3B0aW9ucywgZG9jdW1lbnQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG59XG5cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJJbWFnZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYm91bmRzLCBib3JkZXJEYXRhLCBpbWFnZUNvbnRhaW5lcikge1xuICAgIHZhciBwYWRkaW5nTGVmdCA9IGNvbnRhaW5lci5jc3NJbnQoJ3BhZGRpbmdMZWZ0JyksXG4gICAgICAgIHBhZGRpbmdUb3AgPSBjb250YWluZXIuY3NzSW50KCdwYWRkaW5nVG9wJyksXG4gICAgICAgIHBhZGRpbmdSaWdodCA9IGNvbnRhaW5lci5jc3NJbnQoJ3BhZGRpbmdSaWdodCcpLFxuICAgICAgICBwYWRkaW5nQm90dG9tID0gY29udGFpbmVyLmNzc0ludCgncGFkZGluZ0JvdHRvbScpLFxuICAgICAgICBib3JkZXJzID0gYm9yZGVyRGF0YS5ib3JkZXJzO1xuXG4gICAgdmFyIHdpZHRoID0gYm91bmRzLndpZHRoIC0gKGJvcmRlcnNbMV0ud2lkdGggKyBib3JkZXJzWzNdLndpZHRoICsgcGFkZGluZ0xlZnQgKyBwYWRkaW5nUmlnaHQpO1xuICAgIHZhciBoZWlnaHQgPSBib3VuZHMuaGVpZ2h0IC0gKGJvcmRlcnNbMF0ud2lkdGggKyBib3JkZXJzWzJdLndpZHRoICsgcGFkZGluZ1RvcCArIHBhZGRpbmdCb3R0b20pO1xuICAgIHRoaXMuZHJhd0ltYWdlKFxuICAgICAgICBpbWFnZUNvbnRhaW5lcixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgaW1hZ2VDb250YWluZXIuaW1hZ2Uud2lkdGggfHwgd2lkdGgsXG4gICAgICAgIGltYWdlQ29udGFpbmVyLmltYWdlLmhlaWdodCB8fCBoZWlnaHQsXG4gICAgICAgIGJvdW5kcy5sZWZ0ICsgcGFkZGluZ0xlZnQgKyBib3JkZXJzWzNdLndpZHRoLFxuICAgICAgICBib3VuZHMudG9wICsgcGFkZGluZ1RvcCArIGJvcmRlcnNbMF0ud2lkdGgsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHRcbiAgICApO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmQgPSBmdW5jdGlvbihjb250YWluZXIsIGJvdW5kcywgYm9yZGVyRGF0YSkge1xuICAgIGlmIChib3VuZHMuaGVpZ2h0ID4gMCAmJiBib3VuZHMud2lkdGggPiAwKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQmFja2dyb3VuZENvbG9yKGNvbnRhaW5lciwgYm91bmRzKTtcbiAgICAgICAgdGhpcy5yZW5kZXJCYWNrZ3JvdW5kSW1hZ2UoY29udGFpbmVyLCBib3VuZHMsIGJvcmRlckRhdGEpO1xuICAgIH1cbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kQ29sb3IgPSBmdW5jdGlvbihjb250YWluZXIsIGJvdW5kcykge1xuICAgIHZhciBjb2xvciA9IGNvbnRhaW5lci5jb2xvcihcImJhY2tncm91bmRDb2xvclwiKTtcbiAgICBpZiAoIWNvbG9yLmlzVHJhbnNwYXJlbnQoKSkge1xuICAgICAgICB0aGlzLnJlY3RhbmdsZShib3VuZHMubGVmdCwgYm91bmRzLnRvcCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0LCBjb2xvcik7XG4gICAgfVxufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckJvcmRlcnMgPSBmdW5jdGlvbihib3JkZXJzKSB7XG4gICAgYm9yZGVycy5mb3JFYWNoKHRoaXMucmVuZGVyQm9yZGVyLCB0aGlzKTtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJCb3JkZXIgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYgKCFkYXRhLmNvbG9yLmlzVHJhbnNwYXJlbnQoKSAmJiBkYXRhLmFyZ3MgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5kcmF3U2hhcGUoZGF0YS5hcmdzLCBkYXRhLmNvbG9yKTtcbiAgICB9XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZEltYWdlID0gZnVuY3Rpb24oY29udGFpbmVyLCBib3VuZHMsIGJvcmRlckRhdGEpIHtcbiAgICB2YXIgYmFja2dyb3VuZEltYWdlcyA9IGNvbnRhaW5lci5wYXJzZUJhY2tncm91bmRJbWFnZXMoKTtcbiAgICBiYWNrZ3JvdW5kSW1hZ2VzLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKGJhY2tncm91bmRJbWFnZSwgaW5kZXgsIGFycikge1xuICAgICAgICBzd2l0Y2goYmFja2dyb3VuZEltYWdlLm1ldGhvZCkge1xuICAgICAgICBjYXNlIFwidXJsXCI6XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSB0aGlzLmltYWdlcy5nZXQoYmFja2dyb3VuZEltYWdlLmFyZ3NbMF0pO1xuICAgICAgICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJCYWNrZ3JvdW5kUmVwZWF0aW5nKGNvbnRhaW5lciwgYm91bmRzLCBpbWFnZSwgYXJyLmxlbmd0aCAtIChpbmRleCsxKSwgYm9yZGVyRGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZyhcIkVycm9yIGxvYWRpbmcgYmFja2dyb3VuZC1pbWFnZVwiLCBiYWNrZ3JvdW5kSW1hZ2UuYXJnc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxpbmVhci1ncmFkaWVudFwiOlxuICAgICAgICBjYXNlIFwiZ3JhZGllbnRcIjpcbiAgICAgICAgICAgIHZhciBncmFkaWVudEltYWdlID0gdGhpcy5pbWFnZXMuZ2V0KGJhY2tncm91bmRJbWFnZS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZ3JhZGllbnRJbWFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQmFja2dyb3VuZEdyYWRpZW50KGdyYWRpZW50SW1hZ2UsIGJvdW5kcywgYm9yZGVyRGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZyhcIkVycm9yIGxvYWRpbmcgYmFja2dyb3VuZC1pbWFnZVwiLCBiYWNrZ3JvdW5kSW1hZ2UuYXJnc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm5vbmVcIjpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbG9nKFwiVW5rbm93biBiYWNrZ3JvdW5kLWltYWdlIHR5cGVcIiwgYmFja2dyb3VuZEltYWdlLmFyZ3NbMF0pO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZFJlcGVhdGluZyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYm91bmRzLCBpbWFnZUNvbnRhaW5lciwgaW5kZXgsIGJvcmRlckRhdGEpIHtcbiAgICB2YXIgc2l6ZSA9IGNvbnRhaW5lci5wYXJzZUJhY2tncm91bmRTaXplKGJvdW5kcywgaW1hZ2VDb250YWluZXIuaW1hZ2UsIGluZGV4KTtcbiAgICB2YXIgcG9zaXRpb24gPSBjb250YWluZXIucGFyc2VCYWNrZ3JvdW5kUG9zaXRpb24oYm91bmRzLCBpbWFnZUNvbnRhaW5lci5pbWFnZSwgaW5kZXgsIHNpemUpO1xuICAgIHZhciByZXBlYXQgPSBjb250YWluZXIucGFyc2VCYWNrZ3JvdW5kUmVwZWF0KGluZGV4KTtcbiAgICBzd2l0Y2ggKHJlcGVhdCkge1xuICAgIGNhc2UgXCJyZXBlYXQteFwiOlxuICAgIGNhc2UgXCJyZXBlYXQgbm8tcmVwZWF0XCI6XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlcGVhdFNoYXBlKGltYWdlQ29udGFpbmVyLCBwb3NpdGlvbiwgc2l6ZSwgYm91bmRzLCBib3VuZHMubGVmdCArIGJvcmRlckRhdGFbM10sIGJvdW5kcy50b3AgKyBwb3NpdGlvbi50b3AgKyBib3JkZXJEYXRhWzBdLCA5OTk5OSwgc2l6ZS5oZWlnaHQsIGJvcmRlckRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwicmVwZWF0LXlcIjpcbiAgICBjYXNlIFwibm8tcmVwZWF0IHJlcGVhdFwiOlxuICAgICAgICB0aGlzLmJhY2tncm91bmRSZXBlYXRTaGFwZShpbWFnZUNvbnRhaW5lciwgcG9zaXRpb24sIHNpemUsIGJvdW5kcywgYm91bmRzLmxlZnQgKyBwb3NpdGlvbi5sZWZ0ICsgYm9yZGVyRGF0YVszXSwgYm91bmRzLnRvcCArIGJvcmRlckRhdGFbMF0sIHNpemUud2lkdGgsIDk5OTk5LCBib3JkZXJEYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm5vLXJlcGVhdFwiOlxuICAgICAgICB0aGlzLmJhY2tncm91bmRSZXBlYXRTaGFwZShpbWFnZUNvbnRhaW5lciwgcG9zaXRpb24sIHNpemUsIGJvdW5kcywgYm91bmRzLmxlZnQgKyBwb3NpdGlvbi5sZWZ0ICsgYm9yZGVyRGF0YVszXSwgYm91bmRzLnRvcCArIHBvc2l0aW9uLnRvcCArIGJvcmRlckRhdGFbMF0sIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0LCBib3JkZXJEYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5yZW5kZXJCYWNrZ3JvdW5kUmVwZWF0KGltYWdlQ29udGFpbmVyLCBwb3NpdGlvbiwgc2l6ZSwge3RvcDogYm91bmRzLnRvcCwgbGVmdDogYm91bmRzLmxlZnR9LCBib3JkZXJEYXRhWzNdLCBib3JkZXJEYXRhWzBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJlcjtcblxufSx7XCIuL2xvZ1wiOjEzfV0sMjA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIFJlbmRlcmVyID0gX2RlcmVxXygnLi4vcmVuZGVyZXInKTtcbnZhciBMaW5lYXJHcmFkaWVudENvbnRhaW5lciA9IF9kZXJlcV8oJy4uL2xpbmVhcmdyYWRpZW50Y29udGFpbmVyJyk7XG52YXIgbG9nID0gX2RlcmVxXygnLi4vbG9nJyk7XG5cbmZ1bmN0aW9uIENhbnZhc1JlbmRlcmVyKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBSZW5kZXJlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5vcHRpb25zLmNhbnZhcyB8fCB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy50YWludEN0eCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5jdHgudGV4dEJhc2VsaW5lID0gXCJib3R0b21cIjtcbiAgICB0aGlzLnZhcmlhYmxlcyA9IHt9O1xuICAgIGxvZyhcIkluaXRpYWxpemVkIENhbnZhc1JlbmRlcmVyIHdpdGggc2l6ZVwiLCB3aWR0aCwgXCJ4XCIsIGhlaWdodCk7XG59XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVuZGVyZXIucHJvdG90eXBlKTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldEZpbGxTdHlsZSA9IGZ1bmN0aW9uKGZpbGxTdHlsZSkge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHR5cGVvZihmaWxsU3R5bGUpID09PSBcIm9iamVjdFwiICYmICEhZmlsbFN0eWxlLmlzQ29sb3IgPyBmaWxsU3R5bGUudG9TdHJpbmcoKSA6IGZpbGxTdHlsZTtcbiAgICByZXR1cm4gdGhpcy5jdHg7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVjdGFuZ2xlID0gZnVuY3Rpb24obGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xuICAgIHRoaXMuc2V0RmlsbFN0eWxlKGNvbG9yKS5maWxsUmVjdChsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmNpcmNsZSA9IGZ1bmN0aW9uKGxlZnQsIHRvcCwgc2l6ZSwgY29sb3IpIHtcbiAgICB0aGlzLnNldEZpbGxTdHlsZShjb2xvcik7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKGxlZnQgKyBzaXplIC8gMiwgdG9wICsgc2l6ZSAvIDIsIHNpemUgLyAyLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5jaXJjbGVTdHJva2UgPSBmdW5jdGlvbihsZWZ0LCB0b3AsIHNpemUsIGNvbG9yLCBzdHJva2UsIHN0cm9rZUNvbG9yKSB7XG4gICAgdGhpcy5jaXJjbGUobGVmdCwgdG9wLCBzaXplLCBjb2xvcik7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvci50b1N0cmluZygpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmRyYXdTaGFwZSA9IGZ1bmN0aW9uKHNoYXBlLCBjb2xvcikge1xuICAgIHRoaXMuc2hhcGUoc2hhcGUpO1xuICAgIHRoaXMuc2V0RmlsbFN0eWxlKGNvbG9yKS5maWxsKCk7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUudGFpbnRzID0gZnVuY3Rpb24oaW1hZ2VDb250YWluZXIpIHtcbiAgICBpZiAoaW1hZ2VDb250YWluZXIudGFpbnRlZCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLnRhaW50Q3R4LmRyYXdJbWFnZShpbWFnZUNvbnRhaW5lci5pbWFnZSwgMCwgMCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50Q3R4LmdldEltYWdlRGF0YSgwLCAwLCAxLCAxKTtcbiAgICAgICAgICAgIGltYWdlQ29udGFpbmVyLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50Q3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICBpbWFnZUNvbnRhaW5lci50YWludGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbWFnZUNvbnRhaW5lci50YWludGVkO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmRyYXdJbWFnZSA9IGZ1bmN0aW9uKGltYWdlQ29udGFpbmVyLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcbiAgICBpZiAoIXRoaXMudGFpbnRzKGltYWdlQ29udGFpbmVyKSB8fCB0aGlzLm9wdGlvbnMuYWxsb3dUYWludCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1hZ2VDb250YWluZXIuaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gICAgfVxufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmNsaXAgPSBmdW5jdGlvbihzaGFwZXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIHNoYXBlcy5maWx0ZXIoaGFzRW50cmllcykuZm9yRWFjaChmdW5jdGlvbihzaGFwZSkge1xuICAgICAgICB0aGlzLnNoYXBlKHNoYXBlKS5jbGlwKCk7XG4gICAgfSwgdGhpcyk7XG4gICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2hhcGUgPSBmdW5jdGlvbihzaGFwZSkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHNoYXBlLmZvckVhY2goZnVuY3Rpb24ocG9pbnQsIGluZGV4KSB7XG4gICAgICAgIGlmIChwb2ludFswXSA9PT0gXCJyZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnJlY3QuYXBwbHkodGhpcy5jdHgsIHBvaW50LnNsaWNlKDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4WyhpbmRleCA9PT0gMCkgPyBcIm1vdmVUb1wiIDogcG9pbnRbMF0gKyBcIlRvXCIgXS5hcHBseSh0aGlzLmN0eCwgcG9pbnQuc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIHRoaXMuY3R4O1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmZvbnQgPSBmdW5jdGlvbihjb2xvciwgc3R5bGUsIHZhcmlhbnQsIHdlaWdodCwgc2l6ZSwgZmFtaWx5KSB7XG4gICAgdGhpcy5zZXRGaWxsU3R5bGUoY29sb3IpLmZvbnQgPSBbc3R5bGUsIHZhcmlhbnQsIHdlaWdodCwgc2l6ZSwgZmFtaWx5XS5qb2luKFwiIFwiKS5zcGxpdChcIixcIilbMF07XG59O1xuXG5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZm9udFNoYWRvdyA9IGZ1bmN0aW9uKGNvbG9yLCBvZmZzZXRYLCBvZmZzZXRZLCBibHVyKSB7XG4gICAgdGhpcy5zZXRWYXJpYWJsZShcInNoYWRvd0NvbG9yXCIsIGNvbG9yLnRvU3RyaW5nKCkpXG4gICAgICAgIC5zZXRWYXJpYWJsZShcInNoYWRvd09mZnNldFlcIiwgb2Zmc2V0WClcbiAgICAgICAgLnNldFZhcmlhYmxlKFwic2hhZG93T2Zmc2V0WFwiLCBvZmZzZXRZKVxuICAgICAgICAuc2V0VmFyaWFibGUoXCJzaGFkb3dCbHVyXCIsIGJsdXIpO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmNsZWFyU2hhZG93ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRWYXJpYWJsZShcInNoYWRvd0NvbG9yXCIsIFwicmdiYSgwLDAsMCwwKVwiKTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRPcGFjaXR5ID0gZnVuY3Rpb24ob3BhY2l0eSkge1xuICAgIHRoaXMuY3R4Lmdsb2JhbEFscGhhID0gb3BhY2l0eTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbih0cmFuc2Zvcm0pIHtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUodHJhbnNmb3JtLm9yaWdpblswXSwgdHJhbnNmb3JtLm9yaWdpblsxXSk7XG4gICAgdGhpcy5jdHgudHJhbnNmb3JtLmFwcGx5KHRoaXMuY3R4LCB0cmFuc2Zvcm0ubWF0cml4KTtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUoLXRyYW5zZm9ybS5vcmlnaW5bMF0sIC10cmFuc2Zvcm0ub3JpZ2luWzFdKTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRWYXJpYWJsZSA9IGZ1bmN0aW9uKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIGlmICh0aGlzLnZhcmlhYmxlc1twcm9wZXJ0eV0gIT09IHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFyaWFibGVzW3Byb3BlcnR5XSA9IHRoaXMuY3R4W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbih0ZXh0LCBsZWZ0LCBib3R0b20pIHtcbiAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCBsZWZ0LCBib3R0b20pO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmJhY2tncm91bmRSZXBlYXRTaGFwZSA9IGZ1bmN0aW9uKGltYWdlQ29udGFpbmVyLCBiYWNrZ3JvdW5kUG9zaXRpb24sIHNpemUsIGJvdW5kcywgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0LCBib3JkZXJEYXRhKSB7XG4gICAgdmFyIHNoYXBlID0gW1xuICAgICAgICBbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCksIE1hdGgucm91bmQodG9wKV0sXG4gICAgICAgIFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0ICsgd2lkdGgpLCBNYXRoLnJvdW5kKHRvcCldLFxuICAgICAgICBbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCArIHdpZHRoKSwgTWF0aC5yb3VuZChoZWlnaHQgKyB0b3ApXSxcbiAgICAgICAgW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQpLCBNYXRoLnJvdW5kKGhlaWdodCArIHRvcCldXG4gICAgXTtcbiAgICB0aGlzLmNsaXAoW3NoYXBlXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQmFja2dyb3VuZFJlcGVhdChpbWFnZUNvbnRhaW5lciwgYmFja2dyb3VuZFBvc2l0aW9uLCBzaXplLCBib3VuZHMsIGJvcmRlckRhdGFbM10sIGJvcmRlckRhdGFbMF0pO1xuICAgIH0sIHRoaXMpO1xufTtcblxuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmRSZXBlYXQgPSBmdW5jdGlvbihpbWFnZUNvbnRhaW5lciwgYmFja2dyb3VuZFBvc2l0aW9uLCBzaXplLCBib3VuZHMsIGJvcmRlckxlZnQsIGJvcmRlclRvcCkge1xuICAgIHZhciBvZmZzZXRYID0gTWF0aC5yb3VuZChib3VuZHMubGVmdCArIGJhY2tncm91bmRQb3NpdGlvbi5sZWZ0ICsgYm9yZGVyTGVmdCksIG9mZnNldFkgPSBNYXRoLnJvdW5kKGJvdW5kcy50b3AgKyBiYWNrZ3JvdW5kUG9zaXRpb24udG9wICsgYm9yZGVyVG9wKTtcbiAgICB0aGlzLnNldEZpbGxTdHlsZSh0aGlzLmN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMucmVzaXplSW1hZ2UoaW1hZ2VDb250YWluZXIsIHNpemUpLCBcInJlcGVhdFwiKSk7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKG9mZnNldFgsIG9mZnNldFkpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUoLW9mZnNldFgsIC1vZmZzZXRZKTtcbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kR3JhZGllbnQgPSBmdW5jdGlvbihncmFkaWVudEltYWdlLCBib3VuZHMpIHtcbiAgICBpZiAoZ3JhZGllbnRJbWFnZSBpbnN0YW5jZW9mIExpbmVhckdyYWRpZW50Q29udGFpbmVyKSB7XG4gICAgICAgIHZhciBncmFkaWVudCA9IHRoaXMuY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KFxuICAgICAgICAgICAgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggKiBncmFkaWVudEltYWdlLngwLFxuICAgICAgICAgICAgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQgKiBncmFkaWVudEltYWdlLnkwLFxuICAgICAgICAgICAgYm91bmRzLmxlZnQgKyAgYm91bmRzLndpZHRoICogZ3JhZGllbnRJbWFnZS54MSxcbiAgICAgICAgICAgIGJvdW5kcy50b3AgKyAgYm91bmRzLmhlaWdodCAqIGdyYWRpZW50SW1hZ2UueTEpO1xuICAgICAgICBncmFkaWVudEltYWdlLmNvbG9yU3RvcHMuZm9yRWFjaChmdW5jdGlvbihjb2xvclN0b3ApIHtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcChjb2xvclN0b3Auc3RvcCwgY29sb3JTdG9wLmNvbG9yLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWN0YW5nbGUoYm91bmRzLmxlZnQsIGJvdW5kcy50b3AsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCwgZ3JhZGllbnQpO1xuICAgIH1cbn07XG5cbkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZXNpemVJbWFnZSA9IGZ1bmN0aW9uKGltYWdlQ29udGFpbmVyLCBzaXplKSB7XG4gICAgdmFyIGltYWdlID0gaW1hZ2VDb250YWluZXIuaW1hZ2U7XG4gICAgaWYoaW1hZ2Uud2lkdGggPT09IHNpemUud2lkdGggJiYgaW1hZ2UuaGVpZ2h0ID09PSBzaXplLmhlaWdodCkge1xuICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgfVxuXG4gICAgdmFyIGN0eCwgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuICAgIHJldHVybiBjYW52YXM7XG59O1xuXG5mdW5jdGlvbiBoYXNFbnRyaWVzKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA+IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FudmFzUmVuZGVyZXI7XG5cbn0se1wiLi4vbGluZWFyZ3JhZGllbnRjb250YWluZXJcIjoxMixcIi4uL2xvZ1wiOjEzLFwiLi4vcmVuZGVyZXJcIjoxOX1dLDIxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBOb2RlQ29udGFpbmVyID0gX2RlcmVxXygnLi9ub2RlY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIFN0YWNraW5nQ29udGV4dChoYXNPd25TdGFja2luZywgb3BhY2l0eSwgZWxlbWVudCwgcGFyZW50KSB7XG4gICAgTm9kZUNvbnRhaW5lci5jYWxsKHRoaXMsIGVsZW1lbnQsIHBhcmVudCk7XG4gICAgdGhpcy5vd25TdGFja2luZyA9IGhhc093blN0YWNraW5nO1xuICAgIHRoaXMuY29udGV4dHMgPSBbXTtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdGhpcy5vcGFjaXR5ID0gKHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuc3RhY2sub3BhY2l0eSA6IDEpICogb3BhY2l0eTtcbn1cblxuU3RhY2tpbmdDb250ZXh0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTm9kZUNvbnRhaW5lci5wcm90b3R5cGUpO1xuXG5TdGFja2luZ0NvbnRleHQucHJvdG90eXBlLmdldFBhcmVudFN0YWNrID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciBwYXJlbnRTdGFjayA9ICh0aGlzLnBhcmVudCkgPyB0aGlzLnBhcmVudC5zdGFjayA6IG51bGw7XG4gICAgcmV0dXJuIHBhcmVudFN0YWNrID8gKHBhcmVudFN0YWNrLm93blN0YWNraW5nID8gcGFyZW50U3RhY2sgOiBwYXJlbnRTdGFjay5nZXRQYXJlbnRTdGFjayhjb250ZXh0KSkgOiBjb250ZXh0LnN0YWNrO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFja2luZ0NvbnRleHQ7XG5cbn0se1wiLi9ub2RlY29udGFpbmVyXCI6MTR9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5mdW5jdGlvbiBTdXBwb3J0KGRvY3VtZW50KSB7XG4gICAgdGhpcy5yYW5nZUJvdW5kcyA9IHRoaXMudGVzdFJhbmdlQm91bmRzKGRvY3VtZW50KTtcbiAgICB0aGlzLmNvcnMgPSB0aGlzLnRlc3RDT1JTKCk7XG4gICAgdGhpcy5zdmcgPSB0aGlzLnRlc3RTVkcoKTtcbn1cblxuU3VwcG9ydC5wcm90b3R5cGUudGVzdFJhbmdlQm91bmRzID0gZnVuY3Rpb24oZG9jdW1lbnQpIHtcbiAgICB2YXIgcmFuZ2UsIHRlc3RFbGVtZW50LCByYW5nZUJvdW5kcywgcmFuZ2VIZWlnaHQsIHN1cHBvcnQgPSBmYWxzZTtcblxuICAgIGlmIChkb2N1bWVudC5jcmVhdGVSYW5nZSkge1xuICAgICAgICByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIGlmIChyYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgIHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm91bmR0ZXN0Jyk7XG4gICAgICAgICAgICB0ZXN0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjEyM3B4XCI7XG4gICAgICAgICAgICB0ZXN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGUodGVzdEVsZW1lbnQpO1xuICAgICAgICAgICAgcmFuZ2VCb3VuZHMgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHJhbmdlSGVpZ2h0ID0gcmFuZ2VCb3VuZHMuaGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAocmFuZ2VIZWlnaHQgPT09IDEyMykge1xuICAgICAgICAgICAgICAgIHN1cHBvcnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VwcG9ydDtcbn07XG5cblN1cHBvcnQucHJvdG90eXBlLnRlc3RDT1JTID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHR5cGVvZigobmV3IEltYWdlKCkpLmNyb3NzT3JpZ2luKSAhPT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cblN1cHBvcnQucHJvdG90eXBlLnRlc3RTVkcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdmFyIGN0eCA9ICBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGltZy5zcmMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PC9zdmc+XCI7XG5cbiAgICB0cnkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3VwcG9ydDtcblxufSx7fV0sMjM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIFhIUiA9IF9kZXJlcV8oJy4veGhyJyk7XG52YXIgZGVjb2RlNjQgPSBfZGVyZXFfKCcuL3V0aWxzJykuZGVjb2RlNjQ7XG5cbmZ1bmN0aW9uIFNWR0NvbnRhaW5lcihzcmMpIHtcbiAgICB0aGlzLnNyYyA9IHNyYztcbiAgICB0aGlzLmltYWdlID0gbnVsbDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLnByb21pc2UgPSB0aGlzLmhhc0ZhYnJpYygpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoc2VsZi5pc0lubGluZShzcmMpID8gUHJvbWlzZS5yZXNvbHZlKHNlbGYuaW5saW5lRm9ybWF0dGluZyhzcmMpKSA6IFhIUihzcmMpKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHN2Zykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgd2luZG93Lmh0bWwyY2FudmFzLnN2Zy5mYWJyaWMubG9hZFNWR0Zyb21TdHJpbmcoc3ZnLCBzZWxmLmNyZWF0ZUNhbnZhcy5jYWxsKHNlbGYsIHJlc29sdmUpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cblNWR0NvbnRhaW5lci5wcm90b3R5cGUuaGFzRmFicmljID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICF3aW5kb3cuaHRtbDJjYW52YXMuc3ZnIHx8ICF3aW5kb3cuaHRtbDJjYW52YXMuc3ZnLmZhYnJpYyA/IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImh0bWwyY2FudmFzLnN2Zy5qcyBpcyBub3QgbG9hZGVkLCBjYW5ub3QgcmVuZGVyIHN2Z1wiKSkgOiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cblNWR0NvbnRhaW5lci5wcm90b3R5cGUuaW5saW5lRm9ybWF0dGluZyA9IGZ1bmN0aW9uKHNyYykge1xuICAgIHJldHVybiAoL15kYXRhOmltYWdlXFwvc3ZnXFwreG1sO2Jhc2U2NCwvLnRlc3Qoc3JjKSkgPyB0aGlzLmRlY29kZTY0KHRoaXMucmVtb3ZlQ29udGVudFR5cGUoc3JjKSkgOiB0aGlzLnJlbW92ZUNvbnRlbnRUeXBlKHNyYyk7XG59O1xuXG5TVkdDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNvbnRlbnRUeXBlID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgcmV0dXJuIHNyYy5yZXBsYWNlKC9eZGF0YTppbWFnZVxcL3N2Z1xcK3htbCg7YmFzZTY0KT8sLywnJyk7XG59O1xuXG5TVkdDb250YWluZXIucHJvdG90eXBlLmlzSW5saW5lID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgcmV0dXJuICgvXmRhdGE6aW1hZ2VcXC9zdmdcXCt4bWwvaS50ZXN0KHNyYykpO1xufTtcblxuU1ZHQ29udGFpbmVyLnByb3RvdHlwZS5jcmVhdGVDYW52YXMgPSBmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAob2JqZWN0cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgY2FudmFzID0gbmV3IHdpbmRvdy5odG1sMmNhbnZhcy5zdmcuZmFicmljLlN0YXRpY0NhbnZhcygnYycpO1xuICAgICAgICBzZWxmLmltYWdlID0gY2FudmFzLmxvd2VyQ2FudmFzRWw7XG4gICAgICAgIGNhbnZhc1xuICAgICAgICAgICAgLnNldFdpZHRoKG9wdGlvbnMud2lkdGgpXG4gICAgICAgICAgICAuc2V0SGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KVxuICAgICAgICAgICAgLmFkZCh3aW5kb3cuaHRtbDJjYW52YXMuc3ZnLmZhYnJpYy51dGlsLmdyb3VwU1ZHRWxlbWVudHMob2JqZWN0cywgb3B0aW9ucykpXG4gICAgICAgICAgICAucmVuZGVyQWxsKCk7XG4gICAgICAgIHJlc29sdmUoY2FudmFzLmxvd2VyQ2FudmFzRWwpO1xuICAgIH07XG59O1xuXG5TVkdDb250YWluZXIucHJvdG90eXBlLmRlY29kZTY0ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuICh0eXBlb2Yod2luZG93LmF0b2IpID09PSBcImZ1bmN0aW9uXCIpID8gd2luZG93LmF0b2Ioc3RyKSA6IGRlY29kZTY0KHN0cik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNWR0NvbnRhaW5lcjtcblxufSx7XCIuL3V0aWxzXCI6MjYsXCIuL3hoclwiOjI4fV0sMjQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIFNWR0NvbnRhaW5lciA9IF9kZXJlcV8oJy4vc3ZnY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIFNWR05vZGVDb250YWluZXIobm9kZSwgX25hdGl2ZSkge1xuICAgIHRoaXMuc3JjID0gbm9kZTtcbiAgICB0aGlzLmltYWdlID0gbnVsbDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLnByb21pc2UgPSBfbmF0aXZlID8gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgc2VsZi5pbWFnZS5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgICBzZWxmLmltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgIHNlbGYuaW1hZ2Uuc3JjID0gXCJkYXRhOmltYWdlL3N2Zyt4bWwsXCIgKyAobmV3IFhNTFNlcmlhbGl6ZXIoKSkuc2VyaWFsaXplVG9TdHJpbmcobm9kZSk7XG4gICAgICAgIGlmIChzZWxmLmltYWdlLmNvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHNlbGYuaW1hZ2UpO1xuICAgICAgICB9XG4gICAgfSkgOiB0aGlzLmhhc0ZhYnJpYygpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICB3aW5kb3cuaHRtbDJjYW52YXMuc3ZnLmZhYnJpYy5wYXJzZVNWR0RvY3VtZW50KG5vZGUsIHNlbGYuY3JlYXRlQ2FudmFzLmNhbGwoc2VsZiwgcmVzb2x2ZSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuU1ZHTm9kZUNvbnRhaW5lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFNWR0NvbnRhaW5lci5wcm90b3R5cGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNWR05vZGVDb250YWluZXI7XG5cbn0se1wiLi9zdmdjb250YWluZXJcIjoyM31dLDI1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBOb2RlQ29udGFpbmVyID0gX2RlcmVxXygnLi9ub2RlY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIFRleHRDb250YWluZXIobm9kZSwgcGFyZW50KSB7XG4gICAgTm9kZUNvbnRhaW5lci5jYWxsKHRoaXMsIG5vZGUsIHBhcmVudCk7XG59XG5cblRleHRDb250YWluZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShOb2RlQ29udGFpbmVyLnByb3RvdHlwZSk7XG5cblRleHRDb250YWluZXIucHJvdG90eXBlLmFwcGx5VGV4dFRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubm9kZS5kYXRhID0gdGhpcy50cmFuc2Zvcm0odGhpcy5wYXJlbnQuY3NzKFwidGV4dFRyYW5zZm9ybVwiKSk7XG59O1xuXG5UZXh0Q29udGFpbmVyLnByb3RvdHlwZS50cmFuc2Zvcm0gPSBmdW5jdGlvbih0cmFuc2Zvcm0pIHtcbiAgICB2YXIgdGV4dCA9IHRoaXMubm9kZS5kYXRhO1xuICAgIHN3aXRjaCh0cmFuc2Zvcm0pe1xuICAgICAgICBjYXNlIFwibG93ZXJjYXNlXCI6XG4gICAgICAgICAgICByZXR1cm4gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjYXNlIFwiY2FwaXRhbGl6ZVwiOlxuICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKF58XFxzfDp8LXxcXCh8XFwpKShbYS16XSkvZywgY2FwaXRhbGl6ZSk7XG4gICAgICAgIGNhc2UgXCJ1cHBlcmNhc2VcIjpcbiAgICAgICAgICAgIHJldHVybiB0ZXh0LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjYXBpdGFsaXplKG0sIHAxLCBwMikge1xuICAgIGlmIChtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHAxICsgcDIudG9VcHBlckNhc2UoKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dENvbnRhaW5lcjtcblxufSx7XCIuL25vZGVjb250YWluZXJcIjoxNH1dLDI2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbmV4cG9ydHMuc21hbGxJbWFnZSA9IGZ1bmN0aW9uIHNtYWxsSW1hZ2UoKSB7XG4gICAgcmV0dXJuIFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3XCI7XG59O1xuXG5leHBvcnRzLmJpbmQgPSBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07XG5cbi8qXG4gKiBiYXNlNjQtYXJyYXlidWZmZXJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXN2aC9iYXNlNjQtYXJyYXlidWZmZXJcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgTmlrbGFzIHZvbiBIZXJ0emVuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuZXhwb3J0cy5kZWNvZGU2NCA9IGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgIHZhciBjaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuICAgIHZhciBsZW4gPSBiYXNlNjQubGVuZ3RoLCBpLCBlbmNvZGVkMSwgZW5jb2RlZDIsIGVuY29kZWQzLCBlbmNvZGVkNCwgYnl0ZTEsIGJ5dGUyLCBieXRlMztcblxuICAgIHZhciBvdXRwdXQgPSBcIlwiO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9NCkge1xuICAgICAgICBlbmNvZGVkMSA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2ldKTtcbiAgICAgICAgZW5jb2RlZDIgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpKzFdKTtcbiAgICAgICAgZW5jb2RlZDMgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpKzJdKTtcbiAgICAgICAgZW5jb2RlZDQgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpKzNdKTtcblxuICAgICAgICBieXRlMSA9IChlbmNvZGVkMSA8PCAyKSB8IChlbmNvZGVkMiA+PiA0KTtcbiAgICAgICAgYnl0ZTIgPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgICBieXRlMyA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IGVuY29kZWQ0O1xuICAgICAgICBpZiAoZW5jb2RlZDMgPT09IDY0KSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZW5jb2RlZDQgPT09IDY0IHx8IGVuY29kZWQ0ID09PSAtMSkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZTEsIGJ5dGUyKTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZTEsIGJ5dGUyLCBieXRlMyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0cy5nZXRCb3VuZHMgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgIHZhciBjbGllbnRSZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHdpZHRoID0gbm9kZS5vZmZzZXRXaWR0aCA9PSBudWxsID8gY2xpZW50UmVjdC53aWR0aCA6IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IGNsaWVudFJlY3QudG9wLFxuICAgICAgICAgICAgYm90dG9tOiBjbGllbnRSZWN0LmJvdHRvbSB8fCAoY2xpZW50UmVjdC50b3AgKyBjbGllbnRSZWN0LmhlaWdodCksXG4gICAgICAgICAgICByaWdodDogY2xpZW50UmVjdC5sZWZ0ICsgd2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiBjbGllbnRSZWN0LmxlZnQsXG4gICAgICAgICAgICB3aWR0aDogIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBub2RlLm9mZnNldEhlaWdodCA9PSBudWxsID8gY2xpZW50UmVjdC5oZWlnaHQgOiBub2RlLm9mZnNldEhlaWdodFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge307XG59O1xuXG5leHBvcnRzLm9mZnNldEJvdW5kcyA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5vZmZzZXRQYXJlbnQgPyBleHBvcnRzLm9mZnNldEJvdW5kcyhub2RlLm9mZnNldFBhcmVudCkgOiB7dG9wOiAwLCBsZWZ0OiAwfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogbm9kZS5vZmZzZXRUb3AgKyBwYXJlbnQudG9wLFxuICAgICAgICBib3R0b206IG5vZGUub2Zmc2V0VG9wICsgbm9kZS5vZmZzZXRIZWlnaHQgKyBwYXJlbnQudG9wLFxuICAgICAgICByaWdodDogbm9kZS5vZmZzZXRMZWZ0ICsgcGFyZW50LmxlZnQgKyBub2RlLm9mZnNldFdpZHRoLFxuICAgICAgICBsZWZ0OiBub2RlLm9mZnNldExlZnQgKyBwYXJlbnQubGVmdCxcbiAgICAgICAgd2lkdGg6IG5vZGUub2Zmc2V0V2lkdGgsXG4gICAgICAgIGhlaWdodDogbm9kZS5vZmZzZXRIZWlnaHRcbiAgICB9O1xufTtcblxuZXhwb3J0cy5wYXJzZUJhY2tncm91bmRzID0gZnVuY3Rpb24oYmFja2dyb3VuZEltYWdlKSB7XG4gICAgdmFyIHdoaXRlc3BhY2UgPSAnIFxcclxcblxcdCcsXG4gICAgICAgIG1ldGhvZCwgZGVmaW5pdGlvbiwgcHJlZml4LCBwcmVmaXhfaSwgYmxvY2ssIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgbW9kZSA9IDAsIG51bVBhcmVuID0gMCwgcXVvdGUsIGFyZ3M7XG4gICAgdmFyIGFwcGVuZFJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLnN1YnN0cigwLCAxKSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnN1YnN0cigxLCBkZWZpbml0aW9uLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24pIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWV0aG9kLnN1YnN0cigwLCAxKSA9PT0gJy0nICYmIChwcmVmaXhfaSA9IG1ldGhvZC5pbmRleE9mKCctJywgMSApICsgMSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gbWV0aG9kLnN1YnN0cigwLCBwcmVmaXhfaSk7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gbWV0aG9kLnN1YnN0cihwcmVmaXhfaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGJsb2NrLFxuICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IG51bGxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MgPSBbXTtcbiAgICAgICAgbWV0aG9kID0gcHJlZml4ID0gZGVmaW5pdGlvbiA9IGJsb2NrID0gJyc7XG4gICAgfTtcbiAgICBhcmdzID0gW107XG4gICAgbWV0aG9kID0gcHJlZml4ID0gZGVmaW5pdGlvbiA9IGJsb2NrID0gJyc7XG4gICAgYmFja2dyb3VuZEltYWdlLnNwbGl0KFwiXCIpLmZvckVhY2goZnVuY3Rpb24oYykge1xuICAgICAgICBpZiAobW9kZSA9PT0gMCAmJiB3aGl0ZXNwYWNlLmluZGV4T2YoYykgPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaChjKSB7XG4gICAgICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgICAgIGlmKCFxdW90ZSkge1xuICAgICAgICAgICAgICAgIHF1b3RlID0gYztcbiAgICAgICAgICAgIH0gZWxzZSBpZihxdW90ZSA9PT0gYykge1xuICAgICAgICAgICAgICAgIHF1b3RlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICAgIGlmKHF1b3RlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYobW9kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG1vZGUgPSAxO1xuICAgICAgICAgICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBudW1QYXJlbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJyknOlxuICAgICAgICAgICAgaWYgKHF1b3RlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYobW9kZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGlmKG51bVBhcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBibG9jayArPSBjO1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG51bVBhcmVuLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnLCc6XG4gICAgICAgICAgICBpZiAocXVvdGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZihtb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKG51bVBhcmVuID09PSAwICYmICFtZXRob2QubWF0Y2goL151cmwkL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBibG9jayArPSBjO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBibG9jayArPSBjO1xuICAgICAgICBpZiAobW9kZSA9PT0gMCkge1xuICAgICAgICAgICAgbWV0aG9kICs9IGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWZpbml0aW9uICs9IGM7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFwcGVuZFJlc3VsdCgpO1xuICAgIHJldHVybiByZXN1bHRzO1xufTtcblxufSx7fV0sMjc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIEdyYWRpZW50Q29udGFpbmVyID0gX2RlcmVxXygnLi9ncmFkaWVudGNvbnRhaW5lcicpO1xuXG5mdW5jdGlvbiBXZWJraXRHcmFkaWVudENvbnRhaW5lcihpbWFnZURhdGEpIHtcbiAgICBHcmFkaWVudENvbnRhaW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9IGltYWdlRGF0YS5hcmdzWzBdID09PSBcImxpbmVhclwiID8gR3JhZGllbnRDb250YWluZXIuVFlQRVMuTElORUFSIDogR3JhZGllbnRDb250YWluZXIuVFlQRVMuUkFESUFMO1xufVxuXG5XZWJraXRHcmFkaWVudENvbnRhaW5lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdyYWRpZW50Q29udGFpbmVyLnByb3RvdHlwZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2Via2l0R3JhZGllbnRDb250YWluZXI7XG5cbn0se1wiLi9ncmFkaWVudGNvbnRhaW5lclwiOjl9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5mdW5jdGlvbiBYSFIodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKHhoci5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJOZXR3b3JrIEVycm9yXCIpKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUjtcblxufSx7fV19LHt9LFs0XSkoNClcbn0pOyIsIlxuXG4jIERvY3VtZW50YXRpb24gb2YgdGhpcyBNb2R1bGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJja3Jlbm4vZnJhbWVyLUZpcmViYXNlXG4jIC0tLS0tLSA6IC0tLS0tLS0gRmlyZWJhc2UgUkVTVCBBUEk6IGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3JlZmVyZW5jZS9yZXN0L2RhdGFiYXNlL1xuXG4jIEZpcmViYXNlIFJFU1QgQVBJIENsYXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgZXhwb3J0cy5GaXJlYmFzZSBleHRlbmRzIEZyYW1lci5CYXNlQ2xhc3NcblxuXG5cdEAuZGVmaW5lIFwic3RhdHVzXCIsXG5cdFx0Z2V0OiAtPiBAX3N0YXR1cyAjIHJlYWRPbmx5XG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAcHJvamVjdElEID0gQG9wdGlvbnMucHJvamVjdElEID89IG51bGxcblx0XHRAc2VjcmV0ICAgID0gQG9wdGlvbnMuc2VjcmV0ICAgID89IG51bGxcblx0XHRAZGVidWcgICAgID0gQG9wdGlvbnMuZGVidWcgICAgID89IGZhbHNlXG5cdFx0QF9zdGF0dXMgICAgICAgICAgICAgICAgICAgICAgICA/PSBcImRpc2Nvbm5lY3RlZFwiXG5cblx0XHRAc2VjcmV0RW5kUG9pbnQgPSBpZiBAc2VjcmV0IHRoZW4gXCI/YXV0aD0je0BzZWNyZXR9XCIgZWxzZSBcIj9cIiAjIGhvdGZpeFxuXHRcdHN1cGVyXG5cblx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBDb25uZWN0aW5nIHRvIEZpcmViYXNlIFByb2plY3QgJyN7QHByb2plY3RJRH0nIC4uLiBcXG4gVVJMOiAnaHR0cHM6Ly8je0Bwcm9qZWN0SUR9LmZpcmViYXNlaW8uY29tJ1wiIGlmIEBkZWJ1Z1xuXHRcdEAub25DaGFuZ2UgXCJjb25uZWN0aW9uXCJcblxuXG5cdHJlcXVlc3QgPSAocHJvamVjdCwgc2VjcmV0LCBwYXRoLCBjYWxsYmFjaywgbWV0aG9kLCBkYXRhLCBwYXJhbWV0ZXJzLCBkZWJ1ZykgLT5cblxuXHRcdHVybCA9IFwiaHR0cHM6Ly8je3Byb2plY3R9LmZpcmViYXNlaW8uY29tI3twYXRofS5qc29uI3tzZWNyZXR9XCJcblxuXG5cdFx0dW5sZXNzIHBhcmFtZXRlcnMgaXMgdW5kZWZpbmVkXG5cdFx0XHRpZiBwYXJhbWV0ZXJzLnNoYWxsb3cgICAgICAgICAgICB0aGVuIHVybCArPSBcIiZzaGFsbG93PXRydWVcIlxuXHRcdFx0aWYgcGFyYW1ldGVycy5mb3JtYXQgaXMgXCJleHBvcnRcIiB0aGVuIHVybCArPSBcIiZmb3JtYXQ9ZXhwb3J0XCJcblxuXHRcdFx0c3dpdGNoIHBhcmFtZXRlcnMucHJpbnRcblx0XHRcdFx0d2hlbiBcInByZXR0eVwiIHRoZW4gdXJsICs9IFwiJnByaW50PXByZXR0eVwiXG5cdFx0XHRcdHdoZW4gXCJzaWxlbnRcIiB0aGVuIHVybCArPSBcIiZwcmludD1zaWxlbnRcIlxuXG5cdFx0XHRpZiB0eXBlb2YgcGFyYW1ldGVycy5kb3dubG9hZCBpcyBcInN0cmluZ1wiXG5cdFx0XHRcdHVybCArPSBcIiZkb3dubG9hZD0je3BhcmFtZXRlcnMuZG93bmxvYWR9XCJcblx0XHRcdFx0d2luZG93Lm9wZW4odXJsLFwiX3NlbGZcIilcblxuXHRcdFx0dXJsICs9IFwiJm9yZGVyQnk9XCIgKyAnXCInICsgcGFyYW1ldGVycy5vcmRlckJ5ICsgJ1wiJyBpZiB0eXBlb2YgcGFyYW1ldGVycy5vcmRlckJ5ICAgICAgaXMgXCJzdHJpbmdcIlxuXHRcdFx0cHJpbnQgdXJsICs9IFwiJmxpbWl0VG9GaXJzdD0je3BhcmFtZXRlcnMubGltaXRUb0ZpcnN0fVwiICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMubGltaXRUb0ZpcnN0IGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZsaW1pdFRvTGFzdD0je3BhcmFtZXRlcnMubGltaXRUb0xhc3R9XCIgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmxpbWl0VG9MYXN0ICBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImc3RhcnRBdD0je3BhcmFtZXRlcnMuc3RhcnRBdH1cIiAgICAgICAgICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5zdGFydEF0ICAgICAgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmVuZEF0PSN7cGFyYW1ldGVycy5lbmRBdH1cIiAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMuZW5kQXQgICAgICAgIGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZlcXVhbFRvPSN7cGFyYW1ldGVycy5lcXVhbFRvfVwiICAgICAgICAgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmVxdWFsVG8gICAgICBpcyBcIm51bWJlclwiXG5cblx0XHR4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdFxuXHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IE5ldyAnI3ttZXRob2R9Jy1yZXF1ZXN0IHdpdGggZGF0YTogJyN7SlNPTi5zdHJpbmdpZnkoZGF0YSl9JyBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cdFx0eGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gPT5cblxuXHRcdFx0dW5sZXNzIHBhcmFtZXRlcnMgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdGlmIHBhcmFtZXRlcnMucHJpbnQgaXMgXCJzaWxlbnRcIiBvciB0eXBlb2YgcGFyYW1ldGVycy5kb3dubG9hZCBpcyBcInN0cmluZ1wiIHRoZW4gcmV0dXJuICMgdWdoXG5cblx0XHRcdHN3aXRjaCB4aHR0cC5yZWFkeVN0YXRlXG5cdFx0XHRcdHdoZW4gMCB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlcXVlc3Qgbm90IGluaXRpYWxpemVkIFxcbiBVUkw6ICcje3VybH0nXCIgICAgICAgaWYgZGVidWdcblx0XHRcdFx0d2hlbiAxIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogU2VydmVyIGNvbm5lY3Rpb24gZXN0YWJsaXNoZWQgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDIgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZXF1ZXN0IHJlY2VpdmVkIFxcbiBVUkw6ICcje3VybH0nXCIgICAgICAgICAgICAgIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gMyB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFByb2Nlc3NpbmcgcmVxdWVzdCBcXG4gVVJMOiAnI3t1cmx9J1wiICAgICAgICAgICAgaWYgZGVidWdcblx0XHRcdFx0d2hlbiA0XG5cdFx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZSh4aHR0cC5yZXNwb25zZVRleHQpKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZXF1ZXN0IGZpbmlzaGVkLCByZXNwb25zZTogJyN7SlNPTi5wYXJzZSh4aHR0cC5yZXNwb25zZVRleHQpfScgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXG5cdFx0XHRpZiB4aHR0cC5zdGF0dXMgaXMgXCI0MDRcIlxuXHRcdFx0XHRjb25zb2xlLndhcm4gXCJGaXJlYmFzZTogSW52YWxpZCByZXF1ZXN0LCBwYWdlIG5vdCBmb3VuZCBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cblxuXHRcdHhodHRwLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpXG5cdFx0eGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIilcblx0XHR4aHR0cC5zZW5kKGRhdGEgPSBcIiN7SlNPTi5zdHJpbmdpZnkoZGF0YSl9XCIpXG5cblxuXG5cdCMgQXZhaWxhYmxlIG1ldGhvZHNcblxuXHRnZXQ6ICAgIChwYXRoLCBjYWxsYmFjaywgICAgICAgcGFyYW1ldGVycykgLT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIkdFVFwiLCAgICBudWxsLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHB1dDogICAgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiUFVUXCIsICAgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cG9zdDogICAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldEVuZFBvaW50LCBwYXRoLCBjYWxsYmFjaywgXCJQT1NUXCIsICAgZGF0YSwgcGFyYW1ldGVycywgQGRlYnVnKVxuXHRwYXRjaDogIChwYXRoLCBkYXRhLCBjYWxsYmFjaywgcGFyYW1ldGVycykgLT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIlBBVENIXCIsICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdGRlbGV0ZTogKHBhdGgsIGNhbGxiYWNrLCAgICAgICBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiREVMRVRFXCIsIG51bGwsIHBhcmFtZXRlcnMsIEBkZWJ1ZylcblxuXG5cblx0b25DaGFuZ2U6IChwYXRoLCBjYWxsYmFjaykgLT5cblxuXG5cdFx0aWYgcGF0aCBpcyBcImNvbm5lY3Rpb25cIlxuXG5cdFx0XHR1cmwgPSBcImh0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbS8uanNvbiN7QHNlY3JldEVuZFBvaW50fVwiXG5cdFx0XHRjdXJyZW50U3RhdHVzID0gXCJkaXNjb25uZWN0ZWRcIlxuXHRcdFx0c291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybClcblxuXHRcdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJvcGVuXCIsID0+XG5cdFx0XHRcdGlmIGN1cnJlbnRTdGF0dXMgaXMgXCJkaXNjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdEAuX3N0YXR1cyA9IFwiY29ubmVjdGVkXCJcblx0XHRcdFx0XHRjYWxsYmFjayhcImNvbm5lY3RlZFwiKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBDb25uZWN0aW9uIHRvIEZpcmViYXNlIFByb2plY3QgJyN7QHByb2plY3RJRH0nIGVzdGFibGlzaGVkXCIgaWYgQGRlYnVnXG5cdFx0XHRcdGN1cnJlbnRTdGF0dXMgPSBcImNvbm5lY3RlZFwiXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwiZXJyb3JcIiwgPT5cblx0XHRcdFx0aWYgY3VycmVudFN0YXR1cyBpcyBcImNvbm5lY3RlZFwiXG5cdFx0XHRcdFx0QC5fc3RhdHVzID0gXCJkaXNjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdGNhbGxiYWNrKFwiZGlzY29ubmVjdGVkXCIpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybiBcIkZpcmViYXNlOiBDb25uZWN0aW9uIHRvIEZpcmViYXNlIFByb2plY3QgJyN7QHByb2plY3RJRH0nIGNsb3NlZFwiIGlmIEBkZWJ1Z1xuXHRcdFx0XHRjdXJyZW50U3RhdHVzID0gXCJkaXNjb25uZWN0ZWRcIlxuXG5cblx0XHRlbHNlXG5cblx0XHRcdHVybCA9IFwiaHR0cHM6Ly8je0Bwcm9qZWN0SUR9LmZpcmViYXNlaW8uY29tI3twYXRofS5qc29uI3tAc2VjcmV0RW5kUG9pbnR9XCJcblx0XHRcdHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpXG5cdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBMaXN0ZW5pbmcgdG8gY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIEBkZWJ1Z1xuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcInB1dFwiLCAoZXYpID0+XG5cdFx0XHRcdGNhbGxiYWNrKEpTT04ucGFyc2UoZXYuZGF0YSkuZGF0YSwgXCJwdXRcIiwgSlNPTi5wYXJzZShldi5kYXRhKS5wYXRoLCBfLnRhaWwoSlNPTi5wYXJzZShldi5kYXRhKS5wYXRoLnNwbGl0KFwiL1wiKSwxKSkgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlY2VpdmVkIGNoYW5nZXMgbWFkZSB0byAnI3twYXRofScgdmlhICdQVVQnOiAje0pTT04ucGFyc2UoZXYuZGF0YSkuZGF0YX0gXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBAZGVidWdcblxuXHRcdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJwYXRjaFwiLCAoZXYpID0+XG5cdFx0XHRcdGNhbGxiYWNrKEpTT04ucGFyc2UoZXYuZGF0YSkuZGF0YSwgXCJwYXRjaFwiLCBKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGgsIF8udGFpbChKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGguc3BsaXQoXCIvXCIpLDEpKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVjZWl2ZWQgY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyB2aWEgJ1BBVENIJzogI3tKU09OLnBhcnNlKGV2LmRhdGEpLmRhdGF9IFxcbiBVUkw6ICcje3VybH0nXCIgaWYgQGRlYnVnXG4iLCJjbGFzcyBDYW1lcmFMYXllciBleHRlbmRzIFZpZGVvTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG4gICAgY3VzdG9tUHJvcHMgPVxuICAgICAgZmFjaW5nOiB0cnVlXG4gICAgICBmbGlwcGVkOiB0cnVlXG4gICAgICBhdXRvRmxpcDogdHJ1ZVxuICAgICAgcmVzb2x1dGlvbjogdHJ1ZVxuICAgICAgZml0OiB0cnVlXG5cbiAgICBiYXNlT3B0aW9ucyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZmlsdGVyIChrZXkpIC0+ICFjdXN0b21Qcm9wc1trZXldXG4gICAgICAucmVkdWNlIChjbG9uZSwga2V5KSAtPlxuICAgICAgICBjbG9uZVtrZXldID0gb3B0aW9uc1trZXldXG4gICAgICAgIGNsb25lXG4gICAgICAsIHt9XG5cbiAgICBzdXBlcihiYXNlT3B0aW9ucylcblxuICAgIEBfZmFjaW5nID0gb3B0aW9ucy5mYWNpbmcgPyAnYmFjaydcbiAgICBAX2ZsaXBwZWQgPSBvcHRpb25zLmZsaXBwZWQgPyBmYWxzZVxuICAgIEBfYXV0b0ZsaXAgPSBvcHRpb25zLmF1dG9GbGlwID8gdHJ1ZVxuICAgIEBfcmVzb2x1dGlvbiA9IG9wdGlvbnMucmVzb2x1dGlvbiA/IDQ4MFxuXG4gICAgQF9zdGFydGVkID0gZmFsc2VcbiAgICBAX2RldmljZSA9IG51bGxcbiAgICBAX21hdGNoZWRGYWNpbmcgPSAndW5rbm93bidcbiAgICBAX3N0cmVhbSA9IG51bGxcbiAgICBAX3NjaGVkdWxlZFJlc3RhcnQgPSBudWxsXG4gICAgQF9yZWNvcmRpbmcgPSBudWxsXG5cbiAgICBAYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50J1xuICAgIEBjbGlwID0gdHJ1ZVxuXG4gICAgQHBsYXllci5zcmMgPSAnJ1xuICAgIEBwbGF5ZXIuYXV0b3BsYXkgPSB0cnVlXG4gICAgQHBsYXllci5tdXRlZCA9IHRydWVcbiAgICBAcGxheWVyLnN0eWxlLm9iamVjdEZpdCA9IG9wdGlvbnMuZml0ID8gJ2NvdmVyJ1xuXG4gIEBkZWZpbmUgJ2ZhY2luZycsXG4gICAgZ2V0OiAtPiBAX2ZhY2luZ1xuICAgIHNldDogKGZhY2luZykgLT5cbiAgICAgIEBfZmFjaW5nID0gaWYgZmFjaW5nID09ICdmcm9udCcgdGhlbiBmYWNpbmcgZWxzZSAnYmFjaydcbiAgICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgQGRlZmluZSAnZmxpcHBlZCcsXG4gICAgZ2V0OiAtPiBAX2ZsaXBwZWRcbiAgICBzZXQ6IChmbGlwcGVkKSAtPlxuICAgICAgQF9mbGlwcGVkID0gZmxpcHBlZFxuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdhdXRvRmxpcCcsXG4gICAgZ2V0OiAtPiBAX2F1dG9GbGlwXG4gICAgc2V0OiAoYXV0b0ZsaXApIC0+XG4gICAgICBAX2F1dG9GbGlwID0gYXV0b0ZsaXBcbiAgICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgQGRlZmluZSAncmVzb2x1dGlvbicsXG4gICAgZ2V0OiAtPiBAX3Jlc29sdXRpb25cbiAgICBzZXQ6IChyZXNvbHV0aW9uKSAtPlxuICAgICAgQF9yZXNvbHV0aW9uID0gcmVzb2x1dGlvblxuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdmaXQnLFxuICAgIGdldDogLT4gQHBsYXllci5zdHlsZS5vYmplY3RGaXRcbiAgICBzZXQ6IChmaXQpIC0+IEBwbGF5ZXIuc3R5bGUub2JqZWN0Rml0ID0gZml0XG5cbiAgQGRlZmluZSAnaXNSZWNvcmRpbmcnLFxuICAgIGdldDogLT4gQF9yZWNvcmRpbmc/LnJlY29yZGVyLnN0YXRlID09ICdyZWNvcmRpbmcnXG5cbiAgdG9nZ2xlRmFjaW5nOiAtPlxuICAgIEBfZmFjaW5nID0gaWYgQF9mYWNpbmcgPT0gJ2Zyb250JyB0aGVuICdiYWNrJyBlbHNlICdmcm9udCdcbiAgICBAX3NldFJlc3RhcnQoKVxuXG4gIGNhcHR1cmU6ICh3aWR0aCA9IEB3aWR0aCwgaGVpZ2h0ID0gQGhlaWdodCwgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbykgLT5cbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG4gICAgY2FudmFzLndpZHRoID0gcmF0aW8gKiB3aWR0aFxuICAgIGNhbnZhcy5oZWlnaHQgPSByYXRpbyAqIGhlaWdodFxuXG4gICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBAZHJhdyhjb250ZXh0KVxuXG4gICAgdXJsID0gY2FudmFzLnRvRGF0YVVSTCgpXG4gICAgQGVtaXQoJ2NhcHR1cmUnLCB1cmwpXG5cbiAgICB1cmxcblxuICBkcmF3OiAoY29udGV4dCkgLT5cbiAgICByZXR1cm4gdW5sZXNzIGNvbnRleHRcblxuICAgIGNvdmVyID0gKHNyY1csIHNyY0gsIGRzdFcsIGRzdEgpIC0+XG4gICAgICBzY2FsZVggPSBkc3RXIC8gc3JjV1xuICAgICAgc2NhbGVZID0gZHN0SCAvIHNyY0hcbiAgICAgIHNjYWxlID0gaWYgc2NhbGVYID4gc2NhbGVZIHRoZW4gc2NhbGVYIGVsc2Ugc2NhbGVZXG4gICAgICB3aWR0aDogc3JjVyAqIHNjYWxlLCBoZWlnaHQ6IHNyY0ggKiBzY2FsZVxuXG4gICAge3ZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0fSA9IEBwbGF5ZXJcblxuICAgIGNsaXBCb3ggPSB3aWR0aDogY29udGV4dC5jYW52YXMud2lkdGgsIGhlaWdodDogY29udGV4dC5jYW52YXMuaGVpZ2h0XG4gICAgbGF5ZXJCb3ggPSBjb3ZlcihAd2lkdGgsIEBoZWlnaHQsIGNsaXBCb3gud2lkdGgsIGNsaXBCb3guaGVpZ2h0KVxuICAgIHZpZGVvQm94ID0gY292ZXIodmlkZW9XaWR0aCwgdmlkZW9IZWlnaHQsIGxheWVyQm94LndpZHRoLCBsYXllckJveC5oZWlnaHQpXG5cbiAgICB4ID0gKGNsaXBCb3gud2lkdGggLSB2aWRlb0JveC53aWR0aCkgLyAyXG4gICAgeSA9IChjbGlwQm94LmhlaWdodCAtIHZpZGVvQm94LmhlaWdodCkgLyAyXG5cbiAgICBjb250ZXh0LmRyYXdJbWFnZShAcGxheWVyLCB4LCB5LCB2aWRlb0JveC53aWR0aCwgdmlkZW9Cb3guaGVpZ2h0KVxuXG4gIHN0YXJ0OiAtPlxuICAgIEBfZW51bWVyYXRlRGV2aWNlcygpXG4gICAgLnRoZW4gKGRldmljZXMpID0+XG4gICAgICBkZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIgKGRldmljZSkgLT4gZGV2aWNlLmtpbmQgPT0gJ3ZpZGVvaW5wdXQnXG5cbiAgICAgIGZvciBkZXZpY2UgaW4gZGV2aWNlc1xuICAgICAgICBpZiBkZXZpY2UubGFiZWwuaW5kZXhPZihAX2ZhY2luZykgIT0gLTFcbiAgICAgICAgICBAX21hdGNoZWRGYWNpbmcgPSBAX2ZhY2luZ1xuICAgICAgICAgIHJldHVybiBkZXZpY2VcblxuICAgICAgQF9tYXRjaGVkRmFjaW5nID0gJ3Vua25vd24nXG5cbiAgICAgIGlmIGRldmljZXMubGVuZ3RoID4gMCB0aGVuIGRldmljZXNbMF0gZWxzZSBQcm9taXNlLnJlamVjdCgpXG5cbiAgICAudGhlbiAoZGV2aWNlKSA9PlxuICAgICAgcmV0dXJuIGlmICFkZXZpY2UgfHwgZGV2aWNlLmRldmljZUlkID09IEBfZGV2aWNlPy5kZXZpY2VJZFxuXG4gICAgICBAc3RvcCgpXG4gICAgICBAX2RldmljZSA9IGRldmljZVxuXG4gICAgICBjb25zdHJhaW50cyA9XG4gICAgICAgIHZpZGVvOlxuICAgICAgICAgIG1hbmRhdG9yeToge21pbldpZHRoOiBAX3Jlc29sdXRpb24sIG1pbkhlaWdodDogQF9yZXNvbHV0aW9ufVxuICAgICAgICAgIG9wdGlvbmFsOiBbe3NvdXJjZUlkOiBAX2RldmljZS5kZXZpY2VJZH1dXG4gICAgICAgIGF1ZGlvOlxuICAgICAgICAgIHRydWVcblxuICAgICAgQF9nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpXG5cbiAgICAudGhlbiAoc3RyZWFtKSA9PlxuICAgICAgQHBsYXllci5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSlcbiAgICAgIEBfc3RhcnRlZCA9IHRydWVcbiAgICAgIEBfc3RyZWFtID0gc3RyZWFtXG4gICAgICBAX2ZsaXAoKVxuXG4gICAgLmNhdGNoIChlcnJvcikgLT5cbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cbiAgc3RvcDogLT5cbiAgICBAX3N0YXJ0ZWQgPSBmYWxzZVxuXG4gICAgQHBsYXllci5wYXVzZSgpXG4gICAgQHBsYXllci5zcmMgPSAnJ1xuXG4gICAgQF9zdHJlYW0/LmdldFRyYWNrcygpLmZvckVhY2ggKHRyYWNrKSAtPiB0cmFjay5zdG9wKClcbiAgICBAX3N0cmVhbSA9IG51bGxcbiAgICBAX2RldmljZSA9IG51bGxcblxuICAgIGlmIEBfc2NoZWR1bGVkUmVzdGFydFxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQF9zY2hlZHVsZWRSZXN0YXJ0KVxuICAgICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gbnVsbFxuXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuICAgIGlmIEBfcmVjb3JkaW5nXG4gICAgICBAX3JlY29yZGluZy5yZWNvcmRlci5zdG9wKClcbiAgICAgIEBfcmVjb3JkaW5nID0gbnVsbFxuXG4gICAgY2h1bmtzID0gW11cblxuICAgIHJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIoQF9zdHJlYW0sIHttaW1lVHlwZTogJ3ZpZGVvL3dlYm0nfSlcbiAgICByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyICdzdGFydCcsIChldmVudCkgPT4gQGVtaXQoJ3N0YXJ0cmVjb3JkaW5nJylcbiAgICByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyICdkYXRhYXZhaWxhYmxlJywgKGV2ZW50KSAtPiBjaHVua3MucHVzaChldmVudC5kYXRhKVxuICAgIHJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIgJ3N0b3AnLCAoZXZlbnQpID0+XG4gICAgICBibG9iID0gbmV3IEJsb2IoY2h1bmtzKVxuICAgICAgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICAgIEBlbWl0KCdzdG9wcmVjb3JkaW5nJylcbiAgICAgIEBlbWl0KCdyZWNvcmQnLCB1cmwpXG5cbiAgICByZWNvcmRlci5zdGFydCgpXG5cbiAgICBAX3JlY29yZGluZyA9IHtyZWNvcmRlciwgY2h1bmtzfVxuXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgcmV0dXJuIGlmICFAX3JlY29yZGluZ1xuICAgIEBfcmVjb3JkaW5nLnJlY29yZGVyLnN0b3AoKVxuICAgIEBfcmVjb3JkaW5nID0gbnVsbFxuXG4gIG9uQ2FwdHVyZTogKGNhbGxiYWNrKSAtPiBAb24oJ2NhcHR1cmUnLCBjYWxsYmFjaylcbiAgb25TdGFydFJlY29yZGluZzogKGNhbGxiYWNrKSAtPiBAb24oJ3N0YXJ0cmVjb3JkaW5nJywgY2FsbGJhY2spXG4gIG9uU3RvcFJlY29yZGluZzogKGNhbGxiYWNrKSAtPiBAb24oJ3N0b3ByZWNvcmRpbmcnLCBjYWxsYmFjaylcbiAgb25SZWNvcmQ6IChjYWxsYmFjaykgLT4gQG9uKCdyZWNvcmQnLCBjYWxsYmFjaylcblxuICBfc2V0UmVzdGFydDogLT5cbiAgICByZXR1cm4gaWYgIUBfc3RhcnRlZCB8fCBAX3NjaGVkdWxlZFJlc3RhcnRcblxuICAgIEBfc2NoZWR1bGVkUmVzdGFydCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PlxuICAgICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gbnVsbFxuICAgICAgQHN0YXJ0KClcblxuICBfZmxpcDogLT5cbiAgICBAX2ZsaXBwZWQgPSBAX21hdGNoZWRGYWNpbmcgPT0gJ2Zyb250JyBpZiBAX2F1dG9GbGlwXG4gICAgeCA9IGlmIEBfZmxpcHBlZCB0aGVuIC0xIGVsc2UgMVxuICAgIEBwbGF5ZXIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZSgje3h9LCAxKVwiXG5cbiAgX2VudW1lcmF0ZURldmljZXM6IC0+XG4gICAgdHJ5XG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxuICAgIGNhdGNoXG4gICAgICBQcm9taXNlLnJlamVjdCgpXG5cbiAgX2dldFVzZXJNZWRpYTogKGNvbnN0cmFpbnRzKSAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICB0cnlcbiAgICAgICAgZ3VtID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhXG4gICAgICAgIGd1bS5jYWxsKG5hdmlnYXRvciwgY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdClcbiAgICAgIGNhdGNoXG4gICAgICAgIHJlamVjdCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhTGF5ZXIgaWYgbW9kdWxlP1xuRnJhbWVyLkNhbWVyYUxheWVyID0gQ2FtZXJhTGF5ZXJcbiIsIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBBdXRvR3JvdyBUZXh0YXJlYVxuIyBCeSBCbGFpbmUgQmlsbGluZ3NsZXkgTWF5IDI5LCAyMDE2XG4jXG4jIEZyYW5rZW5zdGVpbmVkIGhlYXZpbHkgZnJvbSBKb3JkYW4gRG9ic29uJ3MgSW5wdXRGaWVsZCBzdHVmZiBcbiMgYW5kIHRoZSBqUXVlcnkgQXV0b2dyb3cgcGx1Z2luLlxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiMgQWZ0ZXIgYWRkaW5nIHRoZSBtb2R1bGUsIGFkZCB0aGlzIHRvIHlvdXIgRnJhbWVyIHByb3RvdHlwZTpcbiMge0F1dG9Hcm93SW5wdXR9ID0gcmVxdWlyZSBcIkF1dG9Hcm93SW5wdXRcIlxuXG4jIFRoZW4geW91IGNhbiB3cml0ZSBjb29sIHN0dWZmIGxpa2U6XG4jIHRleHQgPSBuZXcgQXV0b0dyb3dJbnB1dFxuIyAgIHJlZmxvd1NpYmxpbmdzOiB0cnVlIG9yIGZhbHNlLCB3aWxsIG1vdmUgc3R1ZmYgdW5kZXIgaXQgYXMgaXQgY2hhbmdlcyBoZWlnaHQuXG4jICAgcmVzaXplUGFyZW50OiB0cnVlIG9yIGZhbHNlLCB3aWxsIHJlc2l6ZSB0aGUgcGFyZW50IGlmIHRoaW5ncyBnZXQgdG9vIGxvbmcuXG4jICAgcGFkZGluZzogZXg6IFwiMTZweCAxNnB4IDM2cHggMTZweFwiIC0ganVzdCBhIENTUyBkZWNsYXJhdGlvbiBmb3IgYW55IHBhZGRpbmcgeW91J2QgbGlrZS5cbiMgICBwbGFjZUhvbGRlcjogZXg6IFwiVHlwZSB5b3VyIGNvbW1lbnRzXCIgLSB3aGF0ZXZlciB5b3Ugd2FudCB0aGUgcGxhY2Vob2xkZXIgdGV4dCB0byBiZS5cbiMgICB2YWx1ZTogZXg6IFwiU2lsdCBpcy4uLlwiIC0gc3RhcnRlciB2YWx1ZSBpZiB5b3Ugd2FudCB0ZXh0IGFscmVhZHkgaW4gdGhlcmUuXG5cblxuXG5jbGFzcyBleHBvcnRzLkF1dG9Hcm93SW5wdXQgZXh0ZW5kcyBMYXllclxuXG4gICMgRXZlbnRzXG4gIEV2ZW50cy5JbnB1dCAgID0gXCJBdXRvR3Jvd0lucHV0Lk9uSW5wdXRcIlxuICBFdmVudHMuRm9jdXMgICA9IFwiQXV0b0dyb3dJbnB1dC5PbkZvY3VzXCJcbiAgRXZlbnRzLkJsdXIgICAgPSBcIkF1dG9Hcm93SW5wdXQuT25CbHVyXCJcbiAgXG4gIGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG4gICAgQHBhcmVudE9nSGVpZ2h0ID0gbnVsbFxuICAgIEBvcHRpb25zLmxpbmVIZWlnaHQgPSBcIiN7QG9wdGlvbnMubGluZUhlaWdodH1weFwiIGlmIEBvcHRpb25zLmxpbmVIZWlnaHQ/XG5cbiAgICAjIEZyYW1lciBMYXllciBQcm9wc1xuICAgIEBvcHRpb25zLmxpbmVIZWlnaHQgICAgICAgPz0gXCI0OHB4XCJcbiAgICBAb3B0aW9ucy5uYW1lICAgICAgICAgICAgID89IFwiQXV0b0dyb3dJbnB1dFwiXG4gICAgQG9wdGlvbnMuY29sb3IgICAgICAgICAgICA/PSBcIiMyMTIxMjFcIlxuICAgIEBvcHRpb25zLmJhY2tncm91bmRDb2xvciAgPz0gXCJ3aGl0ZVwiXG4gICAgQG9wdGlvbnMuaGVpZ2h0ICAgICAgICAgICA/PSAyMDBcbiAgICBAb3B0aW9ucy5ib3JkZXJSYWRpdXMgICAgID89IDBcbiAgICBAb3B0aW9ucy53aWR0aCAgICAgICAgICAgID89IDQwMFxuXG4gICAgIyBDdXN0b20gTGF5ZXIgUHJvcHMgICAgXG4gICAgQG9wdGlvbnMuZm9udFNpemUgICAgICAgICAgICAgPz0gMzJcbiAgICBAb3B0aW9ucy5mb250V2VpZ2h0ICAgICAgICAgICA/PSAzMDBcbiAgICBAb3B0aW9ucy5wYWRkaW5nICAgICAgICAgICAgICA/PSBcIjBcIlxuICAgIEBvcHRpb25zLmZvbnRGYW1pbHkgICAgICAgICAgID89IFwiLWFwcGxlLXN5c3RlbSwgSGVsdmV0aWNhIE5ldWVcIlxuICAgIEBvcHRpb25zLm1pbkhlaWdodCAgICAgICAgICAgID89IEAub3B0aW9ucy5oZWlnaHRcbiAgICBAb3B0aW9ucy5wbGFjZUhvbGRlciAgICAgICAgICA/PSBcIlR5cGUgc29tZXRoaW5nXCJcbiAgICBAb3B0aW9ucy5yZXNpemVQYXJlbnQgICAgICAgICA/PSBmYWxzZVxuICAgIEBvcHRpb25zLnBhcmVudEJvdHRvbVBhZGRpbmcgID89IDBcbiAgICBAb3B0aW9ucy5yZWZsb3dTaWJsaW5ncyAgICAgICA/PSBmYWxzZVxuXG4gICAgc3VwZXIgQG9wdGlvbnNcbiAgICBpZiBAb3B0aW9ucy5yZXNpemVQYXJlbnQgPT0gdHJ1ZSB0aGVuIEBwYXJlbnRPZ0hlaWdodCA9IEBvcHRpb25zLnBhcmVudC5oZWlnaHRcbiAgICBcbiAgICAjQ3JlYXRlIHRoZSB0ZXh0YXJlYVxuICAgIEB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJ0ZXh0YXJlYVwiXG4gICAgXG4gICAgIyBHaXZlIGl0IHRoZSBjb250ZW50IGlmIHNvbWUgaXMgZGVmaW5lZFxuICAgIEB0ZXh0YXJlYS52YWx1ZSA9IEBvcHRpb25zLnZhbHVlIGlmIEBvcHRpb25zLnZhbHVlP1xuICAgIEB0ZXh0YXJlYS5wbGFjZWhvbGRlciA9IEBvcHRpb25zLnBsYWNlSG9sZGVyIGlmIEBvcHRpb25zLnBsYWNlSG9sZGVyP1xuICAgIFxuICAgICMgQWRkIGl0IHRvIHRoZSBGcmFtZXIgTGF5ZXJcbiAgICBAX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQHRleHRhcmVhXG5cbiAgICAjRGVmaW5lIHN0eWxlcyBmb3IgdGhlIHRleHRhcmVhXG4gICAgQF90ZXh0QXJlYVN0eWxlID1cbiAgICAgIGZvbnQ6IFwiI3tAb3B0aW9ucy5mb250V2VpZ2h0fSAje0BvcHRpb25zLmZvbnRTaXplfXB4LyN7QG9wdGlvbnMubGluZUhlaWdodH0gI3tAb3B0aW9ucy5mb250RmFtaWx5fVwiXG4gICAgICBvdXRsaW5lOiBcIm5vbmVcIlxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgIGhlaWdodDogXCIxMDAlXCJcbiAgICAgIHdpZHRoOiAgXCIxMDAlXCJcbiAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiXG4gICAgICByZXNpemU6IFwibm9uZVwiXG4gICAgICBwYWRkaW5nIDogQG9wdGlvbnMucGFkZGluZ1xuICAgICAgbWFyZ2luOiBcIjBcIlxuICAgICAgXCItd2Via2l0LWFwcGVhcmFuY2VcIjogXCJub25lXCJcbiAgICAgIFwiYm94LXNpemluZ1wiIDogXCJib3JkZXItYm94XCJcblxuICAgICMgQWRkIHRob3NlIHN0eWxlcyB0byB0aGUgdGV4dGFyZWFcbiAgICBAdGV4dGFyZWEuc3R5bGVba2V5XSAgPSB2YWwgZm9yIGtleSwgdmFsIG9mIEBfdGV4dEFyZWFTdHlsZVxuICAgIEB0ZXh0YXJlYS5zdHlsZS5jb2xvciA9IEBvcHRpb25zLmNvbG9yIGlmIEBvcHRpb25zLmNvbG9yP1xuXG4gICAgI1VwZGF0ZSB0aGUgaGVpZ2h0IHdoZW5ldmVyIGFueXRoaW5nIGNoYW5nZXMuXG4gICAgQHRleHRhcmVhLm9ua2V5ZG93biA9ID0+IEBfdXBkYXRlKClcbiAgICBAdGV4dGFyZWEub25rZXl1cCA9ID0+IEBfdXBkYXRlKClcbiAgICBAdGV4dGFyZWEuY2hhbmdlID0gPT4gQF91cGRhdGUoKVxuICAgIEB0ZXh0YXJlYS5vbmZvY3VzID0gPT5cbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMFxuICAgICAgQGVtaXQoRXZlbnRzLkZvY3VzLCBAdGV4dGFyZWEudmFsdWUsIEApXG5cbiAgICBAdGV4dGFyZWEub25ibHVyICA9ID0+XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcbiAgICAgIHVubGVzcyBAdGV4dGFyZWEucGxhY2Vob2xkZXIgaXMgQG9wdGlvbnMucGxhY2VIb2xkZXIgb3IgIUBvcHRpb25zLnBsYWNlSG9sZGVyP1xuICAgICAgICBAdGV4dGFyZWEucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlclxuICAgICAgQGVtaXQoRXZlbnRzLkJsdXIsIEB0ZXh0YXJlYS52YWx1ZSwgQClcblxuICAgIEB0ZXh0YXJlYS5vbmlucHV0ID0gPT5cbiAgICAgIEBpc0VtcHR5ID0gISggQHRleHRhcmVhLnZhbHVlPy5sZW5ndGggPiAwKVxuICAgICAgQGVtaXQoRXZlbnRzLklucHV0LCBAdGV4dGFyZWEudmFsdWUsIEApXG4gICAgXG4gIF9yZXNpemVQYXJlbnQgPSAobGF5ZXIsIHBhcmVudE1pbkhlaWdodCwgYm90dG9tUGFkZGluZykgLT5cbiAgICAjIFZhcmlhYmxlIGZvciBwYXJlbnRcbiAgICBsYXllclBhcmVudCA9IGxheWVyLnBhcmVudFxuICAgIFxuICAgICMgQXJyYXkgdG8gc3RvcmUgYWxsIGNoaWxkcmVuJ3MgbWF4WXNcbiAgICBhbGxDaGlsZHJlbk1heFlzID0gW11cbiAgICBcbiAgICAjIFB1c2ggZWFjaCBtYXhZIHRvIGFuIGFycmF5XG4gICAgZm9yIG1heCBpbiBsYXllclBhcmVudC5jaGlsZHJlblxuICAgICAgYWxsQ2hpbGRyZW5NYXhZcy5wdXNoKG1heC5tYXhZKVxuICAgICAgXG4gICAgIyBGaW5kIHRoZSBib3R0b20tbW9zdCBtYXhZIHZhbHVlXG4gICAgdGFsbGVzdENoaWxkTWF4WSA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGFsbENoaWxkcmVuTWF4WXMpXG4gICAgXG4gICAgIyBTdG9yZSB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoYXQgYW5kIHRoZSBwYXJlbnQgbGF5ZXJcbiAgICBsYXllclBhcmVudC5oZWlnaHQgPSBNYXRoLm1heCh0YWxsZXN0Q2hpbGRNYXhZICsgYm90dG9tUGFkZGluZywgcGFyZW50TWluSGVpZ2h0KVxuICAgIFxuICAgICMgVE9ETyAtIE1haW50YWluIHRoZSBib3R0b20gcGFkZGluZyBvZiB0aGUgcGFyZW50LlxuICAgIFxuICAjIFJlZmxvdyBhbGwgdGhlIHNpYmxpbmdzIHVuZGVyIHRoZSB0ZXh0IGxheWVyXG4gIF9yZWZsb3dTaWJsaW5ncyA9IChsYXllciwgbGF5ZXJNYXhZKSAtPlxuICAgIGxheWVyTGlzdCA9IGxheWVyLnBhcmVudC5jaGlsZHJlblxuICAgIGZvciBhIGluIFtsYXllckxpc3QuaW5kZXhPZihsYXllcikrMS4uLmxheWVyTGlzdC5sZW5ndGhdXG4gICAgICB5RGlmZiA9IGxheWVyTGlzdFthXS55IC0gbGF5ZXJNYXhZXG4gICAgICBsYXllckxpc3RbYV0ueSA9IGxheWVyLm1heFkgKyB5RGlmZlxuICAgICMgVE9ETyAtIHJlZG8gdGhpcyB3aXRob3V0IHRoZSBhc3N1bXB0aW9uIHRoYXQgYWxsIHNpYmxpbmdzIGFmdGVyIHRoZSBsYXllciBhcmUgYmVsb3cgaXQuXG4gICAgICBcbiAgIyBVcGRhdGUgaGVpZ2h0IGZ1bmN0aW9uXG4gIF91cGRhdGU6ID0+XG4gICAgc2V0VGltZW91dCA9PlxuICAgICAgbGF5ZXJNYXhZID0gQC5tYXhZXG4gICAgICAjIEFkZCBiYWNrIGFueSBsaW5lIGJyZWFrcyB0aGF0IHRoZSB2YWx1ZSBtZXRob2QgZ2V0cyByaWRlIG9mXG4gICAgICBfdHJ1ZVZhbHVlID0gQHRleHRhcmVhLnZhbHVlLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPiZuYnNwO1wiKTtcbiAgICAgIFxuICAgICAgIyBJZiBpdCdzIGVtcHR5LCBtYWtlIHN1cmUgdGhlcmUncyBhIGxldHRlciBpbiB0aGVyZSB0byBjYWxjdWxhdGUgKnNvbWV0aGluZypcbiAgICAgIGlmIF90cnVlVmFsdWUudHJpbSgpID09IFwiXCIgdGhlbiBfdHJ1ZVZhbHVlID0gXCJhXCJcbiAgICAgIFxuICAgICAgIyBDYWxjdWxhdGUgdGhlIGhlaWdodCEhIVxuICAgICAgY2FsY0hlaWdodCA9IFV0aWxzLnJvdW5kKFV0aWxzLnRleHRTaXplKF90cnVlVmFsdWUsIEBfdGV4dEFyZWFTdHlsZSwge3dpZHRoOiBALndpZHRofSkuaGVpZ2h0LCAwKVxuICAgICAgXG4gICAgICAjIFNldCB0aGUgaGVpZ2h0IHRvIGVpdGhlciB0aGUgY2FsY3VsYXRlZCBoZWlnaHQsIG9yIHRoZSBtaW5IZWlnaHQsIHdoaWNoZXZlciBpcyBncmVhdGVyLlxuICAgICAgQC5oZWlnaHQgPSBNYXRoLm1heChjYWxjSGVpZ2h0LCBAb3B0aW9ucy5taW5IZWlnaHQpXG4gICAgICBpZiBAb3B0aW9ucy5yZWZsb3dTaWJsaW5ncyA9PSB0cnVlIHRoZW4gX3JlZmxvd1NpYmxpbmdzKEAsIGxheWVyTWF4WSlcbiAgICAgIGlmIEBvcHRpb25zLnJlc2l6ZVBhcmVudCA9PSB0cnVlIHRoZW4gX3Jlc2l6ZVBhcmVudChALCBAcGFyZW50T2dIZWlnaHQsIEBvcHRpb25zLnBhcmVudEJvdHRvbVBhZGRpbmcpXG5cbiNPdGhlciBpZGVhcyBcbiMgVE9ETzogSWYgdGhlIGhlaWdodCBpcyBzZXQgdGFsbGVyIHRoYW4gdGhlIG1pbmhlaWdodCBvcHRpb24sIHdoZW4geW91IHR5cGUgaXQgZ2xpdGNoZXMgdG8gdGhlIG1pbkhlaWdodCBvcHRpb24uXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQU1BQTtBRHFCQSxJQUFBOzs7O0FBQU0sT0FBTyxDQUFDO0FBR1osTUFBQTs7OztFQUFBLE1BQU0sQ0FBQyxLQUFQLEdBQWlCOztFQUNqQixNQUFNLENBQUMsS0FBUCxHQUFpQjs7RUFDakIsTUFBTSxDQUFDLElBQVAsR0FBaUI7O0VBRUosdUJBQUMsT0FBRDtBQUNYLFFBQUE7SUFEWSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7SUFDckIsSUFBQyxDQUFBLGNBQUQsR0FBa0I7SUFDbEIsSUFBb0QsK0JB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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
