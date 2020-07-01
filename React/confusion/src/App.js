import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
class App extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Main />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
