import React from 'react'
import { Link } from 'react-router-dom'

import Logout from './Logout'

const Nav = ({ store }) => {

    return (
        <div style={{background: 'silver'}}>
            <Link to='/'>
                blogit
            </Link>
            <span> </span>
            <Link to='/users'>
                käyttäjät
            </Link>
            {store.getState().user ? 
                <>
                    <span> {store.getState().user.name} kirjautuneena </span>
                    <Logout store={store} />
                </> :
                <>
                    <span> </span>
                    <Link to='/login'><button>kirjaudu</button></Link>
                </>
            }
        </div>
    )

}

export default Nav