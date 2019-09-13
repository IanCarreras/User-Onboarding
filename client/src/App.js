import React, { useState } from 'react';

import UserForm from './components/Form'
import User from './components/User'

import './App.css';

function App() {
  const [users, setUsers] = useState([])


  return (
    <div className="App">
      <UserForm users={users} setUsers={setUsers}/>
      <div className='userWrapper'>
        {
          users.map((user, index) => {
            return <User 
                    key={index}
                    user={user.user} 
                    email={user.email} />
          })
        }
      </div>  
    </div>
  );
}

export default App;