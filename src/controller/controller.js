const { Category, Product, User, Order, AccountType, Location, Condition } = require("../model/schema");

const getCategoryList = async (req, res) => {
  try {
    console.log('api hit success');
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const data = req.body;
    const result = await User.findOneAndUpdate({ email }, data, { new: true });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const result = await order.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send("User Exists, Login!");
    } else {
      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProductListBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const products = await Product.find({ sellerId });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ email: id });
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserListByType = async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};
    if (type === "Buyer" || type === "Seller") {
      query = { acType: type };
    } else if (type === "all") {
      query = {};
    } else {
      res.status(403).send("Refused by Server");
    }
    const users = await User.find(query);
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOrderList = async (req, res) => {
  try {
    const { id } = req.params;
    let query;
    if (id === "all") {
      query = {};
    } else {
      query = { buyerEmail: id };
    }
    const orders = await Order.find(query);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAccountTypes = async (req, res) => {
  try {
    const accountTypes = await AccountType.find();
    res.send(accountTypes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOrderInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    res.send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProductSearchedList = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ salePrice: id });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.send(locations);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getConditions = async (req, res) => {
  try {
    const conditions = await Condition.find();
    res.send(conditions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ category: id });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProductsByAds = async (req, res) => {
  try {
    const products = await Product.find({ ad: true });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getCategoryList,
  addProduct,
  updateUser,
  addOrder,
  addUser,
  getProductList,
  getProductListBySeller,
  getUserAccount,
  getUserListByType,
  getOrderList,
  getAccountTypes,
  getOrderInfo,
  getProductSearchedList,
  getLocations,
  getConditions,
  getProductsByCategory,
  getProductsByAds
};
