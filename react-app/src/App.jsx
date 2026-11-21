import { useState } from "react";
import s from "./css/app.module.css";
import { Card } from "./components/Card.jsx";

import { persons } from "./Utils.js";

function App() {

  const [ voting, setVoting ] = useState(false);
    
  function voteCallback(obj, ind) {
    alert(voting)
    //setVoting(true);
  }
  
  return (
    <main className={s.mainContainer}>
      
      <div>
        <h3>People</h3>
      </div>
      
      <div className={s.cardContainer}>
        {
          persons.map((obj, ind) => (
            <Card
              key={ind}
              username={obj.username}
              gender={obj.gender}
              description={obj.description}
              votes={obj.votes}
              voting={voting}
              voted={obj.voted}              scores={obj.scores}
              rates={obj.rates}
              voteCallback={() => voteCallback(obj, ind)}
            />
          ))
        }
      </div>
      
    </main>
  );
}

export default App;