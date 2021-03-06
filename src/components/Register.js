import React, { Component } from "react";


import uuidv4 from "uuid/v4";
import NavBar from "./NavBar";

class Register extends Component {
  //TODO - Need to adapt to register form
  constructor(props, context) {
    super(props, context);
    this.navigationBarUpdater();
    this.state = {
      registerUsername: "",
      registerPassword: "",
      registerPassword2: "",
      registerEmail: ""
    };
    this.handleChangeEvents = this.handleChangeEvents.bind(this);
  }

  navigationBarUpdater = () => {
    const navItems = [
      { func: this.props.moveToLogin, text: "Login", key: uuidv4() }
    ];
    const nBar = <NavBar linkItems={navItems} />;
    this.props.updateNavigationBar(nBar);
  };

  handleChangeEvents(event) {
    const targetName = event.target.name;
    const value = event.target.value;
    //console.log(targetName);
    this.setState({ [targetName]: value });
  }

  RegisterFunction = e => {
    e.preventDefault();
    const { registerUsername } = this.state;
    const { registerPassword } = this.state;
    const { registerPassword2 } = this.state;
    const { registerEmail } = this.state;
    //console.log(e);
    fetch("http://proj-319-048.misc.iastate.edu/js/new_account.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
        password2: registerPassword2,
        email: registerEmail
      })
    })
      .then(response => response.json())
      .then(responseJSon => {
        if (responseJSon === "User Registered") {
          console.log("user registered");
          this.props.loginAccepted(registerUsername);
        } else {
          console.log(responseJSon);
          this.setState({ error: responseJSon });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const usernameRegex = new RegExp("/([a-zA-Z0-9]+){3,16}/");
    const passwordRegex = new RegExp("/([a-zA-Z0-9]+){6,16}/");
    return (
      <div>
        <span
          style={{
            display: "block",
            fontSize: "2em",
            paddingTop: ".5em",
            paddingBottom: "1em"
          }}
        >
          Register
        </span>

        <form onSubmit={this.RegisterFunction}>
          <fieldset>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              onChange={this.handleChangeEvents}
              name="registerUsername"
              id="username"
              maxLength="16"
              minLength="3"
              required
              validations={{ matchRegexp: usernameRegex }}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={this.handleChangeEvents}
              name="registerPassword"
              id="password"
              maxLength="16"
              minLength="6"
              required
              validations={{ matchRegexp: passwordRegex }}
            />
            <br />
            <label htmlFor="password2">Confirm Password:</label>
            <input
              type="password"
              onChange={this.handleChangeEvents}
              name="registerPassword2"
              id="password2"
              maxLength="16"
              minLength="6"
              required
              validations={{ matchRegexp: passwordRegex }}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              onChange={this.handleChangeEvents}
              name="registerEmail"
              id="email"
              maxLength="80"
              required
            />
            <br />
            <input type="submit" defaultValue="Submit" />
          </fieldset>
        </form>
        <div style={{ fontSize: "12px", color: "#cc0000" }}>
          <p>
            {this.state.error &&
              this.state.error.map(error => <li>{error}</li>)}
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
