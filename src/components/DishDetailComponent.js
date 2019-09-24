import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody, ModalHeader, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

//  class DishDetail extends Component {

//     componentDidMount() {
//         console.log('Dishdetail Component componentDidMount is invoked.')
//     }

//     componentDidUpdate() {
//         console.log('Dishdetail Component componentDidUpdate is invoked.')
//     }

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComment({ comments, postComment, dishId }) {

    console.log('DishDetail Component render invoked.')

    if (comments == null) {
        return (
            <div></div>
        );
    }


    const comment = comments.map((comment) => {
        return (
            <Fade in>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},&nbsp;{new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(Date.parse(comment.date)))}</p>
                </li>
            </Fade>
        );
    })


    return (
        <div className="col-12 col-md-5 m-1">
            <h4>comments </h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {comment}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment} />
            </ul>
        </div>
    )
}

const DishDetail = (props) => {

    const dishDetail = <RenderDish dish={props.dish} />

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null) {
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
                    {dishDetail}
                    <RenderComment comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        );
    }
    else
        return (<div></div>);
}

export default DishDetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleSubmit(values) {
        // alert("Current state is " + JSON.stringify(values));
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {

        return (

            <>
                <Button className="bg-white text-dark" onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span>{' '}Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>Please Select</option>
                                        <option>5</option>
                                        <option>4</option>
                                        <option>3</option>
                                        <option>2</option>
                                        <option>1</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" name="author" className="form-control" id="author" placeholder="Your Name"
                                        validators={{ required, minLength: minLength(2), maxLength: maxLength(15), }}></Control.text>
                                    <Errors model=".author" className="text-danger" show="touched"
                                        messages={{ required: "Required", minLength: "Must be greater than 1 characters", maxLength: 'Must be 15 characters or less', }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment" className="form-control" id="comment" rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }

}