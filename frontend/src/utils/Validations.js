import api from "../components/Auth/api";

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
        const response = await api.get(`api/User/checkEmail`, { params: { email } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const checkUsernameExists = async (username) => {
    try {
        const response = await api.get(`api/User/checkUsername`, { params: { username } });
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

export const validateDateOfBirth = (dateOfBirth) => {
    const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateOfBirthPattern.test(dateOfBirth)) {
        return false;
    }
    return true;
};

export const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^(\+\d{1,3}\s?)?1?\-?\.?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return pattern.test(phoneNumber);
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

