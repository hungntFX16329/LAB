import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

    function RenderDish({dish}){
        return(
            <Card>
                 <CardImg width="100%" src={dish.image} alt={dish.name} />
                 <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                 </CardBody>
            </Card>
        );
    }


    function RenderComment({commentArray}){
        let comment = commentArray.map((comments)=>{
            if (comments != null)
                return (
                    <div key={comments.id}>
                        <ul style={{ listStyle: 'none',margin:0,padding:"10px"}}>
                            <li>{comments.comment}</li>
                            <li>--{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
                        </ul>
                    </div>
                )
            else {
                return <div></div>
            }
        })
        return (
            <div className="container">
                <div className="row"> 
                    <h4>Comments</h4>
                    <div>
                    {comment}
                    </div>
                </div>
            </div>
        )
        
    }

    const DishDetail = (props)=>{
        let dish = props.dish
        if(dish !=null)
            return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment commentArray={dish.comments} />
                    </div>
                </div> 
            </div>
        )
        else {
            return (
                <div></div>
            )
        }
    }


export default DishDetail; 