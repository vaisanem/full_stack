import { List, ListItem, ListItemText } from '@mui/material';

import { Entry, Diagnosis } from '../../types';

const BaseEntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return diagnosis ? diagnosis.name : 'Monkeypox';
  };

  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>treated by {entry.specialist}</p>
      <List>
        {entry.diagnosisCodes?.map(code => (
          <span key={code}>
            <ListItem key={code}>
              <ListItemText primary={code} secondary={getDiagnosisName(code)} />
            </ListItem>
          </span>
        ))}
      </List>
    </div>
  );
};

export default BaseEntryDetails; 