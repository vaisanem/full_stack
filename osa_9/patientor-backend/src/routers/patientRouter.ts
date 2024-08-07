import express from 'express';
import service from '../services/patientService';
import parseNewPatient from '../utils/patient';

const router = express.Router();

router.get('/:id', (_req, res) => {
  const id = _req.params.id;
  const patient = service.getPatient(id);
  if (!patient) return res.status(404).json('Could not find patient for id: ' + id);
  return res.json(patient);
});

router.get('/', (_req, res) => {
  res.json(service.getAllPatients());
});

router.post('/', (_req, res) => {
  try {
    const newPatient = parseNewPatient(_req.body);
    const addedPatient = service.addPatient(newPatient);
    return res.json(addedPatient);
  } catch (e) {
    let message = 'Could not process the request. ';
    if (e instanceof Error) message += e.message;
    return res.status(400).json(message);
  }
});

export default router;