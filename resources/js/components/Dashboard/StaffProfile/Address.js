import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getAddress, getCoordinate, getLocation } from '../../../apis/api';
import { useStore } from '../../../utilities/store';
import { BounceLoading } from '../../Assets/LoadingPage';


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

function Address({ location, setParams }) {

  const [addressArr, setAddressArr] = useState('');
  const isDropdown = useStore(state => state.addressDropdown);
  const setDropdown = useStore(state => state.setAddressDropdown)
  const [loading, setLoading] = useState(true);
  const setDefaultCoordinate = useStore(state => state.setDefaultCoordinate);

  const [addressValue, setAddressValue] = useState('');
  const [isTyping, setIsTyping] = useState(0);
  // const [dropdownAppear, setDropdownAppear] = useState(false);

  const addressData = ev => {
    getAddress(ev)
    .then(res => {
      setAddressArr(res.data);
      // console.log(res.data)
      setLoading(false)
    })
    .catch(err => err)
  }

  const mountDropdown = ev => {
    setDropdown(true)
    
    setAddressValue(ev);
    if (ev.length >= 3) {
      if (isTyping) {
        clearTimeout(isTyping);
        setLoading(true)
      }
      
      setIsTyping(
        setTimeout(() => {
          addressData(ev || addressValue);
        }, 1000)
      )
    } else if (ev.length === 0) {
      clearTimeout(isTyping);
      setLoading(true)
    }
  }

  const addAddress = data => {
    
    setAddressValue(`${data.urban}, ${data.subdistrict}, ${data.city}`);
    setDefaultCoordinate(false)
    // getCoordinate(data.urban, data.city)
    // .then(res => {
    setParams({
      urban: data.urban, 
      city: data.city
    })
    setDropdown(false);
    // })
  }

  useEffect(() => {
    setAddressValue(location);
    // setCoordinate()

    if (!addressValue) {
      setDropdown(false)
    }
  }, [])

  return (
    <div id="address-wrapper" className="w-full h-10 relative flex flex-col">
      {/* <div id="click-area" className="bg-transparent h-full w-full" onClick={() => umountDropdown(false)}></div> */}
      <input type="text" className="h-full bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2" value={addressValue} onChange={ev => mountDropdown(ev.target.value)} {...addressValue ? {onFocus: () => {
        setDropdown(true)
      }} : null}/>
      <div id="address" className={`${isDropdown ? "visible" : "invisible translate-y-10 z-0" } shadow transform transition-transform duration-300 ease-out max-h-52 overflow-auto absolute bottom-10 left-0 w-full bg-white`}>
        <ul role="listbox"className="w-full h-full">
          {loading ? 
            <>
              <li className="h-16 p-2" id="loading-skeleton">
                <span>
                  <Skeleton width="100%" height={20} />
                </span>
              </li>
              <li className="h-16 p-2" id="loading-skeleton">
                <span>
                  <Skeleton width="100%" height={20} />
                </span>
              </li>
              <li className="h-16 p-2" id="loading-skeleton">
                <span>
                  <Skeleton width="100%" height={20} />
                </span>
              </li>
            </> :
            (addressArr.data).map((el, idx) => (
              <li key={idx} className="h-16 text-gray-600 hover:bg-gray-100 active:bg-white">
                <button className="w-full h-full text-left p-2" onClick={() => {
                  addAddress(el)
                  console.log(isDropdown)
                }}>
                  <span>{el.urban}, {el.subdistrict}, {el.city}</span>
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Address;