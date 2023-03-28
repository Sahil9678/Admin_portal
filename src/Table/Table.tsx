import React, { MouseEventHandler, useCallback, useState } from 'react'
import './Table.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Popupcomponent from '../PopupComponent/Popupcomponent';
import { useSelector } from 'react-redux';
import store from '../Redux/store';
import { common } from '../Redux/constants';
import { input_fields } from '../Pages/Login';

interface tableprops {
    column: Record<any, any>;
    rows: Record<any, any>;
    editable?: boolean;
}

const CellProperty = (key: any, value: any) => {
    if (key === 'homeworld') {
        return <a href={value}>hello</a>
    }

    if (value.includes('https:')) {
        return <a href={value}>{value}</a>
    } else {
        return value
    }
}


const Table = ({ column, rows, editable }: tableprops) => {

    const [showpopup, setshowpopup] = useState(false);
    const [showrowdetail, setshowdrowetails] = useState<any>({});
    const [error, seterror] = useState({ name: "", email: "", password: "", phone_number: "" })
    const userdata = useSelector((state: any) => state.commonReducer.userdata);


    const validate = (key: any, value: any, regex: any) => {
        if (!(regex.test(value))) {
            seterror((prev: any) => ({ ...prev, ...({ [key]: 'invalid' }) }))
        } else {
            seterror((prev: any) => ({ ...prev, ...({ [key]: '' }) }))
        }
    }


    const Edithandle = (rowval: any) => {
        setshowpopup(!showpopup);
        setshowdrowetails(rowval);
    }
    const Deletehandle = (rowval: any) => {
        const updateuserdata = userdata.filter((elem: any) => elem.id !== rowval.id);
        store.dispatch({
            type: common.updateuserdata,
            payload: updateuserdata
        })

    }

    const handleSubmit = (event: any) => {
        if (!(error.name || error.email || error.password || error.phone_number)) {
            const findex = userdata.findIndex((elem: any) => elem.id === showrowdetail.id);
            userdata[findex] = showrowdetail;
            store.dispatch({
                type: common.updateuserdata,
                payload: userdata
            })
            setshowpopup(false);
        }

        event.preventDefault();
    }

    const handlerowchange = (key: any, value: any) => {
        setshowdrowetails((prev: any) => ({ ...prev, ...({ [key]: value }) }))
        validate(key, value, input_fields[key])
    }

    const handlepoupup = useCallback(() => {
        setshowpopup(!showpopup);
    }, [showpopup]);


    return (
        <>
            <div className='table-container'>
                {rows && column.length > 0 && rows.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                {
                                    column.map((col: any) => {
                                        col = col.replaceAll('_', ' ')
                                        if (col === 'id') {
                                            return null;
                                        }
                                        return (
                                            <th>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                                        )
                                    })
                                }
                                {
                                    editable && (
                                        <>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows && rows.map((rowval: any) => {
                                    return (
                                        <tr>
                                            {
                                                Object.entries(rowval).map(([key, value]: any) => {
                                                    if (key === 'id') {
                                                        return null;
                                                    }
                                                    return <td>{CellProperty(key, value)}</td>
                                                })
                                            }
                                            {
                                                editable && (
                                                    <>
                                                        <td>
                                                            <IconButton onClick={() => Edithandle(rowval)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </td>
                                                        <td>
                                                            <IconButton onClick={() => Deletehandle(rowval)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </td>
                                                    </>
                                                )
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>}
            </div>
            {
                showpopup && <Popupcomponent showstate={showpopup} handlepoupup={handlepoupup}>
                    <form onSubmit={handleSubmit} className='dashboard_form'>
                        <label>Enter your Name:
                            <input
                                placeholder='Name'
                                type="text"
                                value={showrowdetail.name || ''}
                                onChange={(e) => handlerowchange('name', e.target.value)}
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
                                value={showrowdetail.email || ''}
                                onChange={(e) => handlerowchange('email', e.target.value)}
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
                                value={showrowdetail.password || ''}
                                onChange={(e) => handlerowchange('password', e.target.value)}
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
                                value={showrowdetail.phone_number || ''}
                                maxLength={10}
                                onChange={(e) => handlerowchange('phone_number', e.target.value)}
                                required
                            />
                            {
                                error.phone_number !== '' && <label className='form_label'>{error.phone_number}</label>
                            }
                        </label>
                        <input type="submit" />
                    </form>
                </Popupcomponent>
            }
        </>
    )
}

export default Table;