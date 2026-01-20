// loginReducer.js
// Reducer function to manage login state

export const loginReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,               // Keep existing state properties
                isAuthenticated: true,  // Update authentication status
                user: action.payload,   // Set user data from action payload
                error: null             // Clear any previous errors
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
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