import * as React from 'react';
import { Grid, Typography, TextField, Button, useTheme, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useParams } from 'react-router-dom';
import billersData from './billers.json'; // Import billers data directly

interface Biller {
  id: number;
  name: string;
  category: string;
  logoUrl: string;
  type: string;
  prepaidFields?: string[];
  postpaidFields?: string[];
}

const CheckoutPage: React.FC = () => {
  const theme = useTheme();
  const { billerId } = useParams();
  const selectedBiller = billersData.find(biller => biller.id === parseInt(billerId));

  const [billType, setBillType] = React.useState<string>(
    selectedBiller && selectedBiller.prepaidFields && selectedBiller.postpaidFields
      ? 'prepaid' // Default to prepaid if both options are available
      : (selectedBiller && selectedBiller.prepaidFields ? 'prepaid' : 'postpaid')
  );
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({});

  if (!selectedBiller) {
    return (
      <Grid container style={{ padding: theme.spacing(3) }} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Biller not found
          </Typography>
        </Grid>
      </Grid>
    );
  }

  // Function to handle form field changes
  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log('Form data:', formData);
    // Example: Redirect to success page or handle API call
  };

  return (
    <Grid container style={{ padding: theme.spacing(3) }} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Bill Checkout - {selectedBiller.name}
        </Typography>
        {selectedBiller.prepaidFields && selectedBiller.postpaidFields && (
          <RadioGroup
            row
            aria-label="billType"
            name="billType"
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
          >
            <FormControlLabel value="prepaid" control={<Radio />} label="Prepaid" />
            <FormControlLabel value="postpaid" control={<Radio />} label="Postpaid" />
          </RadioGroup>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {(billType === 'prepaid' || !selectedBiller.postpaidFields) && selectedBiller.prepaidFields && (
              selectedBiller.prepaidFields.map(field => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={field}
                    variant="outlined"
                    value={formData[field] || ''}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    required
                  />
                </Grid>
              ))
            )}
            {(billType === 'postpaid' || !selectedBiller.prepaidFields) && selectedBiller.postpaidFields && (
              selectedBiller.postpaidFields.map(field => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={field}
                    variant="outlined"
                    value={formData[field] || ''}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    required
                  />
                </Grid>
              ))
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Pay Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
