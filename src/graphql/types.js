const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    _id: ID!
    title: String!
    description: String
    price: Float!
    stock: Int!
    imageUrl: String
    category: String
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    _id: ID!
    name: String!
    tags: [String!]!
  }

  input CategoryInput {
    name: String!
    tags: [String!]!
  }



  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    createProduct(
      title: String!,
      description: String,
      price: Float!,
      stock: Int!,
      imageUrl: String,
      category: String
    ): Product!
    updateProduct(
      id: ID!,
      title: String,
      description: String,
      price: Float,
      stock: Int,
      imageUrl: String,
      category: String
    ): Product!
    deleteProduct(id: ID!): Product
    createCategory(categoryInput: CategoryInput!): Category!
  }
`;

module.exports = typeDefs;
