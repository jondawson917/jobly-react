import React, { useEffect, useState } from "react";


import SearchForm from "./SearchForm";
import JoblyApi from "../backend/api/api";
import CompanyDetails from "./CompanyDetails";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
    
  }

  return (
    <div >
      <SearchForm search={search} />
      
      <CompanyDetails id="companylist" companies = {companies}/>
    </div>
  );
}

export default CompanyList;
