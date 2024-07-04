import * as React from 'react';
import { Grid, TextField, Typography, useTheme } from '@mui/material';
import BillerCard from './BillerCard';
import { useNavigate } from 'react-router-dom';
import billersData from './billers.json'; // Import billers data directly

interface Biller {
  id: number;
  name: string;
  category: string;
  logoUrl: string;
  type: string; // Updated to handle multiple types
  prepaidFields?: string[]; // Fields required for prepaid option
  postpaidFields?: string[]; // Fields required for postpaid option
}

const SelectBillerScreen: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const navigate = useNavigate();

  const filteredBillers = billersData.filter(biller =>
    biller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBillerClick = (billerId: number) => {
    navigate(`/bill-checkout/${billerId}`);
  };

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
              <BillerCard
                biller={biller}
                onClick={() => handleBillerClick(biller.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectBillerScreen;
