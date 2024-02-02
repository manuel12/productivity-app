const jwt = require("jsonwebtoken")

exports.getSecretKey = () => "mySecretKey"

// Token authentication middleware
exports.authenticateToken = (req, res, next) => {
  // Extract JWT token from request header
  const errorMsg = "Unauthorized: No token provided."

  if (!req.headers.authorization)
    return res.status(401).json({ error: errorMsg })

  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: errorMsg })
  }

  // Verify JWT token
  jwt.verify(token, this.getSecretKey(), (err, user) => {
    if (err) {
      return res.status(403).json({ error: err })
    }
    req.user = user // Set user data in request object for later use
    next() // Pass control to next middleware or route handler
  })
}
