import config from "../playwright.config";

config.testDir = '../tests';
config.use = {
    headless: false,
    env: 'prod',
    baseUrl: 'https://beta.innovera.ai/',
    loginUrl: 'https://beta.innovera.ai/sign-in',
    apiUrl: '',
};

module.exports = config;