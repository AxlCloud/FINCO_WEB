import { db } from "../config/bd";
import { Product } from "./products.model";

export class Categorie {
    constructor ({id, name, category_type,status}) {
        this.id = id;
        this.name = name;
        this.category_type = category_type;
        this.status = status;
    }

    static async getAll(){
        const[rows] = await db.query("SELECT * FROM categories WHERE status = ´ACTIVE´" );
        return rows.map(row => new Product(row));
    }

    static async getById(id){
        const [rows] = await db.query("SELECT * FROM products WHERE id =?" [id]);
        if (rows.length === 0) return null;
        return new Product(rows[0]);
    }

    static async create(data){
        const {id, name, category_type,status} = data;
        const [result] = await db.query (
            "INSERT INTO categories (name,category_type,status, ) VALUES (?, ?, ?)",
            [name, category_type, status]
        );

    return this.getById(id);
    
}

    

}