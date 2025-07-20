import React, { useEffect, useState } from "react";

const Metrics = ({ darkMode }) => {
  const [power, setPower] = useState(null);
  const [solarGeneration, setSolarGeneration] = useState(null);
  const [lifetimeGeneration, setLifetimeGeneration] = useState(null);
  const [totalSavings, setTotalSavings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const powerRes = await fetch("http://localhost:8080/api/v1/power/live");
        const powerData = await powerRes.json();
        setPower(powerData.live_power_kw);

        const solarRes = await fetch(
          "http://localhost:8080/api/v1/solar/daily"
        );
        const solarData = await solarRes.json();
        setSolarGeneration(solarData.solar_generation_kwh);

        const lifetimeRes = await fetch(
          "http://localhost:8080/api/v1/solar/lifetime"
        );
        const lifetimeData = await lifetimeRes.json();
        setLifetimeGeneration(lifetimeData.lifetime_generation_mwh);

        const savingsRes = await fetch(
          "http://localhost:8080/api/v1/savings/total"
        );
        const savingsData = await savingsRes.json();
        setTotalSavings(savingsData.total_savings_inr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      <div
        className={`p-4 rounded ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="text-xs text-gray-500">Power</div>
        <div className="text-xl font-bold">
          {power !== null ? `${power}kW` : "Loading..."}
        </div>
      </div>

      <div
        className={`p-4 rounded ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="text-xs text-gray-500">Solar Generation</div>
        <div className="text-xl font-bold">
          {solarGeneration !== null ? `${solarGeneration}kWh` : "Loading..."}
        </div>
      </div>

      <div
        className={`p-4 rounded ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="text-xs text-gray-500">Lifetime</div>
        <div className="text-xl font-bold">
          {lifetimeGeneration !== null
            ? `${lifetimeGeneration}MWh`
            : "Loading..."}
        </div>
      </div>

      <div
        className={`p-4 rounded ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="text-xs text-gray-500">Total Saving</div>
        <div className="text-xl font-bold">
          {totalSavings !== null
            ? `₹${totalSavings.toLocaleString()}`
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
