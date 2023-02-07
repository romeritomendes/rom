import React, { r as react } from './__federation_shared_react.js';
import { r as reactDom } from './__federation_shared_react-dom.js';
import { Link, BrowserRouter, Routes, Route } from './__federation_shared_react-router-dom.js';
import He from './__federation_shared_styled-components.js';
import { GenIcon, j as jsx, a as jsxs } from './__federation_shared_react-icons.js';

true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

var client = {};

var m = reactDom.exports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
    // @ts-ignore
    if (!true || !deps || deps.length === 0) {
        return baseModule();
    }
    const links = document.getElementsByTagName('link');
    return Promise.all(deps.map((dep) => {
        // @ts-ignore
        dep = assetsURL(dep);
        // @ts-ignore
        if (dep in seen)
            return;
        // @ts-ignore
        seen[dep] = true;
        const isCss = dep.endsWith('.css');
        const cssSelector = isCss ? '[rel="stylesheet"]' : '';
        const isBaseRelative = !!importerUrl;
        // check if the file is already preloaded by SSR markup
        if (isBaseRelative) {
            // When isBaseRelative is true then we have `importerUrl` and `dep` is
            // already converted to an absolute URL by the `assetsURL` function
            for (let i = links.length - 1; i >= 0; i--) {
                const link = links[i];
                // The `links[i].href` is an absolute URL thanks to browser doing the work
                // for us. See https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5
                if (link.href === dep && (!isCss || link.rel === 'stylesheet')) {
                    return;
                }
            }
        }
        else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
        }
        // @ts-ignore
        const link = document.createElement('link');
        // @ts-ignore
        link.rel = isCss ? 'stylesheet' : scriptRel;
        if (!isCss) {
            link.as = 'script';
            link.crossOrigin = '';
        }
        link.href = dep;
        // @ts-ignore
        document.head.appendChild(link);
        if (isCss) {
            return new Promise((res, rej) => {
                link.addEventListener('load', res);
                link.addEventListener('error', () => rej(new Error(`Unable to preload CSS for ${dep}`)));
            });
        }
    })).then(() => baseModule());
};

const remotesMap = {
'rom_timesheet':{url:'http://localhost:4173/assets/remoteEntry.js',format:'esm',from:'vite'},
  'rom_project':{url:'http://localhost:4174/assets/remoteEntry.js',format:'esm',from:'vite'}
};
const loadJS = async (url, fn) => {
  const resolvedUrl = typeof url === 'function' ? await url() : url;
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = fn;
  script.src = resolvedUrl;
  document.getElementsByTagName('head')[0].appendChild(script);
};
const scriptTypes = ['var'];
const importTypes = ['esm', 'systemjs'];
function get(name, remoteFrom){
  return __federation_import(name).then(module => ()=> {
    if (remoteFrom === 'webpack') {
      return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
    }
    return module
  })
}
const wrapShareModule = remoteFrom => {
  return {
    'react':{'18.2.0':{get:()=>get('./__federation_shared_react.js', remoteFrom), loaded:1}},'react-dom':{'18.2.0':{get:()=>get('./__federation_shared_react-dom.js', remoteFrom), loaded:1}},'react-icons':{'4.6.0':{get:()=>get('./__federation_shared_react-icons.js', remoteFrom), loaded:1}},'react-router-dom':{'6.4.3':{get:()=>get('./__federation_shared_react-router-dom.js', remoteFrom), loaded:1}},'styled-components':{'5.3.6':{get:()=>get('./__federation_shared_styled-components.js', remoteFrom), loaded:1}}
  }
};
async function __federation_import(name){
  return __vitePreload(() => import(name),true?[]:void 0);
}
async function __federation_method_ensure(remoteId) {
  const remote = remotesMap[remoteId];
  if (!remote.inited) {
    if (scriptTypes.includes(remote.format)) {
      // loading js with script tag
      return new Promise(resolve => {
        const callback = () => {
          if (!remote.inited) {
            remote.lib = window[remoteId];
            remote.lib.init(wrapShareModule(remote.from));
            remote.inited = true;
          }
          resolve(remote.lib);
        };
        return loadJS(remote.url, callback);
      });
    } else if (importTypes.includes(remote.format)) {
      // loading js with import(...)
      return new Promise(resolve => {
        const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
        getUrl().then(url => {
          __vitePreload(() => import(/* @vite-ignore */ url),true?[]:void 0).then(lib => {
            if (!remote.inited) {
              const shareScope = wrapShareModule(remote.from);
              lib.init(shareScope);
              remote.lib = lib;
              remote.lib.init(shareScope);
              remote.inited = true;
            }
            resolve(remote.lib);
          });
        });
      })
    }
  } else {
    return remote.lib;
  }
}

function __federation_method_wrapDefault(module ,need){
  if (!module?.default && need) {
    let obj = Object.create(null);
    obj.default = module;
    obj.__esModule = true;
    return obj;
  }
  return module; 
}

function __federation_method_getRemote(remoteName,  componentName){
  return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
}

// THIS FILE IS AUTO GENERATED
function FaBars (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"}}]})(props);
}function FaFileInvoiceDollar (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 384 512"},"child":[{"tag":"path","attr":{"d":"M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 80v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8zm144 263.88V440c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-24.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V232c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v24.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07z"}}]})(props);
}

// THIS FILE IS AUTO GENERATED
function AiOutlineClose (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 1024 1024"},"child":[{"tag":"path","attr":{"d":"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}}]})(props);
}

// THIS FILE IS AUTO GENERATED
function HiOutlineClipboardList (props) {
  return GenIcon({"tag":"svg","attr":{"fill":"none","viewBox":"0 0 24 24","stroke":"currentColor"},"child":[{"tag":"path","attr":{"strokeLinecap":"round","strokeLinejoin":"round","strokeWidth":"2","d":"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"}}]})(props);
}

// THIS FILE IS AUTO GENERATED
function RiGovernmentLine (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"none","d":"M0 0h24v24H0z"}},{"tag":"path","attr":{"d":"M20 6h3v2h-1v11h1v2H1v-2h1V8H1V6h3V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2zm0 2H4v11h3v-7h2v7h2v-7h2v7h2v-7h2v7h3V8zM6 5v1h12V5H6z"}}]}]})(props);
}

// THIS FILE IS AUTO GENERATED
function GiMoneyStack (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M327.027 65.816L229.79 128.23l9.856 5.397 86.51-55.53 146.735 83.116-84.165 54.023 4.1 2.244v6.848l65.923-42.316 13.836 7.838-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l100.033-64.21-24.828-14.062 24.827-15.937-24.828-14.064 24.827-15.937-23.537-13.333 23.842-15.305-166.135-94.106zm31.067 44.74c-21.038 10.556-49.06 12.342-68.79 4.383l-38.57 24.757 126.903 69.47 36.582-23.48c-14.41-11.376-13.21-28.35 2.942-41.67l-59.068-33.46zM227.504 147.5l-70.688 46.094 135.61 78.066 1.33-.85c2.5-1.61 6.03-3.89 10.242-6.613 8.42-5.443 19.563-12.66 30.674-19.86 16.002-10.37 24.248-15.72 31.916-20.694L227.504 147.5zm115.467 1.17a8.583 14.437 82.068 0 1 .003 0 8.583 14.437 82.068 0 1 8.32 1.945 8.583 14.437 82.068 0 1-.87 12.282 8.583 14.437 82.068 0 1-20.273 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.237zm-218.423 47.115L19.143 263.44l23.537 13.333-23.842 15.305 24.828 14.063-24.828 15.938 24.828 14.063-24.828 15.938 166.135 94.106L285.277 381.8V370.08l-99.433 63.824L39.11 350.787l14.255-9.15 131.608 74.547L285.277 351.8V340.08l-99.433 63.824L39.11 320.787l14.255-9.15 131.608 74.547L285.277 321.8V310.08l-99.433 63.824L39.11 290.787l13.27-8.52 132.9 75.28 99.997-64.188v-5.05l-5.48-3.154-93.65 60.11-146.73-83.116 94.76-60.824-9.63-5.543zm20.46 11.78l-46.92 30.115c14.41 11.374 13.21 28.348-2.942 41.67l59.068 33.46c21.037-10.557 49.057-12.342 68.787-4.384l45.965-29.504-123.96-71.358zm229.817 32.19c-8.044 5.217-15.138 9.822-30.363 19.688-11.112 7.203-22.258 14.42-30.69 19.873-4.217 2.725-7.755 5.01-10.278 6.632-.09.06-.127.08-.215.137v85.924l71.547-48.088v-84.166zm-200.99 17.48a8.583 14.437 82.068 0 1 8.32 1.947 8.583 14.437 82.068 0 1-.87 12.28 8.583 14.437 82.068 0 1-20.27 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.236z"}}]})(props);
}function GiPayMoney (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M298.9 24.31c-14.9.3-25.6 3.2-32.7 8.4l-97.3 52.1-54.1 73.59c-11.4 17.6-3.3 51.6 32.3 29.8l39-51.4c49.5-42.69 150.5-23.1 102.6 62.6-23.5 49.6-12.5 73.8 17.8 84l13.8-46.4c23.9-53.8 68.5-63.5 66.7-106.9l107.2 7.7-1-112.09-194.3-1.4zM244.8 127.7c-17.4-.3-34.5 6.9-46.9 17.3l-39.1 51.4c10.7 8.5 21.5 3.9 32.2-6.4 12.6 6.4 22.4-3.5 30.4-23.3 3.3-13.5 8.2-23 23.4-39zm-79.6 96c-.4 0-.9 0-1.3.1-3.3.7-7.2 4.2-9.8 12.2-2.7 8-3.3 19.4-.9 31.6 2.4 12.1 7.4 22.4 13 28.8 5.4 6.3 10.4 8.1 13.7 7.4 3.4-.6 7.2-4.2 9.8-12.1 2.7-8 3.4-19.5 1-31.6-2.5-12.2-7.5-22.5-13-28.8-4.8-5.6-9.2-7.6-12.5-7.6zm82.6 106.8c-7.9.1-17.8 2.6-27.5 7.3-11.1 5.5-19.8 13.1-24.5 20.1-4.7 6.9-5.1 12.1-3.6 15.2 1.5 3 5.9 5.9 14.3 6.3 8.4.5 19.7-1.8 30.8-7.3 11.1-5.5 19.8-13 24.5-20 4.7-6.9 5.1-12.2 3.6-15.2-1.5-3.1-5.9-5.9-14.3-6.3-1.1-.1-2.1-.1-3.3-.1zm-97.6 95.6c-4.7.1-9 .8-12.8 1.9-8.5 2.5-13.4 7-15 12.3-1.7 5.4 0 11.8 5.7 18.7 5.8 6.8 15.5 13.3 27.5 16.9 11.9 3.6 23.5 3.5 32.1.9 8.6-2.5 13.5-7 15.1-12.3 1.6-5.4 0-11.8-5.8-18.7-5.7-6.8-15.4-13.3-27.4-16.9-6.8-2-13.4-2.9-19.4-2.8z"}}]})(props);
}function GiReceiveMoney (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M258 21.89c-.5 0-1.2 0-1.8.12-4.6.85-10.1 5.1-13.7 14.81-3.8 9.7-4.6 23.53-1.3 38.34 3.4 14.63 10.4 27.24 18.2 34.94 7.6 7.7 14.5 9.8 19.1 9 4.8-.7 10.1-5.1 13.7-14.7 3.8-9.64 4.8-23.66 1.4-38.35-3.5-14.8-10.4-27.29-18.2-34.94-6.6-6.8-12.7-9.22-17.4-9.22zM373.4 151.4c-11 .3-24.9 3.2-38.4 8.9-15.6 6.8-27.6 15.9-34.2 24.5-6.6 8.3-7.2 14.6-5.1 18.3 2.2 3.7 8.3 7.2 20 7.7 11.7.7 27.5-2.2 43-8.8 15.5-6.7 27.7-15.9 34.3-24.3 6.6-8.3 7.1-14.8 5-18.5-2.1-3.8-8.3-7.1-20-7.5-1.6-.3-3-.3-4.6-.3zm-136.3 92.9c-6.6.1-12.6.9-18 2.3-11.8 3-18.6 8.4-20.8 14.9-2.5 6.5 0 14.3 7.8 22.7 8.2 8.2 21.7 16.1 38.5 20.5 16.7 4.4 32.8 4.3 44.8 1.1 12.1-3.1 18.9-8.6 21.1-15 2.3-6.5 0-14.2-8.1-22.7-7.9-8.2-21.4-16.1-38.2-20.4-9.5-2.5-18.8-3.5-27.1-3.4zm160.7 58.1L336 331.7c4.2.2 14.7.5 14.7.5l6.6 8.7 54.7-28.5-14.2-10zm-54.5.1l-57.4 27.2c5.5.3 18.5.5 23.7.8l49.8-23.6-16.1-4.4zm92.6 10.8l-70.5 37.4 14.5 18.7 74.5-44.6-18.5-11.5zm-278.8 9.1a40.33 40.33 0 0 0-9 1c-71.5 16.5-113.7 17.9-126.2 17.9H18v107.5s11.6-1.7 30.9-1.8c37.3 0 103 6.4 167 43.8 3.4 2.1 10.7 2.9 19.8 2.9 24.3 0 61.2-5.8 69.7-9C391 452.6 494 364.5 494 364.5l-32.5-28.4s-79.8 50.9-89.9 55.8c-91.1 44.7-164.9 16.8-164.9 16.8s119.9 3 158.4-27.3l-22.6-34s-82.8-2.3-112.3-6.2c-15.4-2-48.7-18.8-73.1-18.8z"}}]})(props);
}

const menuItens = [{
  _id: 0,
  title: "TimeSheet",
  path: "/timesheet",
  icon: HiOutlineClipboardList,
  cName: "nav-text",
  level: 5
}, {
  _id: 1,
  title: "Extrato",
  path: "/statement",
  icon: HiOutlineClipboardList,
  cName: "nav-text",
  level: 5
}, {
  _id: 2,
  title: "Fatura",
  path: "/invoice",
  icon: FaFileInvoiceDollar,
  cName: "nav-text",
  level: 5
}, {
  _id: 3,
  title: "Impostos",
  path: "/fee",
  icon: RiGovernmentLine,
  cName: "nav-text",
  level: 5
}, {
  _id: 4,
  title: "Sal\xE1rio",
  path: "/salary",
  icon: GiReceiveMoney,
  cName: "nav-text",
  level: 5
}, {
  _id: 5,
  title: "Adiantamento",
  path: "/report/advance",
  icon: GiMoneyStack,
  cName: "nav-text",
  level: 5
}, {
  _id: 6,
  title: "Pagamentos",
  path: "/payment",
  icon: GiPayMoney,
  cName: "nav-text",
  level: 1
}, {
  _id: 7,
  title: "Contas",
  path: "/report/iva",
  icon: GiPayMoney,
  cName: "nav-text",
  level: 1
}, {
  _id: 8,
  title: "IVA",
  path: "/report/iva",
  icon: GiPayMoney,
  cName: "nav-text",
  level: 5
}, {
  _id: 9,
  title: "Projetos",
  path: "/projects",
  icon: GiPayMoney,
  cName: "nav-text",
  level: 5
}];

const Sidebar = ({
  handleClose,
  level
}) => {
  const currentLevel = level ? level : 0;
  return /* @__PURE__ */ jsx(Container$1, {
    children: /* @__PURE__ */ jsx(Bar, {
      children: /* @__PURE__ */ jsxs(Menu, {
        children: [/* @__PURE__ */ jsx(ItemClose, {
          children: /* @__PURE__ */ jsx(Icon$1, {
            onClick: handleClose,
            children: /* @__PURE__ */ jsx(AiOutlineClose, {})
          })
        }), menuItens.filter((item) => item.level <= currentLevel).map((item) => {
          const Icon2 = item.icon;
          return /* @__PURE__ */ jsx(Item, {
            children: /* @__PURE__ */ jsx(Link, {
              to: `${item.path}?title=${item.title}`,
              children: /* @__PURE__ */ jsxs(CLink, {
                onClick: handleClose,
                children: [/* @__PURE__ */ jsx("div", {
                  children: /* @__PURE__ */ jsx(Icon2, {})
                }), /* @__PURE__ */ jsx("span", {
                  children: item.title
                })]
              })
            })
          }, item._id);
        })]
      })
    })
  });
};
const Container$1 = He.section`
    background: none;
`;
const Bar = He.nav`
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: fixed;
    top: 0;
    transition: 850ms;

    width: 250px;
    /*height: 100vh;*/

    background-color: #060b26;

    z-index: 100;
`;
const Menu = He.ul`
    margin: 0px;
    padding: 0px; 
    width: 100%;
`;
const Item = He.li`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
`;
const ItemClose = He.li`
    display: flex;
    justify-content: end;
    align-items: center;

    list-style: none;
    height: 60px;
`;
const Icon$1 = He.div`
    display: flex;
    align-items: center;
    
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;

    color: #f5f5f5;

    :hover {
        background-color: #1a83ff;
    }

    & span {
        margin-left: 16px;
        font-size: 18px;
    }

    cursor: pointer;
`;
const CLink = He.div`
    display: flex;
    align-items: center;
    padding: 0px 16px;
    border-radius: 4px;
    width: 95%;
    height: 100%;

    text-decoration: none;

    color: #f5f5f5;

    :hover {
        background-color: #1a83ff;
    }

    & span {
        margin-left: 16px;
        font-size: 18px;
    }

    cursor: pointer;
`;

function ToolBar({
  user
}) {
  const [sidebar, setSidebar] = react.exports.useState(false);
  return /* @__PURE__ */ jsxs(Container, {
    children: [/* @__PURE__ */ jsxs(TopBar, {
      children: [/* @__PURE__ */ jsx(Icon, {
        onClick: () => setSidebar(!sidebar),
        children: /* @__PURE__ */ jsx(FaBars, {})
      }), /* @__PURE__ */ jsx(SearchBar, {}), /* @__PURE__ */ jsx(UserBar, {
        children: user?.email
      }), /* @__PURE__ */ jsx(CircleBar, {
        children: user?.level
      })]
    }), sidebar && /* @__PURE__ */ jsx(Sidebar, {
      level: user?.level,
      handleClose: () => setSidebar(false)
    })]
  });
}
const Container = He.nav`
    font-size: 2rem;
`;
const TopBar = He.article`
    display: flex;
    /* justify-content: start; */
    align-items: center;

    height: 80px;
    --background-color: #060b26;
    background-color: #3441AD;
`;
const Icon = He.div`
    display: flex;
    align-items: center;
    
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;

    color: #f5f5f5;

    :hover {
        background-color: #1a83ff;
    }

    cursor: pointer;
`;
const SearchBar = He.div`
    flex-grow: 1;
`;
const UserBar = He.div`
    /* padding: 8px 16px; */

    font-size: 1rem;
    color: #f5f5f5;
`;
const CircleBar = He.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 3px;
    margin: 0 1rem 0 0.5rem;
    border-radius: 1rem;
    width: 2rem;
    height: 2rem;

    font-size: 0.8rem;
    color: #f5f5f5;
    background-color: #767ec2;
`;

const TimeSheet = react.exports.lazy(() => __federation_method_getRemote("rom_timesheet" , "./TimeSheet").then(module=>__federation_method_wrapDefault(module, true)));
const Projects = react.exports.lazy(() => __federation_method_getRemote("rom_project" , "./Project").then(module=>__federation_method_wrapDefault(module, true)));
const Main = () => /* @__PURE__ */ jsx("div", {
  children: "Main"
});
const Statement = () => /* @__PURE__ */ jsx("div", {
  children: "Statement"
});
const FallBack = () => /* @__PURE__ */ jsx("div", {
  children: "Carregando..."
});
const AppRouter = () => {
  return /* @__PURE__ */ jsxs(BrowserRouter, {
    children: [/* @__PURE__ */ jsx(ToolBar, {
      user: {
        email: "teste@teste.com",
        level: 5
      }
    }), /* @__PURE__ */ jsxs(Routes, {
      children: [/* @__PURE__ */ jsx(Route, {
        path: "/",
        element: /* @__PURE__ */ jsx(Main, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/statement",
        element: /* @__PURE__ */ jsx(Statement, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/projects",
        element: /* @__PURE__ */ jsx(react.exports.Suspense, {
          fallback: /* @__PURE__ */ jsx(FallBack, {}),
          children: /* @__PURE__ */ jsx(Projects, {})
        })
      }), /* @__PURE__ */ jsx(Route, {
        path: "/timesheet",
        element: /* @__PURE__ */ jsx(react.exports.Suspense, {
          fallback: /* @__PURE__ */ jsx(FallBack, {}),
          children: /* @__PURE__ */ jsx(TimeSheet, {})
        })
      })]
    })]
  });
};

const App = () => {
  return /* @__PURE__ */ jsx(AppRouter, {});
};

const index = '';

client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx(React.StrictMode, {
  children: /* @__PURE__ */ jsx(App, {})
}));
