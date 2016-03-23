var BMapLib = window.BMapLib = BMapLib || {},
	BMAP_DRAWING_MARKER = "marker",
	BMAP_DRAWING_POLYLINE = "polyline",
	BMAP_DRAWING_CIRCLE = "circle",
	BMAP_DRAWING_RECTANGLE = "rectangle",
	BMAP_DRAWING_POLYGON = "polygon";
! function() {
	function e() {
		this._enableEdgeMove = !1
	}

	function t(e, t) {
		this.drawingManager = e, t = this.drawingToolOptions = t || {}, this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT, this.defaultOffset = new BMap.Size(10, 10), this.defaultDrawingModes = [BMAP_DRAWING_MARKER, BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYLINE, BMAP_DRAWING_POLYGON, BMAP_DRAWING_RECTANGLE], t.drawingModes ? this.drawingModes = t.drawingModes : this.drawingModes = this.defaultDrawingModes, t.anchor && this.setAnchor(t.anchor), t.offset && this.setOffset(t.offset)
	}

	function n(e) {
		for (var t = a.length; t--;) a[t] != e && a[t].close()
	}
	var i = i || {
		guid: "$BAIDU$"
	};
	! function() {
		window[i.guid] = {}, i.extend = function(e, t) {
			for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			return e
		}, i.lang = i.lang || {}, i.lang.guid = function() {
			return "TANGRAM__" + (window[i.guid]._counter++).toString(36)
		}, window[i.guid]._counter = window[i.guid]._counter || 1, window[i.guid]._instances = window[i.guid]._instances || {}, i.lang.Class = function(e) {
			this.guid = e || i.lang.guid(), window[i.guid]._instances[this.guid] = this
		}, window[i.guid]._instances = window[i.guid]._instances || {}, i.lang.isString = function(e) {
			return "[object String]" == Object.prototype.toString.call(e)
		}, i.lang.isFunction = function(e) {
			return "[object Function]" == Object.prototype.toString.call(e)
		}, i.lang.Class.prototype.toString = function() {
			return "[object " + (this._className || "Object") + "]"
		}, i.lang.Class.prototype.dispose = function() {
			delete window[i.guid]._instances[this.guid];
			for (var e in this) i.lang.isFunction(this[e]) || delete this[e];
			this.disposed = !0
		}, i.lang.Event = function(e, t) {
			this.type = e, this.returnValue = !0, this.target = t || null, this.currentTarget = null
		}, i.lang.Class.prototype.addEventListener = function(e, t, n) {
			if (i.lang.isFunction(t)) {
				!this.__listeners && (this.__listeners = {});
				var o, a = this.__listeners;
				if ("string" == typeof n && n) {
					if (/[^\w\-]/.test(n)) throw "nonstandard key:" + n;
					t.hashCode = n, o = n
				}
				0 != e.indexOf("on") && (e = "on" + e), "object" != typeof a[e] && (a[e] = {}), o = o || i.lang.guid(), t.hashCode = o, a[e][o] = t
			}
		}, i.lang.Class.prototype.removeEventListener = function(e, t) {
			if (i.lang.isFunction(t)) t = t.hashCode;
			else if (!i.lang.isString(t)) return;
			!this.__listeners && (this.__listeners = {}), 0 != e.indexOf("on") && (e = "on" + e);
			var n = this.__listeners;
			n[e] && n[e][t] && delete n[e][t]
		}, i.lang.Class.prototype.dispatchEvent = function(e, t) {
			i.lang.isString(e) && (e = new i.lang.Event(e)), !this.__listeners && (this.__listeners = {}), t = t || {};
			for (var n in t) e[n] = t[n];
			var n, o = this.__listeners,
				a = e.type;
			if (e.target = e.target || this, e.currentTarget = this, 0 != a.indexOf("on") && (a = "on" + a), i.lang.isFunction(this[a]) && this[a].apply(this, arguments), "object" == typeof o[a])
				for (n in o[a]) o[a][n].apply(this, arguments);
			return e.returnValue
		}, i.lang.inherits = function(e, t, n) {
			var i, o, a = e.prototype,
				s = new Function;
			s.prototype = t.prototype, o = e.prototype = new s;
			for (i in a) o[i] = a[i];
			e.prototype.constructor = e, e.superClass = t.prototype, "string" == typeof n && (o._className = n)
		}, i.dom = i.dom || {}, i._g = i.dom._g = function(e) {
			return i.lang.isString(e) ? document.getElementById(e) : e
		}, i.g = i.dom.g = function(e) {
			return "string" == typeof e || e instanceof String ? document.getElementById(e) : e && e.nodeName && (1 == e.nodeType || 9 == e.nodeType) ? e : null
		}, i.insertHTML = i.dom.insertHTML = function(e, t, n) {
			e = i.dom.g(e);
			var o, a;
			return e.insertAdjacentHTML ? e.insertAdjacentHTML(t, n) : (o = e.ownerDocument.createRange(), t = t.toUpperCase(), "AFTERBEGIN" == t || "BEFOREEND" == t ? (o.selectNodeContents(e), o.collapse("AFTERBEGIN" == t)) : (a = "BEFOREBEGIN" == t, o[a ? "setStartBefore" : "setEndAfter"](e), o.collapse(a)), o.insertNode(o.createContextualFragment(n))), e
		}, i.ac = i.dom.addClass = function(e, t) {
			e = i.dom.g(e);
			for (var n = t.split(/\s+/), o = e.className, a = " " + o + " ", s = 0, r = n.length; r > s; s++) a.indexOf(" " + n[s] + " ") < 0 && (o += (o ? " " : "") + n[s]);
			return e.className = o, e
		}, i.event = i.event || {}, i.event._listeners = i.event._listeners || [], i.on = i.event.on = function(e, t, n) {
			t = t.replace(/^on/i, ""), e = i._g(e);
			var o, a = function(t) {
					n.call(e, t)
				},
				s = i.event._listeners,
				r = i.event._eventFilter,
				l = t;
			return t = t.toLowerCase(), r && r[t] && (o = r[t](e, t, a), l = o.type, a = o.listener), e.addEventListener ? e.addEventListener(l, a, !1) : e.attachEvent && e.attachEvent("on" + l, a), s[s.length] = [e, t, n, a, l], e
		}, i.un = i.event.un = function(e, t, n) {
			e = i._g(e), t = t.replace(/^on/i, "").toLowerCase();
			for (var o, a, s, r = i.event._listeners, l = r.length, p = !n; l--;) o = r[l], o[1] !== t || o[0] !== e || !p && o[2] !== n || (a = o[4], s = o[3], e.removeEventListener ? e.removeEventListener(a, s, !1) : e.detachEvent && e.detachEvent("on" + a, s), r.splice(l, 1));
			return e
		}, i.getEvent = i.event.getEvent = function(e) {
			return window.event || e
		}, i.getTarget = i.event.getTarget = function(e) {
			var e = i.getEvent(e);
			return e.target || e.srcElement
		}, i.preventDefault = i.event.preventDefault = function(e) {
			var e = i.getEvent(e);
			e.preventDefault ? e.preventDefault() : e.returnValue = !1
		}, i.stopBubble = i.event.stopBubble = function(e) {
			e = i.getEvent(e), e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
		}, i.browser = i.browser || {}, /msie (\d+\.\d)/i.test(navigator.userAgent) && (i.browser.ie = i.ie = document.documentMode || +RegExp.$1)
	}();
	var o = BMapLib.DrawingManager = function(e, t) {
		e && (a.push(this), t = t || {}, this._initialize(e, t))
	};
	i.lang.inherits(o, i.lang.Class, "DrawingManager"), o.prototype.open = function() {
		return 1 == this._isOpen ? !0 : (n(this), void this._open())
	}, o.prototype.close = function() {
		if (0 == this._isOpen) return !0;
		var e = this;
		this._close(), setTimeout(function() {
			e._map.enableDoubleClickZoom()
		}, 2e3)
	}, o.prototype.setDrawingMode = function(e) {
		this._drawingType != e && (n(this), this._setDrawingMode(e))
	}, o.prototype.getDrawingMode = function() {
		return this._drawingType
	}, o.prototype.enableCalculate = function() {
		this._enableCalculate = !0, this._addGeoUtilsLibrary()
	}, o.prototype.disableCalculate = function() {
		this._enableCalculate = !1
	}, o.prototype._initialize = function(e, n) {
		if (this._map = e, this._opts = n, this._drawingType = n.drawingMode || BMAP_DRAWING_MARKER, n.enableDrawingTool) {
			var i = new t(this, n.drawingToolOptions);
			this._drawingTool = i, e.addControl(i)
		}
		n.enableCalculate === !0 ? this.enableCalculate() : this.disableCalculate(), this._isOpen = !(n.isOpen !== !0), this._isOpen && this._open(), this.markerOptions = n.markerOptions || {}, this.circleOptions = n.circleOptions || {}, this.polylineOptions = n.polylineOptions || {}, this.polygonOptions = n.polygonOptions || {}, this.rectangleOptions = n.rectangleOptions || {}, this.controlButton = "right" == n.controlButton ? "right" : "left"
	}, o.prototype._open = function() {
		this._isOpen = !0, this._mask || (this._mask = new e), this._map.addOverlay(this._mask), this._setDrawingMode(this._drawingType)
	}, o.prototype._setDrawingMode = function(e) {
		if (this._drawingType = e, this._isOpen) switch (this._mask.__listeners = {}, e) {
			case BMAP_DRAWING_MARKER:
				this._bindMarker();
				break;
			case BMAP_DRAWING_CIRCLE:
				this._bindCircle();
				break;
			case BMAP_DRAWING_POLYLINE:
			case BMAP_DRAWING_POLYGON:
				this._bindPolylineOrPolygon();
				break;
			case BMAP_DRAWING_RECTANGLE:
				this._bindRectangle()
		}
		this._drawingTool && this._isOpen && this._drawingTool.setStyleByDrawingMode(e)
	}, o.prototype._close = function() {
		this._isOpen = !1, this._mask && this._map.removeOverlay(this._mask), this._drawingTool && this._drawingTool.setStyleByDrawingMode("hander")
	}, o.prototype._bindMarker = function() {
		var e = this,
			t = this._map,
			n = this._mask,
			i = function(n) {
				var i = new BMap.Marker(n.point, e.markerOptions);
				t.addOverlay(i), e._dispatchOverlayComplete(i)
			};
		n.addEventListener("click", i)
	}, o.prototype._bindCircle = function() {
		var e = this,
			t = this._map,
			n = this._mask,
			o = null,
			a = null,
			s = function(s) {
				("right" != e.controlButton || 1 != s.button && 0 != s.button) && (a = s.point, o = new BMap.Circle(a, 0, e.circleOptions), t.addOverlay(o), n.enableEdgeMove(), n.addEventListener("mousemove", r), i.on(document, "mouseup", l))
			},
			r = function(t) {
				o.setRadius(e._map.getDistance(a, t.point))
			},
			l = function(t) {
				var s = e._calculate(o, t.point);
				e._dispatchOverlayComplete(o, s), a = null, n.disableEdgeMove(), n.removeEventListener("mousemove", r), i.un(document, "mouseup", l)
			},
			p = function(t) {
				i.preventDefault(t), i.stopBubble(t), "right" == e.controlButton && 1 == t.button || null == a && s(t)
			};
		n.addEventListener("mousedown", p)
	}, o.prototype._bindPolylineOrPolygon = function() {
		var e = this,
			t = this._map,
			n = this._mask,
			o = [],
			a = null;
		overlay = null, isBinded = !1;
		var s = function(i) {
				("right" != e.controlButton || 1 != i.button && 0 != i.button) && (o.push(i.point), a = o.concat(o[o.length - 1]), 1 == o.length ? (e._drawingType == BMAP_DRAWING_POLYLINE ? overlay = new BMap.Polyline(a, e.polylineOptions) : e._drawingType == BMAP_DRAWING_POLYGON && (overlay = new BMap.Polygon(a, e.polygonOptions)), t.addOverlay(overlay)) : overlay.setPath(a), isBinded || (isBinded = !0, n.enableEdgeMove(), n.addEventListener("mousemove", r), n.addEventListener("dblclick", l)))
			},
			r = function(e) {
				overlay.setPositionAt(a.length - 1, e.point)
			},
			l = function(t) {
				i.stopBubble(t), isBinded = !1, n.disableEdgeMove(), n.removeEventListener("mousedown", s), n.removeEventListener("mousemove", r), n.removeEventListener("dblclick", l), "right" == e.controlButton ? o.push(t.point) : i.ie <= 8 || o.pop(), overlay.setPath(o);
				var p = e._calculate(overlay, o.pop());
				e._dispatchOverlayComplete(overlay, p), o.length = 0, a.length = 0, e.close()
			};
		n.addEventListener("mousedown", s), n.addEventListener("dblclick", function(e) {
			i.stopBubble(e)
		})
	}, o.prototype._bindRectangle = function() {
		var e = this,
			t = this._map,
			n = this._mask,
			o = null,
			a = null,
			s = function(s) {
				if (i.stopBubble(s), i.preventDefault(s), "right" != e.controlButton || 1 != s.button && 0 != s.button) {
					a = s.point;
					var p = a;
					o = new BMap.Polygon(e._getRectanglePoint(a, p), e.rectangleOptions), t.addOverlay(o), n.enableEdgeMove(), n.addEventListener("mousemove", r), i.on(document, "mouseup", l)
				}
			},
			r = function(t) {
				o.setPath(e._getRectanglePoint(a, t.point))
			},
			l = function(t) {
				var s = e._calculate(o, o.getPath()[2]);
				e._dispatchOverlayComplete(o, s), a = null, n.disableEdgeMove(), n.removeEventListener("mousemove", r), i.un(document, "mouseup", l)
			};
		n.addEventListener("mousedown", s)
	}, o.prototype._calculate = function(e, t) {
		var n = {
			data: 0,
			label: null
		};
		if (this._enableCalculate && BMapLib.GeoUtils) {
			var i = e.toString();
			switch (i) {
				case "[object Polyline]":
					n.data = BMapLib.GeoUtils.getPolylineDistance(e);
					break;
				case "[object Polygon]":
					n.data = BMapLib.GeoUtils.getPolygonArea(e);
					break;
				case "[object Circle]":
					var o = e.getRadius();
					n.data = Math.PI * o * o
			}!n.data || n.data < 0 ? n.data = 0 : n.data = n.data.toFixed(2), n.label = this._addLabel(t, n.data)
		}
		return n
	}, o.prototype._addGeoUtilsLibrary = function() {
		if (!BMapLib.GeoUtils) {
			var e = document.createElement("script");
			e.setAttribute("type", "text/javascript"), e.setAttribute("src", "http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js"), document.body.appendChild(e)
		}
	}, o.prototype._addLabel = function(e, t) {
		var n = new BMap.Label(t, {
			position: e
		});
		return this._map.addOverlay(n), n
	}, o.prototype._getRectanglePoint = function(e, t) {
		return [new BMap.Point(e.lng, e.lat), new BMap.Point(t.lng, e.lat), new BMap.Point(t.lng, t.lat), new BMap.Point(e.lng, t.lat)]
	}, o.prototype._dispatchOverlayComplete = function(e, t) {
		var n = {
			overlay: e,
			drawingMode: this._drawingType
		};
		t && (n.calculate = t.data || null, n.label = t.label || null), this.dispatchEvent(this._drawingType + "complete", e), this.dispatchEvent("overlaycomplete", n)
	}, e.prototype = new BMap.Overlay, e.prototype.dispatchEvent = i.lang.Class.prototype.dispatchEvent, e.prototype.addEventListener = i.lang.Class.prototype.addEventListener, e.prototype.removeEventListener = i.lang.Class.prototype.removeEventListener, e.prototype.initialize = function(e) {
		var t = this;
		this._map = e;
		var n = this.container = document.createElement("div"),
			i = this._map.getSize();
		return n.style.cssText = "position:absolute;background:url(about:blank);cursor:crosshair;width:" + i.width + "px;height:" + i.height + "px", this._map.addEventListener("resize", function(e) {
			t._adjustSize(e.size)
		}), this._map.getPanes().floatPane.appendChild(n), this._bind(), n
	}, e.prototype.draw = function() {
		var e = this._map,
			t = e.pixelToPoint(new BMap.Pixel(0, 0)),
			n = e.pointToOverlayPixel(t);
		this.container.style.left = n.x + "px", this.container.style.top = n.y + "px"
	}, e.prototype.enableEdgeMove = function() {
		this._enableEdgeMove = !0
	}, e.prototype.disableEdgeMove = function() {
		clearInterval(this._edgeMoveTimer), this._enableEdgeMove = !1
	}, e.prototype._bind = function() {
		for (var e = this, t = (this._map, this.container), n = null, o = null, a = function(e) {
				return {
					x: e.clientX,
					y: e.clientY
				}
			}, s = function(t) {
				var s = t.type;
				t = i.getEvent(t), point = e.getDrawPoint(t);
				var r = function(n) {
					t.point = point, e.dispatchEvent(t)
				};
				"mousedown" == s && (n = a(t));
				var l = a(t);
				"click" == s ? Math.abs(l.x - n.x) < 5 && Math.abs(l.y - n.y) < 5 && (o && Math.abs(l.x - o.x) < 5 && Math.abs(l.y - o.y) < 5 ? o = null : (r("click"), o = a(t))) : r(s)
			}, r = ["click", "mousedown", "mousemove", "mouseup", "dblclick"], l = r.length; l--;) i.on(t, r[l], s);
		i.on(t, "mousemove", function(t) {
			e._enableEdgeMove && e.mousemoveAction(t)
		})
	}, e.prototype.mousemoveAction = function(e) {
		function t(e) {
			var t = e.clientX,
				n = e.clientY;
			return e.changedTouches && (t = e.changedTouches[0].clientX, n = e.changedTouches[0].clientY), new BMap.Pixel(t, n)
		}
		var n = this._map,
			i = this,
			o = n.pointToPixel(this.getDrawPoint(e)),
			a = t(e),
			s = a.x - o.x,
			r = a.y - o.y;
		o = new BMap.Pixel(a.x - s, a.y - r), this._draggingMovePixel = o;
		n.pixelToPoint(o);
		this._panByX = this._panByY = 0, o.x <= 20 || o.x >= n.width - 20 || o.y <= 50 || o.y >= n.height - 10 ? (o.x <= 20 ? this._panByX = 8 : o.x >= n.width - 20 && (this._panByX = -8), o.y <= 50 ? this._panByY = 8 : o.y >= n.height - 10 && (this._panByY = -8), this._edgeMoveTimer || (this._edgeMoveTimer = setInterval(function() {
			n.panBy(i._panByX, i._panByY, {
				noAnimation: !0
			})
		}, 30))) : this._edgeMoveTimer && (clearInterval(this._edgeMoveTimer), this._edgeMoveTimer = null)
	}, e.prototype._adjustSize = function(e) {
		this.container.style.width = e.width + "px", this.container.style.height = e.height + "px"
	}, e.prototype.getDrawPoint = function(e) {
		var t = this._map,
			n = i.getTarget(e),
			o = e.offsetX || e.layerX || 0,
			a = e.offsetY || e.layerY || 0;
		for (1 != n.nodeType && (n = n.parentNode); n && n != t.getContainer();) 0 == n.clientWidth && 0 == n.clientHeight && n.offsetParent && "TD" == n.offsetParent.nodeName || (o += n.offsetLeft || 0, a += n.offsetTop || 0), n = n.offsetParent;
		var s = new BMap.Pixel(o, a),
			r = t.pixelToPoint(s);
		return r
	}, t.prototype = new BMap.Control, t.prototype.initialize = function(e) {
		var t = this.container = document.createElement("div");
		t.className = "BMapLib_Drawing";
		var n = this.panel = document.createElement("div");
		return n.className = "BMapLib_Drawing_panel", this.drawingToolOptions && this.drawingToolOptions.scale && this._setScale(this.drawingToolOptions.scale), t.appendChild(n), n.innerHTML = this._generalHtml(), this._bind(n), e.getContainer().appendChild(t), t
	}, t.prototype._generalHtml = function(e) {
		var t = {};
		t.hander = "拖动", t[BMAP_DRAWING_MARKER] = "标记", t[BMAP_DRAWING_CIRCLE] = "圆", t[BMAP_DRAWING_POLYLINE] = "折线", t[BMAP_DRAWING_POLYGON] = "多边形", t[BMAP_DRAWING_RECTANGLE] = "矩阵";
		var n = function(e, n) {
				return '<a class="' + e + '" drawingType="' + n + '" href="javascript:void(0)" title="' + t[n] + '" onfocus="this.blur()"></a>'
			},
			i = [];
		i.push(n("BMapLib_box BMapLib_hander", "hander"));
		for (var o = 0, a = this.drawingModes.length; a > o; o++) {
			var s = "BMapLib_box BMapLib_" + this.drawingModes[o];
			o == a - 1 && (s += " BMapLib_last"), i.push(n(s, this.drawingModes[o]))
		}
		return i.join("")
	}, t.prototype._setScale = function(e) {
		var t = 390,
			n = 50,
			i = -parseInt((t - t * e) / 2, 10),
			o = -parseInt((n - n * e) / 2, 10);
		this.container.style.cssText = ["-moz-transform: scale(" + e + ");", "-o-transform: scale(" + e + ");", "-webkit-transform: scale(" + e + ");", "transform: scale(" + e + ");", "margin-left:" + i + "px;", "margin-top:" + o + "px;", "*margin-left:0px;", "*margin-top:0px;", "margin-left:0px\\0;", "margin-top:0px\\0;", "filter: progid:DXImageTransform.Microsoft.Matrix(", "M11=" + e + ",", "M12=0,", "M21=0,", "M22=" + e + ",", "SizingMethod='auto expand');"].join("")
	}, t.prototype._bind = function(e) {
		var t = this;
		i.on(this.panel, "click", function(e) {
			var n = i.getTarget(e),
				o = n.getAttribute("drawingType");
			t.setStyleByDrawingMode(o), t._bindEventByDraingMode(o)
		})
	}, t.prototype.setStyleByDrawingMode = function(e) {
		if (e)
			for (var t = this.panel.getElementsByTagName("a"), n = 0, i = t.length; i > n; n++) {
				var o = t[n];
				if (o.getAttribute("drawingType") == e) {
					var a = "BMapLib_box BMapLib_" + e + "_hover";
					n == i - 1 && (a += " BMapLib_last"), o.className = a
				} else o.className = o.className.replace(/_hover/, "")
			}
	}, t.prototype._bindEventByDraingMode = function(e) {
		var t = this.drawingManager;
		"hander" == e ? (t.close(), t._map.enableDoubleClickZoom()) : (t.setDrawingMode(e), t.open(), t._map.disableDoubleClickZoom())
	};
	var a = []
}();