import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./CompanyDetails.css"
function CompanyDetails({ companies }) {
  return (
    <div id="companylist">
      {companies.map((c, idx) => (
        <Card key={idx} >
          <CardBody>
            <CardTitle className="font-weight-bold text-center">
              {c.handle}
            </CardTitle>
            <CardText>Company Name: {c.name}</CardText>
            <ListGroup>
              <ListGroupItem>{c.name}</ListGroupItem>

              <ListGroupItem>Description: {c.description}</ListGroupItem>
              <ListGroupItem>#Employees: {c.numEmployees}</ListGroupItem>
            </ListGroup>
            <img
              src={c.logoUrl}
            alt ="Not Found"
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default CompanyDetails;
