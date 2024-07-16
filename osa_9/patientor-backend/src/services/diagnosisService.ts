import data from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = data;

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default getAllDiagnoses