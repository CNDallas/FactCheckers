import React from "react";
import "./css/Modal.css";

const stats = props => {
  const { handleClose, show } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const {username, ranking, total_games, wins, total_kings } = props.stats;

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div>Stats For: {username}</div><br/>
        Ranking: {ranking}
        <br />
        Total Games: {total_games}
        <br />
        Wins: {wins}
        <br />
        Loses: {total_games - wins}
        <br />
        Total Times Kinged: {total_kings} <br />
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default stats;
