import React from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardText,
	Breadcrumb,
	BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderComments({ comments }) {
	if (comments != null) {
		console.log("comments");
		console.log(comments);
		comments = comments.map((comment) => (
			<ul key={comment.id} className="list-unstyled">
				<li className="mb-2">{comment.comment}</li>
				<li>
					-- {comment.author}&nbsp;,&nbsp;
					{new Intl.DateTimeFormat("en-IN", {
						year: "numeric",
						month: "short",
						day: "2-digit",
					}).format(new Date(Date.parse(comment.date)))}
				</li>
			</ul>
		));
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				{comments}
			</div>
		);
	} else return <div></div>;
}

function RenderDish({ dish }) {
	// console.log("Recieved dish");
	// console.log(dish);
	return (
		<div className="col-12 col-md-5 m-1">
			<Card>
				<CardImg top src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

const DishDetail = (props) => {
	// console.log("props in dish detail");
	// console.log(props);
	// return (
	// 	<div className="container">
	// 		<div className="row">
	// 			<RenderDish dish={props.dish}></RenderDish>
	// 			<RenderComments comments={props.dish.comments}></RenderComments>
	// 		</div>
	// 	</div>
	// );
	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/menu">Menu</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish.name}</h3>
					<hr />
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					<RenderDish dish={props.dish} />
				</div>
				<div className="col-12 col-md-5 m-1">
					<RenderComments comments={props.comments} />
				</div>
			</div>
		</div>
	);
};
// class DishDetail extends Component {
// 	// constructor(props) {
// 	// 	super(props);
// 	// }

// 	renderComments(comments) {
// 		if (comments != null) {
// 			return comments.map((comment) => (
// 				<ul key={comment.id} className="list-unstyled">
// 					<li className="mb-2">{comment.comment}</li>
// 					<li>
// 						-- {comment.author}&nbsp;,&nbsp;
// 						{new Intl.DateTimeFormat("en-IN", {
// 							year: "numeric",
// 							month: "short",
// 							day: "2-digit",
// 						}).format(new Date(Date.parse(comment.date)))}
// 					</li>
// 				</ul>
// 			));
// 		} else return <div></div>;
// 	}

// 	render() {
// 		let dish = this.props.dish;
// 		return (
// 			<div className="container">
// 				<div className="row">
// 					<div className="col-12 col-md-5 m-1">
// 						<Card>
// 							<CardImg top src={dish.image} alt={dish.name} />
// 							<CardBody>
// 								<CardTitle>{dish.name}</CardTitle>
// 								<CardText>{dish.description}</CardText>
// 							</CardBody>
// 						</Card>
// 					</div>
// 					<div className="col-12 col-md-5 m-1">
// 						<h4>Comments</h4>
// 						{this.renderComments(dish.comments)}
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default DishDetail;
