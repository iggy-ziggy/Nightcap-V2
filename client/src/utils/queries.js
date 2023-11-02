import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      image
      thoughts {
        _id
        thoughtText
        thoughtTitle
        thoughtPlace
        thoughtImage
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
      thoughtTitle
      thoughtPlace
      thoughtAuthor
      thoughtImage
      createdAt
      businessId
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtTitle
      thoughtPlace
      thoughtAuthor
      thoughtImage
      createdAt
      comments {
        _id
        commentAuthor
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
      name
      location
      website
      thoughts {
        _id
        createdAt
        thoughtAuthor
        thoughtTitle
        thoughtText
        thoughtImage
        comments {
          _id
          commentAuthor
          commentText
          createdAt
        }
      }
    }
  }
`;