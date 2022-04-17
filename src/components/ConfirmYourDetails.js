import React from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmYourDetails = () =>{
    const { state } = useLocation();
    const navigate = useNavigate();

    const navigateToUpload = () =>{
        navigate('/congratulation', { state: state})
    }

    return(
        <Container>
            <Row>
                <Col md={12}>
                    <div className="wrapperDiv">
                        <h2 className="pageHeader">Confirm Your Details</h2>
                        <Table responsive="sm" striped bordered className="confirmDetails">
                            {/* <tbody>
                                {Object.keys(state).map((item)=>{
                                    const keyName = item.replaceAll("_"," ")
                                    return <tr key={item}>
                                        <td className="heading">{keyName}</td>
                                        <td>{state[item]}</td>
                                    </tr>
                                })}
                            </tbody> */}
                            <tbody>
                                <tr>
                                    <td className="heading">Full Name</td>
                                    <td>{state["full_name"]}</td>
                                </tr>
                                <tr>
                                    <td className="heading">Date of Birth</td>
                                    <td>{state["date_of_birth"]}</td>
                                </tr>
                                <tr>
                                    <td className="heading">Age</td>
                                    <td>{state["age"]}</td>
                                </tr>
                                <tr>
                                    <td className="heading">Gender</td>
                                    <td>{state["gender"]}</td>
                                </tr>
                                <tr>
                                    <td className="heading">Email</td>
                                    <td>{state["email"]}</td>
                                </tr>
                                <tr>
                                    <td className="heading">Confirm Email</td>
                                    <td>{state["confirm_email"]}</td>
                                </tr>
                                <tr>
                                    <td className="heading">Phone Number</td>
                                    <td>{state["phone_number"]}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <button className="btn btn-primary" onClick={navigateToUpload}>Submit Details to Upload</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ConfirmYourDetails