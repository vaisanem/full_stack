import data from '../../data/patients';
import { Patient, PublicPatientData, NewPatient } from '../types';

const patients: Patient[] = data;

const generateId = (): string => {
  return '';
}

const getAllPatients = (): PublicPatientData[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (patientData: NewPatient): Patient => {
  const newPatient = {
    id: generateId(),
    ...patientData
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  addPatient
};