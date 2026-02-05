const Product = require('../models/Product');
const Order = require('../models/Order');

const calculateCartTotals = (cart) => {
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
};

exports.getHome = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.render('home', {
    title: 'ShopSphere | Home',
    description: 'Discover top products at great prices on ShopSphere.',
    products
  });
};

exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    return res.status(404).render('404', { title: 'Product Not Found', description: 'Product not found.' });
  }

  return res.render('product-details', {
    title: `${product.name} | ShopSphere`,
    description: product.description.slice(0, 150),
    product
  });
};

exports.addToCart = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    return res.status(404).send('Product not found');
  }

  const quantity = Math.max(1, Number(req.body.quantity) || 1);
  const existing = req.session.cart.find((item) => String(item.productId) === String(product._id));

  if (existing) {
    existing.quantity += quantity;
  } else {
    req.session.cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity
    });
  }

  return res.redirect('/cart');
};

exports.getCart = (req, res) => {
  const totals = calculateCartTotals(req.session.cart);
  res.render('cart', {
    title: 'Your Cart | ShopSphere',
    description: 'View and manage your shopping cart before checkout.',
    cart: req.session.cart,
    ...totals
  });
};

exports.updateCartItem = (req, res) => {
  const quantity = Number(req.body.quantity);
  req.session.cart = req.session.cart
    .map((item) => {
      if (String(item.productId) === String(req.params.id)) {
        return { ...item, quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : item.quantity };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);

  res.redirect('/cart');
};

exports.removeCartItem = (req, res) => {
  req.session.cart = req.session.cart.filter((item) => String(item.productId) !== String(req.params.id));
  res.redirect('/cart');
};

exports.getCheckout = (req, res) => {
  const totals = calculateCartTotals(req.session.cart);
  if (req.session.cart.length === 0) {
    return res.redirect('/');
  }

  return res.render('checkout', {
    title: 'Checkout | ShopSphere',
    description: 'Place your order securely at ShopSphere.',
    cart: req.session.cart,
    ...totals,
    successMessage: null
  });
};

exports.placeOrder = async (req, res) => {
  if (req.session.cart.length === 0) {
    return res.redirect('/');
  }

  const { customerName, email, shippingAddress } = req.body;
  const totals = calculateCartTotals(req.session.cart);

  await Order.create({
    customerName,
    email,
    shippingAddress,
    items: req.session.cart,
    totalAmount: totals.total
  });

  req.session.cart = [];

  return res.render('checkout', {
    title: 'Checkout | ShopSphere',
    description: 'Order placed successfully.',
    cart: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
    successMessage: 'Order placed successfully! Thank you for shopping with us.'
  });
};
