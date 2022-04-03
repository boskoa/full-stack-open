import { Parts } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: Parts) => {
  return (
    <div>
      {courseParts.map((cP) => 
        <Part key={cP.name} part={cP} />
      )}
    </div>
  )
}

export default Content;