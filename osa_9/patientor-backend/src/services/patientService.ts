import data from '../../data/patients';
import { Patient, PublicPatientData, NewPatient, Gender, Entry, NewEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = data.map(p => {
  return {
    ...p,
    gender: p.gender as Gender,
    entries: p.entries as Entry[]
  };
});
const takenPatientIds = patients.map(p => p.id);
const takenEntryIds = patients.flatMap(p => p.entries.map(e => e.id));

const generatePatientId = (): string => {
  let newId = uuidv4();
  while (takenPatientIds.includes(newId)) {
    newId = uuidv4();
  }
  return newId;
};

const generateEntryId = (): string => {
  let newId = uuidv4();
  while (takenEntryIds.includes(newId)) {
    newId = uuidv4();
  }
  return newId;
};

const getAllPatients = (): PublicPatientData[] => {
  return patients.map(({ ssn, entries, ...rest }) => rest);
};

const getPatient = (patientId: string): Patient | undefined => {
  return patients.find(one => one.id === patientId);
};

const addPatient = (patientData: NewPatient): Patient => {
  const newPatient = {
    id: generatePatientId(),
    entries: [],
    ...patientData
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, newEntry: NewEntry): Entry | undefined => {
  const patient = getPatient(patientId);
  if (!patient) return;
  const entry = {
    id: generateEntryId(),
    ...newEntry
  };
  patient.entries.push(entry);
  return entry;
};

export default {
  getAllPatients,
  getPatient,
  addPatient,
  addEntry
};