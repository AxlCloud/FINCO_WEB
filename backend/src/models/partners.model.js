import { db } from "../config/bd.js";

export class Partner {
    constructor ({id, name, contact_info, type, address, phone, email, created_at}) {
        this.id = id;
        this.name = name;
        this.contact_info = contact_info;
        this.type = type;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.created_at = created_at;
    }

    static async getAll(){
        const [rows] = await db.query("SELECT * FROM partners");
        return rows.map(row => new Partner(row));
    }

    static async getById (id){
        const [rows] = await db.query("SELECT * FROM partners WHERE id = ?", [id]);
        if(rows.length === 0) return null;
        return new Partner(rows[0]);
    }

    static async create({name, contact_info, type, address, phone, email}) {
        const [result] = await db.query(
            "INSERT INTO partners (name, contact_info, type, address, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
            [name, contact_info, type, address, phone, email]
        );
        return new Partner({id: result.insertId, name, contact_info, type, address, phone, email});
    }

    static async update(id, {name, contact_info, type, address, phone, email}) {
        await db.query(
            "UPDATE partners SET name=?, contact_info=?, type=?, address=?, phone=?, email=? WHERE id=?",
            [name, contact_info, type, address, phone, email, id]
        );
        return Partner.getById(id);
    }

    static async delete(id) {
        await db.query("DELETE FROM partners WHERE id=?", [id]);
        return true;
    }
}
