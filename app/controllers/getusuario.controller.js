const db = require('../config/db.config.js');
const Usuario = db.Usuario;

/*
conseguir el rol del usuario con la contrase;a y el usuario, primero validar si hay una respues de que 
el nombre y el contrase;a sean iguales, para luego venir y jalar el el id del usaur y verificar el rrol atra vez de su id, 
podria de una enontrarl atravez de dos campos encontrar el 3ro sin tenr que ingresar o meterme con el id solamente buscar el rol = nombre usuario 



modificar usuarios y tipo de usuarios ya que ahora el id de usario sera un rol de l cual es int ya no sera algo del cuual 
uno tendra la libertad de modificar de una vez o es uno o es el otro 


USUARIOS	
id usuario	primary key 
id persona	int
rol usuario	Boolean  ----- ya no se usara el rol ya que al final solamente sera entre uno o el otro para habilitar que sea admin  
usuario 	Varchar(20)
contrasena	Varchar(20)
estado	Boolean




*/


exports.authenticateUser = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Validar que los campos no estén vacíos
        if (!usuario || !contrasena) {
            return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
        }

        // Buscar el usuario en la base de datos
        const user = await Usuario.findOne({
            where: {
                usuario: usuario,
                contrasena: contrasena
            }
        });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Obtener el rol del usuario
        const esAdministrador = user.rol_usuario;

        // Responder con el rol del usuario
        res.status(200).json({
            message: "Autenticación exitosa",
            usuario: user.usuario,
            rol: esAdministrador ? "Administrador" : "Usuario Regular",
            estado: user.estado
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al autenticar el usuario",
            error: error.message
        });
    }
};