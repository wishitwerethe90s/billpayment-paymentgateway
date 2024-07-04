import * as React from 'react';
import { Grid, TextField, Typography, Card, CardContent, CardMedia, useTheme } from '@mui/material';

const SelectBillerScreen: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  // Dummy data (replace with actual data fetched from backend)
  const billers = [
    { id: 1, name: 'Electricity Provider A', category: 'Electricity', logoUrl: '/images/electricity-logo.png' },
    { id: 2, name: 'Water Provider B', category: 'Water', logoUrl: '/images/water-logo.png' },
    { id: 3, name: 'Internet Provider C', category: 'Internet', logoUrl: '/images/internet-logo.png' },
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
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={biller.logoUrl}
                  alt={`${biller.name} logo`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {biller.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {biller.category}
                  </Typography>
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
