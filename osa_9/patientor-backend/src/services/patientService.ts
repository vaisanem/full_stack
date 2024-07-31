import data from '../../data/patients';
import { Patient, PublicPatientData, NewPatient, Gender } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = data.map(p => {
  return {
    ...p,
    gender: p.gender as Gender
  };
});
const takenUUIDs = patients.map(p => p.id);

const generateId = (): string => {
  let newId = uuidv4();
  while (takenUUIDs.includes(newId)) {
    newId = uuidv4();
  }
  return newId;
};

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