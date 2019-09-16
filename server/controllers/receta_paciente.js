import model from '../models';

const { receta_paciente } = model

class Receta_Paciente {
    static create_receta(req,res){
        if(req.body.codigo_venta == "" || isNaN(req.body.codigo_venta) || req.body.empleado == "" || req.body.historial == "" || isNaN(req.body.historial) || req.body.tipo_consulta == "" || req.body.nombre_doctor == "" || req.body.medicamentos.length == 0 ) {
            if(req.body.medicamentos.length == 0){
                res.status(400).json({
                    success: false,
                    msg: "Por favor inserte medicamentos"
                })
            }else{
                res.status(400).json({
                    success: false,
                    msg: "Todos los campos son obligatorios"
                })
            }
        }else{
            return receta_paciente
            .findAll({
                where : { id_receta: req.body.id_receta }
            })
            .then(datas => {
                if(datas== ""){
                    const { codigo_venta,empleado,historial,tipo_consulta,nombre_doctor,medicamentos,id_receta,id_user } = req.body
                    return receta_paciente
                    .create({
                        codigo_venta,
                        empleado,
                        historial,
                        tipo_consulta,
                        nombre_doctor,
                        medicamentos,
                        id_receta,
                        id_user
                    })
                    .then(data => res.status(201).send({
                        success: true,
                        msg: 'Se registro receta',
                        data
                    }))
                    .catch(error => res.status(400).send({
                        success: false,
                        msg: "No se pudo introducir los datos",
                        error
                    }));
                }else{
                    res.status(400).json({
                        success: false,
                        msg:"Ya se registro esta receta"
                    })
                }
            });
            
        }
    }
    
    static list_recetas(req, res) {
        return receta_paciente
        .findAll()
        .then(datas => res.status(200).send(datas));
    }

}

export default Receta_Paciente;