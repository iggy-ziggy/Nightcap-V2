import {
    ADD_USER,
    UPDATE_USER,
    ADD_BUSINESS,
    UPDATE_BUSINESS,
    REMOVE_BUSINESS,
    LIKE_BUSINESS,
    UNLIKE_BUSINESS,
    ADD_PROFILE,
    UPDATE_PROFILE,
    ADD_COCKTAIL,
    UPDATE_COCKTAIL,
    REMOVE_COCKTAIL,
    ADD_REVIEW,
    UPDATE_REVIEW,
    REMOVE_REVIEW,
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
    ADD_CHEERS,
    REMOVE_CHEERS,
    ADD_TAG,
    ADD_FRIEND,
    ACCEPT_FRIEND_REQUEST,
    REMOVE_FRIEND,
  } from './action';
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case ADD_USER:
        return {
         ...state,
          // Add a new user to the users array
          users: [...state.users, action.user],
        };

      case UPDATE_USER:
        return{
          ...state,
          users: state.users.map(user =>
            user.id === action.user.id ? action.user : user
          ),
        };

      case ADD_BUSINESS:
        return {
         ...state,
          // Add a new business to the businesses array
          businesses: [...state.businesses, action.business],
        };

      case UPDATE_BUSINESS:
        return {
          ...state,
          // Update a business in the businesses array
          businesses: state.businesses.map(business =>
            business.id === action.business.id? action.business : business
          ),
        };
      
        case REMOVE_BUSINESS:
          return {
              ...state,
              businesses: state.businesses.filter(business => business.id !== action.businessId),
          };

      case LIKE_BUSINESS:
        return {
          ...state,
          // Update the liked status of a business
          businesses: state.businesses.map(business =>
            business.id === action.business.id? action.business : business
          ),
        };

      case UNLIKE_BUSINESS:
        return {
          ...state,
          // Update the liked status of a business
          businesses: state.businesses.map(business =>
            business.id === action.business.id ? action.business : business
          ),
        };
      
      case ADD_PROFILE:
        return {
         ...state,
          // Add a new profile to the profiles array
          profiles: [...state.profiles, action.profile],
        };

      case UPDATE_PROFILE:
        return {
          // Update a profile in the profiles array
          profiles: state.profiles.map(profile =>
            profile.id === action.profile.id? action.profile : profile
          ),
        };

      case ADD_COMMENT:
        return {
          ...state,
          // Add a new comment to the comments array
          comments: [...state.comments, action.comment],
        };

      case UPDATE_COMMENT:
        return {
          ...state,
          // Update a comment in the comments array
          comments: state.comments.map(comment =>
            comment.id === action.comment.id ? action.comment : comment
          ),
        };

      case REMOVE_COMMENT:
        return {
          ...state,
          // Remove a comment from the comments array
          comments: state.comments.filter(comment => comment.id !== action.commentId),
        };
  
      case ADD_CHEERS:
        return {
          ...state,
          // Add a new cheer to the reactions array
          reactions: [...state.reactions, action.cheers],
        };      
    
      case REMOVE_CHEERS:
        return {
          ...state,
           // Remove a cheer from the reactions array
          reactions: state.reactions.filter(cheers => cheers.id !== action.cheersId),
        };

      case ADD_REVIEW:
        return {
          ...state,
          // Add a new review to the reviews array
          reviews: [...state.reviews, action.review],
        };

      case UPDATE_REVIEW:
        return {
          ...state,
          // Update a review in the reviews array
          reviews: state.reviews.map(review =>
            review.id === action.review.id ? action.review : review
          ),
        };
        
      case REMOVE_REVIEW:
        return {
          ...state,
          // Remove a review from the reviews array
          reviews: state.reviews.filter(review => review.id !== action.reviewId),
        };  

      case ADD_COCKTAIL:
        return {
          ...state,
          // Add a new cocktail to the cocktails array
          cocktails: [...state.cocktails, action.cocktail],
        };
      
      case UPDATE_COCKTAIL:
        return {
          ...state,
          // Update a cocktail in the cocktails array
          cocktails: state.cocktails.map(cocktail =>
            cocktail.id === action.cocktail.id ? action.cocktail : cocktail
          ), 
        };
  
      case REMOVE_COCKTAIL:
        return {
          ...state,
          // Remove a cocktail from the cocktails array
          cocktails: state.cocktails.filter(cocktail => cocktail.id !== action.cocktailId),
        };

      case ADD_TAG:
        return {
         ...state,
          // Add a new tag to the tags array
          tags: [...state.tags, action.tag],
        };

      case ADD_FRIEND:
        return {
        ...state,
          // Add a new friend to the friends array
          friends: [...state.friends, action.friend],
        };

      case ACCEPT_FRIEND_REQUEST:
        return {
          ...state,
          // Update the status of a friend request to "accepted"
          friends: state.friends.map(friend =>
            friend.id === action.friend.id ? { ...friend, status: 'accepted' } : friend
          ),
        };
      
      case REMOVE_FRIEND:
        return {
         ...state,
          // Remove a friend from the friends array
          friends: state.friends.filter(friend => friend.id!== action.friendId),
        };
      // This saves us from a crash.
      default:
        return state;
    }
  };
  