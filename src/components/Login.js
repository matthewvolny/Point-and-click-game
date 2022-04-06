import React, { useState } from "react";

export default function Login(props) {
  const [loginInfo, setLoginInfo] = useState({ name: "", password: "" });

  //logs in as a new user or a returning user
  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.userId) {
      props.signupUser(loginInfo, props.userId);
    } else {
      props.signupUser(loginInfo);
    }
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setLoginInfo({ ...loginInfo, [inputName]: inputValue });
  };

  return (
    <div className="login-flex">
      {props.userId ? (
        <div className="login-heading">Login to continue your game</div>
      ) : (
        <div className="login-heading">Enter your login info</div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="input-one"
          placeholder="name"
          type="text"
          name="name"
          required
          value={loginInfo.name}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          required
          value={loginInfo.password}
          onChange={handleChange}
        />
        <button className="submit-button">Submit</button>
      </form>
      <div className="footer">With art by Michael DeForge</div>
    </div>
  );
}
