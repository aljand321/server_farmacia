import model from '../models';

const sequelize = require('sequelize');
const Op = sequelize.Op;

const { medicamentos } = model;
const { grupo_asignacion } = model;
const { cantidad_fecha } = model;


class Medicamentos {
    static reg_medicamentos(req,res){
        if( req.body.codificacion == "" || isNaN(req.body.codificacion) || req.body.nombre == "" || req.body.generico == "" || req.body.unida_medida == "" || req.body.descripcion == "" || isNaN(req.body.cantidad_unidad) || isNaN(req.body.precio_compra)|| isNaN(req.body.precio) ){
            if(req.body.codificacion == ""){
                res.status(400).json({
                    success:false,
                    msg: "Codificación no puede estar vació"
                })
            }else if(isNaN(req.body.codificacion)){
                res.status(400).json({
                    success:false,
                    msg: "Codificación solo puede contener numeros"
                })
            }else if (req.body.nombre == ""){
                res.status(400).json({
                    success:false,
                    msg: "Por favor introdusca nombre del Medicamento"
                })
            }else if(req.body.generico == ""){
                res.status(400).json({
                    success:false,
                    msg: "Por favor introdusca generico del medicamento"
                })
            }else if (req.body.unida_medida == ""){
                res.status(400).json({
                    success:false,
                    msg: "Por favor introdusca unidad de medida del medicamento"
                })
            }else if (req.body.descripcion == ""){
                res.status(400).json({
                    success:false,
                    msg: "Por favor selecione grupo designacion"
                })     
            }else if (isNaN(req.body.cantidad_unidad)){
                res.status(400).json({
                    success:false,
                    msg: "Cantidad solo puede contener numeros"
                })   
            }else if(isNaN(req.body.precio_compra)) {
                res.status(400).json({
                    success:false,
                    msg: "Precio compra solo puede contener numeros"
                })   
            }else if(isNaN(req.body.precio)){
                res.status(400).json({
                    success:false,
                    msg: "Precio solo puede contener numeros"
                }) 
            }
        }else{
            medicamentos.findAll({
                where: {codificacion: req.body.codificacion}
                //attributes: ['id', ['description', 'descripcion']]
            })
            .then((codificacion) => {
                if(codificacion == ""){
                    medicamentos.findAll({
                        where: {nombre: req.body.nombre}
                        //attributes: ['id', ['description', 'descripcion']]
                      }).then((nombre) => {
                          if(nombre == ""){
                            grupo_asignacion.findAll({
                                where: {descripcion: req.body.descripcion}
                                //attributes: ['id', ['description', 'descripcion']]
                            }).then((grupo) => {
                                if(grupo == ""){
                                    res.status(400).json({
                                        success:false,
                                        msg: "Ese grupo designacion no esta registrado"
                                    })
                                }else{
                                    const { codificacion,nombre,generico,unida_medida, forma_f, presentacion, receta_medico,cantidad_unidad,precio_compra,precio } = req.body
                                    var cantidad_inicial = req.body.cantidad_unidad
                                    var entradas = 0
                                    var ventas = 0
                                    var id_grupoAsig  = grupo[0].id
                                    return medicamentos
                                    .create({
                                        codificacion,
                                        nombre,
                                        generico,
                                        unida_medida,
                                        forma_f, 
                                        presentacion, 
                                        receta_medico,

                                        cantidad_inicial,// esto es la cantidad que hay al momento de registrar el producto
                                        entradas, // esto es los pedidos o las entradas del producto
                                        cantidad_unidad, // esta es la cantidad del producto lo que queda en stock

                                        precio_compra,
                                        precio,
                                        ventas, // esto es el numero de ventas que se realizo del producto
                                        
                                        id_grupoAsig 
                                    })
                                    .then(data => res.status(201).send({
                                        success: true,
                                        msg: `Se inserto el medicamto: ${nombre}`,
                                        data
                                    }))
                                    .catch(error => res.status(400).send({
                                        success: false,
                                        msg: "No se pudo introducir los datos",
                                        error
                                    }));
                                }
                            });
                            
                          }else{
                            res.status(400).json({
                                success:false,
                                msg: "Ya existe ese nombre"
                            }) 
                          }
                      });  
                }else{
                    res.status(400).json({
                        success:false,
                        msg: "Ya existe esa codificacion"
                    })                   
                }
            });
           
        }
       

    }
    //ruta para poder listar todos los medicamentos
    static list_medicamentos(req, res) {
        return medicamentos
        .findAll({
            include:[{
                model:grupo_asignacion
            }]
        })
        .then(datas => res.status(200).send(datas));
    }

    static list_med(req, res) {
        return medicamentos
        .findAll({
            include:[
                {model: grupo_asignacion}
            ]
        })
        .then(datas => res.status(200).send(datas));
    }

    //ruta para mostar un solo medicamento
    static listOne(req, res){                
        const { id_medicamento } = req.params;  
        medicamentos.findAll({
            where : {id: id_medicamento},
            include : [
                { model : grupo_asignacion }
            ]
            //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
            if(data == ""){
                res.status(400).json({
                    success:false,
                    msg:"Ese medicamento no esta registrado"
                })
            }else{
                res.send(data);
            }
            
        });     
    }
    //ruta para mostar un solo medicamento
    static one_medicamento_fecha(req, res){                
        const { id_medicamento } = req.params;  
        medicamentos.findAll({
            where : {id: id_medicamento},
            attributes:[ 'id', 'nombre', 'codificacion' ],
            include : [
                { model : cantidad_fecha, attributes:[ 'id', 'fehca_vencimineto', 'cantidad_unidad', 'precio', 'id_medicamento' ] },
                
            ]
            //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
            if(data == ""){
                res.status(400).json({
                    success:false,
                    msg:"Ese medicamento no esta registrado"
                })
            }else{
                res.send(data);
            }
            
        });     
    }
    //ruta para actualizar medicamento
    static modificar_medicamento(req, res) {
        const { nombre,generico,unida_medida, forma_f, presentacion, cantidad_unidad, precio_compra, precio,id_grupoAsig } = req.body
        console.log(req.body, " 2222222222222222222233333333333333333333333333333333333")
        return medicamentos
          .findByPk(req.params.id_medicamento)
          .then((data) => {
            data.update({
                nombre: nombre || data.nombre,
                generico: generico || data.generico,
                unida_medida: unida_medida || data.unida_medida,
                forma_f: forma_f || data.forma_f,
                presentacion: presentacion || data.presentacion,
                cantidad_unidad: cantidad_unidad || data.cantidad_unidad,
                precio_compra: precio_compra || data.precio_compra,
                precio: precio || data.precio,
                id_grupoAsig: id_grupoAsig || data.id_grupoAsig,
            })
            .then((update) => {
              res.status(200).send({
                success:true,
                msg: 'Se actualizo en medicamentos',
                data: {
                    nombre: nombre || update.nombre,
                    generico: generico || update.generico,
                    unida_medida: unida_medida || update.unida_medida,
                    forma_f: forma_f || update.forma_f,
                    presentacion: presentacion || update.presentacion,
                    cantidad_unidad: cantidad_unidad || update.cantidad_unidad,
                    precio_compra: precio_compra || update.precio_compra,
                    precio: precio || update.precio,
                    id_grupoAsig: id_grupoAsig || update.id_grupoAsig,
                }
              })
            })
            .catch(error => {
                console.log("11111", error)
                res.status(400).json({
                    success: false,
                    msg: "No se pudo actualizar los datos"
                })
            });
        })
        .catch(error => {
            console.log("2222222222", error)
            res.status(500).json({
                success:false ,
                msg: "No se pudo actualizar los datos"
            })
        });
    }

     //ruta para mostar un solo medicamento segun el nombre del medicamento
     static nombre_medicamento(req, res){                
        const { id_med } = req.params;  
        medicamentos.findAll({
            where:{id: id_med}
            //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
            console.log(data)
            if(data == ""){
                res.status(200).json({
                    success: false,
                    msg: "Ese medicamento no esta registrado"
                })
            }else{
                res.send(data);
            }
            
        });     
    }

    static modificar_cantidad(req, res) {
        const { id_medicamento } = req.params
        medicamentos.findAll({
            where:{id: id_medicamento}
            //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
            if(data == ""){
                res.status(400).json({
                    success:false,
                    msg: "ese medicamentos no esta registrado"
                })
            }else{
                var cantidad_unidad = data[0].cantidad_unidad - req.body.cantidad
                var ventas = data[0].ventas + req.body.cantidad
                return medicamentos
                .findByPk(req.params.id_medicamento)
                .then((data) => {
                    data.update({

                        cantidad_unidad: cantidad_unidad || data.cantidad_unidad,
                        ventas: ventas || data.ventas

                    })
                    .then((update) => {
                      res.status(200).send({
                        success:true,
                        msg: 'Se actualizo la cantidad',
                        data: {

                            cantidad_unidad: cantidad_unidad || update.cantidad_unidad,
                            ventas: ventas || update.ventas,

                        }
                      })
                    })
                    .catch(error => res.status(400).send({
                        success: false,
                        msg: "No se pudo actualizar los datos",
                        error
                    }));
                })
                .catch(error => res.status(400).send({
                    success: false,
                    msg: "No se pudo actualizar los datos",
                    error
                }));
            }
        })
    }
    static sumar_cantidad(req, res) {
        const { id_medicamento } = req.params
        medicamentos.findAll({
            where:{id: id_medicamento}
            //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
            if(data == ""){
                res.status(400).json({
                    success:false,
                    msg: "ese medicamentos no esta registrado"
                })
            }else{
                var cantidad_unidad = data[0].cantidad_unidad + req.body.cantidad_unidad
                var entradas = data[0].entradas + req.body.entradas
                return medicamentos
                .findByPk(req.params.id_medicamento)
                .then((data) => {
                    data.update({
                        cantidad_unidad: cantidad_unidad || data.cantidad_unidad,
                        entradas:entradas||data.entradas                  
                    })
                    .then((update) => {
                      res.status(200).send({
                        success:true,
                        msg: 'Se actualizo la cantidad',
                        data: {
                            cantidad_unidad: cantidad_unidad || update.cantidad_unidad,
                            entradas:entradas||update.entradas                  

                        }
                      })
                    })
                    .catch(error => res.status(400).send({
                        success: false,
                        msg: "No se pudo actualizar los datos",
                        error
                    }));
                })
                .catch(error => res.status(400).send({
                    success: false,
                    msg: "No se pudo actualizar los datos",
                    error
                }));
            }
        })
    }

    // filter fechas medicamentos
    static filter_ventas(req, res) {
       
        const { fecha_inicio, fecha_final }  = req.body
        if(!fecha_final || !fecha_inicio){
            res.status(400).json({
                success:false,
                msg:"Inserte fecha inicio y fecha final  para poder buscar un rago de fechas"
            })
        }else{
            var _q = medicamentos;
            _q.findAll({
            where: {[Op.and]: [{createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]},
            })
            .then(datas => {
                if(datas == ""){
                    res.status(400).json({
                        success:false,
                        msg:"No hay nada que mostrar"
                    })
                }else{
                    res.status(200).json(datas)
                }
                
            }); 
        }
    }

    //serv para mostar todos los medicamentos
    static mostrar_med(req, res) {
        const { id_grupo } = req.body;
        if (!id_grupo){
          res.status(400).json({
            success:false,
            msg:"Selecione grupo por favor"
          })
        }else{
            medicamentos.findAll({
            where:{ id_grupoAsig: id_grupo },
            include:[{
              model:grupo_asignacion
            }]
            //attributes: ['id', ['description', 'descripcion']]
          }).then((data) => {
            if(data == ""){
              res.status(400).json({
                success:false,
                msg:"No hay medicamentos en ese grupo"
              })
            }else{
              res.status(200).json(data);
            }
            
          });  
        }
         
      }
}


export default Medicamentos