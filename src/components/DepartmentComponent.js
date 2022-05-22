import React from "react";
import { Card, CardBody, CardHeader} from 'reactstrap';

function PhongBan(props){

    let phongban = props.department.map((departments)=>{
        return(
            <div key={departments.id} className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
                <Card>
                    <CardHeader className="text-center">{departments.name}</CardHeader>
                    <CardBody>Số lượng nhân viên: {departments.numberOfStaff}</CardBody>
                </Card>
            </div>
        )
    })
    return(
        <div className="container">
            <div className="row shadow m-3">
                {phongban}
            </div>
        </div>
    )
}

export default PhongBan;