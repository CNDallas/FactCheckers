import React, {Component} from 'react'
import {AUTHENTICATE} from '../api/Events'
import io from 'socket.io-client'
import Dashboard from './Dashboard'
import Checkers from './Checkers'
import uuidv4 from 'uuid/v4'
const socketUrl = "http://localhost:8081";


class Controller extends Component {

	initSocket = () => {
		const socket = io(socketUrl);
		const sessionID = uuidv4().substring(0,7); //remove testing and make this work with the PHP cookie
		const username = "User" + uuidv4().substring(0,7); //remove testing and make this work with the PHP cookie
		socket.on('connect', () => {
			console.log("Connected")
		});
		socket.emit(AUTHENTICATE, sessionID, username);
		socket.username = username;
		this.setState({socket})
	};

	moveToGame = (lobbyId) => {
		const game = true;
		console.log("Moving to:" + lobbyId);
		this.setState({game, lobbyId})
	};

	logout = () => {
		//TODO
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			socket: null,
			lobbyId: '',
			game: false,
		};
	}

	componentWillMount() {
		this.initSocket()
	}



	render() {
		const {socket, lobbyId, game} = this.state;
		return (
			<div className="display">
				{
					!game?<Dashboard socket={socket} moveToGame={this.moveToGame} logout={this.logout}/>:
						<Checkers socket={socket} lobbyId = {lobbyId}/>
					//<Login socket={socket} setLogin={this.setLogin}/>:
				}
			</div>
		);
	}

}

export default Controller;
