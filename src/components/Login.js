import React, { useState } from "react";

export default function Login(props) {
  const [loginInfo, setLoginInfo] = useState({ name: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signupUser(loginInfo);
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setLoginInfo({ ...loginInfo, [inputName]: inputValue });
  };

  return (
    <div>
      <div>Start a new game</div>
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
