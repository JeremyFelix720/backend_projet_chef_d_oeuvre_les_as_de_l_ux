import { Router, Response, Request } from "express";
import { User } from "../index";
import bcrypt from "bcrypt";
import "dotenv/config";

export const userRouter = Router();

// Ajout d'un utilisateur
userRouter.post("/local/register", async (req, res) => {

 // LOCALISATION DU PROBLEME (d'après Anthony) : mauvaise lecture et réécriture de la requête d'entrée (req)
 
  console.log(req);

  const userPseudo = req.body.pseudonym;
  // const userBirthdate = req.body.birthDate;
  const userEmail = req.body.email;
  const userPhoneNumber = req.body.phoneNumber;
  /*
  const userStreetNumber: req.body.streetNumber;
  const userStreetName: req.body.streetName;
  */
  const userCity = req.body.city;
  const userPostalCode = req.body.postalCode;
  const userPassword = req.body.password;
  const userRib = req.body.rib;
  const userPoints = req.body.points;
  const userGrade = req.body.grade;


// Vérification si un utilisateur existant dans la BDD a le même pseudonyme et le même email que celui que l'on souhaite rajouter.
  const samePseudonym = await User.findOne( {where: {pseudonym: userPseudo} })
  const sameUserEmail = await User.findOne( {where: {email: userEmail} })

  if(samePseudonym === null && sameUserEmail === null){ // si aucun utilisateur similaire n'a été trouvé précédement.
    // Le mdp "userPassword" est hashé ici :
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
    const newUser = await User.create({
      // id: userId,
      pseudonym: userPseudo,
      // birthdate: userBirthdate,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      /*
      streetNumber: userStreetNumber,
      streetName: userStreetName,
      */
      city: userCity,
      postalCode: userPostalCode,
      password: hashedPassword, // Remplacement de la valeur initialement rentrée par l'utilisateur
      rib: userRib,
      points: userPoints,
      grade: userGrade,
      
    });

    delete newUser.dataValues.password  // mdp pas supprimé de la BDD mais seulement de l'objet renvoyé à l'utilisateur (qui n'en a pas besoin).

    res.status(200).json(
      {
        message: "L'utilisateur a bien été ajouté.",
        // ...myUser, // destructuration de l'objet myUser qui correxpond à aux lignes suivantes :
        // id: userId,
        pseudonym: userPseudo,
        //birthdate: userBirthdate,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        city: userCity,
        postalCode: userPostalCode,
        // password: hashedPassword,
        rib: userRib,
        points: userPoints,
        grade: userGrade
      }
    )
  } else {
      res.status(400).json(
        {
          message: "Il y a déjà un utilisateur ayant le même pseudonyme ou la même adresse."
        }
      )
    }
})

// Lecture des utilisateurs
userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Lecture d'un utilisateur
userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const savedUser = await User.findByPk(userId);
  res.status(200).json(savedUser);
})

// Modification d'un utilisateur
userRouter.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const userPseudo = req.body.pseudonym;
  const userEmail = req.body.email;
  const userPhoneNumber = req.body.phoneNumber;
  const userCity = req.body.city;
  const userPostalCode = req.body.postalCode;
  const userPassword = req.body.password;
  const userRib = req.body.rib;
  const userPoints = req.body.points;
  const userGrade = req.body.grade;

  const userModified = {
    pseudonym: userPseudo,
    email: userEmail,
    phoneNumber: userPhoneNumber,
    city: userCity,
    postalCode: userPostalCode,
    password: userPassword,
    rib: userRib,
    points: userPoints,
    grade: userGrade
  };

  await User.update(userModified, {where:
      {id: userId}
    });
  res.status(200).json(userModified);
})