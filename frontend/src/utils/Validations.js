import axios from 'axios';
import config from '../config';

export const validateImageSize = (image) => {
    const maxSize = 5000000;
    if (image.size > maxSize) {
        return false;
    }
    return true;
};

export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        return false;
    }
    return true;
};

export const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(`${config.apiBaseURL}api/User/checkEmail`, { params: { email } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const checkUsernameExists = async (username) => {
    try {
        const response = await axios.get(`${config.apiBaseURL}api/User/checkUsername`, { params: { username } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const validatePassword = (password) => {
    if (password.length < 8) {
        return false;
    }
    return true;
};

export const validateUsername = (username) => {
    const usernamePattern = /^[a-zA-Z0-9._-]{3,}$/;
    if (!usernamePattern.test(username)) {
        return false;
    }
    return true;
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
        return false;
    }
    return true;
};

export const validateDateOfBirth = (dateOfBirth) => {
    const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateOfBirthPattern.test(dateOfBirth)) {
        return false;
    }
    return true;
};

export const runValidations = async (rules) => {
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const error = await rule();
        if (error) {
            return error;
        }
    }
    return null;
};

