import axios from "axios";

export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error.response?.data || error.message);
        throw error;
    }
};

export const getData = async (endpoint, data) => {
    try {
        const response = await axios.get(`${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error.response?.data || error.message);
        throw error;
    }
};
