const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Business {
    _id: ID!
    name: String!
    email: String
    bio: String
    likes: [User]
    image: String
    website: String
    location: String
    thoughts: [Thought]
}

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
    business: ID
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
    business(businessId: ID!): Business
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addBusiness( name: String!, email: String, phoneNumber: String, bio: String, image: [String], website: String, location: String): Business
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, thoughtAuthor: String!, business: ID): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
