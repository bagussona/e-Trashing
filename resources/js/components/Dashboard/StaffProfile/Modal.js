import React, { useEffect } from 'react';


function Modal({ close }) {

  const umountModal = () => {
    close(false);
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Escape') {
        event.preventDefault();
        umountModal()
      }
    }

    window.addEventListener('keydown', listener);

    return () => window.removeEventListener('keydown', listener);
  })

  return (
    <div id="edit-user-modals-container" className="z-99 h-screen w-screen absolute top-0 right-0">
      <div id="content-wrapper" className="h-full w-full relative">
        <div onClick={() => umountModal()} id="modal-background" className="h-full w-full bg-gray-400 top-0 right-0 absolute bg-opacity-50"></div>
        <div id="edit-user-form" className="h-auto p-10 bg-white rounded box-border flex flex-col items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div id="form" className="flex flex-row">
            <div id="picture-wrapper" className="mr-10 w-80 h-auto">
              <picture>
                {/* <img src={userData.imgURL} className="h-full" /> */}
              </picture>
            </div>
            <div id="form-wrapper" className="ml-10 ">
              <div id="form-title">

              </div>
              <div id="form-body">
                <div id="input-wrapper"></div>
                <div id="form-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;