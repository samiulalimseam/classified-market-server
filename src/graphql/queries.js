const Product = require('../model/product');
const  Category  = require('../model/category');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    category: async (_, { id }) => {
      return await Category.findById(id);
    },

    products: async () => {
      return await Product.find();
    },
    product: async (_, { id }) => {
      return await Product.findById(id);
    }
  },
  Mutation: {
    
    createProduct: async (_, args) => {
      return await Product.create(args);
    },
    updateProduct: async (_, { id, ...args }) => {
      return await Product.findByIdAndUpdate(id, args, { new: true });
    },
    deleteProduct: async (_, { id }) => {
      return await Product.findByIdAndDelete(id);
    }, 
    createCategory: async (_, { categoryInput }) => {
      const { name, tags } = categoryInput;
      const category = new Category({ name, tags });
      await category.save();
      return category;
    }
  }
};

module.exports = resolvers;
