import React, { useEffect, useState } from "react";
import "./Listings.css";

import FileListing from "./FileListing";

import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import { url } from "../config";

const Listings = ({ onUpload, handleUpload }) => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { Search } = Input;
  // console.log(listings);
  const accessToken = localStorage.getItem("access_token");
  const fetchListings = async () => {
    try {
      const response = await fetch(`${url}/listings`, {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setListings(data.listings);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, [handleUpload]);

  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredListings = listings.filter((listing) =>
    listing?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredListings.length > 0;

  return (
    <>
      <Navbar />
      <div className="mainfile-container">
        <div className="topbar-container">
          <Button
            className="upload-button"
            type="primary"
            onClick={onUpload}
            icon={<PlusOutlined />}
          >
            Upload New File
          </Button>
          {listings.length !== 0 && (
            <Search
              placeholder="Search File"
              onSearch={onSearch}
              onChange={onChange}
              enterButton
              style={{ width: "30%" }}
            />
          )}
        </div>
        {listings.length !== 0 && (
          <div className="files-container">
            {hasResults ? (
              filteredListings.map((listing) => (
                <div key={listing._id} className="file-listing">
                  <FileListing file={listing} fetchListings={fetchListings} />
                </div>
              ))
            ) : (
              <>
                <p>No data found</p>
                {/* <img src="nodata.jpeg" alt="No data found" /> */}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Listings;
