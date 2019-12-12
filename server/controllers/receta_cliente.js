import model from '../models';

const sequelize = require('sequelize');
var sequelize1 = require("../models/index");
const Op = sequelize.Op;

const { receta_cliente } = model;

class Receta_cliente{
    static create_receta_cliente (req,res){
        if(req.body.empleado == ""){
            res.status(400).json({
                success: false,
                msg : "Empleado no puede estar vació"
            })
        }else if(req.body.ci == "" || isNaN(req.body.ci)){
            if(req.body.ci == ""){
                res.status(400).json({
                    success: false,
                    msg : "C.I. no puede estar vació"
                })
            }else if(isNaN(req.body.ci)){
                res.status(400).json({
                    success: false,
                    msg : "C.I. solo puede contener numeros"
                }) 
            }
        }else if(req.body.medicamentos == "" || req.body.medicamentos.length == 0){
            res.status(400).json({
                success: false,
                msg : "Selecione medicamentos"
            }) 
        }else{
            const { empleado,ci,medicamentos,id_user } = req.body
            const { id_cliente } = req.params
            return receta_cliente
            .create({
                empleado,
                ci,
                medicamentos,
                id_user,
                id_cliente
            })
            .then(data => res.status(201).send({
                success: true,
                msg: 'Se registro la compra',
                data
            }))
            .catch(error => res.status(400).send({
                success: false,
                msg: "No se pudo registrar la compra",
                error
            }));
        }
    }
    //ruta para poder listar todos los clientes
    static list_recetas_cliente(req, res) {
        return receta_cliente
        .findAll()
        .then(datas => res.status(200).send(datas));
    }

    //ventas del cliente
    static list_ventas_clientes(req, res) {
        const { id_c } = req.params; 
        return receta_cliente
        .findAll({
            where : { id_cliente: id_c }
        })
        .then(datas => res.status(200).send(datas));
    }

    //filter fachas venta clientes 
    static filter_fechas_ventas(req, res) {
        const { fecha_inicio, fecha_final, id_cliente }  = req.body
        if(!fecha_final || !fecha_inicio || !id_cliente){
            res.status(400).json({
                success:false,
                msg:"Inserte fecha inicio y fecha final y el personal para poder buscar un rago de fechas"
            })
        }else{
            var _q = receta_cliente;
            _q.findAll({
                where: {[Op.and]: [{id_cliente: {[Op.eq]: id_cliente}}, {createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]},
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

    //ruta one receta cliente
    static one_receta_cliente(req, res) {
        const { id } = req.params
        return receta_cliente
        .findAll({
            where:{ id : id }
        })
        .then(datas => res.status(200).send(datas));
    }
}


export default Receta_cliente
