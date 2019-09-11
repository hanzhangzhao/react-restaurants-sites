import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComment({ comments }) {

    console.log('DishDetail Component render invoked.')

    if (comments == null) {
        return (
            <div></div>
        );
    }

    const comment = comments.map((comment) => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},&nbsp;{new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        );
    })

    return (
        <div className="col-12 col-md-5 m-1">
            <h4>comments </h4>
            <ul className="list-unstyled">
                {comment}
            </ul>
        </div>
    )
}

const DishDetail = (props) => {
    const dish = props.dish
    if (dish == null) {
        return (
            <div></div>
        )
    }
    const dishDetail = <RenderDish dish={props.dish} />

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
                <RenderComment comments={props.comments} />
            </div>
        </div>
    );
}



export default DishDetail;