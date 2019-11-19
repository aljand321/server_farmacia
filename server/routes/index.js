import asignacion from '../controllers/grupo_asignacion';
import Medicamentos from '../controllers/medicamentos';

import Fecha_Cantidad from '../controllers/fecha_cantidad';
import Pedidos from '../controllers/pedidos';
import Receta_Paciente from '../controllers/receta_paciente'
import Cliente from '../controllers/cliente'
import Receta_cliente from '../controllers/receta_cliente'


export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bookStore API!',
    }));

    

    //grupo designacion
    app.post('/api/reg_grupoDesignacion', asignacion.create_designacion);
    app.get('/api/mostrar_grupos', asignacion.list);
    app.get('/api/one_grupo/:id_grupo', asignacion.listOne);
    app.put('/api/update_grupo/:id_grupo', asignacion.modify_grupo);

    //rutas para medicamentos
    app.post('/api/reg_med', Medicamentos.reg_medicamentos );
    app.get('/api/mostrar_medicamentos', Medicamentos.list_medicamentos);
    app.get('/api/one_medicamento/:id_medicamento', Medicamentos.listOne);
    app.put('/api/update_medicamento/:id_medicamento', Medicamentos.modificar_medicamento)

    app.get('/api/nonbre_medicamento/:id_med' ,Medicamentos.nombre_medicamento)
    app.post('/api/update_cantidad/:id_medicamento', Medicamentos.modificar_cantidad) //esta ruta es para modificar la cantidad  y las ventas del medicamento

    app.get('/api/list_med', Medicamentos.list_med)// esta ruta muestra una lista de todos los medicamentos con su grupo asignacion
    app.post('/api/sumar_cantidad/:id_medicamento', Medicamentos.sumar_cantidad)


    //ruta para cantidad de medicamentos y las fechas
    app.post('/api/cerateFecha_Cantidad/:id_medicamento', Fecha_Cantidad.cerateFecha_Cantidad);
    app.get('/api/list_fecha_cantidad', Fecha_Cantidad.VerFechaCantidad);
    app.get('/api/one_fecha_medicamento/:id_medicamento', Fecha_Cantidad.listMedicamentos);


    //ruta para pedidos 
    app.post('/api/reg_pedido', Pedidos.create_pedidos );
    app.get('/api/list_pedidos', Pedidos.list_pedidos);
    app.get('/api/one_pedido/:id_pedido', Pedidos.one_pedido)
    app.post('/api/update_peidodo_almacen_of_farmacia/:id_pedido', Pedidos.update_peidodo_almacen_of_farmacia)
    app.post('/api/update_peidodo_farmacia/:id_pedido', Pedidos.update_peidodo_farmacia)

    // ruta para receta paciente
    app.post('/api/reg_receta_paciente', Receta_Paciente.create_receta );
    app.get('/api/recetas', Receta_Paciente.list_recetas)

    app.get('/api/one_receta_paciente/:id_receta_paciente',Receta_Paciente.one_receta_paciente )


    // ruta para clientes 
    app.post('/api/create_cliente',Cliente.create_cliente );
    app.get('/api/list_clients', Cliente.list_clients);
    app.get('/api/one_client/:id_cliente', Cliente.one_client)

    //ruta para reg receta cliente
    app.post('/api/create_receta_cliente/:id_cliente',Receta_cliente.create_receta_cliente);
    app.get('/api/list_recetas_clientes', Receta_cliente.list_recetas_cliente)
    

};