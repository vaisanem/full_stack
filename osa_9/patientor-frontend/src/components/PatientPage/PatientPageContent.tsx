import axios from 'axios';
import { useState, useEffect } from 'react';
import GenderIcon from './GenderIcon';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

import { Patient, Diagnosis } from '../../types';
import { apiBaseUrl } from '../../constants';

interface Props {
  patient: Patient;
}

const PatientPageContent = ({ patient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`).then(response => {
      setDiagnoses(response.data);
    });
  }, []);

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return diagnosis ? diagnosis.name : 'Monkeypox';
  };

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
                  <ListItemText primary={code} secondary={getDiagnosisName(code)} />
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