// Configuración de la aplicación 
import express from "express";
import session from "express-session";
import databaseConnection from "./config/database.js";
import Position from "./models/position.js";
import User from "./models/user.js";

const app = express();
const PORT = 3001;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true}));

// Aqui termina la configuración de la aplicación

// Middleware que se encarga de comprobar si un usuario
// debe iniciar sesión
const requireAuthentication = async(req, res, next) => {
    if(req.session && req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);

            if(user) {
                req.user = user;

                next();
            } else {
                res.redirect("/signIn");
            }
        } catch(error) {
            throw error
        }
    } else {
        res.redirect("/signIn");
    }
}

// Aqui comienzan las rutas

// Ruta a la página principal
app.get("/", requireAuthentication, async (req, res) => {
    res.render("index", { user: req.user });
});

// Ruta de formulario de registro de usuario
app.get("/signUp", (req, res) => {
    res.render("signUp");
});

// Ruta que guarda el usuario en la base de datos

app.post("/users", async(req, res) => {
    try {
        const user = User.build(req.body);

        await user.save()

        //Con esto el nuevo usuario no tiene que iniciar sesión

        req.session.userId = user.id;
        req.user = user;
        
        res.redirect("/");
    } catch(error) {
        throw error;
    }
});

// Ruta para el formulario de inicio de sesión 
app.get("/signIn", (req, res) => {
    res.render("signIn", { error: null });
});

// Ruta para iniciar sesión 
app.post("/sessions", async (req, res) => {
    try {
      const { user_name, password } = req.body;
      const user = await User.findOne({ where: { user_name } });
  
      // .autenticate es una funciona definida en el modelo User
      if (user && user.authenticate(password)) {
        req.session.userId = user.id;
  
        res.redirect("/");
      } else {
        res.render("signIn", { error: "Usuario o Contraseña incorrecta" });
      }
    } catch(error) {
      throw error;
    }
  });

// Ruta para cerrar sesión 
app.get("/signOut", requireAuthentication, (req, res) => {
    req.session.destroy();

    res.redirect("/");
});

// Ruta para listar los usuarios
app.get("/users", requireAuthentication, async (req, res) => {
    try {
        const users = await User.findAll();

        res.render("users/index", { users, user: req.user });
    } catch(error) {
        throw error;
    }
});

// Ruta para listar los funcionarios
app.get("/positions", requireAuthentication, async (req, res) => {
    try{
        const position = await Position.findAll();

        res.render("positions/index", { position, user: req.user });
    } catch(error) {
        next(error);
    }
});

// Ruta para agregar un nuevo funcionario
app.get("/positions/new", requireAuthentication, (req, res) => {
    res.render("positions/new", { user: req.user });
});

// Ruta para crear un nuevo funcionario
app.post("/positions", requireAuthentication, async (req, res) => {
    try {
        const position = Position.build(req.body);

        await position.save();

        res.redirect("/positions");
    } catch(error) {
        next(error);
    }
});

// Ruta para la edición de funcionario
app.get("/positions/:id/edit", requireAuthentication, async (req, res) => {
    try {
        const position = await Position.findByPk(req.params.id);

        res.render("positions/edit", { position, user: req.user});
    } catch(error) {
        next(error);
    }
});

// Ruta para actualizar la información del funcionario
app.post("/positions/:id", requireAuthentication, async (req, res) => {
    try {
        const position = await Position.findByPk(req.params.id);

        await position.update(req.body);

        res.redirect("/positions");
    } catch(error) {
        next(error);
    }
});

// Ruta para eliminar un funcionario
app.get("/positions/:id/delete", requireAuthentication, async (req, res) => {
    try {
        const position = await Position.findByPk(req.params.id);

        await position.destroy();

        res.redirect("/positions");
    } catch(error) {
        throw error;
    }
});

// fin de rutas 

// Función para iniciar la aplicación
const init = async () => {
    try {
      await databaseConnection.sync();
      app.listen(PORT, () => {
        console.log(`Servidor escuchando el puerto ${PORT}`)
      });
    } catch(error) {
      throw error
    }
  }
  
  // Aqui se inicia la apliacion
  init();