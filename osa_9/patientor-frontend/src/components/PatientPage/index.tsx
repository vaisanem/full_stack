import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PatientPageContent from './PatientPageContent';
import { Patient, Diagnosis, NewEntry } from '../../types';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';

const PatientPage = () => {
  const id = useParams().id as string;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  // const [error, setError] = useState<string>();

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

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const entry = await patientService.addEntry(id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <div>
      <PatientPageContent patient={patient} diagnoses={diagnoses} onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientPage;