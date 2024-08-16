import { Work } from '@mui/icons-material';

import BaseEntry from './BaseEntry';
import { OccupationalHealthcareEntry } from '../../types';

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <div>
            <p><Work /> {entry.employerName}</p>
            <BaseEntry entry={entry} />
            {entry.sickLeave ? <p>sick leave: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : <span></span>}
        </div>
    );
};

export default OccupationalHealthcareEntryDetails;