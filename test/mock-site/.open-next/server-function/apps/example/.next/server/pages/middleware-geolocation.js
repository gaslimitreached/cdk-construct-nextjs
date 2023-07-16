"use strict";
(() => {
var exports = {};
exports.id = 224;
exports.ids = [224];
exports.modules = {

/***/ 4665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fmiddleware_geolocation_absolutePagePath_private_next_pages_2Fmiddleware_geolocation_js_preferredRegion_middlewareConfig_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderpage_2Fmiddleware_geolocation_absolutePagePath_private_next_pages_2Fmiddleware_geolocation_js_preferredRegion_middlewareConfig_e30_3D_getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./pages/middleware-geolocation.js
var middleware_geolocation_namespaceObject = {};
__webpack_require__.r(middleware_geolocation_namespaceObject);
__webpack_require__.d(middleware_geolocation_namespaceObject, {
  "default": () => (Page),
  getServerSideProps: () => (getServerSideProps)
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
;// CONCATENATED MODULE: ./pages/middleware-geolocation.js


async function getServerSideProps(context) {
    return {
        props: {
            qs: JSON.stringify(context.query)
        }
    };
}
function Page({ qs }) {
    return /*#__PURE__*/ jsx_runtime.jsx(layout/* default */.Z, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("article", {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("h1", {
                    children: "Middleware - geolocation"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("hr", {}),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("b", {
                            children: "Test 1:"
                        }),
                        "URL query contains country, city, and region: ",
                        qs
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fmiddleware-geolocation&absolutePagePath=private-next-pages%2Fmiddleware-geolocation.js&preferredRegion=&middlewareConfig=e30%3D!

        // Next.js Route Loader
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fmiddleware_geolocation_absolutePagePath_private_next_pages_2Fmiddleware_geolocation_js_preferredRegion_middlewareConfig_e30_3D_ = ((0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "getStaticPaths")
        const next_route_loaderpage_2Fmiddleware_geolocation_absolutePagePath_private_next_pages_2Fmiddleware_geolocation_js_preferredRegion_middlewareConfig_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "reportWebVitals")

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(middleware_geolocation_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/middleware-geolocation","pathname":"/middleware-geolocation","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({ ...options, userland: middleware_geolocation_namespaceObject })
        
        
    

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
var __webpack_exports__ = __webpack_require__.X(0, [616,664,769], () => (__webpack_exec__(4665)));
module.exports = __webpack_exports__;

})();