const { User, Thought, Business } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId }).populate('comments');
    },
    business: async (parent, { businessId }) => {
      if (businessId) {
        const business = await Business.findOne({ _id: businessId }).populate('thoughts');
        if (!business) {
          throw new Error('Business not found'); // You can customize the error message
        }
        return business;
      }
      return null; // Return null or handle the case when no businessId is provided.
    },
    businesses: async () => {
      return Business.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        console.log('No user found with this email address');
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log('Incorrect password');
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log('token')

      return { token, user };
    },
    addThought: async (parent, { thoughtText, thoughtAuthor, businessId }) => {
      try {
        // Create the thought
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor,
          business: businessId, // Associate thought with a business if provided
        });
    
        // Associate thought with the user
        await User.findOneAndUpdate(
          { username: thoughtAuthor },
          { $addToSet: { thoughts: thought._id } }
        );
    
        if (businessId) {
          const updatedBusiness = await Business.findOneAndUpdate(
            { _id: businessId },
            { $addToSet: { thoughts: thought._id } },
            { new: true } // Ensure we get the updated business
          );
          
          console.log('Successfully added thought to business:', updatedBusiness);
        }
    
        console.log('Successfully added thought:', thought);
        return thought;
      } catch (error) {
        console.error('Error adding thought:', error);
        throw error; // Rethrow the error for debugging
      }
    },
    addBusiness: async (parent, args) => {
      try {
        const business = await Business.create(args);
        return business;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create a business.');
      }
    },
    addBusiness: async (parent, args, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You must be logged in to add a business.');
      // }
    
      try {
        const business = await Business.create(args);
        const token = signToken(business);
        return { business, token };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create a business.');
      }
    },
    addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }) => {
      try {
        const deletedThought = await Thought.findOneAndDelete({ _id: thoughtId });
    
        if (!deletedThought) {
          throw new Error("Thought not found");
        }
    
        if (deletedThought.businessId) {
          const business = await Business.findOne({ _id: deletedThought.businessId });
    
          if (!business) {
            throw new Error("Business not found");
          }
    
          business.thoughts.pull(deletedThought._id);
    
          await business.save();
        }
    
        return deletedThought;
      } catch (error) {
        throw error;
      }
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
