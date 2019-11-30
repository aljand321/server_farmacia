import model from '../models';

const sequelize = require('sequelize');

const Op = sequelize.Op;

const { cantidad_fecha } = model;
const { medicamentos } = model;

class Fecha_Cantidad{
    static cerateFecha_Cantidad(req,res){
        
        const { codigo_compra,fehca_vencimineto,cantidad_unidad,precio } = req.body
        const { id_medicamento } = req.params
        return cantidad_fecha
        .create({
            codigo_compra,
            fehca_vencimineto,
            cantidad_unidad,
            precio,
            id_medicamento
        })
        .then(data => res.status(201).send({
            success: true,
            msg: 'Se registro fecha y cantidad',
            data
        })) 
    }
    //lista de fechas
    static VerFechaCantidad(req, res) {
        return cantidad_fecha
        .findAll()
        .then(data => res.status(200).send(data));
    }

    // lista de fecha cantidad mas su nombre
    static list_cantidad_fecha(req, res) {
        return cantidad_fecha
        .findAll({
            include:[{
                model: medicamentos
            }]
        })
        .then(data => res.status(200).send(data));
    }
    // lista de fecha cantidad mas su nombre
    static one_fecha(req, res) {
        const { id } = req.params
        return cantidad_fecha
        .findAll({
           where:{id : id}
        })
        .then(data => {
            if (data == ""){
                res.status(400).json({
                    success:false,
                    msg:'No hay nada para mostrar'
                })
            }else{
                res.status(200).json(data)
            }
        });
    }

    static listMedicamentos(req,res){
        const { id_medicamento } = req.params
        cantidad_fecha.findAll({
            where: { id_medicamento : id_medicamento }
        })
        .then((data) => {
            res.status(200).json(data);
        })
    }

    // ruta para poder actualizar la cantidad 
    static modificar_cantidad (req, res) {
        const { id } = req.params
        cantidad_fecha.findAll({
            where: { id : id }
        })
        .then((data) => {
            console.log(data[0].id, req.body.cantidad_unidad)
            if(data == ""){
                res.status(400).json({
                    success:false,
                    msg:"no se puede actualizar los datos no existe"
                })
            }else{
                var reduce =  data[0].cantidad_unidad - req.body.cantidad_unidad
                console.log(reduce, " esto es reduce")
                if (reduce < 0){
                    res.status(400).json({
                        success:false,
                        msg:"No existe esa cantidad para reducir"
                    })
                }else{
                    return cantidad_fecha
                    .findByPk(req.params.id)
                    .then((data) => {
                      data.update({
                          cantidad_unidad: reduce
    
                    })
                    .then((update) => {
                      res.status(200).send({
                        success:true,
                        msg: 'Se actualizo la cantidad',
                        data: {
                            cantidad_unidad: reduce
                        }
                      })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(400).json({
                            success: false,
                            msg: "No se pudo actualizar los datos",
                            error
                        })
                    })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(400).json({
                            success: false,
                            msg: "No se pudo actualizar los datos",
                            error
                        })
                    })
                }
                
            } 

        })
        
    }

    //filtrar por fechas
    static filter_fechas_med(req, res) {
        
        const { fecha_inicio, fecha_final, medicamento }  = req.body
        if(!fecha_final || !fecha_inicio){
            res.status(400).json({
                success:false,
                msg:"Todos los campos son obligatorios"
            })
        }else{
            var _q = medicamentos;
            _q.findAll({
                where:{nombre: medicamento},
                attributes:['id', 'nombre', 'codificacion', 'presentacion', 'forma_f', 'cantidad_unidad','precio_compra','precio'],
                 include:[{
                     model:cantidad_fecha,
                     where: {[Op.and]: [{createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]},
                 }]
            })
            .then(datas => {
                if(datas == ""){
                    res.status(400).json({
                        success:false,
                        msg:"No hay nada para mostrar"
                    })
                }else{
                    res.status(200).json(datas)
                }
            });
        } 
    }
    
    
   

}
export default Fecha_Cantidad;