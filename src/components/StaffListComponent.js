import React from 'react';
import { Card, CardImg, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderMenuItem({staff}){
    return (
        <Card>
            <Link to={`/nhanvien/${staff.id}`} >
            <CardTitle className="text-center card-header">{staff.name}</CardTitle>
            <CardImg width="50%" src={staff.image} alt={staff.name} />
            </Link>
        </Card>
    )
}

const NhanVien = (props)=> {
    const staff=props.staffs.map((staff)=>{
        return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-1">
               <RenderMenuItem staff={staff}/>
            </div>
        )
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Nhân viên</h3>
                    <hr />
                </div>
            </div>
            <div className="row mb-1">
                {staff}
            </div>
        </div> 
    );
}
 
export default NhanVien;
