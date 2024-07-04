import * as React from 'react';
import { Grid, TextField, Typography, Card, CardContent } from '@mui/material';

const SelectBillerScreen: React.FC = () => {
  // Dummy data (replace with actual data fetched from backend)
  const billers = [
    { id: 1, name: 'Electricity Provider A', category: 'Electricity' },
    { id: 2, name: 'Water Provider B', category: 'Water' },
    { id: 3, name: 'Internet Provider C', category: 'Internet' },
    // Add more billers as needed
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Select a Biller
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {billers.map(biller => (
            <Grid item xs={12} sm={6} md={4} key={biller.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {biller.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {biller.category}
                  </Typography>
                  {/* Add more details as needed */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectBillerScreen;
