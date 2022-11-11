import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home() {
  
  return (
    <main>
      <section className="col-md-8">
        <Card>
          <CardBody className="text-center">
            <CardTitle>
              <h2 className="font-weight-bold">
                Welcome to $inkedIn! $ink into getting more experience!
              </h2>
            </CardTitle>
            <Link to="/signup">Signup</Link>
            <br />
            <br />
            <Link to="/login">Login</Link>
          </CardBody>
     
        </Card>
      </section>
    </main>
  );
}

export default Home;
