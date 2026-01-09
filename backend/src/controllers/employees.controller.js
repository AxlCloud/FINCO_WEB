import { Employee } from "../models/employees.model.js";


export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.getAll();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching employees" });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating employee" });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.update(req.params.id, req.body);
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating employee" });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        await Employee.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting employee" });
    }
};
