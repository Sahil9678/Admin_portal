import { common } from './constants';

interface commonState {
    isLoading: boolean;
    isError?: boolean;
    message?: any;
    isloggedIn?: Boolean;
    userdata?: any;
}
export const commonReducer = (
    state: commonState = {
        isLoading: false,
        isError: false,
        message: '',
        isloggedIn: false,
        userdata: []
    },
    action: { type: string; payload: string | boolean | any }
): commonState => {
    switch (action.type) {
        case common.toggleLoading:
            return { ...state, isLoading: action.payload as boolean };
        case common.userdata:
            return { ...state, userdata: [...state.userdata, action.payload] };
        case common.updateuserdata:
            return { ...state, userdata: action.payload };
        case common.error:
            return {
                ...state,
                isError: action.payload.isError,
                message: action.payload.message
            };
        case common.toggleLoginStatus:
            return { ...state, isloggedIn: action.payload as boolean };
        default:
            return state;
    }
};