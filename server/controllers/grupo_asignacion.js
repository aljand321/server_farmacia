import model from '../models';

const { grupo_asignacion } = model;

class asignacion {
    static create_designacion(req, res) {
        console.log(req.body)
        if(req.body.descripcion == "" || req.body.codigo == "" || isNaN(req.body.codigo)){
            if(req.body.descripcion == ""){
                res.status(400).json({
                    success: false,
                    msg:"Descripcion no puede estar vacio"
                })
            }else if (req.body.codigo == ""){
                res.status(400).json({
                    success: false,
                    msg:"Codigo no puede estar vacio"
                })
            }else if(isNaN(req.body.codigo)){
                res.status(400).json({
                    success: false,
                    msg:"Codigo no puede contener letras"
                })
            }
        }else{
            grupo_asignacion.findAll({
                where: {codigo: req.body.codigo}
              //attributes: ['id', ['description', 'descripcion']]
            }).then((data) => {
                if(data == ""){
                  const { codigo,descripcion } = req.body
                  return grupo_asignacion
                  .create({
                      codigo,
                      descripcion
                  })
                  .then(data => res.status(201).send({
                      success: true,
                      msg: `Se creo el grupo designacion ${descripcion} `,
                      data
                  }))
                  .catch(error => res.status(400).send({
                    success: false,
                    msg : "no se pudo insertar los datos",
                    error
                }));                   
                }else{
                    res.status(400).json({
                        success: false,
                        msg:"Ese codigo ya existe"
                    })
                }
            }); 
                 
        }
        
    }

    //ruta para mostar todas las designaciones
    static list(req, res) {
        return grupo_asignacion
        .findAll()
        .then(data => res.status(200).send(data));
    }

    //ruta para poder mostrar un solo grupo designacion 
    static listOne(req, res){                
        const { id_grupo } = req.params 
        grupo_asignacion.findAll({
            where: {id : id_grupo}
            //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
            res.send(data);
        });     
    }

    // ruta para actualizar grupo
    static modify_grupo(req, res) {
        const {  descripcion } = req.body
        return grupo_asignacion
          .findByPk(req.params.id_grupo)
          .then((data) => {
            data.update({
              descripcion: descripcion || data.descripcion,
            })
            .then((update) => {
                res.status(200).send({
                    success: true,
                    msg: 'Grupo actualizado',
                    data: {
                      descripcion: descripcion || update.descripcion,
                    }
                })
            })
            .catch(error => res.status(400).send({
                success: false,
                msg : "No se pudo actualizar los datos",
                error
            }));
        })
        .catch(error => res.status(400).send({
            success: false,
            msg : "No se pudo actualizar los datos",
            error
        }));
    }

    static verAsignacion_data(req, res) {
        return grupo_asignacion
          .findAll({
              attributes:['id','descripcion','codigo']
          })
          .then(grupoasig => res.status(200).send(grupoasig));
    }
}

export default asignacion
