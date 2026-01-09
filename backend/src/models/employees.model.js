import { db } from "../config/bd.js";

export class Employee {
    constructor ({id,name,id_number,phone,address,farm_id,hire_date,role, status, created_at})
    {
        this.id =id;
        this.name = name;
        this.id_number = id_number;
        this.phone = phone;
        this.address = address;
        this.farm_id = farm_id;
        this.hire_date = hire_date;
        this.role = role;
        this.status = status;
        this.created_at = created_at;
    }

    static async getAll(){
        const [rows] = await db.query("SELECT * FROM employees ")
        return rows.map(row => new Employee(row));
    }

    static async getById (id){
        const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
        if(rows.length === 0) return null;
        return new Employee(rows[0]);
    }

    static async create({name, id_number, phone, address,farm_id,hire_date,role,status}) {
        const [result] = await db.query(
            "INSERT INTO employees (name, id_number, phone, address, farm_id, hire_date, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [name, id_number, phone, address, farm_id, hire_date, role, status]
        )
        return new Employee ({id: result.insertId,name, id_number,phone, address,farm_id,hire_date,role,status});
    }
     static async update(id, { name, id_number, phone, address, farm_id, hire_date, role, status }) {
        await db.query(
            "UPDATE employees SET name=?, id_number=?, phone=?, address=?, farm_id=?, hire_date=?, role=?, status=? WHERE id=?",
            [name, id_number, phone, address, farm_id, hire_date, role, status, id]
        );
        return Employee.getById(id);
    }
     static async delete(id) {
        await db.query("DELETE FROM employees WHERE id=?", [id]);
        return true;
    }
}