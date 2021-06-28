import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import DashboardMain from './DashboardMain';
// import Footer from '../Footer';
import UserList from './UserList';
import CreateAccount from './CreateAccount';
import CreateGarbage from './CreateGarbage';
import StaffProfile from './StaffProfile';
import { getUser } from '../../apis/api';
// import UserInformation from './UserInformation';
import { getCookie } from '../../utilities/obtain_cookie';
import { isLogin, userRole } from '../../cookie_const';
import LoadingPage from '../Assets/LoadingPage';


function Dashboard(props) {

  const { history } = props;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const logoutMethod = () => {
    const userLogoutVar = [isLogin, userRole];
    for (let i in userLogoutVar) {
      localStorage.removeItem(userLogoutVar[i]);
    }

    location.reload();
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
  }, [])

  if (localStorage.getItem(isLogin) === 'true') {
    if (loading) {
      return <LoadingPage />
    } else {
      return (
        <div id="dashboard-container" className="h-screen relative">
          <div id="dashboard-sidebar" className="h-screen bg-white flex flex-col items-center w-20 absolute left-0 z-30" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 8px'}}>
            <div id="sidebar-content-container" className="w-full h-full bg-transparent my-10 relative flex flex-col items-center">
              <div id="sidebar-top-content" className="w-full flex items-center flex-col">
                <Link to={`/dashboard/${getCookie('role')}profile`} id="avatar-wrapper" className="inline-block rounded-full h-14 w-14 relative mb-20">
                  <div id="online-alert" className="h-4 w-4 bottom-0 right-0 rounded-full bg-green-300 absolute" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}></div>
                  <img src={userData.avatar} className="object-cover rounded-full h-full w-full" alt="user-photo-profile" />
                </Link>
                <div id="menus" className="flex flex-col items-center space-y-10 w-full">
                  <button onClick={() => history.push('/dashboard')}>
                    <img src={(props.location.pathname) === '/dashboard' ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668205/BTS-ID/active/house-fill-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/house.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="home" />
                  </button>
                  <button onClick={() => history.push('/dashboard/userlist')}>
                    <img src={(props.location.pathname).includes('/dashboard/userlist') ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624669474/BTS-ID/active/people-fill-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624669408/BTS-ID/inactive/people.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="userlist" />
                  </button>
                  <button onClick={() => history.push('/dashboard/createaccount')}>
                    <img src={(props.location.pathname).includes('/dashboard/createaccount') ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668235/BTS-ID/active/person-plus-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/person-plus.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="create user" />
                  </button>
                  <button onClick={() => history.push('/dashboard/creategarbage')}>
                    <img src={(props.location.pathname).includes('/dashboard/creategarbage') ? "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668398/BTS-ID/active/trash-active.svg" : "https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/trash.svg"} style={{ height: 24 + 'px', width: 24 + 'px' }} alt="create trash" />
                  </button>
                  <button onClick={() => history.push('/dashboard')}>
                    <img src="https://res.cloudinary.com/tookoo-dil/image/upload/v1624668717/BTS-ID/inactive/sliders.svg" style={{ height: 24 + 'px', width: 24 + 'px' }} alt="settings" />
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
            <Route path={`/dashboard/${getCookie('role')}profile`} component={StaffProfile} />
            <Route path='/dashboard/creategarbage' component={CreateGarbage} />
          </Switch>
        </div>
      )
    }
  } else {
    return <Redirect to='/login' />
  }
}

export default Dashboard;