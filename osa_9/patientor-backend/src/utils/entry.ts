import { Diagnosis, BaseEntry, NewEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../types';
import { parseString, parseNumberOrString, parseDate, isObject, notEmpty } from './common';

const assertNever = (value: never): never => {
  throw new Error(
    `Unexpected entry type: ${JSON.stringify(value)}`
  );
};

const isHealthCheckRating = (data: unknown): data is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(parseNumberOrString(data));
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
    criteria: notEmpty(parseString(properties.criteria), 'Discharge criteria')
  };
};

const parseSickLeave = (data: unknown): OccupationalHealthcareEntry['sickLeave'] => {
  if (!isObject(data)) throw new Error('Sick leave data is missing');

  const sickLeaveProperties: Array<keyof NonNullable<OccupationalHealthcareEntry['sickLeave']>> = ['startDate', 'endDate'];
  const hasAllProperties = sickLeaveProperties.every(key => key in data);

  if (!hasAllProperties) throw new Error('Some sick leave data is missing');

  const startDate = (data as { startDate: unknown }).startDate;
  const endDate = (data as { endDate: unknown }).endDate;
  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate)
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
        if (!('healthCheckRating' in data)) break; // Throw error?
        const properties = data as Record<keyof Omit<HealthCheckEntry, 'id' | 'diagnosisCodes'>, 'unknown'>;
        return {
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(properties.healthCheckRating),
          date: parseDate(properties.date),
          description: notEmpty(parseString(properties.description), 'Description'),
          specialist: notEmpty(parseString(properties.specialist), 'Specialist'),
          diagnosisCodes: parseDiagnosisCodes(properties)
        };
      }
      case 'Hospital': {
        if (!('discharge' in data)) break; // Throw error?
        const properties = data as Record<keyof Omit<HospitalEntry, 'id' | 'diagnosisCodes'>, 'unknown'>;
        return {
          type: 'Hospital',
          discharge: parseDischarge(properties.discharge),
          date: parseDate(properties.date),
          description: notEmpty(parseString(properties.description), 'Description'),
          specialist: notEmpty(parseString(properties.specialist), 'Specialist'),
          diagnosisCodes: parseDiagnosisCodes(properties)
        };
      }
      case 'OccupationalHealthcare': {
        if (!('employerName' in data)) break; // Throw error?
        const properties = data as Record<keyof Omit<OccupationalHealthcareEntry, 'id' | 'diagnosisCodes'>, 'unknown'>;
        const entry: Omit<OccupationalHealthcareEntry, 'id'> = {
          type: 'OccupationalHealthcare',
          employerName: notEmpty(parseString(properties.employerName), 'Employer name'),
          date: parseDate(properties.date),
          description: notEmpty(parseString(properties.description), 'Description'),
          specialist: notEmpty(parseString(properties.specialist), 'Specialist'),
          diagnosisCodes: parseDiagnosisCodes(properties)
        };
        if (!('sickLeave' in data)) return entry;
        return {
          ...entry,
          sickLeave: parseSickLeave(properties.sickLeave)
        };
      }
      default:
        assertNever(data as never);
    }
  }
  throw new Error('Some entry data is missing');
};

export default parseNewEntry;