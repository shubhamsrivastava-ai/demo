const adminAuth = (req, res, next) => {
  const providedKey = req.headers['x-admin-key'] || req.query.adminKey;

  if (!process.env.ADMIN_KEY || providedKey !== process.env.ADMIN_KEY) {
    return res.status(403).send('Forbidden: invalid admin key. Provide ?adminKey=YOUR_KEY');
  }

  return next();
};

module.exports = adminAuth;
