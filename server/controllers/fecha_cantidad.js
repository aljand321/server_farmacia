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
   

}
export default Fecha_Cantidad;