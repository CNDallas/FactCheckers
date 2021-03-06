import React from "react";
import "./css/OpenGameCard.css";


const openGameCard = props => {
  return (
    <div className="center">
      <div className="profile">
        <div className="image">
          <div className="circle-1">
            <img id="image" src={require("./img/tiger.png")} alt="A TIGER?" />
          </div>
        </div>
        <div className="userInfo">
          <div className="userName" id="userName">
            {props.host}
          </div>
          <div className="rank" id="rank">
            {props.rank}
          </div>
        </div>
        <div className="actions">
          <button onClick={props.joinGame} className="btn" id="join">
            Join Game
          </button>
          <button className="btn" id="message" onClick={props.pm}>
            Send Message
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="box">
          <span className="boxInfo">
            <span id="wins">
              {props.wins}
              <br />
            </span>
            <span id="strWins">Wins</span>
          </span>
        </div>
        <div className="box">
          <span className="boxInfo">
            <span id="loses">
              {props.games}
              <br />
            </span>
            <span id="strLoses">Total Games</span>
          </span>
        </div>
        <div className="box">
          <span className="boxInfo">
            <span id="kings">
              {props.kings}
              <br />
            </span>
            <span id="strKing">King Me!</span>
          </span>
        </div>
      </div>
      <img id="image" src={require("./img/p1_img.png")} alt="" />
    </div>
  );
};

export default openGameCard;
