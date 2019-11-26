import model from '../models';

const sequelize = require('sequelize');
var sequelize1 = require("../models/index");
const Op = sequelize.Op;

const { pedidos } = model

class Pedidos { 
    static create_pedidos(req,res){
        if( req.body.trimestre == "" || req.body.responsable == "" || req.body.destino == "" || req.body.medicamentos == "" ){
             if(req.body.trimestre == ""){
                res.status(400).json({
                    success: false,
                    msg: "Selecione trimestre por favor"
                })
            }else if(req.body.responsable == ""){
                res.status(400).json({
                    success: false,
                    msg: "Inserte responsable por favor"
                })
            }else if(req.body.destino == "") {
                res.status(400).json({
                    success: false,
                    msg: "Inserte destino por favor"
                })
            }else if (req.body.medicamentos == ""){
                res.status(400).json({
                    success: false,
                    msg: "Selecione medicamentos por favor"
                })
            }
        }else{
            const {  trimestre, responsable, destino, medicamentos,medicamento_mandado_almacen,medicamento_aceptado_farmacia, id_user } = req.body
            return pedidos
            .create({
                trimestre, 
                responsable, 
                destino, 
                medicamentos,
                medicamento_mandado_almacen,
                medicamento_aceptado_farmacia,
                id_user
            })
            .then(data => res.status(201).send({
                success: true,
                msg: 'Pedido registrado',
                data
            }))
            .catch(error => res.status(400).send({
                success: false,
                msg: "No se pudo introducir los datos",
                error
            }));
        }
        
    }
    //ruta para ver todos los pedidos
    //ruta para poder listar todos los medicamentos
    static list_pedidos(req, res) {
        return pedidos
        .findAll()
        .then(datas => res.status(200).send(datas));
    }
    //filter fechas
    static list_pedidos_filter(req, res) { 
      const { fecha_inicio, fecha_final, id_personal }  = req.body
      if(!fecha_final || !fecha_inicio || ! id_personal){
        res.status(400).json({
            success:false,
            msg:"Inserte fecha inicio y fecha final y el personal para poder buscar un rago de fechas"
        })
    }else{
      var _q = pedidos;
      _q.findAll({
      where: {[Op.and]: [{id_user: {[Op.eq]: id_personal}}, {createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lt]: fecha_final }}]},
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
    //ruta para mostar un solo medicamento
    static one_pedido(req, res){                
        const { id_pedido } = req.params;  
        pedidos.findAll({
            where : {id: id_pedido}
            //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
            res.send(data);
        });     
    }
    static update_peidodo_almacen_of_farmacia(req,res){
        const { id_pedido } = req.params;  
        const { medicamento_mandado_almacen } = req.body;  
        console.log(req.body, "  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", medicamento_mandado_almacen.lista_med.length, " si es 0 no deberia de entrar")
        if(!medicamento_mandado_almacen || medicamento_mandado_almacen.lista_med.length == 0){
        
            res.status(400).json({
              success:false,
              msg:"Inserte medicamentos antes de guardar"
            })
        
        }else{
          return pedidos
          .findByPk(id_pedido)
          .then((data) => {
            data.update({
                medicamento_mandado_almacen: medicamento_mandado_almacen || data.medicamento_mandado_almacen,      
            })
            .then(update => {
              res.status(200).send({
                success:true,
                msg: 'Se actualizo el estado de cama',
                data : {
                    medicamento_mandado_almacen: medicamento_mandado_almacen || update.medicamento_mandado_almacen,
                }
              })
              .catch(error => {
               
                console.log(error)
                res.status(500).json({
                  success:false,
                  msg: "No se pudo actualizar falla de servidor"
                })
              })
            })
            .catch(error => {
              
              console.log(error , "  22 2")
                res.status(500).json({
                  success:false,
                  msg: "No se pudo actualizar falla de servidor"
                })
            })
          })
        }         
      }
    static update_peidodo_farmacia(req,res){
        const { id_pedido } = req.params;  
        const { medicamento_aceptado_farmacia } = req.body;  
        
        if(!medicamento_aceptado_farmacia){
            console.log(req.body, "  no")
            res.status(400).json({
              success:false,
              msg:"Inserte medicamentos antes de guardar"
            })
          
        }else{
            console.log(req.body, "  si")

          return pedidos
          .findByPk(id_pedido)
          .then((data) => {
            data.update({
                medicamento_aceptado_farmacia: medicamento_aceptado_farmacia || data.medicamento_aceptado_farmacia,      
            })
            .then(update => {
              res.status(200).send({
                success:true,
                msg: 'Se acepto el pedido',
                data : {
                    medicamento_aceptado_farmacia: medicamento_aceptado_farmacia || update.medicamento_aceptado_farmacia,
                }
              })
              .catch(error => {
                
                console.log(error)
                res.status(500).json({
                  success:false,
                  msg: "No se pudo actualizar falla de servidor"
                })
              })
            })
            .catch(error => {

              console.log(error , "  22 2")
                res.status(500).json({
                  success:false,
                  msg: "No se pudo actualizar falla de servidor"
                })
            })
          })
        }         
    }
}

export default Pedidos;

