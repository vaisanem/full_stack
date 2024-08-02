export type Diagnosis = {
  code: string,
  name: string,
  latin?: string,
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Entry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
};

export type PublicPatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;