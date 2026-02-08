import { Partner } from "../models/partners.model.js";

export const getPartners = async (req, res) => {
    try {
        const partners = await Partner.getAll();
        res.json(partners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching partners" });
    }
};

export const createPartner = async (req, res) => {
    try {
        const partner = await Partner.create(req.body);
        res.status(201).json(partner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating partner" });
    }
};

export const updatePartner = async (req, res) => {
    try {
        const partner = await Partner.update(req.params.id, req.body);
        res.json(partner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner" });
    }
};

export const deletePartner = async (req, res) => {
    try {
        await Partner.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting partner" });
    }
};
