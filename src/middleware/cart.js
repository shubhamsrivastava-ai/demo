const initializeCart = (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.locals.cartCount = req.session.cart.reduce((sum, item) => sum + item.quantity, 0);
  next();
};

module.exports = initializeCart;
