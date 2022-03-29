import patients from "../../data/patients";
import { Patient, NonSsnPatientEntry } from "../types";

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

export default {
  getPatients,
  getNonSsnEntries
};