import patients from "../../data/patients";
import { Patient, NonSsnPatientEntry, NewPatientEntry } from "../types";
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSsnEntries = (): Array<NonSsnPatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
      id: uuidv4(),
      ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
  };

export default {
  getPatients,
  getNonSsnEntries,
  addPatient
};