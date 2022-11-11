import React, { useEffect, useState } from "react";

import SearchForm from "./SearchForm";
import JoblyApi from "../backend/api/api";
import JobDetails from "./JobDetails";


function JobList() {
  const [jobs, setJobs] = useState([]);
  useEffect(function getJobsOnMount() {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    
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
