import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.passwordConfirmation) {
      setError("Passwords do not match");
    }

    const data = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
    };

    axios
      .post("http://localhost:5000/api/auth/signup", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={inputs.username}
              type="text"
              onChange={handleChange}
              required
              required
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              value={inputs.email}
              type="email"
              onChange={handleChange}
              required
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={inputs.password}
              type="password"
              onChange={handleChange}
              required
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              value={inputs.passwordConfirmation}
              type="password"
              onChange={handleChange}
              required
            />
          </Segment>
          <Button color="orange" fluid size="large" type="submit">
            Submit
          </Button>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
        <h5 style={{ color: "darkorange" }}>{error}</h5>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
