import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import SeedControl from "./components/SeedControl";
import ErrorControl from "./components/ErrorControl";
import RecordTable from "./components/RecordTable";
import { generateUserData } from "./utils/generateUserData";
import { CSVLink } from "react-csv";
import "./App.css";

const App = () => {
  const [region, setRegion] = useState("USA");
  const [errors, setErrors] = useState(0);
  const [seed, setSeed] = useState(12345);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isLoading = useRef(false);

  useEffect(() => {
    setUsers(generateUserData(region, errors, seed, 20));
  }, [region, errors, seed]);

  const loadMoreUsers = () => {
    if (isLoading.current) return;
    isLoading.current = true;
    setLoading(true);

    setTimeout(() => {
      setUsers((prevUsers) => [
        ...prevUsers,
        ...generateUserData(region, errors, seed + page, 10),
      ]);
      setPage((prevPage) => prevPage + 1);
      isLoading.current = false;
      setLoading(false);
    }, 1000);
  };

  return (
    <div className='container'>
      <div className='toolbar-items'>
        <div>
          <Header
            id='region-select'
            region={region}
            setRegion={setRegion}
          />
        </div>
        <div>
          <div>
            <ErrorControl
              id='error-slider'
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        </div>
        <div>
          <div>
            <SeedControl
              id='seed-input'
              seed={seed}
              setSeed={setSeed}
            />
          </div>
        </div>
        <div className='toolbar-item'>
          <CSVLink
            data={users}
            filename={"users_data.csv"}
            className='btn btn-primary'>
            Export
          </CSVLink>
        </div>
      </div>
      <RecordTable
        users={users}
        loadMoreUsers={loadMoreUsers}
      />
      {loading && <div className='text-center mt-3'>Loading...</div>}
    </div>
  );
};

export default App;
