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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _nextui_org_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nextui-org/button */ \"(app-pages-browser)/./node_modules/@nextui-org/button/dist/chunk-DBLREEYE.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-HAXD4P37.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-YRZGWF2W.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-TSPNSPCL.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-FKPXBCGS.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-CIL4Y7FA.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-F3UDT23P.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/shared-utils/dist/chunk-KARN4QIT.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst columns = [\n    {\n        key: \"signerId\",\n        label: \"SIGNER\"\n    },\n    {\n        key: \"receiverId\",\n        label: \"RECEIVER\"\n    },\n    {\n        key: \"transactionId\",\n        label: \"TRANSACTION\"\n    }\n];\nfunction Page(param) {\n    let { params } = param;\n    _s();\n    const [entriesPerPage, setEntriesPerPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10);\n    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [firstId, setFirstId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [lastId, setLastId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [transactions, setTransactions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    async function updateTransactions(url) {\n        try {\n            fetch(url, {\n                method: \"GET\"\n            }).then((response)=>{\n                console.log(response);\n                return response.json();\n            }).then((data)=>{\n                console.log(\"update transactions\");\n                const transactions_temp = data.map((tx)=>{\n                    return {\n                        id: tx.id,\n                        signerId: tx.event.signer_id,\n                        receiverId: tx.event.receiver_id,\n                        transactionId: tx.event.transaction_id\n                    };\n                });\n                setTransactions(transactions_temp);\n            });\n        } catch (error) {\n            console.log(error);\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initialFetch = async ()=>{\n            updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=Newest&limit=\".concat(entriesPerPage));\n        };\n        initialFetch();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!transactions) return;\n        console.log(transactions);\n    /*     setFirstId(transactions[0].id);\n    setLastId(transactions[transactions.length - 1].id); */ }, [\n        transactions\n    ]);\n    function nextPage() {\n        updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=\".concat(lastId, \"&limit=\").concat(entriesPerPage));\n        setPage((prev)=>prev + 1);\n    }\n    function prevPage() {\n        updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=BeforeId&id=\".concat(firstId, \"&limit=\").concat(entriesPerPage));\n        setPage((prev)=>prev - 1);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            transactions && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-center\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_2__.table_default, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_3__.table_header_default, {\n                            columns: columns,\n                            children: (column)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_4__.table_column_default, {\n                                    children: column.label\n                                }, column.key, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 98,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 96,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_5__.table_body_default, {\n                            items: transactions,\n                            children: (item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_6__.table_row_default, {\n                                    children: (columnKey)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_7__.table_cell_default, {\n                                            children: (0,_nextui_org_table__WEBPACK_IMPORTED_MODULE_8__.getKeyValue)(item, columnKey)\n                                        }, void 0, false, {\n                                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                            lineNumber: 105,\n                                            columnNumber: 21\n                                        }, this)\n                                }, item.id, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 103,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 101,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                    lineNumber: 95,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 94,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex gap-2 my-2 ml-4\",\n                children: [\n                    page === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        isDisabled: true,\n                        children: \"Previous\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 115,\n                        columnNumber: 11\n                    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        children: \"Previous\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 117,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        onClick: nextPage,\n                        children: \"Next\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 119,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 113,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n        lineNumber: 92,\n        columnNumber: 5\n    }, this);\n}\n_s(Page, \"lNf6XdMEIcZigYR8G/MUgyD8QnU=\");\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVjZW50LXRyYW5zYWN0aW9ucy9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUM0QztBQUNBO0FBVWpCO0FBUzNCLE1BQU1VLFVBQVU7SUFDZDtRQUFFQyxLQUFLO1FBQVlDLE9BQU87SUFBUztJQUNuQztRQUFFRCxLQUFLO1FBQWNDLE9BQU87SUFBVztJQUN2QztRQUFFRCxLQUFLO1FBQWlCQyxPQUFPO0lBQWM7Q0FDOUM7QUFFYyxTQUFTQyxLQUFLLEtBQTJDO1FBQTNDLEVBQUVDLE1BQU0sRUFBbUMsR0FBM0M7O0lBQzNCLE1BQU0sQ0FBQ0MsZ0JBQWdCQyxrQkFBa0IsR0FBR2YsK0NBQVFBLENBQUM7SUFDckQsTUFBTSxDQUFDZ0IsTUFBTUMsUUFBUSxHQUFHakIsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDa0IsU0FBU0MsV0FBVyxHQUFHbkIsK0NBQVFBLENBQWdCO0lBQ3RELE1BQU0sQ0FBQ29CLFFBQVFDLFVBQVUsR0FBR3JCLCtDQUFRQSxDQUFnQjtJQUNwRCxNQUFNLENBQUNzQixjQUFjQyxnQkFBZ0IsR0FBR3ZCLCtDQUFRQSxDQUF1QjtJQUV2RSxlQUFld0IsbUJBQW1CQyxHQUFXO1FBQzNDLElBQUk7WUFDRkMsTUFBTUQsS0FBSztnQkFDVEUsUUFBUTtZQUNWLEdBQ0dDLElBQUksQ0FBQyxDQUFDQztnQkFDTEMsUUFBUUMsR0FBRyxDQUFDRjtnQkFDWixPQUFPQSxTQUFTRyxJQUFJO1lBQ3RCLEdBQ0NKLElBQUksQ0FBQyxDQUFDSztnQkFDTEgsUUFBUUMsR0FBRyxDQUFDO2dCQUNaLE1BQU1HLG9CQUFtQ0QsS0FBS0UsR0FBRyxDQUFDLENBQUNDO29CQUNqRCxPQUFPO3dCQUNMQyxJQUFJRCxHQUFHQyxFQUFFO3dCQUNUQyxVQUFVRixHQUFHRyxLQUFLLENBQUNDLFNBQVM7d0JBQzVCQyxZQUFZTCxHQUFHRyxLQUFLLENBQUNHLFdBQVc7d0JBQ2hDQyxlQUFlUCxHQUFHRyxLQUFLLENBQUNLLGNBQWM7b0JBQ3hDO2dCQUNGO2dCQUNBckIsZ0JBQWdCVztZQUNsQjtRQUNKLEVBQUUsT0FBT1csT0FBTztZQUNkZixRQUFRQyxHQUFHLENBQUNjO1FBQ2Q7SUFDRjtJQUVBOUMsZ0RBQVNBLENBQUM7UUFDUixNQUFNK0MsZUFBZTtZQUNuQnRCLG1CQUNFLDhFQUE2RixPQUFmVjtRQUVsRjtRQUNBZ0M7SUFDRixHQUFHLEVBQUU7SUFFTC9DLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDdUIsY0FBYztRQUNuQlEsUUFBUUMsR0FBRyxDQUFDVDtJQUNaO3lEQUNxRCxHQUN2RCxHQUFHO1FBQUNBO0tBQWE7SUFFakIsU0FBU3lCO1FBQ1B2QixtQkFDRSw0RUFBNEZWLE9BQWhCTSxRQUFPLFdBQXdCLE9BQWZOO1FBRTlGRyxRQUFRLENBQUMrQixPQUFTQSxPQUFPO0lBQzNCO0lBRUEsU0FBU0M7UUFDUHpCLG1CQUNFLDZFQUE4RlYsT0FBakJJLFNBQVEsV0FBd0IsT0FBZko7UUFFaEdHLFFBQVEsQ0FBQytCLE9BQVNBLE9BQU87SUFDM0I7SUFFQSxxQkFDRSw4REFBQ0U7O1lBQ0U1Qiw4QkFDQyw4REFBQzRCO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDakQsNERBQUtBOztzQ0FDSiw4REFBQ0MsbUVBQVdBOzRCQUFDTSxTQUFTQTtzQ0FDbkIsQ0FBQzJDLHVCQUNBLDhEQUFDL0MsbUVBQVdBOzhDQUFtQitDLE9BQU96QyxLQUFLO21DQUF6QnlDLE9BQU8xQyxHQUFHOzs7Ozs7Ozs7O3NDQUdoQyw4REFBQ04saUVBQVNBOzRCQUFDaUQsT0FBTy9CO3NDQUNmLENBQUNnQyxxQkFDQSw4REFBQ2hELGdFQUFRQTs4Q0FDTixDQUFDaUQsMEJBQ0EsOERBQUNoRCxpRUFBU0E7c0RBQUVDLDhEQUFXQSxDQUFDOEMsTUFBTUM7Ozs7OzttQ0FGbkJELEtBQUtqQixFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBVWhDLDhEQUFDYTtnQkFBSUMsV0FBVTs7b0JBQ1puQyxTQUFTLGtCQUNSLDhEQUFDZiw4REFBTUE7d0JBQUN1RCxVQUFVO2tDQUFDOzs7Ozs2Q0FFbkIsOERBQUN2RCw4REFBTUE7a0NBQUM7Ozs7OztrQ0FFViw4REFBQ0EsOERBQU1BO3dCQUFDd0QsU0FBU1Y7a0NBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUluQztHQS9Gd0JuQztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3JlY2VudC10cmFuc2FjdGlvbnMvcGFnZS50c3g/NDA2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAbmV4dHVpLW9yZy9idXR0b25cIjtcblxuaW1wb3J0IHtcbiAgVGFibGUsXG4gIFRhYmxlSGVhZGVyLFxuICBUYWJsZUJvZHksXG4gIFRhYmxlQ29sdW1uLFxuICBUYWJsZVJvdyxcbiAgVGFibGVDZWxsLFxuICBnZXRLZXlWYWx1ZSxcbn0gZnJvbSBcIkBuZXh0dWktb3JnL3RhYmxlXCI7XG5cbnR5cGUgVHJhbnNhY3Rpb24gPSB7XG4gIGlkOiBudW1iZXI7XG4gIHNpZ25lcklkOiBzdHJpbmc7XG4gIHJlY2VpdmVySWQ6IHN0cmluZztcbiAgdHJhbnNhY3Rpb25JZDogc3RyaW5nO1xufTtcblxuY29uc3QgY29sdW1ucyA9IFtcbiAgeyBrZXk6IFwic2lnbmVySWRcIiwgbGFiZWw6IFwiU0lHTkVSXCIgfSxcbiAgeyBrZXk6IFwicmVjZWl2ZXJJZFwiLCBsYWJlbDogXCJSRUNFSVZFUlwiIH0sXG4gIHsga2V5OiBcInRyYW5zYWN0aW9uSWRcIiwgbGFiZWw6IFwiVFJBTlNBQ1RJT05cIiB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZSh7IHBhcmFtcyB9OiB7IHBhcmFtczogeyBhZGRyZXNzOiBzdHJpbmcgfSB9KSB7XG4gIGNvbnN0IFtlbnRyaWVzUGVyUGFnZSwgc2V0RW50cmllc1BlclBhZ2VdID0gdXNlU3RhdGUoMTApO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2ZpcnN0SWQsIHNldEZpcnN0SWRdID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsYXN0SWQsIHNldExhc3RJZF0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3RyYW5zYWN0aW9ucywgc2V0VHJhbnNhY3Rpb25zXSA9IHVzZVN0YXRlPFRyYW5zYWN0aW9uW10gfCBudWxsPihudWxsKTtcblxuICBhc3luYyBmdW5jdGlvbiB1cGRhdGVUcmFuc2FjdGlvbnModXJsOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIHRyYW5zYWN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbnNfdGVtcDogVHJhbnNhY3Rpb25bXSA9IGRhdGEubWFwKCh0eDogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBpZDogdHguaWQsXG4gICAgICAgICAgICAgIHNpZ25lcklkOiB0eC5ldmVudC5zaWduZXJfaWQsXG4gICAgICAgICAgICAgIHJlY2VpdmVySWQ6IHR4LmV2ZW50LnJlY2VpdmVyX2lkLFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbklkOiB0eC5ldmVudC50cmFuc2FjdGlvbl9pZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9uc190ZW1wKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxGZXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHVwZGF0ZVRyYW5zYWN0aW9ucyhcbiAgICAgICAgYGh0dHBzOi8vZXZlbnRzLmludGVhci50ZWNoL3F1ZXJ5L3R4X3RyYW5zYWN0aW9uP3BhZ2luYXRpb25fYnk9TmV3ZXN0JmxpbWl0PSR7ZW50cmllc1BlclBhZ2V9YFxuICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRpYWxGZXRjaCgpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXRyYW5zYWN0aW9ucykgcmV0dXJuO1xuICAgIGNvbnNvbGUubG9nKHRyYW5zYWN0aW9ucyk7XG4gICAgLyogICAgIHNldEZpcnN0SWQodHJhbnNhY3Rpb25zWzBdLmlkKTtcbiAgICBzZXRMYXN0SWQodHJhbnNhY3Rpb25zW3RyYW5zYWN0aW9ucy5sZW5ndGggLSAxXS5pZCk7ICovXG4gIH0sIFt0cmFuc2FjdGlvbnNdKTtcblxuICBmdW5jdGlvbiBuZXh0UGFnZSgpIHtcbiAgICB1cGRhdGVUcmFuc2FjdGlvbnMoXG4gICAgICBgaHR0cHM6Ly9ldmVudHMuaW50ZWFyLnRlY2gvcXVlcnkvdHhfdHJhbnNhY3Rpb24/cGFnaW5hdGlvbl9ieT1BZnRlcklkJmlkPSR7bGFzdElkfSZsaW1pdD0ke2VudHJpZXNQZXJQYWdlfWBcbiAgICApO1xuICAgIHNldFBhZ2UoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZQYWdlKCkge1xuICAgIHVwZGF0ZVRyYW5zYWN0aW9ucyhcbiAgICAgIGBodHRwczovL2V2ZW50cy5pbnRlYXIudGVjaC9xdWVyeS90eF90cmFuc2FjdGlvbj9wYWdpbmF0aW9uX2J5PUJlZm9yZUlkJmlkPSR7Zmlyc3RJZH0mbGltaXQ9JHtlbnRyaWVzUGVyUGFnZX1gXG4gICAgKTtcbiAgICBzZXRQYWdlKChwcmV2KSA9PiBwcmV2IC0gMSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICB7dHJhbnNhY3Rpb25zICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgPFRhYmxlPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyIGNvbHVtbnM9e2NvbHVtbnN9PlxuICAgICAgICAgICAgICB7KGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgICAgIDxUYWJsZUNvbHVtbiBrZXk9e2NvbHVtbi5rZXl9Pntjb2x1bW4ubGFiZWx9PC9UYWJsZUNvbHVtbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFibGVIZWFkZXI+XG4gICAgICAgICAgICA8VGFibGVCb2R5IGl0ZW1zPXt0cmFuc2FjdGlvbnN9PlxuICAgICAgICAgICAgICB7KGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICAgIHsoY29sdW1uS2V5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+e2dldEtleVZhbHVlKGl0ZW0sIGNvbHVtbktleSl9PC9UYWJsZUNlbGw+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1RhYmxlQm9keT5cbiAgICAgICAgICA8L1RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgbXktMiBtbC00XCI+XG4gICAgICAgIHtwYWdlID09PSAwID8gKFxuICAgICAgICAgIDxCdXR0b24gaXNEaXNhYmxlZD5QcmV2aW91czwvQnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCdXR0b24+UHJldmlvdXM8L0J1dHRvbj5cbiAgICAgICAgKX1cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtuZXh0UGFnZX0+TmV4dDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJCdXR0b24iLCJUYWJsZSIsIlRhYmxlSGVhZGVyIiwiVGFibGVCb2R5IiwiVGFibGVDb2x1bW4iLCJUYWJsZVJvdyIsIlRhYmxlQ2VsbCIsImdldEtleVZhbHVlIiwiY29sdW1ucyIsImtleSIsImxhYmVsIiwiUGFnZSIsInBhcmFtcyIsImVudHJpZXNQZXJQYWdlIiwic2V0RW50cmllc1BlclBhZ2UiLCJwYWdlIiwic2V0UGFnZSIsImZpcnN0SWQiLCJzZXRGaXJzdElkIiwibGFzdElkIiwic2V0TGFzdElkIiwidHJhbnNhY3Rpb25zIiwic2V0VHJhbnNhY3Rpb25zIiwidXBkYXRlVHJhbnNhY3Rpb25zIiwidXJsIiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwianNvbiIsImRhdGEiLCJ0cmFuc2FjdGlvbnNfdGVtcCIsIm1hcCIsInR4IiwiaWQiLCJzaWduZXJJZCIsImV2ZW50Iiwic2lnbmVyX2lkIiwicmVjZWl2ZXJJZCIsInJlY2VpdmVyX2lkIiwidHJhbnNhY3Rpb25JZCIsInRyYW5zYWN0aW9uX2lkIiwiZXJyb3IiLCJpbml0aWFsRmV0Y2giLCJuZXh0UGFnZSIsInByZXYiLCJwcmV2UGFnZSIsImRpdiIsImNsYXNzTmFtZSIsImNvbHVtbiIsIml0ZW1zIiwiaXRlbSIsImNvbHVtbktleSIsImlzRGlzYWJsZWQiLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/recent-transactions/page.tsx\n"));

/***/ })

});