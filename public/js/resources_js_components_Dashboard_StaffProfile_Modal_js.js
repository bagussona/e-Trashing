(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Dashboard_StaffProfile_Modal_js"],{

/***/ "./resources/js/components/Dashboard/StaffProfile/Address.js":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Dashboard/StaffProfile/Address.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var _apis_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../apis/api */ "./resources/js/apis/api.js");
/* harmony import */ var _utilities_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utilities/store */ "./resources/js/utilities/store.js");
/* harmony import */ var _Assets_LoadingPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Assets/LoadingPage */ "./resources/js/components/Assets/LoadingPage.js");
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





 // const toTitleCase = val => {
//   var word = val.replace(
//     /\w\S*/g,
//     function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     }
//   );
//   switch (word) {
//     case "Dki Jakarta":
//       return "DKI Jakarta";
//     case "Di Yogyakarta":
//       return "DI Yogyakarta";
//     default:
//       return word
//   }
// }





function Address(_ref) {
  var location = _ref.location,
      setParams = _ref.setParams;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      addressArr = _useState2[0],
      setAddressArr = _useState2[1];

  var isDropdown = (0,_utilities_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(function (state) {
    return state.addressDropdown;
  });
  var setDropdown = (0,_utilities_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(function (state) {
    return state.setAddressDropdown;
  });

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var setDefaultCoordinate = (0,_utilities_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(function (state) {
    return state.setDefaultCoordinate;
  });

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      addressValue = _useState6[0],
      setAddressValue = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      isTyping = _useState8[0],
      setIsTyping = _useState8[1]; // const [dropdownAppear, setDropdownAppear] = useState(false);


  var addressData = function addressData(ev) {
    (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.getAddress)(ev).then(function (res) {
      setAddressArr(res.data); // console.log(res.data)

      setLoading(false);
    })["catch"](function (err) {
      return err;
    });
  };

  var mountDropdown = function mountDropdown(ev) {
    setDropdown(true);
    setAddressValue(ev);

    if (ev.length >= 3) {
      if (isTyping) {
        clearTimeout(isTyping);
        setLoading(true);
      }

      setIsTyping(setTimeout(function () {
        addressData(ev || addressValue);
      }, 1000));
    } else if (ev.length === 0) {
      clearTimeout(isTyping);
      setLoading(true);
    }
  };

  var addAddress = function addAddress(data) {
    setAddressValue("".concat(data.urban, ", ").concat(data.subdistrict, ", ").concat(data.city));
    setDefaultCoordinate(false); // getCoordinate(data.urban, data.city)
    // .then(res => {

    setParams({
      urban: data.urban,
      city: data.city
    });
    setDropdown(false); // })
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setAddressValue(location); // setCoordinate()

    if (!addressValue) {
      setDropdown(false);
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    id: "address-wrapper",
    className: "w-full h-10 relative flex flex-col",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", _objectSpread({
      type: "text",
      className: "h-full bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2",
      value: addressValue,
      onChange: function onChange(ev) {
        return mountDropdown(ev.target.value);
      }
    }, addressValue ? {
      onFocus: function onFocus() {
        setDropdown(true);
      }
    } : null)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      id: "address",
      className: "".concat(isDropdown ? "visible" : "invisible translate-y-10 z-0", " shadow transform transition-transform duration-300 ease-out max-h-52 overflow-auto absolute bottom-10 left-0 w-full bg-white"),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("ul", {
        role: "listbox",
        className: "w-full h-full",
        children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            className: "h-16 p-2",
            id: "loading-skeleton",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__.default, {
                width: "100%",
                height: 20
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            className: "h-16 p-2",
            id: "loading-skeleton",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__.default, {
                width: "100%",
                height: 20
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            className: "h-16 p-2",
            id: "loading-skeleton",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__.default, {
                width: "100%",
                height: 20
              })
            })
          })]
        }) : addressArr.data.map(function (el, idx) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            className: "h-16 text-gray-600 hover:bg-gray-100 active:bg-white",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
              className: "w-full h-full text-left p-2",
              onClick: function onClick() {
                addAddress(el);
                console.log(isDropdown);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                children: [el.urban, ", ", el.subdistrict, ", ", el.city]
              })
            })
          }, idx);
        })
      })
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Address);

/***/ }),

/***/ "./resources/js/components/Dashboard/StaffProfile/Modal.js":
/*!*****************************************************************!*\
  !*** ./resources/js/components/Dashboard/StaffProfile/Modal.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _apis_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../apis/api */ "./resources/js/apis/api.js");
/* harmony import */ var _utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utilities/obtain_cookie */ "./resources/js/utilities/obtain_cookie.js");
/* harmony import */ var _utilities_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utilities/store */ "./resources/js/utilities/store.js");
/* harmony import */ var _Assets_LoadingPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Assets/LoadingPage */ "./resources/js/components/Assets/LoadingPage.js");
/* harmony import */ var _Address__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Address */ "./resources/js/components/Dashboard/StaffProfile/Address.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










function Modal(_ref) {
  var close = _ref.close,
      userData = _ref.userData;
  var setDropdown = (0,_utilities_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(function (state) {
    return state.setAddressDropdown;
  });
  var isDropdown = (0,_utilities_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(function (state) {
    return state.addressDropdown;
  });
  var defaultCoordinate = (0,_utilities_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(function (state) {
    return state.defaultCoordinate;
  });
  var setDefaultCoordinate = (0,_utilities_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(function (state) {
    return state.setDefaultCoordinate;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      currentLocation = _useState2[0],
      setCurrentLocation = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      display = _useState4[0],
      setDisplay = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    urban: '',
    city: ''
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      params = _useState6[0],
      setParams = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      uploadLoading = _useState10[0],
      setUploadLoading = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      imgFile = _useState12[0],
      setImgFile = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    firstname: userData.user.first_name,
    lastname: userData.user.last_name,
    phone: userData.user.nohape,
    avatar: userData.user.avatar,
    location: '',
    locationCoordinate: {
      lat: '',
      lon: ''
    }
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      data = _useState14[0],
      setData = _useState14[1];

  var photoChangeHandle = function photoChangeHandle(ev) {
    if (ev.target.files && ev.target.files[0]) {
      var imageData = new FormData();
      imageData.append('avatar', ev.target.files[0], ev.target.files[0].name);
      setUploadLoading(true);
      (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.updateStaffPhoto)((0,_utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__.getCookie)('token'), imageData, userData.user.id).then(function (res) {
        console.log(res);
        setData(_objectSpread(_objectSpread({}, data), {}, {
          avatar: URL.createObjectURL(ev.target.files[0])
        }));
        setUploadLoading(false);
      });
    }
  };

  var geoLocation = function geoLocation() {
    (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.getCoordinate)("".concat(params.urban, ",+").concat(params.city)).then(function (res) {
      return console.log(res);
    });
  };

  var updateData = function updateData() {
    setUploadLoading(true);

    if (defaultCoordinate) {
      var formData = new FormData();
      formData.append('first_name', data.firstname);
      formData.append('last_name', data.lastname);
      formData.append('nohape', data.phone);
      formData.append('location', data.location);

      if (userData.user.role_names.toString() === 'bendahara') {
        (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.updateProfile)((0,_utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__.getCookie)('token'), formData).then(function (res) {
          console.log(res);
          setUploadLoading(false);
          unmountModal();
        });
      } else if (userData.user.role_names.toString() === 'admin') {
        (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.updateStaffProfile)((0,_utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__.getCookie)('token'), formData, userData.user.id).then(function (res) {
          console.log(res);
          setUploadLoading(false);
          unmountModal();
        });
      }
    } else {
      (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.getCoordinate)("".concat(params.urban, ",+").concat(params.city)).then(function (res) {
        var formData = new FormData();
        formData.append('first_name', data.firstname);
        formData.append('last_name', data.lastname);
        formData.append('nohape', data.phone);
        formData.append('location', "".concat(res.data[0].lat, ", ").concat(res.data[0].lon));

        if (userData.user.role_names.toString() === 'bendahara') {
          (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.updateProfile)((0,_utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__.getCookie)('token'), formData).then(function (res) {
            console.log(res);
            setUploadLoading(false);
            unmountModal();
          });
        } else if (userData.user.role_names.toString() === 'admin') {
          (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.updateStaffProfile)((0,_utilities_obtain_cookie__WEBPACK_IMPORTED_MODULE_2__.getCookie)('token'), formData, userData.user.id).then(function (res) {
            console.log(userData.user.id);
            setUploadLoading(false);
            unmountModal();
          });
        }
      });
    }
  }; // const profileUpdate = () => {
  //   const imageData = new FormData();
  //   imageData.append('avatar', data.avatar);
  //   updateProfilePhoto(getCookie('token'), imageData)
  //   .then(res => console.log(res))
  // }


  var unmountModal = function unmountModal() {
    close(false);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var latAndLon = userData.user.location.split(', ');
    setData(_objectSpread(_objectSpread({}, data), {}, {
      location: userData.user.location,
      locationCoordinate: {
        lat: latAndLon[0],
        lon: latAndLon[0]
      }
    }));
    (0,_apis_api__WEBPACK_IMPORTED_MODULE_1__.getLocation)(latAndLon[0], latAndLon[1]).then(function (res) {
      setCurrentLocation("".concat(res.data.address.city || res.data.address.village, ", ").concat(res.data.address.municipality || 'Unknown', ", ").concat(res.data.address.county === undefined ? res.data.address.city : res.data.address.county.includes('Regency') ? res.data.address.county.replace('Regency', '') : res.data.address.county));
      setParams({
        urban: res.data.address.city,
        city: res.data.address.county
      });
      setLoading(false);
    });

    var listener = function listener(event) {
      if (event.code === 'Escape') {
        event.preventDefault();
        unmountModal();
      }
    };

    window.addEventListener('keydown', listener);
    setDefaultCoordinate(true);
    return function () {
      return window.removeEventListener('keydown', listener);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return console.log(imgFile);
  }, [imgFile]);

  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Assets_LoadingPage__WEBPACK_IMPORTED_MODULE_4__.BounceLoading, {});
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      id: "edit-user-modals-container",
      className: "z-99 h-screen w-screen absolute top-0 right-0",
      style: {
        fontFamily: ['Inter', 'sans-serif']
      },
      children: [uploadLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Assets_LoadingPage__WEBPACK_IMPORTED_MODULE_4__.BounceLoading, {}) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        id: "content-wrapper",
        className: "h-full w-full relative",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          onClick: function onClick() {
            return unmountModal();
          },
          id: "modal-background",
          className: "h-full w-full bg-gray-400 top-0 right-0 absolute bg-opacity-50"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          id: "edit-user-form",
          className: "h-auto p-10 bg-white rounded box-border flex flex-col items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
            onClick: function onClick() {
              return unmountModal();
            },
            id: "close-button",
            className: "h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center absolute top-5 right-5",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "14",
              height: "14",
              className: "text-gray-600 fill-current bi bi-x-lg",
              viewBox: "0 0 16 16",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                d: "M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
              })
            })
          }), isDropdown ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            id: "click-are",
            className: "h-full w-full bg-transparent absolute top-0",
            onClick: function onClick() {
              return setDropdown(false);
            }
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            id: "form",
            className: "flex flex-row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              id: "picture-wrapper",
              className: "mr-10 w-60 h-auto",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                id: "upload-wrapper",
                className: "h-60 w-60 bg-gray-600 bg-opacity-50 absolute rounded",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  id: "inside-wrapper",
                  className: "h-full w-full relative",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    id: "text",
                    className: "h-full w-full flex flex-col items-center justify-center",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "40",
                      height: "40",
                      className: "text-white fill-current bi bi-camera-fill",
                      viewBox: "0 0 16 16",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                        d: "M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                        d: "M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      className: "text-lg text-white w-2/3 text-center",
                      children: "Click to change photo"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                    type: "file",
                    id: "upload-input",
                    className: "flex flex-col items-center justify-center top-0 left-0 w-60 h-60 absolute opacity-0 cursor-pointer",
                    onChange: photoChangeHandle
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("picture", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                  src: data.avatar,
                  className: "h-60 rounded object-cover"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                id: "note",
                className: "text-sm text-gray-400",
                style: {
                  fontWeight: 400
                },
                children: "Hanya dapat menerima file dengan ekstensi .jpeg/ .jpg dan .png dengan ukuran maksimal 2MB."
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              id: "form-wrapper",
              className: "ml-10 flex flex-col",
              style: {
                width: 400 + 'px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                id: "form-title",
                className: "mb-10 w-full text-center",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h1", {
                  id: "title",
                  className: "text-gray-600 text-xl",
                  style: {
                    fontWeight: 600
                  },
                  children: "Profile Details"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                id: "form-body",
                className: "flex flex-col space-y-16",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  id: "input-wrapper",
                  className: "flex flex-col space-y-8",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    id: "input-first_name",
                    className: "flex flex-col space-y-4",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      id: "label-first_name",
                      className: "text-gray-400",
                      children: "First Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                      onChange: function onChange(ev) {
                        return setData(_objectSpread(_objectSpread({}, data), {}, {
                          firstname: ev.target.value
                        }));
                      },
                      value: data.firstname,
                      type: "text",
                      className: "h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    id: "input-last_name",
                    className: "flex flex-col space-y-4",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      id: "label-last_name",
                      className: "text-gray-400",
                      children: "Last Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                      onChange: function onChange(ev) {
                        return setData(_objectSpread(_objectSpread({}, data), {}, {
                          lastname: ev.target.value
                        }));
                      },
                      value: data.lastname,
                      type: "text",
                      className: "h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    id: "input-email",
                    className: "flex flex-col space-y-4",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      id: "label-email",
                      className: "text-gray-400",
                      children: "Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                      type: "email",
                      className: "h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2",
                      disabled: true,
                      value: userData.user.email
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    id: "input-phone",
                    className: "flex flex-col space-y-4",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      id: "label-phone",
                      className: "text-gray-400",
                      children: "Phone Number"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                      onChange: function onChange(ev) {
                        return setData(_objectSpread(_objectSpread({}, data), {}, {
                          phone: ev.target.value
                        }));
                      },
                      value: data.phone,
                      type: "text",
                      className: "h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    id: "input-address",
                    className: "flex flex-col space-y-4",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      id: "label-address",
                      className: "text-gray-400",
                      children: "Address"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Address__WEBPACK_IMPORTED_MODULE_5__.default, {
                      location: currentLocation,
                      setParams: setParams
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  id: "form-button",
                  className: "w-full justify-end",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                    className: "h-10 w-full bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-lg",
                    onClick: function onClick() {
                      // console.log(params);
                      updateData(); // geoLocation()
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      id: "button-text",
                      className: "text-white",
                      children: "Update Account"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                    onClick: function onClick() {
                      return console.log(defaultCoordinate);
                    },
                    children: "test"
                  })]
                })]
              })]
            })]
          })]
        })]
      })]
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ })

}]);