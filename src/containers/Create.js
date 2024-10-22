import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const Create = () => {
  const { id } = useParams();  // Get the id from the URL

  return (
    <h1>
      <Ionicon icon="ios-add" fontSize="50px" color="#007bff" />
      Create
      {id ? `: ${id}` : ''}  {/* Show the id if it's present */}
    </h1>
  );
}

export default Create;
