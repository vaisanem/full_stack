import { Diagnosis, BaseEntry, NewEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../types';
import { parseString, parseDate, isObject } from './common';

const assertNever = (value: never): never => {
  throw new Error(
    `Unexpected entry type: ${JSON.stringify(value)}`
  );
};

const isHealthCheckRating = (data: unknown): data is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(parseString(data)); // Can be a number too?
};

const parseHealthCheckRating = (data: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(data)) {
    throw new Error('Unexpected health rating: ' + data + '. Records of deceased patients is not currently supported.');
  }
  return data;
};

const parseDischarge = (data: unknown): HospitalEntry['discharge'] => {
  if (!isObject(data)) throw new Error('Discharge data is missing');

  const dischargeProperties: (keyof HospitalEntry['discharge'])[] = ['date', 'criteria'];
  const hasAllProperties = dischargeProperties.every(key => key in data);

  if (!hasAllProperties) throw new Error('Some discharge data is missing');

  const properties = data as Record<keyof HospitalEntry['discharge'], unknown>;
  return {
    date: parseDate(properties.date),
    criteria: parseString(properties.criteria)
  };
};

const parseDiagnosisCodes = (data: object): Array<Diagnosis['code']> => {
  if (!('diagnosisCodes' in data)) {
    return [] as Array<Diagnosis['code']>;
  }

  return data.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseNewEntry = (data: unknown): NewEntry => {
  if (!isObject(data)) throw new Error('Entry data is missing');

  const entryProperties: (keyof BaseEntry)[] = ['date', 'description', 'specialist'];
  const hasEntryProperties = entryProperties.every(key => key in data);

  if (hasEntryProperties && 'type' in data) {
    parseString(data.type);
    switch (data.type) {
      case 'HealthCheck': {
        if (!('healthCheckRating' in data)) break;
        const properties = data as Omit<HealthCheckEntry, 'id' | 'diagnosisCodes'>;
        return {
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(properties.healthCheckRating),
          date: parseDate(properties.date),
          description: parseString(properties.description),
          specialist: parseString(properties.specialist),
          diagnosisCodes: parseDiagnosisCodes(properties)
        };
      }
      case 'Hospital': {
        if (!('discharge' in data)) break;
        const properties = data as Omit<HospitalEntry, 'id' | 'diagnosisCodes'>;
        return {
          type: 'Hospital',
          discharge: parseDischarge(properties.discharge),
          date: parseDate(properties.date),
          description: parseString(properties.description),
          specialist: parseString(properties.specialist),
          diagnosisCodes: parseDiagnosisCodes(properties)
        };
      }
      case 'OccupationalHealthcare': {
        if (!('employerName' in data)) break;
        const properties = data as Omit<OccupationalHealthcareEntry, 'id' | 'diagnosisCodes'>;
        return {
          type: 'OccupationalHealthcare',
          employerName: parseString(properties.employerName),
          date: parseDate(properties.date),
          description: parseString(properties.description),
          specialist: parseString(properties.specialist),
          diagnosisCodes: parseDiagnosisCodes(properties)
        };
      }
      default:
        assertNever(data as never);
    }
  }
  throw new Error('Some entry data is missing');
};

export default parseNewEntry;