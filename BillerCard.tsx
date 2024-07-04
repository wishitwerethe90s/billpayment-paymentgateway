import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Biller {
  id: number;
  name: string;
  category: string;
  logoUrl: string;
  type: string; // Updated to handle multiple types
  prepaidFields?: string[]; // Fields required for prepaid option
  postpaidFields?: string[]; // Fields required for postpaid option
}

interface BillerCardProps {
  biller: Biller;
}

const BillerCard: React.FC<BillerCardProps> = ({ biller }) => {
  const navigate = useNavigate();

  const handleBillerClick = () => {
    // Determine the required fields based on selected type (prepaid or postpaid)
    let requiredFields: string[] = [];
    if (biller.type.includes('Prepaid')) {
      requiredFields = biller.prepaidFields || [];
    }
    if (biller.type.includes('Postpaid')) {
      requiredFields = biller.postpaidFields || [];
    }

    // Navigate to bill checkout page with biller id and required fields
    navigate(`/checkout/${biller.id}`, { state: { requiredFields } });
  };

  return (
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
        cursor: 'pointer',
      }}
      variant="outlined"
      onClick={handleBillerClick}
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
        <Chip
          label={biller.type}
          variant="outlined"
          size="small"
          style={{ marginTop: '8px' }}
        />
      </CardContent>
    </Card>
  );
};

export default BillerCard;
