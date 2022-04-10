import { Entry } from '../types';
import { useStateValue } from '../state';
import ConstructionIcon from '@mui/icons-material/Construction';

interface OccupationalProps {
  entry: Entry;
}

const OccupationalHealthcareEntry: React.FC<OccupationalProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <p>{entry.date} <ConstructionIcon /></p>
      <p><i>{entry.description}</i></p>
      <p>diagnose by: {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((d) => 
          <li key={d}>{d} {diagnoses.find((dN) => dN.code === d)?.name}</li>)}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareEntry;