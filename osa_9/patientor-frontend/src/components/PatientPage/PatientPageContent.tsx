import { Patient } from '../../types';
import GenderIcon from './GenderIcon';
import { List, ListItem, Divider } from '@mui/material';

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
      <h3>Entries:</h3>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <List>
            {entry.diagnosisCodes?.map(code => (
              <span key={code}>
                <ListItem key={code}>
                  {code}
                </ListItem>
                  <Divider />
              </span>
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default PatientPageContent;