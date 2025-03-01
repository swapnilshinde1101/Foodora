import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import { CartItem } from './CartItem';
import { AddressCart } from './AddressCart';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../State/store';
import { createOrder } from '../../State/Order/Action';

 export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const initialValues = {
  streetAddress: "",
  state: "",
  city: "",
  pincode: ""
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Must be a valid 6-digit pincode")
    .required("Pincode is required")
});

const items = [1, 1];

const Cart = () => {
  const [open, setOpen] = useState(false);

  const handleOpenAddressModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { cart, auth } = useSelector(state => state);
  const dispatch=useDispatch()

  const createOrderUsingSelectedAddress = () => { };

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems?.[0]?.food?.restaurant?.id || null,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "India"
        }
      }
    };
    
    dispatch(createOrder(data)); 
    console.log("Submitted values: ", values);
    
    setTimeout(() => {
      console.log("Updated Orders State:", store.getState().order.orders);
    }, 2000); // Check state after 3 seconds
  };

    

  return (
    <div>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
        {cart.cartItems?.length > 0 ? cart.cartItems.map((item) => (<CartItem key={item.id} item={item} />)) : <p>Your cart is empty.</p>}


          <Divider />

          <div className='billlDetails px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Item Total</p>
                <p>₹{cart.cart?.total}</p>
              </div>

              <div className='flex justify-between text-gray-400'>
                <p>Delivery Fee</p>
                <p>₹99</p>
              </div>

              <div className='flex justify-between text-gray-400'>
                <p>GST and Restaurant Charges</p>
                <p>₹19</p>
              </div>
              <Divider />
            </div>
            <div className='flex justify-between text-gray-400'>
              <p>Total Pay</p>
            <p>₹{(cart.cart?.total || 0) + 99 + 19}</p>


            </div>
          </div>
        </section>

        <Divider orientation='vertical' flexItem />
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {[1, 1, 1, 1, 1].map((item, index) =>
                (<AddressCart key={index} handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />)
              )}

              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className='space-y-3 text-gray-500'>
                  <h1 className='font-semibold text-lg'>Add New Address</h1>
                  <Button variant='outlined' fullWidth onClick={handleOpenAddressModel}>Add</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal open={open} onClose={handleClose} aria-labelledby="address-modal-title">
        <Box sx={style}>
          <h2 id="address-modal-title">Add New Address</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field as={TextField} name="streetAddress" label="Street Address" fullWidth variant="outlined" />
                    <ErrorMessage name="streetAddress" component="div" className="text-red-600" />
                  </Grid>

                  <Grid item xs={6}>
                    <Field as={TextField} name="state" label="State" fullWidth variant="outlined" />
                    <ErrorMessage name="state" component="div" className="text-red-600" />
                  </Grid>

                  <Grid item xs={6}>
                    <Field as={TextField} name="city" label="City" fullWidth variant="outlined" />
                    <ErrorMessage name="city" component="div" className="text-red-600" />
                  </Grid>

                  <Grid item xs={12}>
                    <Field as={TextField} name="pincode" label="Pincode" fullWidth variant="outlined" />
                    <ErrorMessage name="pincode" component="div" className="text-red-600" />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth color='primary'>Deliver Here</Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
