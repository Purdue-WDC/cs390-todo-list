import React, { useContext } from 'react'
import LoginForm from '../components/LoginForm'
import AuthContext from '../context/AuthContext';

const Login = ({ history }) => {
    const authContext = useContext(AuthContext);

    const loginUser = async (user) => {
        try {
            await authContext.login(user);
            history.push('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div>
            <LoginForm login={loginUser} />
        </div>
    )
}

export default Login
