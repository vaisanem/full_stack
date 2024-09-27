import { useState, ReactNode, SyntheticEvent } from 'react';
import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { NewEntry, Diagnosis } from '../../types';

type Type = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ onSubmit, diagnoses }: { onSubmit: (values: NewEntry) => void, diagnoses: Diagnosis[] }) => {

  const [entryType, setEntryType] = useState<string>('HealthCheck');

  const parseDiagnosisCodes = (codes: string[]): string[] => {
    return codes.filter(one => one !== '').flatMap(one => one.split(',').map(one => one.trim()));
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget as HTMLFormElement);
    onSubmit({
      type: entryType as Type,
      description: values.get("description") as string,
      date: values.get("date") as string,
      specialist: values.get("specialist") as string,
      diagnosisCodes: parseDiagnosisCodes(values.getAll("diagnosisCodes") as string[]),
      healthCheckRating: Number(values.get("healthCheckRating")),
      employerName: values.get("employerName") as string,
      sickLeave: {
        startDate: values.get("sickLeaveStartDate") as string,
        endDate: values.get("sickLeaveEndDate") as string
      },
      discharge: {
        date: values.get("dischargeDate") as string,
        criteria: values.get("dischargeCriteria") as string
      }
    });
  };

  const getDate = (): string => {
    const date = new Date();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  };

  const additionalFields = (): ReactNode => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <div>
            <InputLabel id="healthCheckRating-label">Health check rating</InputLabel>
            <Select name="healthCheckRating" id="healthCheckRating" labelId="healthCheckRating-label" label="Health check rating" defaultValue="0">
              <MenuItem value="0">Healthy</MenuItem>
              <MenuItem value="1">Low risk</MenuItem>
              <MenuItem value="2">High risk</MenuItem>
              <MenuItem value="3">Critical risk</MenuItem>
            </Select>
          </div >
        );
      case "Hospital":
        return (
          <div>
            <InputLabel id="discharge">Discharge</InputLabel>
            <br />
            <TextField name="dischargeDate" id="dischargeDate" label="Discharge date" type="date" sx={{ width: 220 }} InputLabelProps={{ shrink: true }} />
            <br />
            <br />
            <TextField name="dischargeCriteria" id="dischargeCriteria" label="Discharge criteria" variant="outlined" />
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <TextField name="employerName" id="employerName" label="Employer name" variant="outlined" />
            <br />
            <br />
            <InputLabel id="sickLeave">Sick leave</InputLabel>
            <br />
            <TextField name="sickLeaveStartDate" id="sickLeaveStartDate" label="Start date" type="date" sx={{ width: 220 }} InputLabelProps={{ shrink: true }} />
            <br />
            <br />
            <TextField name="sickLeaveEndDate" id="sickLeaveEndDate" label="End date" type="date" sx={{ width: 220 }} InputLabelProps={{ shrink: true }} />
          </div>
        );
    }
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
          <TextField name="description" id="description" label="Description" variant="outlined" fullWidth />
          <br />
          <br />
          <TextField name="date" id="date" label="Date" type="date" defaultValue={getDate()} sx={{ width: 220 }} InputLabelProps={{ shrink: true }} />
          <br />
          <br />
          <TextField name="specialist" id="specialist" label="Specialist" variant="outlined" />
          <br />
          <br />
          <InputLabel id="diagnosisCodes-label">Diagnosis codes</InputLabel>
          <Select name="diagnosisCodes" id="diagnosisCodes" labelId="diagnosisCodes-label" label="Diagnosis codes" multiple defaultValue={[]}>
            {diagnoses.map(diagnosis => <MenuItem key={diagnosis.code} value={diagnosis.code}>{diagnosis.code}</MenuItem>)}
          </Select>
          <br />
          <br />
          {additionalFields()}
          <br />
          <br />
          <Button type="submit" variant="outlined">Add</Button>
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;