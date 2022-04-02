import { Parts, CoursePart } from "../types"

const Content = ({ courseParts }: Parts) => {
  return (
    <div>
      {courseParts.map((cP: CoursePart) => 
          <p key={cP.name}>{cP.name} {cP.exerciseCount}</p>
      )}
    </div>
  )
}

export default Content;