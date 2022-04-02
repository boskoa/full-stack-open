import { Parts, CoursePart } from "../types";

const Total = ({ courseParts }: Parts) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce(
        (carry: number, part: CoursePart) => carry + part.exerciseCount, 0
        )}
    </p>
  )
}

export default Total;