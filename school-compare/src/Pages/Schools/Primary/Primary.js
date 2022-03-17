import React from "react";
import SchoolsCard from "../../../Components/SchoolsCard";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Dropdown from "../../../Components/Dropdown";
import CompareButton from "../../../Components/CompareButton";
import SideDrawer from "../../../Components/SideDrawer";
import data from "../../../JSON/combined_data.json"; // COMBINED DATASET OF EVERYTHING WE NEED

import "../../../ComponentsCSS/PaginationButtons.css";
import "../../../ComponentsCSS/SchoolsCard.css";
import "../../../ComponentsCSS/SchoolSearchBar.css";

function Primary() {
  const [pageNumber, setPageNumber] = useState(0);
  const schoolsPerPage = 20;
  const noOfSchoolsVisited = pageNumber * schoolsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  // initialize schools
  let schools = [];

  if (data !== undefined) {
    // filter to get primary school data
    let index = 0; // to ensure the school appear in numeric order, using i will skip some numbers
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].mainlevel_code === "PRIMARY" ||
        data[i].school_name.toLowerCase().includes("NICHOLAS".toLowerCase())
      ) {
        schools[index++] = data[i];
      }
    }
  }

  // get only the schools we want
  const displaySchools = schools
    .filter((value) => {
      if (searchTerm === "") return value;
      else if (
        value.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.postal_code
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase() ||
              value.mrt_desc.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ) {
        return value;
      }
    })
    .slice(noOfSchoolsVisited, noOfSchoolsVisited + schoolsPerPage)
    .map((school) => (
      <div key={school.school_name}>
        <SchoolsCard data={school} />
      </div>
    ));

  // Determine number of pages

  const pageCount = Math.ceil(schools.length / schoolsPerPage);

  const handlePageClick = (event) => {
    setPageNumber(event.selected);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SideDrawer level="Primary" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown currentPage={"Primary"} />
        <input
          className="search-bar"
          type="text"
          placeholder="Type to Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "70%",
          margin: "auto",
          marginBottom: "1rem",
        }}
      >
        <div className="school-level-title">Primary Schools </div>
        <CompareButton />
      </div>

      {displaySchools}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={8}
        renderOnZeroPageCount={null}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButtons"}
        nextLinkClassName={"nextButtons"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
}

export default Primary;