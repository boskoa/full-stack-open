import { Entry } from '../types';
import CheckEntry from './CheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <HospitalEntry entry={entry} />
          </CardContent>
        </Card>
      );
    case 'OccupationalHealthcare':
      return (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <OccupationalHealthcareEntry entry={entry} />
          </CardContent>
        </Card>
      );
    case 'HealthCheck':
      return (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <CheckEntry entry={entry} />
          </CardContent>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;