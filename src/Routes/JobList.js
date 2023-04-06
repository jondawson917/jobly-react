import React, { useEffect, useState } from "react";

import SearchForm from "./SearchForm";
import API from "../api/api";
import JobDetails from "./JobDetails";


function JobList() {
  const [jobs, setJobs] = useState([]);
  useEffect(function getJobsOnMount() {
    search();
  }, []);

  async function search(title) {
    let jobs = await API.getJobs(title);
    
    setJobs(jobs); 
  }
  return (
    <div>
      <SearchForm search={search} />
      <>
      <JobDetails jobs={jobs} /></>
      </div>
  );
}

export default JobList;
