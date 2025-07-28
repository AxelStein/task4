import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import apiClient from '../api/api.client.js';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function SigninPage() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
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
          setLoading(false);
          setValidated(true);
          console.log('success');
        })
        .catch(err => {
          setValidated(false);
          setLoading(false);
          setError(err.response.data.message);
          /*
          setEmailError('Invalid email');
          setPasswordError('Invalid password');
          */
          console.error(err.response.data);
        });
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
                    isInvalid={emailError != null}
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
                    isInvalid={passwordError != null}
                    name='password' />
                  <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                </Form.Group>

                <div className='d-grid'>
                  <Button variant='outline-primary' type='Submit' disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
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