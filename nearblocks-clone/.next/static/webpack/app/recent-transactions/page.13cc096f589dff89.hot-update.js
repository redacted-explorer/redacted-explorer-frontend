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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _nextui_org_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nextui-org/button */ \"(app-pages-browser)/./node_modules/@nextui-org/button/dist/chunk-DBLREEYE.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-HAXD4P37.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-YRZGWF2W.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-TSPNSPCL.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-FKPXBCGS.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-CIL4Y7FA.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/table/dist/chunk-F3UDT23P.mjs\");\n/* harmony import */ var _nextui_org_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nextui-org/table */ \"(app-pages-browser)/./node_modules/@nextui-org/shared-utils/dist/chunk-KARN4QIT.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst columns = [\n    {\n        key: \"signerId\",\n        label: \"SIGNER\"\n    },\n    {\n        key: \"receiverId\",\n        label: \"RECEIVER\"\n    },\n    {\n        key: \"transactionId\",\n        label: \"TRANSACTION\"\n    }\n];\nfunction Page(param) {\n    let { params } = param;\n    _s();\n    const [entriesPerPage, setEntriesPerPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10);\n    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [firstId, setFirstId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [lastId, setLastId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [transactions, setTransactions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    async function updateTransactions(url) {\n        try {\n            fetch(url, {\n                method: \"GET\"\n            }).then((response)=>response.json()).then((data)=>{\n                const transactions_temp = data.map((tx)=>{\n                    return {\n                        id: tx.id,\n                        signerId: tx.event.signer_id,\n                        receiverId: tx.event.receiver_id,\n                        transactionId: tx.event.transaction_id\n                    };\n                });\n                setTransactions(transactions_temp);\n            });\n        } catch (error) {\n            console.log(error);\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initialFetch = async ()=>{\n            updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=Newest&limit=\".concat(entriesPerPage));\n        };\n        initialFetch();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!transactions) return;\n        setFirstId(transactions[0].id);\n        setLastId(transactions[transactions.length - 1].id);\n    }, [\n        transactions\n    ]);\n    function nextPage() {\n        updateTransactions(\"https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=\".concat(lastId, \"8&limit=\").concat(entriesPerPage));\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            transactions && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-center\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_2__.table_default, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_3__.table_header_default, {\n                            columns: columns,\n                            children: (column)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_4__.table_column_default, {\n                                    children: column.label\n                                }, column.key, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 85,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 83,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_5__.table_body_default, {\n                            items: transactions,\n                            children: (item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_6__.table_row_default, {\n                                    children: (columnKey)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_table__WEBPACK_IMPORTED_MODULE_7__.table_cell_default, {\n                                            children: (0,_nextui_org_table__WEBPACK_IMPORTED_MODULE_8__.getKeyValue)(item, columnKey)\n                                        }, void 0, false, {\n                                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                            lineNumber: 92,\n                                            columnNumber: 21\n                                        }, this)\n                                }, item.id, false, {\n                                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                                    lineNumber: 90,\n                                    columnNumber: 17\n                                }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                            lineNumber: 88,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                    lineNumber: 82,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 81,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex gap-2 my-2 ml-4\",\n                children: [\n                    page === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        isDisabled: true,\n                        children: \"Previous\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 102,\n                        columnNumber: 11\n                    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        children: \"Previous\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 104,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_button__WEBPACK_IMPORTED_MODULE_9__.button_default, {\n                        children: \"Next\"\n                    }, void 0, false, {\n                        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                        lineNumber: 106,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n                lineNumber: 100,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/efte/Documents/projects/NEAR/REDACTED/nearblocks/nearblocks-clone/src/app/recent-transactions/page.tsx\",\n        lineNumber: 79,\n        columnNumber: 5\n    }, this);\n}\n_s(Page, \"lNf6XdMEIcZigYR8G/MUgyD8QnU=\");\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVjZW50LXRyYW5zYWN0aW9ucy9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUM0QztBQUNBO0FBVWpCO0FBUzNCLE1BQU1VLFVBQVU7SUFDZDtRQUFFQyxLQUFLO1FBQVlDLE9BQU87SUFBUztJQUNuQztRQUFFRCxLQUFLO1FBQWNDLE9BQU87SUFBVztJQUN2QztRQUFFRCxLQUFLO1FBQWlCQyxPQUFPO0lBQWM7Q0FDOUM7QUFFYyxTQUFTQyxLQUFLLEtBQTJDO1FBQTNDLEVBQUVDLE1BQU0sRUFBbUMsR0FBM0M7O0lBQzNCLE1BQU0sQ0FBQ0MsZ0JBQWdCQyxrQkFBa0IsR0FBR2YsK0NBQVFBLENBQUM7SUFDckQsTUFBTSxDQUFDZ0IsTUFBTUMsUUFBUSxHQUFHakIsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDa0IsU0FBU0MsV0FBVyxHQUFHbkIsK0NBQVFBLENBQWdCO0lBQ3RELE1BQU0sQ0FBQ29CLFFBQVFDLFVBQVUsR0FBR3JCLCtDQUFRQSxDQUFnQjtJQUNwRCxNQUFNLENBQUNzQixjQUFjQyxnQkFBZ0IsR0FBR3ZCLCtDQUFRQSxDQUF1QjtJQUV2RSxlQUFld0IsbUJBQW1CQyxHQUFXO1FBQzNDLElBQUk7WUFDRkMsTUFBTUQsS0FBSztnQkFDVEUsUUFBUTtZQUNWLEdBQ0dDLElBQUksQ0FBQyxDQUFDQyxXQUFhQSxTQUFTQyxJQUFJLElBQ2hDRixJQUFJLENBQUMsQ0FBQ0c7Z0JBQ0wsTUFBTUMsb0JBQW1DRCxLQUFLRSxHQUFHLENBQUMsQ0FBQ0M7b0JBQ2pELE9BQU87d0JBQ0xDLElBQUlELEdBQUdDLEVBQUU7d0JBQ1RDLFVBQVVGLEdBQUdHLEtBQUssQ0FBQ0MsU0FBUzt3QkFDNUJDLFlBQVlMLEdBQUdHLEtBQUssQ0FBQ0csV0FBVzt3QkFDaENDLGVBQWVQLEdBQUdHLEtBQUssQ0FBQ0ssY0FBYztvQkFDeEM7Z0JBQ0Y7Z0JBQ0FuQixnQkFBZ0JTO1lBQ2xCO1FBQ0osRUFBRSxPQUFPVyxPQUFPO1lBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDZDtJQUNGO0lBRUE1QyxnREFBU0EsQ0FBQztRQUNSLE1BQU0rQyxlQUFlO1lBQ25CdEIsbUJBQ0UsOEVBQTZGLE9BQWZWO1FBRWxGO1FBQ0FnQztJQUNGLEdBQUcsRUFBRTtJQUVML0MsZ0RBQVNBLENBQUM7UUFDUixJQUFJLENBQUN1QixjQUFjO1FBQ25CSCxXQUFXRyxZQUFZLENBQUMsRUFBRSxDQUFDYSxFQUFFO1FBQzdCZCxVQUFVQyxZQUFZLENBQUNBLGFBQWF5QixNQUFNLEdBQUcsRUFBRSxDQUFDWixFQUFFO0lBQ3BELEdBQUc7UUFBQ2I7S0FBYTtJQUVqQixTQUFTMEI7UUFDUHhCLG1CQUNFLDRFQUE2RlYsT0FBakJNLFFBQU8sWUFBeUIsT0FBZk47SUFFakc7SUFFQSxxQkFDRSw4REFBQ21DOztZQUNFM0IsOEJBQ0MsOERBQUMyQjtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ2hELDREQUFLQTs7c0NBQ0osOERBQUNDLG1FQUFXQTs0QkFBQ00sU0FBU0E7c0NBQ25CLENBQUMwQyx1QkFDQSw4REFBQzlDLG1FQUFXQTs4Q0FBbUI4QyxPQUFPeEMsS0FBSzttQ0FBekJ3QyxPQUFPekMsR0FBRzs7Ozs7Ozs7OztzQ0FHaEMsOERBQUNOLGlFQUFTQTs0QkFBQ2dELE9BQU85QjtzQ0FDZixDQUFDK0IscUJBQ0EsOERBQUMvQyxnRUFBUUE7OENBQ04sQ0FBQ2dELDBCQUNBLDhEQUFDL0MsaUVBQVNBO3NEQUFFQyw4REFBV0EsQ0FBQzZDLE1BQU1DOzs7Ozs7bUNBRm5CRCxLQUFLbEIsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQVVoQyw4REFBQ2M7Z0JBQUlDLFdBQVU7O29CQUNabEMsU0FBUyxrQkFDUiw4REFBQ2YsOERBQU1BO3dCQUFDc0QsVUFBVTtrQ0FBQzs7Ozs7NkNBRW5CLDhEQUFDdEQsOERBQU1BO2tDQUFDOzs7Ozs7a0NBRVYsOERBQUNBLDhEQUFNQTtrQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWhCO0dBbEZ3Qlc7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9yZWNlbnQtdHJhbnNhY3Rpb25zL3BhZ2UudHN4PzQwNmUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQG5leHR1aS1vcmcvYnV0dG9uXCI7XG5cbmltcG9ydCB7XG4gIFRhYmxlLFxuICBUYWJsZUhlYWRlcixcbiAgVGFibGVCb2R5LFxuICBUYWJsZUNvbHVtbixcbiAgVGFibGVSb3csXG4gIFRhYmxlQ2VsbCxcbiAgZ2V0S2V5VmFsdWUsXG59IGZyb20gXCJAbmV4dHVpLW9yZy90YWJsZVwiO1xuXG50eXBlIFRyYW5zYWN0aW9uID0ge1xuICBpZDogbnVtYmVyO1xuICBzaWduZXJJZDogc3RyaW5nO1xuICByZWNlaXZlcklkOiBzdHJpbmc7XG4gIHRyYW5zYWN0aW9uSWQ6IHN0cmluZztcbn07XG5cbmNvbnN0IGNvbHVtbnMgPSBbXG4gIHsga2V5OiBcInNpZ25lcklkXCIsIGxhYmVsOiBcIlNJR05FUlwiIH0sXG4gIHsga2V5OiBcInJlY2VpdmVySWRcIiwgbGFiZWw6IFwiUkVDRUlWRVJcIiB9LFxuICB7IGtleTogXCJ0cmFuc2FjdGlvbklkXCIsIGxhYmVsOiBcIlRSQU5TQUNUSU9OXCIgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UoeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgYWRkcmVzczogc3RyaW5nIH0gfSkge1xuICBjb25zdCBbZW50cmllc1BlclBhZ2UsIHNldEVudHJpZXNQZXJQYWdlXSA9IHVzZVN0YXRlKDEwKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtmaXJzdElkLCBzZXRGaXJzdElkXSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGFzdElkLCBzZXRMYXN0SWRdID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt0cmFuc2FjdGlvbnMsIHNldFRyYW5zYWN0aW9uc10gPSB1c2VTdGF0ZTxUcmFuc2FjdGlvbltdIHwgbnVsbD4obnVsbCk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVHJhbnNhY3Rpb25zKHVybDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbnNfdGVtcDogVHJhbnNhY3Rpb25bXSA9IGRhdGEubWFwKCh0eDogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBpZDogdHguaWQsXG4gICAgICAgICAgICAgIHNpZ25lcklkOiB0eC5ldmVudC5zaWduZXJfaWQsXG4gICAgICAgICAgICAgIHJlY2VpdmVySWQ6IHR4LmV2ZW50LnJlY2VpdmVyX2lkLFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbklkOiB0eC5ldmVudC50cmFuc2FjdGlvbl9pZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9uc190ZW1wKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxGZXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHVwZGF0ZVRyYW5zYWN0aW9ucyhcbiAgICAgICAgYGh0dHBzOi8vZXZlbnRzLmludGVhci50ZWNoL3F1ZXJ5L3R4X3RyYW5zYWN0aW9uP3BhZ2luYXRpb25fYnk9TmV3ZXN0JmxpbWl0PSR7ZW50cmllc1BlclBhZ2V9YFxuICAgICAgKTtcbiAgICB9O1xuICAgIGluaXRpYWxGZXRjaCgpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXRyYW5zYWN0aW9ucykgcmV0dXJuO1xuICAgIHNldEZpcnN0SWQodHJhbnNhY3Rpb25zWzBdLmlkKTtcbiAgICBzZXRMYXN0SWQodHJhbnNhY3Rpb25zW3RyYW5zYWN0aW9ucy5sZW5ndGggLSAxXS5pZCk7XG4gIH0sIFt0cmFuc2FjdGlvbnNdKTtcblxuICBmdW5jdGlvbiBuZXh0UGFnZSgpIHtcbiAgICB1cGRhdGVUcmFuc2FjdGlvbnMoXG4gICAgICBgaHR0cHM6Ly9ldmVudHMuaW50ZWFyLnRlY2gvcXVlcnkvdHhfdHJhbnNhY3Rpb24/cGFnaW5hdGlvbl9ieT1BZnRlcklkJmlkPSR7bGFzdElkfTgmbGltaXQ9JHtlbnRyaWVzUGVyUGFnZX1gXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIHt0cmFuc2FjdGlvbnMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICA8VGFibGU+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXIgY29sdW1ucz17Y29sdW1uc30+XG4gICAgICAgICAgICAgIHsoY29sdW1uKSA9PiAoXG4gICAgICAgICAgICAgICAgPFRhYmxlQ29sdW1uIGtleT17Y29sdW1uLmtleX0+e2NvbHVtbi5sYWJlbH08L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgIDxUYWJsZUJvZHkgaXRlbXM9e3RyYW5zYWN0aW9uc30+XG4gICAgICAgICAgICAgIHsoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgICAgeyhjb2x1bW5LZXkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD57Z2V0S2V5VmFsdWUoaXRlbSwgY29sdW1uS2V5KX08L1RhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVGFibGVCb2R5PlxuICAgICAgICAgIDwvVGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBteS0yIG1sLTRcIj5cbiAgICAgICAge3BhZ2UgPT09IDAgPyAoXG4gICAgICAgICAgPEJ1dHRvbiBpc0Rpc2FibGVkPlByZXZpb3VzPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEJ1dHRvbj5QcmV2aW91czwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgICA8QnV0dG9uPk5leHQ8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQnV0dG9uIiwiVGFibGUiLCJUYWJsZUhlYWRlciIsIlRhYmxlQm9keSIsIlRhYmxlQ29sdW1uIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJnZXRLZXlWYWx1ZSIsImNvbHVtbnMiLCJrZXkiLCJsYWJlbCIsIlBhZ2UiLCJwYXJhbXMiLCJlbnRyaWVzUGVyUGFnZSIsInNldEVudHJpZXNQZXJQYWdlIiwicGFnZSIsInNldFBhZ2UiLCJmaXJzdElkIiwic2V0Rmlyc3RJZCIsImxhc3RJZCIsInNldExhc3RJZCIsInRyYW5zYWN0aW9ucyIsInNldFRyYW5zYWN0aW9ucyIsInVwZGF0ZVRyYW5zYWN0aW9ucyIsInVybCIsImZldGNoIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJ0cmFuc2FjdGlvbnNfdGVtcCIsIm1hcCIsInR4IiwiaWQiLCJzaWduZXJJZCIsImV2ZW50Iiwic2lnbmVyX2lkIiwicmVjZWl2ZXJJZCIsInJlY2VpdmVyX2lkIiwidHJhbnNhY3Rpb25JZCIsInRyYW5zYWN0aW9uX2lkIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaW5pdGlhbEZldGNoIiwibGVuZ3RoIiwibmV4dFBhZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJjb2x1bW4iLCJpdGVtcyIsIml0ZW0iLCJjb2x1bW5LZXkiLCJpc0Rpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/recent-transactions/page.tsx\n"));

/***/ })

});