import express from 'express';
import { result } from './bmiCalculator';
import { exerciseCalc } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ message: 'malformatted parameters' });
  }
  
  const bmi = result(height, weight);
  res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const { days, t }: any = req.body;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!days || !t || days.length < 7) {
    res.status(400).send({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  if (isNaN(t) || days.find((d: any) => isNaN(d))) {
    res.status(400).send({ error: 'malformatted parameters'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exResult = exerciseCalc(days, t);
  res.json(exResult);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});