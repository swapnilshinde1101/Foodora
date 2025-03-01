import React from 'react'
import { Grid, Grid2 } from '@mui/material';
import { IngredientTable } from './IngredientTable';
import { IngredientCategoryTable } from './IngredientCategoryTable';


export const Ingredients = () => {
  return (
    <div className='px-2'>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <IngredientTable/>
        </Grid>
        <Grid item xs={12} lg={5}>
          <IngredientCategoryTable/>
        </Grid>

      </Grid>
    </div>
  )
}
