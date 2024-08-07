import { useParams } from 'react-router-dom';
import { Table } from '@mui/material';

import { Patient } from '../../types';

import patientService from '../../services/patients';

const PatientPage = () => {
  const id = useParams().id as string;
  const patient = patientService.getPatient(id);

  return (
    <div></div>
  );
};

export default PatientPage;