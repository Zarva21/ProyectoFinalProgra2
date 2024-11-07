const db = require('../models'); 
const Juego = db.Juego;

// Crear un nuevo juego (alquiler)
exports.createJuego = async (req, res) => {
    try {
        const nuevoJuego = await Juego.create({
            nombre_juego: req.body.nombre_juego,
            genero: req.body.genero,
            plataforma: req.body.plataforma,
            fecha_lanzamiento: req.body.fecha_lanzamiento,
            precio_alquiler: req.body.precio_alquiler,
            disponibilidad: req.body.disponibilidad,
            fecha_alquiler: req.body.fecha_alquiler,
            fecha_devolucion: req.body.fecha_devolucion,
            nombre_cliente: req.body.nombre_cliente,
            comentarios: req.body.comentarios
        });
        res.status(201).json(nuevoJuego);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el juego' });
    }
};

// Actualizar un juego por ID
exports.updateJuego = async (req, res) => {
    const id = req.params.id;
    try {
        const juegoActualizado = await Juego.update(req.body, {
            where: { id_juego: id }
        });
        
        if (juegoActualizado[0] === 1) {
            res.json({ message: "Juego actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Juego no encontrado o sin cambios" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el juego' });
    }
};

// Obtener un juego por ID
exports.getJuegoById = async (req, res) => {
    const id = req.params.id;
    try {
        const juego = await Juego.findByPk(id);
        if (juego) {
            res.json(juego);
        } else {
            res.status(404).json({ message: "Juego no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el juego' });
    }
};

// Eliminar un juego (lógicamente) por ID
exports.deleteJuego = async (req, res) => {
    const id = req.params.id;
    try {
        const juegoEliminado = await Juego.update(
            { disponibilidad: false },  // Cambia la disponibilidad a "false"
            { where: { id_juego: id } }
        );

        if (juegoEliminado[0] === 1) {
            res.json({ message: "Juego eliminado (marcado como no disponible)" });
        } else {
            res.status(404).json({ message: "Juego no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el juego' });
    }
};
