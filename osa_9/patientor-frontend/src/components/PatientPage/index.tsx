import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PatientPageContent from './PatientPageContent';
import { Patient, Diagnosis } from '../../types';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';

const PatientPage = () => {
  const id = useParams().id as string;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <p>Could not find patient for id: {id}</p>;

  return (
    <PatientPageContent patient={patient} diagnoses={diagnoses} />
  );
};

export default PatientPage;