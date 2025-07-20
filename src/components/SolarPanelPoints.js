import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SolarPanelPoints = ({ darkMode }) => {
  const [solarGenerationData, setSolarGenerationData] = useState([]);
  const [solarGenerationByInverterData, setSolarGenerationByInverterData] = useState([]);
  const [inverterData, setInverterData] = useState([]);

  useEffect(() => {
    const fetchSolarData = async () => {
      try {
        const cumulativeRes = await fetch("http://localhost:8080/api/v1/solar/cumulative");
        const cumulativeData = await cumulativeRes.json();
        setSolarGenerationData(
          cumulativeData?.generation?.map((item) => ({
            time: item.time,
            generation: item.kwh,
          })) ?? []
        );

        const individualRes = await fetch("http://localhost:8080/api/v1/solar/individual");
        const individualData = await individualRes.json();
        const formattedInverterData =
          individualData?.inverters?.[0]?.generation?.map((_, index) => ({
            time: individualData.inverters[0].generation[index].time,
            Inverter1: individualData.inverters[0]?.generation[index]?.kwh ?? 0,
            Inverter2: individualData.inverters[1]?.generation[index]?.kwh ?? 0,
          })) ?? [];
        setSolarGenerationByInverterData(formattedInverterData);

        const invertersRes = await fetch("http://localhost:8080/api/v1/inverters");
        const invertersData = await invertersRes.json();
        setInverterData(invertersData?.inverters ?? []);
      } catch (error) {
        console.error("Error fetching solar panel data:", error);
      }
    };

    fetchSolarData();
  }, []);

  return (
    <div
      className={`container mx-auto p-4 rounded-lg shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Main Layout: Inverter Table (Left) & Charts (Right) */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Inverter Performance Table - Left */}
        <div className="md:w-1/2 order-2 md:order-1">
          <h3 className="text-lg font-semibold mb-3">Inverter Performance</h3>
          {inverterData.length === 0 ? (
            <p className="text-sm text-gray-400">No inverter data available.</p>
          ) : (
            inverterData.map((inverter) => (
              <div key={inverter.id} className="mb-4 border p-3 rounded-md">
                <h4 className="font-semibold text-sm mb-2">Inverter {inverter.id}</h4>
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td>Total kWh</td>
                      <td className="text-right">{inverter.total_kwh ?? "N/A"} kWh</td>
                    </tr>
                    <tr>
                      <td>Power (AC)</td>
                      <td className="text-right">{inverter.power_ac_kw ?? "N/A"} kW</td>
                    </tr>
                    <tr>
                      <td>Power (DC)</td>
                      <td className="text-right">{inverter.power_dc_kw ?? "N/A"} kW</td>
                    </tr>
                    <tr>
                      <td>Voltage Phase 1</td>
                      <td className="text-right">{inverter.voltage_phase?.phase_1 ?? "N/A"} V</td>
                    </tr>
                    <tr>
                      <td>Voltage Phase 2</td>
                      <td className="text-right">{inverter.voltage_phase?.phase_2 ?? "N/A"} V</td>
                    </tr>
                    <tr>
                      <td>Voltage Phase 3</td>
                      <td className="text-right">{inverter.voltage_phase?.phase_3 ?? "N/A"} V</td>
                    </tr>
                    <tr>
                      <td>Frequency</td>
                      <td className="text-right">{inverter.frequency_hz ?? "N/A"} Hz</td>
                    </tr>
                    <tr>
                      <td>Array 1 DC Voltage</td>
                      <td className="text-right">{inverter.array_dc_voltage?.array_1 ?? "N/A"} V</td>
                    </tr>
                    <tr>
                      <td>Array 2 DC Voltage</td>
                      <td className="text-right">{inverter.array_dc_voltage?.array_2 ?? "N/A"} V</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td className="text-right text-green-500">{inverter.status ?? "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>

        {/* Charts - Right */}
        <div className="md:w-1/2 order-1 md:order-2">
          {/* Solar Generation Chart */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Solar Generation</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={solarGenerationData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#444" : "#e0e0e0"}
                />
                <XAxis
                  dataKey="time"
                  fontSize={10}
                  stroke={darkMode ? "#fff" : "#666"}
                />
                <YAxis stroke={darkMode ? "#fff" : "#666"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#333" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                  }}
                />
                <Bar dataKey="generation" fill="#FFC107" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Solar Generation by Inverter Chart */}
          <div>
            <h3 className="text-md font-semibold mb-2">Solar Generation by Inverter</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={solarGenerationByInverterData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#444" : "#e0e0e0"}
                />
                <XAxis
                  dataKey="time"
                  fontSize={10}
                  stroke={darkMode ? "#fff" : "#666"}
                />
                <YAxis stroke={darkMode ? "#fff" : "#666"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#333" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                  }}
                />
                <Bar dataKey="Inverter1" stackId="a" fill="#4CAF50" />
                <Bar dataKey="Inverter2" stackId="a" fill="#2196F3" />
                <Legend wrapperStyle={{ color: darkMode ? "#fff" : "#000" }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelPoints;
