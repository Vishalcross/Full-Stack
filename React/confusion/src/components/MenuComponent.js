import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

function RenderMenuItem({ dish, onClick }) {
	return (
		<Card onClick={() => onClick(dish.id)}>
			<CardImg width="100%" src={dish.image} alt={dish.name} />
			<CardImgOverlay>
				<CardTitle>{dish.name}</CardTitle>
			</CardImgOverlay>
		</Card>
	);
}

const Menu = (props) => {
	// console.log(`Menu Props`);
	// console.log(props);
	const menu = props.dishes.map((dish) => {
		return (
			<div className="col-12 col-md-5 m-1" key={dish.id}>
				<RenderMenuItem dish={dish} onClick={props.onClick} />
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row">{menu}</div>
		</div>
	);
};

// class Menu extends Component {
// 	// constructor(props) {
// 	// 	super(props);
// 	// }

// 	componentDidMount() {
// 		// console.log("Component did mount for menu");
// 	}

// 	render() {
// 		const menu = this.props.dishes.map((dish) => {
// 			return (
// 				<div key={dish.id} className="col-12 col-md-5 m-1">
// 					<Card
// 						key={dish.id}
// 						onClick={() => this.props.onClick(dish.id)}
// 					>
// 						<CardImg
// 							width="100%"
// 							src={dish.image}
// 							alt={dish.name}
// 						/>
// 						<CardImgOverlay className="ml-5">
// 							<CardTitle>{dish.name}</CardTitle>
// 						</CardImgOverlay>
// 					</Card>
// 				</div>
// 			);
// 		});
// 		// console.log("Running menu render");
// 		return (
// 			<div className="container">
// 				<div className="row">{menu}</div>
// 			</div>
// 		);
// 	}
// }

export default Menu;

/*
Default component stuff
import React, { Component } from "react";

class Menu extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (

        );
    }
}

export default Menu;
*/
