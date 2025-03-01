import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../State/Authentication/Action';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  role: 'ROLE_CUSTOMER',
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
        Register
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Field
              as={TextField}
              name="fullName"
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Field
                as={Select}
                labelId="role-select-label"
                id="role-select"
                name="role"
                label="Role"
              >
                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
              </Field>
            </FormControl>
            <Button
              sx={{ mt: 3, padding: '0.75rem', fontWeight: 'bold' }}
              fullWidth
              variant="contained"
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Button size="small" onClick={() => navigate('/account/login')}>
          Login
        </Button>
      </Typography>
    </div>
  );
};
