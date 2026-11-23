import s from "../css/card.module.css";

function Card({username="User", description="(No description)", gender, votes=0, voting=false, voted=false, scores=0, rates=0, disableVoteBtn=false, image, voteCallback}) {
  if (!gender) {
    return <p style={{color: "red"}}>Gender must be included</p>
  }
  if (username.length > 20) {
    return <p style={{color: "red"}}>Username is too long</p>
  }
  
  const shortDescription = description.length < 95 ? description : description.slice(0, 95) + "...";
  
  return (
    <div className={`${s.container} ${gender === "Male" ? s.he : s.she}`}>
      <div className={s.info}>
        <img className={gender === "Male" ? s.male : s.female} src={image} alt="" width={70} height={70} />
        <b>{username}</b>
        <div>
          {
            gender === "Male" ? (
              <span className={s.male}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mars preview-icon"><path d="M16 3h5v5"/><path d="m21 3-6.75 6.75"/><circle cx="10" cy="14" r="6"/></svg>
                <small>{gender}</small>
              </span>
            ) : (
              <span className={s.female}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-venus preview-icon"><path d="M12 15v7"/><path d="M9 19h6"/><circle cx="12" cy="9" r="6"/></svg>
                <small>{gender}</small>
              </span>
            )
          }
        </div>
        <small>{shortDescription}</small>
      </div>
      <div className={s.status}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up preview-icon"><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/><path d="M7 10v12"/></svg>
          <small>{votes.toLocaleString()}</small>
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star preview-icon"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
          <small>{scores.toLocaleString()}</small>
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-no-axes-combined preview-icon"><path d="M12 16v5"/><path d="M16 14.639V21"/><path d="M20 10.656V21"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18.463V21"/><path d="M8 14.656V21"/></svg>
          <small>{rates.toFixed(1)}</small>
        </span>
      </div>
      <div className={s.buttonsDiv}>
        <button className={s.viewButton}>View {gender === "Male" ? "his" : "her"} curriculum</button>
        {
          !voting ? (<button disabled={voted || disableVoteBtn} className={`${s.voteButton} ${(voted || disableVoteBtn) && s.disable}`} onClick={voteCallback}>Vote {gender === "Male" ? "him" : "her"}</button>) : (<button className={s.loadingBtn} disabled={true}><div className={s.spinner}></div></button>)
        }
      </div>
      {voted && (<small style={{color: "#006ac2", backgroundColor: "#c6e0ed", padding: "2px 6px", borderRadius: "6px", marginTop: "5px"}}><b>You voted for this person</b></small>)}
    </div>
  );
}

export { Card };

//<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-venus preview-icon"><path d="M12 15v7"/><path d="M9 19h6"/><circle cx="12" cy="9" r="6"/></svg>
