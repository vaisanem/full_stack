import { Patient } from '../../types';
import GenderIcon from './GenderIcon';

interface Props {
  patient: Patient;
}

const PatientPageContent = ({ patient }: Props) => {
  return (
    <div>
      <h1>{patient.name} <GenderIcon gender={patient.gender} /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPageContent;