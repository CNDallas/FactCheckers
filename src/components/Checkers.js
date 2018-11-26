import React, {Component} from 'react'
import 'tachyons'
import "./css/Checkers.css"
import uuidv4 from "uuid/v4";
import NavBar from "./NavBar";
//import "./checkers_client"; //Leaving out as it throws a bunch of errors atm

class Checkers extends Component {
	constructor(props, context) {
		super(props, context);
		this.navigationBarUpdater();
	};

	navigationBarUpdater = () => {
		const navItems = [
			{func: this.props.exitGame, text: 'Exit Game', key: uuidv4()},
			{func: this.viewStats, text: 'View Stats', key: uuidv4()},
			{func: this.props.logout, text: 'Logout', key: uuidv4()}
		];
		const nBar = <NavBar linkItems={navItems}/>;
		this.props.updateNavigationBar(nBar)
	};

	badHTML = () => {
		return (
			<div className="gameBoard">
			<table id="board">
				<tr id="row1">
					<td id="cell0" onclick="selectCell(this)"></td>
					<td id="cell1" onclick="selectCell(this)"></td>
					<td id="cell2" onclick="selectCell(this)"></td>
					<td id="cell3" onclick="selectCell(this)"></td>
					<td id="cell4" onclick="selectCell(this)"></td>
					<td id="cell5" onclick="selectCell(this)"></td>
					<td id="cell6" onclick="selectCell(this)"></td>
					<td id="cell7" onclick="selectCell(this)"></td>
				</tr>
				<tr id="row2">
					<td id="cell8" onclick="selectCell(this)"></td>
					<td id="cell9" onclick="selectCell(this)"></td>
					<td id="cell10" onclick="selectCell(this)"></td>
					<td id="cell11" onclick="selectCell(this)"></td>
					<td id="cell12" onclick="selectCell(this)"></td>
					<td id="cell13" onclick="selectCell(this)"></td>
					<td id="cell14" onclick="selectCell(this)"></td>
					<td id="cell15" onclick="selectCell(this)"></td>
				</tr>
				<tr id="row3">
					<td id="cell16" onclick="selectCell(this)"></td>
					<td id="cell17" onclick="selectCell(this)"></td>
					<td id="cell18" onclick="selectCell(this)"></td>
					<td id="cell19" onclick="selectCell(this)"></td>
					<td id="cell20" onclick="selectCell(this)"></td>
					<td id="cell21" onclick="selectCell(this)"></td>
					<td id="cell22" onclick="selectCell(this)"></td>
					<td id="cell23" onclick="selectCell(this)"></td>
				</tr>
				<tr id="row4">
					<td id="cell24" onclick="selectCell(this)"></td>
					<td id="cell25" onclick="selectCell(this)"></td>
					<td id="cell26" onclick="selectCell(this)"></td>
					<td id="cell27" onclick="selectCell(this)"></td>
					<td id="cell28" onclick="selectCell(this)"></td>
					<td id="cell29" onclick="selectCell(this)"></td>
					<td id="cell30" onclick="selectCell(this)"></td>
					<td id="cell31" onclick="selectCell(this)"></td>
				</tr>
				<tr id="row5">
					<td id="cell32" onclick="selectCell(this)"></td>
					<td id="cell33" onclick="selectCell(this)"></td>
					<td id="cell34" onclick="selectCell(this)"></td>
					<td id="cell35" onclick="selectCell(this)"></td>
					<td id="cell36" onclick="selectCell(this)"></td>
					<td id="cell37" onclick="selectCell(this)"></td>
					<td id="cell38" onclick="selectCell(this)"></td>
					<td id="cell39" onclick="selectCell(this)"></td>
				</tr>
				<tr id="row6">
					<td id="cell40" onclick="selectCell(this)"></td>
					<td id="cell41" onclick="selectCell(this)"></td>
					<td id="cell42" onclick="selectCell(this)"></td>
					<td id="cell43" onclick="selectCell(this)"></td>
					<td id="cell44" onclick="selectCell(this)"></td>
					<td id="cell45" onclick="selectCell(this)"></td>
					<td id="cell46" onclick="selectCell(this)"></td>
					<td id="cell47" onclick="selectCell(this)"></td>
				</tr>
				<tr id="row7">
					<td id="cell48" onclick="selectCell(this)"></td>
					<td id="cell49" onclick="selectCell(this)"></td>
					<td id="cell50" onclick="selectCell(this)"></td>
					<td id="cell51" onclick="selectCell(this)"></td>
					<td id="cell52" onclick="selectCell(this)"></td>
					<td id="cell53" onclick="selectCell(this)"></td>
					<td id="cell54" onclick="selectCell(this)"></td>
					<td id="cell55" onclick="selectCell(this)"></td>
				</tr>
				<tr id="row8">
					<td id="cell56" onclick="selectCell(this)"></td>
					<td id="cell57" onclick="selectCell(this)"></td>
					<td id="cell58" onclick="selectCell(this)"></td>
					<td id="cell59" onclick="selectCell(this)"></td>
					<td id="cell60" onclick="selectCell(this)"></td>
					<td id="cell61" onclick="selectCell(this)"></td>
					<td id="cell62" onclick="selectCell(this)"></td>
					<td id="cell63" onclick="selectCell(this)"></td>
				</tr>
			</table>
		</div>
		)
	};






	render(){
		const {lobbyId} = this.props;
		return (
			<div>
			CHECKERS! - {lobbyId}
				{this.badHTML()}
			</div>
		)}
}

export default Checkers;
