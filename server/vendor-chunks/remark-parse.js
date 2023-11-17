"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remark-parse";
exports.ids = ["vendor-chunks/remark-parse"];
exports.modules = {

/***/ "(ssr)/./node_modules/remark-parse/index.js":
/*!********************************************!*\
  !*** ./node_modules/remark-parse/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index.js */ \"(ssr)/./node_modules/remark-parse/lib/index.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVtYXJrLXBhcnNlL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXdDO0FBRXhDLGlFQUFlQSxxREFBV0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZW1hcmstcGFyc2UvaW5kZXguanM/MDdlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVtYXJrUGFyc2UgZnJvbSAnLi9saWIvaW5kZXguanMnXG5cbmV4cG9ydCBkZWZhdWx0IHJlbWFya1BhcnNlXG4iXSwibmFtZXMiOlsicmVtYXJrUGFyc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/remark-parse/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/remark-parse/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/remark-parse/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ remarkParse)\n/* harmony export */ });\n/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-from-markdown */ \"(ssr)/./node_modules/mdast-util-from-markdown/dev/lib/index.js\");\n/**\n * @typedef {import('mdast').Root} Root\n * @typedef {import('mdast-util-from-markdown').Options} Options\n */ \n/** @type {import('unified').Plugin<[Options?] | void[], string, Root>} */ function remarkParse(options) {\n    /** @type {import('unified').ParserFunction<Root>} */ const parser = (doc)=>{\n        // Assume options.\n        const settings = /** @type {Options} */ this.data(\"settings\");\n        return (0,mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__.fromMarkdown)(doc, Object.assign({}, settings, options, {\n            // Note: these options are not in the readme.\n            // The goal is for them to be set by plugins on `data` instead of being\n            // passed by users.\n            extensions: this.data(\"micromarkExtensions\") || [],\n            mdastExtensions: this.data(\"fromMarkdownExtensions\") || []\n        }));\n    };\n    Object.assign(this, {\n        Parser: parser\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVtYXJrLXBhcnNlL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Q0FHQyxHQUVvRDtBQUVyRCx3RUFBd0UsR0FDekQsU0FBU0MsWUFBWUMsT0FBTztJQUN6QyxtREFBbUQsR0FDbkQsTUFBTUMsU0FBUyxDQUFDQztRQUNkLGtCQUFrQjtRQUNsQixNQUFNQyxXQUFXLG9CQUFvQixHQUFJLElBQUksQ0FBQ0MsSUFBSSxDQUFDO1FBRW5ELE9BQU9OLHNFQUFZQSxDQUNqQkksS0FDQUcsT0FBT0MsTUFBTSxDQUFDLENBQUMsR0FBR0gsVUFBVUgsU0FBUztZQUNuQyw2Q0FBNkM7WUFDN0MsdUVBQXVFO1lBQ3ZFLG1CQUFtQjtZQUNuQk8sWUFBWSxJQUFJLENBQUNILElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNsREksaUJBQWlCLElBQUksQ0FBQ0osSUFBSSxDQUFDLDZCQUE2QixFQUFFO1FBQzVEO0lBRUo7SUFFQUMsT0FBT0MsTUFBTSxDQUFDLElBQUksRUFBRTtRQUFDRyxRQUFRUjtJQUFNO0FBQ3JDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlbWFyay1wYXJzZS9saWIvaW5kZXguanM/NGEwYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuUm9vdH0gUm9vdFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJykuT3B0aW9uc30gT3B0aW9uc1xuICovXG5cbmltcG9ydCB7ZnJvbU1hcmtkb3dufSBmcm9tICdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nXG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd1bmlmaWVkJykuUGx1Z2luPFtPcHRpb25zP10gfCB2b2lkW10sIHN0cmluZywgUm9vdD59ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1hcmtQYXJzZShvcHRpb25zKSB7XG4gIC8qKiBAdHlwZSB7aW1wb3J0KCd1bmlmaWVkJykuUGFyc2VyRnVuY3Rpb248Um9vdD59ICovXG4gIGNvbnN0IHBhcnNlciA9IChkb2MpID0+IHtcbiAgICAvLyBBc3N1bWUgb3B0aW9ucy5cbiAgICBjb25zdCBzZXR0aW5ncyA9IC8qKiBAdHlwZSB7T3B0aW9uc30gKi8gKHRoaXMuZGF0YSgnc2V0dGluZ3MnKSlcblxuICAgIHJldHVybiBmcm9tTWFya2Rvd24oXG4gICAgICBkb2MsXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncywgb3B0aW9ucywge1xuICAgICAgICAvLyBOb3RlOiB0aGVzZSBvcHRpb25zIGFyZSBub3QgaW4gdGhlIHJlYWRtZS5cbiAgICAgICAgLy8gVGhlIGdvYWwgaXMgZm9yIHRoZW0gdG8gYmUgc2V0IGJ5IHBsdWdpbnMgb24gYGRhdGFgIGluc3RlYWQgb2YgYmVpbmdcbiAgICAgICAgLy8gcGFzc2VkIGJ5IHVzZXJzLlxuICAgICAgICBleHRlbnNpb25zOiB0aGlzLmRhdGEoJ21pY3JvbWFya0V4dGVuc2lvbnMnKSB8fCBbXSxcbiAgICAgICAgbWRhc3RFeHRlbnNpb25zOiB0aGlzLmRhdGEoJ2Zyb21NYXJrZG93bkV4dGVuc2lvbnMnKSB8fCBbXVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRoaXMsIHtQYXJzZXI6IHBhcnNlcn0pXG59XG4iXSwibmFtZXMiOlsiZnJvbU1hcmtkb3duIiwicmVtYXJrUGFyc2UiLCJvcHRpb25zIiwicGFyc2VyIiwiZG9jIiwic2V0dGluZ3MiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwiZXh0ZW5zaW9ucyIsIm1kYXN0RXh0ZW5zaW9ucyIsIlBhcnNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/remark-parse/lib/index.js\n");

/***/ })

};
;