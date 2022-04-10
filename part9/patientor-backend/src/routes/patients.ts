/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

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

router.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntry(req.body);
  const patient = patientService.findById(req.params.id);

  if (!newEntry || !patient) {
    throw new Error('Missing patient and/or wrong entry.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const updatedPatient = patientService.addEntry(newEntry, patient);

  res.json(updatedPatient);
});

export default router;//