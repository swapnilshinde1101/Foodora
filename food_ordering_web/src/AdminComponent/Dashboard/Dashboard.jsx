import { Grid } from '@mui/material'
import React from 'react'
import { MenuTable } from '../Menu/MenuTable'
import { OrderTable } from '../Orders/OrderTable'

export const RestaurantDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}><MenuTable/></Grid>
        <Grid item xs={12} lg={6}><OrderTable/></Grid>

      </Grid>
    </div>
  )
}
