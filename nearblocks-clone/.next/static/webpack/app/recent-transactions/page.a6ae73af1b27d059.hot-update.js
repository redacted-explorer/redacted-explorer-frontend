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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _nextui_org_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nextui-org/button */ \"(app-pages-browser)/./node_modules/@nextui-org/button/dist/chunk-DBLREEYE.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-HAXD4P37.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-YRZGWF2W.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-TSPNSPCL.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-FKPXBCGS.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-CIL4Y7FA.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-F3UDT23P.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/shared-utils/dist/chunk-KARN4QIT.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst columns = [\n    {\n        key: \"signerId\",\n        label: \"SIGNER\"\n    },\n    {\n        key: \"receiverId\",\n        label: \"RECEIVER\"\n    },\n    {\n        key: \"transactionId\",\n        label: \"TRANSACTION\"\n    }\n];\nconst resultsPerPage = [\n    10,\n    25,\n    50\n];\nfunction Page(param) {\n    let { params } = param;\n    _s();\n    const [entriesPerPage, setEntriesPerPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10);\n    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [firstId, setFirstId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [lastId, setLastId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [transactions, setTransactions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    async function updateTransactions(url) {\n        let sort = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;\n        try {\n            fetch(url, {\n                method: \"GET\"\n            }).then((response)=>response.json()).then((data)=>{\n                console.log(\"update transactions\");\n                const transactions_temp = data.map((tx)=>{\n                    return {\n                        id: tx.id,\n                        signerId: tx.event.signer_id,\n                        receiverId: tx.event.receiver_id,\n                        transactionId: tx.event.transaction_id\n                    };\n                });\n                if (sort) {\n                    transactions_temp.sort((a, b)=>a.id - b.id);\n                }\n                setTransactions(transactions_temp);\n            });\n        } catch (error) {\n            console.log(error);\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initialFetch = async ()=>{\n            updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=Newest&limit=\".concat(entriesPerPage));\n        };\n        initialFetch();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=\".concat(lastId, \"&limit=\").concat(entriesPerPage));\n    }, [\n        entriesPerPage\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!transactions) return;\n        console.log(transactions);\n        setFirstId(transactions[0].id);\n        setLastId(transactions[transactions.length - 1].id);\n    }, [\n        transactions\n    ]);\n    function nextPage() {\n        updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=\".concat(lastId, \"&limit=\").concat(entriesPerPage));\n        setPage((prev)=>prev + 1);\n    }\n    function previousPage() {\n        updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=BeforeId&id=\".concat(firstId, \"&limit=\").concat(entriesPerPage), true);\n        setPage((prev)=>prev - 1);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            transactions && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-center\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_2__.table_default, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_3__.table_header_default, {\n                            columns: columns,\n                            children: (column)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_4__.table_column_default, {\n                                    children: column.label\n                                }, column.key, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 107,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 105,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_5__.table_body_default, {\n                            items: transactions,\n                            children: (item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_6__.table_row_default, {\n                                    children: (columnKey)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_7__.table_cell_default, {\n                                            children: (0,_nextui_org_table__WEBPACK_IMPORTED_MODULE_8__.getKeyValue)(item, columnKey)\n                                        }, void 0, false, {\n                                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                            lineNumber: 114,\n                                            columnNumber: 21\n                                        }, this)\n                                }, item.id, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 112,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 110,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                    lineNumber: 104,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 103,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col gap-2 ml-4 my-2\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex gap-2\",\n                        children: [\n                            page === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                                isDisabled: true,\n                                children: \"Previous\"\n                            }, void 0, false, {\n                                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                lineNumber: 125,\n                                columnNumber: 13\n                            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                                onClick: previousPage,\n                                children: \"Previous\"\n                            }, void 0, false, {\n                                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                lineNumber: 127,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                                onClick: nextPage,\n                                children: \"Next\"\n                            }, void 0, false, {\n                                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                lineNumber: 129,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 123,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: \"Results Per Page\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 131,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex gap-2\",\n                        children: resultsPerPage.map((amount)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                                onClick: ()=>setEntriesPerPage(amount),\n                                children: amount\n                            }, amount, false, {\n                                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                lineNumber: 134,\n                                columnNumber: 13\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 132,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 122,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n        lineNumber: 101,\n        columnNumber: 5\n    }, this);\n}\n_s(Page, \"dZl6RgVN1AL2FICeOBknndBtM+4=\");\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVjZW50LXRyYW5zYWN0aW9ucy9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUM0QztBQUNBO0FBVWpCO0FBUzNCLE1BQU1VLFVBQVU7SUFDZDtRQUFFQyxLQUFLO1FBQVlDLE9BQU87SUFBUztJQUNuQztRQUFFRCxLQUFLO1FBQWNDLE9BQU87SUFBVztJQUN2QztRQUFFRCxLQUFLO1FBQWlCQyxPQUFPO0lBQWM7Q0FDOUM7QUFFRCxNQUFNQyxpQkFBaUI7SUFBQztJQUFJO0lBQUk7Q0FBRztBQUVwQixTQUFTQyxLQUFLLEtBQTJDO1FBQTNDLEVBQUVDLE1BQU0sRUFBbUMsR0FBM0M7O0lBQzNCLE1BQU0sQ0FBQ0MsZ0JBQWdCQyxrQkFBa0IsR0FBR2hCLCtDQUFRQSxDQUFDO0lBQ3JELE1BQU0sQ0FBQ2lCLE1BQU1DLFFBQVEsR0FBR2xCLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ21CLFNBQVNDLFdBQVcsR0FBR3BCLCtDQUFRQSxDQUFnQjtJQUN0RCxNQUFNLENBQUNxQixRQUFRQyxVQUFVLEdBQUd0QiwrQ0FBUUEsQ0FBZ0I7SUFDcEQsTUFBTSxDQUFDdUIsY0FBY0MsZ0JBQWdCLEdBQUd4QiwrQ0FBUUEsQ0FBdUI7SUFFdkUsZUFBZXlCLG1CQUFtQkMsR0FBVztZQUFFQyxPQUFBQSxpRUFBZ0I7UUFDN0QsSUFBSTtZQUNGQyxNQUFNRixLQUFLO2dCQUNURyxRQUFRO1lBQ1YsR0FDR0MsSUFBSSxDQUFDLENBQUNDLFdBQWFBLFNBQVNDLElBQUksSUFDaENGLElBQUksQ0FBQyxDQUFDRztnQkFDTEMsUUFBUUMsR0FBRyxDQUFDO2dCQUNaLE1BQU1DLG9CQUFtQ0gsS0FBS0ksR0FBRyxDQUFDLENBQUNDO29CQUNqRCxPQUFPO3dCQUNMQyxJQUFJRCxHQUFHQyxFQUFFO3dCQUNUQyxVQUFVRixHQUFHRyxLQUFLLENBQUNDLFNBQVM7d0JBQzVCQyxZQUFZTCxHQUFHRyxLQUFLLENBQUNHLFdBQVc7d0JBQ2hDQyxlQUFlUCxHQUFHRyxLQUFLLENBQUNLLGNBQWM7b0JBQ3hDO2dCQUNGO2dCQUNBLElBQUluQixNQUFNO29CQUNSUyxrQkFBa0JULElBQUksQ0FBQyxDQUFDb0IsR0FBR0MsSUFBTUQsRUFBRVIsRUFBRSxHQUFHUyxFQUFFVCxFQUFFO2dCQUM5QztnQkFDQWYsZ0JBQWdCWTtZQUNsQjtRQUNKLEVBQUUsT0FBT2EsT0FBTztZQUNkZixRQUFRQyxHQUFHLENBQUNjO1FBQ2Q7SUFDRjtJQUVBbEQsZ0RBQVNBLENBQUM7UUFDUixNQUFNbUQsZUFBZTtZQUNuQnpCLG1CQUNFLDhFQUE2RixPQUFmVjtRQUVsRjtRQUNBbUM7SUFDRixHQUFHLEVBQUU7SUFFTG5ELGdEQUFTQSxDQUFDO1FBQ1IwQixtQkFDRSw0RUFBNEZWLE9BQWhCTSxRQUFPLFdBQXdCLE9BQWZOO0lBRWhHLEdBQUc7UUFBQ0E7S0FBZTtJQUVuQmhCLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDd0IsY0FBYztRQUNuQlcsUUFBUUMsR0FBRyxDQUFDWjtRQUNaSCxXQUFXRyxZQUFZLENBQUMsRUFBRSxDQUFDZ0IsRUFBRTtRQUM3QmpCLFVBQVVDLFlBQVksQ0FBQ0EsYUFBYTRCLE1BQU0sR0FBRyxFQUFFLENBQUNaLEVBQUU7SUFDcEQsR0FBRztRQUFDaEI7S0FBYTtJQUVqQixTQUFTNkI7UUFDUDNCLG1CQUNFLDRFQUE0RlYsT0FBaEJNLFFBQU8sV0FBd0IsT0FBZk47UUFFOUZHLFFBQVEsQ0FBQ21DLE9BQVNBLE9BQU87SUFDM0I7SUFFQSxTQUFTQztRQUNQN0IsbUJBQ0UsNkVBQThGVixPQUFqQkksU0FBUSxXQUF3QixPQUFmSixpQkFDOUY7UUFFRkcsUUFBUSxDQUFDbUMsT0FBU0EsT0FBTztJQUMzQjtJQUVBLHFCQUNFLDhEQUFDRTs7WUFDRWhDLDhCQUNDLDhEQUFDZ0M7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUN0RCw0REFBS0E7O3NDQUNKLDhEQUFDQyxtRUFBV0E7NEJBQUNNLFNBQVNBO3NDQUNuQixDQUFDZ0QsdUJBQ0EsOERBQUNwRCxtRUFBV0E7OENBQW1Cb0QsT0FBTzlDLEtBQUs7bUNBQXpCOEMsT0FBTy9DLEdBQUc7Ozs7Ozs7Ozs7c0NBR2hDLDhEQUFDTixpRUFBU0E7NEJBQUNzRCxPQUFPbkM7c0NBQ2YsQ0FBQ29DLHFCQUNBLDhEQUFDckQsZ0VBQVFBOzhDQUNOLENBQUNzRCwwQkFDQSw4REFBQ3JELGlFQUFTQTtzREFBRUMsOERBQVdBLENBQUNtRCxNQUFNQzs7Ozs7O21DQUZuQkQsS0FBS3BCLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFVaEMsOERBQUNnQjtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNEO3dCQUFJQyxXQUFVOzs0QkFDWnZDLFNBQVMsa0JBQ1IsOERBQUNoQiw4REFBTUE7Z0NBQUM0RCxVQUFVOzBDQUFDOzs7OztxREFFbkIsOERBQUM1RCw4REFBTUE7Z0NBQUM2RCxTQUFTUjswQ0FBYzs7Ozs7OzBDQUVqQyw4REFBQ3JELDhEQUFNQTtnQ0FBQzZELFNBQVNWOzBDQUFVOzs7Ozs7Ozs7Ozs7a0NBRTdCLDhEQUFDRztrQ0FBSTs7Ozs7O2tDQUNMLDhEQUFDQTt3QkFBSUMsV0FBVTtrQ0FDWjVDLGVBQWV5QixHQUFHLENBQUMsQ0FBQzBCLHVCQUNuQiw4REFBQzlELDhEQUFNQTtnQ0FBYzZELFNBQVMsSUFBTTlDLGtCQUFrQitDOzBDQUNuREE7K0JBRFVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUXpCO0dBaEh3QmxEO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvcmVjZW50LXRyYW5zYWN0aW9ucy9wYWdlLnRzeD80MDZlIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkBuZXh0dWktb3JnL2J1dHRvblwiO1xuXG5pbXBvcnQge1xuICBUYWJsZSxcbiAgVGFibGVIZWFkZXIsXG4gIFRhYmxlQm9keSxcbiAgVGFibGVDb2x1bW4sXG4gIFRhYmxlUm93LFxuICBUYWJsZUNlbGwsXG4gIGdldEtleVZhbHVlLFxufSBmcm9tIFwiQG5leHR1aS1vcmcvdGFibGVcIjtcblxudHlwZSBUcmFuc2FjdGlvbiA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgc2lnbmVySWQ6IHN0cmluZztcbiAgcmVjZWl2ZXJJZDogc3RyaW5nO1xuICB0cmFuc2FjdGlvbklkOiBzdHJpbmc7XG59O1xuXG5jb25zdCBjb2x1bW5zID0gW1xuICB7IGtleTogXCJzaWduZXJJZFwiLCBsYWJlbDogXCJTSUdORVJcIiB9LFxuICB7IGtleTogXCJyZWNlaXZlcklkXCIsIGxhYmVsOiBcIlJFQ0VJVkVSXCIgfSxcbiAgeyBrZXk6IFwidHJhbnNhY3Rpb25JZFwiLCBsYWJlbDogXCJUUkFOU0FDVElPTlwiIH0sXG5dO1xuXG5jb25zdCByZXN1bHRzUGVyUGFnZSA9IFsxMCwgMjUsIDUwXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZSh7IHBhcmFtcyB9OiB7IHBhcmFtczogeyBhZGRyZXNzOiBzdHJpbmcgfSB9KSB7XG4gIGNvbnN0IFtlbnRyaWVzUGVyUGFnZSwgc2V0RW50cmllc1BlclBhZ2VdID0gdXNlU3RhdGUoMTApO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2ZpcnN0SWQsIHNldEZpcnN0SWRdID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsYXN0SWQsIHNldExhc3RJZF0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3RyYW5zYWN0aW9ucywgc2V0VHJhbnNhY3Rpb25zXSA9IHVzZVN0YXRlPFRyYW5zYWN0aW9uW10gfCBudWxsPihudWxsKTtcblxuICBhc3luYyBmdW5jdGlvbiB1cGRhdGVUcmFuc2FjdGlvbnModXJsOiBzdHJpbmcsIHNvcnQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGUgdHJhbnNhY3Rpb25zXCIpO1xuICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uc190ZW1wOiBUcmFuc2FjdGlvbltdID0gZGF0YS5tYXAoKHR4OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGlkOiB0eC5pZCxcbiAgICAgICAgICAgICAgc2lnbmVySWQ6IHR4LmV2ZW50LnNpZ25lcl9pZCxcbiAgICAgICAgICAgICAgcmVjZWl2ZXJJZDogdHguZXZlbnQucmVjZWl2ZXJfaWQsXG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ6IHR4LmV2ZW50LnRyYW5zYWN0aW9uX2lkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc29ydCkge1xuICAgICAgICAgICAgdHJhbnNhY3Rpb25zX3RlbXAuc29ydCgoYSwgYikgPT4gYS5pZCAtIGIuaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRUcmFuc2FjdGlvbnModHJhbnNhY3Rpb25zX3RlbXApO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbEZldGNoID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdXBkYXRlVHJhbnNhY3Rpb25zKFxuICAgICAgICBgaHR0cHM6Ly9ldmVudHMuaW50ZWFyLnRlY2gvcXVlcnkvdHhfdHJhbnNhY3Rpb24/cGFnaW5hdGlvbl9ieT1OZXdlc3QmbGltaXQ9JHtlbnRyaWVzUGVyUGFnZX1gXG4gICAgICApO1xuICAgIH07XG4gICAgaW5pdGlhbEZldGNoKCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHVwZGF0ZVRyYW5zYWN0aW9ucyhcbiAgICAgIGBodHRwczovL2V2ZW50cy5pbnRlYXIudGVjaC9xdWVyeS90eF90cmFuc2FjdGlvbj9wYWdpbmF0aW9uX2J5PUFmdGVySWQmaWQ9JHtsYXN0SWR9JmxpbWl0PSR7ZW50cmllc1BlclBhZ2V9YFxuICAgICk7XG4gIH0sIFtlbnRyaWVzUGVyUGFnZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCF0cmFuc2FjdGlvbnMpIHJldHVybjtcbiAgICBjb25zb2xlLmxvZyh0cmFuc2FjdGlvbnMpO1xuICAgIHNldEZpcnN0SWQodHJhbnNhY3Rpb25zWzBdLmlkKTtcbiAgICBzZXRMYXN0SWQodHJhbnNhY3Rpb25zW3RyYW5zYWN0aW9ucy5sZW5ndGggLSAxXS5pZCk7XG4gIH0sIFt0cmFuc2FjdGlvbnNdKTtcblxuICBmdW5jdGlvbiBuZXh0UGFnZSgpIHtcbiAgICB1cGRhdGVUcmFuc2FjdGlvbnMoXG4gICAgICBgaHR0cHM6Ly9ldmVudHMuaW50ZWFyLnRlY2gvcXVlcnkvdHhfdHJhbnNhY3Rpb24/cGFnaW5hdGlvbl9ieT1BZnRlcklkJmlkPSR7bGFzdElkfSZsaW1pdD0ke2VudHJpZXNQZXJQYWdlfWBcbiAgICApO1xuICAgIHNldFBhZ2UoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzUGFnZSgpIHtcbiAgICB1cGRhdGVUcmFuc2FjdGlvbnMoXG4gICAgICBgaHR0cHM6Ly9ldmVudHMuaW50ZWFyLnRlY2gvcXVlcnkvdHhfdHJhbnNhY3Rpb24/cGFnaW5hdGlvbl9ieT1CZWZvcmVJZCZpZD0ke2ZpcnN0SWR9JmxpbWl0PSR7ZW50cmllc1BlclBhZ2V9YCxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHNldFBhZ2UoKHByZXYpID0+IHByZXYgLSAxKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIHt0cmFuc2FjdGlvbnMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICA8VGFibGU+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXIgY29sdW1ucz17Y29sdW1uc30+XG4gICAgICAgICAgICAgIHsoY29sdW1uKSA9PiAoXG4gICAgICAgICAgICAgICAgPFRhYmxlQ29sdW1uIGtleT17Y29sdW1uLmtleX0+e2NvbHVtbi5sYWJlbH08L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgIDxUYWJsZUJvZHkgaXRlbXM9e3RyYW5zYWN0aW9uc30+XG4gICAgICAgICAgICAgIHsoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgICAgeyhjb2x1bW5LZXkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD57Z2V0S2V5VmFsdWUoaXRlbSwgY29sdW1uS2V5KX08L1RhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFibGVCb2R5PlxuICAgICAgICAgIDwvVGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMiBtbC00IG15LTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAge3BhZ2UgPT09IDAgPyAoXG4gICAgICAgICAgICA8QnV0dG9uIGlzRGlzYWJsZWQ+UHJldmlvdXM8L0J1dHRvbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtwcmV2aW91c1BhZ2V9PlByZXZpb3VzPC9CdXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e25leHRQYWdlfT5OZXh0PC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlJlc3VsdHMgUGVyIFBhZ2U8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAge3Jlc3VsdHNQZXJQYWdlLm1hcCgoYW1vdW50KSA9PiAoXG4gICAgICAgICAgICA8QnV0dG9uIGtleT17YW1vdW50fSBvbkNsaWNrPXsoKSA9PiBzZXRFbnRyaWVzUGVyUGFnZShhbW91bnQpfT5cbiAgICAgICAgICAgICAge2Ftb3VudH1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQnV0dG9uIiwiVGFibGUiLCJUYWJsZUhlYWRlciIsIlRhYmxlQm9keSIsIlRhYmxlQ29sdW1uIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJnZXRLZXlWYWx1ZSIsImNvbHVtbnMiLCJrZXkiLCJsYWJlbCIsInJlc3VsdHNQZXJQYWdlIiwiUGFnZSIsInBhcmFtcyIsImVudHJpZXNQZXJQYWdlIiwic2V0RW50cmllc1BlclBhZ2UiLCJwYWdlIiwic2V0UGFnZSIsImZpcnN0SWQiLCJzZXRGaXJzdElkIiwibGFzdElkIiwic2V0TGFzdElkIiwidHJhbnNhY3Rpb25zIiwic2V0VHJhbnNhY3Rpb25zIiwidXBkYXRlVHJhbnNhY3Rpb25zIiwidXJsIiwic29ydCIsImZldGNoIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwidHJhbnNhY3Rpb25zX3RlbXAiLCJtYXAiLCJ0eCIsImlkIiwic2lnbmVySWQiLCJldmVudCIsInNpZ25lcl9pZCIsInJlY2VpdmVySWQiLCJyZWNlaXZlcl9pZCIsInRyYW5zYWN0aW9uSWQiLCJ0cmFuc2FjdGlvbl9pZCIsImEiLCJiIiwiZXJyb3IiLCJpbml0aWFsRmV0Y2giLCJsZW5ndGgiLCJuZXh0UGFnZSIsInByZXYiLCJwcmV2aW91c1BhZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJjb2x1bW4iLCJpdGVtcyIsIml0ZW0iLCJjb2x1bW5LZXkiLCJpc0Rpc2FibGVkIiwib25DbGljayIsImFtb3VudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/recent-transactions/page.tsx\n"));

/***/ })

});