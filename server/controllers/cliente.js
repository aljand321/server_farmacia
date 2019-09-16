import model from '../models';

const { cliente } = model;

class Cliente{
    static create_cliente(req,res){
        if(req.body.ci == "" || isNaN(req.body.ci)){
            if(req.body.ci == ""){
                res.status(400).json({
                    succes: false,
                    msg: 'CI no puede estar vació'
                })
            }else if (isNaN(req.body.ci)){
                res.status(400).json({
                    succes: false,
                    msg: 'CI no puede contener numeros'
                })
            }

        }else if(req.body.nombre == ""){
            res.status(400).json({
                succes: false,
                msg: 'Nombre no puede estar vació'
            })
        }else if(req.body.apellidop == "") {
            res.status(400).json({
                succes: false,
                msg: 'Apellido paterno no puede estar vació'
            })  
        }else{
            
            return cliente
            .findAll({
                where: { ci : req.body.ci }
            })
            .then(datas => {
                if(datas == ""){
                    const { ci,nombre,apellidop,apellidom,id_user } = req.body
                    return cliente
                    .create({
                        ci,
                        nombre,
                        apellidop,
                        apellidom,
                        id_user
                    })
                    .then(data => res.status(201).send({
                        success: true,
                        msg: `Se registro el cliente: ${nombre}`,
                        data
                    }))
                    .catch(error => res.status(400).send({
                        success: false,
                        msg: "No se pudo introducir los datos",
                        error
                    }));              
                }else{
                    res.status(400).json({
                        succes: false,
                        msg: 'C.I. ya existe'
                    }) 
                }
            });

            
        }
    }
    //ruta para poder listar todos los clientes
    static list_clients(req, res) {
        return cliente
        .findAll()
        .then(datas => res.status(200).send(datas));
    }

    //ruta para mostrar un solo cliente
    //ruta para poder listar todos los medicamentos
    static one_client(req, res) {
        const { id_cliente } = req.params
        return cliente
        .findAll({
            where: { id : id_cliente }
        })
        .then(datas => res.status(200).send(datas));
    }
}


export default Cliente
