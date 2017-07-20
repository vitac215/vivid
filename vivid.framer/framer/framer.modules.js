require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"CameraLayer":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdml0YWNoZW4vRG9jdW1lbnRzL1NQMjAxNy92aXZpZC92aXZpZC5mcmFtZXIvbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aXRhY2hlbi9Eb2N1bWVudHMvU1AyMDE3L3ZpdmlkL3ZpdmlkLmZyYW1lci9tb2R1bGVzL2ZpcmViYXNlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3ZpdGFjaGVuL0RvY3VtZW50cy9TUDIwMTcvdml2aWQvdml2aWQuZnJhbWVyL21vZHVsZXMvQ2FtZXJhTGF5ZXIuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiZXhwb3J0cy5rZXlib2FyZExheWVyID0gbmV3IExheWVyXG5cdHg6MCwgeTpTY3JlZW4uaGVpZ2h0LCB3aWR0aDpTY3JlZW4ud2lkdGgsIGhlaWdodDo0MzJcblx0aHRtbDpcIjxpbWcgc3R5bGU9J3dpZHRoOiAxMDAlOycgc3JjPSdtb2R1bGVzL2tleWJvYXJkLnBuZycvPlwiXG5cbiNzY3JlZW4gd2lkdGggdnMuIHNpemUgb2YgaW1hZ2Ugd2lkdGhcbmdyb3d0aFJhdGlvID0gU2NyZWVuLndpZHRoIC8gNzMyXG5pbWFnZUhlaWdodCA9IGdyb3d0aFJhdGlvICogNDMyXG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMgPVxuXHRzaG93bjogXG5cdFx0eTogU2NyZWVuLmhlaWdodCAtIGltYWdlSGVpZ2h0XG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdGN1cnZlOiBcInNwcmluZyg1MDAsNTAsMTUpXCJcblxuY2xhc3MgZXhwb3J0cy5JbnB1dCBleHRlbmRzIExheWVyXG5cdEBkZWZpbmUgXCJzdHlsZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRfLmV4dGVuZCBAaW5wdXQuc3R5bGUsIHZhbHVlXG5cblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQudmFsdWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBpbnB1dC52YWx1ZSA9IHZhbHVlXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zZXR1cCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMud2lkdGggPz0gU2NyZWVuLndpZHRoXG5cdFx0b3B0aW9ucy5jbGlwID89IGZhbHNlXG5cdFx0b3B0aW9ucy5oZWlnaHQgPz0gNjBcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJyZ2JhKDI1NSwgNjAsIDQ3LCAuNSlcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMzBcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMzBcblx0XHRvcHRpb25zLnBhZGRpbmcgPz0gMTBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJcIlxuXHRcdG9wdGlvbnMucGxhY2Vob2xkZXIgPz0gXCJcIlxuXHRcdG9wdGlvbnMudmlydHVhbEtleWJvYXJkID89IGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBmYWxzZSBlbHNlIHRydWVcblx0XHRvcHRpb25zLnR5cGUgPz0gXCJ0ZXh0XCJcblx0XHRvcHRpb25zLmdvQnV0dG9uID89IGZhbHNlXG5cdFx0b3B0aW9ucy5hdXRvQ29ycmVjdCA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9Db21wbGV0ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9DYXBpdGFsaXplID89IFwib25cIlxuXHRcdG9wdGlvbnMuc3BlbGxDaGVjayA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9mb2N1cyA/PSBmYWxzZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yP1xuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJpbnB1dFwiXG5cdFx0QGlucHV0LmlkID0gXCJpbnB1dC0je18ubm93KCl9XCJcblx0XHRAaW5wdXQuc3R5bGUuY3NzVGV4dCA9IFwib3V0bGluZTogbm9uZTsgZm9udC1zaXplOiAje29wdGlvbnMuZm9udFNpemV9cHg7IGxpbmUtaGVpZ2h0OiAje29wdGlvbnMubGluZUhlaWdodH1weDsgcGFkZGluZzogI3tvcHRpb25zLnBhZGRpbmd9cHg7IHdpZHRoOiAje29wdGlvbnMud2lkdGh9cHg7IGhlaWdodDogI3tvcHRpb25zLmhlaWdodH1weDsgYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYWJvdXQ6YmxhbmspOyBiYWNrZ3JvdW5kLWNvbG9yOiAje29wdGlvbnMuYmFja2dyb3VuZENvbG9yfTtcIlxuXHRcdEBpbnB1dC52YWx1ZSA9IG9wdGlvbnMudGV4dFxuXHRcdEBpbnB1dC50eXBlID0gb3B0aW9ucy50eXBlXG5cdFx0QGlucHV0LnBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlclxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29ycmVjdFwiLCBvcHRpb25zLmF1dG9Db3JyZWN0XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb21wbGV0ZVwiLCBvcHRpb25zLmF1dG9Db21wbGV0ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY2FwaXRhbGl6ZVwiLCBvcHRpb25zLmF1dG9DYXBpdGFsaXplXG5cdFx0aWYgb3B0aW9ucy5hdXRvZm9jdXMgPT0gdHJ1ZVxuXHRcdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9mb2N1c1wiLCB0cnVlXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcInNwZWxsY2hlY2tcIiwgb3B0aW9ucy5zcGVsbENoZWNrXG5cdFx0QGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZm9ybVwiXG5cblx0XHRpZiBvcHRpb25zLmdvQnV0dG9uXG5cdFx0XHRAZm9ybS5hY3Rpb24gPSBcIiNcIlxuXHRcdFx0QGZvcm0uYWRkRXZlbnRMaXN0ZW5lciBcInN1Ym1pdFwiLCAoZXZlbnQpIC0+XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdEBmb3JtLmFwcGVuZENoaWxkIEBpbnB1dFxuXHRcdEBfZWxlbWVudC5hcHBlbmRDaGlsZCBAZm9ybVxuXG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdEB1cGRhdGVQbGFjZWhvbGRlckNvbG9yIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvciBpZiBAcGxhY2Vob2xkZXJDb2xvclxuXG5cdFx0I29ubHkgc2hvdyBob25vciB2aXJ0dWFsIGtleWJvYXJkIG9wdGlvbiB3aGVuIG5vdCBvbiBtb2JpbGUsXG5cdFx0I290aGVyd2lzZSBpZ25vcmVcblx0XHRpZiAhVXRpbHMuaXNNb2JpbGUoKSAmJiBvcHRpb25zLnZpcnR1YWxLZXlib2FyZCBpcyB0cnVlXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImZvY3VzXCIsIC0+XG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVDeWNsZSgpXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cblx0dXBkYXRlUGxhY2Vob2xkZXJDb2xvcjogKGNvbG9yKSAtPlxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gY29sb3Jcblx0XHRpZiBAcGFnZVN0eWxlP1xuXHRcdFx0ZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCBAcGFnZVN0eWxlXG5cdFx0QHBhZ2VTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJzdHlsZVwiXG5cdFx0QHBhZ2VTdHlsZS50eXBlID0gXCJ0ZXh0L2Nzc1wiXG5cdFx0Y3NzID0gXCIjI3tAaW5wdXQuaWR9Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QHBsYWNlaG9sZGVyQ29sb3J9OyB9XCJcblx0XHRAcGFnZVN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlIGNzcylcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkIEBwYWdlU3R5bGVcblxuXHRmb2N1czogKCkgLT5cblx0XHRAaW5wdXQuZm9jdXMoKVxuXG5cdG9uRm9jdXM6IChjYikgLT5cblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImZvY3VzXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuXG5cdG9uQmx1cjogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0Y2IuYXBwbHkoQClcbiIsIlxuXG4jIERvY3VtZW50YXRpb24gb2YgdGhpcyBNb2R1bGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJja3Jlbm4vZnJhbWVyLUZpcmViYXNlXG4jIC0tLS0tLSA6IC0tLS0tLS0gRmlyZWJhc2UgUkVTVCBBUEk6IGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3JlZmVyZW5jZS9yZXN0L2RhdGFiYXNlL1xuXG4jIEZpcmViYXNlIFJFU1QgQVBJIENsYXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgZXhwb3J0cy5GaXJlYmFzZSBleHRlbmRzIEZyYW1lci5CYXNlQ2xhc3NcblxuXG5cdEAuZGVmaW5lIFwic3RhdHVzXCIsXG5cdFx0Z2V0OiAtPiBAX3N0YXR1cyAjIHJlYWRPbmx5XG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAcHJvamVjdElEID0gQG9wdGlvbnMucHJvamVjdElEID89IG51bGxcblx0XHRAc2VjcmV0ICAgID0gQG9wdGlvbnMuc2VjcmV0ICAgID89IG51bGxcblx0XHRAZGVidWcgICAgID0gQG9wdGlvbnMuZGVidWcgICAgID89IGZhbHNlXG5cdFx0QF9zdGF0dXMgICAgICAgICAgICAgICAgICAgICAgICA/PSBcImRpc2Nvbm5lY3RlZFwiXG5cblx0XHRAc2VjcmV0RW5kUG9pbnQgPSBpZiBAc2VjcmV0IHRoZW4gXCI/YXV0aD0je0BzZWNyZXR9XCIgZWxzZSBcIj9cIiAjIGhvdGZpeFxuXHRcdHN1cGVyXG5cblx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBDb25uZWN0aW5nIHRvIEZpcmViYXNlIFByb2plY3QgJyN7QHByb2plY3RJRH0nIC4uLiBcXG4gVVJMOiAnaHR0cHM6Ly8je0Bwcm9qZWN0SUR9LmZpcmViYXNlaW8uY29tJ1wiIGlmIEBkZWJ1Z1xuXHRcdEAub25DaGFuZ2UgXCJjb25uZWN0aW9uXCJcblxuXG5cdHJlcXVlc3QgPSAocHJvamVjdCwgc2VjcmV0LCBwYXRoLCBjYWxsYmFjaywgbWV0aG9kLCBkYXRhLCBwYXJhbWV0ZXJzLCBkZWJ1ZykgLT5cblxuXHRcdHVybCA9IFwiaHR0cHM6Ly8je3Byb2plY3R9LmZpcmViYXNlaW8uY29tI3twYXRofS5qc29uI3tzZWNyZXR9XCJcblxuXG5cdFx0dW5sZXNzIHBhcmFtZXRlcnMgaXMgdW5kZWZpbmVkXG5cdFx0XHRpZiBwYXJhbWV0ZXJzLnNoYWxsb3cgICAgICAgICAgICB0aGVuIHVybCArPSBcIiZzaGFsbG93PXRydWVcIlxuXHRcdFx0aWYgcGFyYW1ldGVycy5mb3JtYXQgaXMgXCJleHBvcnRcIiB0aGVuIHVybCArPSBcIiZmb3JtYXQ9ZXhwb3J0XCJcblxuXHRcdFx0c3dpdGNoIHBhcmFtZXRlcnMucHJpbnRcblx0XHRcdFx0d2hlbiBcInByZXR0eVwiIHRoZW4gdXJsICs9IFwiJnByaW50PXByZXR0eVwiXG5cdFx0XHRcdHdoZW4gXCJzaWxlbnRcIiB0aGVuIHVybCArPSBcIiZwcmludD1zaWxlbnRcIlxuXG5cdFx0XHRpZiB0eXBlb2YgcGFyYW1ldGVycy5kb3dubG9hZCBpcyBcInN0cmluZ1wiXG5cdFx0XHRcdHVybCArPSBcIiZkb3dubG9hZD0je3BhcmFtZXRlcnMuZG93bmxvYWR9XCJcblx0XHRcdFx0d2luZG93Lm9wZW4odXJsLFwiX3NlbGZcIilcblxuXHRcdFx0dXJsICs9IFwiJm9yZGVyQnk9XCIgKyAnXCInICsgcGFyYW1ldGVycy5vcmRlckJ5ICsgJ1wiJyBpZiB0eXBlb2YgcGFyYW1ldGVycy5vcmRlckJ5ICAgICAgaXMgXCJzdHJpbmdcIlxuXHRcdFx0cHJpbnQgdXJsICs9IFwiJmxpbWl0VG9GaXJzdD0je3BhcmFtZXRlcnMubGltaXRUb0ZpcnN0fVwiICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMubGltaXRUb0ZpcnN0IGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZsaW1pdFRvTGFzdD0je3BhcmFtZXRlcnMubGltaXRUb0xhc3R9XCIgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmxpbWl0VG9MYXN0ICBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImc3RhcnRBdD0je3BhcmFtZXRlcnMuc3RhcnRBdH1cIiAgICAgICAgICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5zdGFydEF0ICAgICAgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmVuZEF0PSN7cGFyYW1ldGVycy5lbmRBdH1cIiAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMuZW5kQXQgICAgICAgIGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZlcXVhbFRvPSN7cGFyYW1ldGVycy5lcXVhbFRvfVwiICAgICAgICAgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmVxdWFsVG8gICAgICBpcyBcIm51bWJlclwiXG5cblx0XHR4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdFxuXHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IE5ldyAnI3ttZXRob2R9Jy1yZXF1ZXN0IHdpdGggZGF0YTogJyN7SlNPTi5zdHJpbmdpZnkoZGF0YSl9JyBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cdFx0eGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gPT5cblxuXHRcdFx0dW5sZXNzIHBhcmFtZXRlcnMgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdGlmIHBhcmFtZXRlcnMucHJpbnQgaXMgXCJzaWxlbnRcIiBvciB0eXBlb2YgcGFyYW1ldGVycy5kb3dubG9hZCBpcyBcInN0cmluZ1wiIHRoZW4gcmV0dXJuICMgdWdoXG5cblx0XHRcdHN3aXRjaCB4aHR0cC5yZWFkeVN0YXRlXG5cdFx0XHRcdHdoZW4gMCB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlcXVlc3Qgbm90IGluaXRpYWxpemVkIFxcbiBVUkw6ICcje3VybH0nXCIgICAgICAgaWYgZGVidWdcblx0XHRcdFx0d2hlbiAxIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogU2VydmVyIGNvbm5lY3Rpb24gZXN0YWJsaXNoZWQgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDIgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZXF1ZXN0IHJlY2VpdmVkIFxcbiBVUkw6ICcje3VybH0nXCIgICAgICAgICAgICAgIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gMyB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFByb2Nlc3NpbmcgcmVxdWVzdCBcXG4gVVJMOiAnI3t1cmx9J1wiICAgICAgICAgICAgaWYgZGVidWdcblx0XHRcdFx0d2hlbiA0XG5cdFx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZSh4aHR0cC5yZXNwb25zZVRleHQpKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZXF1ZXN0IGZpbmlzaGVkLCByZXNwb25zZTogJyN7SlNPTi5wYXJzZSh4aHR0cC5yZXNwb25zZVRleHQpfScgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXG5cdFx0XHRpZiB4aHR0cC5zdGF0dXMgaXMgXCI0MDRcIlxuXHRcdFx0XHRjb25zb2xlLndhcm4gXCJGaXJlYmFzZTogSW52YWxpZCByZXF1ZXN0LCBwYWdlIG5vdCBmb3VuZCBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cblxuXHRcdHhodHRwLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpXG5cdFx0eGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIilcblx0XHR4aHR0cC5zZW5kKGRhdGEgPSBcIiN7SlNPTi5zdHJpbmdpZnkoZGF0YSl9XCIpXG5cblxuXG5cdCMgQXZhaWxhYmxlIG1ldGhvZHNcblxuXHRnZXQ6ICAgIChwYXRoLCBjYWxsYmFjaywgICAgICAgcGFyYW1ldGVycykgLT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIkdFVFwiLCAgICBudWxsLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHB1dDogICAgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiUFVUXCIsICAgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cG9zdDogICAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldEVuZFBvaW50LCBwYXRoLCBjYWxsYmFjaywgXCJQT1NUXCIsICAgZGF0YSwgcGFyYW1ldGVycywgQGRlYnVnKVxuXHRwYXRjaDogIChwYXRoLCBkYXRhLCBjYWxsYmFjaywgcGFyYW1ldGVycykgLT4gcmVxdWVzdChAcHJvamVjdElELCBAc2VjcmV0RW5kUG9pbnQsIHBhdGgsIGNhbGxiYWNrLCBcIlBBVENIXCIsICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdGRlbGV0ZTogKHBhdGgsIGNhbGxiYWNrLCAgICAgICBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXRFbmRQb2ludCwgcGF0aCwgY2FsbGJhY2ssIFwiREVMRVRFXCIsIG51bGwsIHBhcmFtZXRlcnMsIEBkZWJ1ZylcblxuXG5cblx0b25DaGFuZ2U6IChwYXRoLCBjYWxsYmFjaykgLT5cblxuXG5cdFx0aWYgcGF0aCBpcyBcImNvbm5lY3Rpb25cIlxuXG5cdFx0XHR1cmwgPSBcImh0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbS8uanNvbiN7QHNlY3JldEVuZFBvaW50fVwiXG5cdFx0XHRjdXJyZW50U3RhdHVzID0gXCJkaXNjb25uZWN0ZWRcIlxuXHRcdFx0c291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybClcblxuXHRcdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJvcGVuXCIsID0+XG5cdFx0XHRcdGlmIGN1cnJlbnRTdGF0dXMgaXMgXCJkaXNjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdEAuX3N0YXR1cyA9IFwiY29ubmVjdGVkXCJcblx0XHRcdFx0XHRjYWxsYmFjayhcImNvbm5lY3RlZFwiKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBDb25uZWN0aW9uIHRvIEZpcmViYXNlIFByb2plY3QgJyN7QHByb2plY3RJRH0nIGVzdGFibGlzaGVkXCIgaWYgQGRlYnVnXG5cdFx0XHRcdGN1cnJlbnRTdGF0dXMgPSBcImNvbm5lY3RlZFwiXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwiZXJyb3JcIiwgPT5cblx0XHRcdFx0aWYgY3VycmVudFN0YXR1cyBpcyBcImNvbm5lY3RlZFwiXG5cdFx0XHRcdFx0QC5fc3RhdHVzID0gXCJkaXNjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdGNhbGxiYWNrKFwiZGlzY29ubmVjdGVkXCIpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybiBcIkZpcmViYXNlOiBDb25uZWN0aW9uIHRvIEZpcmViYXNlIFByb2plY3QgJyN7QHByb2plY3RJRH0nIGNsb3NlZFwiIGlmIEBkZWJ1Z1xuXHRcdFx0XHRjdXJyZW50U3RhdHVzID0gXCJkaXNjb25uZWN0ZWRcIlxuXG5cblx0XHRlbHNlXG5cblx0XHRcdHVybCA9IFwiaHR0cHM6Ly8je0Bwcm9qZWN0SUR9LmZpcmViYXNlaW8uY29tI3twYXRofS5qc29uI3tAc2VjcmV0RW5kUG9pbnR9XCJcblx0XHRcdHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpXG5cdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBMaXN0ZW5pbmcgdG8gY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIEBkZWJ1Z1xuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcInB1dFwiLCAoZXYpID0+XG5cdFx0XHRcdGNhbGxiYWNrKEpTT04ucGFyc2UoZXYuZGF0YSkuZGF0YSwgXCJwdXRcIiwgSlNPTi5wYXJzZShldi5kYXRhKS5wYXRoLCBfLnRhaWwoSlNPTi5wYXJzZShldi5kYXRhKS5wYXRoLnNwbGl0KFwiL1wiKSwxKSkgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlY2VpdmVkIGNoYW5nZXMgbWFkZSB0byAnI3twYXRofScgdmlhICdQVVQnOiAje0pTT04ucGFyc2UoZXYuZGF0YSkuZGF0YX0gXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBAZGVidWdcblxuXHRcdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJwYXRjaFwiLCAoZXYpID0+XG5cdFx0XHRcdGNhbGxiYWNrKEpTT04ucGFyc2UoZXYuZGF0YSkuZGF0YSwgXCJwYXRjaFwiLCBKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGgsIF8udGFpbChKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGguc3BsaXQoXCIvXCIpLDEpKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVjZWl2ZWQgY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyB2aWEgJ1BBVENIJzogI3tKU09OLnBhcnNlKGV2LmRhdGEpLmRhdGF9IFxcbiBVUkw6ICcje3VybH0nXCIgaWYgQGRlYnVnXG4iLCJjbGFzcyBDYW1lcmFMYXllciBleHRlbmRzIFZpZGVvTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG4gICAgY3VzdG9tUHJvcHMgPVxuICAgICAgZmFjaW5nOiB0cnVlXG4gICAgICBmbGlwcGVkOiB0cnVlXG4gICAgICBhdXRvRmxpcDogdHJ1ZVxuICAgICAgcmVzb2x1dGlvbjogdHJ1ZVxuICAgICAgZml0OiB0cnVlXG5cbiAgICBiYXNlT3B0aW9ucyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZmlsdGVyIChrZXkpIC0+ICFjdXN0b21Qcm9wc1trZXldXG4gICAgICAucmVkdWNlIChjbG9uZSwga2V5KSAtPlxuICAgICAgICBjbG9uZVtrZXldID0gb3B0aW9uc1trZXldXG4gICAgICAgIGNsb25lXG4gICAgICAsIHt9XG5cbiAgICBzdXBlcihiYXNlT3B0aW9ucylcblxuICAgIEBfZmFjaW5nID0gb3B0aW9ucy5mYWNpbmcgPyAnYmFjaydcbiAgICBAX2ZsaXBwZWQgPSBvcHRpb25zLmZsaXBwZWQgPyBmYWxzZVxuICAgIEBfYXV0b0ZsaXAgPSBvcHRpb25zLmF1dG9GbGlwID8gdHJ1ZVxuICAgIEBfcmVzb2x1dGlvbiA9IG9wdGlvbnMucmVzb2x1dGlvbiA/IDQ4MFxuXG4gICAgQF9zdGFydGVkID0gZmFsc2VcbiAgICBAX2RldmljZSA9IG51bGxcbiAgICBAX21hdGNoZWRGYWNpbmcgPSAndW5rbm93bidcbiAgICBAX3N0cmVhbSA9IG51bGxcbiAgICBAX3NjaGVkdWxlZFJlc3RhcnQgPSBudWxsXG4gICAgQF9yZWNvcmRpbmcgPSBudWxsXG5cbiAgICBAYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50J1xuICAgIEBjbGlwID0gdHJ1ZVxuXG4gICAgQHBsYXllci5zcmMgPSAnJ1xuICAgIEBwbGF5ZXIuYXV0b3BsYXkgPSB0cnVlXG4gICAgQHBsYXllci5tdXRlZCA9IHRydWVcbiAgICBAcGxheWVyLnN0eWxlLm9iamVjdEZpdCA9IG9wdGlvbnMuZml0ID8gJ2NvdmVyJ1xuXG4gIEBkZWZpbmUgJ2ZhY2luZycsXG4gICAgZ2V0OiAtPiBAX2ZhY2luZ1xuICAgIHNldDogKGZhY2luZykgLT5cbiAgICAgIEBfZmFjaW5nID0gaWYgZmFjaW5nID09ICdmcm9udCcgdGhlbiBmYWNpbmcgZWxzZSAnYmFjaydcbiAgICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgQGRlZmluZSAnZmxpcHBlZCcsXG4gICAgZ2V0OiAtPiBAX2ZsaXBwZWRcbiAgICBzZXQ6IChmbGlwcGVkKSAtPlxuICAgICAgQF9mbGlwcGVkID0gZmxpcHBlZFxuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdhdXRvRmxpcCcsXG4gICAgZ2V0OiAtPiBAX2F1dG9GbGlwXG4gICAgc2V0OiAoYXV0b0ZsaXApIC0+XG4gICAgICBAX2F1dG9GbGlwID0gYXV0b0ZsaXBcbiAgICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgQGRlZmluZSAncmVzb2x1dGlvbicsXG4gICAgZ2V0OiAtPiBAX3Jlc29sdXRpb25cbiAgICBzZXQ6IChyZXNvbHV0aW9uKSAtPlxuICAgICAgQF9yZXNvbHV0aW9uID0gcmVzb2x1dGlvblxuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdmaXQnLFxuICAgIGdldDogLT4gQHBsYXllci5zdHlsZS5vYmplY3RGaXRcbiAgICBzZXQ6IChmaXQpIC0+IEBwbGF5ZXIuc3R5bGUub2JqZWN0Rml0ID0gZml0XG5cbiAgQGRlZmluZSAnaXNSZWNvcmRpbmcnLFxuICAgIGdldDogLT4gQF9yZWNvcmRpbmc/LnJlY29yZGVyLnN0YXRlID09ICdyZWNvcmRpbmcnXG5cbiAgdG9nZ2xlRmFjaW5nOiAtPlxuICAgIEBfZmFjaW5nID0gaWYgQF9mYWNpbmcgPT0gJ2Zyb250JyB0aGVuICdiYWNrJyBlbHNlICdmcm9udCdcbiAgICBAX3NldFJlc3RhcnQoKVxuXG4gIGNhcHR1cmU6ICh3aWR0aCA9IEB3aWR0aCwgaGVpZ2h0ID0gQGhlaWdodCwgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbykgLT5cbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG4gICAgY2FudmFzLndpZHRoID0gcmF0aW8gKiB3aWR0aFxuICAgIGNhbnZhcy5oZWlnaHQgPSByYXRpbyAqIGhlaWdodFxuXG4gICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBAZHJhdyhjb250ZXh0KVxuXG4gICAgdXJsID0gY2FudmFzLnRvRGF0YVVSTCgpXG4gICAgQGVtaXQoJ2NhcHR1cmUnLCB1cmwpXG5cbiAgICB1cmxcblxuICBkcmF3OiAoY29udGV4dCkgLT5cbiAgICByZXR1cm4gdW5sZXNzIGNvbnRleHRcblxuICAgIGNvdmVyID0gKHNyY1csIHNyY0gsIGRzdFcsIGRzdEgpIC0+XG4gICAgICBzY2FsZVggPSBkc3RXIC8gc3JjV1xuICAgICAgc2NhbGVZID0gZHN0SCAvIHNyY0hcbiAgICAgIHNjYWxlID0gaWYgc2NhbGVYID4gc2NhbGVZIHRoZW4gc2NhbGVYIGVsc2Ugc2NhbGVZXG4gICAgICB3aWR0aDogc3JjVyAqIHNjYWxlLCBoZWlnaHQ6IHNyY0ggKiBzY2FsZVxuXG4gICAge3ZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0fSA9IEBwbGF5ZXJcblxuICAgIGNsaXBCb3ggPSB3aWR0aDogY29udGV4dC5jYW52YXMud2lkdGgsIGhlaWdodDogY29udGV4dC5jYW52YXMuaGVpZ2h0XG4gICAgbGF5ZXJCb3ggPSBjb3ZlcihAd2lkdGgsIEBoZWlnaHQsIGNsaXBCb3gud2lkdGgsIGNsaXBCb3guaGVpZ2h0KVxuICAgIHZpZGVvQm94ID0gY292ZXIodmlkZW9XaWR0aCwgdmlkZW9IZWlnaHQsIGxheWVyQm94LndpZHRoLCBsYXllckJveC5oZWlnaHQpXG5cbiAgICB4ID0gKGNsaXBCb3gud2lkdGggLSB2aWRlb0JveC53aWR0aCkgLyAyXG4gICAgeSA9IChjbGlwQm94LmhlaWdodCAtIHZpZGVvQm94LmhlaWdodCkgLyAyXG5cbiAgICBjb250ZXh0LmRyYXdJbWFnZShAcGxheWVyLCB4LCB5LCB2aWRlb0JveC53aWR0aCwgdmlkZW9Cb3guaGVpZ2h0KVxuXG4gIHN0YXJ0OiAtPlxuICAgIEBfZW51bWVyYXRlRGV2aWNlcygpXG4gICAgLnRoZW4gKGRldmljZXMpID0+XG4gICAgICBkZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIgKGRldmljZSkgLT4gZGV2aWNlLmtpbmQgPT0gJ3ZpZGVvaW5wdXQnXG5cbiAgICAgIGZvciBkZXZpY2UgaW4gZGV2aWNlc1xuICAgICAgICBpZiBkZXZpY2UubGFiZWwuaW5kZXhPZihAX2ZhY2luZykgIT0gLTFcbiAgICAgICAgICBAX21hdGNoZWRGYWNpbmcgPSBAX2ZhY2luZ1xuICAgICAgICAgIHJldHVybiBkZXZpY2VcblxuICAgICAgQF9tYXRjaGVkRmFjaW5nID0gJ3Vua25vd24nXG5cbiAgICAgIGlmIGRldmljZXMubGVuZ3RoID4gMCB0aGVuIGRldmljZXNbMF0gZWxzZSBQcm9taXNlLnJlamVjdCgpXG5cbiAgICAudGhlbiAoZGV2aWNlKSA9PlxuICAgICAgcmV0dXJuIGlmICFkZXZpY2UgfHwgZGV2aWNlLmRldmljZUlkID09IEBfZGV2aWNlPy5kZXZpY2VJZFxuXG4gICAgICBAc3RvcCgpXG4gICAgICBAX2RldmljZSA9IGRldmljZVxuXG4gICAgICBjb25zdHJhaW50cyA9XG4gICAgICAgIHZpZGVvOlxuICAgICAgICAgIG1hbmRhdG9yeToge21pbldpZHRoOiBAX3Jlc29sdXRpb24sIG1pbkhlaWdodDogQF9yZXNvbHV0aW9ufVxuICAgICAgICAgIG9wdGlvbmFsOiBbe3NvdXJjZUlkOiBAX2RldmljZS5kZXZpY2VJZH1dXG4gICAgICAgIGF1ZGlvOlxuICAgICAgICAgIHRydWVcblxuICAgICAgQF9nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpXG5cbiAgICAudGhlbiAoc3RyZWFtKSA9PlxuICAgICAgQHBsYXllci5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSlcbiAgICAgIEBfc3RhcnRlZCA9IHRydWVcbiAgICAgIEBfc3RyZWFtID0gc3RyZWFtXG4gICAgICBAX2ZsaXAoKVxuXG4gICAgLmNhdGNoIChlcnJvcikgLT5cbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cbiAgc3RvcDogLT5cbiAgICBAX3N0YXJ0ZWQgPSBmYWxzZVxuXG4gICAgQHBsYXllci5wYXVzZSgpXG4gICAgQHBsYXllci5zcmMgPSAnJ1xuXG4gICAgQF9zdHJlYW0/LmdldFRyYWNrcygpLmZvckVhY2ggKHRyYWNrKSAtPiB0cmFjay5zdG9wKClcbiAgICBAX3N0cmVhbSA9IG51bGxcbiAgICBAX2RldmljZSA9IG51bGxcblxuICAgIGlmIEBfc2NoZWR1bGVkUmVzdGFydFxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQF9zY2hlZHVsZWRSZXN0YXJ0KVxuICAgICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gbnVsbFxuXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuICAgIGlmIEBfcmVjb3JkaW5nXG4gICAgICBAX3JlY29yZGluZy5yZWNvcmRlci5zdG9wKClcbiAgICAgIEBfcmVjb3JkaW5nID0gbnVsbFxuXG4gICAgY2h1bmtzID0gW11cblxuICAgIHJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIoQF9zdHJlYW0sIHttaW1lVHlwZTogJ3ZpZGVvL3dlYm0nfSlcbiAgICByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyICdzdGFydCcsIChldmVudCkgPT4gQGVtaXQoJ3N0YXJ0cmVjb3JkaW5nJylcbiAgICByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyICdkYXRhYXZhaWxhYmxlJywgKGV2ZW50KSAtPiBjaHVua3MucHVzaChldmVudC5kYXRhKVxuICAgIHJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIgJ3N0b3AnLCAoZXZlbnQpID0+XG4gICAgICBibG9iID0gbmV3IEJsb2IoY2h1bmtzKVxuICAgICAgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICAgIEBlbWl0KCdzdG9wcmVjb3JkaW5nJylcbiAgICAgIEBlbWl0KCdyZWNvcmQnLCB1cmwpXG5cbiAgICByZWNvcmRlci5zdGFydCgpXG5cbiAgICBAX3JlY29yZGluZyA9IHtyZWNvcmRlciwgY2h1bmtzfVxuXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgcmV0dXJuIGlmICFAX3JlY29yZGluZ1xuICAgIEBfcmVjb3JkaW5nLnJlY29yZGVyLnN0b3AoKVxuICAgIEBfcmVjb3JkaW5nID0gbnVsbFxuXG4gIG9uQ2FwdHVyZTogKGNhbGxiYWNrKSAtPiBAb24oJ2NhcHR1cmUnLCBjYWxsYmFjaylcbiAgb25TdGFydFJlY29yZGluZzogKGNhbGxiYWNrKSAtPiBAb24oJ3N0YXJ0cmVjb3JkaW5nJywgY2FsbGJhY2spXG4gIG9uU3RvcFJlY29yZGluZzogKGNhbGxiYWNrKSAtPiBAb24oJ3N0b3ByZWNvcmRpbmcnLCBjYWxsYmFjaylcbiAgb25SZWNvcmQ6IChjYWxsYmFjaykgLT4gQG9uKCdyZWNvcmQnLCBjYWxsYmFjaylcblxuICBfc2V0UmVzdGFydDogLT5cbiAgICByZXR1cm4gaWYgIUBfc3RhcnRlZCB8fCBAX3NjaGVkdWxlZFJlc3RhcnRcblxuICAgIEBfc2NoZWR1bGVkUmVzdGFydCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PlxuICAgICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gbnVsbFxuICAgICAgQHN0YXJ0KClcblxuICBfZmxpcDogLT5cbiAgICBAX2ZsaXBwZWQgPSBAX21hdGNoZWRGYWNpbmcgPT0gJ2Zyb250JyBpZiBAX2F1dG9GbGlwXG4gICAgeCA9IGlmIEBfZmxpcHBlZCB0aGVuIC0xIGVsc2UgMVxuICAgIEBwbGF5ZXIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZSgje3h9LCAxKVwiXG5cbiAgX2VudW1lcmF0ZURldmljZXM6IC0+XG4gICAgdHJ5XG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxuICAgIGNhdGNoXG4gICAgICBQcm9taXNlLnJlamVjdCgpXG5cbiAgX2dldFVzZXJNZWRpYTogKGNvbnN0cmFpbnRzKSAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICB0cnlcbiAgICAgICAgZ3VtID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhXG4gICAgICAgIGd1bS5jYWxsKG5hdmlnYXRvciwgY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdClcbiAgICAgIGNhdGNoXG4gICAgICAgIHJlamVjdCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhTGF5ZXIgaWYgbW9kdWxlP1xuRnJhbWVyLkNhbWVyYUxheWVyID0gQ2FtZXJhTGF5ZXJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBSUFBO0FEQUEsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7RUFDUyxxQkFBQyxPQUFEO0FBQ1gsUUFBQTs7TUFEWSxVQUFVOztJQUN0QixXQUFBLEdBQ0U7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLE9BQUEsRUFBUyxJQURUO01BRUEsUUFBQSxFQUFVLElBRlY7TUFHQSxVQUFBLEVBQVksSUFIWjtNQUlBLEdBQUEsRUFBSyxJQUpMOztJQU1GLFdBQUEsR0FBYyxNQUFNLENBQUMsSUFBUCxDQUFZLE9BQVosQ0FDWixDQUFDLE1BRFcsQ0FDSixTQUFDLEdBQUQ7YUFBUyxDQUFDLFdBQVksQ0FBQSxHQUFBO0lBQXRCLENBREksQ0FFWixDQUFDLE1BRlcsQ0FFSixTQUFDLEtBQUQsRUFBUSxHQUFSO01BQ04sS0FBTSxDQUFBLEdBQUEsQ0FBTixHQUFhLE9BQVEsQ0FBQSxHQUFBO2FBQ3JCO0lBRk0sQ0FGSSxFQUtWLEVBTFU7SUFPZCw2Q0FBTSxXQUFOO0lBRUEsSUFBQyxDQUFBLE9BQUQsMENBQTRCO0lBQzVCLElBQUMsQ0FBQSxRQUFELDZDQUE4QjtJQUM5QixJQUFDLENBQUEsU0FBRCw4Q0FBZ0M7SUFDaEMsSUFBQyxDQUFBLFdBQUQsZ0RBQW9DO0lBRXBDLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFDWixJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLGNBQUQsR0FBa0I7SUFDbEIsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxpQkFBRCxHQUFxQjtJQUNyQixJQUFDLENBQUEsVUFBRCxHQUFjO0lBRWQsSUFBQyxDQUFBLGVBQUQsR0FBbUI7SUFDbkIsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUVSLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixHQUFjO0lBQ2QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLEdBQW1CO0lBQ25CLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixHQUFnQjtJQUNoQixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFkLHlDQUF3QztFQW5DN0I7O0VBcUNiLFdBQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUNFO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsTUFBRDtNQUNILElBQUMsQ0FBQSxPQUFELEdBQWMsTUFBQSxLQUFVLE9BQWIsR0FBMEIsTUFBMUIsR0FBc0M7YUFDakQsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUZHLENBREw7R0FERjs7RUFNQSxXQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLE9BQUQ7TUFDSCxJQUFDLENBQUEsUUFBRCxHQUFZO2FBQ1osSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUZHLENBREw7R0FERjs7RUFNQSxXQUFDLENBQUEsTUFBRCxDQUFRLFVBQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLFFBQUQ7TUFDSCxJQUFDLENBQUEsU0FBRCxHQUFhO2FBQ2IsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUZHLENBREw7R0FERjs7RUFNQSxXQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLFVBQUQ7TUFDSCxJQUFDLENBQUEsV0FBRCxHQUFlO2FBQ2YsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUZHLENBREw7R0FERjs7RUFNQSxXQUFDLENBQUEsTUFBRCxDQUFRLEtBQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFBakIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEdBQUQ7YUFBUyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFkLEdBQTBCO0lBQW5DLENBREw7R0FERjs7RUFJQSxXQUFDLENBQUEsTUFBRCxDQUFRLGFBQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO0FBQUcsVUFBQTttREFBVyxDQUFFLFFBQVEsQ0FBQyxlQUF0QixLQUErQjtJQUFsQyxDQUFMO0dBREY7O3dCQUdBLFlBQUEsR0FBYyxTQUFBO0lBQ1osSUFBQyxDQUFBLE9BQUQsR0FBYyxJQUFDLENBQUEsT0FBRCxLQUFZLE9BQWYsR0FBNEIsTUFBNUIsR0FBd0M7V0FDbkQsSUFBQyxDQUFBLFdBQUQsQ0FBQTtFQUZZOzt3QkFJZCxPQUFBLEdBQVMsU0FBQyxLQUFELEVBQWlCLE1BQWpCLEVBQW1DLEtBQW5DO0FBQ1AsUUFBQTs7TUFEUSxRQUFRLElBQUMsQ0FBQTs7O01BQU8sU0FBUyxJQUFDLENBQUE7OztNQUFRLFFBQVEsTUFBTSxDQUFDOztJQUN6RCxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkI7SUFDVCxNQUFNLENBQUMsS0FBUCxHQUFlLEtBQUEsR0FBUTtJQUN2QixNQUFNLENBQUMsTUFBUCxHQUFnQixLQUFBLEdBQVE7SUFFeEIsT0FBQSxHQUFVLE1BQU0sQ0FBQyxVQUFQLENBQWtCLElBQWxCO0lBQ1YsSUFBQyxDQUFBLElBQUQsQ0FBTSxPQUFOO0lBRUEsR0FBQSxHQUFNLE1BQU0sQ0FBQyxTQUFQLENBQUE7SUFDTixJQUFDLENBQUEsSUFBRCxDQUFNLFNBQU4sRUFBaUIsR0FBakI7V0FFQTtFQVhPOzt3QkFhVCxJQUFBLEdBQU0sU0FBQyxPQUFEO0FBQ0osUUFBQTtJQUFBLElBQUEsQ0FBYyxPQUFkO0FBQUEsYUFBQTs7SUFFQSxLQUFBLEdBQVEsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkI7QUFDTixVQUFBO01BQUEsTUFBQSxHQUFTLElBQUEsR0FBTztNQUNoQixNQUFBLEdBQVMsSUFBQSxHQUFPO01BQ2hCLEtBQUEsR0FBVyxNQUFBLEdBQVMsTUFBWixHQUF3QixNQUF4QixHQUFvQzthQUM1QztRQUFBLEtBQUEsRUFBTyxJQUFBLEdBQU8sS0FBZDtRQUFxQixNQUFBLEVBQVEsSUFBQSxHQUFPLEtBQXBDOztJQUpNO0lBTVIsTUFBNEIsSUFBQyxDQUFBLE1BQTdCLEVBQUMsMkJBQUQsRUFBYTtJQUViLE9BQUEsR0FBVTtNQUFBLEtBQUEsRUFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQXRCO01BQTZCLE1BQUEsRUFBUSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQXBEOztJQUNWLFFBQUEsR0FBVyxLQUFBLENBQU0sSUFBQyxDQUFBLEtBQVAsRUFBYyxJQUFDLENBQUEsTUFBZixFQUF1QixPQUFPLENBQUMsS0FBL0IsRUFBc0MsT0FBTyxDQUFDLE1BQTlDO0lBQ1gsUUFBQSxHQUFXLEtBQUEsQ0FBTSxVQUFOLEVBQWtCLFdBQWxCLEVBQStCLFFBQVEsQ0FBQyxLQUF4QyxFQUErQyxRQUFRLENBQUMsTUFBeEQ7SUFFWCxDQUFBLEdBQUksQ0FBQyxPQUFPLENBQUMsS0FBUixHQUFnQixRQUFRLENBQUMsS0FBMUIsQ0FBQSxHQUFtQztJQUN2QyxDQUFBLEdBQUksQ0FBQyxPQUFPLENBQUMsTUFBUixHQUFpQixRQUFRLENBQUMsTUFBM0IsQ0FBQSxHQUFxQztXQUV6QyxPQUFPLENBQUMsU0FBUixDQUFrQixJQUFDLENBQUEsTUFBbkIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsUUFBUSxDQUFDLEtBQTFDLEVBQWlELFFBQVEsQ0FBQyxNQUExRDtFQWxCSTs7d0JBb0JOLEtBQUEsR0FBTyxTQUFBO1dBQ0wsSUFBQyxDQUFBLGlCQUFELENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsT0FBRDtBQUNKLFlBQUE7UUFBQSxPQUFBLEdBQVUsT0FBTyxDQUFDLE1BQVIsQ0FBZSxTQUFDLE1BQUQ7aUJBQVksTUFBTSxDQUFDLElBQVAsS0FBZTtRQUEzQixDQUFmO0FBRVYsYUFBQSx5Q0FBQTs7VUFDRSxJQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBYixDQUFxQixLQUFDLENBQUEsT0FBdEIsQ0FBQSxLQUFrQyxDQUFDLENBQXRDO1lBQ0UsS0FBQyxDQUFBLGNBQUQsR0FBa0IsS0FBQyxDQUFBO0FBQ25CLG1CQUFPLE9BRlQ7O0FBREY7UUFLQSxLQUFDLENBQUEsY0FBRCxHQUFrQjtRQUVsQixJQUFHLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLENBQXBCO2lCQUEyQixPQUFRLENBQUEsQ0FBQSxFQUFuQztTQUFBLE1BQUE7aUJBQTJDLE9BQU8sQ0FBQyxNQUFSLENBQUEsRUFBM0M7O01BVkk7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRE4sQ0FhQSxDQUFDLElBYkQsQ0FhTSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsTUFBRDtBQUNKLFlBQUE7UUFBQSxJQUFVLENBQUMsTUFBRCxJQUFXLE1BQU0sQ0FBQyxRQUFQLHlDQUEyQixDQUFFLGtCQUFsRDtBQUFBLGlCQUFBOztRQUVBLEtBQUMsQ0FBQSxJQUFELENBQUE7UUFDQSxLQUFDLENBQUEsT0FBRCxHQUFXO1FBRVgsV0FBQSxHQUNFO1VBQUEsS0FBQSxFQUNFO1lBQUEsU0FBQSxFQUFXO2NBQUMsUUFBQSxFQUFVLEtBQUMsQ0FBQSxXQUFaO2NBQXlCLFNBQUEsRUFBVyxLQUFDLENBQUEsV0FBckM7YUFBWDtZQUNBLFFBQUEsRUFBVTtjQUFDO2dCQUFDLFFBQUEsRUFBVSxLQUFDLENBQUEsT0FBTyxDQUFDLFFBQXBCO2VBQUQ7YUFEVjtXQURGO1VBR0EsS0FBQSxFQUNFLElBSkY7O2VBTUYsS0FBQyxDQUFBLGFBQUQsQ0FBZSxXQUFmO01BYkk7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBYk4sQ0E0QkEsQ0FBQyxJQTVCRCxDQTRCTSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsTUFBRDtRQUNKLEtBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixHQUFjLEdBQUcsQ0FBQyxlQUFKLENBQW9CLE1BQXBCO1FBQ2QsS0FBQyxDQUFBLFFBQUQsR0FBWTtRQUNaLEtBQUMsQ0FBQSxPQUFELEdBQVc7ZUFDWCxLQUFDLENBQUEsS0FBRCxDQUFBO01BSkk7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBNUJOLENBa0NBLEVBQUMsS0FBRCxFQWxDQSxDQWtDTyxTQUFDLEtBQUQ7YUFDTCxPQUFPLENBQUMsS0FBUixDQUFjLEtBQWQ7SUFESyxDQWxDUDtFQURLOzt3QkFzQ1AsSUFBQSxHQUFNLFNBQUE7QUFDSixRQUFBO0lBQUEsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUVaLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixDQUFBO0lBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLEdBQWM7O1NBRU4sQ0FBRSxTQUFWLENBQUEsQ0FBcUIsQ0FBQyxPQUF0QixDQUE4QixTQUFDLEtBQUQ7ZUFBVyxLQUFLLENBQUMsSUFBTixDQUFBO01BQVgsQ0FBOUI7O0lBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFFWCxJQUFHLElBQUMsQ0FBQSxpQkFBSjtNQUNFLG9CQUFBLENBQXFCLElBQUMsQ0FBQSxpQkFBdEI7YUFDQSxJQUFDLENBQUEsaUJBQUQsR0FBcUIsS0FGdkI7O0VBVkk7O3dCQWNOLGNBQUEsR0FBZ0IsU0FBQTtBQUNkLFFBQUE7SUFBQSxJQUFHLElBQUMsQ0FBQSxVQUFKO01BQ0UsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBckIsQ0FBQTtNQUNBLElBQUMsQ0FBQSxVQUFELEdBQWMsS0FGaEI7O0lBSUEsTUFBQSxHQUFTO0lBRVQsUUFBQSxHQUFlLElBQUEsYUFBQSxDQUFjLElBQUMsQ0FBQSxPQUFmLEVBQXdCO01BQUMsUUFBQSxFQUFVLFlBQVg7S0FBeEI7SUFDZixRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEtBQUQ7ZUFBVyxLQUFDLENBQUEsSUFBRCxDQUFNLGdCQUFOO01BQVg7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5DO0lBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLGVBQTFCLEVBQTJDLFNBQUMsS0FBRDthQUFXLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBSyxDQUFDLElBQWxCO0lBQVgsQ0FBM0M7SUFDQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEtBQUQ7QUFDaEMsWUFBQTtRQUFBLElBQUEsR0FBVyxJQUFBLElBQUEsQ0FBSyxNQUFMO1FBQ1gsR0FBQSxHQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBWCxDQUEyQixJQUEzQjtRQUNOLEtBQUMsQ0FBQSxJQUFELENBQU0sZUFBTjtlQUNBLEtBQUMsQ0FBQSxJQUFELENBQU0sUUFBTixFQUFnQixHQUFoQjtNQUpnQztJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEM7SUFNQSxRQUFRLENBQUMsS0FBVCxDQUFBO1dBRUEsSUFBQyxDQUFBLFVBQUQsR0FBYztNQUFDLFVBQUEsUUFBRDtNQUFXLFFBQUEsTUFBWDs7RUFsQkE7O3dCQW9CaEIsYUFBQSxHQUFlLFNBQUE7SUFDYixJQUFVLENBQUMsSUFBQyxDQUFBLFVBQVo7QUFBQSxhQUFBOztJQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQXJCLENBQUE7V0FDQSxJQUFDLENBQUEsVUFBRCxHQUFjO0VBSEQ7O3dCQUtmLFNBQUEsR0FBVyxTQUFDLFFBQUQ7V0FBYyxJQUFDLENBQUEsRUFBRCxDQUFJLFNBQUosRUFBZSxRQUFmO0VBQWQ7O3dCQUNYLGdCQUFBLEdBQWtCLFNBQUMsUUFBRDtXQUFjLElBQUMsQ0FBQSxFQUFELENBQUksZ0JBQUosRUFBc0IsUUFBdEI7RUFBZDs7d0JBQ2xCLGVBQUEsR0FBaUIsU0FBQyxRQUFEO1dBQWMsSUFBQyxDQUFBLEVBQUQsQ0FBSSxlQUFKLEVBQXFCLFFBQXJCO0VBQWQ7O3dCQUNqQixRQUFBLEdBQVUsU0FBQyxRQUFEO1dBQWMsSUFBQyxDQUFBLEVBQUQsQ0FBSSxRQUFKLEVBQWMsUUFBZDtFQUFkOzt3QkFFVixXQUFBLEdBQWEsU0FBQTtJQUNYLElBQVUsQ0FBQyxJQUFDLENBQUEsUUFBRixJQUFjLElBQUMsQ0FBQSxpQkFBekI7QUFBQSxhQUFBOztXQUVBLElBQUMsQ0FBQSxpQkFBRCxHQUFxQixxQkFBQSxDQUFzQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDekMsS0FBQyxDQUFBLGlCQUFELEdBQXFCO2VBQ3JCLEtBQUMsQ0FBQSxLQUFELENBQUE7TUFGeUM7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRCO0VBSFY7O3dCQU9iLEtBQUEsR0FBTyxTQUFBO0FBQ0wsUUFBQTtJQUFBLElBQTBDLElBQUMsQ0FBQSxTQUEzQztNQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBQyxDQUFBLGNBQUQsS0FBbUIsUUFBL0I7O0lBQ0EsQ0FBQSxHQUFPLElBQUMsQ0FBQSxRQUFKLEdBQWtCLENBQUMsQ0FBbkIsR0FBMEI7V0FDOUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZCxHQUFnQyxRQUFBLEdBQVMsQ0FBVCxHQUFXO0VBSHRDOzt3QkFLUCxpQkFBQSxHQUFtQixTQUFBO0FBQ2pCO2FBQ0UsU0FBUyxDQUFDLFlBQVksQ0FBQyxnQkFBdkIsQ0FBQSxFQURGO0tBQUEsY0FBQTthQUdFLE9BQU8sQ0FBQyxNQUFSLENBQUEsRUFIRjs7RUFEaUI7O3dCQU1uQixhQUFBLEdBQWUsU0FBQyxXQUFEO1dBQ1QsSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEVBQVUsTUFBVjtBQUNWLFVBQUE7QUFBQTtRQUNFLEdBQUEsR0FBTSxTQUFTLENBQUMsWUFBVixJQUEwQixTQUFTLENBQUM7ZUFDMUMsR0FBRyxDQUFDLElBQUosQ0FBUyxTQUFULEVBQW9CLFdBQXBCLEVBQWlDLE9BQWpDLEVBQTBDLE1BQTFDLEVBRkY7T0FBQSxjQUFBO2VBSUUsTUFBQSxDQUFBLEVBSkY7O0lBRFUsQ0FBUjtFQURTOzs7O0dBOU1TOztBQXNOMUIsSUFBZ0MsZ0RBQWhDO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsWUFBakI7OztBQUNBLE1BQU0sQ0FBQyxXQUFQLEdBQXFCOzs7O0FEaE5yQixJQUFBOzs7QUFBTSxPQUFPLENBQUM7QUFHYixNQUFBOzs7O0VBQUEsUUFBQyxDQUFDLE1BQUYsQ0FBUyxRQUFULEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQTtJQUFKLENBQUw7R0FERDs7RUFHYSxrQkFBQyxPQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBQ3RCLElBQUMsQ0FBQSxTQUFELGlEQUFxQixDQUFDLGdCQUFELENBQUMsWUFBYTtJQUNuQyxJQUFDLENBQUEsTUFBRCxnREFBcUIsQ0FBQyxjQUFELENBQUMsU0FBYTtJQUNuQyxJQUFDLENBQUEsS0FBRCwrQ0FBcUIsQ0FBQyxhQUFELENBQUMsUUFBYTs7TUFDbkMsSUFBQyxDQUFBLFVBQWtDOztJQUVuQyxJQUFDLENBQUEsY0FBRCxHQUFxQixJQUFDLENBQUEsTUFBSixHQUFnQixRQUFBLEdBQVMsSUFBQyxDQUFBLE1BQTFCLEdBQXdDO0lBQzFELDJDQUFBLFNBQUE7SUFFQSxJQUE2SCxJQUFDLENBQUEsS0FBOUg7TUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDRDQUFBLEdBQTZDLElBQUMsQ0FBQSxTQUE5QyxHQUF3RCx5QkFBeEQsR0FBaUYsSUFBQyxDQUFBLFNBQWxGLEdBQTRGLGtCQUF4RyxFQUFBOztJQUNBLElBQUMsQ0FBQyxRQUFGLENBQVcsWUFBWDtFQVZZOztFQWFiLE9BQUEsR0FBVSxTQUFDLE9BQUQsRUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLFFBQXhCLEVBQWtDLE1BQWxDLEVBQTBDLElBQTFDLEVBQWdELFVBQWhELEVBQTRELEtBQTVEO0FBRVQsUUFBQTtJQUFBLEdBQUEsR0FBTSxVQUFBLEdBQVcsT0FBWCxHQUFtQixpQkFBbkIsR0FBb0MsSUFBcEMsR0FBeUMsT0FBekMsR0FBZ0Q7SUFHdEQsSUFBTyxVQUFBLEtBQWMsTUFBckI7TUFDQyxJQUFHLFVBQVUsQ0FBQyxPQUFkO1FBQXNDLEdBQUEsSUFBTyxnQkFBN0M7O01BQ0EsSUFBRyxVQUFVLENBQUMsTUFBWCxLQUFxQixRQUF4QjtRQUFzQyxHQUFBLElBQU8saUJBQTdDOztBQUVBLGNBQU8sVUFBVSxDQUFDLEtBQWxCO0FBQUEsYUFDTSxRQUROO1VBQ29CLEdBQUEsSUFBTztBQUFyQjtBQUROLGFBRU0sUUFGTjtVQUVvQixHQUFBLElBQU87QUFGM0I7TUFJQSxJQUFHLE9BQU8sVUFBVSxDQUFDLFFBQWxCLEtBQThCLFFBQWpDO1FBQ0MsR0FBQSxJQUFPLFlBQUEsR0FBYSxVQUFVLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaLEVBQWdCLE9BQWhCLEVBRkQ7O01BSUEsSUFBdUQsT0FBTyxVQUFVLENBQUMsT0FBbEIsS0FBa0MsUUFBekY7UUFBQSxHQUFBLElBQU8sV0FBQSxHQUFjLEdBQWQsR0FBb0IsVUFBVSxDQUFDLE9BQS9CLEdBQXlDLElBQWhEOztNQUNBLElBQTZELE9BQU8sVUFBVSxDQUFDLFlBQWxCLEtBQWtDLFFBQS9GO1FBQUEsS0FBQSxDQUFNLEdBQUEsSUFBTyxnQkFBQSxHQUFpQixVQUFVLENBQUMsWUFBekMsRUFBQTs7TUFDQSxJQUF1RCxPQUFPLFVBQVUsQ0FBQyxXQUFsQixLQUFrQyxRQUF6RjtRQUFBLEdBQUEsSUFBTyxlQUFBLEdBQWdCLFVBQVUsQ0FBQyxZQUFsQzs7TUFDQSxJQUF1RCxPQUFPLFVBQVUsQ0FBQyxPQUFsQixLQUFrQyxRQUF6RjtRQUFBLEdBQUEsSUFBTyxXQUFBLEdBQVksVUFBVSxDQUFDLFFBQTlCOztNQUNBLElBQXVELE9BQU8sVUFBVSxDQUFDLEtBQWxCLEtBQWtDLFFBQXpGO1FBQUEsR0FBQSxJQUFPLFNBQUEsR0FBVSxVQUFVLENBQUMsTUFBNUI7O01BQ0EsSUFBdUQsT0FBTyxVQUFVLENBQUMsT0FBbEIsS0FBa0MsUUFBekY7UUFBQSxHQUFBLElBQU8sV0FBQSxHQUFZLFVBQVUsQ0FBQyxRQUE5QjtPQWpCRDs7SUFtQkEsS0FBQSxHQUFRLElBQUk7SUFDWixJQUF5RyxLQUF6RztNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQUEsR0FBa0IsTUFBbEIsR0FBeUIsd0JBQXpCLEdBQWdELENBQUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQUQsQ0FBaEQsR0FBc0UsYUFBdEUsR0FBbUYsR0FBbkYsR0FBdUYsR0FBbkcsRUFBQTs7SUFDQSxLQUFLLENBQUMsa0JBQU4sR0FBMkIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBRTFCLElBQU8sVUFBQSxLQUFjLE1BQXJCO1VBQ0MsSUFBRyxVQUFVLENBQUMsS0FBWCxLQUFvQixRQUFwQixJQUFnQyxPQUFPLFVBQVUsQ0FBQyxRQUFsQixLQUE4QixRQUFqRTtBQUErRSxtQkFBL0U7V0FERDs7QUFHQSxnQkFBTyxLQUFLLENBQUMsVUFBYjtBQUFBLGVBQ00sQ0FETjtZQUNhLElBQTBFLEtBQTFFO2NBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw2Q0FBQSxHQUE4QyxHQUE5QyxHQUFrRCxHQUE5RCxFQUFBOztBQUFQO0FBRE4sZUFFTSxDQUZOO1lBRWEsSUFBMEUsS0FBMUU7Y0FBQSxPQUFPLENBQUMsR0FBUixDQUFZLG1EQUFBLEdBQW9ELEdBQXBELEdBQXdELEdBQXBFLEVBQUE7O0FBQVA7QUFGTixlQUdNLENBSE47WUFHYSxJQUEwRSxLQUExRTtjQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0NBQUEsR0FBdUMsR0FBdkMsR0FBMkMsR0FBdkQsRUFBQTs7QUFBUDtBQUhOLGVBSU0sQ0FKTjtZQUlhLElBQTBFLEtBQTFFO2NBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx3Q0FBQSxHQUF5QyxHQUF6QyxHQUE2QyxHQUF6RCxFQUFBOztBQUFQO0FBSk4sZUFLTSxDQUxOO1lBTUUsSUFBNEMsZ0JBQTVDO2NBQUEsUUFBQSxDQUFTLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBSyxDQUFDLFlBQWpCLENBQVQsRUFBQTs7WUFDQSxJQUE0RyxLQUE1RztjQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkseUNBQUEsR0FBeUMsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxZQUFqQixDQUFELENBQXpDLEdBQXlFLGFBQXpFLEdBQXNGLEdBQXRGLEdBQTBGLEdBQXRHLEVBQUE7O0FBUEY7UUFTQSxJQUFHLEtBQUssQ0FBQyxNQUFOLEtBQWdCLEtBQW5CO1VBQ0MsSUFBNkUsS0FBN0U7bUJBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxxREFBQSxHQUFzRCxHQUF0RCxHQUEwRCxHQUF2RSxFQUFBO1dBREQ7O01BZDBCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQWtCM0IsS0FBSyxDQUFDLElBQU4sQ0FBVyxNQUFYLEVBQW1CLEdBQW5CLEVBQXdCLElBQXhCO0lBQ0EsS0FBSyxDQUFDLGdCQUFOLENBQXVCLGNBQXZCLEVBQXVDLGlDQUF2QztXQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBQSxHQUFPLEVBQUEsR0FBRSxDQUFDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUFELENBQXBCO0VBOUNTOztxQkFvRFYsR0FBQSxHQUFRLFNBQUMsSUFBRCxFQUFPLFFBQVAsRUFBdUIsVUFBdkI7V0FBc0MsT0FBQSxDQUFRLElBQUMsQ0FBQSxTQUFULEVBQW9CLElBQUMsQ0FBQSxjQUFyQixFQUFxQyxJQUFyQyxFQUEyQyxRQUEzQyxFQUFxRCxLQUFyRCxFQUErRCxJQUEvRCxFQUFxRSxVQUFyRSxFQUFpRixJQUFDLENBQUEsS0FBbEY7RUFBdEM7O3FCQUNSLEdBQUEsR0FBUSxTQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsUUFBYixFQUF1QixVQUF2QjtXQUFzQyxPQUFBLENBQVEsSUFBQyxDQUFBLFNBQVQsRUFBb0IsSUFBQyxDQUFBLGNBQXJCLEVBQXFDLElBQXJDLEVBQTJDLFFBQTNDLEVBQXFELEtBQXJELEVBQStELElBQS9ELEVBQXFFLFVBQXJFLEVBQWlGLElBQUMsQ0FBQSxLQUFsRjtFQUF0Qzs7cUJBQ1IsSUFBQSxHQUFRLFNBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxRQUFiLEVBQXVCLFVBQXZCO1dBQXNDLE9BQUEsQ0FBUSxJQUFDLENBQUEsU0FBVCxFQUFvQixJQUFDLENBQUEsY0FBckIsRUFBcUMsSUFBckMsRUFBMkMsUUFBM0MsRUFBcUQsTUFBckQsRUFBK0QsSUFBL0QsRUFBcUUsVUFBckUsRUFBaUYsSUFBQyxDQUFBLEtBQWxGO0VBQXRDOztxQkFDUixLQUFBLEdBQVEsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLFFBQWIsRUFBdUIsVUFBdkI7V0FBc0MsT0FBQSxDQUFRLElBQUMsQ0FBQSxTQUFULEVBQW9CLElBQUMsQ0FBQSxjQUFyQixFQUFxQyxJQUFyQyxFQUEyQyxRQUEzQyxFQUFxRCxPQUFyRCxFQUErRCxJQUEvRCxFQUFxRSxVQUFyRSxFQUFpRixJQUFDLENBQUEsS0FBbEY7RUFBdEM7O3NCQUNSLFFBQUEsR0FBUSxTQUFDLElBQUQsRUFBTyxRQUFQLEVBQXVCLFVBQXZCO1dBQXNDLE9BQUEsQ0FBUSxJQUFDLENBQUEsU0FBVCxFQUFvQixJQUFDLENBQUEsY0FBckIsRUFBcUMsSUFBckMsRUFBMkMsUUFBM0MsRUFBcUQsUUFBckQsRUFBK0QsSUFBL0QsRUFBcUUsVUFBckUsRUFBaUYsSUFBQyxDQUFBLEtBQWxGO0VBQXRDOztxQkFJUixRQUFBLEdBQVUsU0FBQyxJQUFELEVBQU8sUUFBUDtBQUdULFFBQUE7SUFBQSxJQUFHLElBQUEsS0FBUSxZQUFYO01BRUMsR0FBQSxHQUFNLFVBQUEsR0FBVyxJQUFDLENBQUEsU0FBWixHQUFzQix1QkFBdEIsR0FBNkMsSUFBQyxDQUFBO01BQ3BELGFBQUEsR0FBZ0I7TUFDaEIsTUFBQSxHQUFhLElBQUEsV0FBQSxDQUFZLEdBQVo7TUFFYixNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQy9CLElBQUcsYUFBQSxLQUFpQixjQUFwQjtZQUNDLEtBQUMsQ0FBQyxPQUFGLEdBQVk7WUFDWixJQUF5QixnQkFBekI7Y0FBQSxRQUFBLENBQVMsV0FBVCxFQUFBOztZQUNBLElBQXNGLEtBQUMsQ0FBQSxLQUF2RjtjQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNENBQUEsR0FBNkMsS0FBQyxDQUFBLFNBQTlDLEdBQXdELGVBQXBFLEVBQUE7YUFIRDs7aUJBSUEsYUFBQSxHQUFnQjtRQUxlO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQzthQU9BLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7VUFDaEMsSUFBRyxhQUFBLEtBQWlCLFdBQXBCO1lBQ0MsS0FBQyxDQUFDLE9BQUYsR0FBWTtZQUNaLElBQTRCLGdCQUE1QjtjQUFBLFFBQUEsQ0FBUyxjQUFULEVBQUE7O1lBQ0EsSUFBa0YsS0FBQyxDQUFBLEtBQW5GO2NBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSw0Q0FBQSxHQUE2QyxLQUFDLENBQUEsU0FBOUMsR0FBd0QsVUFBckUsRUFBQTthQUhEOztpQkFJQSxhQUFBLEdBQWdCO1FBTGdCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQyxFQWJEO0tBQUEsTUFBQTtNQXVCQyxHQUFBLEdBQU0sVUFBQSxHQUFXLElBQUMsQ0FBQSxTQUFaLEdBQXNCLGlCQUF0QixHQUF1QyxJQUF2QyxHQUE0QyxPQUE1QyxHQUFtRCxJQUFDLENBQUE7TUFDMUQsTUFBQSxHQUFhLElBQUEsV0FBQSxDQUFZLEdBQVo7TUFDYixJQUFtRixJQUFDLENBQUEsS0FBcEY7UUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDBDQUFBLEdBQTJDLElBQTNDLEdBQWdELGFBQWhELEdBQTZELEdBQTdELEdBQWlFLEdBQTdFLEVBQUE7O01BRUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLEtBQXhCLEVBQStCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxFQUFEO1VBQzlCLElBQXNILGdCQUF0SDtZQUFBLFFBQUEsQ0FBUyxJQUFJLENBQUMsS0FBTCxDQUFXLEVBQUUsQ0FBQyxJQUFkLENBQW1CLENBQUMsSUFBN0IsRUFBbUMsS0FBbkMsRUFBMEMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFFLENBQUMsSUFBZCxDQUFtQixDQUFDLElBQTlELEVBQW9FLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFFLENBQUMsSUFBZCxDQUFtQixDQUFDLElBQUksQ0FBQyxLQUF6QixDQUErQixHQUEvQixDQUFQLEVBQTJDLENBQTNDLENBQXBFLEVBQUE7O1VBQ0EsSUFBc0gsS0FBQyxDQUFBLEtBQXZIO21CQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0NBQUEsR0FBdUMsSUFBdkMsR0FBNEMsZUFBNUMsR0FBMEQsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFXLEVBQUUsQ0FBQyxJQUFkLENBQW1CLENBQUMsSUFBckIsQ0FBMUQsR0FBb0YsWUFBcEYsR0FBZ0csR0FBaEcsR0FBb0csR0FBaEgsRUFBQTs7UUFGOEI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9CO2FBSUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxFQUFEO1VBQ2hDLElBQXdILGdCQUF4SDtZQUFBLFFBQUEsQ0FBUyxJQUFJLENBQUMsS0FBTCxDQUFXLEVBQUUsQ0FBQyxJQUFkLENBQW1CLENBQUMsSUFBN0IsRUFBbUMsT0FBbkMsRUFBNEMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFFLENBQUMsSUFBZCxDQUFtQixDQUFDLElBQWhFLEVBQXNFLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFFLENBQUMsSUFBZCxDQUFtQixDQUFDLElBQUksQ0FBQyxLQUF6QixDQUErQixHQUEvQixDQUFQLEVBQTJDLENBQTNDLENBQXRFLEVBQUE7O1VBQ0EsSUFBd0gsS0FBQyxDQUFBLEtBQXpIO21CQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0NBQUEsR0FBdUMsSUFBdkMsR0FBNEMsaUJBQTVDLEdBQTRELENBQUMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFFLENBQUMsSUFBZCxDQUFtQixDQUFDLElBQXJCLENBQTVELEdBQXNGLFlBQXRGLEdBQWtHLEdBQWxHLEdBQXNHLEdBQWxILEVBQUE7O1FBRmdDO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQyxFQS9CRDs7RUFIUzs7OztHQS9Fb0IsTUFBTSxDQUFDOzs7O0FEUHRDLElBQUEsd0JBQUE7RUFBQTs7O0FBQUEsT0FBTyxDQUFDLGFBQVIsR0FBNEIsSUFBQSxLQUFBLENBQzNCO0VBQUEsQ0FBQSxFQUFFLENBQUY7RUFBSyxDQUFBLEVBQUUsTUFBTSxDQUFDLE1BQWQ7RUFBc0IsS0FBQSxFQUFNLE1BQU0sQ0FBQyxLQUFuQztFQUEwQyxNQUFBLEVBQU8sR0FBakQ7RUFDQSxJQUFBLEVBQUssd0RBREw7Q0FEMkI7O0FBSzVCLFdBQUEsR0FBYyxNQUFNLENBQUMsS0FBUCxHQUFlOztBQUM3QixXQUFBLEdBQWMsV0FBQSxHQUFjOztBQUU1QixPQUFPLENBQUMsYUFBYSxDQUFDLE1BQXRCLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxDQUFBLEVBQUcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsV0FBbkI7R0FERDs7O0FBR0QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQTdCLEdBQ0M7RUFBQSxLQUFBLEVBQU8sbUJBQVA7OztBQUVLLE9BQU8sQ0FBQzs7O0VBQ2IsS0FBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxLQUFLLENBQUM7SUFBVixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFoQixFQUF1QixLQUF2QjtJQURJLENBREw7R0FERDs7RUFLQSxLQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUFWLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQ0osSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLEdBQWU7SUFEWCxDQURMO0dBREQ7O0VBS2EsZUFBQyxPQUFEOztNQUFDLFVBQVU7OztNQUN2QixPQUFPLENBQUMsUUFBUzs7O01BQ2pCLE9BQU8sQ0FBQyxRQUFTLE1BQU0sQ0FBQzs7O01BQ3hCLE9BQU8sQ0FBQyxPQUFROzs7TUFDaEIsT0FBTyxDQUFDLFNBQVU7OztNQUNsQixPQUFPLENBQUMsa0JBQXNCLE9BQU8sQ0FBQyxLQUFYLEdBQXNCLHVCQUF0QixHQUFtRDs7O01BQzlFLE9BQU8sQ0FBQyxXQUFZOzs7TUFDcEIsT0FBTyxDQUFDLGFBQWM7OztNQUN0QixPQUFPLENBQUMsVUFBVzs7O01BQ25CLE9BQU8sQ0FBQyxPQUFROzs7TUFDaEIsT0FBTyxDQUFDLGNBQWU7OztNQUN2QixPQUFPLENBQUMsa0JBQXNCLEtBQUssQ0FBQyxRQUFOLENBQUEsQ0FBSCxHQUF5QixLQUF6QixHQUFvQzs7O01BQy9ELE9BQU8sQ0FBQyxPQUFROzs7TUFDaEIsT0FBTyxDQUFDLFdBQVk7OztNQUNwQixPQUFPLENBQUMsY0FBZTs7O01BQ3ZCLE9BQU8sQ0FBQyxlQUFnQjs7O01BQ3hCLE9BQU8sQ0FBQyxpQkFBa0I7OztNQUMxQixPQUFPLENBQUMsYUFBYzs7O01BQ3RCLE9BQU8sQ0FBQyxZQUFhOztJQUVyQix1Q0FBTSxPQUFOO0lBRUEsSUFBZ0QsZ0NBQWhEO01BQUEsSUFBQyxDQUFBLGdCQUFELEdBQW9CLE9BQU8sQ0FBQyxpQkFBNUI7O0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QjtJQUNULElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBUCxHQUFZLFFBQUEsR0FBUSxDQUFDLENBQUMsQ0FBQyxHQUFGLENBQUEsQ0FBRDtJQUNwQixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFiLEdBQXVCLDRCQUFBLEdBQTZCLE9BQU8sQ0FBQyxRQUFyQyxHQUE4QyxtQkFBOUMsR0FBaUUsT0FBTyxDQUFDLFVBQXpFLEdBQW9GLGVBQXBGLEdBQW1HLE9BQU8sQ0FBQyxPQUEzRyxHQUFtSCxhQUFuSCxHQUFnSSxPQUFPLENBQUMsS0FBeEksR0FBOEksY0FBOUksR0FBNEosT0FBTyxDQUFDLE1BQXBLLEdBQTJLLDBFQUEzSyxHQUFxUCxPQUFPLENBQUMsZUFBN1AsR0FBNlE7SUFDcFMsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLEdBQWUsT0FBTyxDQUFDO0lBQ3ZCLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFjLE9BQU8sQ0FBQztJQUN0QixJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsR0FBcUIsT0FBTyxDQUFDO0lBQzdCLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixhQUFwQixFQUFtQyxPQUFPLENBQUMsV0FBM0M7SUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLFlBQVAsQ0FBb0IsY0FBcEIsRUFBb0MsT0FBTyxDQUFDLFlBQTVDO0lBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFQLENBQW9CLGdCQUFwQixFQUFzQyxPQUFPLENBQUMsY0FBOUM7SUFDQSxJQUFHLE9BQU8sQ0FBQyxTQUFSLEtBQXFCLElBQXhCO01BQ0MsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFQLENBQW9CLFdBQXBCLEVBQWlDLElBQWpDLEVBREQ7O0lBRUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFQLENBQW9CLFlBQXBCLEVBQWtDLE9BQU8sQ0FBQyxVQUExQztJQUNBLElBQUMsQ0FBQSxJQUFELEdBQVEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkI7SUFFUixJQUFHLE9BQU8sQ0FBQyxRQUFYO01BQ0MsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWU7TUFDZixJQUFDLENBQUEsSUFBSSxDQUFDLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFNBQUMsS0FBRDtlQUNoQyxLQUFLLENBQUMsY0FBTixDQUFBO01BRGdDLENBQWpDLEVBRkQ7O0lBS0EsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQWtCLElBQUMsQ0FBQSxLQUFuQjtJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsV0FBVixDQUFzQixJQUFDLENBQUEsSUFBdkI7SUFFQSxJQUFDLENBQUEsZUFBRCxHQUFtQjtJQUNuQixJQUFvRCxJQUFDLENBQUEsZ0JBQXJEO01BQUEsSUFBQyxDQUFBLHNCQUFELENBQXdCLE9BQU8sQ0FBQyxnQkFBaEMsRUFBQTs7SUFJQSxJQUFHLENBQUMsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFELElBQXFCLE9BQU8sQ0FBQyxlQUFSLEtBQTJCLElBQW5EO01BQ0MsSUFBQyxDQUFBLEtBQUssQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxTQUFBO1FBQ2hDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBdEIsQ0FBQTtlQUNBLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBdEIsQ0FBQTtNQUZnQyxDQUFqQztNQUdBLElBQUMsQ0FBQSxLQUFLLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsU0FBQTtlQUMvQixPQUFPLENBQUMsYUFBYSxDQUFDLE9BQXRCLENBQThCLFNBQTlCO01BRCtCLENBQWhDLEVBSkQ7O0VBbERZOztrQkF5RGIsc0JBQUEsR0FBd0IsU0FBQyxLQUFEO0FBQ3ZCLFFBQUE7SUFBQSxJQUFDLENBQUEsZ0JBQUQsR0FBb0I7SUFDcEIsSUFBRyxzQkFBSDtNQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixJQUFDLENBQUEsU0FBM0IsRUFERDs7SUFFQSxJQUFDLENBQUEsU0FBRCxHQUFhLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCO0lBQ2IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLEdBQWtCO0lBQ2xCLEdBQUEsR0FBTSxHQUFBLEdBQUksSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFYLEdBQWMsdUNBQWQsR0FBcUQsSUFBQyxDQUFBLGdCQUF0RCxHQUF1RTtJQUM3RSxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBdUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsR0FBeEIsQ0FBdkI7V0FDQSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsSUFBQyxDQUFBLFNBQTNCO0VBUnVCOztrQkFVeEIsS0FBQSxHQUFPLFNBQUE7V0FDTixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBQTtFQURNOztrQkFHUCxPQUFBLEdBQVMsU0FBQyxFQUFEO1dBQ1IsSUFBQyxDQUFBLEtBQUssQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxTQUFBO2FBQ2hDLEVBQUUsQ0FBQyxLQUFILENBQVMsSUFBVDtJQURnQyxDQUFqQztFQURROztrQkFJVCxNQUFBLEdBQVEsU0FBQyxFQUFEO1dBQ1AsSUFBQyxDQUFBLEtBQUssQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxTQUFBO2FBQy9CLEVBQUUsQ0FBQyxLQUFILENBQVMsSUFBVDtJQUQrQixDQUFoQztFQURPOzs7O0dBckZtQjs7OztBRFg1QixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIn0=
