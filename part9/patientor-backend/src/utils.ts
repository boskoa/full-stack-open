import { BaseEntry, Diagnose, Discharge, Gender, HealthCheckRating, NewEntry, NewPatientEntry, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name.');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidNewEntryType = (entry: any): entry is NewEntry => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean =
    entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isValidNewEntryType(entry)) {
    throw new Error("Incorrect or missing entry type: " + entry);
  }

  return entry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }

  return description;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing description: " + specialist);
  }

  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (
    rating === "undefined" ||
    rating === null ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing employer's name");
  }
  return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischargeCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }
  return criteria;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (Object.keys(discharge).length === 0 && discharge.constructor === Object)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return discharge;
  } else {
    if (!discharge.date) {
      throw new Error("Incorrect or missing discharge date");
    }
    if (!discharge.criteria) {
      throw new Error("Incorrect or missing discharge criteria");
    }
    const dischargeDate = parseDate(discharge.date);
    const dischargeCriteria = parseDischargeCriteria(discharge.criteria);

    return {
      date: dischargeDate,
      criteria: dischargeCriteria,
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickleave: any): SickLeave => {
  if (
    !sickleave ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (Object.keys(sickleave).length === 0 && sickleave.constructor === Object)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return sickleave;
  } else {
    if (!sickleave.startDate) {
      throw new Error("Incorrect or missing start date for sick leave");
    }
    if (!sickleave.endDate) {
      throw new Error("Incorrect or missing end date for sick leave");
    }
    const startDate = parseDate(sickleave.startDate);
    const endDate = parseDate(sickleave.endDate);

    return {
      startDate,
      endDate,
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnoseCode = (diagnoseCode: any): Array<Diagnose["code"]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!diagnoseCode) return diagnoseCode;

  if (!Array.isArray(diagnoseCode)) {
    throw new Error("Incorrect diagnosys code");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validDiagnoseCodes = diagnoseCode.every((code: any) =>
    isString(code)
  );

  if (validDiagnoseCodes) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnoseCode;
  } else {
    throw new Error("Incorrect diagnosys code");
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (newEntry: any): NewEntry => {
  const validEntryType = parseEntry(newEntry);
  if (!validEntryType) throw new Error("Not a valid entry.");

  const entry: Omit<BaseEntry, "id"> = {
    date: parseDate(validEntryType.date),
    description: parseDescription(validEntryType.description),
    specialist: parseSpecialist(validEntryType.specialist),
    diagnosisCodes: parseDiagnoseCode(validEntryType.diagnosisCodes),
  };

  switch (validEntryType.type) {
    case "Hospital":
      return {
        ...entry,
        type: validEntryType.type,
        discharge: parseDischarge(validEntryType.discharge),
      };
    case "HealthCheck":
      return {
        ...entry,
        type: validEntryType.type,
        healthCheckRating: parseHealthCheckRating(
          validEntryType.healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...entry,
        type: validEntryType.type,
        employerName: parseEmployerName(validEntryType.employerName),
        sickLeave: parseSickLeave(validEntryType.sickLeave),
      };
    default:
      return assertNever(validEntryType);
  }
};


export default toNewPatientEntry;