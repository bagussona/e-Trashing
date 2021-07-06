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

const weightParser = val => {
  var result = 0;

  for (let i in val) {
    if (val.indexOf(val[i]) === val.length-val.length) {
      // console.log(val.indexOf(val[i]) === val.length-val.length)
      result = val[i]
      // console.log(result)
    }
  }

  return result;
}

function UserListMain(props) {
  // const { user, loading } = props;

  // const [custAmount, setCustAmount] = useState(0);
  // const [staffAmount, setStaffAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [firstAttempt, setFirstAttempt] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});
  const [userList, setUserList] = useState([]);
  // const [staff, setStaff] = useState([])
  // const [customer, setCustomer] = useState([]);
  // const manipulate = useStore(state => state.setData)

  // const toTitleCase = (str) => {
  //   return str.replace(
  //     /\w\S*/g,
  //     function (txt) {
  //       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //     }
  //   );
  // }
  
  // const setUserList = (users) => {
  //   var currentStaff = null;
  //   var newStaff = [];
  //   var newCust = [];

  //   for (let i = 0; i < users.length; i++) {
  //     if (users[i].first_name !== 'customer') {
  //       if (users[i].first_name === localStorage.getItem(userRole)) {
  //         currentStaff = users[i];
  //       } else {
  //         newStaff.push(users[i])
  //       }
  //     } else {
  //       // console.log(users[i].role_names, 'a customer');
  //       newCust.push(users[i])
  //     }
  //   }

  //   setCustAmount(newCust.length);
  //   setStaffAmount(newStaff.length+1);
  //   setCustomer(newCust);
  //   setStaff(newStaff);
  //   setCurrentUser(currentStaff);
  // }

  var intervalId;

  const fetchIntervally = () => {
    intervalId = window.setInterval(() => {
      getUserList(getCookie('token'))
      .then(res => {
        if (res.status === 200) {
          const user = res.data.values
          if (res.data.status === 'Token is Expired') {
            return <Redirect to='/dashboard' />
          } else {
            setUserList(user)
          }
          console.log(res)
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
          const user = res.data.values
          if (res.data.status === 'Token is Expired') {
            return <Redirect to='/dashboard' />
          } else {
            setUserList(user)
          }
          // console.log(res)
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
          <div id="page-content" className="flex w-full h-full justify-center flex-col">
            <div id="users-information" className="h-auto w-full grid grid-cols-5 gap-8">
              <div id="information-2" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Lorem Ipsum</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Lorem Ipsum</span></span>
                </div>
              </div>
              <div id="information-1" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3+'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2+'px'}}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>All Users</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Users</span></span>
                </div>
              </div>
              <div id="information-4" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Lorem Ipsum</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Lorem Ipsum</span></span>
                </div>
              </div>
              <div id="information-3" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Lorem Ipsum</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Lorem Ipsum</span></span>
                </div>
              </div>
              <div id="information-5" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Lorem Ipsum</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Lorem Ipsum</span></span>
                </div>
              </div>
            </div>
            <div id="list-user-container" className="w-full flex-grow flex flex-col space-y-16">
              <div id="user-list-table" className="w-full h-auto flex flex-col space-y-1.5">
                <div id="table-header" className="w-full h-14 flex flex-row bg-white items-center text-gray-400 text-sm shadow-md rounded" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 600}}>
                  <div id="avatar-table-header" className="w-28 h-full text-center justify-center flex items-center p-4 box-border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="fill-current text-gray-600 bi bi-filter" viewBox="0 0 16 16">
                      <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </div>
                  <div id="name-table-header" className="h-full w-96 p-4 flex items-center">Name</div>
                  <div id="username-table-header" className="h-full w-56 p-4 flex items-center">Username</div>
                  <div id="phone-table-header" className="p-4 flex items-center h-full w-56">Phone Number</div>
                  <div id="email-table-header" className="p-4 flex items-center h-full w-80">Email</div>
                  <div id="total-table-header" className="p-4 flex items-center h-full w-48">Garbages Total in KG</div>
                  <div id="balance-table-header" className="p-4 flex items-center h-full flex-grow">Balance</div>
                </div>
                <div id="table-body" className="w-full h-auto flex flex-col space-y-1.5">
                  {userList.map((el, idx) => (
                    <Link to={`/dashboard/userlist/user/${el.uid}`} id="user" className="hover:bg-gray-100 cursor-pointer w-full h-16 flex flex-row items-center bg-white shadow-md rounded text-gray-600" style={{fontFamily: ['Inter', 'sans-serif']}}>
                      <div id="avatar-table-body" className="w-28 h-full flex items-center justify-center">
                        <picture id="image-wrapper" className="flex items-center justify-center">
                          <img src={el.avatar} alt="avatar" className="w-11 h-11 rounded-full object-cover" />
                        </picture>
                      </div>
                      <div id="name-table-body" className="w-96 p-4 flex items-center h-full">
                        <span id="name" style={{ fontWeight: 400 }}>{el.first_name} {el.last_name}</span>
                      </div>
                      <div id="username-table-body" className="w-56 p-4 flex items-center h-full">
                        <span id="username" className="text-sm" style={{ fontWeight: 400 }}>@{el.username}</span>
                      </div>
                      <div id="phone-table-body" className="h-full flex items-center w-56 p-4">
                        <span style={{ fontWeight: 400 }}>{el.nohape}</span>
                      </div>
                      <div id="email-table-body" className="h-full flex items-center w-80 p-4">
                        <span style={{ fontWeight: 400 }}>{el.email}</span>
                      </div>
                      <div id="weight-table-body" className="h-full flex items-center w-48 p-4">
                        <span id="weight-value" style={{fontWeight: 400}}>{weightParser(el.sampah_terkumpul)} <span id="weight_label" className="text-gray-600" style={{fontWeight: 600}}>KG</span></span>
                      </div>
                      <div id="user-balance-table-body" className="h-full flex items-center flex-grow p-4">
                        <span id="balance" style={{fontWeight: 400}}>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(el.saldo)}</span>
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