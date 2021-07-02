import React, { 
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ClimbingBoxLoading } from '../../Assets/LoadingPage';
import Header from '../../Header';
import { getUserList } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
import { userRole } from '../../../cookie_const';
// import { useStore } from '../../../utilities/store';


function UserListMain(props) {
  // const { user, loading } = props;

  const [custAmount, setCustAmount] = useState(0);
  const [staffAmount, setStaffAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [firstAttempt, setFirstAttempt] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [staff, setStaff] = useState([])
  const [customer, setCustomer] = useState([]);
  // const manipulate = useStore(state => state.setData)

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  
  const setUserList = (users) => {
    var currentStaff = null;
    var newStaff = [];
    var newCust = [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].role_names !== 'customer') {
        // console.log(users[i].role_names, 'not a customer');
        if (users[i].role_names === localStorage.getItem(userRole)) {
          // newStaff.unshift(users[i]);
          currentStaff = users[i];
        } else {
          newStaff.push(users[i])
        }
      } else {
        // console.log(users[i].role_names, 'a customer');
        newCust.push(users[i])
      }
    }

    setCustAmount(newCust.length);
    setStaffAmount(newStaff.length+1);
    setCustomer(newCust);
    setStaff(newStaff);
    setCurrentUser(currentStaff);
  }

  var intervalId;

  const fetchIntervally = () => {
    intervalId = window.setInterval(() => {
      getUserList(getCookie('token'))
      .then(res => {
        if (res.status === 200) {
          const user = res.data.user
          if (res.data.status === 'Token is Expired') {
            return <Redirect to='/dashboard' />
          } else {
            setUserList(user)
          }
        } else {
          console.log('error getting user list')
        }
      })
      console.log('time elapsed 1800000 milisecond')
    }, 900000)
  }

  useEffect(() => {
    if (firstAttempt === false) {
      getUserList(getCookie('token'))
      .then(res => {
        if (res.status === 200) {
          const user = res.data.value
          if (res.data.status === 'Token is Expired') {
            return <Redirect to='/dashboard' />
          } else {
            setUserList(user)
          }
        } else {
          console.log('error getting user list')
        }

        if (firstAttempt === false) {
          setFirstAttempt(true)
        }

        setLoading(false)
      })
    } else {
      fetchIntervally();
    }

    return () => {
      setFirstAttempt(false)
      clearInterval(intervalId);
    }
  }, [])


  return (
    <div id="dashboard-content" className="px-16 pt-10 pb-16 ml-20 h-full overflow-auto">
      {loading ? 
        <ClimbingBoxLoading height="full" width="full"/> : 
        <>
          <Header page='User List'/>
          {/* <button onClick={() => toTitleCase('customer')}>See the Result</button> */}
          <div id="page-content" className="flex w-full h-auto justify-center flex-col">
            <div id="users-information" className="h-auto w-full grid grid-cols-5 gap-8">
              <div id="information-2" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Staff</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{staffAmount}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Staff</span></span>
                </div>
              </div>
              <div id="information-1" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3+'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2+'px'}}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>All Users</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{custAmount}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Users</span></span>
                </div>
              </div>
              <div id="information-4" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Active Staff</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{staffAmount}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Active Staff</span></span>
                </div>
              </div>
              <div id="information-3" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Active User</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{custAmount}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Active Users</span></span>
                </div>
              </div>
              <div id="information-5" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Awkowkowkowko</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{custAmount}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Awkowkowokwokwok</span></span>
                </div>
              </div>
            </div>
            <div id="list-user-container" className="w-full h-auto flex flex-col space-y-16">
              <div id="current-user-container" className="flex flex-col items-start space-y-4">
                <span id="current-user-title" className="text-lg text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>Current User</span>
                <div id="list-user-wrapper" className="h-auto" style={{width: '313.39px'}}>
                  <div
                    id="user-card-wrapper"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      fontFamily: ['Inter', 'sans-serif'],
                      height: 110 + 'px'
                    }}
                    className="rounded w-full border-r-6 box-border border-green-400"
                  >
                    <div id="user-card-content-wrapper" className="w-full h-full flex flex-row p-4">
                      <div id="left-content" className="h-full w-20 flex items-center justify-center flex-col">
                        <img src={currentUser.avatar} alt="user" className="h-20 w-20 rounded object-cover" />
                        {/* <div id="role-wrapper" className="flex flex-row items-center justify-center h-auto"> */}
                        {/* <span id="role-sign" className="inline-block rounded-full bg-red-400 mr-1" style={{height: 13+'px', width: 13+'px', marginTop: -0.375+'px'}}></span> */}
                        <span id="user-role" className="text-sm text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>{toTitleCase(currentUser.role_names)}</span>
                        {/* </div> */}
                      </div>
                      <div id="right-content" className="h-full flex-grow flex flex-col justify-center ml-4">
                        <span id="user-name" className="text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>{currentUser.first_name} {currentUser.last_name}</span>
                        <span id="username" className="text-gray-400 text-sm" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>@{currentUser.username}</span>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
              <div id="staff-list-container" className="flex flex-col space-y-5">
                <span id="current-user-title" className="text-lg text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 }}>Staff</span>
                <div id="list-user-wrapper" className="w-full grid grid-cols-5 h-auto gap-8">
                  {staff.map((el, idx) => (
                    el.role_names === 'admin' ? 
                    <div
                        id="user-card-wrapper"
                        style={{
                          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                          fontFamily: ['Inter', 'sans-serif'],
                          height: 110 + 'px'
                        }}
                        className="rounded w-full border-r-6 box-border border-red-400 hover:border-green-400 transition-colors duration-200"
                      >
                        <div id="user-card-content-wrapper" className="w-full h-full flex flex-row p-4">
                          <div id="left-content" className="h-full w-20 flex items-center justify-center flex-col">
                            <img src={el.avatar} alt="user" className="h-20 w-20 rounded object-cover" />
                            {/* <div id="role-wrapper" className="flex flex-row items-center justify-center h-auto"> */}
                            {/* <span id="role-sign" className="inline-block rounded-full bg-red-400 mr-1" style={{height: 13+'px', width: 13+'px', marginTop: -0.375+'px'}}></span> */}
                            <span id="user-role" className="text-sm text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>{toTitleCase(el.role_names)}</span>
                            {/* </div> */}
                          </div>
                          <div id="right-content" className="h-full flex-grow flex flex-col justify-center ml-4">
                            <span id="user-name" className="text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>{el.first_name} {el.last_name}</span>
                            <span id="username" className="text-gray-400 text-sm" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>@{el.username}</span>
                          </div>
                        </div>
                      </div> : 
                      <Link to={`userlist/user/${el.uid}`} key={idx} className="w-full h-auto hover:-ml-1 hover:-mt-1 transtion-all duration-200 active:ml-0 active:mt-0">
                        <div
                          id="user-card-wrapper"
                          style={{
                            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                            fontFamily: ['Inter', 'sans-serif'],
                            height: 110 + 'px'
                          }}
                          className="rounded w-full border-r-6 box-border border-red-400 hover:border-green-400 transition-colors duration-200"
                        >
                          <div id="user-card-content-wrapper" className="w-full h-full flex flex-row p-4">
                            <div id="left-content" className="h-full w-20 flex items-center justify-center flex-col">
                              <img src={el.avatar} alt="user" className="h-20 w-20 rounded object-cover" />
                              {/* <div id="role-wrapper" className="flex flex-row items-center justify-center h-auto"> */}
                              {/* <span id="role-sign" className="inline-block rounded-full bg-red-400 mr-1" style={{height: 13+'px', width: 13+'px', marginTop: -0.375+'px'}}></span> */}
                              <span id="user-role" className="text-sm text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>{toTitleCase(el.role_names)}</span>
                              {/* </div> */}
                            </div>
                            <div id="right-content" className="h-full flex-grow flex flex-col justify-center ml-4">
                              <span id="user-name" className="text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>{el.first_name} {el.last_name}</span>
                              <span id="username" className="text-gray-400 text-sm" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>@{el.username}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                  ))}
                </div>
              </div>
              <div id="customer-list-container" className="flex flex-col space-y-4">
                <span id="current-user-title" className="text-lg text-gray-600" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 600 }}>Customers</span>
                <div id="list-user-wrapper" className="w-full grid grid-cols-5 h-auto gap-8">
                  {customer.map((el, idx) => (
                    <Link to={`userlist/user/${el.uid}`} key={idx} className="w-full h-auto hover:-ml-1 hover:-mt-1 transtion-all duration-200 active:ml-0 active:mt-0">
                      <div 
                        id="user-card-wrapper" 
                        style={{
                          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                          fontFamily: ['Inter', 'sans-serif'],
                          height: 110 + 'px'
                        }}
                        className="rounded w-full border-r-6 box-border border-blue-400 hover:border-green-400 transition-colors duration-200"
                      >
                        <div id="user-card-content-wrapper" className="w-full h-full flex flex-row p-4">
                          <div id="left-content" className="h-full w-20 flex items-center justify-center flex-col">
                            <img src={el.avatar} alt="user" className="h-20 w-20 rounded object-cover"/>
                            {/* <div id="role-wrapper" className="flex flex-row items-center justify-center h-auto"> */}
                              {/* <span id="role-sign" className="inline-block rounded-full bg-red-400 mr-1" style={{height: 13+'px', width: 13+'px', marginTop: -0.375+'px'}}></span> */}
                            <span id="user-role" className="text-sm text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>{toTitleCase(el.role_names)}</span>
                            {/* </div> */}
                          </div>
                          <div id="right-content" className="h-full flex-grow flex flex-col justify-center ml-4">
                            <span id="user-name" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>{el.first_name} {el.last_name}</span>
                            <span id="username" className="text-gray-400 text-sm" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>@{el.username}</span>
                            <span id="user-email" className="text-gray-700 text-sm" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>Saldo: <span id="user-bill" style={{fontWeight: 300}}>IDR 400.000</span></span>
                          </div>
                        </div>
                      </div>
                    </Link> 
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default UserListMain;