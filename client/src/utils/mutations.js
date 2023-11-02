import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtTitle: String!,$thoughtPlace: String!, $thoughtAuthor: String!, $businessId: ID) {
    addThought(thoughtText: $thoughtText, thoughtTitle: $thoughtTitle, thoughtPlace: $thoughtPlace, thoughtAuthor: $thoughtAuthor, businessId: $businessId) {
      _id
      thoughtText
      thoughtTitle
      thoughtPlace
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_BUSINESS = gql`
  mutation AddBusiness($name: String!, $email: String, $phoneNumber: String, $bio: String, $image: [String], $website: String, $location: String) {
    addBusiness(name: $name, email: $email, phoneNumber: $phoneNumber, bio: $bio, image: $image, website: $website, location: $location) {
      _id
      name
      email
      phoneNumber
      bio
      image
      website
      location
    }
  }
`;