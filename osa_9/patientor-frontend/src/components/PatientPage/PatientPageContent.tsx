import { Divider } from '@mui/material';

import GenderIcon from './GenderIcon';
import { Patient, Diagnosis, NewEntry } from '../../types';
import Entry from './Entry';
import AddEntryForm from './AddEntryForm';

interface Props {
  patient: Patient
  diagnoses: Diagnosis[],
  onSubmit: (values: NewEntry) => void
}

const PatientPageContent = ({ patient, diagnoses, onSubmit }: Props) => {

  return (
    <div>
      <h1>{patient.name} <GenderIcon gender={patient.gender} /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <br />
      <p>Show errors here?</p>
      <AddEntryForm onSubmit={onSubmit} />
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