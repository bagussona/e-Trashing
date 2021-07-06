import React, { Suspense, useEffect, useState } from 'react';
import { deleteGarbage, getGarbage } from '../../apis/api';
import { getCookie } from '../../utilities/obtain_cookie';
import { BounceLoading, ClimbingBoxLoading } from '../Assets/LoadingPage';
import Header from '../Header';
// import GarbageItemModal from './GarbageItemModal';

const GarbageItemModal = React.lazy(() => import('./GarbageItemModal'));
// import { useStore } from '../../utilities/store';


function CreateGarbage() {
  const [garbages, setGarbages] = useState([]);
  const [addItemModal, setAddItemModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingClick, setLoadingClick] = useState(false);
  const [previewId, setPreviewId] = useState(null);
  const [nameByID, setNameByID] = useState('');
  const [priceByID, setPriceByID] = useState('');
  const [id, setID] = useState('');

  const deleteGarbageById = (id) => {
    setLoadingClick(true)
    deleteGarbage(getCookie('token'), id)
    .then(res => {
      // setLoading(true);
      getGarbageMethod();
      setLoadingClick(false)
    })
    .catch(err => {
      alert(`error occured ${err}`)
    })
  }

  const getGarbageMethod = () => {
    getGarbage(getCookie('token'))
      .then(async res => {
        const items = await res.data.jenisSampah;
        setGarbages(items);
        // setLoading(false);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }

  const editCurrentGarbage = (name, price, id) => {
    setNameByID(name);
    setPriceByID(price);
    setID(id);
    setAddItemModal(true);  
  }

  useEffect(() => {
    getGarbageMethod();
  }, [addItemModal, BounceLoading])

  return (
    <>
      { loadingClick ? <BounceLoading /> : null }
      {/* <BounceLoading /> */}
      <div id="dashboard-content" className="px-16 pt-10 pb-16 ml-20 h-full overflow-auto ">
        {loading ? <ClimbingBoxLoading height="full" width="full"/> : 
        <>
          <Header page='Garbages' />
          <div id="page-content" className="flex w-full h-auto justify-center flex-col">
            <div id="items-information-container" className="h-auto flex flex-row items-center justify-between mb-16">
              <div id="information-2" className=" w-3/4 flex flex-row py-4 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Garbages</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{garbages.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Items</span></span>
                </div>
              </div>
              <div id="add-items" className="h-10">
                <button 
                  id="add-button" 
                    className="w-30 h-full bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-lg"
                    onClick={() => setAddItemModal(true)}
                  >
                  <span id="add-item-text" className="text-gray-100" style={{fontFamily: ['Inter', 'sans-serif'], fontFamily: 400}}>Add Item</span>
                </button>
              </div>
            </div>
            <div id="items-list-container" className="flex flex-row justify-start h-auto space-x-4 w-full">
              <div id="items-list-wrapper" className="flex-grow h-auto w-full">
                <div id="items-list-table" className="w-full h-auto flex flex-col space-y-1.5">
                  <div id="table-header" className="w-full h-auto">
                    <div id="table-header-wrapper" className="w-full flex flex-row bg-white rounded shadow-md h-14">
                      <div id="table-header-non-action-wrapper" className="w-full flex flex-row h-auto">
                        <div id="table-header-title" className="text-gray-400 text-sm p-4 h-auto flex items-center justify-center" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600, width: 48+'px' }}>
                          <span>ID</span>
                        </div>
                        <div id="table-header-title" className="text-gray-400 w-1/2 text-sm p-4 h-auto flex items-center justify-start" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>
                          <span>Jenis Sampah</span>
                        </div>
                        <div id="table-header-title" className="text-gray-400 w-1/4 text-sm p-4 h-auto flex items-center justify-start" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>
                          <span>Harga Per Kilo</span>
                        </div>
                        <div id="table-header-title" className="text-gray-400 w-1/6 text-sm p-4 h-auto flex items-center justify-start" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 }}>
                          <span>Tanggal Dibuat</span>
                        </div>
                      </div>
                      <div id="empty-space" className="h-full flex-grow flex flex-row">
                          <div id="edit" className="flex-1 h-full flex items-center justify-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="text-white fill-current bi bi-pencil-fill" viewBox="0 0 16 16">
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                          </div>
                          <div id="delete" className="flex-1 h-full flex items-center justify-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="text-white fill-current bi bi-dash-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                            </svg>
                          </div>
                      </div>
                    </div>
                  </div>
                  {garbages.length === 0 ? 
                    <div id="empty-table" className="w-full min-h-125 bg-white shadow-md flex items-center justify-center">
                      <span id="empty-table-label" className="text-gray-400 text-5xl" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 }}>SAMPAH KOSONG</span>
                    </div> : 
                    <div id="table-body" className="w-full h-auto flex flex-col space-y-1.5">
                      {garbages.map((el, idx) => (
                        <div key={idx} id="table-body-wrapper" className="cursor-pointer w-full flex flex-row bg-white rounded shadow-md hover:bg-gray-100 transition-colors h-14">
                          <div onClick={() => setPreviewId(idx)} id="table-content-wrapper" className="flex-grow flex flex-row h-auto">
                            <div id="table-body-content" className="text-gray-400 text-sm p-4 h-auto flex items-center justify-center" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 , width: 48+'px' }}>
                              <span>{idx+1}</span>
                            </div>
                            <div id="table-body-content" className="text-gray-600 w-1/2 p-4 h-auto flex items-center justify-start" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 }}>
                              <span>{el.name}</span>
                            </div>
                            <div id="table-body-content" className="text-gray-600 w-1/4 p-4 h-auto flex items-center justify-start" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>
                              <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(el["@KG"])}</span>
                            </div>
                            <div id="table-body-content" className="text-gray-400 text-sm w-1/6 p-4 h-auto flex items-center justify-start" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>
                              <span>{el.created_at}</span>
                            </div>
                          </div>
                            <div id="table-body-action" className="h-full flex flex-row w-24">
                              <div id="edit" className="flex-1 h-full hover:bg-gray-200 h-14 w-12">
                                <button id="button" className="h-full w-full flex items-center justify-center" onClick={() => editCurrentGarbage(el.name, el["@KG"], el.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="text-green-400 fill-current bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                  </svg>
                                </button>
                              </div>
                              <div id="delete" className="flex-1 h-full hover:bg-gray-200 h-14 w-12">
                                <button id="button" className="h-full w-full flex items-center justify-center" onClick={() => deleteGarbageById(el.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="text-red-400 fill-current bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </div>
              <div id="item-previewer" className="w-1/4 h-140 flex items-center justify-center">
                <div id="item-wrapper" className="w-full h-full flex flex-col space-y-1.5">
                  <div id="item-preview-title" className="bg-white shadow-md h-14 flex items-center justify-center">
                    <span id="preview-title" className="text-gray-400 text-sm" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Details</span>
                  </div>
                  <div id="item-preview-content" className="bg-white shadow-md min-h-125 w-full flex-grow flex flex-col p-4">
                    <div id="item-picture-wrapper" className="w-full h-auto">
                      <picture id="picture-frame" className="w-full h-auto">
                        <img src="/3962578.jpg" />
                      </picture>
                    </div>
                    <div id="information-wrapper" className="w-full h-auto">
                      <div id="garbage-name-wrapper" className="w-full flex items-center flex-col text-gray-600 p-4" style={{fontFamily: ['Inter', 'sans-serif']}}>
                          <span id="name" className="text-lg my-4" style={{ fontWeight: 600 }}>{ previewId === null ? null : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(garbages[previewId]["@KG"])+'/Kg'}</span>
                        <span id="name-information" className="text-center" style={{fontWeight: 600}}>{previewId === null ? null : garbages[previewId].name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {addItemModal ? 
            <Suspense fallback={<BounceLoading />} >
              <GarbageItemModal close={setAddItemModal} ID={id} nameByID={'' || nameByID} priceByID={'' || priceByID} clearData={() => {
                setNameByID(''),
                setPriceByID(''),
                setID('');
                // console.log(val, '1');
                // console.log(val, '2')
              }}/> 
            </Suspense> :
            <span></span>}
        </>
        }
      </div>
    </>
  )
}

export default CreateGarbage;