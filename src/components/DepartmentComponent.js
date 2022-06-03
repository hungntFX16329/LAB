import React from "react";
import { Card, CardBody, CardHeader} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';

//Presentational Component

function Hienthiphongban({department}){
    return(
        <Card>
            <Link to={`/phongban/${department.id}`} >
            <CardHeader className="text-center">{department.name}</CardHeader>
            <CardBody>Số lượng nhân viên: {department.numberOfStaff}</CardBody>
            </Link>
        </Card>
    )
}

//Container Component

function PhongBan(props){

    let phongban = props.department.departments.map((departments)=>{
        return(
            <div key={departments.id} className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
                <Hienthiphongban department={departments}/>
            </div>
        )
    })
    if (props.department.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.department.errMess){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.department.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }
    else
    return(
        <div className="container">
            <div className="row shadow m-3">
                {phongban}
            </div>
        </div>
    )
}

export default PhongBan;