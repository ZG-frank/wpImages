var BMapLib = window.BMapLib = BMapLib || {};
! function() {
	function t(t) {
		var t = window.event || t;
		t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
	}
	var e = e || {
		guid: "$BAIDU$"
	};
	! function() {
		window[e.guid] = {}, e.extend = function(t, e) {
			for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
			return t
		}, e.lang = e.lang || {}, e.lang.guid = function() {
			return "TANGRAM__" + (window[e.guid]._counter++).toString(36)
		}, window[e.guid]._counter = window[e.guid]._counter || 1, window[e.guid]._instances = window[e.guid]._instances || {}, e.lang.Class = function(t) {
			this.guid = t || e.lang.guid(), window[e.guid]._instances[this.guid] = this
		}, window[e.guid]._instances = window[e.guid]._instances || {}, e.lang.isString = function(t) {
			return "[object String]" == Object.prototype.toString.call(t)
		}, e.lang.isFunction = function(t) {
			return "[object Function]" == Object.prototype.toString.call(t)
		}, e.lang.Class.prototype.toString = function() {
			return "[object " + (this._className || "Object") + "]"
		}, e.lang.Class.prototype.dispose = function() {
			delete window[e.guid]._instances[this.guid];
			for (var t in this) e.lang.isFunction(this[t]) || delete this[t];
			this.disposed = !0
		}, e.lang.Event = function(t, e) {
			this.type = t, this.returnValue = !0, this.target = e || null, this.currentTarget = null
		}, e.lang.Class.prototype.addEventListener = function(t, i, n) {
			if (e.lang.isFunction(i)) {
				!this.__listeners && (this.__listeners = {});
				var s, o = this.__listeners;
				if ("string" == typeof n && n) {
					if (/[^\w\-]/.test(n)) throw "nonstandard key:" + n;
					i.hashCode = n, s = n
				}
				0 != t.indexOf("on") && (t = "on" + t), "object" != typeof o[t] && (o[t] = {}), s = s || e.lang.guid(), i.hashCode = s, o[t][s] = i
			}
		}, e.lang.Class.prototype.removeEventListener = function(t, i) {
			if (e.lang.isFunction(i)) i = i.hashCode;
			else if (!e.lang.isString(i)) return;
			!this.__listeners && (this.__listeners = {}), 0 != t.indexOf("on") && (t = "on" + t);
			var n = this.__listeners;
			n[t] && n[t][i] && delete n[t][i]
		}, e.lang.Class.prototype.dispatchEvent = function(t, i) {
			e.lang.isString(t) && (t = new e.lang.Event(t)), !this.__listeners && (this.__listeners = {}), i = i || {};
			for (var n in i) t[n] = i[n];
			var n, s = this.__listeners,
				o = t.type;
			if (t.target = t.target || this, t.currentTarget = this, 0 != o.indexOf("on") && (o = "on" + o), e.lang.isFunction(this[o]) && this[o].apply(this, arguments), "object" == typeof s[o])
				for (n in s[o]) s[o][n].apply(this, arguments);
			return t.returnValue
		}, e.lang.inherits = function(t, e, i) {
			var n, s, o = t.prototype,
				a = new Function;
			a.prototype = e.prototype, s = t.prototype = new a;
			for (n in o) s[n] = o[n];
			t.prototype.constructor = t, t.superClass = e.prototype, "string" == typeof i && (s._className = i)
		}, e.dom = e.dom || {}, e._g = e.dom._g = function(t) {
			return e.lang.isString(t) ? document.getElementById(t) : t
		}, e.g = e.dom.g = function(t) {
			return "string" == typeof t || t instanceof String ? document.getElementById(t) : t && t.nodeName && (1 == t.nodeType || 9 == t.nodeType) ? t : null
		}, e.insertHTML = e.dom.insertHTML = function(t, i, n) {
			t = e.dom.g(t);
			var s, o;
			return t.insertAdjacentHTML ? t.insertAdjacentHTML(i, n) : (s = t.ownerDocument.createRange(), i = i.toUpperCase(), "AFTERBEGIN" == i || "BEFOREEND" == i ? (s.selectNodeContents(t), s.collapse("AFTERBEGIN" == i)) : (o = "BEFOREBEGIN" == i, s[o ? "setStartBefore" : "setEndAfter"](t), s.collapse(o)), s.insertNode(s.createContextualFragment(n))), t
		}, e.ac = e.dom.addClass = function(t, i) {
			t = e.dom.g(t);
			for (var n = i.split(/\s+/), s = t.className, o = " " + s + " ", a = 0, l = n.length; l > a; a++) o.indexOf(" " + n[a] + " ") < 0 && (s += (s ? " " : "") + n[a]);
			return t.className = s, t
		}, e.event = e.event || {}, e.event._listeners = e.event._listeners || [], e.on = e.event.on = function(t, i, n) {
			i = i.replace(/^on/i, ""), t = e._g(t);
			var s, o = function(e) {
					n.call(t, e)
				},
				a = e.event._listeners,
				l = e.event._eventFilter,
				r = i;
			return i = i.toLowerCase(), l && l[i] && (s = l[i](t, i, o), r = s.type, o = s.listener), t.addEventListener ? t.addEventListener(r, o, !1) : t.attachEvent && t.attachEvent("on" + r, o), a[a.length] = [t, i, n, o, r], t
		}, e.un = e.event.un = function(t, i, n) {
			t = e._g(t), i = i.replace(/^on/i, "").toLowerCase();
			for (var s, o, a, l = e.event._listeners, r = l.length, p = !n; r--;) s = l[r], s[1] !== i || s[0] !== t || !p && s[2] !== n || (o = s[4], a = s[3], t.removeEventListener ? t.removeEventListener(o, a, !1) : t.detachEvent && t.detachEvent("on" + o, a), l.splice(r, 1));
			return t
		}, e.preventDefault = e.event.preventDefault = function(t) {
			t.preventDefault ? t.preventDefault() : t.returnValue = !1
		}
	}();
	var i = BMapLib.DistanceTool = function(t, i) {
		t && (this._map = t, i = i || {}, this._opts = e.extend(e.extend(this._opts || {}, {
			tips: "测距",
			followText: "单击确定地点，双击结束",
			unit: "metric",
			lineColor: "#ff6319",
			lineStroke: 2,
			opacity: .8,
			lineStyle: "solid",
			cursor: "http://api.map.baidu.com/images/ruler.cur",
			secIcon: null,
			closeIcon: null
		}), i), this._followTitle = null, this._points = [], this._paths = [], this._dots = [], this._segDistance = [], this._overlays = [], this._enableMassClear = !0, this._units = {
			metric: {
				name: "metric",
				conv: 1,
				incon: 2e3,
				u1: "米",
				u2: "公里"
			},
			us: {
				name: "us",
				conv: 3.2808,
				incon: 5279.856,
				u1: "英尺",
				u2: "英里"
			}
		}, this._isOpen = !1, this._startFollowText = "单击确定起点", this._movingTimerId = null, this._styles = {
			BMapLib_diso: "height:17px;width:5px;position:absolute;background:url(http://api.map.baidu.com/images/dis_box_01.gif) no-repeat left top",
			BMapLib_disi: "color:#7a7a7a;position:absolute;left:5px;padding:0 4px 1px 0;line-height:17px;background:url(http://api.map.baidu.com/images/dis_box_01.gif) no-repeat right top",
			BMapLib_disBoxDis: "color:#ff6319;font-weight:bold"
		}, this._opts.lineStroke <= 0 && (this._opts.lineStroke = 2), this._opts.opacity > 1 ? this._opts.opacity = 1 : this._opts.opacity < 0 && (this._opts.opacity = 0), "solid" != this._opts.lineStyle && "dashed" != this._opts.lineStyle && (this._opts.lineStyle = "solid"), this._units[this._opts.unit] || (this._opts.unit = "metric"), this.text = "测距")
	};
	e.lang.inherits(i, e.lang.Class, "DistanceTool"), i.prototype._bind = function() {
		this._setCursor(this._opts.cursor);
		var t = this;
		if (e.on(this._map.getContainer(), "mousemove", function(e) {
				if (t._isOpen && t._followTitle) {
					e = window.event || e;
					var i = e.target || e.srcElement;
					if (i != n.getDom(t._map)) return void t._followTitle.hide();
					t._mapMoving || t._followTitle.show();
					var s = n.getDrawPoint(e, !0);
					t._followTitle.setPosition(s)
				}
			}), this._startFollowText) {
			this._followTitle = new BMap.Label(this._startFollowText, {
				offset: new BMap.Size(14, 16)
			});
			this._followTitle.setStyles({
				color: "#333",
				borderColor: "#ff0103"
			})
		}
	}, i.prototype.open = function() {
		if (1 == this._isOpen) return !0;
		if (!BMapLib._toolInUse) {
			this._isOpen = !0, BMapLib._toolInUse = !0, this._mapMoving && delete this._mapMoving;
			var t = this;
			this._binded || (this._binded = !0, this._bind(), this._map.addEventListener("moving", function() {
				t._hideCurrent()
			})), this._followTitle && (this._map.addOverlay(this._followTitle), this._followTitle.hide());
			var i = function(i) {
					var s = t._map;
					if (t._isOpen) {
						i = window.event || i;
						var o = n.getDrawPoint(i, !0);
						if (t._isPointValid(o)) {
							if (t._bind.initX = i.pageX || i.clientX || 0, t._bind.initY = i.pageY || i.clientY || 0, t._points.length > 0) {
								var a = s.pointToPixel(t._points[t._points.length - 1]),
									l = s.pointToPixel(o),
									r = Math.sqrt(Math.pow(a.x - l.x, 2) + Math.pow(a.y - l.y, 2));
								if (5 > r) return
							}
							t._bind.x = i.layerX || i.offsetX || 0, t._bind.y = i.layerY || i.offsetY || 0, t._points.push(o), t._addSecPoint(o), 0 == t._paths.length && t._formatTitle(1, t._opts.followText, t._getTotalDistance()), t._paths.length > 0 && (t._paths[t._paths.length - 1].show(), t._paths[t._paths.length - 1].setStrokeOpacity(t._opts.opacity));
							var p = new BMap.Polyline([o, o], {
								enableMassClear: t._enableMassClear
							});
							if (t._map.addOverlay(p), t._paths.push(p), t._overlays.push(p), p.setStrokeWeight(t._opts.lineStroke), p.setStrokeColor(t._opts.lineColor), p.setStrokeOpacity(t._opts.opacity / 2), p.setStrokeStyle(t._opts.lineStyle), t._mapMoving && p.hide(), t._points.length > 1) {
								var _ = t._paths[t._points.length - 2];
								_.setPositionAt(1, o)
							}
							var h = "";
							if (t._points.length > 1) {
								var u = (t._setSegDistance(t._points[t._points.length - 2], t._points[t._points.length - 1]), t._getTotalDistance());
								h = t._formatDisStr(u)
							} else h = "起点";
							var d = new BMap.Label(h, {
								offset: new BMap.Size(10, -5),
								enableMassClear: t._enableMassClear
							});
							d.setStyles({
								color: "#333",
								borderColor: "#ff0103"
							}), t._map.addOverlay(d), t._formatSegLabel(d, h), t._overlays.push(d), o.disLabel = d, d.setPosition(o);
							var c = new e.lang.Event("onaddpoint");
							c.point = o, c.pixel = t._map.pointToPixel(o), c.index = t._points.length - 1, c.distance = t._getTotalDistance().toFixed(0), t.dispatchEvent(c)
						}
					}
				},
				s = function(e) {
					if (t._isOpen)
						if (t._paths.length > 0) {
							e = window.event || e;
							var i = e.pageX || e.clientX || 0,
								o = e.pageY || e.clientY || 0;
							"undefined" == typeof t._bind.initX && (t._bind.x = e.layerX || e.offsetX || 0, t._bind.y = e.layerY || e.offsetY || 0, t._bind.initX = i, t._bind.initY = o);
							var a = t._bind.x + i - t._bind.initX,
								l = t._bind.y + o - t._bind.initY,
								r = t._paths[t._paths.length - 1],
								p = t._map.pixelToPoint(new BMap.Pixel(a, l));
							r.setPositionAt(1, p), t._mapMoving || r.show();
							var _ = 0,
								h = 0;
							if (10 > a ? _ = 8 : a > t._map.getSize().width - 10 && (_ = -8), 10 > l ? h = 8 : l > t._map.getSize().height - 10 && (h = -8), 0 != _ || 0 != h) s._movingTimerId || (t._mapMoving = !0, t._map.panBy(_, h, {
								noAnimation: !0
							}), t._movingTimerId = s._movingTimerId = setInterval(function() {
								t._map.panBy(_, h, {
									noAnimation: !0
								})
							}, 30), r.hide(), t._followTitle && t._followTitle.hide());
							else if (s._movingTimerId) {
								clearInterval(s._movingTimerId), delete s._movingTimerId, delete t._movingTimerId;
								var u = t._paths[t._paths.length - 1],
									d = t._map.pixelToPoint(new BMap.Pixel(a, l));
								if (!u) return;
								u.setPositionAt(1, d), u.show(), t._followTitle && (t._followTitle.setPosition(d), t._followTitle.show()), t._bind.i = 0, t._bind.j = 0, delete t._mapMoving
							}
							if (t._followTitle) {
								var c = t._getTotalDistance(),
									f = t._map.getDistance(t._points[t._points.length - 1], p);
								t._updateInstDis(t._followTitle, c + f)
							}
						} else if (t._followTitle) {
						t._followTitle.show(), e = window.event || e;
						var g = e.target || e.srcElement;
						g != n.getDom() && t._followTitle.hide()
					}
				},
				o = function(r) {
					t._isOpen && (e.un(n.getDom(t._map), "click", i), e.un(document, "mousemove", s), e.un(n.getDom(t._map), "dblclick", o), e.un(document, "keydown", a), e.un(n.getDom(t._map), "mouseup", l), setTimeout(function() {
						t.close()
					}, 50))
				},
				a = function(e) {
					e = window.event || e, 27 == e.keyCode && (t._clearCurData(), setTimeout(function() {
						t.close()
					}, 50))
				},
				l = function(e) {
					e = window.event || e;
					var i = 0;
					/msie (\d+\.\d)/i.test(navigator.userAgent) && (i = document.documentMode || +RegExp.$1), (i && 1 != e.button || 2 == e.button) && t.close()
				};
			return t._initData(), this._formatTitle(), n.show(this._map), this._setCursor(this._opts.cursor), e.on(n.getDom(this._map), "click", i), e.on(document, "mousemove", s), e.on(n.getDom(this._map), "dblclick", o), e.on(document, "keydown", a), e.on(n.getDom(this._map), "mouseup", l), this.bindFunc = [{
				elem: n.getDom(this._map),
				type: "click",
				func: i
			}, {
				elem: n.getDom(this._map),
				type: "dblclick",
				func: o
			}, {
				elem: document,
				type: "mousemove",
				func: s
			}, {
				elem: document,
				type: "keydown",
				func: a
			}, {
				elem: n.getDom(this._map),
				type: "mouseup",
				func: l
			}], !0
		}
	}, i.prototype._dispatchLastEvent = function() {
		var t = new e.lang.Event("ondrawend");
		t.points = this._points ? this._points.slice(0) : [], t.overlays = this._paths ? this._paths.slice(0, this._paths.length - 1) : [], t.distance = this._getTotalDistance().toFixed(0), this.dispatchEvent(t)
	}, i.prototype.close = function() {
		if (0 != this._isOpen) {
			this._isOpen = !1, BMapLib._toolInUse = !1, this._mapMoving && delete this._mapMoving;
			var t = this;
			if (t._dispatchLastEvent(), t._points.length < 2) t._clearCurData();
			else {
				t._paths[t._paths.length - 1].remove(), t._paths[t._paths.length - 1] = null, t._paths.length = t._paths.length - 1;
				var i = t._points[t._points.length - 1];
				i.disLabel && i.disLabel.remove(), t._processLastOp()
			}
			n.hide();
			for (var s = 0, o = this.bindFunc.length; o > s; s++) e.un(this.bindFunc[s].elem, this.bindFunc[s].type, this.bindFunc[s].func);
			t._movingTimerId && (clearInterval(t._movingTimerId), t._movingTimerId = null), this._followTitle && this._followTitle.hide()
		}
	}, i.prototype._clearCurData = function() {
		for (var t = 0, e = this._points.length; e > t; t++) this._points[t].disLabel && this._points[t].disLabel.remove();
		for (var t = 0, e = this._paths.length; e > t; t++) this._paths[t].remove();
		for (var t = 0, e = this._dots.length; e > t; t++) this._dots[t].remove();
		this._initData()
	}, i.prototype._initData = function() {
		this._points.length = 0, this._paths.length = 0, this._segDistance.length = 0, this._dots.length = 0
	}, i.prototype._setSegDistance = function(t, e) {
		if (t && e) {
			var i = this._map.getDistance(t, e);
			return this._segDistance.push(i), i
		}
	}, i.prototype._getTotalDistance = function() {
		for (var t = 0, e = 0, i = this._segDistance.length; i > e; e++) t += this._segDistance[e];
		return t
	}, i.prototype._convertUnit = function(t, e) {
		return e = e || "metric", this._units[e] ? t * this._units[e].conv : t
	}, i.prototype._addSecPoint = function(t) {
		var e = this._opts.secIcon ? this._opts.secIcon : new BMap.Icon("http://api.map.baidu.com/images/mapctrls.png", new BMap.Size(11, 11), {
				imageOffset: new BMap.Size(-26, -313)
			}),
			i = new BMap.Marker(t, {
				icon: e,
				clickable: !1,
				baseZIndex: 35e5,
				zIndexFixed: !0,
				enableMassClear: this._enableMassClear
			});
		this._map.addOverlay(i), this._dots.push(i)
	}, i.prototype._formatDisStr = function(t) {
		var e = this._opts.unit,
			i = this._units[e].u1,
			n = this._convertUnit(t, e);
		return n > this._units[e].incon ? (n /= this._units[e].incon, i = this._units[e].u2, n = n.toFixed(1)) : n = n.toFixed(0), n + i
	}, i.prototype._setCursor = function(t) {
		var e = /webkit/.test(navigator.userAgent.toLowerCase()) ? "url(" + this._opts.cursor + ") 3 6, crosshair" : "url(" + this._opts.cursor + "), crosshair";
		n._setCursor(e)
	}, i.prototype._getCursor = function() {
		return this._opts.cursor
	}, i.prototype._formatSegLabel = function(t, e) {
		t.setStyle({
			border: "none",
			padding: "0"
		}), t.setContent("<span style='" + this._styles.BMapLib_diso + "'><span style='" + this._styles.BMapLib_disi + "'>" + e + "</span></span>")
	}, i.prototype._processLastOp = function() {
		var i = this;
		if (delete i._bind.x, delete i._bind.y, delete i._bind.initX, delete i._bind.initY, i._paths.length > i._points.length - 1) {
			var n = i._paths.length - 1;
			i._paths[n].remove(), i._paths[n] = null, i._paths.length = n
		}
		var s = {};
		s.points = i._points.slice(0), s.paths = i._paths.slice(0), s.dots = i._dots.slice(0), s.segDis = i._segDistance.slice(0);
		var o = i._map.pointToPixel(s.points[s.points.length - 1]),
			a = i._map.pointToPixel(s.points[s.points.length - 2]),
			l = [0, 0],
			r = [0, 0];
		r = o.y - a.y >= 0 ? [-5, 11] : [-5, -35], l = o.x - a.x >= 0 ? [14, 0] : [-14, 0];
		var p = s.points[s.points.length - 1];
		p.disLabel = new BMap.Label("", {
			offset: new BMap.Size(-15, -40),
			enableMassClear: i._enableMassClear
		}), p.disLabel.setStyles({
			color: "#333",
			borderColor: "#ff0103"
		}), i._map.addOverlay(p.disLabel), p.disLabel.setOffset(new BMap.Size(r[0], r[1])), p.disLabel.setPosition(p), i._formatTitle(2, "", "", p.disLabel);
		var _ = this._opts.closeIcon ? this._opts.closeIcon : new BMap.Icon("http://api.map.baidu.com/images/mapctrls.gif", new BMap.Size(12, 12), {
			imageOffset: new BMap.Size(0, -14)
		});
		s.closeBtn = new BMap.Marker(s.points[s.points.length - 1], {
			icon: _,
			offset: new BMap.Size(l[0], l[1]),
			baseZIndex: 36e5,
			enableMassClear: i._enableMassClear
		}), i._map.addOverlay(s.closeBtn), s.closeBtn.setTitle("清除本次测距"), s.closeBtn.addEventListener("click", function(n) {
			for (var o = 0, a = s.points.length; a > o; o++) s.points[o].disLabel.remove(), s.points[o].disLabel = null;
			for (var o = 0, a = s.paths.length; a > o; o++) s.paths[o].remove(), s.paths[o] = null;
			for (var o = 0, a = s.dots.length; a > o; o++) s.dots[o].remove(), s.dots[o] = null;
			s.closeBtn.remove(), s.closeBtn = null, t(n);
			var l = new e.lang.Event("onremovepolyline");
			i.dispatchEvent(l)
		}), i._initData()
	}, i.prototype._formatTitle = function(t, e, i, n) {
		var s = n || this._followTitle;
		if (s) {
			s.setStyle({
				lineHeight: "16px",
				zIndex: "85",
				padding: "3px 5px"
			});
			var o = this._startFollowText || "",
				a = [];
			if (1 == t) {
				s.setOffset(0, 25);
				var l = this._opts.unit,
					r = this._units[l].u1,
					p = this._convertUnit(i, l);
				p > this._units[l].incon ? (p /= this._units[l].incon, r = this._units[l].u2, p = p.toFixed(1)) : p = p.toFixed(0), a.push("<span>总长：<span style='" + this._styles.BMapLib_disBoxDis + "'>" + p + "</span>" + r + "</span><br />"), a.push("<span style='color:#7a7a7a'>" + e + "</span>")
			} else if (2 == t) {
				var l = this._opts.unit,
					r = this._units[l].u1,
					p = this._convertUnit(this._getTotalDistance(), l);
				p > this._units[l].incon ? (p /= this._units[l].incon, r = this._units[l].u2, p = p.toFixed(1)) : p = p.toFixed(0), a.push("总长：<span style='" + this._styles.BMapLib_disBoxDis + "'>" + p + "</span>" + r)
			} else s.setOffset(0, 25), a.push(o);
			s.setContent(a.join(""))
		}
	}, i.prototype._updateInstDis = function(t, e) {
		var i = this._opts.unit,
			n = this._units[i].u1;
		if (e > this._units[i].incon ? (e /= this._units[i].incon, n = this._units[i].u2, e = e.toFixed(1)) : e = e.toFixed(0), t) {
			var s = [];
			s.push("<span>总长：<span style='" + this._styles.BMapLib_disBoxDis + "'>" + e + "</span>" + n + "</span><br />"), s.push("<span style='color:#7a7a7a'>" + this._opts.followText + "</span>"), t.setContent(s.join(""))
		}
	}, i.prototype._hideCurrent = function() {
		if (this._isOpen) {
			if (this._paths.length > 0) {
				var t = this._paths[this._paths.length - 1];
				t.hide()
			}
			this._followTitle && this._followTitle.hide()
		}
	}, i.prototype._isPointValid = function(t) {
		if (!t) return !1;
		var e = this._map.getBounds(),
			i = e.getSouthWest(),
			n = e.getNorthEast();
		return !(t.lng < i.lng || t.lng > n.lng || t.lat < i.lat || t.lat > n.lat)
	};
	var n = {
		_map: null,
		_html: "<div style='background:transparent url(http://api.map.baidu.com/images/blank.gif);position:absolute;left:0;top:0;width:100%;height:100%;z-index:1000' unselectable='on'></div>",
		_maskElement: null,
		_cursor: "default",
		_inUse: !1,
		show: function(t) {
			this._map || (this._map = t), this._inUse = !0, this._maskElement || this._createMask(t), this._maskElement.style.display = "block"
		},
		_createMask: function(i) {
			if (this._map = i, this._map) {
				e.insertHTML(this._map.getContainer(), "beforeEnd", this._html);
				var n = this._maskElement = this._map.getContainer().lastChild,
					s = function(i) {
						return t(i), e.preventDefault(i)
					};
				e.on(n, "mouseup", function(t) {
					2 == t.button && s(t)
				}), e.on(n, "contextmenu", s), n.style.display = "none"
			}
		},
		getDrawPoint: function(t, e) {
			t = window.event || t;
			var i = t.layerX || t.offsetX || 0,
				s = t.layerY || t.offsetY || 0,
				o = t.target || t.srcElement;
			if (o != n.getDom(this._map) && 1 == e)
				for (; o && o != this._map.getContainer();) 0 == o.clientWidth && 0 == o.clientHeight && o.offsetParent && "td" == o.offsetParent.nodeName.toLowerCase() || (i += o.offsetLeft, s += o.offsetTop), o = o.offsetParent;
			return o != n.getDom(this._map) && o != this._map.getContainer() || "undefined" == typeof i || "undefined" == typeof s || isNaN(i) || isNaN(s) ? void 0 : this._map.pixelToPoint(new BMap.Pixel(i, s))
		},
		hide: function() {
			this._map && (this._inUse = !1, this._maskElement && (this._maskElement.style.display = "none"))
		},
		getDom: function(t) {
			return this._maskElement || this._createMask(t), this._maskElement
		},
		_setCursor: function(t) {
			this._cursor = t || "default", this._maskElement && (this._maskElement.style.cursor = this._cursor)
		}
	}
}();