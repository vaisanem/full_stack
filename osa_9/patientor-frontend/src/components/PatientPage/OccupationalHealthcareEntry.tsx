import { Work } from '@mui/icons-material';

import BaseEntry from './BaseEntry';
import { OccupationalHealthcareEntry, Diagnosis } from '../../types';

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
    return (
        <div>
            <p><Work /> {entry.employerName}</p>
        <BaseEntry entry={entry} diagnoses={diagnoses} />
            {entry.sickLeave ? <p>sick leave: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : <span></span>}
        </div>
    );
};

export default OccupationalHealthcareEntryDetails;