import React from 'react';
import { useEffect, useState } from 'react';
import { setGarbage, editGarbage } from '../../apis/api';
import { getCookie } from '../../utilities/obtain_cookie';
import { BounceLoading } from '../Assets/LoadingPage';


function GarbageItemModal(props) {
  const { close, nameByID, priceByID, clearData, ID } = props;
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [garbageData, setGarbageData] = useState({
    name: '' || nameByID,
    price: '' || priceByID
  })
  const id = ID;

  const unmountModal = () => {
    clearData();
    close(false);
  }

  const fileInputHandle = ev => {
    // console.log(ev.target.files);

    if (ev.target.files && ev.target.files[0]) {
      let img = ev.target.files[0];

      setImageUrl(URL.createObjectURL(img));
      setImageUploaded(true);
    }
  }

  const createData = () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('name', garbageData.name);
    formData.append('@KG', garbageData.price);

    setGarbage(getCookie('token'), formData)
    .then(res => {
      // console.log(res)
      setLoading(false);
      unmountModal()
    })
    .catch(err => {
      console.log(err)
    })
    // console.log(typeof(getCookie('token')))
  }

  const editData = () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('name', garbageData.name);
    formData.append('@KG', garbageData.price);

    editGarbage(getCookie('token'), formData, id)
    .then(res => {
      // console.log(res);
      setLoading(false);
      unmountModal()
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Escape') {
        event.preventDefault();
        unmountModal()
      }
    }

    window.addEventListener('keydown', listener);

    return () => {
      setGarbageData({
        name: '',
        price: ''
      })
      
      window.removeEventListener('keydown', listener)
    };

  }, [])

  // if (loading) {
  //   return <BounceLoading />
  // } else {
    return (
      <div id="add-item-modals-container" className="z-99 h-screen w-screen absolute top-0 right-0">
        {loading === true ? <BounceLoading /> : null}
        {/* <BounceLoading /> */}
        <div id="add-iteme-modals-wrapper" className="h-full w-full relative">
          <div onClick={() => unmountModal()} id="add-item-modals" className="h-full w-full bg-gray-400 top-0 right-0 absolute bg-opacity-50"></div>
          <div id="add-items-form" className="h-auto p-4 bg-white rounded box-border flex flex-col items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} >
            <div id="title" className="w-full h-20 flex items-center justify-center mb-4">
              <h1 className="text-gray-600 text-xl subpixel-antialiased tracking-wider" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 }}>Tambah Sampah</h1>
            </div>
            <div id="form" className="w-full h-auto flex-shrink flex flex-col">
              <div id="input-form" className="flex flex-row w-full h-auto space-x-4 mb-4">
                <div id="picture-input-wrapper" className="flex flex-col space-y-2 h-auto w-48">
                  <div id="modal-picture" className="h-48 w-48 shadow border-1 flex flex-col items-center justify-center relative bg-gray-100">
                    <input type="file" accept="image/jpeg, .jpeg, .jpg, image/png, .png" onChange={fileInputHandle} className="opacity-0 h-full w-full z-40 cursor-pointer" />
                    {imageUploaded ? 
                      <img src={imageUrl ? imageUrl : '/3962578.jpg'} className="h-full w-full object-cover absolute" /> :
                      <div id="upload-button-wrapper" className="h-full w-full flex items-center justify-center p-8 absolute">
                        <div id="upload-button" className="h-10 w-full bg-white rounded shadow-md flex items-center justify-center">
                          <span id="upload-button-text" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>Choose Photo</span>
                        </div>
                      </div>
                    }
                  </div>
                  <span id="note" className="text-sm text-gray-400" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Hanya dapat menerima file dengan ekstensi .jpeg/ .jpg dan .png.</span>
                </div>
                <div id="modal-input" className="flex flex-col w-64 space-y-8">
                  <div id="input-wrapper" className="flex flex-col">
                    <span id="label" className="text-gray-600" className="mb-2" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Jenis Sampah</span>
                    <input name="name" className="h-10 border-gray-100 bg-gray-100 border-2 rounded focus:outline-none focus:border-blue-400 p-2" value={garbageData.name} onChange={ev => setGarbageData({
                      ...garbageData, 
                      name: ev.target.value
                    })} />
                  </div>
                  <div id="input-wrapper" className="flex flex-col">
                    <span id="label" className="text-gray-600" className="mb-2" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Harga per Kilogram Sampah</span>
                    <input className="h-10 border-gray-100 bg-gray-100 border-2 rounded focus:outline-none focus:border-blue-400 p-2" value={garbageData.price} onChange={ev => setGarbageData({
                      ...garbageData,
                      price: ev.target.value
                    })} />
                  </div>
                </div>
              </div>
              <div id="modal-button" className="h-10 w-full flex flex-row justify-center space-x-4 my-9">
                <button className="w-30 h-full bg-white px-6 rounded focus:outline-none hover:bg-gray-100 active:bg-white transition-colors duration-300 shadow-lg" onClick={() => unmountModal()}>
                  <span id="cancel-button" className="text-blue-400" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>Cancel</span>
                </button>
                <button className="w-30 h-full bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-lg" onClick={() => {
                  (nameByID || priceByID) ? editData() : createData()
                }}>
                  <span id="save-button" className="text-white" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

// }

export default GarbageItemModal;