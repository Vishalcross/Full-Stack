import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import DishDetail from "./DishDetailComponent";
class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDish: null,
		};
		console.log("Constructor for menu");
	}

	componentDidMount() {
		console.log("Component did mount for menu");
	}

	onDishSelect(dish) {
		this.setState({ selectedDish: dish });
	}

	renderDish(dish) {
		if (dish != null) {
			console.log(dish);
			return <DishDetail dish={dish} />;
		} else return <div></div>;
	}

	render() {
		const menu = this.props.dishes.map((dish) => {
			return (
				<div key={dish.id} className="col-12 col-md-5 m-1">
					<Card onClick={() => this.onDishSelect(dish)}>
						<CardImg
							width="100%"
							src={dish.image}
							alt={dish.name}
						/>
						<CardImgOverlay className="ml-5">
							<CardTitle>{dish.name}</CardTitle>
						</CardImgOverlay>
					</Card>
				</div>
			);
		});
		console.log("Running menu render");
		return (
			<div className="container">
				<div className="row">{menu}</div>
				{this.renderDish(this.state.selectedDish)}
			</div>
		);
	}
}

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
