import { React } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { getCookie } from '../../utilities/obtain_cookie';
import { isLogin } from '../../cookie_const';


function Home() {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          {getCookie(isLogin) === 'true' ? 
            <div className="flex space-x-2 mb-4">
              <Link to='/dashboard'>Dashboard</Link>
              <button onClick={() => userLogout()}>Logout</button>
            </div> : 
            <div className="flex space-x-2 mb-4">
              <Link to='/login'>Masuk</Link>
              <Link to='/register'>Register</Link>
            </div>
          }
        </div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen flex flex-col">
          <div className="flex-grow"></div>
          <Footer height="33%"/>
        </div>
      </>
    )
}

export default Home;