import { Button, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../State/Authentication/Action';

const initialValues = {
  email: '',
  password: ''
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
        Login
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <Button
              sx={{ mt: 3, padding: '0.75rem', fontWeight: 'bold' }}
              fullWidth
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Button size="small" onClick={() => navigate('/account/register')}>
          Register
        </Button>
      </Typography>
    </div>
  );
};
