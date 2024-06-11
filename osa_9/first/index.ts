import { calculateBmi, parseArguments, BmiValues } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight }: BmiValues = parseArguments([req.query.height as string, req.query.weight as string]);
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } catch (e) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (_req, res) => {
  type Body = {
    daily_exercises: number[];
    target: number;
  };
  const body = _req.body as Body;

  if (!('daily_exercises' in body && 'target' in body)) return res.status(400).json({ error: 'missing parameter(s)' });

  const ok = body.daily_exercises.every(one => typeof one === 'number');
  if (!(ok && typeof body.target === 'number')) return res.status(400).json({ error: 'malformatted parameter(s)' });

  return res.json(calculateExercises(body.daily_exercises, body.target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});