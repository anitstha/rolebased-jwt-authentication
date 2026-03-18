import axios from "axios";
import React, { useEffect, useState } from "react";

const GetSchools = () => {
  const [schools, setSchools] = useState([]); // initialize as array

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://91.108.111.41:8082/api/super-admin/schools",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // extract the array from the 'content' property
        setSchools(response.data.content || []);
        console.log("Schools array:", response.data.content);
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Schools</h1>
      {schools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <ul>
          {schools.map((school) => (
            <li key={school.id} className="border p-2 my-2 rounded flex items-center gap-4">
              <img
                src={school.logoUrl}
                alt={school.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>
                {school.name} - {school.subdomain}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetSchools;