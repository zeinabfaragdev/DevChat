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
import { useDispatch, useSelector } from "react-redux";
import { startLoading, signIn } from "../../redux/user/user-actions";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  let error = useSelector((state) => state.user.error);
  let loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();

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
    dispatch(startLoading());
    const data = {
      password: inputs.password,
      email: inputs.email,
    };
    dispatch(signIn(data));
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="violet" icon textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
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
          </Segment>
          <Button
            className={loading ? "loading" : ""}
            disabled={loading}
            color="violet"
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
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
