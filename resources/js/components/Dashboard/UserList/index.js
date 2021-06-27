import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserInformation from '../UserInformation';
import UserListMain from './UserListMain';


function UserList(props) {
  
  return (
    <Switch>
      <Route path='/dashboard/userlist' exact component={UserListMain} />
      <Route path='/dashboard/userlist/user/:id' component={UserInformation} />
    </Switch>
  )
}

export default UserList;