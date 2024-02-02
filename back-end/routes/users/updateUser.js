const express = require("express")
const router = express.Router()
const db = require("../../database")
const md5 = require("md5")

router.patch("/api/user/:id", (req, res, next) => {
  const { username, email, password } = req.body

  const updateSQL = `UPDATE User set
  username = coalesce(?,username), 
  email = COALESCE(?,email), 
  password = coalesce(?,password)
  
  WHERE id = ?`

  const updatedUser = {
    username,
    email,
    password: req.body.password ? md5(password) : undefined,
  }

  const params = [
    updatedUser.username,
    updatedUser.email,
    updatedUser.password,
    req.params.id,
  ]

  db.run(updateSQL, params, (err) => {
    if (err) {
      res.status(400).json({ error: res.message })
      return
    }
    res.json({
      message: "User successfully updated!",
      data: updatedUser,
    })
  })
})

module.exports = router
