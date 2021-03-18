import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        message: false,
    })

    const onSubmit = data => {
        //  const newUserInfo = {...user};
        setUser(data);

        if (newUser && data.email && data.password) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    console.log(user);
                    const newUser = { ...user };
                    newUser.message = true;
                    newUser.error = '';
                    setUser(newUser);
                    history.replace(from);
                    setLoggedInUser(newUser);
                    // ...
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(errorCode,errorMessage);

                    const newUser = { ...user };
                    newUser.message = false;
                    newUser.error = error.message;
                    setUser(newUser)
                    // ..
                });
        }

        if (!newUser && data.email && data.password) {

            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    console.log(user);

                    const newUser = { ...user };
                    newUser.message = true;
                    newUser.error = '';
                    setUser(newUser)
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUser = { ...user };
                    newUser.message = false;
                    newUser.error = errorMessage;
                    setUser(newUser)

                });
        }
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div>
            <input onClick={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
            <label htmlFor="newUser">Register</label>

            <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>

                {newUser && <input name="name" ref={register({ required: true, })} placeholder="Name" />} <br />
                {errors.name && <span className="error">Name field is required</span>}<br />

                <input name="email" ref={register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} placeholder="exampl.1@gmail.com" /><br />
                {errors.email && <span className="error">Email field is required</span>}<br />

                <input type="password" name="password" ref={register({ required: true, pattern: /\d{1}/ })} placeholder="Password" /><br />
                {errors.password && <span style={{ color: 'red' }}>Uppercase,Lowercase,Number,Special-character is required</span>}<br />

                {/* <input type="submit" value={newUser ? 'Sign-up' : 'Sign-in'} /> */}
                {/* <button  type="submit" >{newUser ? 'Sign-up' : 'Sign-in'}</button> */}
                {
                    newUser ? <button type="submit">sign-up</button>
                    : <button type ="submit">Sign-in</button>
                }
            </form>

            <p>{user.name}</p>
            <p>{user.error}</p>

            {
                user.message && <p> User {newUser ? 'created' : 'logged in'} successfully </p>
            }


        </div>

    );
}


export default SignUp;