import { db } from "../config/bd";

export class Lot {
    constructor ({id, farm_id, name, area_hectares, crop, status, create_at}) {
        this.id = id,
        this.farm_id = farm_id,
        this.name = name,
        this.area_hectares = area_hectares,
        this.crop = crop,
        this.status = status,
        this.create_at = create_at
    }
    static async getAll(){
        const [rows] = await db.query("SELEC * FROM lots");
        return rows.map(row => new Lot (row));
    }
    static async getById(id){
        const [rows] = await db.query("SELECT * FROM lots WHERE id= ?"[id]);
        if (rows.length === 0 ) return null;
        return  new Lot (rows[0]);
    }

    static async create(){
        
    }
    static async update(){}
    static async delete(){
        await db.query("DELETE * FRON lots WHERE id=?" [id]);
        return true;
    }

}