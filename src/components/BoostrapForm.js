import React, { useCallback, useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

const BoostrapForm =() =>{
    const [validated, setValidated] = useState(false);
    const [fields, setFields] = useState({})
    const [formerros, setFormErrors] = useState({})
    const [userAge,setUserAge] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        return () => {
            setFields({})
            setFormErrors({})
        }
    },[])
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let error = formerros
        if (form.checkValidity() === false) {
            if(!fields?.full_name) error["full_name"] = "Enter Full Name"
            if(!formerros?.date_of_birth) error["date_of_birth"] = "Select Date of Birth"
            if(!formerros?.gender) error["gender"] = "Select anyone Option"
            if(!formerros?.email) error["email"] = "Enter Email address"
            if(!formerros?.confirm_email) error["confirm_email"] = "Enter Email Address to Confirm"
            if(!formerros?.phone_number) error["phone_number"] = "Enter Valid Phone Number"
            setFormErrors(error)
            event.preventDefault(); 
        }else{
            console.log(fields)
            navigate('/confirm', { state: fields})
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
    };

    const checkInputText = useCallback((event) => {
        let data = fields
        let error = {...formerros}
        if(event.target.value == ""){
            event.target.classList.add("is-invalid")
            error[event.target.id] = "Enter Full Name"
        }else if(!(/^[a-zA-Z ]*$/.test(event.target.value))){
            event.target.classList.add("is-invalid")
            error[event.target.id] = "Entered Full Name is incorrect"
        }else{
            event.target.classList.remove("is-invalid")
            data[event.target.id] = event.target.value
            error[event.target.id] = ""
            setFields(data)
        }
        setFormErrors(error)
    },[fields])

    const validateAge = useCallback((event) =>{
        let error = {...formerros}
        if(event.target.value != ""){
            let data = fields
            const today = new Date();
            const dob = new Date(event.target.value);
            let age = today.getFullYear() - dob.getFullYear();
            let m = today.getMonth() - dob.getMonth();
            let da = today.getDate() - dob.getDate();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (m < 0) {
                m += 12;
            }
            if (da < 0) {
                da += 30;
            }
            if(age > 18){
                event.target.classList.remove("is-invalid")
                data[event.target.id] = event.target.value
                data["age"] = age
                setFields(data)
                setUserAge(age)
            }else if(age < 0){
                error[event.target.id] ="Invalid Date. Date of birth cannot be a future date."
                event.target.classList.add("is-invalid")
                setUserAge(null)
            }else{
                error[event.target.id] ="User Need to be 18 years above"
                event.target.classList.add("is-invalid")
            }
        }else{
            error[event.target.id] ="Select Date of Birth"
            event.target.classList.add("is-invalid")
        }
        setFormErrors(error)
    },[fields,formerros])

    const validateEmail = useCallback((event) =>{
        let data = fields
        let error = {...formerros}
        if( (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))){
            event.target.classList.remove("is-invalid")
            data[event.target.id] = event.target.value
            error[event.target.id] = ""
            setFields(data)
        }else{
            error[event.target.id] = "Enter Email address"
            event.target.classList.add("is-invalid")
        }
        setFormErrors(error)
    },[fields,formerros])

    const validateConfirmEmail = useCallback((event) => {
        let error = {...formerros}
        let data = fields
        if(event.target.value == ""){
            debugger
            error[event.target.id] ="Enter Email Address to Confirm"
            event.target.classList.add("is-invalid");
        }else if(event.target.value != fields.email){
            error[event.target.id] ="Comfirm Email Address is not matching with Email Address"
            event.target.classList.add("is-invalid");
        }else{
            data[event.target.id] = event.target.value
            setFields(data)
            error[event.target.id] = ""
            event.target.classList.remove("is-invalid");
        }

        setFormErrors(error)
    },[fields,formerros])

    const validateGender = useCallback((val) =>{
        let data = fields
        data["gender"] = val
        setFields(data)
    },[fields])

    const validatePhoneNumber = useCallback((event) =>{
        var phoneno = /^\+91\d{10}$/;
        let data = fields
        let error = {...formerros}
        if(event.target.value == ""){
            error[event.target.id] = "Enter Valid Phone Number"
            event.target.classList.add("is-invalid")
        }else if(event.target.value.match(phoneno)){
            data[event.target.id] = event.target.value
            error[event.target.id] =""
            setFields(data)
            event.target.classList.remove("is-invalid")
        }else{
            error[event.target.id] = "Enter Phone Number as show in eg:+919999999999"
            event.target.classList.add("is-invalid")
        }
        
        setFormErrors(error)
    },[fields,formerros])

    return(
        <Container>
            <div className="wrapperDiv">
                <h2 className="pageHeader">User Form</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="bootstrapForm">
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="full_name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" required placeholder="Enter Full Name" onBlur={checkInputText}/>
                            {formerros.full_name && (<Form.Control.Feedback type="invalid">{formerros.full_name}</Form.Control.Feedback>) }
                            
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="date_of_birth">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="date" required placeholder="Select Date of Birth" onBlur={validateAge}/>
                            {formerros.date_of_birth && <Form.Control.Feedback type="invalid">{formerros.date_of_birth}</Form.Control.Feedback>}
                            <Form.Control className="mt-2" type="text" placeholder="Age" value={userAge || ""} disabled/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Select Gender</Form.Label>
                            <Form.Check id="gender" onClick={()=>validateGender("Male")} className="addMarginLeft" name="gender" required inline label="Male" type='radio' />
                            <Form.Check id="gender" onClick={()=>validateGender("Female")} name="gender" required inline label="Female" type='radio' />
                            {formerros.gender && (<Form.Control.Feedback type="invalid">Select Anyone Gender</Form.Control.Feedback>)}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" required placeholder="Enter Email address" onBlur={validateEmail}/>
                            {formerros.email && (<Form.Control.Feedback type="invalid">{formerros.email}</Form.Control.Feedback>)}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="confirm_email">
                            <Form.Label>Confirm Email Address</Form.Label>
                            <Form.Control type="email" required placeholder="Re-Enter Email address" onBlur={validateConfirmEmail}/>
                            {formerros.confirm_email &&(<Form.Control.Feedback type="invalid">{formerros.confirm_email}</Form.Control.Feedback>)}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control className="showPlaceholderOnFocus" type="text" required placeholder="+919999999999" onBlur={validatePhoneNumber} maxLength={13}/>
                            {formerros.phone_number && (<Form.Control.Feedback type="invalid">{formerros.phone_number}</Form.Control.Feedback>)}
                            
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Button className="btn btn-primary actionBtnSubmit" type="submit">Submit form</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}

export default BoostrapForm