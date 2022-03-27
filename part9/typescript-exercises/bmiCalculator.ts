const parseBmiArguments = (args: Array<string>) => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }
  if (args.length > 4) {
    throw new Error('Too many arguments');
  }

  if (args.slice(2).find((a) => isNaN(Number(a)))) {
    throw new Error('Not all provided values are numbers');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

export const result = (height: number, weight: number): string => {
  if (weight === 0 || height === 0) {
    throw new Error('Non-dimensional beings not considered.');
  }

  const bmi: number = weight / ((height * height) /10000);

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (16.0 <= bmi && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (17.0 <= bmi && bmi <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (18.5 <= bmi && bmi <= 24.9) {
    return 'Normal range';
  } else if (25.0 <= bmi && bmi <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (30.0 <= bmi && bmi <= 34.9) {
    return 'Obese (Class I)';
  } else if (35.0 <= bmi && bmi <= 39.9) {
    return 'Obese (Class II)';
  } else if (bmi >= 40) {
    return 'Obese (Class III)';
  }

  return ('Not classified');
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(result(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}