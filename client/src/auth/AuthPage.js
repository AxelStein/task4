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

function AuthPage(isSignIn) {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const onNameChange = () => {
    setNameError(null);
    setError(null);
  };

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
    if (!isSignIn) {
      body.name = form.get("name");
    }

    setLoading(true);

    setTimeout(() => {
      apiClient.post(isSignIn ? '/auth/sign-in' : '/auth/sign-up', body)
        .then(() => {
          setValidated(true);
          console.log('success');
        })
        .catch(err => {
          setLoading(false);

          const data = apiErrorHandler(err);
          const details = data.details;

          if (details && (details.name || details.email || details.password)) {
            setNameError(details.name);
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
              <h1 className='mb-5'>{isSignIn ? 'Sign in to App' : 'Sign up to App'}</h1>

              {error && (<Alert variant='danger'>{error}</Alert>)}

              <Form validated={validated} onSubmit={handleSubmit}>
                {!isSignIn && (
                  <Form.Group className='mb-3' controlId='formName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required type='name'
                      placeholder='Enter name'
                      isInvalid={nameError}
                      onChange={onNameChange}
                      name='name' />
                    <Form.Control.Feedback type='invalid'>{nameError}</Form.Control.Feedback>
                  </Form.Group>
                )}

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
                    placeholder='Enter password'
                    disabled={isLoading}
                    onChange={onPasswordChange}
                    isInvalid={passwordError}
                    name='password' />
                  <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                </Form.Group>

                <div className='d-grid mb-3'>
                  <Button variant='outline-primary' type='Submit' disabled={isLoading}>{isLoading ? 'Loading...' : (isSignIn ? 'Sign in' : 'Sign up')}</Button>
                </div>

                {isSignIn && (
                  <div className='text-center'>
                    <a href='/reset-password'>Forgot password?</a>

                    <div className='mt-5'>
                      Don't have an account? <a href='/sign-up'>Sign up</a>
                    </div>
                  </div>
                )}

                {!isSignIn && (
                  <div className='text-center mt-5'>
                    Already have an account? <a href='/sign-in'>Sign in</a>
                  </div>
                )}
              </Form>
            </Stack>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default AuthPage;