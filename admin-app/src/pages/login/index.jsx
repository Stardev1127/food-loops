import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions';
import { TextInput } from '../../components/form';
import { Container, Row, Col, Alert, Form, Button } from 'react-bootstrap';

function LoginPage() {
  const [formProps, setFormProps] = useState({
    email: 'hello@manjiltamang.com',
    password: 'admin123',
  });
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    dispatch(
      signIn(formProps, (error) => {
        setError(error);
      })
    );
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;

    setFormProps({
      ...formProps,
      [name]: value,
    });
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={6} style={{ marginTop: 100 }}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <TextInput
              onChange={handleChange}
              label="Email"
              type="email"
              name="email"
              value={formProps.email}
              placeholder="Email"
              required
            ></TextInput>

            <TextInput
              onChange={handleChange}
              label="Password"
              type="password"
              name="password"
              value={formProps.password}
              placeholder="Password"
              required
            ></TextInput>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
