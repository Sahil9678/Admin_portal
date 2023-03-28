import React from 'react';
import './Popupcomponent.scss';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface Popuprops {
    children: any;
    className: string;
    showstate: any;
    handlepoupup: any;
}

const Popupcomponent = ({ children, className = '', showstate, handlepoupup }: any) => {

    return (
        <div
            style={{
                visibility: showstate ? "visible" : "hidden",
                opacity: showstate ? "1" : "0"
            }}
            className={`popupdialog_container ${className}`}
        >
            <div className='popupdialog'>
                <div className='popupdialog_heading'>
                    <h5>
                        Edit
                    </h5>
                    <IconButton onClick={handlepoupup}>
                        <CloseIcon />
                    </IconButton>
                </div>
                {
                    children
                }
            </div>
        </div>
    )
}

export default Popupcomponent