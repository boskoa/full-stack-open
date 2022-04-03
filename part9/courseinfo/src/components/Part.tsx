import { PartProp } from "../types";

const Part = ({ part }: PartProp) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
          <a>submit to: {part.exerciseSubmissionLink}</a>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
          <p>required skils: {part.requirements.join(', ')}</p>
        </div>
      )
  }
}

export default Part;