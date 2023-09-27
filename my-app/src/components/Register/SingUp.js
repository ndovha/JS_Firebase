import { useState } from 'react';
import InputField from '../InputField/InputField';
import {
	warningMessage,
	reg_user_email,
	reg_user_password
} from '../../module/form-validation';
import { useHistory} from 'react-router-dom';
import { auth, signOut, createUserWithEmailAndPassword, db, ref, set } from '../../module/firebase';
import './SingUp.css';

const SingUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthday, setBirthday] = useState('');
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

    const handleChangeEmail = event => {
        if (!isValidEmail(event.target.value)) {
            setErrorEmail('Email is invalid');
          } else {
            setErrorEmail(null);
          }
        setEmail(event.target.value);
      };

    const handleChangePass = event => {
        if (!isValidPass(event.target.value)) {
            setErrorPass('Password should contain atleast one number and minimum 6 characters.');             
            } else {
            setErrorPass(null);
            }
        setPassword(event.target.value);
    };

    //create user function
    const createUser =(e) => {
        e.preventDefault();
        let prefer = []
    
        // remove warning
        const warningEle = document.querySelectorAll('p')
        if(warningEle.length!==0){
            warningEle.forEach((element)=>{
                element.remove()
            })
        }
   
        //validation firstName, lastName and birthday
        if(!firstName) {
            warningMessage('#first-name');
        } 
        if(!lastName) {
            warningMessage('#last-name');
        }
        if(!birthday) {
            warningMessage('#birthday');
        }   

        // create a new user
        const userData = {Email: email, Password: password, 
            FirstName: firstName, LastName: lastName, Birthday: birthday, Prefer: prefer}

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userKey = userCredential.user.uid
            set(ref(db, 'Users/' + userKey), userData)
            .then(()=>{
                // signout
                signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    history.push("/")
                })
                .catch((error) => {
                    console.log(error)
                });
            })
        })
    }
	return (
		<div className='container'>
			<div className='row d-flex justify-content-center'>
				<div className='col-lg-6'>
					<h1 className='text-center fst-italic mt-3'>Sing up</h1>
					<form action='' className='p-3 rounded-3 shadow m-5'>
						<div className='d-flex justify-content-between'>
							<InputField
								id='first-name'
								label='First name:'
								type='text'
								onChange={(e) => {setFirstName(e.target.value)}}
								placeholder=''
								size=''
							/>
							<InputField
								id='last-name'
								label='Last name:'
								type='text'
								onChange={(e) => {setLastName(e.target.value)}}
								placeholder=''
								size=''
							/>
						</div>
                        <InputField
							id='birthday'
							label='Birthday'
							type='date'
							onChange={(e) => {setBirthday(e.target.value)}}
							placeholder=''
							size=''
						/>
						<InputField
							id='email'
							label='Email:'
                            value={email}
							type='email'
							onChange={handleChangeEmail}
							placeholder='example@email.com'
							size='50'
						/>
                        {errorEmail && <p style={{color: 'red'}}>{errorEmail}</p>}
						<InputField
							id='password'
							label='Password:'
                            value={password}
							type='password'
                            onChange={handleChangePass}
							placeholder=''
							size='50'
						/>
                        {errorPass && <p style={{color: 'red'}}>{errorPass}</p>}
						<div className='d-flex justify-content-center m-3'>
							<button className='btn btn-outline-primary' type='submit' onClick={createUser} disabled={!email || !password}>
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SingUp;
