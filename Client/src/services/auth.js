const axios = require("axios");
import shared_data from "../main";

// Function to handle user login
/**
 * Logs in a user by sending the username and password to the server.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Object} - The server response or an error object.
 */
export async function Login(username, password) {
  try {
    const response = await axios.post(shared_data.server_domain + "/api/Login", {
      user_name: username,
      password: password,
    });
    return response;
  } catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}

// Function to handle user registration
/**
 * Registers a new user by sending their details to the server.
 * @param {Object} user_details - The details of the user to register (username, first name, last name, country, password, email).
 * @returns {Object} - The server response or an error object.
 */
export async function Register(user_details) {
  try {
    const response = await axios.post(shared_data.server_domain + "/api/Register", {
      user_name: user_details.username,
      first_name: user_details.firstName,
      last_name: user_details.lastName,
      country: user_details.country,
      password: user_details.password,
      email: user_details.email,
    });
    // Check response from server
    if (response.status === 201 && response.data.success) {
      return { status: response.status, message: response.data.message, success: response.data.success };
    } else {
      throw { status: response.status, message: response.data.message, success: response.data.success };
    }
  } catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}

// Function to handle user logout
/**
 * Logs out the current user by sending a request to the server.
 * @returns {Object} - The server response or an error object.
 */
export function Logout() {
  try {
    const response = axios.post(shared_data.server_domain + "/api/Logout");
    // Check response from server
    if (response.status === 200 && response.data.success) {
      return { status: response.status, message: response.data.message, success: response.data.success };
    } else {
      throw { status: response.status, message: response.data.message, success: response.data.success };
    }
  } catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}
