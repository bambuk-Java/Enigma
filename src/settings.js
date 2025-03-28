import { useState } from "react";

const Settings = ({ onSave, onClose }) => {
  const [walze1, setWalze1] = useState("I");
  const [start1, setStart1] = useState(0);
  const [walze2, setWalze2] = useState("II");
  const [start2, setStart2] = useState(0);
  const [walze3, setWalze3] = useState("III");
  const [start3, setStart3] = useState(0);
  const [reflektor, setReflektor] = useState("B");
  const [steckerbrett, setSteckerbrett] = useState([]);
  const [newPair, setNewPair] = useState("");

  const addSteckerbrettPair = () => {
    if (newPair.length === 2 && newPair[0] !== newPair[1]) {
      const pairArray = newPair.split("");
      const exists = steckerbrett.some(
        (pair) =>
          (pair[0] === pairArray[0] && pair[1] === pairArray[1]) ||
          (pair[0] === pairArray[1] && pair[1] === pairArray[0])
      );
      if (!exists) {
        setSteckerbrett((prev) => [...prev, pairArray]);
        setNewPair("");
      }
    }
  };

  const handleSave = () => {
    onSave({ walze1, start1, walze2, start2, walze3, start3, reflektor, steckerbrett });
    onClose();
  };

  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <h2>Einstellungen</h2>

        {[walze1, walze2, walze3].map((walze, index) => (
          <div key={index}>
            <label>Walze {index + 1}:</label>
            <select
              value={walze}
              onChange={(e) =>
                index === 0 ? setWalze1(e.target.value) : index === 1 ? setWalze2(e.target.value) : setWalze3(e.target.value)
              }
            >
              {["I", "II", "III", "IV", "V"].map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            <label>Startposition:</label>
            <input
              type="number"
              min="0"
              max="25"
              value={index === 0 ? start1 : index === 1 ? start2 : start3}
              onChange={(e) =>
                index === 0 ? setStart1(Number(e.target.value)) : index === 1 ? setStart2(Number(e.target.value)) : setStart3(Number(e.target.value))
              }
            />
          </div>
        ))}

        <label>Umkehrwalze:</label>
        <select value={reflektor} onChange={(e) => setReflektor(e.target.value)}>
          {["A", "B", "C"].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <h3>Steckerbrett</h3>
        <input type="text" maxLength="2" value={newPair} onChange={(e) => setNewPair(e.target.value.toUpperCase())} />
        <button onClick={addSteckerbrettPair}>Paar hinzufügen</button>
        <ul>
          {steckerbrett.map((pair, index) => (
            <li key={index}>
              {pair[0]} ↔ {pair[1]}
            </li>
          ))}
        </ul>

        <button onClick={handleSave}>Speichern</button>
        <button onClick={onClose} className="close-btn">Schließen</button>
      </div>
    </div>
  );
};

export default Settings;
