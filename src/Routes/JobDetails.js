import React from "react";

import "./JobDetails.css"
import JobCard from "./JobCard";
function JobDetails({ jobs }) {
  /*Maps jobs to cards using react strap */






  return (
    <div id="jobslist">
      {jobs.map((j) => (
        <JobCard key={j.id}
        id={j.id}
        title={j.title}
        salary={j.salary}
        equity={j.equity}
        companyName={j.companyName}/>
      ))}
      </div>
  );
}
export default JobDetails;
