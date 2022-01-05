import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { signUp, removeError } from "../redux/user/user-actions";

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const dispatch = useDispatch();

  useEffect(() => dispatch(removeError()), [dispatch]);

  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const handleInputErrors = (name) => {
    return error.toLowerCase().includes(name) ? "error" : "";
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(inputs));
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
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
            />
            <Form.Input
              className={handleInputErrors("email")}
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
              className={handleInputErrors("password")}
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={inputs.password}
              type="password"
              onChange={handleChange}
              minLength={6}
              required
            />

            <Form.Input
              className={handleInputErrors("password")}
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              value={inputs.passwordConfirmation}
              type="password"
              onChange={handleChange}
              minLength={6}
              required
            />
          </Segment>
          <Button
            className={loading ? "loading" : ""}
            disabled={loading}
            color="orange"
            fluid
            size="large"
            type="submit"
          >
            Submit
          </Button>
        </Form>
        {error && (
          <Message error>
            <h3>Error</h3>
            <p>{error} </p>
          </Message>
        )}
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterPage;
