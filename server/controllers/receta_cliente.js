import model from '../models';

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
}


export default Receta_cliente
