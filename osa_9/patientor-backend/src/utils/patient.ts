import { Gender, NewPatient } from '../types';
import { parseString, parseDate, isObject } from './common';

const isGender = (data: unknown): data is Gender => {
  return Object.values(Gender).includes(parseString(data) as Gender);
};

const parseGender = (data: unknown): Gender => {
  if (!isGender(data)) {
    throw new Error('Unknown gender: ' + data);
  }
  return data;
};

const parseNewPatient = (data: unknown): NewPatient => {
  if (!isObject(data)) throw new Error('Patient data is missing');

  const patientProperties: (keyof NewPatient)[] = ['name', 'dateOfBirth', 'ssn', 'gender', 'occupation'];
  const hasAllProperties = patientProperties.every(key => key in data);
  if (!hasAllProperties) {
    throw new Error('Some patient data is missing');
  }
  const properties = data as Record<keyof NewPatient, unknown>;
  return {
    name: parseString(properties.name),
    dateOfBirth: parseDate(properties.dateOfBirth),
    ssn: parseString(properties.ssn),
    gender: parseGender(properties.gender),
    occupation: parseString(properties.occupation)
  };
};

export default parseNewPatient;