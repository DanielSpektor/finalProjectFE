import React, {useState} from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchBar.css";

function SearchBar () {

    const [input, setInput] = useState("")

    const fetchData = (value) => {
        fetch("http://localhost:3000")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return(
        <div className="input-wrapper">
            <FontAwesomeIcon icon={faSearch} id="search-icon"/>
            <input className="input-search" 
                placeholder="Type to search.." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}/>
        </div>
    );
}



export default SearchBar;
