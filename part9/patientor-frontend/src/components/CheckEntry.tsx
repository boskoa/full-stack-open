import { HealthCheckEntry } from '../types';
import { useStateValue } from '../state';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

interface HealthProps {
  entry: HealthCheckEntry;
}

const CheckEntry: React.FC<HealthProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  let ratingIcon;
  switch (entry.healthCheckRating) {
    case 0:
      ratingIcon = 'green';
      break;
    case 1:
      ratingIcon = 'yellow';
      break;
    case 2:
      ratingIcon = 'pink';
      break;
    case 3:
      ratingIcon = 'red';
      break;
    default:
      ratingIcon = '';
  }

  return (
    <div>
      <p>{entry.date} <HealthAndSafetyRoundedIcon /></p>
      <p><i>{entry.description}</i></p>
      <FavoriteRoundedIcon htmlColor={ ratingIcon }/>
      <p>diagnose by: {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((d) => 
          <li key={d}>{d} {diagnoses.find((dN) => dN.code === d)?.name}</li>)}
      </ul>
    </div>
  );
};

export default CheckEntry;