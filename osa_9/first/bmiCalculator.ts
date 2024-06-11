export type BmiValues = {
  height: number;
  weight: number;
};

export const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 2) throw new Error('Provide both the height and the weight');
  if (args.length > 2) throw new Error('Too many arguments were provided');

  if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) throw new Error('Both of the provided values are required to be numbers');

  return {
    height: Number(args[0]),
    weight: Number(args[1])
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const { height, weight }: BmiValues = parseArguments(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (e) {
  if (e instanceof Error) console.log('Error: ' + e.message);
}