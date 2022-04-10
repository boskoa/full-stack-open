import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addEntry } from "../state";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddEntryModal from "../AddEntryModal";
import React from "react";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientView = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      void fetchPatientDetails();
    }
  }, [patient, id, dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const id: string | undefined = patient?.id;
      const { data: updatedPatient } = await axios.post<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(updatedPatient));
      closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.log("Unknown error", e);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(e);
    }
  };

  let genderIcon;
  switch (patient?.gender) {
    case 'male':
      genderIcon = <MaleIcon />;
      break;
    case 'female':
      genderIcon = <FemaleIcon />;
      break;
    default:
      genderIcon = null;
  }

  return (
    <div>
      <Card sx={{ marginTop: 2 }} raised={true}>
        <CardContent>
          <h3>{patient?.name} {genderIcon}</h3>
          <p>ssn: {patient?.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
        </CardContent>
      </Card>
      <h4>entries</h4>
      {patient?.entries?.map((e) => <EntryDetails key={e.id} entry={e} />)}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()} style={{ marginTop: "2em" }}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientView;
