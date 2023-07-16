"use strict";
(() => {
var exports = {};
exports.id = 547;
exports.ids = [547];
exports.modules = {

/***/ 6352:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fssg_absolutePagePath_private_next_pages_2Fssg_js_preferredRegion_middlewareConfig_e30_3D_),
  getServerSideProps: () => (/* binding */ getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ next_route_loaderpage_2Fssg_absolutePagePath_private_next_pages_2Fssg_js_preferredRegion_middlewareConfig_e30_3D_getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./pages/ssg.js
var ssg_namespaceObject = {};
__webpack_require__.r(ssg_namespaceObject);
__webpack_require__.d(ssg_namespaceObject, {
  "default": () => (Page),
  getStaticProps: () => (getStaticProps)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(3185);
var module_default = /*#__PURE__*/__webpack_require__.n(pages_module);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7182);
// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2322);
// EXTERNAL MODULE: ./components/layout.js
var layout = __webpack_require__(8769);
;// CONCATENATED MODULE: ./pages/ssg.js


async function getStaticProps() {
    return {
        props: {
            time: new Date().toISOString()
        }
    };
}
function Page({ time }) {
    return /*#__PURE__*/ jsx_runtime.jsx(layout/* default */.Z, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("article", {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("h1", {
                    children: "Static Site Generation (SSG)"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("hr", {}),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("b", {
                            children: "Test 1:"
                        }),
                        "This timestamp \uD83D\uDC49 ",
                        time,
                        " should be when the `npx open-next build` was run, not when the page is refreshed. Hence, this time should not change on refresh.js"
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("b", {
                            children: "Test 2:"
                        }),
                        "Check your browser's developer console. the request might show cache MISS on first load. Subsequent refreshes should shows cache HIT."
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fssg&absolutePagePath=private-next-pages%2Fssg.js&preferredRegion=&middlewareConfig=e30%3D!

        // Next.js Route Loader
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fssg_absolutePagePath_private_next_pages_2Fssg_js_preferredRegion_middlewareConfig_e30_3D_ = ((0,helpers/* hoist */.l)(ssg_namespaceObject, "default"));

        // Re-export methods.
        const next_route_loaderpage_2Fssg_absolutePagePath_private_next_pages_2Fssg_js_preferredRegion_middlewareConfig_e30_3D_getStaticProps = (0,helpers/* hoist */.l)(ssg_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(ssg_namespaceObject, "getStaticPaths")
        const getServerSideProps = (0,helpers/* hoist */.l)(ssg_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(ssg_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(ssg_namespaceObject, "reportWebVitals")

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(ssg_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(ssg_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(ssg_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(ssg_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(ssg_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/ssg","pathname":"/ssg","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({ ...options, userland: ssg_namespaceObject })
        
        
    

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [616,664,769], () => (__webpack_exec__(6352)));
module.exports = __webpack_exports__;

})();