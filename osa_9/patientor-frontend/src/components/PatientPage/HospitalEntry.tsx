import { LocalHospital } from '@mui/icons-material';

import BaseEntry from './BaseEntry';
import { HospitalEntry, Diagnosis } from '../../types';

const HospitalEntryDetails = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <LocalHospital />
      <BaseEntry entry={entry} diagnoses={diagnoses} />
      <p>discharged {entry.discharge.date}</p>
      <p>{entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntryDetails;