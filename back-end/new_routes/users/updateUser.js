const express = require("express")
const router = express.Router()
const md5 = require("md5")
const User = require("../../models/User") // Import your Sequelize User model

router.patch("/api/user/:id", async (req, res) => {
  const { username, email, password } = req.body
  const userId = req.params.id

  try {
    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } })

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with id ${userId} not found.` })
    }

    // Prepare the updated fields
    const updatedFields = {}
    if (username !== undefined) updatedFields.username = username
    if (email !== undefined) updatedFields.email = email
    if (password !== undefined) updatedFields.password = md5(password)

    // Update the user
    await user.update(updatedFields)

    res.status(200).json({
      message: "User successfully updated!",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." })
  }
})

module.exports = router
