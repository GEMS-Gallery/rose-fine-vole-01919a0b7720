import React from 'react';
import { Paper, Typography } from '@mui/material';
import DataTable, { TableColumn } from 'react-data-table-component';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface TaxPayerListProps {
  taxPayers: TaxPayer[];
  loading: boolean;
}

const columns: TableColumn<TaxPayer>[] = [
  {
    name: 'TID',
    selector: row => row.tid,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: row => row.address,
    sortable: true,
  },
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers, loading }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        TaxPayer Records
      </Typography>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        responsive
        progressPending={loading}
      />
    </Paper>
  );
};

export default TaxPayerList;
