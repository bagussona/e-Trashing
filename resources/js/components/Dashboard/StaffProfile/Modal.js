import React, { useState, useEffect } from 'react';
import { getCoordinate, getLocation, updateProfile, updateStaffPhoto, updateStaffProfile } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
import { useStore } from '../../../utilities/store';
import { BounceLoading } from '../../Assets/LoadingPage';
import Address from './Address';


function Modal({ close, userData }) {

  const setDropdown = useStore(state => state.setAddressDropdown);
  const isDropdown = useStore(state => state.addressDropdown);
  const defaultCoordinate = useStore(state => state.defaultCoordinate);
  const setDefaultCoordinate = useStore(state => state.setDefaultCoordinate);
  const [currentLocation, setCurrentLocation] = useState('');
  const [display, setDisplay] = useState('');

  const [params, setParams] = useState({
    urban: '',
    city: ''
  })
  
  const [loading, setLoading] = useState(true)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [imgFile, setImgFile] = useState(null);

  const [data, setData] = useState({
    firstname: userData.user.first_name,
    lastname: userData.user.last_name,
    phone: userData.user.nohape,
    avatar: userData.user.avatar,
    location: '',
    locationCoordinate: {
      lat: '',
      lon: ''
    }
  })

  const photoChangeHandle = ev => {
    if (ev.target.files && ev.target.files[0]) {
      
      const imageData = new FormData();
      imageData.append('avatar', ev.target.files[0], ev.target.files[0].name)
      setUploadLoading(true)

      updateStaffPhoto(getCookie('token'), imageData, userData.user.id)
      .then(res => {
        console.log(res)
        setData({
          ...data,
          avatar: URL.createObjectURL(ev.target.files[0])
        })
        setUploadLoading(false)
      }); 
    }
  }

  const geoLocation = () => {
    getCoordinate(`${params.urban},+${params.city}`)
    .then(res => console.log(res))
  }

  const updateData = ()  => {
    setUploadLoading(true);

    if (defaultCoordinate) {
      const formData = new FormData();
      formData.append('first_name', data.firstname)
      formData.append('last_name', data.lastname)
      formData.append('nohape', data.phone)
      formData.append('location', data.location)

      if ((userData.user.role_names).toString() === 'bendahara') {
        updateProfile(getCookie('token'), formData)
        .then(res => {
          console.log(res);
          setUploadLoading(false);
          unmountModal()
        })
      } else if ((userData.user.role_names).toString() === 'admin') {
        updateStaffProfile(getCookie('token'), formData, userData.user.id)
        .then(res => {
          console.log(res)
          setUploadLoading(false);
          unmountModal()
        })
      }
    } else {
      getCoordinate(`${params.urban},+${params.city}`)
      .then(res => {
        const formData = new FormData();
        formData.append('first_name', data.firstname)
        formData.append('last_name', data.lastname)
        formData.append('nohape', data.phone)
        formData.append('location', `${res.data[0].lat}, ${res.data[0].lon}`)

        if ((userData.user.role_names).toString() === 'bendahara') {
          updateProfile(getCookie('token'), formData)
          .then(res => {
            console.log(res);
            setUploadLoading(false)
            unmountModal()
          })
        } else if ((userData.user.role_names).toString() === 'admin') {
          updateStaffProfile(getCookie('token'), formData, userData.user.id)
          .then(res => {
            console.log(userData.user.id)
            setUploadLoading(false)
            unmountModal()
          })
        }
      })
    }
  
  }
    
  // const profileUpdate = () => {
  //   const imageData = new FormData();
  //   imageData.append('avatar', data.avatar);

  //   updateProfilePhoto(getCookie('token'), imageData)
  //   .then(res => console.log(res))
  // }

  const unmountModal = () => {
    close(false);
  }

  useEffect(() => {
    const latAndLon = (userData.user.location).split(', ')
    setData({
      ...data,
      location: userData.user.location,
      locationCoordinate: {
        lat: latAndLon[0],
        lon: latAndLon[0]
      }
    })

    getLocation(latAndLon[0], latAndLon[1])
    .then(res => {
      setCurrentLocation(`${res.data.address.city || res.data.address.village}, ${res.data.address.municipality || 'Unknown'}, ${res.data.address.county === undefined ? res.data.address.city : ((res.data.address.county).includes('Regency') ? (res.data.address.county).replace('Regency', '') : res.data.address.county)}`)
      setParams({
        urban: res.data.address.city, city: res.data.address.county
      })
      setLoading(false)
    })

    const listener = event => {
      if (event.code === 'Escape') {
        event.preventDefault();
        unmountModal()
      }
    }

    window.addEventListener('keydown', listener);
    setDefaultCoordinate(true);

    return () => window.removeEventListener('keydown', listener);
  }, [])

  useEffect(() => console.log(imgFile), [imgFile])

  if (loading) {
    return <BounceLoading />
  } else {
    return (
      <div id="edit-user-modals-container" className="z-99 h-screen w-screen absolute top-0 right-0" style={{fontFamily: ['Inter', 'sans-serif']}}>
        {uploadLoading ? <BounceLoading /> : null}
        <div id="content-wrapper" className="h-full w-full relative">
          <div onClick={() => unmountModal()} id="modal-background" className="h-full w-full bg-gray-400 top-0 right-0 absolute bg-opacity-50"></div>
          <div id="edit-user-form" className="h-auto p-10 bg-white rounded box-border flex flex-col items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <button onClick={() => unmountModal()} id="close-button" className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center absolute top-5 right-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"className="text-gray-600 fill-current bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </button>
            {isDropdown ? <div id="click-are" className="h-full w-full bg-transparent absolute top-0" onClick={() => setDropdown(false)}></div> : <span></span>}
            <div id="form" className="flex flex-row">
              <div id="picture-wrapper" className="mr-10 w-60 h-auto">
                <div id="upload-wrapper" className="h-60 w-60 bg-gray-600 bg-opacity-50 absolute rounded">
                  <div id="inside-wrapper" className="h-full w-full relative">
                    <div id="text" className="h-full w-full flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="text-white fill-current bi bi-camera-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                      </svg>
                      <span className="text-lg text-white w-2/3 text-center">Click to change photo</span>
                    </div>
                    <input type="file" id="upload-input" className="flex flex-col items-center justify-center top-0 left-0 w-60 h-60 absolute opacity-0 cursor-pointer" onChange={photoChangeHandle} />
                  </div>
                </div>
                <picture>
                  <img src={data.avatar} className="h-60 rounded object-cover" />
                </picture>
                <span id="note" className="text-sm text-gray-400" style={{ fontWeight: 400 }}>Hanya dapat menerima file dengan ekstensi .jpeg/ .jpg dan .png dengan ukuran maksimal 2MB.</span>
              </div>
              <div id="form-wrapper" className="ml-10 flex flex-col" style={{width: 400+'px'}}>
                <div id="form-title" className="mb-10 w-full text-center">
                  <h1 id="title" className="text-gray-600 text-xl" style={{fontWeight: 600}}>Profile Details</h1>
                </div>
                <div id="form-body" className="flex flex-col space-y-16">
                  <div id="input-wrapper" className="flex flex-col space-y-8">
                    <div id="input-first_name" className="flex flex-col space-y-4">
                      <span id="label-first_name" className="text-gray-400">First Name</span>
                      <input onChange={ev => setData({
                        ...data,
                        firstname: ev.target.value
                      })} value={data.firstname} type="text" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2"/>
                    </div>
                    <div id="input-last_name" className="flex flex-col space-y-4">
                      <span id="label-last_name" className="text-gray-400">Last Name</span>
                      <input onChange={ev => setData({
                        ...data,
                        lastname: ev.target.value
                      })} value={data.lastname} type="text" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2"/>
                    </div>
                    <div id="input-email" className="flex flex-col space-y-4">
                      <span id="label-email" className="text-gray-400">Email</span>
                      <input type="email" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2" disabled value={userData.user.email}/>
                    </div>
                    <div id="input-phone" className="flex flex-col space-y-4">
                      <span id="label-phone" className="text-gray-400">Phone Number</span>
                      <input onChange={ev => setData({
                        ...data,
                        phone: ev.target.value
                      })} value={data.phone} type="text" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2"/>
                    </div>
                    <div id="input-address" className="flex flex-col space-y-4">
                      <span id="label-address" className="text-gray-400">Address</span>
                      <Address location={currentLocation} setParams={setParams} />
                    </div>
                  </div>
                  <div id="form-button" className="w-full justify-end">
                    <button className="h-10 w-full bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-lg" onClick={() => {
                      // console.log(params);
                      updateData()
                      // geoLocation()
                    }}>
                      <span id="button-text" className="text-white">Update Account</span>
                    </button>
                    {/* <button onClick={() => console.log(defaultCoordinate)}>test</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;