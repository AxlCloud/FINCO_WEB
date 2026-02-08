import {} from "../config/bd.js";

export class Product{
    constructor ({id, category_id, product_type,name, unit, status, created_at}) {
        this.id = id;
        this.category_id = category_id;
        this.product_type = product_type;
        this.name = name;
        this.unit = unit;
        this.status = status;
        this.created_at = created_at;
    }


    static async getAll(){
        const [rows] = await db.query("SELECT * FROM products WHERE status = 'ACTIVE'");
        return rows.map(row => new Product(row));
    }

    static async getById (id){
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if(rows.length === 0) return null;
        return new Product(rows[0]);
    }

    static async create(data) {
       const {category_id, product_type,name, unit, status} = data;
        const [result] = await db.query(
            "INSERT INTO products (category_id, product_type,name, unit, status) VALUES (?, ?, ?, ?, ?)",
            [category_id, product_type,name, unit, status]
        );
        return this.getById(result.insertId);

    }
    static async update(id, data) {
        const {category_id, product_type,name, unit, status} = data;
        await db.query(
            "UPDATE products SET category_id=?, product =?, name=?, unit=?, status=? WHERE id=?",
            [category_id, product_type,name, unit, status, id]
        );
        return this.getById(id);
    }
    static async delete(id) {
        await db.query("DELETE FROM products WHERE id=?", [id]);
        return true;
    }
    static async getByCategoryId(category_id){
        const [rows] = await db.query("SELECT * FROM products WHERE category_id = ? AND status = 'ACTIVE'", [category_id]);
        return rows.map(row => new Product(row));
    }
    static async getByType(product_type){
        const [rows] = await db.query("SELECT * FROM products WHERE product_type = ? AND status = 'ACTIVE'", [product_type]);
        return rows.map(row => new Product(row));
    }
    static async searchByName(name){
        const [rows] = await db.query("SELECT * FROM products WHERE name LIKE ? AND status = 'ACTIVE'", [`%${name}%`]);
        return rows.map(row => new Product(row));
    }
}