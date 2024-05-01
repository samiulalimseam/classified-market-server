const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { getCategoryList, addProduct, updateUser, addOrder, addUser, getProductList, getProductListBySeller, getUserAccount, getUserListByType, getOrderList, getAccountTypes, getOrderInfo, getProductSearchedList, getLocations, getConditions, getProductsByCategory, getProductsByAds } = require("../controller/controller");

const uri = `${process.env.DB_URI}`;
mongoose
  .connect(uri + "saveyou-db")
  .then(() => {
    console.log("Connected using mongoose");
  })
  .catch((err) => console.log(err.message));
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const categoriesCollection = client.db("saveyou-db").collection("categories");
const productsCollection = client.db("saveyou-db").collection("products");
const locationCollection = client.db("saveyou-db").collection("locations");
const conditionCollection = client
  .db("saveyou-db")
  .collection("product-conditions");
const orderCollection = client.db("saveyou-db").collection("orders");
const acTypeCollection = client.db("saveyou-db").collection("acTypes");
const userCollection = client.db("saveyou-db").collection("users");

const initRootRouter = (app) => {
  // Routes
  app.get("/api/categories", getCategoryList);
  app.post("/api/addproduct", addProduct);
  app.post("/api/updateSeller/:email", updateUser);
  app.post("/api/addorder", addOrder);
  app.post("/api/addUser", addUser);
  app.get("/api/products", getProductList);
  app.get("/api/products/:sellerId", getProductListBySeller);
  app.get("/api/user/:id", getUserAccount);
  app.get("/api/users/:type", getUserListByType);
  app.get("/api/orders/:id", getOrderList);
  app.get("/api/actypes", getAccountTypes);
  app.get("/api/order/:id", getOrderInfo);
  app.get("/api/search/:id", getProductSearchedList);
  app.get("/api/locations", getLocations);
  app.get("/api/conditions", getConditions);
  app.get("/api/category/:id", getProductsByCategory);
  app.get("/api/ads", getProductsByAds);
};

module.exports = { initRootRouter };
