import model from '../models';
const sequelize = require('sequelize');
var sequelize1 = require("../models/index");
const Op = sequelize.Op;

const { receta_paciente } = model

class Receta_Paciente {
    static create_receta(req,res){
        if(req.body.codigo_venta == "" || isNaN(req.body.codigo_venta) || req.body.empleado == "" || req.body.historial == "" || isNaN(req.body.historial) || req.body.tipo_consulta == "" || req.body.nombre_doctor == "" || req.body.medicamentos.length == 0 ) {
            if(req.body.medicamentos.length == 0){
                res.status(400).json({
                    success: false,
                    msg: "Por favor inserte medicamentos"
                })
            }else{
                res.status(400).json({
                    success: false,
                    msg: "Todos los campos son obligatorios"
                })
            }
        }else{
            return receta_paciente
            .findAll({
                where : { id_receta: req.body.id_receta }
            })
            .then(datas => {
                if(datas== ""){
                    const { codigo_venta,empleado,historial,tipo_consulta,nombre_doctor,medicamentos,id_receta,id_user } = req.body
                    return receta_paciente
                    .create({
                        codigo_venta,
                        empleado,
                        historial,
                        tipo_consulta,
                        nombre_doctor,
                        medicamentos,
                        id_receta,
                        id_user
                    })
                    .then(data => res.status(201).send({
                        success: true,
                        msg: 'Se registro receta',
                        data
                    }))
                    .catch(error => res.status(400).send({
                        success: false,
                        msg: "No se pudo introducir los datos",
                        error
                    }));
                }else{
                    res.status(400).json({
                        success: false,
                        msg:"Ya se registro esta receta"
                    })
                }
            });
            
        }
    }
    
    static list_recetas(req, res) {
        return receta_paciente
        .findAll()
        .then(datas => res.status(200).send(datas));
    }

    // one
    static one_receta_paciente(req, res) {
        const { id_receta_paciente } = req.params
        return receta_paciente
        .findAll({
            where:{ id_receta : id_receta_paciente }
        })
        .then(datas => res.status(200).send(datas));
    }

    // ruta filter fecha 
    static filter_fechas_recetas(req, res) {
        const { fecha_inicio, fecha_final, id_personal }  = req.body
        if(!fecha_final || !fecha_inicio || ! id_personal){
            res.status(400).json({
                success:false,
                msg:"Inserte fecha inicio y fecha final y el personal para poder buscar un rago de fechas"
            })
        }else{
            var _q = receta_paciente;
            _q.findAll({
            where: {[Op.and]: [{id_user: {[Op.eq]: id_personal}}, {createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]},
            })
            .then(datas => {
                if(datas == ""){
                    res.status(400).json({
                        success:false,
                        msg:"No hay nada que mostrar"
                    })
                }else{
                    res.status(200).json(datas)
                }
                
            }); 
        }
        
    
    }

    static filter_receta_paciente(req, res) {
        const { fecha_inicio, fecha_final, historial }  = req.body
        console.log(req.body, "   asdasdasdasd")
        if(!fecha_final || !fecha_inicio || !historial){
            res.status(400).json({
                success:false,
                msg:"Inserte fecha inicio y fecha final y el personal para poder buscar un rago de fechas"
            })
        }else{
            var _q = receta_paciente;
            _q.findAll({
                where: {[Op.and]: [{historial: {[Op.eq]: historial}}, {createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]},
            })
            .then(datas => {
                if(datas == ""){
                    res.status(400).json({
                        success:false,
                        msg:"No hay nada que mostrar"
                    })
                    res.status(200).json(datas)
                }else{
                    res.status(200).json(datas)
                }
            });
        }
    }

}

export default Receta_Paciente;