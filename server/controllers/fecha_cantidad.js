import model from '../models';

const { cantidad_fecha } = model

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
    static VerFechaCantidad(req, res) {
        return cantidad_fecha
        .findAll()
        .then(data => res.status(200).send(data));
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