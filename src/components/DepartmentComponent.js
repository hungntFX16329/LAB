import React from "react";
import { Card, CardBody, CardTitle} from 'reactstrap';

function PhongBan(props){

    let phongban = props.department.map((departments)=>{
        return(
            <div key={departments.id} className="col-md-6 col-lg-4 mt-2">
                <Card>
                    <CardTitle>{departments.name}</CardTitle>
                    <CardBody>Số lượng nhân viên: {departments.numberOfStaff}</CardBody>
                </Card>
            </div>
        )
    })
    return(
        <div className="container">
            <div className="row mt-1 mb-2">
                {phongban}
            </div>
        </div>
    )
}

export default PhongBan;