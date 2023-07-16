"use strict";
(() => {
var exports = {};
exports.id = 871;
exports.ids = [871];
exports.modules = {

/***/ 5787:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fssg_preview_2F_5Bid_5D_absolutePagePath_private_next_pages_2Fssg_preview_2F_5Bid_5D_js_preferredRegion_middlewareConfig_e30_3D_),
  getServerSideProps: () => (/* binding */ getServerSideProps),
  getStaticPaths: () => (/* binding */ next_route_loaderpage_2Fssg_preview_2F_5Bid_5D_absolutePagePath_private_next_pages_2Fssg_preview_2F_5Bid_5D_js_preferredRegion_middlewareConfig_e30_3D_getStaticPaths),
  getStaticProps: () => (/* binding */ next_route_loaderpage_2Fssg_preview_2F_5Bid_5D_absolutePagePath_private_next_pages_2Fssg_preview_2F_5Bid_5D_js_preferredRegion_middlewareConfig_e30_3D_getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./pages/ssg-preview/[id].js
var _id_namespaceObject = {};
__webpack_require__.r(_id_namespaceObject);
__webpack_require__.d(_id_namespaceObject, {
  "default": () => (Post),
  getStaticPaths: () => (getStaticPaths),
  getStaticProps: () => (getStaticProps)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(3185);
var module_default = /*#__PURE__*/__webpack_require__.n(pages_module);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7182);
// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2322);
;// CONCATENATED MODULE: ./pages/ssg-preview/[id].js

async function getStaticProps(context) {
    return {
        props: {
            title: context.params.id,
            isPreview: context.preview ? "true" : "false"
        }
    };
}
async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    id: "hello"
                }
            },
            {
                params: {
                    id: "world"
                }
            }
        ],
        fallback: false
    };
}
function Post({ title, isPreview }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("h1", {
                children: [
                    "Title: ",
                    title
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("h1", {
                children: [
                    "IsPreview: ",
                    isPreview
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fssg-preview%2F%5Bid%5D&absolutePagePath=private-next-pages%2Fssg-preview%2F%5Bid%5D.js&preferredRegion=&middlewareConfig=e30%3D!

        // Next.js Route Loader
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fssg_preview_2F_5Bid_5D_absolutePagePath_private_next_pages_2Fssg_preview_2F_5Bid_5D_js_preferredRegion_middlewareConfig_e30_3D_ = ((0,helpers/* hoist */.l)(_id_namespaceObject, "default"));

        // Re-export methods.
        const next_route_loaderpage_2Fssg_preview_2F_5Bid_5D_absolutePagePath_private_next_pages_2Fssg_preview_2F_5Bid_5D_js_preferredRegion_middlewareConfig_e30_3D_getStaticProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticProps")
        const next_route_loaderpage_2Fssg_preview_2F_5Bid_5D_absolutePagePath_private_next_pages_2Fssg_preview_2F_5Bid_5D_js_preferredRegion_middlewareConfig_e30_3D_getStaticPaths = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticPaths")
        const getServerSideProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(_id_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(_id_namespaceObject, "reportWebVitals")

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/ssg-preview/[id]","pathname":"/ssg-preview/[id]","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({ ...options, userland: _id_namespaceObject })
        
        
    

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [616], () => (__webpack_exec__(5787)));
module.exports = __webpack_exports__;

})();