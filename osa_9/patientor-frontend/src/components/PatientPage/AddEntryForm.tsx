import { useState, SyntheticEvent } from 'react';
import { Box, Button, InputLabel, MenuItem, Select } from '@mui/material';

import { NewEntry, Diagnosis } from '../../types';

type Type = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ onSubmit, diagnoses }: { onSubmit: (values: NewEntry) => void, diagnoses: Diagnosis[] }) => {

  const [entryType, setEntryType] = useState<string>('HealthCheck');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget as HTMLFormElement);
    console.log(values.get("type"));
    onSubmit({
      type: entryType as Type,
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
      healthCheckRating: 0,
      employerName: '',
      sickLeave: { startDate: '', endDate: '' },
      discharge: { date: '', criteria: '' }
    });
  };

  return (
    <div>
      <Box sx={{ p: 2, border: '2px dashed grey' }}>
        <h3>New entry</h3>
        <form onSubmit={addEntry}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select name="type" id="type" labelId="type-label" label="Type" value={entryType} onChange={({ target }) => setEntryType(target.value)}>
            <MenuItem value="HealthCheck">Health check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational healthcare</MenuItem>
          </Select>
          <br />
          <br />
          <InputLabel id="diagnosisCodes-label">Diagnosis codes</InputLabel>
          <Select name="diagnosisCodes" id="diagnosisCodes" labelId="diagnosisCodes-label" label="Diagnosis codes" multiple defaultValue={[]}>
            {diagnoses.map(diagnosis => <MenuItem key={diagnosis.code} value={diagnosis.code}>{diagnosis.code}</MenuItem>)}
          </Select>
          <br />
          <br />
          <Button type="submit" variant="outlined">Add</Button>
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;