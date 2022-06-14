import { Grid } from '@mui/material'

import AverageGraph from './AverageGraphContainer'

export default function Graphics() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AverageGraph />
      </Grid>
    </Grid>
  )
}
