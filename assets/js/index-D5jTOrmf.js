(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
        i(s);
    new MutationObserver(s => {
        for (const o of s)
            if (o.type === "childList")
                for (const r of o.addedNodes)
                    r.tagName === "LINK" && r.rel === "modulepreload" && i(r)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function t(s) {
        const o = {};
        return s.integrity && (o.integrity = s.integrity),
        s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
        s.crossOrigin === "use-credentials" ? o.credentials = "include" : s.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function i(s) {
        if (s.ep)
            return;
        s.ep = !0;
        const o = t(s);
        fetch(s.href, o)
    }
}
)();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis
  , Y = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets"in Document.prototype && "replace"in CSSStyleSheet.prototype
  , W = Symbol()
  , K = new WeakMap;
let oe = class {
    constructor(e, t, i) {
        if (this._$cssResult$ = !0,
        i !== W)
            throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = e,
        this.t = t
    }
    get styleSheet() {
        let e = this.o;
        const t = this.t;
        if (Y && e === void 0) {
            const i = t !== void 0 && t.length === 1;
            i && (e = K.get(t)),
            e === void 0 && ((this.o = e = new CSSStyleSheet).replaceSync(this.cssText),
            i && K.set(t, e))
        }
        return e
    }
    toString() {
        return this.cssText
    }
}
;
const je = a => new oe(typeof a == "string" ? a : a + "",void 0,W)
  , re = (a, ...e) => {
    const t = a.length === 1 ? a[0] : e.reduce( (i, s, o) => i + (r => {
        if (r._$cssResult$ === !0)
            return r.cssText;
        if (typeof r == "number")
            return r;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
    }
    )(s) + a[o + 1], a[0]);
    return new oe(t,a,W)
}
  , ze = (a, e) => {
    if (Y)
        a.adoptedStyleSheets = e.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet);
    else
        for (const t of e) {
            const i = document.createElement("style")
              , s = P.litNonce;
            s !== void 0 && i.setAttribute("nonce", s),
            i.textContent = t.cssText,
            a.appendChild(i)
        }
}
  , F = Y ? a => a : a => a instanceof CSSStyleSheet ? (e => {
    let t = "";
    for (const i of e.cssRules)
        t += i.cssText;
    return je(t)
}
)(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {is: Ne, defineProperty: Be, getOwnPropertyDescriptor: Ye, getOwnPropertyNames: We, getOwnPropertySymbols: qe, getPrototypeOf: Ve} = Object
  , g = globalThis
  , Q = g.trustedTypes
  , Ke = Q ? Q.emptyScript : ""
  , j = g.reactiveElementPolyfillSupport
  , w = (a, e) => a
  , M = {
    toAttribute(a, e) {
        switch (e) {
        case Boolean:
            a = a ? Ke : null;
            break;
        case Object:
        case Array:
            a = a == null ? a : JSON.stringify(a)
        }
        return a
    },
    fromAttribute(a, e) {
        let t = a;
        switch (e) {
        case Boolean:
            t = a !== null;
            break;
        case Number:
            t = a === null ? null : Number(a);
            break;
        case Object:
        case Array:
            try {
                t = JSON.parse(a)
            } catch {
                t = null
            }
        }
        return t
    }
}
  , q = (a, e) => !Ne(a, e)
  , X = {
    attribute: !0,
    type: String,
    converter: M,
    reflect: !1,
    hasChanged: q
};
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")),
g.litPropertyMetadata ?? (g.litPropertyMetadata = new WeakMap);
class $ extends HTMLElement {
    static addInitializer(e) {
        this._$Ei(),
        (this.l ?? (this.l = [])).push(e)
    }
    static get observedAttributes() {
        return this.finalize(),
        this._$Eh && [...this._$Eh.keys()]
    }
    static createProperty(e, t=X) {
        if (t.state && (t.attribute = !1),
        this._$Ei(),
        this.elementProperties.set(e, t),
        !t.noAccessor) {
            const i = Symbol()
              , s = this.getPropertyDescriptor(e, i, t);
            s !== void 0 && Be(this.prototype, e, s)
        }
    }
    static getPropertyDescriptor(e, t, i) {
        const {get: s, set: o} = Ye(this.prototype, e) ?? {
            get() {
                return this[t]
            },
            set(r) {
                this[t] = r
            }
        };
        return {
            get() {
                return s == null ? void 0 : s.call(this)
            },
            set(r) {
                const l = s == null ? void 0 : s.call(this);
                o.call(this, r),
                this.requestUpdate(e, l, i)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(e) {
        return this.elementProperties.get(e) ?? X
    }
    static _$Ei() {
        if (this.hasOwnProperty(w("elementProperties")))
            return;
        const e = Ve(this);
        e.finalize(),
        e.l !== void 0 && (this.l = [...e.l]),
        this.elementProperties = new Map(e.elementProperties)
    }
    static finalize() {
        if (this.hasOwnProperty(w("finalized")))
            return;
        if (this.finalized = !0,
        this._$Ei(),
        this.hasOwnProperty(w("properties"))) {
            const t = this.properties
              , i = [...We(t), ...qe(t)];
            for (const s of i)
                this.createProperty(s, t[s])
        }
        const e = this[Symbol.metadata];
        if (e !== null) {
            const t = litPropertyMetadata.get(e);
            if (t !== void 0)
                for (const [i,s] of t)
                    this.elementProperties.set(i, s)
        }
        this._$Eh = new Map;
        for (const [t,i] of this.elementProperties) {
            const s = this._$Eu(t, i);
            s !== void 0 && this._$Eh.set(s, t)
        }
        this.elementStyles = this.finalizeStyles(this.styles)
    }
    static finalizeStyles(e) {
        const t = [];
        if (Array.isArray(e)) {
            const i = new Set(e.flat(1 / 0).reverse());
            for (const s of i)
                t.unshift(F(s))
        } else
            e !== void 0 && t.push(F(e));
        return t
    }
    static _$Eu(e, t) {
        const i = t.attribute;
        return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0
    }
    constructor() {
        super(),
        this._$Ep = void 0,
        this.isUpdatePending = !1,
        this.hasUpdated = !1,
        this._$Em = null,
        this._$Ev()
    }
    _$Ev() {
        var e;
        this._$ES = new Promise(t => this.enableUpdating = t),
        this._$AL = new Map,
        this._$E_(),
        this.requestUpdate(),
        (e = this.constructor.l) == null || e.forEach(t => t(this))
    }
    addController(e) {
        var t;
        (this._$EO ?? (this._$EO = new Set)).add(e),
        this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e))
    }
    removeController(e) {
        var t;
        (t = this._$EO) == null || t.delete(e)
    }
    _$E_() {
        const e = new Map
          , t = this.constructor.elementProperties;
        for (const i of t.keys())
            this.hasOwnProperty(i) && (e.set(i, this[i]),
            delete this[i]);
        e.size > 0 && (this._$Ep = e)
    }
    createRenderRoot() {
        const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return ze(e, this.constructor.elementStyles),
        e
    }
    connectedCallback() {
        var e;
        this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
        this.enableUpdating(!0),
        (e = this._$EO) == null || e.forEach(t => {
            var i;
            return (i = t.hostConnected) == null ? void 0 : i.call(t)
        }
        )
    }
    enableUpdating(e) {}
    disconnectedCallback() {
        var e;
        (e = this._$EO) == null || e.forEach(t => {
            var i;
            return (i = t.hostDisconnected) == null ? void 0 : i.call(t)
        }
        )
    }
    attributeChangedCallback(e, t, i) {
        this._$AK(e, i)
    }
    _$EC(e, t) {
        var o;
        const i = this.constructor.elementProperties.get(e)
          , s = this.constructor._$Eu(e, i);
        if (s !== void 0 && i.reflect === !0) {
            const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : M).toAttribute(t, i.type);
            this._$Em = e,
            r == null ? this.removeAttribute(s) : this.setAttribute(s, r),
            this._$Em = null
        }
    }
    _$AK(e, t) {
        var o;
        const i = this.constructor
          , s = i._$Eh.get(e);
        if (s !== void 0 && this._$Em !== s) {
            const r = i.getPropertyOptions(s)
              , l = typeof r.converter == "function" ? {
                fromAttribute: r.converter
            } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : M;
            this._$Em = s,
            this[s] = l.fromAttribute(t, r.type),
            this._$Em = null
        }
    }
    requestUpdate(e, t, i) {
        if (e !== void 0) {
            if (i ?? (i = this.constructor.getPropertyOptions(e)),
            !(i.hasChanged ?? q)(this[e], t))
                return;
            this.P(e, t, i)
        }
        this.isUpdatePending === !1 && (this._$ES = this._$ET())
    }
    P(e, t, i) {
        this._$AL.has(e) || this._$AL.set(e, t),
        i.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = new Set)).add(e)
    }
    async _$ET() {
        this.isUpdatePending = !0;
        try {
            await this._$ES
        } catch (t) {
            Promise.reject(t)
        }
        const e = this.scheduleUpdate();
        return e != null && await e,
        !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        var i;
        if (!this.isUpdatePending)
            return;
        if (!this.hasUpdated) {
            if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
            this._$Ep) {
                for (const [o,r] of this._$Ep)
                    this[o] = r;
                this._$Ep = void 0
            }
            const s = this.constructor.elementProperties;
            if (s.size > 0)
                for (const [o,r] of s)
                    r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r)
        }
        let e = !1;
        const t = this._$AL;
        try {
            e = this.shouldUpdate(t),
            e ? (this.willUpdate(t),
            (i = this._$EO) == null || i.forEach(s => {
                var o;
                return (o = s.hostUpdate) == null ? void 0 : o.call(s)
            }
            ),
            this.update(t)) : this._$EU()
        } catch (s) {
            throw e = !1,
            this._$EU(),
            s
        }
        e && this._$AE(t)
    }
    willUpdate(e) {}
    _$AE(e) {
        var t;
        (t = this._$EO) == null || t.forEach(i => {
            var s;
            return (s = i.hostUpdated) == null ? void 0 : s.call(i)
        }
        ),
        this.hasUpdated || (this.hasUpdated = !0,
        this.firstUpdated(e)),
        this.updated(e)
    }
    _$EU() {
        this._$AL = new Map,
        this.isUpdatePending = !1
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$ES
    }
    shouldUpdate(e) {
        return !0
    }
    update(e) {
        this._$Ej && (this._$Ej = this._$Ej.forEach(t => this._$EC(t, this[t]))),
        this._$EU()
    }
    updated(e) {}
    firstUpdated(e) {}
}
$.elementStyles = [],
$.shadowRootOptions = {
    mode: "open"
},
$[w("elementProperties")] = new Map,
$[w("finalized")] = new Map,
j == null || j({
    ReactiveElement: $
}),
(g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis
  , R = S.trustedTypes
  , G = R ? R.createPolicy("lit-html", {
    createHTML: a => a
}) : void 0
  , ne = "$lit$"
  , f = `lit$${Math.random().toFixed(9).slice(2)}$`
  , le = "?" + f
  , Fe = `<${le}>`
  , _ = document
  , T = () => _.createComment("")
  , k = a => a === null || typeof a != "object" && typeof a != "function"
  , V = Array.isArray
  , Qe = a => V(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function"
  , z = `[ 	
\f\r]`
  , E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
  , Z = /-->/g
  , J = />/g
  , b = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g")
  , ee = /'/g
  , te = /"/g
  , ce = /^(?:script|style|textarea|title)$/i
  , Xe = a => (e, ...t) => ({
    _$litType$: a,
    strings: e,
    values: t
})
  , Ge = Xe(1)
  , A = Symbol.for("lit-noChange")
  , d = Symbol.for("lit-nothing")
  , se = new WeakMap
  , v = _.createTreeWalker(_, 129);
function he(a, e) {
    if (!V(a) || !a.hasOwnProperty("raw"))
        throw Error("invalid template strings array");
    return G !== void 0 ? G.createHTML(e) : e
}
const Ze = (a, e) => {
    const t = a.length - 1
      , i = [];
    let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = E;
    for (let l = 0; l < t; l++) {
        const n = a[l];
        let h, p, c = -1, u = 0;
        for (; u < n.length && (r.lastIndex = u,
        p = r.exec(n),
        p !== null); )
            u = r.lastIndex,
            r === E ? p[1] === "!--" ? r = Z : p[1] !== void 0 ? r = J : p[2] !== void 0 ? (ce.test(p[2]) && (s = RegExp("</" + p[2], "g")),
            r = b) : p[3] !== void 0 && (r = b) : r === b ? p[0] === ">" ? (r = s ?? E,
            c = -1) : p[1] === void 0 ? c = -2 : (c = r.lastIndex - p[2].length,
            h = p[1],
            r = p[3] === void 0 ? b : p[3] === '"' ? te : ee) : r === te || r === ee ? r = b : r === Z || r === J ? r = E : (r = b,
            s = void 0);
        const m = r === b && a[l + 1].startsWith("/>") ? " " : "";
        o += r === E ? n + Fe : c >= 0 ? (i.push(h),
        n.slice(0, c) + ne + n.slice(c) + f + m) : n + f + (c === -2 ? l : m)
    }
    return [he(a, o + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i]
}
;
class D {
    constructor({strings: e, _$litType$: t}, i) {
        let s;
        this.parts = [];
        let o = 0
          , r = 0;
        const l = e.length - 1
          , n = this.parts
          , [h,p] = Ze(e, t);
        if (this.el = D.createElement(h, i),
        v.currentNode = this.el.content,
        t === 2 || t === 3) {
            const c = this.el.content.firstChild;
            c.replaceWith(...c.childNodes)
        }
        for (; (s = v.nextNode()) !== null && n.length < l; ) {
            if (s.nodeType === 1) {
                if (s.hasAttributes())
                    for (const c of s.getAttributeNames())
                        if (c.endsWith(ne)) {
                            const u = p[r++]
                              , m = s.getAttribute(c).split(f)
                              , H = /([.?@])?(.*)/.exec(u);
                            n.push({
                                type: 1,
                                index: o,
                                name: H[2],
                                strings: m,
                                ctor: H[1] === "." ? et : H[1] === "?" ? tt : H[1] === "@" ? st : I
                            }),
                            s.removeAttribute(c)
                        } else
                            c.startsWith(f) && (n.push({
                                type: 6,
                                index: o
                            }),
                            s.removeAttribute(c));
                if (ce.test(s.tagName)) {
                    const c = s.textContent.split(f)
                      , u = c.length - 1;
                    if (u > 0) {
                        s.textContent = R ? R.emptyScript : "";
                        for (let m = 0; m < u; m++)
                            s.append(c[m], T()),
                            v.nextNode(),
                            n.push({
                                type: 2,
                                index: ++o
                            });
                        s.append(c[u], T())
                    }
                }
            } else if (s.nodeType === 8)
                if (s.data === le)
                    n.push({
                        type: 2,
                        index: o
                    });
                else {
                    let c = -1;
                    for (; (c = s.data.indexOf(f, c + 1)) !== -1; )
                        n.push({
                            type: 7,
                            index: o
                        }),
                        c += f.length - 1
                }
            o++
        }
    }
    static createElement(e, t) {
        const i = _.createElement("template");
        return i.innerHTML = e,
        i
    }
}
function x(a, e, t=a, i) {
    var r, l;
    if (e === A)
        return e;
    let s = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
    const o = k(e) ? void 0 : e._$litDirective$;
    return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1),
    o === void 0 ? s = void 0 : (s = new o(a),
    s._$AT(a, t, i)),
    i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s),
    s !== void 0 && (e = x(a, s._$AS(a, e.values), s, i)),
    e
}
class Je {
    constructor(e, t) {
        this._$AV = [],
        this._$AN = void 0,
        this._$AD = e,
        this._$AM = t
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    u(e) {
        const {el: {content: t}, parts: i} = this._$AD
          , s = ((e == null ? void 0 : e.creationScope) ?? _).importNode(t, !0);
        v.currentNode = s;
        let o = v.nextNode()
          , r = 0
          , l = 0
          , n = i[0];
        for (; n !== void 0; ) {
            if (r === n.index) {
                let h;
                n.type === 2 ? h = new O(o,o.nextSibling,this,e) : n.type === 1 ? h = new n.ctor(o,n.name,n.strings,this,e) : n.type === 6 && (h = new it(o,this,e)),
                this._$AV.push(h),
                n = i[++l]
            }
            r !== (n == null ? void 0 : n.index) && (o = v.nextNode(),
            r++)
        }
        return v.currentNode = _,
        s
    }
    p(e) {
        let t = 0;
        for (const i of this._$AV)
            i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t),
            t += i.strings.length - 2) : i._$AI(e[t])),
            t++
    }
}
class O {
    get _$AU() {
        var e;
        return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv
    }
    constructor(e, t, i, s) {
        this.type = 2,
        this._$AH = d,
        this._$AN = void 0,
        this._$AA = e,
        this._$AB = t,
        this._$AM = i,
        this.options = s,
        this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0
    }
    get parentNode() {
        let e = this._$AA.parentNode;
        const t = this._$AM;
        return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode),
        e
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(e, t=this) {
        e = x(this, e, t),
        k(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(),
        this._$AH = d) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Qe(e) ? this.k(e) : this._(e)
    }
    O(e) {
        return this._$AA.parentNode.insertBefore(e, this._$AB)
    }
    T(e) {
        this._$AH !== e && (this._$AR(),
        this._$AH = this.O(e))
    }
    _(e) {
        this._$AH !== d && k(this._$AH) ? this._$AA.nextSibling.data = e : this.T(_.createTextNode(e)),
        this._$AH = e
    }
    $(e) {
        var o;
        const {values: t, _$litType$: i} = e
          , s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = D.createElement(he(i.h, i.h[0]), this.options)),
        i);
        if (((o = this._$AH) == null ? void 0 : o._$AD) === s)
            this._$AH.p(t);
        else {
            const r = new Je(s,this)
              , l = r.u(this.options);
            r.p(t),
            this.T(l),
            this._$AH = r
        }
    }
    _$AC(e) {
        let t = se.get(e.strings);
        return t === void 0 && se.set(e.strings, t = new D(e)),
        t
    }
    k(e) {
        V(this._$AH) || (this._$AH = [],
        this._$AR());
        const t = this._$AH;
        let i, s = 0;
        for (const o of e)
            s === t.length ? t.push(i = new O(this.O(T()),this.O(T()),this,this.options)) : i = t[s],
            i._$AI(o),
            s++;
        s < t.length && (this._$AR(i && i._$AB.nextSibling, s),
        t.length = s)
    }
    _$AR(e=this._$AA.nextSibling, t) {
        var i;
        for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e && e !== this._$AB; ) {
            const s = e.nextSibling;
            e.remove(),
            e = s
        }
    }
    setConnected(e) {
        var t;
        this._$AM === void 0 && (this._$Cv = e,
        (t = this._$AP) == null || t.call(this, e))
    }
}
class I {
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    constructor(e, t, i, s, o) {
        this.type = 1,
        this._$AH = d,
        this._$AN = void 0,
        this.element = e,
        this.name = t,
        this._$AM = s,
        this.options = o,
        i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String),
        this.strings = i) : this._$AH = d
    }
    _$AI(e, t=this, i, s) {
        const o = this.strings;
        let r = !1;
        if (o === void 0)
            e = x(this, e, t, 0),
            r = !k(e) || e !== this._$AH && e !== A,
            r && (this._$AH = e);
        else {
            const l = e;
            let n, h;
            for (e = o[0],
            n = 0; n < o.length - 1; n++)
                h = x(this, l[i + n], t, n),
                h === A && (h = this._$AH[n]),
                r || (r = !k(h) || h !== this._$AH[n]),
                h === d ? e = d : e !== d && (e += (h ?? "") + o[n + 1]),
                this._$AH[n] = h
        }
        r && !s && this.j(e)
    }
    j(e) {
        e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "")
    }
}
class et extends I {
    constructor() {
        super(...arguments),
        this.type = 3
    }
    j(e) {
        this.element[this.name] = e === d ? void 0 : e
    }
}
class tt extends I {
    constructor() {
        super(...arguments),
        this.type = 4
    }
    j(e) {
        this.element.toggleAttribute(this.name, !!e && e !== d)
    }
}
class st extends I {
    constructor(e, t, i, s, o) {
        super(e, t, i, s, o),
        this.type = 5
    }
    _$AI(e, t=this) {
        if ((e = x(this, e, t, 0) ?? d) === A)
            return;
        const i = this._$AH
          , s = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive
          , o = e !== d && (i === d || s);
        s && this.element.removeEventListener(this.name, this, i),
        o && this.element.addEventListener(this.name, this, e),
        this._$AH = e
    }
    handleEvent(e) {
        var t;
        typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e)
    }
}
class it {
    constructor(e, t, i) {
        this.element = e,
        this.type = 6,
        this._$AN = void 0,
        this._$AM = t,
        this.options = i
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(e) {
        x(this, e)
    }
}
const N = S.litHtmlPolyfillSupport;
N == null || N(D, O),
(S.litHtmlVersions ?? (S.litHtmlVersions = [])).push("3.2.1");
const at = (a, e, t) => {
    const i = (t == null ? void 0 : t.renderBefore) ?? e;
    let s = i._$litPart$;
    if (s === void 0) {
        const o = (t == null ? void 0 : t.renderBefore) ?? null;
        i._$litPart$ = s = new O(e.insertBefore(T(), o),o,void 0,t ?? {})
    }
    return s._$AI(a),
    s
}
;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let C = class extends $ {
    constructor() {
        super(...arguments),
        this.renderOptions = {
            host: this
        },
        this._$Do = void 0
    }
    createRenderRoot() {
        var t;
        const e = super.createRenderRoot();
        return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild),
        e
    }
    update(e) {
        const t = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(e),
        this._$Do = at(t, this.renderRoot, this.renderOptions)
    }
    connectedCallback() {
        var e;
        super.connectedCallback(),
        (e = this._$Do) == null || e.setConnected(!0)
    }
    disconnectedCallback() {
        var e;
        super.disconnectedCallback(),
        (e = this._$Do) == null || e.setConnected(!1)
    }
    render() {
        return A
    }
}
;
var ae;
C._$litElement$ = !0,
C.finalized = !0,
(ae = globalThis.litElementHydrateSupport) == null || ae.call(globalThis, {
    LitElement: C
});
const B = globalThis.litElementPolyfillSupport;
B == null || B({
    LitElement: C
});
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = a => (e, t) => {
    t !== void 0 ? t.addInitializer( () => {
        customElements.define(a, e)
    }
    ) : customElements.define(a, e)
}
;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = {
    attribute: !0,
    type: String,
    converter: M,
    reflect: !1,
    hasChanged: q
}
  , nt = (a=rt, e, t) => {
    const {kind: i, metadata: s} = t;
    let o = globalThis.litPropertyMetadata.get(s);
    if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = new Map),
    o.set(t.name, a),
    i === "accessor") {
        const {name: r} = t;
        return {
            set(l) {
                const n = e.get.call(this);
                e.set.call(this, l),
                this.requestUpdate(r, n, a)
            },
            init(l) {
                return l !== void 0 && this.P(r, void 0, a),
                l
            }
        }
    }
    if (i === "setter") {
        const {name: r} = t;
        return function(l) {
            const n = this[r];
            e.call(this, l),
            this.requestUpdate(r, n, a)
        }
    }
    throw Error("Unsupported decorator location: " + i)
}
;
function U(a) {
    return (e, t) => typeof t == "object" ? nt(a, e, t) : ( (i, s, o) => {
        const r = s.hasOwnProperty(o);
        return s.constructor.createProperty(o, r ? {
            ...i,
            wrapped: !0
        } : i),
        r ? Object.getOwnPropertyDescriptor(s, o) : void 0
    }
    )(a, e, t)
}
const lt = re`
    *,:before,:after {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: #e5e7eb
    }
    :host {
        font-size: 16px;
        --max-width: 1600px;
        --gap: 1.75em;
        --main-gradient: linear-gradient( 130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05% );
        --theme-transition: all .25s ease;
        
    }

    #bot-container {
        position: fixed;
        bottom: 0;
        z-index: 1000;
        width: 70px;
        height: 60px;
    }
    #Aurora-Dia--body {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        --auora-dia--width: 65px;
        --auora-dia--height: 50px;
        --auora-dia--hover-height: 60px;
        --auora-dia--jump-1: 55px;
        --auora-dia--jump-2: 60px;
        --auora-dia--jump-3: 45px;
        --auora-dia--eye-top: 10px;
        --auora-dia--eye-height: 15px;
        --auora-dia--eye-width: 8px;
        --auora-dia--eye-top: 10px;
        --auora-dia--platform-size: var(--auora-dia--jump-2);
        --auora-dia--platform-size-shake-1: 75px;
        --auora-dia--platform-size-shake-2: 45px;
        --auora-dia--platform-top: -15px;
        --aurora-dia--linear-gradient: var(--main-gradient);
        --aurora-dia--linear-gradient-hover: linear-gradient(
                to bottom,
                #25b0cc,
                #3f60de
        );
        --aurora-dia--platform-light: #b712ac;
    }
    .Aurora-Dia {
        position: absolute;
        bottom: 30px;
        width: var(--auora-dia--width);
        height: var(--auora-dia--height);
        border-radius: 45%;
        border: 4px solid var(--background-secondary);
        // box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        animation: breathe-and-jump 3s linear infinite;
        cursor: pointer;
        z-index: 1;
    }
    .Aurora-Dia::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        width: calc(100% + 3px);
        height: calc(100% + 2px);
        background-color: #2cdcff;
        background: var(--aurora-dia--linear-gradient);
        border-radius: 45%;
        opacity: 0;
        opacity: 1;
        transition: 0.3s linear all;
    }
    .Aurora-Dia.active {
        animation:
                deactivate 0.75s linear,
                bounce-then-breathe 5s linear infinite;
    }

    .Aurora-Dia--eye {
        position: absolute;
        top: var(--auora-dia--eye-top);
        width: var(--auora-dia--eye-width);
        height: var(--auora-dia--eye-height);
        border-radius: 15px;
        background-color: #fff;
        box-shadow: 0 0 7px rgba(255, 255, 255, 0.5);
        animation: blink 5s linear infinite;
    }
.Aurora-Dia--eye.left {
        left: 25%;
    }
.Aurora-Dia--eye.right {
        right: 25%;
    }
    .Aurora-Dia--eyes.moving > .Aurora-Dia--eye {
        animation: none;
    }

    .Aurora-Dia--platform {
        position: relative;
        top: 0;
        transform: rotateX(70deg);
        width: var(--auora-dia--platform-size);
        height: var(--auora-dia--platform-size);
        box-shadow:
                0 0 var(--auora-dia--platform-size) var(--aurora-dia--platform-light),
                0 0 15px var(--aurora-dia--platform-light) inset;
        animation: jump-pulse 3s linear infinite;
    }

    .Aurora-Dia--platform {
        border-radius: 50%;
        transition: 0.2s linear all;
    }

    .Aurora-Dia:hover {
        animation: shake-to-alert 0.5s linear;
        height: var(--auora-dia--hover-height);
        transform: translateY(-7px);
    }
    .Aurora-Dia:hover::before {
        background: var(--aurora-dia--linear-gradient-hover);
    }
    .Aurora-Dia:hover,
    .Aurora-Dia:hover > .Aurora-Dia--eyes > .Aurora--Dia-eye {
        border-color: var(--text-accent);
        box-shadow: 0 0 5px var(--text-accent);
    }
    .Aurora-Dia:hover + .Aurora-Dia--platform {
        box-shadow:
                0 0 var(--auora-dia--platform-size) var(--text-accent),
                0 0 15px var(--text-accent) inset;
        animation: shake-pulse 0.5s linear;
    }

    #Aurora-Dia--tips-wrapper {
        position: absolute;
        bottom: 80px;
        width: 200px;
        min-height: 60px;
        background: var(--aurora-dia--linear-gradient);
        color: var(--text-normal);
        padding: 0.2em;
        border-radius: 8px;
        overflow: hidden;
        opacity: 0;
        animation: tips-breathe 3s linear infinite;
        transition: 0.3s linear opacity;
    }

    #Aurora-Dia--tips-wrapper.active {
        opacity: 0.86;
    }

    .Aurora-Dia--tips {
        position: relative;
        height: 100%;
        width: 100%;
        min-height: 60px;
        border-radius: 6px;
        padding: 0.2em 0.5em;
        font-size: 0.8em;
        font-weight: 800;
        background: var(--background-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .Aurora-Dia--tips span {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding: 0 0.1em;
        color: #7aa2f7;
        background-color: #7aa2f7;
        background-image: var(--strong-gradient);
    }

    @keyframes deactivate {
        0% {
            border-color: var(--text-sub-accent);
        }
        20%,
        60% {
            border-color: var(--text-accent);
        }
        40%,
        80%,
        100% {
            border-color: var(--background-secondary);
        }
    }

    @keyframes tips-breathe {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }

    @keyframes bounce-then-breathe {
        0%,
        5%,
        10%,
        15% {
            transform: translateY(0);
        }
        2.5%,
        7.5%,
        12.5% {
            transform: translateY(-15px);
        }
        20%,
        40%,
        60%,
        80%,
        100% {
            height: var(--auora-dia--jump-1);
            transform: translateY(0);
        }
        30%,
        50%,
        70%,
        90% {
            height: var(--auora-dia--jump-2);
            transform: translateY(-5px);
        }
    }

    @keyframes breathe-and-jump {
        0%,
        40%,
        80%,
        100% {
            height: var(--auora-dia--jump-1);
            transform: translateY(0);
        }
        20%,
        60%,
        70%,
        90% {
            height: var(--auora-dia--jump-2);
            transform: translateY(-5px);
        }
        85% {
            height: var(--auora-dia--jump-3);
            transform: translateY(-20px);
        }
    }

    @keyframes blink {
        0%,
        100% {
            transform: scale(1, 0.05);
        }
        5%,
        95% {
            transform: scale(1, 1);
        }
    }

    @keyframes jump-pulse {
        0%,
        40%,
        80%,
        100% {
            box-shadow:
                    0 0 30px var(--aurora-dia--platform-light),
                    0 0 45px var(--aurora-dia--platform-light) inset;
        }
        20%,
        60%,
        70%,
        90% {
            box-shadow:
                    0 0 70px var(--aurora-dia--platform-light),
                    0 0 25px var(--aurora-dia--platform-light) inset;
        }
        85% {
            box-shadow:
                    0 0 100px var(--aurora-dia--platform-light),
                    0 0 15px var(--aurora-dia--platform-light) inset;
        }
    }

    @keyframes shake-to-alert {
        0%,
        20%,
        40%,
        60%,
        80%,
        100% {
            transform: rotate(0) translateY(-8px);
        }
        10%,
        25%,
        35%,
        50%,
        65% {
            transform: rotate(7deg) translateY(-8px);
        }
        15%,
        30%,
        45%,
        55%,
        70% {
            transform: roate(-7deg) translateY(-8px);
        }
    }

    @keyframes shake-pulse {
        0%,
        20%,
        40%,
        60%,
        80%,
        100% {
            box-shadow:
                    0 0 var(--auora-dia--platform-size) #2cdcff,
                    0 0 15px #2cdcff inset;
        }
        10%,
        25%,
        35%,
        50%,
        65% {
            box-shadow:
                    0 0 var(--auora-dia--platform-size-shake-1) #2cdcff,
                    0 0 15px #2cdcff inset;
        }
        15%,
        30%,
        45%,
        55%,
        70% {
            box-shadow:
                    0 0 var(--auora-dia--platform-size-shake-2) #2cdcff,
                    0 0 15px #2cdcff inset;
        }
    }

`
  , de = ["Hi, I am <span>Dia</span>, I am here to help you~", "Long time no see, time passes with the blink of the eyes...", "Hi～ Come play with me！", "*Hammer your chest with my kitty fist*", "showQuote"]
  , pe = "LOL, you opened the console, want to find out my little secrets?"
  , ue = "What have you copied? Remember to add the source when using it!"
  , me = "Welcome back my friend!~"
  , fe = {
    24: "Are you a night owl? Will you able get up tomorrow?",
    "5_7": "Good morning! The plan for a day lies in the morning, and a beautiful day is about to begin.",
    "7_11": "Good morning! How is your day doing? don't sit for too long!",
    "11_13": "It's noon, Must have being working all morning, and it's lunch time!",
    "13_17": "It's easy to get sleepy in the afternoon. Have a cup of coffee maybe?",
    "17_19": "It's evening! The sunset outside the window is beautiful.",
    "19_21": "Good evening, how are you doing today?",
    "21_23": ["It's getting late, rest early, good night~", "Take good care of your eyes!"]
}
  , ge = {
    self: "Welcome to <span>「[PLACEHOLDER]」</span>",
    baidu: "Hello！Friend from Baidu search engine,<br>did you search <span>「[PLACEHOLDER]」</span> to find me？",
    so: "Hello！Friend from 360 search engine,<br>did you search <span>「[PLACEHOLDER]」</span> to find me？",
    google: "Hello！Friend from Google search engine,<br>enjoy your time reading <span>「[PLACEHOLDER]」</span>",
    site: "Hello there, friend from <span>[PLACEHOLDER]</span>",
    other: "Thanks for reading <span>「[PLACEHOLDER]」</span>"
}
  , ye = [{
    selector: "#Aurora-Dia",
    text: ["Waaaaaaaa...What are you <span>doing</span>? O.O", "Please be gentle, I am very delicate! O.O", "<span>Sir yes sir!</span> What can I help you with? O.O"]
}, {
    selector: "[data-menu='Home']",
    text: ["Click to go to the <span>home page</span>. ", "Yes, click here to go <span>back home</span>.", "Go take a look at the <span>home page</span>."]
}, {
    selector: "[data-menu='About']",
    text: ["You want to know more about my <span>master</span>?", "Here hides all the <span>secrets of my master</span>, want to take a look?", "Found my master's <span>secret hideout</span>!"]
}, {
    selector: "[data-menu='Archives']",
    text: ["Here stores all the <span>works</span> my master had done！", "Wanna see my master's <span>library?</span>", "Yes, my masters' <span>ancient histories</span> are all here!"]
}, {
    selector: "[data-menu='Tags']",
    text: ["Click here to look at <span>article tags</span>.", "Tags are used to better <span>categorize</span> your articles."]
}, {
    selector: "[data-dia='language']",
    text: "Master's blog supports multiple <span>languages.</span>"
}, {
    selector: "[data-dia='light-switch']",
    text: "You can switch between <span>light</span> and <span>dark</span> mode, click the switch to see the magic!"
}, {
    selector: "[data-dia='author']",
    text: ["Here is a short profile of my master.", "Click any of these links can teleport to my master's other worlds."]
}, {
    selector: "[data-dia='jump-to-comment']",
    text: ["Do you want to check out the comments?", "Click here will help you jump right into the comments section."]
}]
  , be = [{
    selector: "[data-dia='search']",
    text: ["Didn't find what you are looking for? Try search it here!", "You can also use <span>ctrl/cmd + k</span> keyboard shortcut to open the search menu."]
}, {
    selector: "[data-dia='article-link']",
    text: ["Enjoy reading:<span>「{text}」</span>.", "That's a good pick, enjoy time reading this article.", "Hope you can learn something from:<span>「{text}」</span>."]
}, {
    selector: ".gt-header-textarea",
    text: ["Wanna write something?", "Be sure write your comment carefully meow~", "Anything you want to say to the author?", "If you think the article is good, leave a message for the author."]
}, {
    selector: ".veditor",
    text: ["Wanna write something?", "Be sure write your comment carefully meow~", "Anything you want to say to the author?", "If you think the article is good, leave a message for the author."]
}]
  , ve = [{
    date: "01/01",
    text: "<span>Happy new year</span>，{year}～"
}, {
    date: "02/14",
    text: "It's <span>Valentine's Day</span>，have you found your loved one in {year}?"
}, {
    date: "03/08",
    text: "Today is <span>International Women's Day</span>！"
}, {
    date: "04/01",
    text: "Tell you a secret, don't trust anyone today, because today is <span>April Fool</span>"
}, {
    date: "05/01",
    text: "Today is <span>International Labour Day</span>，have you planned to go travel?"
}, {
    date: "12/20-12/30",
    text: "These few days is <span>Christmas</span>，my master must being shopping like crazy!"
}, {
    date: "12/31",
    text: "Today is <span>New Year's Eve</span>, this year is going away, but next year is going to be better!"
}]
  , ct = {
    messages: de,
    console: pe,
    copy: ue,
    visibility_change: me,
    welcome: fe,
    referrer: ge,
    mouseover: ye,
    click: be,
    events: ve
}
  , ht = Object.freeze(Object.defineProperty({
    __proto__: null,
    click: be,
    console: pe,
    copy: ue,
    default: ct,
    events: ve,
    messages: de,
    mouseover: ye,
    referrer: ge,
    visibility_change: me,
    welcome: fe
}, Symbol.toStringTag, {
    value: "Module"
}))
  , _e = ["你好，我是 <span>Dia</span>，好高兴遇见你～", "好久不见，日子过得好快呢……", "<span>大坏蛋！</span>你都多久没理人家了呀，嘤嘤嘤～", "嗨～快来逗我玩吧！", "拿小拳拳锤你胸口！", "学习使我们快乐，快乐使我们更想学习～", "showQuote"]
  , $e = "哈哈，你打开了控制台，是想要看看我的小秘密吗？"
  , Ae = "你都复制了些什么呀，转载要记得加上出处哦！"
  , xe = "老朋友，你怎么才回来呀～"
  , Ee = {
    24: "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？",
    "5_7": "早上好！一日之计在于晨，美好的一天就要开始了。",
    "7_11": "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！",
    "11_13": "中午了，工作了一个上午，现在是午餐时间！",
    "13_17": "午后很容易犯困呢，今天的运动目标完成了吗？",
    "17_19": "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～",
    "19_21": "晚上好，今天过得怎么样？",
    "21_23": ["已经这么晚了呀，早点休息吧，晚安～", "深夜时要爱护眼睛呀！"]
}
  , we = {
    self: "欢迎来到<span>「[PLACEHOLDER]」</span>",
    baidu: "Hello！来自 百度搜索 的朋友<br>你是搜索 <span>「[PLACEHOLDER]」</span> 找到的我吗？",
    so: "Hello！来自 360搜索 的朋友<br>你是搜索 <span>「[PLACEHOLDER]」</span> 找到的我吗？",
    google: "Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span>「[PLACEHOLDER]」</span>",
    site: "Hello！来自 <span>[PLACEHOLDER]</span> 的朋友",
    other: "欢迎阅读 <span>[PLACEHOLDER]</span>"
}
  , Se = [{
    selector: "#Aurora-Dia",
    text: ["哇啊啊啊啊啊啊... <span>你想干嘛</span>? O.O", "请您轻一点，我是<span>很昂贵</span>的机器人哦! O.O", "<span>领导，我在呢!</span> 我有什么可以帮到你呢? O.O"]
}, {
    selector: "[data-menu='Home']",
    text: ["点击前往首页，想回到上一页可以使用浏览器的后退功能哦。", "点它就可以回到首页啦！", "回首页看看吧。"]
}, {
    selector: "[data-menu='About']",
    text: ["你想知道我家主人是谁吗？", "这里有一些关于我家主人的秘密哦，要不要看看呢？", "发现主人出没地点！"]
}, {
    selector: "[data-menu='Archives']",
    text: ["这里存储了主人的所有作品哦！", "想看看主人的图书馆吗？"]
}, {
    selector: "[data-menu='Tags']",
    text: ["点击就可以看文章的标签啦！", "使用标签可以更好的分类你的文章哦～"]
}, {
    selector: "[data-dia='language']",
    text: "主人的博客支持多种语言。"
}, {
    selector: "[data-dia='light-switch']",
    text: "您可以点击这里切换黑白模式哦！"
}, {
    selector: "[data-dia='author']",
    text: ["这是我主人的简介。", "点击其中任何一个链接都可以传送到我主人的其他世界。"]
}, {
    selector: "[data-dia='jump-to-comment']",
    text: ["你想看看评论吗?", "点击这里可以帮助你直接跳转到评论部分。"]
}]
  , Ce = [{
    selector: "[data-dia='search']",
    text: ["没有看到你想要的文章，那么就输入你想搜索的关键词吧～", "可以使用 ctrl/cmd + k 快捷键打开搜索哦～"]
}, {
    selector: "[data-dia='article-link']",
    text: ["希望你会喜欢这篇文章：<span>「{text}」</span>.", "您的选择真的不错哦！好好享受这篇文章吧～", "希望您能从 <span>「{text}」</span>这篇文章中学到点东西。"]
}, {
    selector: ".gt-header-textarea",
    text: ["要吐槽些什么呢？", "一定要认真填写喵～", "有什么想说的吗？", "如果觉得文章不错的话，就给博主留个言吧～"]
}, {
    selector: ".veditor",
    text: ["要吐槽些什么呢？", "一定要认真填写喵～", "有什么想说的吗？", "如果觉得文章不错的话，就给博主留个言吧～"]
}]
  , Te = [{
    date: "01/01",
    text: "<span>元旦</span>了呢，新的一年又开始了，今年是{year}年～"
}, {
    date: "02/14",
    text: "又是一年<span>情人节</span>，{year}年找到对象了嘛～"
}, {
    date: "03/08",
    text: "今天是<span>国际妇女节</span>！"
}, {
    date: "03/12",
    text: "今天是<span>植树节</span>，要保护环境呀！"
}, {
    date: "04/01",
    text: "悄悄告诉你一个秘密～<span>今天是愚人节，不要被骗了哦～</span>"
}, {
    date: "05/01",
    text: "今天是<span>五一劳动节</span>，计划好假期去哪里了吗～"
}, {
    date: "06/01",
    text: "<span>儿童节</span>了呢，快活的时光总是短暂，要是永远长不大该多好啊…"
}, {
    date: "09/03",
    text: "<span>中国人民抗日战争胜利纪念日</span>，铭记历史、缅怀先烈、珍爱和平、开创未来。"
}, {
    date: "09/10",
    text: "<span>教师节</span>，在学校要给老师问声好呀～"
}, {
    date: "10/01",
    text: "<span>国庆节</span>到了，为祖国母亲庆生！"
}, {
    date: "11/05-11/12",
    text: "今年的<span>双十一</span>是和谁一起过的呢～"
}, {
    date: "12/20-12/31",
    text: "这几天是<span>圣诞节</span>，主人肯定又去剁手买买买了～"
}]
  , dt = {
    messages: _e,
    console: $e,
    copy: Ae,
    visibility_change: xe,
    welcome: Ee,
    referrer: we,
    mouseover: Se,
    click: Ce,
    events: Te
}
  , pt = Object.freeze(Object.defineProperty({
    __proto__: null,
    click: Ce,
    console: $e,
    copy: Ae,
    default: dt,
    events: Te,
    messages: _e,
    mouseover: Se,
    referrer: we,
    visibility_change: xe,
    welcome: Ee
}, Symbol.toStringTag, {
    value: "Module"
}))
  , ke = ["妳好，我是 <span>Dia</span>，好高興遇見妳～", "好久不見，日子過得好快呢……", "<span>大壞蛋！</span>妳都多久沒理人家了呀，嚶嚶嚶～", "嗨～快來逗我玩吧！", "拿小拳拳錘妳胸口！", "學習使我們快樂，快樂使我們更想學習～", "showQuote"]
  , De = "哈哈，妳打開了控制臺，是想要看看我的小秘密嗎？"
  , Oe = "妳都復制了些什麽呀，轉載要記得加上出處哦！"
  , Le = "老朋友，妳怎麽才回來呀～"
  , He = {
    24: "妳是夜貓子呀？這麽晚還不睡覺，明天起的來嘛？",
    "5_7": "早上好！一日之計在於晨，美好的一天就要開始了。",
    "7_11": "上午好！工作順利嘛，不要久坐，多起來走動走動哦！",
    "11_13": "中午了，工作了一個上午，現在是午餐時間！",
    "13_17": "午後很容易犯睏呢，今天的運動目標完成了嗎？",
    "17_19": "傍晚了！窗外夕陽的景色很美麗呢，最美不過夕陽紅～",
    "19_21": "晚上好，今天過得怎麽樣？",
    "21_23": ["已經這麽晚了呀，早點休息吧，晚安～", "深夜時要愛護眼睛呀！"]
}
  , Pe = {
    self: "歡迎來到<span>「[PLACEHOLDER]」</span>",
    baidu: "Hello！來自 百度搜索 的朋友<br>妳是搜索 <span>「[PLACEHOLDER]」</span> 找到的我嗎？",
    so: "Hello！來自 360搜索 的朋友<br>妳是搜索 <span>「[PLACEHOLDER]」</span> 找到的我嗎？",
    google: "Hello！來自 谷歌搜索 的朋友<br>歡迎閱讀<span>「[PLACEHOLDER]」</span>",
    site: "Hello！來自 <span>[PLACEHOLDER]</span> 的朋友",
    other: "歡迎閱讀 <span>[PLACEHOLDER]</span>"
}
  , Me = [{
    selector: "#Aurora-Dia",
    text: ["哇啊啊啊啊啊啊... <span>妳想幹嘛</span>? O.O", "請您輕一點，我是<span>很昂貴</span>的機器人哦! O.O", "<span>領導，我在呢!</span> 我有什麽可以幫到妳呢? O.O"]
}, {
    selector: "[data-menu='Home']",
    text: ["點擊前往首頁，想回到上一頁可以使用瀏覽器的後退功能哦。", "點它就可以回到首頁啦！", "回首頁看看吧。"]
}, {
    selector: "[data-menu='About']",
    text: ["妳想知道我家主人是誰嗎？", "這裏有一些關於我家主人的秘密哦，要不要看看呢？", "發現主人出沒地點！"]
}, {
    selector: "[data-menu='Archives']",
    text: ["這裏存儲了主人的所有作品哦！", "想看看主人的圖書館嗎？"]
}, {
    selector: "[data-menu='Tags']",
    text: ["點擊就可以看文章的標簽啦！", "使用標簽可以更好的分類妳的文章哦～"]
}, {
    selector: "[data-dia='language']",
    text: "主人的博客支持多種語言。"
}, {
    selector: "[data-dia='light-switch']",
    text: "您可以點擊這裏切換黑白模式哦！"
}, {
    selector: "[data-dia='author']",
    text: ["這是我主人的簡介。", "點擊其中任何一個鏈接都可以傳送到我主人的其他世界。"]
}, {
    selector: "[data-dia='jump-to-comment']",
    text: ["妳想看看評論嗎?", "點擊這裏可以幫助妳直接跳轉到評論部分。"]
}]
  , Re = [{
    selector: "[data-dia='search']",
    text: ["沒有看到妳想要的文章，那麽就輸入妳想搜索的關鍵詞吧～", "可以使用 ctrl/cmd + k 快捷鍵打開搜索哦～"]
}, {
    selector: "[data-dia='article-link']",
    text: ["希望妳會喜歡這篇文章：<span>「{text}」</span>.", "您的選擇真的不錯哦！好好享受這篇文章吧～", "希望您能從 <span>「{text}」</span>這篇文章中學到點東西。"]
}, {
    selector: ".gt-header-textarea",
    text: ["要吐槽些什麽呢？", "一定要認真填寫喵～", "有什麽想說的嗎？", "如果覺得文章不錯的話，就給博主留個言吧～"]
}, {
    selector: ".veditor",
    text: ["要吐槽些什麽呢？", "一定要認真填寫喵～", "有什麽想說的嗎？", "如果覺得文章不錯的話，就給博主留個言吧～"]
}]
  , Ie = [{
    date: "01/01",
    text: "<span>元旦</span>了呢，新的一年又開始了，今年是{year}年～"
}, {
    date: "02/14",
    text: "又是一年<span>情人節</span>，{year}年找到對象了嘛～"
}, {
    date: "03/08",
    text: "今天是<span>國際婦女節</span>！"
}, {
    date: "03/12",
    text: "今天是<span>植樹節</span>，要保護環境呀！"
}, {
    date: "04/01",
    text: "悄悄告訴妳一個秘密～<span>今天是愚人節，不要被騙了哦～</span>"
}, {
    date: "05/01",
    text: "今天是<span>五一勞動節</span>，計劃好假期去哪裏了嗎～"
}, {
    date: "06/01",
    text: "<span>兒童節</span>了呢，快活的時光總是短暫，要是永遠長不大該多好啊…"
}, {
    date: "09/03",
    text: "<span>中國人民抗日戰爭勝利紀念日</span>，銘記歴史、緬懷先烈、珍愛和平、開創未來。"
}, {
    date: "09/10",
    text: "<span>教師節</span>，在學校要給老師問聲好呀～"
}, {
    date: "10/01",
    text: "<span>國慶節</span>到了，為祖國母親慶生！"
}, {
    date: "11/05-11/12",
    text: "今年的<span>雙十一</span>是和誰一起過的呢～"
}, {
    date: "12/20-12/31",
    text: "這幾天是<span>聖誕節</span>，主人肯定又去剁手買買買了～"
}]
  , ut = {
    messages: ke,
    console: De,
    copy: Oe,
    visibility_change: Le,
    welcome: He,
    referrer: Pe,
    mouseover: Me,
    click: Re,
    events: Ie
}
  , mt = Object.freeze(Object.defineProperty({
    __proto__: null,
    click: Re,
    console: De,
    copy: Oe,
    default: ut,
    events: Ie,
    messages: ke,
    mouseover: Me,
    referrer: Pe,
    visibility_change: Le,
    welcome: He
}, Symbol.toStringTag, {
    value: "Module"
}));
let Ue = class {
    constructor() {
        this.configs = {
            locale: "en",
            tips: {}
        },
        this.software = new ie,
        this.eyesAnimationTimer = void 0
    }
    installSoftware(e) {
        e && (this.configs.locale = e.locale,
        this.configs.tips = e.tips),
        this.software = new ie({
            locale: this.configs.locale,
            botScript: this.configs.tips,
            containerId: "Aurora-Dia--tips-wrapper",
            messageId: "Aurora-Dia--tips"
        })
    }
    on() {
        this.software.load()
    }
}
;
class ie {
    constructor(e) {
        this.config = {
            botScript: {},
            containerId: "",
            messageId: "",
            botId: "Aurora-Did",
            locale: "en"
        },
        this.messageCacheKey = "__AURORA_BOT_MESSAGE__",
        this.mouseoverEventCacheKey = "__AURORA_BOT_MOUSE_OVER__",
        this.userAction = !1,
        this.userActionTimer = void 0,
        this.messageTimer = void 0,
        this.messages = [],
        this.locales = {},
        this.botTips = {},
        e && (this.config = {
            botScript: e.botScript ? e.botScript : this.config.botScript,
            containerId: e.containerId ? e.containerId : "",
            messageId: e.messageId ? e.messageId : "",
            botId: "Aurora-Dia",
            locale: e.locale ? e.locale : "en"
        })
    }
    load() {
        this.loadLocaleMessages(),
        this.injectBotScripts(),
        this.messages = this.botTips.messages,
        window.addEventListener("mousemove", () => this.userAction = !0),
        window.addEventListener("keydown", () => this.userAction = !0),
        sessionStorage.removeItem(this.messageCacheKey),
        setInterval( () => {
            this.userAction ? (this.userAction = !1,
            clearInterval(this.userActionTimer),
            this.userActionTimer = void 0) : this.userActionTimer || (this.userActionTimer = setInterval( () => {
                this.showMessage(this.randomSelection(this.messages), 6e3, 9)
            }
            , 2e4))
        }
        , 1e3),
        this.registerEventListener(),
        setTimeout( () => {
            this.showWelcomeMessage()
        }
        , 3e3)
    }
    injectBotScripts() {
        let e = [];
        const t = this.config.botScript;
        this.botTips = this.locales[this.config.locale],
        t !== void 0 && (e = Object.keys(t),
        e.length > 0 && e.forEach(i => {
            this.botTips = {
                ...this.botTips,
                [i]: t[i]
            }
        }
        ))
    }
    registerEventListener() {
        document.addEventListener("copy", () => {
            console.log("copy"),
            this.showMessage(this.botTips.copy, 6e3, 9)
        }
        ),
        document.addEventListener("visibilitychange", () => {
            document.hidden || this.showMessage(this.botTips.visibility_change, 6e3, 9)
        }
        ),
        this.botTips.mouseover && this.botTips.mouseover.length > 0 && document.addEventListener("mouseover", e => {
            for (const t of this.botTips.mouseover) {
                const i = t.selector;
                let s = t.text;
                if (e.preventDefault(),
                e.target && e.target instanceof HTMLElement) {
                    if (!e.target.matches(i))
                        continue;
                    if (sessionStorage.getItem(this.mouseoverEventCacheKey) && sessionStorage.getItem(this.mouseoverEventCacheKey) === i)
                        return;
                    s = this.randomSelection(s),
                    s = s.replace("{text}", e.target.innerText),
                    this.showMessage(s, 4e3, 8),
                    sessionStorage.setItem(this.mouseoverEventCacheKey, i),
                    setTimeout( () => {
                        sessionStorage.removeItem(this.mouseoverEventCacheKey)
                    }
                    , 4e3);
                    return
                }
            }
        }
        ),
        this.botTips.click && this.botTips.click.length > 0 && document.addEventListener("click", e => {
            if (e.target && e.target instanceof HTMLElement)
                for (const t of this.botTips.click) {
                    const i = t.selector;
                    let s = t.text;
                    if (e.target && e.target instanceof HTMLElement) {
                        if (!e.target.matches(i))
                            continue;
                        s = this.randomSelection(s),
                        s = s.replace("{text}", e.target.innerText),
                        this.showMessage(s, 4e3, 8);
                        return
                    }
                }
        }
        ),
        this.botTips.events && this.botTips.events.length > 0 && this.botTips.events.forEach(e => {
            const t = new Date
              , i = e.date.split("-")[0]
              , s = e.date.split("-")[1] || i;
            i.split("/")[0] <= t.getMonth() + 1 && t.getMonth() + 1 <= s.split("/")[0] && i.split("/")[1] <= t.getDate() && t.getDate() <= s.split("/")[1] && (e.text = this.randomSelection(e.text),
            e.text = e.text.replace("{year}", t.getFullYear()),
            this.messages.push(e.text))
        }
        )
    }
    showWelcomeMessage() {
        let e;
        if (location.pathname === "/") {
            const t = new Date().getHours();
            t > 5 && t <= 7 ? e = this.botTips["5_7"] : t > 7 && t <= 11 ? e = this.botTips.welcome["7_11"] : t > 11 && t <= 13 ? e = this.botTips.welcome["11_13"] : t > 13 && t <= 17 ? e = this.botTips.welcome["13_17"] : t > 17 && t <= 19 ? e = this.botTips.welcome["17_19"] : t > 19 && t <= 21 ? e = this.botTips.welcome["19_21"] : t > 21 && t <= 23 ? e = this.botTips.welcome["21_23"] : e = this.botTips.welcome[24]
        } else if (document.referrer !== "") {
            const t = new URL(document.referrer)
              , i = t.hostname.split(".")[1];
            location.hostname === t.hostname ? e = this.botTips.referrer.self.replace("[PLACEHOLDER]", document.title.split(" - ")[0]) : i === "baidu" ? e = this.botTips.referrer.baidu.replace("[PLACEHOLDER]", t.search.split("&wd=")[1].split("&")[0]) : i === "so" ? e = this.botTips.referrer.so.replace("[PLACEHOLDER]", t.search.split("&q=")[1].split("&")[0]) : i === "google" ? e = this.botTips.referrer.google.replace("[PLACEHOLDER]", document.title.split(" - ")[0]) : e = this.botTips.referrer.site.replace("[PLACEHOLDER]", t.hostname)
        } else
            e = this.botTips.referrer.other.replace("[PLACEHOLDER]", document.title.split(" - ")[0]);
        this.showMessage(e, 7e3, 8)
    }
    loadLocaleMessages() {
        const e = Object.assign({
            "./messages/en.json": ht,
            "./messages/zh-CN.json": pt,
            "./messages/zh-TW.json": mt
        })
          , t = {};
        Object.keys(e).forEach(i => {
            const s = i.match(/([A-Za-z0-9-_]+)\./i);
            if (s && s.length > 1) {
                const o = s[1];
                t[o] = e[i]
            }
        }
        ),
        this.locales = t
    }
    showMessage(e, t, i) {
        var h;
        const s = sessionStorage.getItem(this.messageCacheKey) ?? "";
        if (!e || s !== "" && parseInt(s) > i)
            return;
        if (this.messageTimer && (clearTimeout(this.messageTimer),
        this.messageTimer = void 0),
        sessionStorage.setItem(this.messageCacheKey, String(i)),
        e = this.randomSelection(e),
        e === "showQuote") {
            this.showQuote();
            return
        }
        const o = (h = document.querySelector("aurora-dia")) == null ? void 0 : h.shadowRoot
          , r = o == null ? void 0 : o.querySelector("#Aurora-Dia--tips-wrapper")
          , l = o == null ? void 0 : o.querySelector("#Aurora-Dia--tips");
        let n = document.createElement("null");
        this.config.botId && (n = (o == null ? void 0 : o.querySelector("#" + this.config.botId)) ?? document.createElement("null")),
        l instanceof Element && r instanceof Element && (l.innerHTML = e,
        r.classList.add("active"),
        n instanceof Element && n.classList.add("active"),
        this.messageTimer = setTimeout( () => {
            sessionStorage.removeItem(this.messageCacheKey),
            r.classList.remove("active"),
            n instanceof Element && n.classList.remove("active")
        }
        , t))
    }
    randomSelection(e) {
        return Array.isArray(e) ? e[Math.floor(Math.random() * e.length)] : e
    }
    showQuote() {
        (this.config.locale === "zh-CN" || this.config.locale === "zh-TW") && this.getHitokoto()
    }
    getHitokoto() {
        fetch("https://v1.hitokoto.cn").then(e => e.json()).then(e => {
            this.showMessage(e.hitokoto, 6e3, 9)
        }
        )
    }
    getTheySaidSo() {
        fetch("https://quotes.rest/qod?language=en").then(e => e.json()).then(e => {
            this.showMessage(e.contents.quotes[0].quote, 6e3, 9)
        }
        )
    }
}
var ft = Object.defineProperty
  , gt = Object.getOwnPropertyDescriptor
  , L = (a, e, t, i) => {
    for (var s = i > 1 ? void 0 : i ? gt(e, t) : e, o = a.length - 1, r; o >= 0; o--)
        (r = a[o]) && (s = (i ? r(e, t, s) : r(s)) || s);
    return i && s && ft(e, t, s),
    s
}
;
let y = class extends C {
    constructor() {
        super(...arguments),
        this.showDia = !1,
        this.dia = new Ue,
        this.position = "left",
        this.themeConfig = {
            dark_mode: "auto",
            profile_shape: "diamond",
            feature: !0,
            gradient: {
                color_1: "#24c6dc",
                color_2: "#5433ff",
                color_3: "#ff0099"
            },
            header_gradient_css: "linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)",
            background_gradient_style: {
                background: "linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                "-webkit-box-decoration-break": "clone",
                "box-decoration-break": "clone"
            }
        },
        this.currentColorScheme = "light",
        this.leftEyeEl = null,
        this.rightEyeEl = null,
        this.eyesEl = null,
        this.eyesAnimationTimer = void 0
    }
    firstUpdated() {
        var a, e, t;
        this.initializeBot(),
        this.leftEyeEl = (a = this.shadowRoot) == null ? void 0 : a.querySelector("#Aurora-Dia--left-eye"),
        this.rightEyeEl = (e = this.shadowRoot) == null ? void 0 : e.querySelector("#Aurora-Dia--right-eye"),
        this.eyesEl = (t = this.shadowRoot) == null ? void 0 : t.querySelector("#Aurora-Dia--eyes"),
        this.leftEyeEl && this.rightEyeEl && this.eyesEl && this.activateMotion()
    }
    activateMotion() {
        let a = null
          , e = 0
          , t = 0;
        document.addEventListener("mousemove", i => {
            this.leftEyeEl && this.rightEyeEl && this.eyesEl && (a && cancelAnimationFrame(a),
            a = requestAnimationFrame( () => {
                const s = -(this.eyesEl.getBoundingClientRect().left - i.clientX) / 100
                  , o = -(this.eyesEl.getBoundingClientRect().top - i.clientY) / 120;
                (s !== e || o !== t) && (this.leftEyeEl.style.transform = `translateY(${o}px) translateX(${s}px)`,
                this.rightEyeEl.style.transform = `translateY(${o}px) translateX(${s}px)`,
                e = s,
                t = o),
                clearTimeout(this.eyesAnimationTimer),
                this.eyesEl.classList.add("moving"),
                this.eyesAnimationTimer = setTimeout( () => {
                    this.leftEyeEl.style.transform = "translateY(0) translateX(0)",
                    this.rightEyeEl.style.transform = "translateY(0) translateX(0)",
                    this.eyesEl.classList.remove("moving")
                }
                , 2e3)
            }
            ))
        }
        )
    }
    updated(a) {
        super.updated(a),
        a.has("themeConfig") && this.initializeBot()
    }
    initStore(a) {
        this.dia.installSoftware(a),
        this.dia.on()
    }
    initializeBot() {
        this.initStore({
            locale: "zh-CN"
        }),
        setTimeout( () => {
            this.showDia = !0
        }
        , 1e3)
    }
    detectColorScheme() {
        const a = window.matchMedia("(prefers-color-scheme: dark)");
        this.currentColorScheme = a.matches ? "dark" : "light",
        a.addEventListener("change", e => {
            this.currentColorScheme = e.matches ? "dark" : "light",
            this.requestUpdate()
        }
        )
    }
    get cssVariables() {
        var a, e, t, i, s, o, r;
        return {
            "--aurora-dia--linear-gradient": ((a = this.themeConfig) == null ? void 0 : a.header_gradient_css) || "",
            "--aurora-dia--linear-gradient-hover": `linear-gradient(to bottom, ${(t = (e = this.themeConfig) == null ? void 0 : e.gradient) == null ? void 0 : t.color_2}, ${(s = (i = this.themeConfig) == null ? void 0 : i.gradient) == null ? void 0 : s.color_3})`,
            "--aurora-dia--platform-light": ((r = (o = this.themeConfig) == null ? void 0 : o.gradient) == null ? void 0 : r.color_3) || "",
            "--text-normal": this.currentColorScheme === "dark" ? "#bebebe" : "#333333",
            "--text-accent": this.currentColorScheme === "dark" ? "#0fb6d6" : "#e93796",
            "--text-sub-accent": this.currentColorScheme === "dark" ? "#f4569d" : "#547ce7",
            "--background-secondary": this.currentColorScheme === "dark" ? "#212121" : "#ffffff"
        }
    }
    render() {
        return Ge`
            
            <div id="bot-container" style="${this.position === "left" ? "left: 20px;" : "right:20px;"}">
                <div id="Aurora-Dia--body" style="${this.computeCssVariables}">
                    <div id="Aurora-Dia--tips-wrapper" style="${this.position === "left" ? "right: -120px;" : "left: -120px;"}">
                        <div id="Aurora-Dia--tips" class="Aurora-Dia--tips">早上好呀～</div>
                    </div>
                    <div id="Aurora-Dia" class="Aurora-Dia">
                        <div id="Aurora-Dia--eyes" class="Aurora-Dia--eyes">
                            <div id="Aurora-Dia--left-eye" class="Aurora-Dia--eye left"></div>
                            <div id="Aurora-Dia--right-eye" class="Aurora-Dia--eye right"></div>
                        </div>
                    </div>
                    <div class="Aurora-Dia--platform"></div>
                </div>
            </div>
    `
    }
    get computeCssVariables() {
        return `
      --aurora-dia--linear-gradient: ${this.cssVariables["--aurora-dia--linear-gradient"]};
      --aurora-dia--linear-gradient-hover: ${this.cssVariables["--aurora-dia--linear-gradient-hover"]};
      --aurora-dia--platform-light: ${this.cssVariables["--aurora-dia--platform-light"]};
        --text-normal: ${this.cssVariables["--text-normal"]};
        --text-accent: ${this.cssVariables["--text-accent"]};
        --text-sub-accent: ${this.cssVariables["--text-sub-accent"]};
        --background-secondary: ${this.cssVariables["--background-secondary"]};
        
    `
    }
}
;
y.styles = [lt, re`
  `];
L([U({
    type: Boolean
})], y.prototype, "showDia", 2);
L([U({
    type: Ue
})], y.prototype, "dia", 2);
L([U({
    type: String
})], y.prototype, "position", 2);
L([U({
    type: Object
})], y.prototype, "themeConfig", 2);
y = L([ot("aurora-dia")], y);
customElements.get("aurora-dia") || customElements.define("aurora-dia", y);
