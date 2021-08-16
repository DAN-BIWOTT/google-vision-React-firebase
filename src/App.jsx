import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import { HomePage } from "./components/homePage";
import Login from "./components/login";
import RegistrationForm from "./components/registrationForm";

export default function App(){
  var logged_in = localStorage.getItem('logged_in');
  const logout = () => {
    localStorage.setItem('logged_in',"");
  }
    return (
      <Router>
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="navbar-brand page-scroll" href="/#page-top">
              JANICE PHOTOGRAPHY
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/#Home" className="page-scroll">
                  Home
                </a>
              </li>
              <li>
                <a href="/#features" className="page-scroll">
                  Services
                </a>
              </li>
              <li>
                <a href="/#portfolio" className="page-scroll">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/#contact" className="page-scroll">
                  Contact
                </a>
              </li>
                {logged_in !== "" ?  <li><a href="/dashboard" className="page-scroll">Dashboard</a></li>:""}
              <li>
                {logged_in === "" ? <a href="/Login" className="page-scroll">Login</a>:<a onClick={logout} href="/Login" className="page-scroll">Log Out</a>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Login" component={Login}/>
        <Route path="/register" component={RegistrationForm}/>
        <Route path="/Dashboard" component={Dashboard}/>
      </Switch>
      </Router>
    );
  }