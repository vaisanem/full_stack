import { ContentProps } from './types';
import Part from './Part';

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      <br></br>
      {courseParts.map(part =>
        <Part part={part} key={part.name} />
      )}
    </div>
  );
};

export default Content;