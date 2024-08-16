import { LocalHospital } from '@mui/icons-material';

import BaseEntry from './BaseEntry';
import { HospitalEntry } from '../../types';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <LocalHospital />
      <BaseEntry entry={entry} />
      <p>discharged {entry.discharge.date}</p>
      <p>{entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntryDetails;