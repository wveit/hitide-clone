import { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../state/userSlice';
import { doLogin, doLogout, doCheckForAuthCodeAndSession } from '../state/userActions';

export function LoginControl({ user, login, logout, checkForAuthCode }) {
    useEffect(checkForAuthCode, [checkForAuthCode]);

    let userText = 'Login';
    if (user.uid) {
        userText = user.uid;
    }

    function handleClick() {
        if (user.uid) {
            logout();
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
    login: doLogin,
    logout: doLogout,
    checkForAuthCode: doCheckForAuthCodeAndSession,
};

export default connect(select, actions)(LoginControl);
