import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
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

export const QUERY_BUSINESS = gql`
query business($businessId: ID!) {
  business(businessId: $businessId) {
    _id
    bio
    email
    image
    location
    thoughts {
      _id
      comments {
        commentAuthor
        commentText
        createdAt
        _id
      }
      createdAt
      thoughtAuthor
      thoughtText
    }
    website
  }
}`;

// export const QUERY_SINGLE_BUSINESS = gql`
// export const QUERY_USER_THOUGHTS = gql`
//   query getUserThoughts($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }`;
