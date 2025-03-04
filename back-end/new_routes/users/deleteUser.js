const express = require("express")
const router = express.Router()
const User = require("../../models/User") // Import your Sequelize User model

router.delete("/api/user/:id", async (req, res) => {
  const id = req.params.id

  try {
    // Delete the user with the specified ID
    const result = await User.destroy({ where: { id } })

    // If no user was deleted, return a 404
    if (result === 0) {
      return res.status(404).json({ error: `User with id ${id} not found.` })
    }

    // Respond with a success message
    res.status(200).json({
      message: "User successfully deleted!",
      rows: result, // Number of rows deleted
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." })
  }
})

module.exports = router
