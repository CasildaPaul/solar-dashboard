import axios from 'axios';

const BASE_URL = 'https://api.solarplant.com/v1';

// Fetch Live Power Data
export const getLivePowerData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/power/live`);
        return response.data;
    } catch (error) {
        console.error('API Error: Live Power Data', error);
        return null;
    }
};

// Fetch Daily Solar Generation Data
export const getDailySolarGeneration = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/solar/daily`);
        return response.data;
    } catch (error) {
        console.error('API Error: Daily Solar Generation', error);
        return null;
    }
};

// Fetch Lifetime Solar Generation Data
export const getLifetimeSolarGeneration = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/solar/lifetime`);
        return response.data;
    } catch (error) {
        console.error('API Error: Lifetime Solar Generation', error);
        return null;
    }
};

// Fetch Total Savings Data
export const getTotalSavings = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/savings/total`);
        return response.data;
    } catch (error) {
        console.error('API Error: Total Savings', error);
        return null;
    }
};

// Fetch Cumulative Solar Generation Data (Graph-1)
export const getCumulativeSolarGeneration = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/solar/cumulative`);
        return response.data;
    } catch (error) {
        console.error('API Error: Cumulative Solar Generation', error);
        return null;
    }
};

// Fetch Individual Inverter Solar Generation Data (Graph-2)
export const getIndividualSolarGeneration = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/solar/individual`);
        return response.data;
    } catch (error) {
        console.error('API Error: Individual Solar Generation', error);
        return null;
    }
};

// Fetch Inverter Performance Data
export const getInverterPerformance = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/inverters`);
        return response.data;
    } catch (error) {
        console.error('API Error: Inverter Performance', error);
        return null;
    }
};
