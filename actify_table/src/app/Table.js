import React, { useEffect, useState } from "react";
import Pagination from "./shared/Pagination";
import { db } from "../db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Up from "./icons/Up";
import Down from "./icons/Down";

export default function Table({
  data,
  totalResult,
  setPage,
  page,
  setData,
  setType,
  setOrder,
}) {
  const [search, setSearch] = useState("");
  const [tableSchema, setTableSchema] = useState({
    account: true,
    email: true,
    phoneNo: true,
    webSite: true,
    industry: true,
    status: true,
    action: true,
  });
  const hanldeSorting = (type, order) => {
    setType(type);
    setOrder(order);
  };
  useEffect(() => {
    setData(
      db.filter((obj) => {
        return obj.account
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      })
    );
  }, [search, setData]);
  return (
    <div className="flex flex-col w-[99vw] mx-auto">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Here..."
              className="border px-1 rounded mb-8 w-40 indent-3"
            />
            <table className="sm:min-w-full">
              {/* Table Header */}
              <thead className="bg-blue-200 border-b">
                <tr>
                  {tableSchema.account && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex justify-between items-center w-max gap-4">
                        <div>Date Time</div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div
                              onClick={() => {
                                hanldeSorting("account", "asc");
                              }}
                            >
                              <Up />
                            </div>
                            <div
                              onClick={() => {
                                hanldeSorting("account", "desc");
                              }}
                            >
                              <Down />
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  )}
                  {tableSchema.email && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>Test Name</div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div
                              onClick={() => {
                                hanldeSorting("email", "asc");
                              }}
                            >
                              <Up />
                            </div>
                            <div
                              onClick={() => {
                                hanldeSorting("email", "desc");
                              }}
                            >
                              <Down />
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  )}
                  {tableSchema.phoneNo && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>Correct</div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div
                              onClick={() => {
                                hanldeSorting("phone", "asc");
                              }}
                            >
                              <Up />
                            </div>
                            <div
                              onClick={() => {
                                hanldeSorting("phone", "desc");
                              }}
                            >
                              <Down />
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  )}
                  {tableSchema.webSite && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>Incorrect</div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div
                              onClick={() => {
                                hanldeSorting("website", "asc");
                              }}
                            >
                              <Up />
                            </div>
                            <div
                              onClick={() => {
                                hanldeSorting("website", "desc");
                              }}
                            >
                              <Down />
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  )}
                  {tableSchema.industry && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">Minimum </div>
                      </div>
                    </th>
                  )}
                  {tableSchema.status && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>Status</div>
                        <div className="flex items-center gap-2"></div>
                      </div>
                    </th>
                  )}
                  {tableSchema.action && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      <div>Actions</div>

                      {/* <div className="flex justify-between">Actions</div> */}
                    </th>
                  )}
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {data.length > 0 &&
                  data.slice(10 * (page - 1), page * 10).map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className={`${
                          i % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } border-b`}
                      >
                        {tableSchema.account && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.account}
                          </td>
                        )}
                        {tableSchema.phoneNo && (
                          <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                            {item.email}
                          </td>
                        )}
                        {tableSchema.phoneNo && (
                          <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                            {item.phone}
                          </td>
                        )}
                        {tableSchema.phoneNo && (
                          <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                            {item.website}
                          </td>
                        )}
                        {tableSchema.industry && (
                          <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                            {item.industry}
                          </td>
                        )}
                        {tableSchema.status && (
                          <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                            {item.status}
                          </td>
                        )}
                        {tableSchema.action && (
                          <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                              />
                            </svg>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {data.length === 0 ? (
        <p className="text-center mt-10">🚫 No record found</p>
      ) : (
        // Pagination
        <Pagination
          total={totalResult}
          page={page}
          setPage={setPage}
        ></Pagination>
      )}
    </div>
  );
}
