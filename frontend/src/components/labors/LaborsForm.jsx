import React, { useState, useEffect } from "react";

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const LABOR_TYPES = [
  "Siembra", "Resiembra", "Deschuponar", "Soqueo", "Chapoda", "Recolección raspa",
  "Desyerbar (Manual o Mecánico)", "Aplicación de Herbicida", "Aplicación de Fertilizantes (Abonar)",
  "Aplicación de Enmiendas (como cal)", "Aplicación de Fungicidas", "Aplicación de Insecticidas",
  "Plateo", "Control de maleza", "Control de plagas y enfermedades", "Recolección de café (Cosecha principal)",
  "Recolección de repases", "Beneficiado", "Secado del café", "Transporte interno del café",
  "Mantenimiento de caminos y drenajes", "Mantenimiento de infraestructura"
];

function LaborsForm({ onSave, onCancel }) {
  const [recolector, setRecolector] = useState("");
  const [cedula, setCedula] = useState("");
  const [mes, setMes] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [semana, setSemana] = useState("");
  const [dia, setDia] = useState("");
  const [laborType, setLaborType] = useState("");
  const [valorDia, setValorDia] = useState("60000");
  const [lot, setLot] = useState("");
  const [productsUsed, setProductsUsed] = useState([{ product: "", quantity: "" }]);
  const [laboresSemana, setLaboresSemana] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/employees").then(res => res.json()).then(setEmployees);
    fetch("http://localhost:3000/products").then(res => res.json()).then(setProducts);
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

  const handleProductChange = (index, field, value) => {
    const updated = [...productsUsed];
    updated[index][field] = value;
    setProductsUsed(updated);
  };

  const addProduct = () => {
    setProductsUsed([...productsUsed, { product: "", quantity: "" }]);
  };

  const removeProduct = (index) => {
    setProductsUsed(productsUsed.filter((_, i) => i !== index));
  };

  const handleAgregar = () => {
    if (!recolector || !cedula || !mes || !fechaInicio || !fechaFin || !semana || !dia || !laborType || !valorDia || !lot) {
      alert("Por favor complete todos los campos");
      return;
    }

    const diaLower = dia.toLowerCase();
    const existing = laboresSemana.find(l => l.recolector === recolector && l.semana === semana);

    if (existing) {
      if (!existing.dias[diaLower]) {
        existing.dias[diaLower] = { laborType, valorDia: parseFloat(valorDia), productsUsed: [...productsUsed] };
        existing[diaLower] = "X"; // mark as worked
      } else {
        alert("Día ya registrado para este trabajador");
        return;
      }
      setLaboresSemana([...laboresSemana]);
    } else {
      const diasDict = { lunes: null, martes: null, miercoles: null, jueves: null, viernes: null, sabado: null };
      diasDict[diaLower] = { laborType, valorDia: parseFloat(valorDia), productsUsed: [...productsUsed] };
      const newReg = {
        recolector,
        cedula,
        mes,
        fechaInicio,
        fechaFin,
        semana,
        lot,
        lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "",
        [diaLower]: "X",
        dias: diasDict
      };
      setLaboresSemana([...laboresSemana, newReg]);
    }

    // Limpiar campos
    setDia("");
    setLaborType("");
    setValorDia("60000");
    setProductsUsed([{ product: "", quantity: "" }]);
  };

  const handleLimpiar = () => {
    setLaboresSemana([]);
    setRecolector("");
    setCedula("");
    setDia("");
    setLaborType("");
    setValorDia("60000");
    setLot("");
    setProductsUsed([{ product: "", quantity: "" }]);
  };

  const handleGuardar = () => {
    if (laboresSemana.length === 0) {
      alert("No hay labores para guardar");
      return;
    }
    onSave(laboresSemana);
  };

  return (
    <div className="container mt-4">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Registro de Labores Diarias</h4>
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
            <label className="form-label">Labor</label>
            <select
              className="form-select"
              value={laborType}
              onChange={(e) => setLaborType(e.target.value)}
              required
            >
              <option value="">Seleccionar Labor</option>
              {LABOR_TYPES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Valor Día</label>
            <input
              type="number"
              className="form-control"
              value={valorDia}
              onChange={(e) => setValorDia(e.target.value)}
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
        </div>

        <div className="mb-3">
          <label className="form-label">Productos Usados</label>
          {productsUsed.map((prod, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <select
                className="form-select"
                value={prod.product}
                onChange={(e) => handleProductChange(index, "product", e.target.value)}
              >
                <option value="">Seleccionar Producto</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad"
                value={prod.quantity}
                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                step="0.01"
                min="0"
              />
              <button type="button" className="btn btn-danger btn-sm" onClick={() => removeProduct(index)}>
                -
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={addProduct}>
            + Agregar Producto
          </button>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary" type="button" onClick={handleAgregar}>
            ➕ Agregar Labor
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
          <h5>Labores de la Semana</h5>
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
                <th>Días</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {laboresSemana.map((reg, index) => {
                const diasTrabajados = Object.values(reg.dias).filter(d => d !== null).length;
                const totalPago = Object.values(reg.dias).filter(d => d !== null).reduce((sum, d) => sum + d.valorDia, 0);
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
                    <td>{diasTrabajados}</td>
                    <td>${totalPago.toFixed(0)}</td>
                  </tr>
                );
              })}
              {laboresSemana.length > 0 && (
                <tr className="table-secondary">
                  <td colSpan="8"><strong>TOTAL GENERAL</strong></td>
                  <td><strong>{laboresSemana.reduce((sum, reg) => sum + Object.values(reg.dias).filter(d => d !== null).length, 0)}</strong></td>
                  <td><strong>${laboresSemana.reduce((sum, reg) => sum + Object.values(reg.dias).filter(d => d !== null).reduce((s, d) => s + d.valorDia, 0), 0).toFixed(0)}</strong></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LaborsForm;