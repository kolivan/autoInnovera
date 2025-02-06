const {request} = require('@playwright/test');

exports.RegistrationAPI = class RegistrationAPI {
    constructor(request) {
     this.baseUrl = process.env.BE_URL;
    }
   
    async getRegistrationToken(useremail) {
     this.request = await request.newContext();
     let response = await this.request.get(`${this.baseUrl}/api/v1/generate/innovera-to-investor-invite`, {
      headers: this.standardHeaders,
      params: {
        email: useremail
      },
     })
     const responceBody = JSON.parse(await response.text());
     const registrationUrl = responceBody.data.url;
     console.log(registrationUrl);
     return  registrationUrl;
    }
   
}