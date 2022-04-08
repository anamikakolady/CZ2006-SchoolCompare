import React from "react";
import CCACard from "../../../Components/CCACard";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Dropdown from "../../../Components/Dropdown";
//import CompareButton from "../../../Components/CompareButton";
import SideDrawer from "../../../Components/SideDrawer";
//import data from "../../../JSON/combined_data.json"; // COMBINED DATASET OF EVERYTHING WE NEED

import "../../../ComponentsCSS/PaginationButtons.css";
import "../../../ComponentsCSS/SchoolsCard.css";
import "../../../ComponentsCSS/SchoolSearchBar.css";

import { SchoolsContext } from "../../../Contexts/SchoolsContext";
import { useContext } from "react";

function TertiaryCCA() {
  const [pageNumber, setPageNumber] = useState(0);
  const schoolsPerPage = 20;
  const noOfSchoolsVisited = pageNumber * schoolsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  const { schoolsContext } = useContext(SchoolsContext);
  let data = schoolsContext.schools;

  // initialize schools
  let schools = [];

  if (data !== undefined) {
    // filter to get primary school data
    let index = 0; // to ensure the school appear in numeric order, using i will skip some numbers
    for (let i = 0; i < data.length; i++) {
      if (
        /* Total 18 entries*/
        (data[i].mainlevel_code.toLowerCase() ===
          "JUNIOR COLLEGE".toLowerCase() ||
          (data[i].school_name
            .toLowerCase()
            .includes("INSTITUTION".toLowerCase()) &&
            !data[i].school_name
              .toLowerCase()
              .includes("JUNIOR".toLowerCase())) ||
          (data[i].mainlevel_code.toLowerCase() ===
            "MIXED LEVELS".toLowerCase() &&
            (data[i].school_name
              .toLowerCase()
              .includes("TEMASEK".toLowerCase()) ||
              data[i].school_name
                .toLowerCase()
                .includes("NATIONAL".toLowerCase()) ||
              data[i].school_name
                .toLowerCase()
                .includes("JUNIOR COLLEGE".toLowerCase()) ||
              data[i].school_name
                .toLowerCase()
                .includes("DUNMAN".toLowerCase()) ||
              data[i].school_name
                .toLowerCase()
                .includes("RIVER".toLowerCase()) ||
              data[i].school_name
                .toLowerCase()
                .includes("INDEPENDENT".toLowerCase())))) &&
        ((data[i].physical_sports !== undefined &&
          data[i].physical_sports.length > 0) ||
          (data[i].visual_and_pa !== undefined &&
            data[i].visual_and_pa.length > 0) ||
          (data[i].clubs_and_societies !== undefined &&
            data[i].clubs_and_societies.length > 0) ||
          (data[i].uniformed_groups !== undefined &&
            data[i].uniformed_groups.length > 0) ||
          (data[i].others !== undefined && data[i].others.length > 0))
      ) {
        schools[index++] = data[i];
      }
    }

    // because api id not in numeric order
    schools.sort((a, b) => {
      return a._id - b._id;
    });
  }

  // get only the schools we want
  const displaySchools = schools
    .filter((value) => {
      if (searchTerm === "") return value;
      else if (
        value.school_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return value;
      }
    })
    .slice(noOfSchoolsVisited, noOfSchoolsVisited + schoolsPerPage)
    .map((school) => (
      <div key={school.school_name}>
        <CCACard data={school} level="tertiary" />
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
      <SideDrawer level="Tertiary" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown currentPage={"Tertiary"} />
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
        <div className="school-level-title">Tertiary Schools </div>
        {/* <CompareButton /> */}
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

export default TertiaryCCA;
