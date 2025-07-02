import React, { useState, useEffect } from "react";
import "./App.css";

const duas = [
  {
    arabic: "الحَمْدُ للهِ",
    translation: "Praise be to Allah",
  },
  {
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي",
    translation: "O Allah, You are my Lord",
  },
  {
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلٰهَ إِلَّا أَنْتَ",
    translation:
      "O Allah, You are my Lord; none has the right to be worshipped but You",
  },
  {
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
    translation: "My Lord, forgive me and my parents",
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [saved, setSaved] = useState(() => {
    const stored = localStorage.getItem("savedDuas");
    return stored ? JSON.parse(stored) : [];
  });
  const [viewSaved, setViewSaved] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const nextDua = () => {
    setCurrent((prev) => (prev + 1) % duas.length);
    setFlipped(false);
  };

  const saveCurrentDua = () => {
    const dua = duas[current];
    const isSaved = saved.some(
      (d) => d.arabic === dua.arabic && d.translation === dua.translation
    );
    if (!isSaved) {
      const updated = [...saved, dua];
      setSaved(updated);
      localStorage.setItem("savedDuas", JSON.stringify(updated));
    }
  };
  const deleteSavedDua = (index) => {
    const updated = [...saved];
    updated.splice(index, 1);
    setSaved(updated);
    localStorage.setItem("savedDuas", JSON.stringify(updated));
  };


  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1 className="title">🌙 Sukun</h1>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="tab-toggle">
        <button onClick={() => setViewSaved(false)}>📜 Today</button>
        <button onClick={() => setViewSaved(true)}>💖 Saved</button>
      </div>

      {!viewSaved ? (
        <div
          className={`card-container ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped(!flipped)}
        >
          <div className="card">
            <div className="front">
              <p className="arabic">{duas[current].arabic}</p>
              <p className="instruction">Tap to show translation</p>
            </div>
            <div className="back">
              <p className="translation">“{duas[current].translation}”</p>
              <p className="instruction">Tap to return</p>
            </div>
            <button
              className="save-btn"
              onClick={(e) => {
                e.stopPropagation();
                saveCurrentDua();
              }}
            >
              💖
            </button>
          </div>
        </div>
      ) : (
      <div className="saved-list">
        {saved.map((d, idx) => (
          <div key={idx} className="saved-card">
            <p className="arabic">{d.arabic}</p>
            <p className="translation">“{d.translation}”</p>
            <button className="delete-btn" onClick={() => deleteSavedDua(idx)}>❌</button>
          </div>
        ))}
      </div>


      )}



      <button className="button" onClick={nextDua}>
        Next Dua
      </button>

      

      <div className="tasbih">
        <button
          className="tasbih-btn"
          onClick={() => setTasbihCount(tasbihCount + 1)}
        >
          📿
        </button>
        <p className="tasbih-count">{tasbihCount}</p>
        <button className="reset-btn" onClick={() => setTasbihCount(0)}>
          Reset Tasbih
        </button>
      </div>
    </div>
  );
}

export default App;
