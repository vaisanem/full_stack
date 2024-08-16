import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PatientPageContent from './PatientPageContent';
import { Patient } from '../../types';

import patientService from '../../services/patients';

const PatientPage = () => {
  const id = useParams().id as string;

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    patientService.getPatient(id).then(patient => {
      setPatient(patient);
    }).catch(() => {
      setPatient(null);
    });
  }, [id]);

  if (!patient) return <p>Could not find patient for id: {id}</p>;

  return (
    <PatientPageContent patient={patient} />
  );
};

export default PatientPage;