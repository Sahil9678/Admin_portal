import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { common } from '../Redux/constants';
import store from '../Redux/store';
import DashBoard from './DashBoard';
import { v4 as uuidv4 } from 'uuid';
import './Login.scss';

export const input_fields: any = {
    name: /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^[#\w@_-]{8,20}$/,
    phone_number: /^[6-9]{1}[0-9]{9}$/,
}

const Login = () => {

    const [details, setDetails] = useState({ id: "", name: "", email: "", password: "", phone_number: "" });
    const navigate = useNavigate();
    const [error, seterror] = useState({ name: "", email: "", password: "", phone_number: "" })
    const isloggedIn = useSelector((state: any) => state.commonReducer.isloggedIn);


    const handleSubmit = (event: any) => {
        if (error.name || error.email || error.password || error.phone_number) {
            navigate('/');
        } else {
            navigate('/dashboard');

            store.dispatch({
                type: common.userdata,
                payload: ({ ...details, ...({ id: uuidv4() }) })
            })
            store.dispatch({
                type: common.toggleLoginStatus,
                payload: true
            })
        }
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
        <div>
            {
                isloggedIn ? <DashBoard /> :
                    <>
                        <h1>Admin DashBoard Login</h1>
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
                    </>
            }
        </div>
    )
}

export default Login