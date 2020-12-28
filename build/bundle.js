/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./server/config.js":
/*!**************************!*\
  !*** ./server/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nvar config = {\n  csr: true\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://reactssr/./server/config.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config */ \"./server/config.js\");\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/App */ \"./src/App.js\");\n/* harmony import */ var _src_component_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/component/Header */ \"./src/component/Header.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../src/store/store */ \"./src/store/store.js\");\n/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! http-proxy-middleware */ \"http-proxy-middleware\");\n/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11__);\n// 这里的node代码，会用babel处理\n\n\n\n\n\n\n\n\n\n\n\nvar store = (0,_src_store_store__WEBPACK_IMPORTED_MODULE_10__.getServerStore)();\nvar app = express__WEBPACK_IMPORTED_MODULE_5___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_5___default().static('public')); // 客户端来的api开头的请求\n// 原先版本是proxy，现在是http-proxy-middleware\n\n\napp.use('/api', (0,http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11__.createProxyMiddleware)({\n  target: 'http://localhost:9012',\n  changeOrigin: true\n}));\n\nfunction csrRender(res) {\n  // 读取csr文件 返回\n  var filename = path__WEBPACK_IMPORTED_MODULE_0___default().resolve(process.cwd(), 'public/index.spa.html');\n  var html = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(filename, 'utf-8');\n  return res.send(html);\n}\n\napp.get('*', function (req, res) {\n  if (req.query._mode === 'csr') {\n    console.log('url参数开启csr降级');\n    return csrRender(res);\n  }\n\n  if (_config__WEBPACK_IMPORTED_MODULE_6__.default.csr) {\n    console.log('csr全局开关打开');\n    return csrRender(res);\n  } // 根据路由获取渲染的组件，并拿到loadData方法，获取数据\n  // 存储网络请求\n\n\n  var promises = [];\n  _src_App__WEBPACK_IMPORTED_MODULE_7__.default.some(function (route) {\n    var match = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.matchPath)(req.path, route);\n\n    if (match) {\n      var loadData = route.component.loadData;\n\n      if (loadData) {\n        // !!!!! 如果一个组件请求报错, 如何不影响其他组件显示\n        // 第一种: 规避报错, 使用promise包一层, 可以加日志--catach里\n        var promise = new Promise(function (resolve, reject) {\n          loadData(store).then(resolve)[\"catch\"](resolve);\n        });\n        promises.push(promise); // 第二种: Promise.allSettled\n        // promises.push(loadData(store))\n      }\n    }\n  }); // 等待所有网络请求结束再渲染\n\n  Promise.all(promises).then(function () {\n    // 处理404页面\n    var context = {\n      css: []\n    }; // 把react组件解析成html\n\n    var content = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_3__.renderToString)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_9__.Provider, {\n      store: store\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.StaticRouter, {\n      location: req.url,\n      context: context\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_src_component_Header__WEBPACK_IMPORTED_MODULE_8__.default, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Switch, null, _src_App__WEBPACK_IMPORTED_MODULE_7__.default.map(function (route) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, route);\n    }))))); // 状态码切换和页面跳转\n    // 改变错误请求状态码如404，不然都是返回200\n\n    console.log('context', context);\n\n    if (context.statuscode) {\n      // 状态码切换\n      res.status(context.statuscode);\n    } // 状态码301 -- 页面跳转\n\n\n    if (context.action === 'REPLACE') {\n      res.redirect(301, context.url);\n    }\n\n    var css = context.css.join('\\n'); // 字符串模板\n\n    res.send(\"\\n    <html>\\n      <head>\\n        <meta charset=\\\"utf-8\\\" />\\n        <link rel=\\\"icon\\\" href=\\\"/favicon.ico\\\" type=\\\"image/x-icon\\\">\\n        <title>react ssr</title>\\n        <style>\\n          \".concat(css, \"\\n        </style>\\n      </head>\\n      <body>\\n        <div id=\\\"root\\\">\").concat(content, \"</div>\\n        <script>\\n          window.__context = \").concat(JSON.stringify(store.getState()), \"\\n        </script>\\n        <script src=\\\"bundle.js\\\"></script>\\n      </body>\\n    </html>\\n    \"));\n  })[\"catch\"](function () {\n    res.send('报错页面500');\n  });\n});\napp.listen(9010, function () {\n  console.log('监听完毕');\n});\n\n//# sourceURL=webpack://reactssr/./server/index.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _container_Index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container/Index */ \"./src/container/Index.js\");\n/* harmony import */ var _container_About__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container/About */ \"./src/container/About.js\");\n/* harmony import */ var _container_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container/User */ \"./src/container/User.js\");\n/* harmony import */ var _container_NotFound__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./container/NotFound */ \"./src/container/NotFound.js\");\n/*\n * @Author: your name\n * @Date: 2020-12-23 10:46:27\n * @LastEditTime: 2020-12-26 12:16:32\n * @LastEditors: Please set LastEditors\n * @Description: In User Settings Edit\n * @FilePath: /reactssr/src/App.js\n */\n\n\n\n\n\n // import './App.css'\n// export default (\n//   <div>\n//     <Route path=\"/\" exact component={Index}></Route>\n//     <Route path=\"/about\" exact component={About}></Route>\n//   </div>\n// )\n// 改造成js的配置，才能获取组件\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{\n  path: \"/\",\n  component: _container_Index__WEBPACK_IMPORTED_MODULE_2__.default,\n  exact: true,\n  key: 'index'\n}, {\n  path: \"/about\",\n  component: _container_About__WEBPACK_IMPORTED_MODULE_3__.default,\n  exact: true,\n  key: 'about'\n}, {\n  path: \"/user\",\n  component: _container_User__WEBPACK_IMPORTED_MODULE_4__.default,\n  exact: true,\n  key: 'user'\n}, {\n  component: _container_NotFound__WEBPACK_IMPORTED_MODULE_5__.default,\n  key: 'notfound'\n}]);\n\n//# sourceURL=webpack://reactssr/./src/App.js?");

/***/ }),

/***/ "./src/component/Header.js":
/*!*********************************!*\
  !*** ./src/component/Header.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: \"/\"\n  }, \"\\u9996\\u9875\"), \" |\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: \"/about\"\n  }, \"\\u5173\\u4E8E\"), \" \\uFF5C\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: \"/user\"\n  }, \"\\u7528\\u6237\"), \" \\uFF5C\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: \"/qwasas\"\n  }, \"\\u4E0D\\u5B58\\u5728\"));\n});\n\n//# sourceURL=webpack://reactssr/./src/component/Header.js?");

/***/ }),

/***/ "./src/container/About.js":
/*!********************************!*\
  !*** ./src/container/About.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _About_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./About.css */ \"./src/container/About.css\");\n/* harmony import */ var _About_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_About_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction About() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", {\n    className: (_About_css__WEBPACK_IMPORTED_MODULE_1___default().title)\n  }, \"\\u767B\\u5F55\\u9875\\u9762\"));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);\n\n//# sourceURL=webpack://reactssr/./src/container/About.js?");

/***/ }),

/***/ "./src/container/Index.js":
/*!********************************!*\
  !*** ./src/container/Index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/index */ \"./src/store/index.js\");\n/* harmony import */ var _Index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Index.css */ \"./src/container/Index.css\");\n/* harmony import */ var _Index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Index_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _withStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../withStyle */ \"./src/withStyle.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\nfunction Index(props) {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),\n      _useState2 = _slicedToArray(_useState, 2),\n      count = _useState2[0],\n      setCount = _useState2[1];\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    // 此时还是在前端渲染, 能不能放在后端完成\n    // ->同构实现，如果首次加载不是Index页面，客户端获取\n    if (!props.list.length) {\n      props.getIndexList();\n    }\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: (_Index_css__WEBPACK_IMPORTED_MODULE_3___default().container)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: (_Index_css__WEBPACK_IMPORTED_MODULE_3___default().title)\n  }, \"count: \", count), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      return setCount(count + 1);\n    }\n  }, \"\\u7D2F\\u52A0\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"hr\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", null, props.list.map(function (item) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n      key: item.id\n    }, item.name);\n  })));\n} // ssr, 服务端请求获取数据 --> 修改原因: export的是withStyle(Index, styles), 不是Index, 没有loadData\n// Index.loadData = store => {\n//   return store.dispatch(getIndexList())\n// }\n// export default connect(\n//   state => ({list: state.index.list}),\n//   { getIndexList }\n// )(withStyle(Index, styles))\n// 修改1 -- hoist-non-react-statics\n\n\nIndex.loadData = function (store) {\n  return store.dispatch((0,_store_index__WEBPACK_IMPORTED_MODULE_2__.getIndexList)());\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(function (state) {\n  return {\n    list: state.index.list\n  };\n}, {\n  getIndexList: _store_index__WEBPACK_IMPORTED_MODULE_2__.getIndexList\n})((0,_withStyle__WEBPACK_IMPORTED_MODULE_4__.default)(Index, (_Index_css__WEBPACK_IMPORTED_MODULE_3___default())))); // 修改2\n// let NewIndex = connect(\n//   state => ({list: state.index.list}),\n//   { getIndexList }\n// )(withStyle(Index, styles))\n// NewIndex.loadData = store => {\n//   return store.dispatch(getIndexList())\n// }\n// export default NewIndex\n\n//# sourceURL=webpack://reactssr/./src/container/Index.js?");

/***/ }),

/***/ "./src/container/NotFound.js":
/*!***********************************!*\
  !*** ./src/container/NotFound.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n\n // 错误请求对应的状态处理\n\nfunction Status(_ref) {\n  var code = _ref.code,\n      children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    render: function render(_ref2) {\n      var staticContext = _ref2.staticContext;\n      if (staticContext) staticContext.statuscode = code; // 404\n\n      return children;\n    }\n  });\n}\n\nfunction NotFound(props) {\n  console.log('notfound', props); // 渲染了这个组件，给staticContext赋值，statuscode=404\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Status, {\n    code: 404\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, \"NotFound\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    id: \"img-404\",\n    src: \"/404.jpg\",\n    alt: \"\"\n  }));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFound);\n\n//# sourceURL=webpack://reactssr/./src/container/NotFound.js?");

/***/ }),

/***/ "./src/container/User.js":
/*!*******************************!*\
  !*** ./src/container/User.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/user */ \"./src/store/user.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nfunction User(props) {\n  console.log(props.userinfo);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Redirect, {\n    to: \"/about\"\n  }); // <div>\n  //   nihao {props.userinfo.title} - {props.userinfo.name}\n  // </div>\n} // ssr, 服务端请求获取数据\n\n\nUser.loadData = function (store) {\n  return store.dispatch((0,_store_user__WEBPACK_IMPORTED_MODULE_2__.getUserInfo)());\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(function (state) {\n  return {\n    userinfo: state.user.userinfo\n  };\n} // { getUserInfo }\n)(User));\n\n//# sourceURL=webpack://reactssr/./src/container/User.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getIndexList\": () => /* binding */ getIndexList,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// 首页逻辑\n// actionType\nvar GET_LIST = 'INDEX/GET_LIST'; // actionCreator\n\nvar changeList = function changeList(list) {\n  return {\n    type: GET_LIST,\n    list: list\n  };\n}; // 在服务端发送请求，浏览器XHR不会有请求\n\n\nvar getIndexList = function getIndexList(server) {\n  return function (dispatch, getState, $axios) {\n    return $axios.get('/api/course/list').then(function (res) {\n      var list = res.data.list;\n      dispatch(changeList(list));\n    });\n  };\n};\nvar defaultState = {\n  list: []\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case GET_LIST:\n      var newState = _objectSpread(_objectSpread({}, state), {}, {\n        list: action.list\n      });\n\n      return newState;\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack://reactssr/./src/store/index.js?");

/***/ }),

/***/ "./src/store/store.js":
/*!****************************!*\
  !*** ./src/store/store.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getClientStore\": () => /* binding */ getClientStore,\n/* harmony export */   \"getServerStore\": () => /* binding */ getServerStore\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index */ \"./src/store/index.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user */ \"./src/store/user.js\");\n// 存储入口\n\n\n\n\n\nvar reducer = (0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({\n  index: _index__WEBPACK_IMPORTED_MODULE_3__.default,\n  user: _user__WEBPACK_IMPORTED_MODULE_4__.default\n}); // 一个是ssr服务端请求代理, 一个是客户端请求-先请求srrnode, 再转发\n\nvar serverAxios = axios__WEBPACK_IMPORTED_MODULE_2___default().create({\n  baseURL: 'http://localhost:9012'\n});\nvar clientAxios = axios__WEBPACK_IMPORTED_MODULE_2___default().create({\n  baseURL: '/'\n}); // 创建客户端store\n\nvar getClientStore = function getClientStore() {\n  // 通过window.__context获取数据\n  var defaultState = window.__context ? window.__context : {};\n  return (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(reducer, defaultState, (0,redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware)(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default().withExtraArgument(clientAxios)));\n}; // 创建服务端store\n\nvar getServerStore = function getServerStore() {\n  // 通过server的dispatch来获取和充实\n  // redux-thunk源码\n  return (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(reducer, (0,redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware)(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default().withExtraArgument(serverAxios)));\n};\n\n//# sourceURL=webpack://reactssr/./src/store/store.js?");

/***/ }),

/***/ "./src/store/user.js":
/*!***************************!*\
  !*** ./src/store/user.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getUserInfo\": () => /* binding */ getUserInfo,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// 首页逻辑\n // actionType\n\nvar GET_LIST = 'INDEX/USER_INFO'; // actionCreator\n\nvar changeUserInfo = function changeUserInfo(data) {\n  return {\n    type: GET_LIST,\n    data: data\n  };\n}; // 在服务端发送请求，浏览器XHR不会有请求\n\n\nvar getUserInfo = function getUserInfo(server) {\n  return function (dispatch, getState, axiosInstance) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().get('http://localhost:9012/api/user/info').then(function (res) {\n      var data = res.data.data;\n      dispatch(changeUserInfo(data));\n    });\n  };\n};\nvar defaultState = {\n  userinfo: {}\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case GET_LIST:\n      var newState = _objectSpread(_objectSpread({}, state), {}, {\n        userinfo: action.data\n      });\n\n      return newState;\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack://reactssr/./src/store/user.js?");

/***/ }),

/***/ "./src/withStyle.js":
/*!**************************!*\
  !*** ./src/withStyle.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hoist-non-react-statics */ \"hoist-non-react-statics\");\n/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1__);\n // reactjs.org文档\n\n\n\nfunction withStyle(Comp, styles) {\n  // return function(props) {\n  //   if(props.staticContext) {\n  //     props.staticContext.css.push(styles._getCss())\n  //   }\n  //   return <Comp {...props} />\n  // }\n  function NewCom(props) {\n    if (props.staticContext) {\n      props.staticContext.css.push(styles._getCss());\n    }\n\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Comp, props);\n  } // 拷贝静态属性, 如loadData\n\n\n  hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1___default()(NewCom, Comp);\n  return NewCom;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (withStyle);\n\n//# sourceURL=webpack://reactssr/./src/withStyle.js?");

/***/ }),

/***/ "./node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./src/container/About.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./src/container/About.css ***!
  \************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.id, \"._23oxpawoFSQdYw5Hq5hrwc {\\n  color: red\\n}\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"title\": \"_23oxpawoFSQdYw5Hq5hrwc\"\n};\n\n//# sourceURL=webpack://reactssr/./src/container/About.css?./node_modules/css-loader/index.js??ruleSet%5B1%5D.rules%5B1%5D.use%5B1%5D");

/***/ }),

/***/ "./node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./src/container/Index.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./src/container/Index.css ***!
  \************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.id, \".aAiUyk9qcIP7eNHyurrvu {\\n  color: rgb(195, 233, 214)\\n}\\n._3vyhR7weaY-SmwPjI0Hoy7 {\\n  background: rgb(71, 71, 67)\\n}\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"title\": \"aAiUyk9qcIP7eNHyurrvu\",\n\t\"container\": \"_3vyhR7weaY-SmwPjI0Hoy7\"\n};\n\n//# sourceURL=webpack://reactssr/./src/container/Index.css?./node_modules/css-loader/index.js??ruleSet%5B1%5D.rules%5B1%5D.use%5B1%5D");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/***/ ((module) => {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack://reactssr/./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./src/container/About.css":
/*!*********************************!*\
  !*** ./src/container/About.css ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !!../../node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./About.css */ \"./node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./src/container/About.css\");\n    var insertCss = __webpack_require__(/*! !../../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.id, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (false) { var removeCss; }\n  \n\n//# sourceURL=webpack://reactssr/./src/container/About.css?");

/***/ }),

/***/ "./src/container/Index.css":
/*!*********************************!*\
  !*** ./src/container/Index.css ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !!../../node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./Index.css */ \"./node_modules/css-loader/index.js??ruleSet[1].rules[1].use[1]!./src/container/Index.css\");\n    var insertCss = __webpack_require__(/*! !../../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.id, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (false) { var removeCss; }\n  \n\n//# sourceURL=webpack://reactssr/./src/container/Index.css?");

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/insertCss.js":
/*!***********************************************************!*\
  !*** ./node_modules/isomorphic-style-loader/insertCss.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
eval("/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */\n\n\n\nvar inserted = {};\n\nfunction b64EncodeUnicode(str) {\n  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {\n    return String.fromCharCode(\"0x\" + p1);\n  }));\n}\n\nfunction removeCss(ids) {\n  ids.forEach(function (id) {\n    if (--inserted[id] <= 0) {\n      var elem = document.getElementById(id);\n\n      if (elem) {\n        elem.parentNode.removeChild(elem);\n      }\n    }\n  });\n}\n\nfunction insertCss(styles, _temp) {\n  var _ref = _temp === void 0 ? {} : _temp,\n      _ref$replace = _ref.replace,\n      replace = _ref$replace === void 0 ? false : _ref$replace,\n      _ref$prepend = _ref.prepend,\n      prepend = _ref$prepend === void 0 ? false : _ref$prepend,\n      _ref$prefix = _ref.prefix,\n      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;\n\n  var ids = [];\n\n  for (var i = 0; i < styles.length; i++) {\n    var _styles$i = styles[i],\n        moduleId = _styles$i[0],\n        css = _styles$i[1],\n        media = _styles$i[2],\n        sourceMap = _styles$i[3];\n    var id = \"\" + prefix + moduleId + \"-\" + i;\n    ids.push(id);\n\n    if (inserted[id]) {\n      if (!replace) {\n        inserted[id]++;\n        continue;\n      }\n    }\n\n    inserted[id] = 1;\n    var elem = document.getElementById(id);\n    var create = false;\n\n    if (!elem) {\n      create = true;\n      elem = document.createElement('style');\n      elem.setAttribute('type', 'text/css');\n      elem.id = id;\n\n      if (media) {\n        elem.setAttribute('media', media);\n      }\n    }\n\n    var cssText = css;\n\n    if (sourceMap && typeof btoa === 'function') {\n      cssText += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + b64EncodeUnicode(JSON.stringify(sourceMap)) + \"*/\";\n      cssText += \"\\n/*# sourceURL=\" + sourceMap.file + \"?\" + id + \"*/\";\n    }\n\n    if ('textContent' in elem) {\n      elem.textContent = cssText;\n    } else {\n      elem.styleSheet.cssText = cssText;\n    }\n\n    if (create) {\n      if (prepend) {\n        document.head.insertBefore(elem, document.head.childNodes[0]);\n      } else {\n        document.head.appendChild(elem);\n      }\n    }\n  }\n\n  return removeCss.bind(null, ids);\n}\n\nmodule.exports = insertCss;\n//# sourceMappingURL=insertCss.js.map\n\n\n//# sourceURL=webpack://reactssr/./node_modules/isomorphic-style-loader/insertCss.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"axios\");;\n\n//# sourceURL=webpack://reactssr/external_%22axios%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack://reactssr/external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"fs\");;\n\n//# sourceURL=webpack://reactssr/external_%22fs%22?");

/***/ }),

/***/ "hoist-non-react-statics":
/*!******************************************!*\
  !*** external "hoist-non-react-statics" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"hoist-non-react-statics\");;\n\n//# sourceURL=webpack://reactssr/external_%22hoist-non-react-statics%22?");

/***/ }),

/***/ "http-proxy-middleware":
/*!****************************************!*\
  !*** external "http-proxy-middleware" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"http-proxy-middleware\");;\n\n//# sourceURL=webpack://reactssr/external_%22http-proxy-middleware%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"path\");;\n\n//# sourceURL=webpack://reactssr/external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"react\");;\n\n//# sourceURL=webpack://reactssr/external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"react-dom/server\");;\n\n//# sourceURL=webpack://reactssr/external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"react-redux\");;\n\n//# sourceURL=webpack://reactssr/external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"react-router-dom\");;\n\n//# sourceURL=webpack://reactssr/external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"redux\");;\n\n//# sourceURL=webpack://reactssr/external_%22redux%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"redux-thunk\");;\n\n//# sourceURL=webpack://reactssr/external_%22redux-thunk%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./server/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;