(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Dashboard_GarbageItemModal_js"],{

/***/ "./resources/js/components/Dashboard/GarbageItemModal.js":
/*!***************************************************************!*\
  !*** ./resources/js/components/Dashboard/GarbageItemModal.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _apis_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../apis/api */ "./resources/js/apis/api.js");
/* harmony import */ var _utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/obtain_cookie */ "./resources/js/utilities/obtain_cookie.js");
/* harmony import */ var _Assets_LoadingPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Assets/LoadingPage */ "./resources/js/components/Assets/LoadingPage.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









function GarbageItemModal(props) {
  var _jsx2, _jsx3;

  var close = props.close,
      nameByID = props.nameByID,
      priceByID = props.priceByID,
      clearData = props.clearData,
      ID = props.ID;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      imageUploaded = _useState4[0],
      setImageUploaded = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      imageUrl = _useState6[0],
      setImageUrl = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    name:  false || nameByID,
    price:  false || priceByID
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      garbageData = _useState8[0],
      setGarbageData = _useState8[1];

  var id = ID;

  var unmountModal = function unmountModal() {
    clearData();
    close(false);
  };

  var fileInputHandle = function fileInputHandle(ev) {
    // console.log(ev.target.files);
    if (ev.target.files && ev.target.files[0]) {
      var img = ev.target.files[0];
      setImageUrl(URL.createObjectURL(img));
      setImageUploaded(true);
    }
  };

  var createData = function createData() {
    setLoading(true);
    var formData = new FormData();
    formData.append('name', garbageData.name);
    formData.append('@KG', garbageData.price);
    (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.setGarbage)((0,_utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__.getCookie)('token'), formData).then(function (res) {
      // console.log(res)
      setLoading(false);
      unmountModal();
    })["catch"](function (err) {
      console.log(err);
    }); // console.log(typeof(getCookie('token')))
  };

  var editData = function editData() {
    setLoading(true);
    var formData = new FormData();
    formData.append('name', garbageData.name);
    formData.append('@KG', garbageData.price);
    (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.editGarbage)((0,_utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__.getCookie)('token'), formData, id).then(function (res) {
      // console.log(res);
      setLoading(false);
      unmountModal();
    })["catch"](function (err) {
      console.log(err);
    });
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var listener = function listener(event) {
      if (event.code === 'Escape') {
        event.preventDefault();
        unmountModal();
      }
    };

    window.addEventListener('keydown', listener);
    return function () {
      setGarbageData({
        name: '',
        price: ''
      });
      window.removeEventListener('keydown', listener);
    };
  }, []); // if (loading) {
  //   return <BounceLoading />
  // } else {

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    id: "add-item-modals-container",
    className: "z-99 h-screen w-screen absolute top-0 right-0",
    children: [loading === true ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Assets_LoadingPage__WEBPACK_IMPORTED_MODULE_3__.BounceLoading, {}) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      id: "add-iteme-modals-wrapper",
      className: "h-full w-full relative",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        onClick: function onClick() {
          return unmountModal();
        },
        id: "add-item-modals",
        className: "h-full w-full bg-gray-400 top-0 right-0 absolute bg-opacity-50"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        id: "add-items-form",
        className: "h-auto p-4 bg-white rounded box-border flex flex-col items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2",
        style: {
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          id: "title",
          className: "w-full h-20 flex items-center justify-center mb-4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
            className: "text-gray-600 text-xl subpixel-antialiased tracking-wider",
            style: {
              fontFamily: ['Inter', 'sans-serif'],
              fontWeight: 600
            },
            children: "Tambah Sampah"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          id: "form",
          className: "w-full h-auto flex-shrink flex flex-col",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            id: "input-form",
            className: "flex flex-row w-full h-auto space-x-4 mb-4",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              id: "picture-input-wrapper",
              className: "flex flex-col space-y-2 h-auto w-48",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                id: "modal-picture",
                className: "h-48 w-48 shadow border-1 flex flex-col items-center justify-center relative bg-gray-100",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                  type: "file",
                  accept: "image/jpeg, .jpeg, .jpg, image/png, .png",
                  onChange: fileInputHandle,
                  className: "opacity-0 h-full w-full z-40 cursor-pointer"
                }), imageUploaded ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: imageUrl ? imageUrl : '/3962578.jpg',
                  className: "h-full w-full object-cover absolute"
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  id: "upload-button-wrapper",
                  className: "h-full w-full flex items-center justify-center p-8 absolute",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    id: "upload-button",
                    className: "h-10 w-full bg-white rounded shadow-md flex items-center justify-center",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                      id: "upload-button-text",
                      className: "text-gray-600",
                      style: {
                        fontFamily: ['Inter', 'sans-serif'],
                        fontWeight: 400
                      },
                      children: "Choose Photo"
                    })
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                id: "note",
                className: "text-sm text-gray-400",
                style: {
                  fontFamily: ['Inter', 'sans-serif'],
                  fontWeight: 600
                },
                children: "Hanya dapat menerima file dengan ekstensi .jpeg/ .jpg dan .png."
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              id: "modal-input",
              className: "flex flex-col w-64 space-y-8",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                id: "input-wrapper",
                className: "flex flex-col",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", (_jsx2 = {
                  id: "label",
                  className: "text-gray-600"
                }, _defineProperty(_jsx2, "className", "mb-2"), _defineProperty(_jsx2, "style", {
                  fontFamily: ['Inter', 'sans-serif'],
                  fontWeight: 600
                }), _defineProperty(_jsx2, "children", "Jenis Sampah"), _jsx2)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                  name: "name",
                  className: "h-10 border-gray-100 bg-gray-100 border-2 rounded focus:outline-none focus:border-blue-400 p-2",
                  value: garbageData.name,
                  onChange: function onChange(ev) {
                    return setGarbageData(_objectSpread(_objectSpread({}, garbageData), {}, {
                      name: ev.target.value
                    }));
                  }
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                id: "input-wrapper",
                className: "flex flex-col",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", (_jsx3 = {
                  id: "label",
                  className: "text-gray-600"
                }, _defineProperty(_jsx3, "className", "mb-2"), _defineProperty(_jsx3, "style", {
                  fontFamily: ['Inter', 'sans-serif'],
                  fontWeight: 600
                }), _defineProperty(_jsx3, "children", "Harga per Kilogram Sampah"), _jsx3)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                  className: "h-10 border-gray-100 bg-gray-100 border-2 rounded focus:outline-none focus:border-blue-400 p-2",
                  value: garbageData.price,
                  onChange: function onChange(ev) {
                    return setGarbageData(_objectSpread(_objectSpread({}, garbageData), {}, {
                      price: ev.target.value
                    }));
                  }
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            id: "modal-button",
            className: "h-10 w-full flex flex-row justify-center space-x-4 my-9",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
              className: "w-30 h-full bg-white px-6 rounded focus:outline-none hover:bg-gray-100 active:bg-white transition-colors duration-300 shadow-lg",
              onClick: function onClick() {
                return unmountModal();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                id: "cancel-button",
                className: "text-blue-400",
                style: {
                  fontFamily: ['Inter', 'sans-serif'],
                  fontWeight: 400
                },
                children: "Cancel"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
              className: "w-30 h-full bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-lg",
              onClick: function onClick() {
                nameByID || priceByID ? editData() : createData();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                id: "save-button",
                className: "text-white",
                style: {
                  fontFamily: ['Inter', 'sans-serif'],
                  fontWeight: 400
                },
                children: "Save"
              })
            })]
          })]
        })]
      })]
    })]
  });
} // }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GarbageItemModal);

/***/ })

}]);