"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarExcepcion = exports.getExcepciones = exports.crearExcepcion = exports.eliminarDisponibilidad = exports.crearDisponibilidad = exports.getDisponibilidad = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtener disponibilidad de un psicólogo
 */
const getDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_psicologo = Number(req.params.id_psicologo);
        if (!id_psicologo)
            return res.status(400).json({ msg: "id_psicologo requerido" });
        const disponibilidades = yield connection_1.default.query(`SELECT id_disponibilidad, dia_semana, hora_inicio, hora_fin 
       FROM disponibilidad 
       WHERE id_psicologo = ? 
       ORDER BY 
         FIELD(dia_semana, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),
         hora_inicio`, {
            replacements: [id_psicologo],
            type: sequelize_1.QueryTypes.SELECT
        });
        res.json(disponibilidades);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener disponibilidad", error });
    }
});
exports.getDisponibilidad = getDisponibilidad;
/**
 * Crear nueva disponibilidad
 */
const crearDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_psicologo, dia_semana, hora_inicio, hora_fin } = req.body;
        // Validaciones
        if (!id_psicologo || !dia_semana || !hora_inicio || !hora_fin) {
            return res.status(400).json({
                msg: "Faltan campos requeridos",
                campos_requeridos: ["id_psicologo", "dia_semana", "hora_inicio", "hora_fin"]
            });
        }
        // Validar formato de tiempo
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(hora_inicio) || !timeRegex.test(hora_fin)) {
            return res.status(400).json({
                msg: "Formato de hora inválido. Use HH:mm"
            });
        }
        if (hora_fin <= hora_inicio) {
            return res.status(400).json({
                msg: "La hora de fin debe ser mayor que la hora de inicio"
            });
        }
        // Validar días de la semana
        const diasValidos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        if (!diasValidos.includes(dia_semana)) {
            return res.status(400).json({
                msg: "Día de la semana inválido",
                dias_validos: diasValidos
            });
        }
        // Verificar solapamiento con disponibilidades existentes
        const solapamiento = yield connection_1.default.query(`SELECT COUNT(*) as count FROM disponibilidad 
       WHERE id_psicologo = ? 
       AND dia_semana = ? 
       AND ((hora_inicio < ? AND hora_fin > ?) OR (hora_inicio < ? AND hora_fin > ?))`, {
            replacements: [id_psicologo, dia_semana, hora_fin, hora_inicio, hora_inicio, hora_fin],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (solapamiento[0].count > 0) {
            return res.status(400).json({
                msg: "Ya existe una disponibilidad que se solapa con este horario"
            });
        }
        // Crear la disponibilidad
        yield connection_1.default.query(`INSERT INTO disponibilidad (id_psicologo, dia_semana, hora_inicio, hora_fin) 
       VALUES (?, ?, ?, ?)`, {
            replacements: [id_psicologo, dia_semana, hora_inicio, hora_fin],
            type: sequelize_1.QueryTypes.INSERT
        });
        console.log(`Disponibilidad creada: ${dia_semana} ${hora_inicio}-${hora_fin} para psicólogo ${id_psicologo}`);
        res.json({ msg: "Disponibilidad creada exitosamente" });
    }
    catch (error) {
        console.error('Error al crear disponibilidad:', error);
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.crearDisponibilidad = crearDisponibilidad;
/**
 * Eliminar disponibilidad específica
 */
const eliminarDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_psicologo, dia_semana, hora_inicio } = req.params;
        if (!id_psicologo || !dia_semana || !hora_inicio) {
            return res.status(400).json({ msg: "Parámetros requeridos: id_psicologo, dia_semana, hora_inicio" });
        }
        // Verificar que existe
        const existe = yield connection_1.default.query(`SELECT COUNT(*) as count FROM disponibilidad 
       WHERE id_psicologo = ? AND dia_semana = ? AND hora_inicio = ?`, {
            replacements: [id_psicologo, dia_semana, hora_inicio],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (existe[0].count === 0) {
            return res.status(404).json({ msg: "Disponibilidad no encontrada" });
        }
        // Eliminar
        yield connection_1.default.query(`DELETE FROM disponibilidad 
       WHERE id_psicologo = ? AND dia_semana = ? AND hora_inicio = ?`, {
            replacements: [id_psicologo, dia_semana, hora_inicio],
            type: sequelize_1.QueryTypes.DELETE
        });
        console.log(`Disponibilidad eliminada: ${dia_semana} ${hora_inicio} para psicólogo ${id_psicologo}`);
        res.json({ msg: "Disponibilidad eliminada exitosamente" });
    }
    catch (error) {
        console.error('Error al eliminar disponibilidad:', error);
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.eliminarDisponibilidad = eliminarDisponibilidad;
/**
 * Crear excepción de disponibilidad (bloquear fecha específica)
 */
const crearExcepcion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_psicologo, fecha, hora_inicio, hora_fin, motivo } = req.body;
        if (!id_psicologo || !fecha) {
            return res.status(400).json({
                msg: "Faltan campos requeridos: id_psicologo, fecha"
            });
        }
        // Si no se especifican horas, bloquea todo el día
        const horaInicioValue = hora_inicio || null;
        const horaFinValue = hora_fin || null;
        yield connection_1.default.query(`INSERT INTO excepcion_disponibilidad (id_psicologo, fecha, hora_inicio, hora_fin, motivo) 
       VALUES (?, ?, ?, ?, ?)`, {
            replacements: [id_psicologo, fecha, horaInicioValue, horaFinValue, motivo || ''],
            type: sequelize_1.QueryTypes.INSERT
        });
        const tipoBloqueo = horaInicioValue ? `${horaInicioValue}-${horaFinValue}` : 'Todo el día';
        console.log(`Excepción creada: ${fecha} ${tipoBloqueo} para psicólogo ${id_psicologo}`);
        res.json({ msg: "Excepción creada exitosamente" });
    }
    catch (error) {
        console.error('Error al crear excepción:', error);
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.crearExcepcion = crearExcepcion;
/**
 * Obtener excepciones de un psicólogo
 */
const getExcepciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_psicologo = Number(req.params.id_psicologo);
        if (!id_psicologo)
            return res.status(400).json({ msg: "id_psicologo requerido" });
        const excepciones = yield connection_1.default.query(`SELECT id_excepcion, fecha, hora_inicio, hora_fin, motivo 
       FROM excepcion_disponibilidad 
       WHERE id_psicologo = ? 
       ORDER BY fecha, hora_inicio`, {
            replacements: [id_psicologo],
            type: sequelize_1.QueryTypes.SELECT
        });
        res.json(excepciones);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener excepciones", error });
    }
});
exports.getExcepciones = getExcepciones;
/**
 * Eliminar excepción
 */
const eliminarExcepcion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_excepcion = Number(req.params.id_excepcion);
        if (!id_excepcion)
            return res.status(400).json({ msg: "id_excepcion requerido" });
        const resultado = yield connection_1.default.query(`DELETE FROM excepcion_disponibilidad WHERE id_excepcion = ?`, {
            replacements: [id_excepcion],
            type: sequelize_1.QueryTypes.DELETE
        });
        res.json({ msg: "Excepción eliminada exitosamente" });
    }
    catch (error) {
        console.error('Error al eliminar excepción:', error);
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.eliminarExcepcion = eliminarExcepcion;
