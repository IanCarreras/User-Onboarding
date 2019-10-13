import React from 'react'

function User(props) {
    const {user, email} = props
    return (
        <div className='user'>
            <div>{user}</div>
            <div>{email}</div>
        </div>
    )
}

export default User