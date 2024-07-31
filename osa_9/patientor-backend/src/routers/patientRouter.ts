import express from 'express';
import service from '../services/patientService';
import parseNewPatient from '../utils/patient';

const router = express.Router();

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