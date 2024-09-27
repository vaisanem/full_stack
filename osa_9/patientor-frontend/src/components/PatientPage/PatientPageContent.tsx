import { Alert, Divider } from '@mui/material';

import GenderIcon from './GenderIcon';
import { Patient, Diagnosis, NewEntry } from '../../types';
import Entry from './Entry';
import AddEntryForm from './AddEntryForm';

interface Props {
  patient: Patient
  diagnoses: Diagnosis[],
  onSubmit: (values: NewEntry) => void,
  error: string
}

const PatientPageContent = ({ patient, diagnoses, onSubmit, error }: Props) => {

  return (
    <div>
      <h1>{patient.name} <GenderIcon gender={patient.gender} /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <br />
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} diagnoses={diagnoses} />
      <br />
      <h3>Entries</h3>
      {patient.entries.map(entry => (
        <span key={entry.id}>
          <Entry entry={entry} diagnoses={diagnoses} />
          <Divider />
          <br />
        </span>
      ))}
    </div>
  );
};

export default PatientPageContent;