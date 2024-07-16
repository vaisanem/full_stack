import express from 'express';
import service from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(service.getAllPatients());
});

router.post('/', (_req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = _req.body;

  res.json('Saving a patient!');
});

export default router;