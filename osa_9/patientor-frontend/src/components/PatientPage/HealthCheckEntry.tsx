import { MedicalServices, Favorite } from '@mui/icons-material';

import BaseEntry from './BaseEntry';
import { HealthCheckEntry, Diagnosis } from '../../types';

const HospitalEntryDetails = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <MedicalServices />
      <BaseEntry entry={entry} diagnoses={diagnoses} />
      {
        entry.healthCheckRating == 0 ? <Favorite color='success' /> :
        entry.healthCheckRating == 1 ? <Favorite sx={{ color: 'yellow' }} /> :
        entry.healthCheckRating == 2 ? <Favorite sx={{ color: 'orange' }} /> :
        entry.healthCheckRating == 3 ? <Favorite sx={{ color: 'red' }} /> :
        <p>deceased <Favorite color='disabled' /></p>
      }
    </div>
  );
};

export default HospitalEntryDetails;