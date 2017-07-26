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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aXRhY2hlbi9Eb2N1bWVudHMvU1AyMDE3L3ZpdmlkL3ZpdmlkLmZyYW1lci9tb2R1bGVzL2ZpcmViYXNlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvQ2FtZXJhTGF5ZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9BdXRvR3Jvd0lucHV0LmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsImV4cG9ydHMua2V5Ym9hcmRMYXllciA9IG5ldyBMYXllclxuXHR4OjAsIHk6U2NyZWVuLmhlaWdodCwgd2lkdGg6U2NyZWVuLndpZHRoLCBoZWlnaHQ6NDMyXG5cdGh0bWw6XCI8aW1nIHN0eWxlPSd3aWR0aDogMTAwJTsnIHNyYz0nbW9kdWxlcy9rZXlib2FyZC5wbmcnLz5cIlxuXG4jc2NyZWVuIHdpZHRoIHZzLiBzaXplIG9mIGltYWdlIHdpZHRoXG5ncm93dGhSYXRpbyA9IFNjcmVlbi53aWR0aCAvIDczMlxuaW1hZ2VIZWlnaHQgPSBncm93dGhSYXRpbyAqIDQzMlxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzID1cblx0c2hvd246IFxuXHRcdHk6IFNjcmVlbi5oZWlnaHQgLSBpbWFnZUhlaWdodFxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDE1KVwiXG5cbmNsYXNzIGV4cG9ydHMuSW5wdXQgZXh0ZW5kcyBMYXllclxuXHRAZGVmaW5lIFwic3R5bGVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC5zdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0Xy5leHRlbmQgQGlucHV0LnN0eWxlLCB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnZhbHVlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAaW5wdXQudmFsdWUgPSB2YWx1ZVxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuc2V0dXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLndpZHRoID89IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuY2xpcCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID89IDYwXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwicmdiYSgyNTUsIDYwLCA0NywgLjUpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDMwXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDMwXG5cdFx0b3B0aW9ucy5wYWRkaW5nID89IDEwXG5cdFx0b3B0aW9ucy50ZXh0ID89IFwiXCJcblx0XHRvcHRpb25zLnBsYWNlaG9sZGVyID89IFwiXCJcblx0XHRvcHRpb25zLnZpcnR1YWxLZXlib2FyZCA/PSBpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gZmFsc2UgZWxzZSB0cnVlXG5cdFx0b3B0aW9ucy50eXBlID89IFwidGV4dFwiXG5cdFx0b3B0aW9ucy5nb0J1dHRvbiA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuYXV0b0NvcnJlY3QgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvQ29tcGxldGUgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLnNwZWxsQ2hlY2sgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvZm9jdXMgPz0gZmFsc2VcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvcj9cblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdEBpbnB1dC5pZCA9IFwiaW5wdXQtI3tfLm5vdygpfVwiXG5cdFx0QGlucHV0LnN0eWxlLmNzc1RleHQgPSBcIm91dGxpbmU6IG5vbmU7IGZvbnQtc2l6ZTogI3tvcHRpb25zLmZvbnRTaXplfXB4OyBsaW5lLWhlaWdodDogI3tvcHRpb25zLmxpbmVIZWlnaHR9cHg7IHBhZGRpbmc6ICN7b3B0aW9ucy5wYWRkaW5nfXB4OyB3aWR0aDogI3tvcHRpb25zLndpZHRofXB4OyBoZWlnaHQ6ICN7b3B0aW9ucy5oZWlnaHR9cHg7IGJvcmRlcjogbm9uZTsgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFib3V0OmJsYW5rKTsgYmFja2dyb3VuZC1jb2xvcjogI3tvcHRpb25zLmJhY2tncm91bmRDb2xvcn07XCJcblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NvcnJlY3RcIiwgb3B0aW9ucy5hdXRvQ29ycmVjdFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29tcGxldGVcIiwgb3B0aW9ucy5hdXRvQ29tcGxldGVcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NhcGl0YWxpemVcIiwgb3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZVxuXHRcdGlmIG9wdGlvbnMuYXV0b2ZvY3VzID09IHRydWVcblx0XHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvZm9jdXNcIiwgdHJ1ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJzcGVsbGNoZWNrXCIsIG9wdGlvbnMuc3BlbGxDaGVja1xuXHRcdEBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImZvcm1cIlxuXG5cdFx0aWYgb3B0aW9ucy5nb0J1dHRvblxuXHRcdFx0QGZvcm0uYWN0aW9uID0gXCIjXCJcblx0XHRcdEBmb3JtLmFkZEV2ZW50TGlzdGVuZXIgXCJzdWJtaXRcIiwgKGV2ZW50KSAtPlxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRAZm9ybS5hcHBlbmRDaGlsZCBAaW5wdXRcblx0XHRAX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQGZvcm1cblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRAdXBkYXRlUGxhY2Vob2xkZXJDb2xvciBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgQHBsYWNlaG9sZGVyQ29sb3JcblxuXHRcdCNvbmx5IHNob3cgaG9ub3IgdmlydHVhbCBrZXlib2FyZCBvcHRpb24gd2hlbiBub3Qgb24gbW9iaWxlLFxuXHRcdCNvdGhlcndpc2UgaWdub3JlXG5cdFx0aWYgIVV0aWxzLmlzTW9iaWxlKCkgJiYgb3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgaXMgdHJ1ZVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYnJpbmdUb0Zyb250KClcblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlQ3ljbGUoKVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXG5cdHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3I6IChjb2xvcikgLT5cblx0XHRAcGxhY2Vob2xkZXJDb2xvciA9IGNvbG9yXG5cdFx0aWYgQHBhZ2VTdHlsZT9cblx0XHRcdGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQgQHBhZ2VTdHlsZVxuXHRcdEBwYWdlU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwic3R5bGVcIlxuXHRcdEBwYWdlU3R5bGUudHlwZSA9IFwidGV4dC9jc3NcIlxuXHRcdGNzcyA9IFwiIyN7QGlucHV0LmlkfTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BwbGFjZWhvbGRlckNvbG9yfTsgfVwiXG5cdFx0QHBhZ2VTdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSBjc3MpXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCBAcGFnZVN0eWxlXG5cblx0Zm9jdXM6ICgpIC0+XG5cdFx0QGlucHV0LmZvY3VzKClcblxuXHRvbkZvY3VzOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0Y2IuYXBwbHkoQClcblxuXHRvbkJsdXI6IChjYikgLT5cblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG4iLCJcblxuIyBEb2N1bWVudGF0aW9uIG9mIHRoaXMgTW9kdWxlOiBodHRwczovL2dpdGh1Yi5jb20vbWFyY2tyZW5uL2ZyYW1lci1GaXJlYmFzZVxuIyAtLS0tLS0gOiAtLS0tLS0tIEZpcmViYXNlIFJFU1QgQVBJOiBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9yZWZlcmVuY2UvcmVzdC9kYXRhYmFzZS9cblxuIyBGaXJlYmFzZSBSRVNUIEFQSSBDbGFzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIGV4cG9ydHMuRmlyZWJhc2UgZXh0ZW5kcyBGcmFtZXIuQmFzZUNsYXNzXG5cblxuXHRALmRlZmluZSBcInN0YXR1c1wiLFxuXHRcdGdldDogLT4gQF9zdGF0dXMgIyByZWFkT25seVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QHByb2plY3RJRCA9IEBvcHRpb25zLnByb2plY3RJRCA/PSBudWxsXG5cdFx0QHNlY3JldCAgICA9IEBvcHRpb25zLnNlY3JldCAgICA/PSBudWxsXG5cdFx0QGRlYnVnICAgICA9IEBvcHRpb25zLmRlYnVnICAgICA/PSBmYWxzZVxuXHRcdEBfc3RhdHVzICAgICAgICAgICAgICAgICAgICAgICAgPz0gXCJkaXNjb25uZWN0ZWRcIlxuXG5cdFx0QHNlY3JldEVuZFBvaW50ID0gaWYgQHNlY3JldCB0aGVuIFwiP2F1dGg9I3tAc2VjcmV0fVwiIGVsc2UgXCI/XCIgIyBob3RmaXhcblx0XHRzdXBlclxuXG5cdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogQ29ubmVjdGluZyB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyAuLi4gXFxuIFVSTDogJ2h0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbSdcIiBpZiBAZGVidWdcblx0XHRALm9uQ2hhbmdlIFwiY29ubmVjdGlvblwiXG5cblxuXHRyZXF1ZXN0ID0gKHByb2plY3QsIHNlY3JldCwgcGF0aCwgY2FsbGJhY2ssIG1ldGhvZCwgZGF0YSwgcGFyYW1ldGVycywgZGVidWcpIC0+XG5cblx0XHR1cmwgPSBcImh0dHBzOi8vI3twcm9qZWN0fS5maXJlYmFzZWlvLmNvbSN7cGF0aH0uanNvbiN7c2VjcmV0fVwiXG5cblxuXHRcdHVubGVzcyBwYXJhbWV0ZXJzIGlzIHVuZGVmaW5lZFxuXHRcdFx0aWYgcGFyYW1ldGVycy5zaGFsbG93ICAgICAgICAgICAgdGhlbiB1cmwgKz0gXCImc2hhbGxvdz10cnVlXCJcblx0XHRcdGlmIHBhcmFtZXRlcnMuZm9ybWF0IGlzIFwiZXhwb3J0XCIgdGhlbiB1cmwgKz0gXCImZm9ybWF0PWV4cG9ydFwiXG5cblx0XHRcdHN3aXRjaCBwYXJhbWV0ZXJzLnByaW50XG5cdFx0XHRcdHdoZW4gXCJwcmV0dHlcIiB0aGVuIHVybCArPSBcIiZwcmludD1wcmV0dHlcIlxuXHRcdFx0XHR3aGVuIFwic2lsZW50XCIgdGhlbiB1cmwgKz0gXCImcHJpbnQ9c2lsZW50XCJcblxuXHRcdFx0aWYgdHlwZW9mIHBhcmFtZXRlcnMuZG93bmxvYWQgaXMgXCJzdHJpbmdcIlxuXHRcdFx0XHR1cmwgKz0gXCImZG93bmxvYWQ9I3twYXJhbWV0ZXJzLmRvd25sb2FkfVwiXG5cdFx0XHRcdHdpbmRvdy5vcGVuKHVybCxcIl9zZWxmXCIpXG5cblx0XHRcdHVybCArPSBcIiZvcmRlckJ5PVwiICsgJ1wiJyArIHBhcmFtZXRlcnMub3JkZXJCeSArICdcIicgaWYgdHlwZW9mIHBhcmFtZXRlcnMub3JkZXJCeSAgICAgIGlzIFwic3RyaW5nXCJcblx0XHRcdHByaW50IHVybCArPSBcIiZsaW1pdFRvRmlyc3Q9I3twYXJhbWV0ZXJzLmxpbWl0VG9GaXJzdH1cIiAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmxpbWl0VG9GaXJzdCBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImbGltaXRUb0xhc3Q9I3twYXJhbWV0ZXJzLmxpbWl0VG9MYXN0fVwiICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5saW1pdFRvTGFzdCAgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJnN0YXJ0QXQ9I3twYXJhbWV0ZXJzLnN0YXJ0QXR9XCIgICAgICAgICAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMuc3RhcnRBdCAgICAgIGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZlbmRBdD0je3BhcmFtZXRlcnMuZW5kQXR9XCIgICAgICAgICAgICAgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmVuZEF0ICAgICAgICBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImZXF1YWxUbz0je3BhcmFtZXRlcnMuZXF1YWxUb31cIiAgICAgICAgICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5lcXVhbFRvICAgICAgaXMgXCJudW1iZXJcIlxuXG5cdFx0eGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBOZXcgJyN7bWV0aG9kfSctcmVxdWVzdCB3aXRoIGRhdGE6ICcje0pTT04uc3RyaW5naWZ5KGRhdGEpfScgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXHRcdHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ID0+XG5cblx0XHRcdHVubGVzcyBwYXJhbWV0ZXJzIGlzIHVuZGVmaW5lZFxuXHRcdFx0XHRpZiBwYXJhbWV0ZXJzLnByaW50IGlzIFwic2lsZW50XCIgb3IgdHlwZW9mIHBhcmFtZXRlcnMuZG93bmxvYWQgaXMgXCJzdHJpbmdcIiB0aGVuIHJldHVybiAjIHVnaFxuXG5cdFx0XHRzd2l0Y2ggeGh0dHAucmVhZHlTdGF0ZVxuXHRcdFx0XHR3aGVuIDAgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZXF1ZXN0IG5vdCBpbml0aWFsaXplZCBcXG4gVVJMOiAnI3t1cmx9J1wiICAgICAgIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gMSB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFNlcnZlciBjb25uZWN0aW9uIGVzdGFibGlzaGVkIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblx0XHRcdFx0d2hlbiAyIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVxdWVzdCByZWNlaXZlZCBcXG4gVVJMOiAnI3t1cmx9J1wiICAgICAgICAgICAgICBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDMgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBQcm9jZXNzaW5nIHJlcXVlc3QgXFxuIFVSTDogJyN7dXJsfSdcIiAgICAgICAgICAgIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gNFxuXHRcdFx0XHRcdGNhbGxiYWNrKEpTT04ucGFyc2UoeGh0dHAucmVzcG9uc2VUZXh0KSkgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVxdWVzdCBmaW5pc2hlZCwgcmVzcG9uc2U6ICcje0pTT04ucGFyc2UoeGh0dHAucmVzcG9uc2VUZXh0KX0nIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblxuXHRcdFx0aWYgeGh0dHAuc3RhdHVzIGlzIFwiNDA0XCJcblx0XHRcdFx0Y29uc29sZS53YXJuIFwiRmlyZWJhc2U6IEludmFsaWQgcmVxdWVzdCwgcGFnZSBub3QgZm91bmQgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXG5cblx0XHR4aHR0cC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKVxuXHRcdHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXG5cdFx0eGh0dHAuc2VuZChkYXRhID0gXCIje0pTT04uc3RyaW5naWZ5KGRhdGEpfVwiKVxuXG5cblxuXHQjIEF2YWlsYWJsZSBtZXRob2RzXG5cblx0Z2V0OiAgICAocGF0aCwgY2FsbGJhY2ssICAgICAgIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldEVuZFBvaW50LCBwYXRoLCBjYWxsYmFjaywgXCJHRVRcIiwgICAgbnVsbCwgcGFyYW1ldGVycywgQGRlYnVnKVxuXHRwdXQ6ICAgIChwYXRoLCBkYXRhLCBjYWxsYmFjaywgcGFyYW1ldGVycykgLT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIlBVVFwiLCAgICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHBvc3Q6ICAgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiUE9TVFwiLCAgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cGF0Y2g6ICAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldEVuZFBvaW50LCBwYXRoLCBjYWxsYmFjaywgXCJQQVRDSFwiLCAgZGF0YSwgcGFyYW1ldGVycywgQGRlYnVnKVxuXHRkZWxldGU6IChwYXRoLCBjYWxsYmFjaywgICAgICAgcGFyYW1ldGVycykgLT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIkRFTEVURVwiLCBudWxsLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cblxuXG5cdG9uQ2hhbmdlOiAocGF0aCwgY2FsbGJhY2spIC0+XG5cblxuXHRcdGlmIHBhdGggaXMgXCJjb25uZWN0aW9uXCJcblxuXHRcdFx0dXJsID0gXCJodHRwczovLyN7QHByb2plY3RJRH0uZmlyZWJhc2Vpby5jb20vLmpzb24je0BzZWNyZXRFbmRQb2ludH1cIlxuXHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwib3BlblwiLCA9PlxuXHRcdFx0XHRpZiBjdXJyZW50U3RhdHVzIGlzIFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdFx0XHRALl9zdGF0dXMgPSBcImNvbm5lY3RlZFwiXG5cdFx0XHRcdFx0Y2FsbGJhY2soXCJjb25uZWN0ZWRcIikgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogQ29ubmVjdGlvbiB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyBlc3RhYmxpc2hlZFwiIGlmIEBkZWJ1Z1xuXHRcdFx0XHRjdXJyZW50U3RhdHVzID0gXCJjb25uZWN0ZWRcIlxuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcImVycm9yXCIsID0+XG5cdFx0XHRcdGlmIGN1cnJlbnRTdGF0dXMgaXMgXCJjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdEAuX3N0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdFx0XHRjYWxsYmFjayhcImRpc2Nvbm5lY3RlZFwiKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0XHRjb25zb2xlLndhcm4gXCJGaXJlYmFzZTogQ29ubmVjdGlvbiB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyBjbG9zZWRcIiBpZiBAZGVidWdcblx0XHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblxuXG5cdFx0ZWxzZVxuXG5cdFx0XHR1cmwgPSBcImh0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbSN7cGF0aH0uanNvbiN7QHNlY3JldEVuZFBvaW50fVwiXG5cdFx0XHRzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UodXJsKVxuXHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogTGlzdGVuaW5nIHRvIGNoYW5nZXMgbWFkZSB0byAnI3twYXRofScgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBAZGVidWdcblxuXHRcdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJwdXRcIiwgKGV2KSA9PlxuXHRcdFx0XHRjYWxsYmFjayhKU09OLnBhcnNlKGV2LmRhdGEpLmRhdGEsIFwicHV0XCIsIEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aCwgXy50YWlsKEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aC5zcGxpdChcIi9cIiksMSkpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZWNlaXZlZCBjaGFuZ2VzIG1hZGUgdG8gJyN7cGF0aH0nIHZpYSAnUFVUJzogI3tKU09OLnBhcnNlKGV2LmRhdGEpLmRhdGF9IFxcbiBVUkw6ICcje3VybH0nXCIgaWYgQGRlYnVnXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwicGF0Y2hcIiwgKGV2KSA9PlxuXHRcdFx0XHRjYWxsYmFjayhKU09OLnBhcnNlKGV2LmRhdGEpLmRhdGEsIFwicGF0Y2hcIiwgSlNPTi5wYXJzZShldi5kYXRhKS5wYXRoLCBfLnRhaWwoSlNPTi5wYXJzZShldi5kYXRhKS5wYXRoLnNwbGl0KFwiL1wiKSwxKSkgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlY2VpdmVkIGNoYW5nZXMgbWFkZSB0byAnI3twYXRofScgdmlhICdQQVRDSCc6ICN7SlNPTi5wYXJzZShldi5kYXRhKS5kYXRhfSBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIEBkZWJ1Z1xuIiwiY2xhc3MgQ2FtZXJhTGF5ZXIgZXh0ZW5kcyBWaWRlb0xheWVyXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIGN1c3RvbVByb3BzID1cbiAgICAgIGZhY2luZzogdHJ1ZVxuICAgICAgZmxpcHBlZDogdHJ1ZVxuICAgICAgYXV0b0ZsaXA6IHRydWVcbiAgICAgIHJlc29sdXRpb246IHRydWVcbiAgICAgIGZpdDogdHJ1ZVxuXG4gICAgYmFzZU9wdGlvbnMgPSBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLmZpbHRlciAoa2V5KSAtPiAhY3VzdG9tUHJvcHNba2V5XVxuICAgICAgLnJlZHVjZSAoY2xvbmUsIGtleSkgLT5cbiAgICAgICAgY2xvbmVba2V5XSA9IG9wdGlvbnNba2V5XVxuICAgICAgICBjbG9uZVxuICAgICAgLCB7fVxuXG4gICAgc3VwZXIoYmFzZU9wdGlvbnMpXG5cbiAgICBAX2ZhY2luZyA9IG9wdGlvbnMuZmFjaW5nID8gJ2JhY2snXG4gICAgQF9mbGlwcGVkID0gb3B0aW9ucy5mbGlwcGVkID8gZmFsc2VcbiAgICBAX2F1dG9GbGlwID0gb3B0aW9ucy5hdXRvRmxpcCA/IHRydWVcbiAgICBAX3Jlc29sdXRpb24gPSBvcHRpb25zLnJlc29sdXRpb24gPyA0ODBcblxuICAgIEBfc3RhcnRlZCA9IGZhbHNlXG4gICAgQF9kZXZpY2UgPSBudWxsXG4gICAgQF9tYXRjaGVkRmFjaW5nID0gJ3Vua25vd24nXG4gICAgQF9zdHJlYW0gPSBudWxsXG4gICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gbnVsbFxuICAgIEBfcmVjb3JkaW5nID0gbnVsbFxuXG4gICAgQGJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCdcbiAgICBAY2xpcCA9IHRydWVcblxuICAgIEBwbGF5ZXIuc3JjID0gJydcbiAgICBAcGxheWVyLmF1dG9wbGF5ID0gdHJ1ZVxuICAgIEBwbGF5ZXIubXV0ZWQgPSB0cnVlXG4gICAgQHBsYXllci5zdHlsZS5vYmplY3RGaXQgPSBvcHRpb25zLmZpdCA/ICdjb3ZlcidcblxuICBAZGVmaW5lICdmYWNpbmcnLFxuICAgIGdldDogLT4gQF9mYWNpbmdcbiAgICBzZXQ6IChmYWNpbmcpIC0+XG4gICAgICBAX2ZhY2luZyA9IGlmIGZhY2luZyA9PSAnZnJvbnQnIHRoZW4gZmFjaW5nIGVsc2UgJ2JhY2snXG4gICAgICBAX3NldFJlc3RhcnQoKVxuXG4gIEBkZWZpbmUgJ2ZsaXBwZWQnLFxuICAgIGdldDogLT4gQF9mbGlwcGVkXG4gICAgc2V0OiAoZmxpcHBlZCkgLT5cbiAgICAgIEBfZmxpcHBlZCA9IGZsaXBwZWRcbiAgICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgQGRlZmluZSAnYXV0b0ZsaXAnLFxuICAgIGdldDogLT4gQF9hdXRvRmxpcFxuICAgIHNldDogKGF1dG9GbGlwKSAtPlxuICAgICAgQF9hdXRvRmxpcCA9IGF1dG9GbGlwXG4gICAgICBAX3NldFJlc3RhcnQoKVxuXG4gIEBkZWZpbmUgJ3Jlc29sdXRpb24nLFxuICAgIGdldDogLT4gQF9yZXNvbHV0aW9uXG4gICAgc2V0OiAocmVzb2x1dGlvbikgLT5cbiAgICAgIEBfcmVzb2x1dGlvbiA9IHJlc29sdXRpb25cbiAgICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgQGRlZmluZSAnZml0JyxcbiAgICBnZXQ6IC0+IEBwbGF5ZXIuc3R5bGUub2JqZWN0Rml0XG4gICAgc2V0OiAoZml0KSAtPiBAcGxheWVyLnN0eWxlLm9iamVjdEZpdCA9IGZpdFxuXG4gIEBkZWZpbmUgJ2lzUmVjb3JkaW5nJyxcbiAgICBnZXQ6IC0+IEBfcmVjb3JkaW5nPy5yZWNvcmRlci5zdGF0ZSA9PSAncmVjb3JkaW5nJ1xuXG4gIHRvZ2dsZUZhY2luZzogLT5cbiAgICBAX2ZhY2luZyA9IGlmIEBfZmFjaW5nID09ICdmcm9udCcgdGhlbiAnYmFjaycgZWxzZSAnZnJvbnQnXG4gICAgQF9zZXRSZXN0YXJ0KClcblxuICBjYXB0dXJlOiAod2lkdGggPSBAd2lkdGgsIGhlaWdodCA9IEBoZWlnaHQsIHJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8pIC0+XG4gICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICAgIGNhbnZhcy53aWR0aCA9IHJhdGlvICogd2lkdGhcbiAgICBjYW52YXMuaGVpZ2h0ID0gcmF0aW8gKiBoZWlnaHRcblxuICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgQGRyYXcoY29udGV4dClcblxuICAgIHVybCA9IGNhbnZhcy50b0RhdGFVUkwoKVxuICAgIEBlbWl0KCdjYXB0dXJlJywgdXJsKVxuXG4gICAgdXJsXG5cbiAgZHJhdzogKGNvbnRleHQpIC0+XG4gICAgcmV0dXJuIHVubGVzcyBjb250ZXh0XG5cbiAgICBjb3ZlciA9IChzcmNXLCBzcmNILCBkc3RXLCBkc3RIKSAtPlxuICAgICAgc2NhbGVYID0gZHN0VyAvIHNyY1dcbiAgICAgIHNjYWxlWSA9IGRzdEggLyBzcmNIXG4gICAgICBzY2FsZSA9IGlmIHNjYWxlWCA+IHNjYWxlWSB0aGVuIHNjYWxlWCBlbHNlIHNjYWxlWVxuICAgICAgd2lkdGg6IHNyY1cgKiBzY2FsZSwgaGVpZ2h0OiBzcmNIICogc2NhbGVcblxuICAgIHt2aWRlb1dpZHRoLCB2aWRlb0hlaWdodH0gPSBAcGxheWVyXG5cbiAgICBjbGlwQm94ID0gd2lkdGg6IGNvbnRleHQuY2FudmFzLndpZHRoLCBoZWlnaHQ6IGNvbnRleHQuY2FudmFzLmhlaWdodFxuICAgIGxheWVyQm94ID0gY292ZXIoQHdpZHRoLCBAaGVpZ2h0LCBjbGlwQm94LndpZHRoLCBjbGlwQm94LmhlaWdodClcbiAgICB2aWRlb0JveCA9IGNvdmVyKHZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0LCBsYXllckJveC53aWR0aCwgbGF5ZXJCb3guaGVpZ2h0KVxuXG4gICAgeCA9IChjbGlwQm94LndpZHRoIC0gdmlkZW9Cb3gud2lkdGgpIC8gMlxuICAgIHkgPSAoY2xpcEJveC5oZWlnaHQgLSB2aWRlb0JveC5oZWlnaHQpIC8gMlxuXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoQHBsYXllciwgeCwgeSwgdmlkZW9Cb3gud2lkdGgsIHZpZGVvQm94LmhlaWdodClcblxuICBzdGFydDogLT5cbiAgICBAX2VudW1lcmF0ZURldmljZXMoKVxuICAgIC50aGVuIChkZXZpY2VzKSA9PlxuICAgICAgZGV2aWNlcyA9IGRldmljZXMuZmlsdGVyIChkZXZpY2UpIC0+IGRldmljZS5raW5kID09ICd2aWRlb2lucHV0J1xuXG4gICAgICBmb3IgZGV2aWNlIGluIGRldmljZXNcbiAgICAgICAgaWYgZGV2aWNlLmxhYmVsLmluZGV4T2YoQF9mYWNpbmcpICE9IC0xXG4gICAgICAgICAgQF9tYXRjaGVkRmFjaW5nID0gQF9mYWNpbmdcbiAgICAgICAgICByZXR1cm4gZGV2aWNlXG5cbiAgICAgIEBfbWF0Y2hlZEZhY2luZyA9ICd1bmtub3duJ1xuXG4gICAgICBpZiBkZXZpY2VzLmxlbmd0aCA+IDAgdGhlbiBkZXZpY2VzWzBdIGVsc2UgUHJvbWlzZS5yZWplY3QoKVxuXG4gICAgLnRoZW4gKGRldmljZSkgPT5cbiAgICAgIHJldHVybiBpZiAhZGV2aWNlIHx8IGRldmljZS5kZXZpY2VJZCA9PSBAX2RldmljZT8uZGV2aWNlSWRcblxuICAgICAgQHN0b3AoKVxuICAgICAgQF9kZXZpY2UgPSBkZXZpY2VcblxuICAgICAgY29uc3RyYWludHMgPVxuICAgICAgICB2aWRlbzpcbiAgICAgICAgICBtYW5kYXRvcnk6IHttaW5XaWR0aDogQF9yZXNvbHV0aW9uLCBtaW5IZWlnaHQ6IEBfcmVzb2x1dGlvbn1cbiAgICAgICAgICBvcHRpb25hbDogW3tzb3VyY2VJZDogQF9kZXZpY2UuZGV2aWNlSWR9XVxuICAgICAgICBhdWRpbzpcbiAgICAgICAgICB0cnVlXG5cbiAgICAgIEBfZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxuXG4gICAgLnRoZW4gKHN0cmVhbSkgPT5cbiAgICAgIEBwbGF5ZXIuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pXG4gICAgICBAX3N0YXJ0ZWQgPSB0cnVlXG4gICAgICBAX3N0cmVhbSA9IHN0cmVhbVxuICAgICAgQF9mbGlwKClcblxuICAgIC5jYXRjaCAoZXJyb3IpIC0+XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuXG4gIHN0b3A6IC0+XG4gICAgQF9zdGFydGVkID0gZmFsc2VcblxuICAgIEBwbGF5ZXIucGF1c2UoKVxuICAgIEBwbGF5ZXIuc3JjID0gJydcblxuICAgIEBfc3RyZWFtPy5nZXRUcmFja3MoKS5mb3JFYWNoICh0cmFjaykgLT4gdHJhY2suc3RvcCgpXG4gICAgQF9zdHJlYW0gPSBudWxsXG4gICAgQF9kZXZpY2UgPSBudWxsXG5cbiAgICBpZiBAX3NjaGVkdWxlZFJlc3RhcnRcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKEBfc2NoZWR1bGVkUmVzdGFydClcbiAgICAgIEBfc2NoZWR1bGVkUmVzdGFydCA9IG51bGxcblxuICBzdGFydFJlY29yZGluZzogLT5cbiAgICBpZiBAX3JlY29yZGluZ1xuICAgICAgQF9yZWNvcmRpbmcucmVjb3JkZXIuc3RvcCgpXG4gICAgICBAX3JlY29yZGluZyA9IG51bGxcblxuICAgIGNodW5rcyA9IFtdXG5cbiAgICByZWNvcmRlciA9IG5ldyBNZWRpYVJlY29yZGVyKEBfc3RyZWFtLCB7bWltZVR5cGU6ICd2aWRlby93ZWJtJ30pXG4gICAgcmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lciAnc3RhcnQnLCAoZXZlbnQpID0+IEBlbWl0KCdzdGFydHJlY29yZGluZycpXG4gICAgcmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lciAnZGF0YWF2YWlsYWJsZScsIChldmVudCkgLT4gY2h1bmtzLnB1c2goZXZlbnQuZGF0YSlcbiAgICByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyICdzdG9wJywgKGV2ZW50KSA9PlxuICAgICAgYmxvYiA9IG5ldyBCbG9iKGNodW5rcylcbiAgICAgIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgICBAZW1pdCgnc3RvcHJlY29yZGluZycpXG4gICAgICBAZW1pdCgncmVjb3JkJywgdXJsKVxuXG4gICAgcmVjb3JkZXIuc3RhcnQoKVxuXG4gICAgQF9yZWNvcmRpbmcgPSB7cmVjb3JkZXIsIGNodW5rc31cblxuICBzdG9wUmVjb3JkaW5nOiAtPlxuICAgIHJldHVybiBpZiAhQF9yZWNvcmRpbmdcbiAgICBAX3JlY29yZGluZy5yZWNvcmRlci5zdG9wKClcbiAgICBAX3JlY29yZGluZyA9IG51bGxcblxuICBvbkNhcHR1cmU6IChjYWxsYmFjaykgLT4gQG9uKCdjYXB0dXJlJywgY2FsbGJhY2spXG4gIG9uU3RhcnRSZWNvcmRpbmc6IChjYWxsYmFjaykgLT4gQG9uKCdzdGFydHJlY29yZGluZycsIGNhbGxiYWNrKVxuICBvblN0b3BSZWNvcmRpbmc6IChjYWxsYmFjaykgLT4gQG9uKCdzdG9wcmVjb3JkaW5nJywgY2FsbGJhY2spXG4gIG9uUmVjb3JkOiAoY2FsbGJhY2spIC0+IEBvbigncmVjb3JkJywgY2FsbGJhY2spXG5cbiAgX3NldFJlc3RhcnQ6IC0+XG4gICAgcmV0dXJuIGlmICFAX3N0YXJ0ZWQgfHwgQF9zY2hlZHVsZWRSZXN0YXJ0XG5cbiAgICBAX3NjaGVkdWxlZFJlc3RhcnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT5cbiAgICAgIEBfc2NoZWR1bGVkUmVzdGFydCA9IG51bGxcbiAgICAgIEBzdGFydCgpXG5cbiAgX2ZsaXA6IC0+XG4gICAgQF9mbGlwcGVkID0gQF9tYXRjaGVkRmFjaW5nID09ICdmcm9udCcgaWYgQF9hdXRvRmxpcFxuICAgIHggPSBpZiBAX2ZsaXBwZWQgdGhlbiAtMSBlbHNlIDFcbiAgICBAcGxheWVyLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGUoI3t4fSwgMSlcIlxuXG4gIF9lbnVtZXJhdGVEZXZpY2VzOiAtPlxuICAgIHRyeVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICBjYXRjaFxuICAgICAgUHJvbWlzZS5yZWplY3QoKVxuXG4gIF9nZXRVc2VyTWVkaWE6IChjb25zdHJhaW50cykgLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgdHJ5XG4gICAgICAgIGd1bSA9IG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYVxuICAgICAgICBndW0uY2FsbChuYXZpZ2F0b3IsIGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpXG4gICAgICBjYXRjaFxuICAgICAgICByZWplY3QoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbWVyYUxheWVyIGlmIG1vZHVsZT9cbkZyYW1lci5DYW1lcmFMYXllciA9IENhbWVyYUxheWVyXG4iLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQXV0b0dyb3cgVGV4dGFyZWFcbiMgQnkgQmxhaW5lIEJpbGxpbmdzbGV5IE1heSAyOSwgMjAxNlxuI1xuIyBGcmFua2Vuc3RlaW5lZCBoZWF2aWx5IGZyb20gSm9yZGFuIERvYnNvbidzIElucHV0RmllbGQgc3R1ZmYgXG4jIGFuZCB0aGUgalF1ZXJ5IEF1dG9ncm93IHBsdWdpbi5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4jIEFmdGVyIGFkZGluZyB0aGUgbW9kdWxlLCBhZGQgdGhpcyB0byB5b3VyIEZyYW1lciBwcm90b3R5cGU6XG4jIHtBdXRvR3Jvd0lucHV0fSA9IHJlcXVpcmUgXCJBdXRvR3Jvd0lucHV0XCJcblxuIyBUaGVuIHlvdSBjYW4gd3JpdGUgY29vbCBzdHVmZiBsaWtlOlxuIyB0ZXh0ID0gbmV3IEF1dG9Hcm93SW5wdXRcbiMgICByZWZsb3dTaWJsaW5nczogdHJ1ZSBvciBmYWxzZSwgd2lsbCBtb3ZlIHN0dWZmIHVuZGVyIGl0IGFzIGl0IGNoYW5nZXMgaGVpZ2h0LlxuIyAgIHJlc2l6ZVBhcmVudDogdHJ1ZSBvciBmYWxzZSwgd2lsbCByZXNpemUgdGhlIHBhcmVudCBpZiB0aGluZ3MgZ2V0IHRvbyBsb25nLlxuIyAgIHBhZGRpbmc6IGV4OiBcIjE2cHggMTZweCAzNnB4IDE2cHhcIiAtIGp1c3QgYSBDU1MgZGVjbGFyYXRpb24gZm9yIGFueSBwYWRkaW5nIHlvdSdkIGxpa2UuXG4jICAgcGxhY2VIb2xkZXI6IGV4OiBcIlR5cGUgeW91ciBjb21tZW50c1wiIC0gd2hhdGV2ZXIgeW91IHdhbnQgdGhlIHBsYWNlaG9sZGVyIHRleHQgdG8gYmUuXG4jICAgdmFsdWU6IGV4OiBcIlNpbHQgaXMuLi5cIiAtIHN0YXJ0ZXIgdmFsdWUgaWYgeW91IHdhbnQgdGV4dCBhbHJlYWR5IGluIHRoZXJlLlxuXG5cblxuY2xhc3MgZXhwb3J0cy5BdXRvR3Jvd0lucHV0IGV4dGVuZHMgTGF5ZXJcblxuICAjIEV2ZW50c1xuICBFdmVudHMuSW5wdXQgICA9IFwiQXV0b0dyb3dJbnB1dC5PbklucHV0XCJcbiAgRXZlbnRzLkZvY3VzICAgPSBcIkF1dG9Hcm93SW5wdXQuT25Gb2N1c1wiXG4gIEV2ZW50cy5CbHVyICAgID0gXCJBdXRvR3Jvd0lucHV0Lk9uQmx1clwiXG4gIFxuICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuICAgIEBwYXJlbnRPZ0hlaWdodCA9IG51bGxcbiAgICBAb3B0aW9ucy5saW5lSGVpZ2h0ID0gXCIje0BvcHRpb25zLmxpbmVIZWlnaHR9cHhcIiBpZiBAb3B0aW9ucy5saW5lSGVpZ2h0P1xuXG4gICAgIyBGcmFtZXIgTGF5ZXIgUHJvcHNcbiAgICBAb3B0aW9ucy5saW5lSGVpZ2h0ICAgICAgID89IFwiNDhweFwiXG4gICAgQG9wdGlvbnMubmFtZSAgICAgICAgICAgICA/PSBcIkF1dG9Hcm93SW5wdXRcIlxuICAgIEBvcHRpb25zLmNvbG9yICAgICAgICAgICAgPz0gXCIjMjEyMTIxXCJcbiAgICBAb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgID89IFwid2hpdGVcIlxuICAgIEBvcHRpb25zLmhlaWdodCAgICAgICAgICAgPz0gMjAwXG4gICAgQG9wdGlvbnMuYm9yZGVyUmFkaXVzICAgICA/PSAwXG4gICAgQG9wdGlvbnMud2lkdGggICAgICAgICAgICA/PSA0MDBcblxuICAgICMgQ3VzdG9tIExheWVyIFByb3BzICAgIFxuICAgIEBvcHRpb25zLmZvbnRTaXplICAgICAgICAgICAgID89IDMyXG4gICAgQG9wdGlvbnMuZm9udFdlaWdodCAgICAgICAgICAgPz0gMzAwXG4gICAgQG9wdGlvbnMucGFkZGluZyAgICAgICAgICAgICAgPz0gXCIwXCJcbiAgICBAb3B0aW9ucy5mb250RmFtaWx5ICAgICAgICAgICA/PSBcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSBOZXVlXCJcbiAgICBAb3B0aW9ucy5taW5IZWlnaHQgICAgICAgICAgICA/PSBALm9wdGlvbnMuaGVpZ2h0XG4gICAgQG9wdGlvbnMucGxhY2VIb2xkZXIgICAgICAgICAgPz0gXCJUeXBlIHNvbWV0aGluZ1wiXG4gICAgQG9wdGlvbnMucmVzaXplUGFyZW50ICAgICAgICAgPz0gZmFsc2VcbiAgICBAb3B0aW9ucy5wYXJlbnRCb3R0b21QYWRkaW5nICA/PSAwXG4gICAgQG9wdGlvbnMucmVmbG93U2libGluZ3MgICAgICAgPz0gZmFsc2VcblxuICAgIHN1cGVyIEBvcHRpb25zXG4gICAgaWYgQG9wdGlvbnMucmVzaXplUGFyZW50ID09IHRydWUgdGhlbiBAcGFyZW50T2dIZWlnaHQgPSBAb3B0aW9ucy5wYXJlbnQuaGVpZ2h0XG4gICAgXG4gICAgI0NyZWF0ZSB0aGUgdGV4dGFyZWFcbiAgICBAdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwidGV4dGFyZWFcIlxuICAgIFxuICAgICMgR2l2ZSBpdCB0aGUgY29udGVudCBpZiBzb21lIGlzIGRlZmluZWRcbiAgICBAdGV4dGFyZWEudmFsdWUgPSBAb3B0aW9ucy52YWx1ZSBpZiBAb3B0aW9ucy52YWx1ZT9cbiAgICBAdGV4dGFyZWEucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlciBpZiBAb3B0aW9ucy5wbGFjZUhvbGRlcj9cbiAgICBcbiAgICAjIEFkZCBpdCB0byB0aGUgRnJhbWVyIExheWVyXG4gICAgQF9lbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0YXJlYVxuXG4gICAgI0RlZmluZSBzdHlsZXMgZm9yIHRoZSB0ZXh0YXJlYVxuICAgIEBfdGV4dEFyZWFTdHlsZSA9XG4gICAgICBmb250OiBcIiN7QG9wdGlvbnMuZm9udFdlaWdodH0gI3tAb3B0aW9ucy5mb250U2l6ZX1weC8je0BvcHRpb25zLmxpbmVIZWlnaHR9ICN7QG9wdGlvbnMuZm9udEZhbWlseX1cIlxuICAgICAgb3V0bGluZTogXCJub25lXCJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgICB3aWR0aDogIFwiMTAwJVwiXG4gICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIlxuICAgICAgcmVzaXplOiBcIm5vbmVcIlxuICAgICAgcGFkZGluZyA6IEBvcHRpb25zLnBhZGRpbmdcbiAgICAgIG1hcmdpbjogXCIwXCJcbiAgICAgIFwiLXdlYmtpdC1hcHBlYXJhbmNlXCI6IFwibm9uZVwiXG4gICAgICBcImJveC1zaXppbmdcIiA6IFwiYm9yZGVyLWJveFwiXG5cbiAgICAjIEFkZCB0aG9zZSBzdHlsZXMgdG8gdGhlIHRleHRhcmVhXG4gICAgQHRleHRhcmVhLnN0eWxlW2tleV0gID0gdmFsIGZvciBrZXksIHZhbCBvZiBAX3RleHRBcmVhU3R5bGVcbiAgICBAdGV4dGFyZWEuc3R5bGUuY29sb3IgPSBAb3B0aW9ucy5jb2xvciBpZiBAb3B0aW9ucy5jb2xvcj9cblxuICAgICNVcGRhdGUgdGhlIGhlaWdodCB3aGVuZXZlciBhbnl0aGluZyBjaGFuZ2VzLlxuICAgIEB0ZXh0YXJlYS5vbmtleWRvd24gPSA9PiBAX3VwZGF0ZSgpXG4gICAgQHRleHRhcmVhLm9ua2V5dXAgPSA9PiBAX3VwZGF0ZSgpXG4gICAgQHRleHRhcmVhLmNoYW5nZSA9ID0+IEBfdXBkYXRlKClcbiAgICBAdGV4dGFyZWEub25mb2N1cyA9ID0+XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcbiAgICAgIEBlbWl0KEV2ZW50cy5Gb2N1cywgQHRleHRhcmVhLnZhbHVlLCBAKVxuXG4gICAgQHRleHRhcmVhLm9uYmx1ciAgPSA9PlxuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwXG4gICAgICB1bmxlc3MgQHRleHRhcmVhLnBsYWNlaG9sZGVyIGlzIEBvcHRpb25zLnBsYWNlSG9sZGVyIG9yICFAb3B0aW9ucy5wbGFjZUhvbGRlcj9cbiAgICAgICAgQHRleHRhcmVhLnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXJcbiAgICAgIEBlbWl0KEV2ZW50cy5CbHVyLCBAdGV4dGFyZWEudmFsdWUsIEApXG5cbiAgICBAdGV4dGFyZWEub25pbnB1dCA9ID0+XG4gICAgICBAaXNFbXB0eSA9ICEoIEB0ZXh0YXJlYS52YWx1ZT8ubGVuZ3RoID4gMClcbiAgICAgIEBlbWl0KEV2ZW50cy5JbnB1dCwgQHRleHRhcmVhLnZhbHVlLCBAKVxuICAgIFxuICBfcmVzaXplUGFyZW50ID0gKGxheWVyLCBwYXJlbnRNaW5IZWlnaHQsIGJvdHRvbVBhZGRpbmcpIC0+XG4gICAgIyBWYXJpYWJsZSBmb3IgcGFyZW50XG4gICAgbGF5ZXJQYXJlbnQgPSBsYXllci5wYXJlbnRcbiAgICBcbiAgICAjIEFycmF5IHRvIHN0b3JlIGFsbCBjaGlsZHJlbidzIG1heFlzXG4gICAgYWxsQ2hpbGRyZW5NYXhZcyA9IFtdXG4gICAgXG4gICAgIyBQdXNoIGVhY2ggbWF4WSB0byBhbiBhcnJheVxuICAgIGZvciBtYXggaW4gbGF5ZXJQYXJlbnQuY2hpbGRyZW5cbiAgICAgIGFsbENoaWxkcmVuTWF4WXMucHVzaChtYXgubWF4WSlcbiAgICAgIFxuICAgICMgRmluZCB0aGUgYm90dG9tLW1vc3QgbWF4WSB2YWx1ZVxuICAgIHRhbGxlc3RDaGlsZE1heFkgPSBNYXRoLm1heC5hcHBseShudWxsLCBhbGxDaGlsZHJlbk1heFlzKVxuICAgIFxuICAgICMgU3RvcmUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGF0IGFuZCB0aGUgcGFyZW50IGxheWVyXG4gICAgbGF5ZXJQYXJlbnQuaGVpZ2h0ID0gTWF0aC5tYXgodGFsbGVzdENoaWxkTWF4WSArIGJvdHRvbVBhZGRpbmcsIHBhcmVudE1pbkhlaWdodClcbiAgICBcbiAgICAjIFRPRE8gLSBNYWludGFpbiB0aGUgYm90dG9tIHBhZGRpbmcgb2YgdGhlIHBhcmVudC5cbiAgICBcbiAgIyBSZWZsb3cgYWxsIHRoZSBzaWJsaW5ncyB1bmRlciB0aGUgdGV4dCBsYXllclxuICBfcmVmbG93U2libGluZ3MgPSAobGF5ZXIsIGxheWVyTWF4WSkgLT5cbiAgICBsYXllckxpc3QgPSBsYXllci5wYXJlbnQuY2hpbGRyZW5cbiAgICBmb3IgYSBpbiBbbGF5ZXJMaXN0LmluZGV4T2YobGF5ZXIpKzEuLi5sYXllckxpc3QubGVuZ3RoXVxuICAgICAgeURpZmYgPSBsYXllckxpc3RbYV0ueSAtIGxheWVyTWF4WVxuICAgICAgbGF5ZXJMaXN0W2FdLnkgPSBsYXllci5tYXhZICsgeURpZmZcbiAgICAjIFRPRE8gLSByZWRvIHRoaXMgd2l0aG91dCB0aGUgYXNzdW1wdGlvbiB0aGF0IGFsbCBzaWJsaW5ncyBhZnRlciB0aGUgbGF5ZXIgYXJlIGJlbG93IGl0LlxuICAgICAgXG4gICMgVXBkYXRlIGhlaWdodCBmdW5jdGlvblxuICBfdXBkYXRlOiA9PlxuICAgIHNldFRpbWVvdXQgPT5cbiAgICAgIGxheWVyTWF4WSA9IEAubWF4WVxuICAgICAgIyBBZGQgYmFjayBhbnkgbGluZSBicmVha3MgdGhhdCB0aGUgdmFsdWUgbWV0aG9kIGdldHMgcmlkZSBvZlxuICAgICAgX3RydWVWYWx1ZSA9IEB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvXFxuL2csIFwiPGJyLz4mbmJzcDtcIik7XG4gICAgICBcbiAgICAgICMgSWYgaXQncyBlbXB0eSwgbWFrZSBzdXJlIHRoZXJlJ3MgYSBsZXR0ZXIgaW4gdGhlcmUgdG8gY2FsY3VsYXRlICpzb21ldGhpbmcqXG4gICAgICBpZiBfdHJ1ZVZhbHVlLnRyaW0oKSA9PSBcIlwiIHRoZW4gX3RydWVWYWx1ZSA9IFwiYVwiXG4gICAgICBcbiAgICAgICMgQ2FsY3VsYXRlIHRoZSBoZWlnaHQhISFcbiAgICAgIGNhbGNIZWlnaHQgPSBVdGlscy5yb3VuZChVdGlscy50ZXh0U2l6ZShfdHJ1ZVZhbHVlLCBAX3RleHRBcmVhU3R5bGUsIHt3aWR0aDogQC53aWR0aH0pLmhlaWdodCwgMClcbiAgICAgIFxuICAgICAgIyBTZXQgdGhlIGhlaWdodCB0byBlaXRoZXIgdGhlIGNhbGN1bGF0ZWQgaGVpZ2h0LCBvciB0aGUgbWluSGVpZ2h0LCB3aGljaGV2ZXIgaXMgZ3JlYXRlci5cbiAgICAgIEAuaGVpZ2h0ID0gTWF0aC5tYXgoY2FsY0hlaWdodCwgQG9wdGlvbnMubWluSGVpZ2h0KVxuICAgICAgaWYgQG9wdGlvbnMucmVmbG93U2libGluZ3MgPT0gdHJ1ZSB0aGVuIF9yZWZsb3dTaWJsaW5ncyhALCBsYXllck1heFkpXG4gICAgICBpZiBAb3B0aW9ucy5yZXNpemVQYXJlbnQgPT0gdHJ1ZSB0aGVuIF9yZXNpemVQYXJlbnQoQCwgQHBhcmVudE9nSGVpZ2h0LCBAb3B0aW9ucy5wYXJlbnRCb3R0b21QYWRkaW5nKVxuXG4jT3RoZXIgaWRlYXMgXG4jIFRPRE86IElmIHRoZSBoZWlnaHQgaXMgc2V0IHRhbGxlciB0aGFuIHRoZSBtaW5oZWlnaHQgb3B0aW9uLCB3aGVuIHlvdSB0eXBlIGl0IGdsaXRjaGVzIHRvIHRoZSBtaW5IZWlnaHQgb3B0aW9uLlxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFLQUE7QURxQkEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQztBQUdaLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsS0FBUCxHQUFpQjs7RUFDakIsTUFBTSxDQUFDLEtBQVAsR0FBaUI7O0VBQ2pCLE1BQU0sQ0FBQyxJQUFQLEdBQWlCOztFQUVKLHVCQUFDLE9BQUQ7QUFDWCxRQUFBO0lBRFksSUFBQyxDQUFBLDRCQUFELFVBQVM7O0lBQ3JCLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQW9ELCtCQUFwRDtNQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUF5QixJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVYsR0FBcUIsS0FBN0M7OztVQUdRLENBQUMsYUFBb0I7OztXQUNyQixDQUFDLE9BQW9COzs7V0FDckIsQ0FBQyxRQUFvQjs7O1dBQ3JCLENBQUMsa0JBQW9COzs7V0FDckIsQ0FBQyxTQUFvQjs7O1dBQ3JCLENBQUMsZUFBb0I7OztXQUNyQixDQUFDLFFBQW9COzs7V0FHckIsQ0FBQyxXQUF3Qjs7O1dBQ3pCLENBQUMsYUFBd0I7OztXQUN6QixDQUFDLFVBQXdCOzs7WUFDekIsQ0FBQyxhQUF3Qjs7O1lBQ3pCLENBQUMsWUFBd0IsSUFBQyxDQUFDLE9BQU8sQ0FBQzs7O1lBQ25DLENBQUMsY0FBd0I7OztZQUN6QixDQUFDLGVBQXdCOzs7WUFDekIsQ0FBQyxzQkFBd0I7OztZQUN6QixDQUFDLGlCQUF3Qjs7SUFFakMsK0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFDQSxJQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxLQUF5QixJQUE1QjtNQUFzQyxJQUFDLENBQUEsY0FBRCxHQUFrQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQU0sQ0FB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
