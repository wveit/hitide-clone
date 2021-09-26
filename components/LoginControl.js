import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { doSetUser, selectUser } from '../state/userSlice';
import { doLogin, doCheckForAuthCode } from '../state/userActions';

export function LoginControl({ user, setUser, login, checkForAuthCode }) {
    useEffect(checkForAuthCode, [checkForAuthCode]);

    let userText = 'Login';
    if (user) {
        userText = user.uid;
    }

    function handleClick() {
        if (user) {
            // logout
            setUser(null);
        } else {
            login();
        }
    }

    return <button onClick={handleClick}>{userText}</button>;
}

function select(state) {
    return {
        user: selectUser(state),
    };
}

const actions = {
    setUser: doSetUser,
    login: doLogin,
    checkForAuthCode: doCheckForAuthCode,
};

export default connect(select, actions)(LoginControl);
