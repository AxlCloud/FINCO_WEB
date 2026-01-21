import { useEffect, useState } from "react";
import FarmModal from "./farmsModal";
import LotsModal from "../lots/lotsModal";

function FarmsList() {
  const [farms, setFarms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [showLotsModal, setShowLotsModal] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [farmIdForLot, setFarmIdForLot] = useState(null);


  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await fetch("http://localhost:3000/farms");
        const data = await res.json();
        setFarms(data);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };
    fetchFarms();
  }, []);

 
  const handleSave = async (farmData) => {
    try {
      let res;

      if (selectedFarm) {
        
        res = await fetch(
          `http://localhost:3000/farms/${selectedFarm.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(farmData),
          }
        );
      } else {
    
        res = await fetch("http://localhost:3000/farms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(farmData),
        });
      }

      const savedFarm = await res.json();

      setFarms((prev) =>
        selectedFarm
          ? prev.map((f) => (f.id === savedFarm.id ? savedFarm : f))
          : [...prev, savedFarm]
      );

      setShowModal(false);
      setSelectedFarm(null);
    } catch (error) {
      console.error("Error saving farm:", error);
      alert("Error saving farm");
    }
  };

  const handleSaveLot = async (lotData) => {
    try {
      let res;

      if (selectedLot) {
        res = await fetch(
          `http://localhost:3000/lots/${selectedLot.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lotData),
          }
        );
      } else {
        res = await fetch("http://localhost:3000/lots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lotData),
        });
      }

      setShowLotsModal(false);
      setSelectedLot(null);
      setFarmIdForLot(null);
    } catch (error) {
      console.error("Error saving lot:", error);
      alert("Error saving lot");
    }
  };

  const handleEdit = (farm) => {
    setSelectedFarm(farm);
    setShowModal(true);
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this farm?")) return;

    try {
      await fetch(`http://localhost:3000/farms/${id}`, {
        method: "DELETE",
      });

      setFarms((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Farms</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              setSelectedLot(null);
              setFarmIdForLot(null);
              setShowLotsModal(true);
            }}
          >
            + Add Lot
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              setSelectedFarm(null);
              setShowModal(true);
            }}
          >
            + Add Farm
          </button>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Total Area (ha)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {farms.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No farms found
                </td>
              </tr>
            ) : (
              farms.map((farm) => (
                <tr key={farm.id}>
                  <td>{farm.id}</td>
                  <td>{farm.name}</td>
                  <td>{farm.location}</td>
                  <td>{farm.total_area}</td>
                  <td>
                    <span
                      className={`badge ${
                        farm.status === "ACTIVE"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {farm.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => handleEdit(farm)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => {
                        setSelectedLot(null);
                        setFarmIdForLot(farm.id);
                        setShowLotsModal(true);
                      }}
                    >
                      Add Lot
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(farm.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <FarmModal
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
          farm={selectedFarm}
        />
      )}

      {showLotsModal && (
        <LotsModal
          onSave={handleSaveLot}
          onCancel={() => setShowLotsModal(false)}
          lot={selectedLot}
          farmId={farmIdForLot}
        />
      )}
    </div>
  );
}

export default FarmsList;
