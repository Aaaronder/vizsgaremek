// src/components/InstrumentFilter.jsx
import { useState, useEffect } from "react";

const InstrumentFilter = ({ onInstrumentChange }) => {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    // Backend API hívás a hangszerek listájáért
    fetch("http://localhost:3000/instruments")
      .then((res) => res.json())
      .then((data) => setInstruments(data))
      .catch((error) => console.error("Hiba a hangszerek lekérésénél:", error));
  }, []);

  return (
    <div>
      <label>Válassz hangszert: </label>
      <select
        onChange={(e) => onInstrumentChange(e.target.value)} // Küldd tovább a választott hangszert
      >
        <option value="">-- Összes hangszer --</option>
        {instruments.map((instrument) => (
          <option key={instrument.instrumentId} value={instrument.instrumentId}>
            {instrument.instrumentName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InstrumentFilter;
