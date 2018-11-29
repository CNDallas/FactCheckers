import React, {Component} from 'react'
import {AUTHENTICATE, REQUEST_STATS} from '../api/Events'
import "../App.css"
import "./css/NavBar.css";
import io from 'socket.io-client'
import Dashboard from './Dashboard'
import Checkers from './Checkers'
import Chat from "./Chat";
import Stats from"./Stats"
import Login from "./Login"
import Register from "./Register"
import uuidv4 from 'uuid/v4'
const socketUrl = "http://localhost:8081";

class Controller extends Component {

	state = {
		socket: null,
		lobbyId: "Dashboard",
		game: false,
		navigationBar: null,
		message: "Send Message",
		showStats: false,
		stats: {},
		username: "unknown",
		isLoaded: false,
		login: true,
		register: false,

	};

	componentDidMount() {
		this.initSocket()
	}

	initSocket = () => {
		const socket = io(socketUrl);
		const sessionID = uuidv4().substring(0,7); //remove testing and make this work with the PHP cookie
		const username = "Testing"; //remove testing and make this work with the PHP cookie
		let stats;
		socket.on('connect', () => {
			console.log("Connected")
		});
		this.setState({socket,  isLoaded: true})
		// socket.emit(AUTHENTICATE, sessionID, username);
		// socket.username = username;
		// socket.emit(REQUEST_STATS, username, (total_games,wins,total_kings) => {
		// 	stats = {total_games: total_games,wins: wins,total_kings: total_kings};
		// 	console.log("Stats have been loaded")
		// 	this.setState({socket, username, stats, isLoaded: true})
		// });
	};

	moveToGame = (lobbyId) => {
		const game = true;
		console.log("Moving to:" + lobbyId);
		this.setState({game, lobbyId})
	};

	moveToRegister = () => {
		const register = true;
		const login = false;
		console.log("Moving to Register page");
		this.setState({register, login});
	};

	moveToLogin = () => {
		const register = false;
		const login = true;
		console.log("Moving to Login page");
		this.setState({register, login});
	};

	logout = () => {
		//TODO
		const login = true;
		const {socket} = this.state;
		console.log("User is logged out");

		//socket.email(LOGOUT, username);
		this.setState({login});
	};

	loginAccepted = (username) => {
		const login = false;
		const register = false;
		console.log("Move to dashboard");
		this.setState({login, register});
		const {socket} = this.state;
		const sessionID = uuidv4().substring(0,7);
		socket.emit(AUTHENTICATE, sessionID, username);
		socket.username = username;
		//
		let stats;
		socket.emit(REQUEST_STATS, username, (total_games,wins,total_kings) => {
			stats = {total_games: total_games,wins: wins,total_kings: total_kings};
			console.log("Stats have been loaded")
			this.setState({socket, username, stats, isLoaded: true})
		});
	};

	updateNavigationBar = (navigationBar) => {
		this.setState({navigationBar});
	};

	exitGameHandler = () => { //TODO Need to send information to server
		const lobbyId = "Dashboard";
		const game = false;
		this.setState({game,lobbyId});
	};

	viewStatsHandler = () => {
		console.log("Viewing Stats")
		this.setState({showStats:true})
	}

	closeStatsHandler = () => {
		this.setState({showStats:false})
	}

	pmHandler = (username) => {
		console.log("PMING")
		const pmUsername = "/w "+username + " ";
		this.setState({message:pmUsername});
	}

	onMessageChangeHandler = (event) => {
		const sendMessage = event.target.value;
		this.setState({message: sendMessage});
	};

	messageOnClickHandler = (e) => {
		if (e.target.value === "Send Message"){
			this.displayMessage("");
		}
	}
	displayMessage = (message) => {
		this.setState({message})
	}


	render() {

			const {socket, navigationBar, lobbyId, game, message, showStats, username, stats, login, register} = this.state;
			let mainDisplay = <Dashboard socket={socket} moveToGame={this.moveToGame} logout={this.logout}
			                             updateNavigationBar={this.updateNavigationBar} pm={this.pmHandler}
			                             viewStatsHandler={this.viewStatsHandler}/>;
			if (game) {
				mainDisplay = <Checkers socket={socket} lobbyId={lobbyId} updateNavigationBar={this.updateNavigationBar}
				                        exitGame={this.exitGameHandler} viewStatsHandler={this.viewStatsHandler}/>;
			}
			if (login) {
				mainDisplay = <Login socket={socket} updateNavigationBar={this.updateNavigationBar} loginAccepted={this.loginAccepted} moveToRegister={this.moveToRegister}/>;
			}
			if (register) {
				mainDisplay = <Register socket={socket} updateNavigationBar={this.updateNavigationBar} loginAccepted={this.loginAccepted} moveToLogin={this.moveToLogin}/>;
			}

		return (
			this.state.isLoaded?
			<div className="App"><div className='banner'><span className="header"> Checkers</span></div>
				{navigationBar}
			<div className='main'>
				<Stats show={showStats} handleClose={this.closeStatsHandler} username={username} stats={stats}/>
				{mainDisplay}
				<Chat socket={socket} message={message} onChange={this.onMessageChangeHandler} onClick={this.messageOnClickHandler} displayMessage={this.displayMessage}/>
				</div>

			</div>:<div>Page is loading</div>
		);
	}

}

export default Controller;
