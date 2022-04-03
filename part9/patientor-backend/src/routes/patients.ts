/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSsnEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404);
  }
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedPatient = patientService.addPatient(newPatientEntry);

  res.json(addedPatient);
});

export default router;