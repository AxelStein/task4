import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import apiClient from '../api/api.client.js';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import apiErrorHandler from '../api/error.handler.js';

function SigninPage() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const onEmailChange = () => {
    setEmailError(null);
    setError(null);
  };

  const onPasswordChange = () => {
    setPasswordError(null);
    setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const body = {
      email: form.get("email"),
      password: form.get("password")
    };

    setLoading(true);

    setTimeout(() => {
      apiClient.post('/auth/sign-in', body)
        .then(res => {
          setValidated(true);
          console.log('success');
        })
        .catch(err => {
          setLoading(false);

          const data = apiErrorHandler(err);
          const details = data.details;

          if (details && (details.email || details.password)) {
            setEmailError(details.email);
            setPasswordError(details.password);
          } else {
            setError(data.message);
          }
        })
        .finally(() => setLoading(false));
    }, 500);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', width: '100vw' }}>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            <Stack>
              <h1>Sign in to App</h1>

              {error && (<Alert variant='danger'>{error}</Alert>)}

              <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type='email'
                    placeholder='Enter email'
                    disabled={isLoading}
                    onChange={onEmailChange}
                    isInvalid={emailError}
                    name='email' />
                  <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Password'
                    disabled={isLoading}
                    onChange={onPasswordChange}
                    isInvalid={passwordError}
                    name='password' />
                  <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                </Form.Group>

                <div className='d-grid'>
                  <Button variant='outline-primary' type='Submit' disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign in'}</Button>
                </div>
              </Form>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default SigninPage;