interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>) => {
  if (args.length < 10) {
    throw new Error('Not enough arguments');
  }
  if (args.length > 14) {
    throw new Error('Too many arguments');
  }

  if (args.slice(2).find((a) => isNaN(Number(a)))) {
    throw new Error('Not all provided values are numbers');
  }

  return {
    days: args.slice(3).map((a) => Number(a)),
    t: Number(args[2])
  };
};

type Rating = 1 | 2 | 3;

export const exerciseCalc = (days: Array<number>, t: number): Result => {
  if (days.length < 7) {
    throw new Error('Enter at least one value for each day of the week.');
  }
  const periodLength: number = days.length;
  const trainingDays: number = days.reduce(
    (sum, val) => (val ? sum + 1 : sum + 0),
    0
  );
  const average: number = days.reduce((sum, val) => sum + val, 0) / days.length;
  const target = t;
  const success: boolean = average >= target;

  let rating: Rating;
  let ratingDescription: string;

  if (trainingDays === periodLength && success) {
    rating = 3;
  } else if (trainingDays === periodLength || success) {
    rating = 2;
  } else {
    rating = 1;
  }

  switch (rating) {
    case 3:
      ratingDescription = 'Great!';
      break;
    case 2:
      ratingDescription = 'Could be better!';
      break;
    case 1:
      ratingDescription = 'Bad!';
      break;
    default:
      ratingDescription = 'Something went wrong...';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { days, t } = parseArguments(process.argv);
  console.log(exerciseCalc(days, t));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}
