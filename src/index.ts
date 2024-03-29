import { Sequelize, DataTypes } from 'sequelize';  // Voir : https://sequelize.org/docs/v6/getting-started/

import express from "express"; // framework pour executer le back
import "dotenv/config"; // cela permet de récupérer des infos de config du .env
import cors from 'cors'; // permet la communication de données entre plusieurs partie du projet

// Import des routes
import { authRouter } from "./router/authRouter";
import { userRouter } from "./router/userRouter";

// Import des tables principales
import { UserModel } from './models/UserModel';
import { ProjectModel } from './models/ProjectModel';
import { MemoSheetModel } from './models/MemoSheetModel';

// Import des tables de jonction (celles pour qui des champs ont été rajoutées dans les modèles)
import { CommentModel } from './models/junction/CommentModel';
import { ScenarioModel } from './models/junction/ScenarioModel';
import { PageModel } from './models/junction/PageModel';
import { TokenBlackListModel } from './models/TokenBlackListModel';

// import { FavoriteModel } from './models/junction/FavoriteModel';
// import { UserHasMemoSheetModel } from './models/junction/UserHasMemoSheetModel';

const databaseHost = process.env.HOST as string;
const databasePassword = process.env.PASSWORD as string;
const databaseName = process.env.DATABASE_NAME as string;
const databaseUsername = process.env.USERNAME as string;

/*
export const sequelize = new Sequelize(database_name, username, password, {
  host: host,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    },
    dialectModule: require('pg'),
});
*/

// Création de la BDD
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

// Création des tables principales par Sequelize
export const User = UserModel(sequelize);
export const Project = ProjectModel(sequelize);
export const MemoSheet = MemoSheetModel(sequelize);

// Création des tables de jonction par Sequelize (qui comportent des champs propres à elles-mêmes)
export const Comment = CommentModel(sequelize);
export const Scenario = ScenarioModel(sequelize);
export const Page = PageModel(sequelize);
export const TokenBlackList = TokenBlackListModel(sequelize);

// export const Favorite = FavoriteModel(sequelize);
// export const UserHasMemoSheet = UserHasMemoSheetModel(sequelize);
// export const ScenarioHasPage = ScenarioHasPageModel(sequelize);

// Création des clés référentielles dans les différentes tables par Sequelize

// RELATION 1, * ("one to many")
// un utilisateur peut publier 0 ou plusieurs projet(s).
// un projet peut être publié par 1 et 1 seul utilisateur.
User.hasMany(Project);
Project.belongsTo(User);

// RELATION 1, * ("one to many")
// un projet peut avoir 0 ou plusieurs scénario(s).
// un scénario peut appartenir à 1 et 1 seul projet.
Project.hasMany(Scenario);
Scenario.belongsTo(Project);

// RELATION 1, * ("one to many")
// un projet peut avoir 0 ou plusieurs page(s).
// une page peut appartenir à 1 et 1 seul projet.
Project.hasMany(Page);
Page.belongsTo(Project);

// RELATION 1, * ("one to many")
// un commentaire peut avoir 0 ou plusieurs scénario(s).
// un scénario peut appartenir à 1 et 1 seul commentaire.
Comment.hasMany(Scenario);
Scenario.belongsTo(Comment);

// RELATION 1, * ("one to many")
// un commentaire peut avoir 0 ou plusieurs page(s).
// une page peut appartenir à 1 et 1 seul commentaire.
Comment.hasMany(Page);
Page.belongsTo(Comment);

// RELATION *, * ("many to many")
// un utilisateur peut mettre en favori 0 ou plusieurs projet(s).
// un projet peut être mis en favori par 0 ou plusieurs utilisateur(s).
User.belongsToMany(Project, { through: 'favorite' }); 
Project.belongsToMany(User, { through: 'favorite' });

// RELATION *, * ("many to many")
// un scénario peut avoir 1 ou plusieurs page(s).
// une page peut appartenir à 0 ou à plusieurs scénario(s).
Scenario.belongsToMany(Page, { through: 'scenario_has_page' }); 
Page.belongsToMany(Scenario, { through: 'scenario_has_page' });

// RELATION *, * ("many to many")
// un utilisateur peut commenter 0 ou plusieurs projet(s).
// un projet peut être commenté par 0 ou plusieurs utilisateur(s).
User.belongsToMany(Project, { through: Comment });
Project.belongsToMany(User, { through: Comment });

// RELATION *, * ("many to many")
// un utilisateur peut avoir 0 ou plusieurs fiche(s) mémo.
// une fiche mémo peut appartenir à 0 ou à plusieurs utilisateur(s).
User.belongsToMany(MemoSheet, { through: 'user_has_memo_sheet' }); 
MemoSheet.belongsToMany(User, { through: 'user_has_memo_sheet' });


// sequelize.sync( {force: true} )  // Réinitialise les données de la BDD à chaque fois que l'on execute le programme avec la commande "npm run dev" ou "npm run start".

sequelize.sync()  // Conserve les données de la BDD à chaque fois que l'on execute le programme avec la commande "npm run dev" ou "npm run start".


async function connexionTest() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connexionTest();


// ROUTING

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;

require('dotenv').config();

const app = express();
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/toto', (req, res) => {
    res.send('Toto');
  });


const apiRouter = express.Router();

// Route pour l'authentification des utilisateurs
apiRouter.use('/auth', authRouter);

// Route pour les utilisateurs
apiRouter.use('/users', userRouter);

// Route pour les projets

// Route pour les fiches mémos


// Utilisation du router api (router = ensemble de routes)
app.use('/api', apiRouter)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}!`)
}); // permet au site d'être executé.