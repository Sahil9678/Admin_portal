import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from '@mui/material';
import { IconButton } from '@mui/material';
import adminlogo1 from '../Images/adminlogo1.svg';
import './AppBar.scss';
import store from '../Redux/store';
import { common } from '../Redux/constants';

const AppBar = ({ children }: any) => {
    const handlelogout = () => {
        store.dispatch({
            type: common.toggleLoginStatus,
            payload: false
        })
    }
    return (
        <>
            <div className='AppBar_container'>
                <img src={adminlogo1} className="adminlogoIcon" alt="Adminlogo" />
                <div className='AppBar_social_container'>
                    <Badge color="secondary">
                        <IconButton onClick={() => handlelogout()}>
                            <LogoutIcon />
                        </IconButton>
                    </Badge>
                </div>
            </div>
            {
                children
            }
        </>
    )
}

export default AppBar