import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { backend } from 'declarations/backend';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerForm from './components/TaxPayerForm';
import SearchTaxPayer from './components/SearchTaxPayer';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: TaxPayer) => {
    try {
      const result = await backend.addTaxPayer(newTaxPayer);
      if ('ok' in result) {
        fetchTaxPayers();
      } else {
        console.error('Error adding tax payer:', result.err);
      }
    } catch (error) {
      console.error('Error adding tax payer:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TaxPayer Management System
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SearchTaxPayer />
            <TaxPayerList taxPayers={taxPayers} loading={loading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
