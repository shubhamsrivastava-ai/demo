const offers = [
  {
    id: '1',
    restaurant: 'Green Fork Bistro',
    item: 'Paneer Tikka Wrap',
    discount: '50% OFF',
    price: 120,
    original: 240,
    countdown: '01:12:44',
    left: 3,
    pickupWindow: '10:30–11:30 PM',
    distance: '1.2 km',
    rating: 4.6,
    description: 'Char-grilled paneer, mint chutney, and crisp veggies in a warm wrap.'
  },
  {
    id: '2',
    restaurant: 'Noodle Story',
    item: 'Veg Hakka Bowl',
    discount: '40% OFF',
    price: 150,
    original: 250,
    countdown: '00:48:10',
    left: 5,
    pickupWindow: '10:45–11:30 PM',
    distance: '2.1 km',
    rating: 4.4,
    description: 'Wok-tossed noodles with seasonal vegetables and house sauces.'
  },
  {
    id: '3',
    restaurant: 'Cafe Aroma',
    item: 'Grilled Sandwich Combo',
    discount: '55% OFF',
    price: 90,
    original: 200,
    countdown: '02:05:22',
    left: 2,
    pickupWindow: '10:30–11:15 PM',
    distance: '0.8 km',
    rating: 4.7,
    description: 'Cheese-loaded grilled sandwich with a side of herb potatoes.'
  }
];

const orderHistory = [
  {
    id: 'A2103',
    restaurant: 'Green Fork Bistro',
    item: 'Paneer Tikka Wrap',
    status: 'Completed',
    date: 'Yesterday, 10:45 PM'
  },
  {
    id: 'A2101',
    restaurant: 'Cafe Aroma',
    item: 'Grilled Sandwich Combo',
    status: 'Missed',
    date: 'Aug 12, 10:30 PM'
  }
];

const renderPage = (res, view, { title, description, ...data }) =>
  res.render(view, {
    title,
    description,
    ...data
  });

exports.getHomeDay = (req, res) => {
  renderPage(res, 'home', {
    title: 'FreshFold | Home',
    description: 'Fresh food offers that go live after 10 PM.',
    tagline: 'Fresh food. Before it goes to waste.'
  });
};

exports.getHomeNight = (req, res) => {
  renderPage(res, 'home-night', {
    title: 'FreshFold | Tonight',
    description: 'Tonight’s fresh food offers near you.',
    offers
  });
};

exports.getOfferDetails = (req, res) => {
  const offer = offers.find((item) => item.id === req.params.id) || offers[0];
  renderPage(res, 'offer-details', {
    title: `${offer.item} | FreshFold`,
    description: offer.description,
    offer
  });
};

exports.getCheckout = (req, res) => {
  renderPage(res, 'checkout', {
    title: 'Checkout | FreshFold',
    description: 'Confirm pickup and pay securely.',
    offer: offers[0]
  });
};

exports.getOrderConfirmation = (req, res) => {
  renderPage(res, 'order-confirmation', {
    title: 'Order Confirmed | FreshFold',
    description: 'Your pickup is locked in.',
    offer: offers[0]
  });
};

exports.getOrderHistory = (req, res) => {
  renderPage(res, 'order-history', {
    title: 'Order History | FreshFold',
    description: 'View past pickups and reorders.',
    orders: orderHistory
  });
};

exports.getProfile = (req, res) => {
  renderPage(res, 'profile', {
    title: 'Profile | FreshFold',
    description: 'Manage your account and saved restaurants.'
  });
};
