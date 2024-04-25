"use client";
import React, { useEffect, useState } from "react";
import { db } from "../db"; //Importing static data
import { faFileExcel } from "@fortawesome/free-solid-svg-icons"; //Font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Font awesome icons
import exportFromJSON from "export-from-json"; //Export to excel library
import Table from "./Table"; //This component is used for displaying the table
const fileName = "download"; //Defining downloadable name of the excel file
const exportType = exportFromJSON.types.xls; //Setting type as file extension

export default function Main() {
  const [totalResult, setTotalResult] = useState(db.length); //to manage total result after searching
  const [page, setPage] = useState(1); //To handle pagination
  const [data, setData] = useState(db); //Main data to show in table
  const [type, setType] = useState("account"); //To handle filter type
  const [order, setOrder] = useState("asc"); //To handle filter order eg:ascending and descending
  const [search, setsearch] = useState(""); //For handling search input value

  // handing onChange of search input to change main data
  const handleSearchChange = (e) => {
    setsearch(e.target.value);
    setData(
      db.filter((obj) => {
        return (
          obj.account
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase()) ||
          obj.email
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase()) ||
          obj.industry
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase()) ||
          obj.phone
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase()) ||
          obj.website
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase())
        );
      })
    );
  };

  // handleing filter whenever order and type changes
  useEffect(() => {
    const newData = [...db];
    if (order === "asc") {
      newData.sort((j, k) => (j[type] > k[type] ? 1 : -1));
    } else {
      newData.sort((j, k) => (j[type] > k[type] ? 1 : -1)).reverse();
    }
    setData(newData);
  }, [order, type]);

  // updating total result count based on filtered data length
  useEffect(() => {
    setTotalResult(data.length);
  }, [data]);

  // Invoking excel file download function
  const hanldeExcelDownload = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <div className="bg-white min-h-full rounded-md p-3 shadow-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h1 className="font-bold text-2xl">Account lists</h1>
          <p>Here's a list of your accounts</p>
        </div>
        {/* Filter UI */}
        {/* <div className="flex gap-2">
          <p>Sort by : </p>
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
              id="type"
            >
              <option value="account">Account</option>
              <option value="email">Email</option>
              <option value="phone">Phone no</option>
              <option value="website">Website</option>
              <option value="industry">Industry</option>
            </select>
            <select
              value={order}
              name="order"
              id="order"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div> */}
        <p className="text-xs">
          Sorted by {order} order ({type}){" "}
        </p>
        {/* Excel download button and search bar */}
        <div className="flex gap-4 items-center mx-16 z-10 -mb-40">
          <FontAwesomeIcon
            onClick={hanldeExcelDownload}
            className="text-xl cursor-pointer"
            icon={faFileExcel}
            style={{ color: "#009900" }}
          />
        </div>
      </div>
      {/* Rendering Table */}
      <Table
        data={data}
        totalResult={totalResult}
        page={page}
        setPage={setPage}
        setData={setData}
        setType={setType}
        setOrder={setOrder}
      ></Table>
    </div>
  );
}
