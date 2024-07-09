// src/components/ProvidersScreen.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';

const providers = [
  { name: 'Provider 1', logo: 'path_to_logo1.png' },
  { name: 'Provider 2', logo: 'path_to_logo2.png' },
  { name: 'Provider 3', logo: 'path_to_logo3.png' },
  // Add more providers as needed
];

const ProvidersScreen = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Providers for {category}</Typography>
        </Toolbar>
      </AppBar>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Search providers"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <List>
        {filteredProviders.map((provider, index) => (
          <ListItem button key={index}>
            <ListItemAvatar>
              <Avatar src={provider.logo} alt={provider.name} />
            </ListItemAvatar>
            <ListItemText primary={provider.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProvidersScreen;
