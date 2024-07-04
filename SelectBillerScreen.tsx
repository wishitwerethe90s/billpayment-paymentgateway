import * as React from 'react';
import { Grid, TextField, Typography, useTheme } from '@mui/material';
import BillerCard from './BillerCard';
import { Route, Routes } from 'react-router-dom';
import CheckoutPage from './CheckoutPage'; // Import CheckoutPage component

const SelectBillerScreen: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  // Dummy data (replace with actual data fetched from backend)
  const billers = [
    { 
      id: 1, 
      name: 'Electricity Provider A', 
      category: 'Electricity', 
      logoUrl: '/images/electricity-logo.png', 
      type: 'Prepaid', 
      prepaidFields: ['accountNumber', 'customerID'] 
    },
    { 
      id: 2, 
      name: 'Water Provider B', 
      category: 'Water', 
      logoUrl: '/images/water-logo.png', 
      type: 'Postpaid', 
      postpaidFields: ['accountNumber'] 
    },
    { 
      id: 3, 
      name: 'Internet Provider C', 
      category: 'Internet', 
      logoUrl: '/images/internet-logo.png', 
      type: 'Prepaid/Postpaid', 
      prepaidFields: ['username', 'password'],
      postpaidFields: ['username']
    },
    { 
      id: 4, 
      name: 'Phone Recharge', 
      category: 'Phone', 
      logoUrl: '/images/phone-logo.png', 
      type: 'Prepaid/Postpaid', 
      prepaidFields: ['phoneNumber', 'amount'],
      postpaidFields: ['phoneNumber', 'amount', 'accountID']
    },
    // Add more billers as needed
  ];

  const filteredBillers = billers.filter(biller =>
    biller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container style={{ padding: theme.spacing(3) }} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Select a Biller
        </Typography>
        <TextField
          label="Search Billers"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: theme.spacing(2) }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {filteredBillers.map(biller => (
            <Grid item xs={12} sm={6} md={4} key={biller.id}>
              <BillerCard biller={biller} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Routes>
        {filteredBillers.map(biller => (
          <Route key={biller.id} path={`/checkout/${biller.id}`}>
            <CheckoutPage location={{ state: { requiredFields: biller.type.includes('Prepaid') ? biller.prepaidFields : biller.postpaidFields } }} />
          </Route>
        ))}
      </Routes>
    </Grid>
  );
};

export default SelectBillerScreen;
