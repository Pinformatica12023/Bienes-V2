import express from "express";

const router = express.Router();

const validDependencies = {
    "Despacho del gerente": ["Despacho del gerente", "Oficina de control interno disciplinario", "Oficina de comunicaciones", "Oficina de control interno", "Oficina de laboratorio", "Oficina de planeación", "Secretaria general", "Tecnologia de la información"],
    "Secretaria general": ["Dirección de apoyo contractual", "Secretaria general"],
    "Subgerencia Administrativa y Financiera": ["Dirección de gestión humana", "Dirección de recuersos coorporativos", "Dirección financiera y de planeación", "Oficinas de suministros", "Suberencia administrativa y financiera"],
    "Subgerencia Comercial": ["Dirección de negocios internacionales", "Direccion de ventas", "Dirección de ventas nacionales", "Subgerencia comercial", "Subgerencia comercial(Director zona antioquia)"],
    "Subgerencia de mercadeo": ["Dirección de marca - Aguardiente", "Dirección de marca - Ron", "Subgerencia de mercadeo", "Subgerencia de mercadeo - Innovación"],
    "Subgerencia de producción": ["Dirección de aseguramiento de la calidad", "Dirección de envasado y añejamiento", "Dirección de logística", "Oficina ambiental", "Subgerencia de producción", "Subgerencia de producción - Dirección mantenimiento"]
};

// Ruta para obtener todas las subgerencias
router.get("/submanagements", (req, res) => {
    res.json(Object.keys(validDependencies));
});

// Ruta para obtener todas las dependencias agrupadas por subgerencia
router.get("/submanagement-dependencies", (req, res) => {
    res.json(validDependencies);
});

export default router;
