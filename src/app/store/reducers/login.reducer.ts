import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess } from '../actions/login.actions';

export interface LoginState {
    accessToken: string;
    error: string;
    userName: string;
    email: string;
    isLoading: boolean;
}

const initialState: LoginState = {
    accessToken: '',
    error: '',
    userName: '',
    email: '',
    isLoading: false
};

export const loginReducer = createReducer(initialState,
    on(login, state => ({ ...state, isLoading: true })),
    on(loginSuccess, (state, { accessToken, userName, email }) => (
        { ...state, accessToken, userName, email, isLoading: false })),
    on(loginFailure, (state, { error }) => ({ ...state, error, isLoading: false }))
);