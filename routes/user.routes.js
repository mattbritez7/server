const express = require("express");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr');
const transporter  = require('../config/mailer.js');
const { JWT } = require('dotenv').config().parsed;


const router = express.Router();
const cryptr = new Cryptr('myTotallySecretKey');

router.get("/allusers", async (req, res) => {
  try{
  const users = await Users.find();
  res.json(users);
} catch(err){
  console.log(err)
}
});

router.get("/in-check", async (req, res) => {
  try{
  const users = await Users.find({IsCheck: false});
  res.json(users);
} catch(err){
  console.log(err)
}
});

router.put("/checked", async (req, res) => {
  try{
  const { Email, IsCheck} = req.body;
  const filter = {Email: Email}
  const update = {IsCheck: IsCheck}
  const checked = await Users.findOneAndUpdate(filter, update);

  res.json({status: "success", checked});
  } catch(err){
    console.log(err)
  }
});

router.post("/delete-user", async (req, res) => {
  try{
  const { Email } = req.body;
  console.log(Email)
  const userDelete = await Users.findOneAndDelete({ Email });
  res.json(userDelete);
} catch(err){
  console.log(err)
}
});

router.post("/register", async (req, res) => {
  const { Name, Email, Password, IsAdmin } = req.body;
  try {
    const user = await Users.find({ Email });
    if (user.length === 0) {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const users = new Users({
        Name,
        Password: hashedPassword,
        Email,
        IsAdmin,
      });
      await users.save();
      let id = users._id
      console.log(users._id)
      const token = jwt.sign({ id: id.toString() }, JWT, {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      });
       res.json({ status: "User create sucessfuly", token });
    } else {
       res.status(401).json({message: "your account already exists"});
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await Users.find({ Email });
    if(user !== []) {
      const passwordCorrect = bcrypt.compareSync(
        Password,
        user[0].Password
      );
      if (passwordCorrect === true) {
        let id = user[0]._id
        console.log(id.toString())
        const token = jwt.sign({id: id.toString()}, JWT, {
          expiresIn: 60 * 60 * 24, // expires in 24 hours
        });
        
        return res.status(200).send({token, user: user[0]});
    }
    } else {
      return res.status(401).send({message: 'invalid password or email'})
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/reset-password", async (req, res) => {
  try{
  const { Email, Password } = req.body;
  const decodeEmail = cryptr.decrypt(Email);
  const hashedPass = await bcrypt.hash(Password, 10);
  console.log(decodeEmail)
  const filter = { Email: decodeEmail };
  const update = { Password: hashedPass };
  const changePSW = await Users.findOneAndUpdate(filter, update);

  res.json({status: "success", changePSW});

  } catch(e) {
    console.error(e)
  }
})

router.post('/sendReset', async (req, res) => {
  const { Email } = req.body
  try {
    const hashedEmail = cryptr.encrypt(Email)

    const user = await Users.find({ Email });

    if (!user) {
      res.status(400).send({ msg: 'User not found.' })
    } else {
      await transporter.sendMail({
        from: 'wallet.pfhenry@outlook.com', // sender address
        to: `${Email}`, // list of receivers
        subject: 'Reset password', // Subject line
        html: `<h1>Alef.</h1>
        <br/>
        <p> Para resetear tu contraseña entra al siguiente link. </p>
        <a href=${process.env.URI_CLIENT}/reset/${hashedEmail}> Click aca! </a>
        <br/>
        <p>Gracias por confiar en nosotros <strong>wallet</strong>.</p>`
      })
      res.status(200).send({ msg: 'Success.' })
    }
  } catch (error) { console.error(error) }
})


router.get("/me", async (req, res) => {
  try {
  const alt = req.headers.authorization.split(' ')[1].trim();
  
  const decoded = jwt.verify(alt, JWT);
  const user = await Users.findById(decoded.id);
  res.status(200).send({
    name: user.Name,
    email: user.Email,
    isAdmin: user.IsAdmin
  })
  
  } catch (error) { res.status(404).json(error) }
})


module.exports = router;
