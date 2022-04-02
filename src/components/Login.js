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
    <div>
      {props.userId ? (
        <div>Login to continue your game</div>
      ) : (
        <div>Enter your login info</div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={loginInfo.name}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
