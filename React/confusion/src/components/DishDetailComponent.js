import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardText,
	Breadcrumb,
	BreadcrumbItem,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Button,
	Row,
	Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			firstname: "",
			lastname: "",
			telnum: "",
			email: "",
			agree: false,
			contactType: "Tel.",
			message: "",
			touched: {
				firstname: false,
				lastname: false,
			},
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		console.log(`Event is ${target.value}`);
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(values) {
		console.log("Current State is: " + JSON.stringify(values));
		console.log(this.props);
		this.toggleModal();
		this.props.postComment(
			this.props.dishId,
			values.rating,
			values.author,
			values.comment
		);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleBlur = (field) => (event) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true },
		});
	};

	validate(firstname, lastname, telnum, email) {
		let errors = {
			firstname: "",
			lastname: "",
			telnum: "",
			email: "",
		};
		return errors;
	}

	render() {
		// const errors = this.validate(
		// 	this.state.firstname,
		// 	this.state.lastname,
		// 	this.state.telnum,
		// 	this.state.email
		// );
		const required = (val) => val && val.length;
		const maxLength = (len) => (val) => !val || val.length <= len;
		const minLength = (len) => (val) => val && val.length >= len;
		return (
			<div>
				<Button
					className="btn btn-light"
					outline
					onClick={this.toggleModal}
				>
					<span className="fa fa-pencil fa-lg"></span> Submit Comment
				</Button>
				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}
				>
					<ModalHeader toggle={this.toggleModal}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleSubmit(values)}
						>
							<Row className="form-group">
								<Label md={12} htmlFor="rating">
									Rating
								</Label>
								<Col md={12}>
									<Control.select
										model=".rating"
										id="rating"
										name="rating"
										className="form-control"
										validators={{
											required,
										}}
									>
										<option
											value="blank"
											selected
											disabled
											hidden
										>
											Rate the dish from 1-5
										</option>
										<option value="5">5</option>
										<option value="4">4</option>
										<option value="3">3</option>
										<option value="2">2</option>
										<option value="1">1</option>
									</Control.select>
									<Errors
										className="text-danger"
										model=".rating"
										show="touched"
										messages={{
											required: "Required",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} htmlFor="author">
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											minLength:
												"Must be greater than 3 characters",
											maxLength:
												"Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} htmlFor="comment" md={2}>
									Comment
								</Label>
								<Col md={12}>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										rows="6"
										className="form-control"
										validators={{
											required,
										}}
									/>
									<Errors
										className="text-danger"
										model=".comment"
										show="touched"
										messages={{
											required: "Required",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 10 }}>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

function RenderComments({ comments, postComment, dishId }) {
	if (comments != null) {
		console.log("comments");
		console.log(comments);
		comments = (
			<Stagger in>
				{comments.map((comment) => {
					return (
						<Fade in>
							<li key={comment.id}>
								<p>{comment.comment}</p>
								<p>
									-- {comment.author} ,{" "}
									{new Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "short",
										day: "2-digit",
									}).format(
										new Date(Date.parse(comment.date))
									)}
								</p>
							</li>
						</Fade>
					);
				})}
			</Stagger>
		);
		return (
			<div className="col-12 col-md-auto m-1">
				<h4>Comments</h4>
				{comments}
				<CommentForm dishId={dishId} postComment={postComment} />
			</div>
		);
	} else return <div></div>;
}

function RenderDish({ dish }) {
	// console.log("Recieved dish");
	// console.log(dish);
	return (
		<div className="col-12 col-md-auto m-1">
			<FadeTransform
				in
				transformProps={{
					exitTransform: "scale(0.5) translateY(-50%)",
				}}
			>
				<Card>
					<CardImg top src={baseUrl + dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>
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
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>
							{props.dish.name}
						</BreadcrumbItem>
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
						<RenderComments
							comments={props.comments}
							postComment={props.postComment}
							dishId={props.dish.id}
						/>
					</div>
				</div>
			</div>
		);
	}
};
export default DishDetail;
