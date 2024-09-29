"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@nextui-org+use-callback-ref@2.0.6_react@18.3.1";
exports.ids = ["vendor-chunks/@nextui-org+use-callback-ref@2.0.6_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@nextui-org+use-callback-ref@2.0.6_react@18.3.1/node_modules/@nextui-org/use-callback-ref/dist/index.mjs":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@nextui-org+use-callback-ref@2.0.6_react@18.3.1/node_modules/@nextui-org/use-callback-ref/dist/index.mjs ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@14.2.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _nextui_org_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextui-org/use-safe-layout-effect */ \"(ssr)/./node_modules/.pnpm/@nextui-org+use-safe-layout-effect@2.0.6_react@18.3.1/node_modules/@nextui-org/use-safe-layout-effect/dist/index.mjs\");\n// src/index.ts\n\n\nfunction useCallbackRef(fn, deps = []) {\n  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(fn);\n  (0,_nextui_org_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__.useSafeLayoutEffect)(() => {\n    ref.current = fn;\n  });\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args) => {\n    var _a;\n    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);\n  }, deps);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQG5leHR1aS1vcmcrdXNlLWNhbGxiYWNrLXJlZkAyLjAuNl9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0BuZXh0dWktb3JnL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDNEM7QUFDNkI7QUFDekU7QUFDQSxjQUFjLDZDQUFNO0FBQ3BCLEVBQUUsdUZBQW1CO0FBQ3JCO0FBQ0EsR0FBRztBQUNILFNBQVMsa0RBQVc7QUFDcEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUdFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmVhcmJsb2Nrcy1jbG9uZS8uL25vZGVfbW9kdWxlcy8ucG5wbS9AbmV4dHVpLW9yZyt1c2UtY2FsbGJhY2stcmVmQDIuMC42X3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQG5leHR1aS1vcmcvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2luZGV4Lm1qcz9hYzRmIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9pbmRleC50c1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlU2FmZUxheW91dEVmZmVjdCB9IGZyb20gXCJAbmV4dHVpLW9yZy91c2Utc2FmZS1sYXlvdXQtZWZmZWN0XCI7XG5mdW5jdGlvbiB1c2VDYWxsYmFja1JlZihmbiwgZGVwcyA9IFtdKSB7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZihmbik7XG4gIHVzZVNhZmVMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIHJlZi5jdXJyZW50ID0gZm47XG4gIH0pO1xuICByZXR1cm4gdXNlQ2FsbGJhY2soKC4uLmFyZ3MpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChfYSA9IHJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2EuY2FsbChyZWYsIC4uLmFyZ3MpO1xuICB9LCBkZXBzKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNhbGxiYWNrUmVmXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@nextui-org+use-callback-ref@2.0.6_react@18.3.1/node_modules/@nextui-org/use-callback-ref/dist/index.mjs\n");

/***/ })

};
;