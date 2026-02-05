const Product = require('../models/Product');

exports.getAdminProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.render('admin/index', {
    title: 'Admin Panel | ShopSphere',
    description: 'Manage products from the ShopSphere admin panel.',
    products,
    adminKey: req.query.adminKey || ''
  });
};

exports.createProduct = async (req, res) => {
  const { name, description, price, imageUrl, stock, category } = req.body;
  await Product.create({ name, description, price, imageUrl, stock, category });
  res.redirect(`/admin?adminKey=${encodeURIComponent(req.query.adminKey || '')}`);
};

exports.updatePrice = async (req, res) => {
  const price = Number(req.body.price);
  await Product.findByIdAndUpdate(req.params.id, { price });
  res.redirect(`/admin?adminKey=${encodeURIComponent(req.query.adminKey || '')}`);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect(`/admin?adminKey=${encodeURIComponent(req.query.adminKey || '')}`);
};
