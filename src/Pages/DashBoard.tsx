import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { common } from '../Redux/constants';
import store from '../Redux/store';
import Table from '../Table/Table';
import './DashBoard.scss';
import { v4 as uuidv4 } from 'uuid';
import { input_fields } from './Login';
import AppBar from '../AppBar/AppBar';


const DashBoard = () => {
    const userdata = useSelector((state: any) => state.commonReducer.userdata);
    const [details, setDetails] = useState({ name: "", email: "", password: "", phone_number: "" });
    const [error, seterror] = useState({ name: "", email: "", password: "", phone_number: "" })
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        navigate('/dashboard');
        store.dispatch({
            type: common.userdata,
            payload: ({ ...details, ...({ id: uuidv4() }) })
        })
        setDetails({ name: "", email: "", password: "", phone_number: "" })
        event.preventDefault();
    }

    const validate = (key: any, value: any, regex: any) => {
        if (!(regex.test(value))) {
            seterror((prev: any) => ({ ...prev, ...({ [key]: 'invalid' }) }))
        } else {
            seterror((prev: any) => ({ ...prev, ...({ [key]: '' }) }))
        }
    }

    const handledetails = (key: any, value: any) => {
        setDetails((prev: any) => ({ ...prev, ...({ [key]: value }) }))
        validate(key, value, input_fields[key])
    }

    return (
        <AppBar>
            <div className='dashboard_container'>
                <form onSubmit={handleSubmit} className='dashboard_form'>
                    <label>Enter your Name:
                        <input
                            placeholder='Name'
                            type="text"
                            value={details.name}
                            onChange={(e) => handledetails('name', e.target.value)}
                            required
                        />
                        {
                            error.name !== '' && <label className='form_label'>{error.name}</label>
                        }
                    </label>
                    <label>Enter your Email:
                        <input
                            type="email"
                            placeholder='Email'
                            value={details.email}
                            onChange={(e) => handledetails('email', e.target.value)}
                            required
                        />
                        {
                            error.email !== '' && <label className='form_label'>{error.email}</label>
                        }
                    </label>
                    <label>Enter your Password:
                        <input
                            type="password"
                            placeholder='Password'
                            value={details.password}
                            onChange={(e) => handledetails('password', e.target.value)}
                            required
                        />
                        {
                            error.password !== '' && <label className='form_label'>{error.password}</label>
                        }
                    </label>
                    <label>Enter your Phone Number:
                        <input
                            type="number"
                            placeholder='Phone Number'
                            value={details.phone_number}
                            maxLength={10}
                            onChange={(e) => handledetails('phone_number', e.target.value)}
                            required
                        />
                        {
                            error.phone_number !== '' && <label className='form_label'>{error.phone_number}</label>
                        }
                    </label>
                    <input type="submit" />
                </form>
                <div>
                    {
                        userdata.length > 0 && <Table column={Object.keys(userdata[0])} rows={userdata} editable={true} />
                    }
                </div>
            </div>
        </AppBar>
    )
}

export default DashBoard