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
            const {  trimestre, responsable, destino, medicamentos, id_user } = req.body
            return pedidos
            .create({
                trimestre, 
                responsable, 
                destino, 
                medicamentos,
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
}

export default Pedidos;

