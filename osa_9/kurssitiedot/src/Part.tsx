import { PartProps } from './types';

const Part = ({ part }: PartProps) => {
  const additionalProperties = [];
  let i = 0;

  switch (part.type) {
    case 'basic':
      additionalProperties.push(part.description);
      break;
    case 'material':
      additionalProperties.push(part.description);
      additionalProperties.push(part.material);
      break;
    case 'prerequisite':
      additionalProperties.push(part.description);
      additionalProperties.push('prerequisites: ' + part.prerequisites.reduce((all, one) => all + one + ', ', ''));
      i = additionalProperties.length - 1;
      additionalProperties[i] = additionalProperties[i].slice(0, -2);
      break;
    case 'project':
      additionalProperties.push('project exercises ' + part.projectExerciseCount);
      break;
    default:
      throw new Error('We do not offer these type of courses');
  }

  return (
    <div>
      <h4>
        {part.name} {part.exerciseCount}
      </h4>
      {additionalProperties.map((property, index) =>
        <p key={index}>
          {property}
        </p>
      )}
      <br></br>
    </div>
  );
};

export default Part;