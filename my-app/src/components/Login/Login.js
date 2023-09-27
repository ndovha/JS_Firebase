import InputField from '../InputField/InputField';
import { useState } from 'react';
import {
	auth,
	signInWithEmailAndPassword,
	db,
	ref,
	get,
	child,
} from '../../module/firebase';
import { Link, useHistory } from 'react-router-dom';
import {
	reg_user_email,
	reg_user_password,
} from '../../module/form-validation';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorEmail, setErrorEmail] = useState(null);
	const [errorPass, setErrorPass] = useState(null);
	const history = useHistory();

	//validation email and password
	function isValidEmail(email) {
		return reg_user_email.test(email);
	}
	function isValidPass(password) {
		return reg_user_password.test(password);
	}

	const handleChangeEmail = (event) => {
		if (!isValidEmail(event.target.value)) {
			setErrorEmail('Email is invalid.');
		} else {
			setErrorEmail(null);
		}
		setEmail(event.target.value);
	};

	const handleChangePass = (event) => {
		if (!isValidPass(event.target.value)) {
			setErrorPass(
				'Password should contain atleast one number and minimum 6 characters.'
			);
		} else {
			setErrorPass(null);
		}
		setPassword(event.target.value);
	};

	const loginUser = (e) => {
		e.preventDefault();
		// send data to backend
			signInWithEmailAndPassword(auth, email, password).then(
				(userCredential) => {
					const userKey = userCredential.user.uid;
					const dbRef = ref(db);
					get(child(dbRef, `Users/${userKey}`))
						.then((snapshot) => {
							if (snapshot.exists()) {
								let birthday = snapshot.val().Birthday;
								let name = snapshot.val().FirstName;
								localStorage.setItem('birthday', birthday);
								localStorage.setItem('name', name);
								history.push('/birthday');
							} else {
								console.log('No data available');
							}
						})
						.catch((error) => {
							console.error(error);
						});
				}
			);
	};
	return (
		<div className='container'>
			<div className='row d-flex justify-content-center'>
				<div className='col-lg-5'>
					<h1 className='text-center fst-italic'>Login</h1>
					<form action='' className='p-3 rounded-3 shadow'>
						<InputField
							id='email'
							label='Email:'
							type='email'
							value={email}
							onChange={handleChangeEmail}
							placeholder='example@email.com'
							size='50'
						/>
						{errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
						<InputField
							id='password'
							label='Password:'
							type='password'
							value={password}
							onChange={handleChangePass}
							placeholder='Password'
							size='50'
						/>
						{errorPass && <p style={{ color: 'red' }}>{errorPass}</p>}
						<div className='d-flex justify-content-between'>
							<Link to='/signup' className='text-decoration-none text-primary'>
								Create a new account
							</Link>
							<button
								id='signin'
								className='btn btn-outline-primary'
								type='submit'
                                disabled={!email || !password}
								onClick={loginUser}
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;
