import * as React from 'react';
import { Grid, Typography, TextField, Button, useTheme } from '@mui/material';

interface Biller {
  id: number;
  name: string;
  category: string;
  logoUrl: string;
  type: string;
  prepaidFields?: string[];
  postpaidFields?: string[];
}

interface CheckoutPageProps {
  biller: Biller;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ biller }) => {
  const theme = useTheme();

  // State to hold form data
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({});

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

  // Determine the required fields based on selected type (prepaid or postpaid)
  let requiredFields: string[] = [];
  if (biller.type.includes('Prepaid')) {
    requiredFields = biller.prepaidFields || [];
  }
  if (biller.type.includes('Postpaid')) {
    requiredFields = biller.postpaidFields || [];
  }

  return (
    <Grid container style={{ padding: theme.spacing(3) }} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Bill Checkout - {biller.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Required Fields: {requiredFields.join(', ')}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {requiredFields.map(field => (
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
            ))}
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
