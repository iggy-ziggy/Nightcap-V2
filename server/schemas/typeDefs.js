const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    image: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String!
    thoughtTitle: String!
    thoughtPlace: String
    thoughtAuthor: String!
    thoughtImage: String
    createdAt: String!
    rate: Int
    comments: [Comment]!
    businessId: ID
  }

  type Business {
    _id: ID
    name: String!
    email: String
    phoneNumber: String
    bio: String
    image: [String]
    website: String
    location: String
    thoughts: [Thought]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    businesses: [Business]
    business(businessId : ID!): Business
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, image: String): Auth
    addBusiness(name: String!, email: String, phoneNumber: String, bio: String, image: [String], website: String, location: String): Business
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, thoughtTitle: String!, thoughtPlace: String!, thoughtAuthor: String!, rate: Int, thoughtImage: String, businessId: ID ): Thought
    addComment(
      thoughtId: ID!
      commentText: String!
      commentAuthor: String!
    ): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
