import { createContext, useReducer } from 'react';
import React from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
    user: 'default',
    isFetching: false,
    error: false,
};

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    const val = {
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
    };
    return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
}
