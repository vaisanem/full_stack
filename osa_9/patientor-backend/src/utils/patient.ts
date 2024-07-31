import { Gender, NewPatient } from '../types';

const isString = (data: unknown): data is string => {
  return typeof data === 'string' || data instanceof String;
};

const parseString = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Ëxpected a string: ' + data);
  }
  return data;
};

const parseDate = (data: unknown): string => {
  if (!Date.parse(parseString(data))) {
    throw new Error('Invalid date: ' + data);
  }
  return isString(data) ? data : 'BORN-NO-IS';
};

const isGender = (data: unknown): data is Gender => {
  return Object.values(Gender).includes(parseString(data) as Gender);
};

const parseGender = (data: unknown): Gender => {
  if (!isGender(data)) {
    throw new Error('Unknown gender: ' + data);
  }
  return data;
};

const isObject = (data: unknown): data is object => {
  return data !== null && typeof data === 'object';
};

const hasPatientProperties = (data: unknown): data is NewPatient => {
  const patientProperties: (keyof NewPatient)[] = ['name', 'dateOfBirth', 'ssn', 'gender', 'occupation'];

  if (!isObject(data)) throw new Error('Patient data is missing');
  return patientProperties.every(key => key in data);
};

const parseNewPatient = (data: unknown): NewPatient => {
  if (hasPatientProperties(data)) {
    return {
      name: parseString(data.name),
      dateOfBirth: parseDate(data.dateOfBirth),
      ssn: parseString(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseString(data.occupation)
    } as NewPatient;
  }
  throw new Error('Some patient data is missing');
};

export default parseNewPatient;