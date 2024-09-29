"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/recent-transactions/page",{

/***/ "(app-pages-browser)/./src/app/recent-transactions/page.tsx":
/*!**********************************************!*\
  !*** ./src/app/recent-transactions/page.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _nextui_org_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nextui-org/button */ \"(app-pages-browser)/./node_modules/@nextui-org/button/dist/chunk-DBLREEYE.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-HAXD4P37.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-YRZGWF2W.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-TSPNSPCL.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-FKPXBCGS.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-CIL4Y7FA.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-F3UDT23P.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/shared-utils/dist/chunk-KARN4QIT.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst columns = [\n    {\n        key: \"signerId\",\n        label: \"SIGNER\"\n    },\n    {\n        key: \"receiverId\",\n        label: \"RECEIVER\"\n    },\n    {\n        key: \"transactionId\",\n        label: \"TRANSACTION\"\n    }\n];\nfunction Page(param) {\n    let { params } = param;\n    _s();\n    const [entriesPerPage, setEntriesPerPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10);\n    const [firstId, setFirstId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [lastId, setLastId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [transactions, setTransactions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const getTxs = async ()=>{\n        try {\n            const apiUrl = \"https://events.intear.tech/query/tx_transaction?pagination_by=Newest&limit=\".concat(entriesPerPage);\n            fetch(apiUrl, {\n                method: \"GET\"\n            }).then((response)=>response.json()).then((data)=>{\n                const transactions_temp = data.map((tx)=>{\n                    return {\n                        signerId: tx.event.signer_id,\n                        receiverId: tx.event.receiver_id,\n                        transactionId: tx.event.transaction_id\n                    };\n                });\n                setTransactions(transactions_temp);\n            });\n        } catch (error) {\n            console.log(error);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initialFetch = async ()=>{\n            getTxs();\n        };\n        initialFetch();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!transactions) return;\n        setFirstId(transactions[0].transactionId);\n        setLastId(transactions[transactions.length - 1].transactionId);\n    }, [\n        transactions\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            transactions && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-center\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_2__.table_default, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_3__.table_header_default, {\n                            columns: columns,\n                            children: (column)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_4__.table_column_default, {\n                                    children: column.label\n                                }, column.key, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 75,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 73,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_5__.table_body_default, {\n                            items: transactions,\n                            children: (item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_6__.table_row_default, {\n                                    children: (columnKey)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_7__.table_cell_default, {\n                                            children: (0,_nextui_org_table__WEBPACK_IMPORTED_MODULE_8__.getKeyValue)(item, columnKey)\n                                        }, void 0, false, {\n                                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                            lineNumber: 82,\n                                            columnNumber: 21\n                                        }, this)\n                                }, item.transactionId, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 80,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 78,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                    lineNumber: 72,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 71,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex gap-2 my-2 ml-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        children: \"Previous\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 91,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        children: \"Next\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 92,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 90,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n        lineNumber: 69,\n        columnNumber: 5\n    }, this);\n}\n_s(Page, \"QS1XHnv8dvyqyb67ugSxnvvMv/I=\");\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVjZW50LXRyYW5zYWN0aW9ucy9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUM0QztBQUNBO0FBVWpCO0FBUTNCLE1BQU1VLFVBQVU7SUFDZDtRQUFFQyxLQUFLO1FBQVlDLE9BQU87SUFBUztJQUNuQztRQUFFRCxLQUFLO1FBQWNDLE9BQU87SUFBVztJQUN2QztRQUFFRCxLQUFLO1FBQWlCQyxPQUFPO0lBQWM7Q0FDOUM7QUFFYyxTQUFTQyxLQUFLLEtBQTJDO1FBQTNDLEVBQUVDLE1BQU0sRUFBbUMsR0FBM0M7O0lBQzNCLE1BQU0sQ0FBQ0MsZ0JBQWdCQyxrQkFBa0IsR0FBR2YsK0NBQVFBLENBQUM7SUFDckQsTUFBTSxDQUFDZ0IsU0FBU0MsV0FBVyxHQUFHakIsK0NBQVFBLENBQWdCO0lBQ3RELE1BQU0sQ0FBQ2tCLFFBQVFDLFVBQVUsR0FBR25CLCtDQUFRQSxDQUFnQjtJQUNwRCxNQUFNLENBQUNvQixjQUFjQyxnQkFBZ0IsR0FBR3JCLCtDQUFRQSxDQUF1QjtJQUV2RSxNQUFNc0IsU0FBUztRQUNiLElBQUk7WUFDRixNQUFNQyxTQUFTLDhFQUE2RixPQUFmVDtZQUM3RlUsTUFBTUQsUUFBUTtnQkFDWkUsUUFBUTtZQUNWLEdBQ0dDLElBQUksQ0FBQyxDQUFDQyxXQUFhQSxTQUFTQyxJQUFJLElBQ2hDRixJQUFJLENBQUMsQ0FBQ0c7Z0JBQ0wsTUFBTUMsb0JBQW1DRCxLQUFLRSxHQUFHLENBQUMsQ0FBQ0M7b0JBQ2pELE9BQU87d0JBQ0xDLFVBQVVELEdBQUdFLEtBQUssQ0FBQ0MsU0FBUzt3QkFDNUJDLFlBQVlKLEdBQUdFLEtBQUssQ0FBQ0csV0FBVzt3QkFDaENDLGVBQWVOLEdBQUdFLEtBQUssQ0FBQ0ssY0FBYztvQkFDeEM7Z0JBQ0Y7Z0JBQ0FsQixnQkFBZ0JTO1lBQ2xCO1FBQ0osRUFBRSxPQUFPVSxPQUFPO1lBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDZDtJQUNGO0lBRUF6QyxnREFBU0EsQ0FBQztRQUNSLE1BQU00QyxlQUFlO1lBQ25CckI7UUFDRjtRQUNBcUI7SUFDRixHQUFHLEVBQUU7SUFFTDVDLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDcUIsY0FBYztRQUNuQkgsV0FBV0csWUFBWSxDQUFDLEVBQUUsQ0FBQ2tCLGFBQWE7UUFDeENuQixVQUFVQyxZQUFZLENBQUNBLGFBQWF3QixNQUFNLEdBQUcsRUFBRSxDQUFDTixhQUFhO0lBQy9ELEdBQUc7UUFBQ2xCO0tBQWE7SUFFakIscUJBQ0UsOERBQUN5Qjs7WUFDRXpCLDhCQUNDLDhEQUFDeUI7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUM1Qyw0REFBS0E7O3NDQUNKLDhEQUFDQyxtRUFBV0E7NEJBQUNNLFNBQVNBO3NDQUNuQixDQUFDc0MsdUJBQ0EsOERBQUMxQyxtRUFBV0E7OENBQW1CMEMsT0FBT3BDLEtBQUs7bUNBQXpCb0MsT0FBT3JDLEdBQUc7Ozs7Ozs7Ozs7c0NBR2hDLDhEQUFDTixpRUFBU0E7NEJBQUM0QyxPQUFPNUI7c0NBQ2YsQ0FBQzZCLHFCQUNBLDhEQUFDM0MsZ0VBQVFBOzhDQUNOLENBQUM0QywwQkFDQSw4REFBQzNDLGlFQUFTQTtzREFBRUMsOERBQVdBLENBQUN5QyxNQUFNQzs7Ozs7O21DQUZuQkQsS0FBS1gsYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQVUzQyw4REFBQ087Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDN0MsOERBQU1BO2tDQUFDOzs7Ozs7a0NBQ1IsOERBQUNBLDhEQUFNQTtrQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWhCO0dBckV3Qlc7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9yZWNlbnQtdHJhbnNhY3Rpb25zL3BhZ2UudHN4PzQwNmUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQG5leHR1aS1vcmcvYnV0dG9uXCI7XG5cbmltcG9ydCB7XG4gIFRhYmxlLFxuICBUYWJsZUhlYWRlcixcbiAgVGFibGVCb2R5LFxuICBUYWJsZUNvbHVtbixcbiAgVGFibGVSb3csXG4gIFRhYmxlQ2VsbCxcbiAgZ2V0S2V5VmFsdWUsXG59IGZyb20gXCJAbmV4dHVpLW9yZy90YWJsZVwiO1xuXG50eXBlIFRyYW5zYWN0aW9uID0ge1xuICBzaWduZXJJZDogc3RyaW5nO1xuICByZWNlaXZlcklkOiBzdHJpbmc7XG4gIHRyYW5zYWN0aW9uSWQ6IHN0cmluZztcbn07XG5cbmNvbnN0IGNvbHVtbnMgPSBbXG4gIHsga2V5OiBcInNpZ25lcklkXCIsIGxhYmVsOiBcIlNJR05FUlwiIH0sXG4gIHsga2V5OiBcInJlY2VpdmVySWRcIiwgbGFiZWw6IFwiUkVDRUlWRVJcIiB9LFxuICB7IGtleTogXCJ0cmFuc2FjdGlvbklkXCIsIGxhYmVsOiBcIlRSQU5TQUNUSU9OXCIgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UoeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgYWRkcmVzczogc3RyaW5nIH0gfSkge1xuICBjb25zdCBbZW50cmllc1BlclBhZ2UsIHNldEVudHJpZXNQZXJQYWdlXSA9IHVzZVN0YXRlKDEwKTtcbiAgY29uc3QgW2ZpcnN0SWQsIHNldEZpcnN0SWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsYXN0SWQsIHNldExhc3RJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3RyYW5zYWN0aW9ucywgc2V0VHJhbnNhY3Rpb25zXSA9IHVzZVN0YXRlPFRyYW5zYWN0aW9uW10gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBnZXRUeHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2V2ZW50cy5pbnRlYXIudGVjaC9xdWVyeS90eF90cmFuc2FjdGlvbj9wYWdpbmF0aW9uX2J5PU5ld2VzdCZsaW1pdD0ke2VudHJpZXNQZXJQYWdlfWA7XG4gICAgICBmZXRjaChhcGlVcmwsIHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc3QgdHJhbnNhY3Rpb25zX3RlbXA6IFRyYW5zYWN0aW9uW10gPSBkYXRhLm1hcCgodHg6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc2lnbmVySWQ6IHR4LmV2ZW50LnNpZ25lcl9pZCxcbiAgICAgICAgICAgICAgcmVjZWl2ZXJJZDogdHguZXZlbnQucmVjZWl2ZXJfaWQsXG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ6IHR4LmV2ZW50LnRyYW5zYWN0aW9uX2lkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRUcmFuc2FjdGlvbnModHJhbnNhY3Rpb25zX3RlbXApO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxGZXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGdldFR4cygpO1xuICAgIH07XG4gICAgaW5pdGlhbEZldGNoKCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghdHJhbnNhY3Rpb25zKSByZXR1cm47XG4gICAgc2V0Rmlyc3RJZCh0cmFuc2FjdGlvbnNbMF0udHJhbnNhY3Rpb25JZCk7XG4gICAgc2V0TGFzdElkKHRyYW5zYWN0aW9uc1t0cmFuc2FjdGlvbnMubGVuZ3RoIC0gMV0udHJhbnNhY3Rpb25JZCk7XG4gIH0sIFt0cmFuc2FjdGlvbnNdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICB7dHJhbnNhY3Rpb25zICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgPFRhYmxlPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyIGNvbHVtbnM9e2NvbHVtbnN9PlxuICAgICAgICAgICAgICB7KGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgICAgIDxUYWJsZUNvbHVtbiBrZXk9e2NvbHVtbi5rZXl9Pntjb2x1bW4ubGFiZWx9PC9UYWJsZUNvbHVtbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFibGVIZWFkZXI+XG4gICAgICAgICAgICA8VGFibGVCb2R5IGl0ZW1zPXt0cmFuc2FjdGlvbnN9PlxuICAgICAgICAgICAgICB7KGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpdGVtLnRyYW5zYWN0aW9uSWR9PlxuICAgICAgICAgICAgICAgICAgeyhjb2x1bW5LZXkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD57Z2V0S2V5VmFsdWUoaXRlbSwgY29sdW1uS2V5KX08L1RhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFibGVCb2R5PlxuICAgICAgICAgIDwvVGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBteS0yIG1sLTRcIj5cbiAgICAgICAgPEJ1dHRvbj5QcmV2aW91czwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uPk5leHQ8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQnV0dG9uIiwiVGFibGUiLCJUYWJsZUhlYWRlciIsIlRhYmxlQm9keSIsIlRhYmxlQ29sdW1uIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJnZXRLZXlWYWx1ZSIsImNvbHVtbnMiLCJrZXkiLCJsYWJlbCIsIlBhZ2UiLCJwYXJhbXMiLCJlbnRyaWVzUGVyUGFnZSIsInNldEVudHJpZXNQZXJQYWdlIiwiZmlyc3RJZCIsInNldEZpcnN0SWQiLCJsYXN0SWQiLCJzZXRMYXN0SWQiLCJ0cmFuc2FjdGlvbnMiLCJzZXRUcmFuc2FjdGlvbnMiLCJnZXRUeHMiLCJhcGlVcmwiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwidHJhbnNhY3Rpb25zX3RlbXAiLCJtYXAiLCJ0eCIsInNpZ25lcklkIiwiZXZlbnQiLCJzaWduZXJfaWQiLCJyZWNlaXZlcklkIiwicmVjZWl2ZXJfaWQiLCJ0cmFuc2FjdGlvbklkIiwidHJhbnNhY3Rpb25faWQiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJpbml0aWFsRmV0Y2giLCJsZW5ndGgiLCJkaXYiLCJjbGFzc05hbWUiLCJjb2x1bW4iLCJpdGVtcyIsIml0ZW0iLCJjb2x1bW5LZXkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/recent-transactions/page.tsx\n"));

/***/ })

});