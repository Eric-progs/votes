import { useState, useEffect } from "react";
import s from "./css/app.module.css";
import { Card } from "./components/Card.jsx";

import { persons } from "./Utils.js";

function App() {

  const [ voting, setVoting ] = useState([]);
  const [ voted, setVoted ] = useState([]);
  const [ people, setPeople ] = useState([]);
  const [ didIVote, setDidIVote ] = useState(false);
  
  async function voteCallback(obj, ind) {
    setVoting(prev => prev.map((v, i) => i === ind ? true : v));
    try {
      const res = await fetch(`http://localhost:3000/api/vote_user/${ind}`, {
        method: "PUT",
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      
      setVoted(prev => prev.map((v, i) => i === ind ? true : v));
      setVoting(prev => prev.map((v, i) => i === ind ? false : v));
      setPeople(prev => prev.map((per, i) => i === ind ? {...per, votes: data.userVotes} : per));
      setDidIVote(data.didUserVote);
      //alert(`You voted successfully! ${data.userVotes}`);
    } 
    catch (err) {
      setVoting(prev => prev.map((v, i) => i === ind ? false : v));
      alert(err);
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("http://localhost:3000/api/get_users");
        if (!res.ok) {
          throw new Error("There's something failed requesting");
        }
        const data = await res.json();
        setPeople(data.users);
        setVoting(data.users.map(() => false));
        setVoted(data.users.map((v, i) => i === data.heVotesTo ? true : false));
        setDidIVote(data.didUserVote);
      } catch (err) {
        alert(err);
      }
    }
    getUser();
  }, []);
  
  return (
    <main className={s.mainContainer}>
      
      <div>
        <h3>People</h3>
      </div>
      
      <div className={s.cardContainer}>
        {
          people.map((obj, ind) => (
            <Card
              key={ind}
              username={obj.username}
              gender={obj.gender}
              description={obj.description}
              votes={obj.votes}
              voting={voting[ind]}
              voted={voted[ind]}
              disableVoteBtn={didIVote}
              scores={obj.scores}
              rates={obj.rates}
              image={obj.imgUrl}
              voteCallback={() => voteCallback(obj, ind)} 
            />
          ))
        }
      </div>
      
    </main>
  );
}

export default App;