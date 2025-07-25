import React, { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import commnApiEndpoint from "../common/backendAPI.jsx";
import SkeletonLoader from "../components/SkeletonLoader.jsx";
import DoctorCard from "../components/DoctorCard.jsx";

const ConsultationPage = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doctorInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(commnApiEndpoint.doctorInfo.url);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setDoctorData(data.data);
    } catch (error) {
      console.error("Something went wrong:", error);
      setError("Failed to fetch doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const doctorInfo = async () => {
      try {
        const response = await fetch(commnApiEndpoint.doctorInfo.url, {
          method: "GET",
        });
        const data = await response.json();
        setDoctorData(data.data);
        console.log("doctor details:", data.data);
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };

    doctorInfo();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-gray-300 font-sans overflow-hidden">
      
      {/* Sidebar with scrollable Doctor List */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-950/50 p-6 border-r border-slate-800">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Doctors <span role="img" aria-label="stethoscope">🩺</span>
        </h2>

        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
          {loading && (
            <ul>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </ul>
          )}

          {error && (
            <div className="text-red-300 p-4 bg-red-900/50 rounded-lg border border-red-800">
              <p className="font-semibold">An Error Occurred</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && doctorData.length === 0 && (
            <p className="text-gray-500">No doctors available at the moment.</p>
          )}

          {!loading && !error && doctorData.length > 0 && (
            <ul>
              {doctorData.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-8 overflow-y-auto">
        <div className="bg-slate-800/50 p-8 rounded-xl h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
