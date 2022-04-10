import { Entry } from '../types';
import { useStateValue } from '../state';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

interface HospitalProps {
  entry: Entry;
}

const HospitalEntry: React.FC<HospitalProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <p>{entry.date} <LocalHospitalRoundedIcon /></p>
      <p><i>{entry.description}</i></p>
      <p>diagnose by: {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((d) => 
          <li key={d}>{d} {diagnoses.find((dN) => dN.code === d)?.name}</li>)}
      </ul>
    </div>
  );
};

export default HospitalEntry;