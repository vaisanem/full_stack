import { TotalProps }  from './types';

const Total = ({ totalExercises }: TotalProps) => {
  return (
    <h3>
      Number of exercises {totalExercises}
    </h3>
  );
};

export default Total;