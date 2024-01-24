
/*

// Connexion d'un utilisateur
authRouter.post("/local", async (req, res) => {
  const userEmail = req.body.identifier;
  const userPassword = req.body.password;

  const sameUserEmail = await User.findOne( {where: {email: userEmail} })

  if(sameUserEmail) {

    const isPasswordCorrect = await bcrypt.compare(userPassword, sameUserEmail.dataValues.password);

    if (isPasswordCorrect) {
      delete sameUserEmail.dataValues.password;

      const token = jwt.sign(sameUserEmail.dataValues, process.env.JWT_SECRET!);
      res.status(200).json({
        message: "L'utilisateur a bien été connecté.",
        jwt: token,
      });
      // JWT SECRET est la clé pour coder et encoder les informations communiquées entre le temps entre le client et le serveur.
    }
    else {
        res.status(400).send("Email or Password is incorrect");
    }
  } else {
    res.status(400).json(
      {
        message: "Il n'existe aucun compte ayant ce couple email / mot de passe.",
      }
    )
  }
})

// Déconnexion d'un utilisateur
authRouter.post("/logout", checkToken, async (req, res) => {
  const decoded = jwt.decode(req.body.token!) as DecodeToken
  const user = await User.findOne({ where: { id: decoded.id } });
  if (user) {
      await TokenBlackList.create({ token: req.body.token });
      res.send("Logged out");
  }
  else {
      res.status(404).send("User not found");
  }
})

*/