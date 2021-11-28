import React, { useContext } from 'react'
import SignupForm from '../components/SignupForm'
import AuthContext from '../context/AuthContext';

const Signup = ({ history }) => {
    const authContext = useContext(AuthContext);

    const signupUser = async (user) => {
        try {
            await authContext.register(user);
            history.push('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div>
            <SignupForm signup={signupUser} />
        </div>
    )
}

export default Signup
