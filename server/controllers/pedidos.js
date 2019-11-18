import model from '../models';

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
        console.log(req.body, "  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        if(!medicamento_mandado_almacen){
        
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

