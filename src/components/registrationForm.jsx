import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
export default function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    var user = {uid:"",
  email:"",
  time:""
};
  const history = useHistory();
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            auth.createUserWithEmailAndPassword(
                state.email, state.password
                ).then(auth.onAuthStateChanged(userAuth => {
                    user.uid = userAuth.uid;
                    user.email = userAuth.email;
                    user.time = Date.now();
                    if(userAuth){
                      localStorage.setItem("logged_in",JSON.stringify(user));
                      history.push("/dashboard");
                    }
                  })).catch(err => {
                console.log(err)
                })
        } else {
            console.log(state.password);
            console.log(state.email);
        }
    }
    return (
        <div className="loginroot">
      <div className="containerLogin">
        <div className="box-one"></div>
        <div className="box-two">
          <div>
            <h1>Register</h1><br/>
            <h2>
              Don't have an account? 
              <a href="/Login"> Login.</a>
            </h2>
            <div>
              <form>
              <input type="email" 
                     className="form-control" 
                     id="email" 
                     aria-describedby="emailHelp" 
                     value={state.email}
                     onChange={handleChange}
              />
                <span className="span-1">email</span>
                <input type="password" 
                      className="form-control" 
                      id="password" 
                      value={state.password}
                      onChange={handleChange} 
                  />
                <span className="span-2">password</span>
                <input type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      value={state.confirmPassword}
                      onChange={handleChange} 
                  />
                <span className="span-2">Confirm Password</span>
                <button onClick={handleSubmitClick}>Register</button>
              </form>
            </div>

            <div className={"divider"}>
              <span>Janice</span>
            </div><br/>
          </div>
        </div>
      </div>
      </div>
    );
}