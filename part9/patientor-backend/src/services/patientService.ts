import patients from "../../data/patients";
import { Patient, NewPatientEntry, PublicPatient, NewEntry } from "../types";
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSsnEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, patient: Patient): Patient => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  };

  patient?.entries.push(newEntry);
  
  return patient;
};

export default {
  getPatients,
  getNonSsnEntries,
  addPatient,
  findById,
  addEntry
};