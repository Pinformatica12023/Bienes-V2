// Configuración de la aplicación 
import express from "express";
import session from "express-session";
import databaseConnection from "./config/database.js";
import Position from "./models/position.js";
import User from "./models/user.js";
import Transfer from "./models/transfer.js"
import Item from "./models/item.js"
import utilsRoutes from "./routes/utilsRoutes.js";

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
app.use(express.urlencoded({ extended: true }));
app.use("/utils", utilsRoutes);

// Middleware que se encarga de comprobar si un usuario debe iniciar sesión
const requireAuthentication = async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);

            if (user) {
                req.user = user;
                next();
            } else {
                res.redirect("/signIn");
            }
        } catch (error) {
            next(error);
        }
    } else {
        res.redirect("/signIn");
    }
};

// Rutas

app.get("/", requireAuthentication, async (req, res) => {
    res.render("index", { user: req.user });
});

app.get("/signUp", (req, res) => {
    res.render("signUp");
});

app.post("/users", async (req, res) => {
    try {
        const user = User.build(req.body);
        await user.save();

        req.session.userId = user.id;
        req.user = user;

        res.redirect("/");
    } catch (error) {
        throw error;
    }
});

app.get("/signIn", (req, res) => {
    res.render("signIn", { error: null });
});

app.post("/sessions", async (req, res) => {
    try {
        const { user_name, password } = req.body;
        const user = await User.findOne({ where: { user_name } });

        if (user && user.authenticate(password)) {
            req.session.userId = user.id;
            res.redirect("/");
        } else {
            res.render("signIn", { error: "Usuario o Contraseña incorrecta" });
        }
    } catch (error) {
        throw error;
    }
});

app.get("/signOut", requireAuthentication, (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.get("/users", requireAuthentication, async (req, res) => {
    try {
        const users = await User.findAll();
        res.render("users/index", { users, user: req.user });
    } catch (error) {
        throw error;
    }
});

app.get("/positions", requireAuthentication, async (req, res, next) => {
    try {
        const position = await Position.findAll();
        res.render("positions/index", { position, user: req.user });
    } catch (error) {
        next(error);
    }
});

app.get("/positions/new", requireAuthentication, (req, res) => {
    res.render("positions/new", { user: req.user });
});

app.post("/positions", requireAuthentication, async (req, res, next) => {
    try {
        const position = Position.build(req.body);
        await position.save();
        res.redirect("/positions");
    } catch (error) {
        next(error);
    }
});

app.get("/positions/:identificationNumber/edit", requireAuthentication, async (req, res, next) => {
    try {
        const position = await Position.findByPk(req.params.identificationNumber);
        res.render("positions/edit", { position, user: req.user });
    } catch (error) {
        next(error);
    }
});

app.post("/positions/:identificationNumber", requireAuthentication, async (req, res, next) => {
    try {
        const position = await Position.findByPk(req.params.identificationNumber);
        await position.update(req.body);
        res.redirect("/positions");
    } catch (error) {
        next(error);
    }
});

app.get("/positions/:identificationNumber/delete", requireAuthentication, async (req, res) => {
    try {
        const position = await Position.findByPk(req.params.identificationNumber);
        await position.destroy();
        res.redirect("/positions");
    } catch (error) {
        throw error;
    }
});

app.get("/transfers", requireAuthentication, async (req, res, next) => {
    try {
        const transfer = await Transfer.findAll({
            include: [
                { model: Item },
                { model: Position, as: "sender" },
                { model: Position, as: "receiver" }
            ]
        });
        res.render("transfers/index", { transfer, user: req.user });
    } catch (error) {
        next(error);
    }
});

app.get("/transfers/new", requireAuthentication, (req, res) => {
    res.render("transfers/new", { user: req.user });
});

app.post("/transfers", requireAuthentication, async (req, res, next) => {
    try {
        const transfer = Transfer.build(req.body);
        await transfer.save();
        res.redirect("/transfers");
    } catch (error) {
        next(error);
    }
});

app.post("/items", requireAuthentication, async (req, res, next) => {
    try {
        const item = Item.build(req.body);
        await item.save();
        res.redirect("/items");
    } catch (error) {
        next(error);
    }
});

app.get("/items", requireAuthentication, async (req, res, next) => {
    try {
        const item = await Item.findAll({
            include: {
                model: Transfer,
                include: [
                    { model: Position, as: "sender" },
                    { model: Position, as: "receiver" },
                ],
            },
        });

        res.render("items", { items: item, user: req.user });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error("Error capturado:", err.stack);
    res.status(500).send("¡Algo salió mal en el servidor!");
});

// Función para iniciar la aplicación
const init = async () => {
    try {
        await databaseConnection.sync();
        app.listen(PORT, () => {
            console.log(`Servidor escuchando el puerto ${PORT}`);
        });
    } catch (error) {
        throw error;
    }
};

// Inicio de la aplicación
init();
