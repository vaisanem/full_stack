import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

import { Entry, Diagnosis } from '../../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unexpected entry type: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;