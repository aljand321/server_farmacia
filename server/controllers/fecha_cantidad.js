import model from '../models';

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
   

}
export default Fecha_Cantidad;