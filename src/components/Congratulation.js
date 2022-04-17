import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import LoaderImage from "../assets/images/loader.gif"
import Logo from "../assets/images/Datamatics.jpg"

const Congratulation = () =>{
    const { state } = useLocation();
    const [loader, setLoader] = useState(true)
    const [datauploaded,isDataUploaded] = useState(false)
    
    useEffect(()=>{
        fetch("http://localhost:8000/usersdetail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        })
        .then(response => response.json())
        .then(response => {
            console.log(JSON.stringify(response))
            setLoader(false)
            isDataUploaded(true)
        })
        .catch(error => {
            console.error("Error:", error)
            isDataUploaded(false)
            setLoader(false)
        })
    },[])

    if(loader){
        return <Container>
            <Row>
                <Col md={12}>
                    <img src={ LoaderImage } alt="Loader" className="img-fluid d-block m-auto"/>
                </Col>
            </Row>
        </Container>
    }

    return(
        <Container>
            <Row>
                <Col md={12}>
                    <div className="wrapperDiv">
                        <img src={Logo} alt="Datamatics" className="img-fluid" style={{ maxWidth:200}}/>
                        {datauploaded ? <p>Congratulation <b>"{state.full_name}"</b> your information is saved with us, same details are mailed to your personal email id i.e <b>"{state.email}"</b></p> : <p>Some Error Occured Please try again later.</p>}
                        {process.env.NODE_ENV && <div className="text-warning developerNote">Note:Using json-server for ajax call and based on response Congratulation message can be seen <br/> server link: http://localhost:8000/usersdetail</div>}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Congratulation