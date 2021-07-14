import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import DashboardMain from './DashboardMain';
// import Footer from '../Footer';
import UserList from './UserList';
import CreateAccount from './CreateAccount';
import CreateGarbage from './CreateGarbage';
import StaffProfile from './StaffProfile';
import { getNotification, getUser } from '../../apis/api';
// import UserInformation from './UserInformation';
import { getCookie } from '../../utilities/obtain_cookie';
import { isLogin, userRole } from '../../cookie_const';
import { ClimbingBoxLoading } from '../Assets/LoadingPage';
import Settings from './Settings';
import Chat from './Chat';
import { useStore } from '../../utilities/store';


function Dashboard(props) {

  const { history } = props;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const setNotification = useStore(state => state.setNotification);
  const [testNotif, setTesNotif] = useState({})

  const logoutMethod = () => {
    const userLogoutVar = [isLogin, userRole];
    for (let i in userLogoutVar) {
      localStorage.removeItem(userLogoutVar[i]);
    }

  
    history.push('/login')
  }

  const userLogout = () => {
    document.cookie = `token = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `logged_in = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `role = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `username = ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    
    logoutMethod();
  }


  useEffect(() => {
    if (localStorage.getItem(isLogin) === 'true') {
      getUser(getCookie('token'))
      .then(res => {
        if (res.status === 200) {
          if (res.data.status === 'Token is Expired') {
            userLogout();
          } else {
            if (localStorage.getItem('role') === 'bendahara') {
              getNotification(getCookie('token'))
              .then(resp => {
                setNotification(resp.data)
                // console.log(resp.data)
                setUserData(res.data.user);
                setLoading(false)
              })
            }
            setUserData(res.data.user);
            setLoading(false)
          }
        } else {
          console.log(res)
          setLoading(false)
        }
      });
    } else {  
      userLogout();
    }

    // if (localStorage.getItem('role') === 'bendahara' ?)

  }, [])

  if (getCookie('logged_in') === 'true') {
    if (loading) {
      return <ClimbingBoxLoading />
    } else {
      return (
        <div id="dashboard-container" className="h-screen relative">
          <div id="dashboard-sidebar" className="h-screen bg-white flex flex-col items-center w-20 absolute left-0 z-30" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 8px'}}>
            <div id="sidebar-content-container" className="w-full h-full bg-transparent my-10 relative flex flex-col items-center">
              <div id="sidebar-top-content" className="w-full flex items-center flex-col">
                <Link to={`/dashboard/${localStorage.getItem(userRole)}profile`} id="avatar-wrapper" className="inline-block rounded-full h-14 w-14 relative mb-20">
                  <div id="online-alert" className="h-4 w-4 bottom-0 right-0 rounded-full bg-green-300 absolute" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}></div>
                  <img src={userData.avatar} className="object-cover rounded-full h-full w-full" alt="user-photo-profile" />
                </Link>
                <div id="menus" className="flex flex-col items-center w-full">
                  <button onClick={() => history.push('/dashboard')} className={`py-5 w-full h-full flex items-center justify-center border-r-3 ${(props.location.pathname) === '/dashboard' ? 'border-blue-400 bg-blue-100' : 'border-white bg-transparent'} transition-colors duration-200`}>
                    <img src={(props.location.pathname) === '/dashboard' ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668205/BTS-ID/active/house-fill-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/house.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="home" />
                  </button>
                  {
                    localStorage.getItem(userRole) === 'bendahara' ? null : 
                    <>
                      <button onClick={() => history.push('/dashboard/userlist')} className={`py-5 w-full h-full flex items-center justify-center border-r-3 ${(props.location.pathname).includes('/dashboard/userlist') ? 'border-blue-400 bg-blue-100' : 'border-white bg-transparent'} transition-colors duration-200`}>
                        <img src={(props.location.pathname).includes('/dashboard/userlist') ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624669474/BTS-ID/active/people-fill-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624669408/BTS-ID/inactive/people.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="userlist" />
                      </button>
                      <button onClick={() => history.push('/dashboard/createaccount')} className={`py-5 w-full h-full flex items-center justify-center border-r-3 ${(props.location.pathname).includes('/dashboard/createaccount') ? 'border-blue-400 bg-blue-100' : 'border-white bg-transparent'} transition-colors duration-200`}>
                        <img src={(props.location.pathname).includes('/dashboard/createaccount') ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668235/BTS-ID/active/person-plus-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/person-plus.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="create user" />
                      </button>
                      <button onClick={() => history.push('/dashboard/creategarbage')} className={`py-5 w-full h-full flex items-center justify-center border-r-3 ${(props.location.pathname).includes('/dashboard/creategarbage') ? 'border-blue-400 bg-blue-100' : 'border-white bg-transparent'} transition-colors duration-200`}>
                        <img src={(props.location.pathname).includes('/dashboard/creategarbage') ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668398/BTS-ID/active/trash-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/trash.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="create trash" />
                      </button>
                    </>
                  }
                  <button onClick={() => history.push('/dashboard/chat')} className={`py-5 w-full h-full flex items-center justify-center border-r-3 ${(props.location.pathname).includes('/dashboard/chat') ? 'border-blue-400 bg-blue-100' : 'border-white bg-transparent'} transition-colors duration-200`}>
                    {(props.location.pathname).includes('/dashboard/chat') ? 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-blue-400 fill-current bi bi-chat-right-dots-fill" viewBox="0 0 16 16">
                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg> : 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-gray-400 fill-current bi bi-chat-right-dots" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    }
                  </button>
                  <button onClick={() => history.push('/dashboard/settings')} className={`py-5 w-full h-full flex items-center justify-center border-r-3 ${(props.location.pathname).includes('/dashboard/settings') ? 'border-blue-400 bg-blue-100' : 'border-white bg-transparent'} transition-colors duration-200`}>
                    <img src={(props.location.pathname).includes('/dashboard/settings') ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1625236852/BTS-ID/sliders-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/sliders.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="settings" />
                  </button>
                </div>
              </div>
              <div id="sidebar-bottom-content" className="bottom-0 absolute h-6">
                <button onClick={() => userLogout()}>
                  <img src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624669105/BTS-ID/random/box-arrow-right.svg  " style={{height: 24+'px', width: 24+'px'}} alt="logout" />
                </button>
              </div>
            </div>
          </div>
          <Switch>
            <Route path='/dashboard' exact component={DashboardMain} />
            <Route path='/dashboard/userlist' component={UserList} />
            <Route path='/dashboard/createaccount' component={CreateAccount} />
            <Route path={`/dashboard/${localStorage.getItem(userRole)}profile`} component={StaffProfile} />
            <Route path='/dashboard/creategarbage' component={CreateGarbage} />
            <Route path='/dashboard/settings' component={Settings} />
            <Route path='/dashboard/chat' component={Chat}/>
          </Switch>
        </div>
      )
    }
  } else {
    return <Redirect to='/login' />
  }
}

export default Dashboard;