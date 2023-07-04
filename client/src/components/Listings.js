import React, { useEffect, useState } from "react";
import "./Listings.css";

import FileListing from "./FileListing";
import NoDoc from "./NoDoc";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Listings = ({ onUpload, handleUpload }) => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { Search } = Input;
  // console.log(listings);
  const accessToken = localStorage.getItem("access_token");
  const fetchListings = async () => {
    try {
      const response = await fetch("http://localhost:8080/listings", {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`, // Set the access token from localStorage
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
    console.log(value);
    setSearchQuery(value);
  };

  const filteredListings = listings.filter((listing) =>
    listing?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (listings.length === 0) return <NoDoc />;
  const hasResults = filteredListings.length > 0;

  return (
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
        <Search
          placeholder="Search File"
          onSearch={onSearch}
          enterButton
          style={{ width: "30%" }}
        />
      </div>

      <div className="files-container">
        {hasResults ? (
          filteredListings.map((listing) => (
            <div key={listing._id} className="file-listing">
              <FileListing file={listing} fetchListings={fetchListings} />
            </div>
          ))
        ) : (
          <>
            <img src="nodata.jpeg" alt="No data found" />
          </>
        )}
      </div>
    </div>
  );
};

export default Listings;
