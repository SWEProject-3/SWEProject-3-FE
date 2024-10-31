const API_BASE_URL = 'http://localhost:5000'; // API base URL

// Function to sign up a user
export const signupUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Function to log in a user
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/users?email=${credentials.email}&password=${credentials.password}`);
  
  const data = await response.json();
  if (data.length > 0) {
    return { success: true, user: data[0] };
  } else {
    return { success: false, message: 'Invalid email or password' };
  }
};
