import React, { useEffect, useState } from 'react';
import { createStaff } from '../../apis/api';
// import { useStore } from '../../utilities/store';
import Header from '../Header';
import { getCookie } from '../../utilities/obtain_cookie';
import { BounceLoading } from '../Assets/LoadingPage';


const roleParser = (role) => {
  switch (role) {
    case 'bendahara':
      return 'Bendahara';
    case 'pengepul':
      return 'Staff 1 - Pengepul';
    case 'staff':
      return 'Staff 2 - Penjemput';
  }
}


function CreateAccount() {
  const [value, setValue] = useState({
    firstname: '', 
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const roleList = ['bendahara', 'pengepul', 'staff'];

  const sendAccount = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('first_name', value.firstname);
    formData.append('last_name', value.lastname);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('password_confirmation', value.password_confirmation);
    formData.append('role', value.role)

    // for (let pair of formData.entries()) {
    //   console.log(pair[0]+ ' ' + pair[1])
    // }

    createStaff(getCookie('token'), formData)
    .then(res => {
      console.log(res)
      setLoading(false);
    })
    .catch(err => console.log(res))
  }

  return (
    <>
      {loading ? <BounceLoading /> : null}
      <div id="dashboard-content" className="flex flex-col px-16 py-10 ml-20 h-full">
        <Header page="Add Staff" />
        <div id="page-content-container" className="w-full h-full flex items-center justify-center">
          <div id="page-content-wrapper" className="w-2/5 h-auto pb-10 bg-white shadow-md rounded px-16 flex flex-col">
            <div id="create-account-title" className="w-full py-10 text-center">
              <h1 className="text-gray-600 text-xl subpixel-antialiased tracking-wider" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 }}>Buat Akun Pengurus</h1>
            </div>
            <div id="create-account-content-container" className="w-full flex-grow flex flex-col h-full space-y-8">
              <div id="name-input-wrapper" className="w-full flex flex-row h-auto pb-8">
                <div id="name-input-title" className="w-1/3 h-auto">
                  <span id="label" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Name</span>
                </div>
                <div id="name-input" className="flex-grow h-auto flex flex-col space-y-8">
                  <input type="text" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}} placeholder="First Name" value={value.firstname} onChange={ev => setValue({...value, firstname: ev.target.value})}/>
                  <input type="text" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }} placeholder="Last Name" value={value.lastname} onChange={ev => setValue({...value, lastname: ev.target.value})}/>
                </div>
              </div>
              <div id="email-input-wrapper" className="w-full flex flex-row h-auto pb-8">
                <div id="email-input-title" className="w-1/3 h-auto">
                  <span id="label" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Email</span>
                </div>
                <div id="email-input" className="flex-grow h-auto">
                  <input type="email" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2 w-full" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }} placeholder="your@email.com" value={value.email} onChange={ev => setValue({...value, email: ev.target.value})}/>
                </div>
              </div>
              <div id="password-input-wrapper" className="w-full flex flex-row h-auto pb-8">
                <div id="password-input-title" className="w-1/3 h-auto">
                  <span id="label" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Password</span>
                </div>
                <div id="password-input" className="flex-grow h-auto flex flex-col space-y-8">
                  <input type="password" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}} placeholder="Enter Password" value={value.password} onChange={ev => setValue({...value, password: ev.target.value})}/>
                  <input type="password" className="h-10 bg-gray-100 border-2 border-gray-100 rounded focus:outline-none focus:border-blue-400 p-2" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}} placeholder="Re-Enter Password" value={value.password_confirmation} onChange={ev => setValue({...value, password_confirmation: ev.target.value})}/>
                </div>
              </div>
              <div id="role-input-wrapper" className="w-full flex flex-row h-auto pb-8">
                <div id="role-input-title" className="w-1/3 h-auto">
                  <span id="label" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Role</span>
                </div>
                <div id="role-input" className="w-1/3 h-auto relative">
                  {/* <select value={value} onChange={ev => console.log(ev.target.value)} style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}} className="p-2 text-gray-600 bg-gray-100 h-10 rounded focus:outline-none text-center">
                    <option id="option" className="text-gray-600 bg-gray-100 p-2 h-10" value="bendahara">Bendahara</option>
                    <option id="option" className="text-gray-600 bg-gray-100 p-2 h-10" value="pengepul">Staff 1 - Pengepul</option>
                    <option id="option" className="text-gray-600 bg-gray-100 p-2 h-10" value="staff">Staff 2 - Penjemput</option>
                  </select> */}
                  <div id="dropdown" className="cursor-pointer transition-colors h-10 p-2 bg-gray-100 shadow rounded w-full hover:bg-gray-200 active:bg-gray-100 flex flex-row items-center justify-between z-10" onClick={() => {setIsDropdown(!isDropdown)}}>
                    <span id="dropdown-preview" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>{roleParser(value.role)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="fill-current text-gray-600 bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </div>
                  <div id="dropdown-items" {...isDropdown ? { className: "h-auto w-full absolute bg-white shadow visible transform transition-transform duration-300 ease-out z-0" } : { className: "z-0 h-auto w-full absolute bg-white shadow invisible -translate-y-10 transform transition-transform duration-300 ease-out"}}>
                    <ul id="items-list" role="listbox" className="w-full h-auto">
                      {roleList.map((el, idx) => (
                        <li key={idx} role="listitems" className="h-10 p-2 text-gray-600 hover:bg-gray-100 active:bg-white" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>
                          <button id="button" className="w-full text-left" onClick={() => {
                            setValue({
                              ...value,
                              role: el
                            });
                            setIsDropdown(false);
                          }}>
                            <span>{roleParser(el)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div id="submit-button-wrapper" className="w-full flex flex-row h-auto">
                <div id="empty-space" className="w-1/3 h-auto"></div>
                <div id="submit-button" className="flex-grow h-auto">
                  <button id="button" className="w-full h-10 bg-blue-400 px-6 rounded focus:outline-none hover:bg-blue-500 active:bg-blue-400 transition-colors duration-300 shadow-lg" onClick={() => sendAccount()}>
                    <span className="text-white" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Create Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateAccount;