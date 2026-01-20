// loginReducer.js
// Reducer function to manage login state

export const loginReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,               // Keep existing state properties
                isAuthenticated: true,  // Update authentication status
                loading: false,        // Set loading to false
                user: action.payload,   // Set user data from action payload
                error: null             // Clear any previous errors
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null
            };
        default:
            return state; // Return current state for unrecognized action types
    }
};