export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetAmount;
  const rating = success ? 3 : average >= targetAmount / 2 ? 2 : 1;
  const ratingDescription = success ? 'Great success' : rating === 2 ? 'Not too bad, but could be better' : 'Not even close, put more effort in or adjust your target';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  };
};

if (process.argv.length < 4) {
  console.log('Error: Nothing to calculate, please provide first the daily exercise hours and then the target');
} else {
    try {
      const dailyExerciseHours: number[] = process.argv.slice(2, -1).map(arg => Number(arg));
      const targetAmount = Number(process.argv.at(-1));
      console.log(JSON.stringify(calculateExercises(dailyExerciseHours, targetAmount), null, 1));
    } catch (e) {
      console.log('Error: All of the provided values are required to be numbers');
    }
}