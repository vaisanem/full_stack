import { Divider } from '@mui/material';

import GenderIcon from './GenderIcon';
import { Patient } from '../../types';
import Entry from './Entry';

interface Props {
  patient: Patient;
}

const PatientPageContent = ({ patient }: Props) => {

  return (
    <div>
      <h1>{patient.name} <GenderIcon gender={patient.gender} /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <br />
      <span>Entry Form Here</span>
      <br />
      <h3>Entries</h3>
      {patient.entries.map(entry => (
        <span key={entry.id}>
          <Entry entry={entry} />
          <Divider />
          <br />
        </span>
      ))}
    </div>
  );
};

export default PatientPageContent;