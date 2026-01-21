import React, { useState, useEffect } from "react";

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function CollectionForm({ onSave, onCancel }) {
  const [recolector, setRecolector] = useState("");
  const [cedula, setCedula] = useState("");
  const [mes, setMes] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [semana, setSemana] = useState("");
  const [dia, setDia] = useState("");
  const [kilos, setKilos] = useState("");
  const [valorKilo, setValorKilo] = useState("");
  const [lot, setLot] = useState("");
  const [coffeeType, setCoffeeType] = useState("");
  const [recoleccionSemana, setRecoleccionSemana] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/employees").then(res => res.json()).then(setEmployees);
  }, []);

  const handleEmployeeChange = (e) => {
    const selected = e.target.value;
    setRecolector(selected);
    const emp = employees.find(emp => emp.name === selected);
    if (emp) {
      setCedula(emp.cedula || "");
    }
  };

  const handleFechaInicioChange = (e) => {
    const dateStr = e.target.value;
    setFechaInicio(dateStr);
    if (dateStr) {
      const date = new Date(dateStr);
      const weekNum = getWeekNumber(date);
      setSemana(weekNum.toString());
      const endDate = new Date(date);
      endDate.setDate(date.getDate() + 5);
      setFechaFin(endDate.toISOString().split('T')[0]);
      setMes(MONTHS[date.getMonth()]);
    }
  };

  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const handleAgregar = () => {
    if (!recolector || !cedula || !mes || !fechaInicio || !fechaFin || !semana || !dia || !kilos || !valorKilo || !lot || !coffeeType) {
      alert("Por favor complete todos los campos");
      return;
    }

    const diaLower = dia.toLowerCase();
    const existing = recoleccionSemana.find(r => r.recolector === recolector && r.semana === semana);

    if (existing) {
      existing.kilos[diaLower] = parseFloat(kilos);
      existing[diaLower] = kilos;
      existing.valorKilo = parseFloat(valorKilo);
      setRecoleccionSemana([...recoleccionSemana]);
    } else {
      const kilosDict = { lunes: 0, martes: 0, miercoles: 0, jueves: 0, viernes: 0, sabado: 0 };
      kilosDict[diaLower] = parseFloat(kilos);
      const newReg = {
        recolector,
        cedula,
        mes,
        fechaInicio,
        fechaFin,
        semana,
        lot,
        coffeeType,
        lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "",
        [diaLower]: kilos,
        kilos: kilosDict,
        valorKilo: parseFloat(valorKilo)
      };
      setRecoleccionSemana([...recoleccionSemana, newReg]);
    }

    // Limpiar campos para siguiente entrada
    setDia("");
    setKilos("");
    setValorKilo("");
  };

  const handleLimpiar = () => {
    setRecoleccionSemana([]);
    setRecolector("");
    setCedula("");
    setDia("");
    setKilos("");
    setValorKilo("");
    setLot("");
    setCoffeeType("");
  };

  const handleGuardar = () => {
    if (recoleccionSemana.length === 0) {
      alert("No hay recolecciones para guardar");
      return;
    }
    onSave(recoleccionSemana);
  };

  return (
    <div className="container mt-4">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Registro de Recolección de Café</h4>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Recolector</label>
            <select
              className="form-select"
              value={recolector}
              onChange={handleEmployeeChange}
              required
            >
              <option value="">Seleccionar Recolector</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Cédula</label>
            <input
              className="form-control"
              value={cedula}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Mes</label>
            <select
              className="form-select"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              required
            >
              <option value="">Seleccionar Mes</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha Inicio</label>
            <input
              type="date"
              className="form-control"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Fecha Fin</label>
            <input
              type="date"
              className="form-control"
              value={fechaFin}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Semana Nº</label>
            <input
              className="form-control"
              value={semana}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Día</label>
            <select
              className="form-select"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
              required
            >
              <option value="">Seleccionar Día</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Kilos Recolectados</label>
            <input
              type="number"
              className="form-control"
              value={kilos}
              onChange={(e) => setKilos(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Valor por Kilo</label>
            <input
              type="number"
              className="form-control"
              value={valorKilo}
              onChange={(e) => setValorKilo(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Lote</label>
            <input
              className="form-control"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Tipo de Café</label>
            <select
              className="form-select"
              value={coffeeType}
              onChange={(e) => setCoffeeType(e.target.value)}
              required
            >
              <option value="">Seleccionar Tipo</option>
              <option value="Cereza">Cereza</option>
              <option value="Pergamino Seco">Pergamino Seco</option>
              <option value="Corriente">Corriente</option>
              <option value="Pasilla">Pasilla</option>
            </select>
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary" type="button" onClick={handleAgregar}>
            ➕ Agregar Recolección
          </button>
          <button className="btn btn-success" type="button" onClick={handleGuardar}>
            💾 Guardar Semana
          </button>
          <button className="btn btn-warning" type="button" onClick={handleLimpiar}>
            🧹 Limpiar
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>

        <div className="mt-4">
          <h5>Recolecciones de la Semana</h5>
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Recolector</th>
                <th>Cédula</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
                <th>Total Kilos</th>
                <th>Pago</th>
              </tr>
            </thead>
            <tbody>
              {recoleccionSemana.map((reg, index) => {
                const totalKilos = Object.values(reg.kilos).reduce((a, b) => a + b, 0);
                const totalPago = totalKilos * reg.valorKilo;
                return (
                  <tr key={index}>
                    <td>{reg.recolector}</td>
                    <td>{reg.cedula}</td>
                    <td>{reg.lunes}</td>
                    <td>{reg.martes}</td>
                    <td>{reg.miercoles}</td>
                    <td>{reg.jueves}</td>
                    <td>{reg.viernes}</td>
                    <td>{reg.sabado}</td>
                    <td>{totalKilos.toFixed(2)}</td>
                    <td>${totalPago.toFixed(0)}</td>
                  </tr>
                );
              })}
              {recoleccionSemana.length > 0 && (
                <tr className="table-secondary">
                  <td colSpan="8"><strong>TOTAL GENERAL</strong></td>
                  <td><strong>{recoleccionSemana.reduce((sum, reg) => sum + Object.values(reg.kilos).reduce((a, b) => a + b, 0), 0).toFixed(2)}</strong></td>
                  <td><strong>${recoleccionSemana.reduce((sum, reg) => {
                    const totalKilos = Object.values(reg.kilos).reduce((a, b) => a + b, 0);
                    return sum + totalKilos * reg.valorKilo;
                  }, 0).toFixed(0)}</strong></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CollectionForm;