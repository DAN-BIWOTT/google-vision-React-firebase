import React, {useState} from "react";
import './style/login.scss';
import { auth } from '../firebase';
import { useHistory } from "react-router-dom";

function Login(props) {
  const [state , setState] = useState({
    email : "",
    password : ""
})
const handleChange = (e) => {
  console.log(e.target.value);
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
    auth.signInWithEmailAndPassword(
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
}
    
      return (
          <div className="loginroot">
        <div className="containerLogin">
          <div className="box-one"></div>
          <div className="box-two">
            <div>
              <h1>Login</h1><br/>
              <h2>
                Don't have an account? 
                <a href="/register"> Sign up now.</a>
              </h2>
              <div>
                <form>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                  <span className="span-1">email</span>
                  <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                  <span className="span-2">password</span>
                  <button type={"button"} onClick={handleSubmitClick}>LOGIN</button>
                </form>
              </div>
              <a href="/dashboard">Master Login</a><br/>
  
              <a href="/register">Forgot Password?</a>
  
              <div className={"divider"}>
                <span>Janice</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }

export default Login;