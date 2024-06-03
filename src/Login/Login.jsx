import { useContext, useState } from 'react';
import './login.scss';
import { authContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import requestax from '../axios';

const Login = () => {
    const navigate = useNavigate()
    const { setCurrentUser} = useContext(authContext)
    const [curState, setCurState] = useState('Login');
    const [data,setData] = useState({
        name:"",
        email: "",
        password:""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let response;
        if(curState === 'Login') {
            response = await requestax.post('/user/login', data);
        } else {
            response = await requestax.post('/user/register', data);
        }
        
        if(response.data.success) {
            localStorage.setItem("token",response.data.token)
            setCurrentUser(response.data.user)
            navigate('/')
        } else {
            alert(response.data.message)
        }
    }
    /*
    useEffect(()=>{
        console.log(data)
    },[data])
    */
    return (
        <div className="login">
            <form onSubmit={onLogin} className="container">
                <div className="title">
                    <h2>{curState}</h2>
                    <span onClick={() => navigate('/')}>x</span>
                </div>
                <div className="inputs">
                    <input name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder="Your name" required />
                    {curState === 'Sign Up' && <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder="Your email" required />}
                    <input name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder="Your password" required />
                </div>
                <button type='submit'>{curState === 'Sign Up' ? 'Create account' : 'Login'}</button>
                <div className="condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {curState === 'Login' ? (
                    <p>
                        Create a new account?<span onClick={() => setCurState('Sign Up')}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?<span onClick={() => setCurState('Login')}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
