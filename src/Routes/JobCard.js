import React, {useEffect, useContext, useState} from "react";
import UserContext from "../UserContext";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem, Button
  } from "reactstrap";

  const JobCard = ({id, title, salary, equity, companyName}) => {
    const { jobApplication, alreadyApplied} = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedJobs(){
        console.info("JobCard useEffect updateAppliedJobs", "id=", id);
        setApplied(alreadyApplied(id));
    }, [id, alreadyApplied]);

    async function handleApply(evt){
        if (alreadyApplied(id)) return;
        jobApplication(id);
        setApplied(true);
    }

    return (<> <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {title}
          </CardTitle>
          <CardText>Company: {companyName}</CardText>
          <ListGroup>
            <ListGroupItem>{title}</ListGroupItem>
            <ListGroupItem>Job ID: {id}</ListGroupItem>
            {equity ? (
              <ListGroupItem>Equity: {equity}</ListGroupItem>
            ) : null}
          
          <ListGroupItem>Salary: ${salary} Annual</ListGroupItem></ListGroup>
        </CardBody><Button className="btn btn-danger" onClick={handleApply} disabled={applied}>{applied ? "Already Applied" : "Apply"}</Button>
      </Card></>)
  }

export default JobCard;