import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card,CardImg,CardBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


const DepartmentDetail = (props)=>{
   
    let staff=props.staffin.map((staff)=>{
        return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-1">
               <Card>
                    <Link to={`/nhanvien/${staff.id}`} >
                    <CardImg width="50%" src={staff.image} alt={staff.name} />
                    <CardBody className="text-center card-header">{staff.name}</CardBody>
                    </Link>
                </Card>
            </div>
        )
    });
    if(props.departmentsLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.departmentsErrMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.departmentsErrMess}</h4>
                </div>
            </div>
        )
    }
    else
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/PhongBan'>Phòng ban</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.department[0].name}</BreadcrumbItem>
                </Breadcrumb>
        </div>
            <div className="row mb-1" >
                {staff}
            </div>
        </div>
    )
   
}


export default DepartmentDetail; 