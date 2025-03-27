const {request} = require('@playwright/test');

exports.EmailClient = class EmailClient {
    constructor(request) {
     this.baseUrl = 'https://api.mailinator.com';
     this.messageId = '';
     this.token = 'e56872c7a62d403084d4a6c286ba07bb';
    }
    
    async getEmails() {
    this.request = await request.newContext();
    let response = await this.request.get(`${this.baseUrl}/api/v2/domains/private/inboxes`, {
     headers: this.standardHeaders,
     params: {
        token: this.token
     },
    })
    const responceBody = await response.text();
    console.log(responceBody);
    return responceBody;
   }

   async getEmailId() {
    this.request = await request.newContext();
    let response = await this.request.get(`${this.baseUrl}/api/v2/domains/private/inboxes`, {
     headers: this.standardHeaders,
     params: {
        token: this.token
     },
    });
    const jsonObject = await response.json();
    console.log(jsonObject);
    const id = await jsonObject.msgs[0].id;
    console.log(id);
    return id;
   }

   async getRegistrationLinkFomEmail(emailId) {
    this.request = await request.newContext();
    let response = await this.request.get(`${this.baseUrl}/api/v2/domains/private/inboxes/testinbox/messages/${emailId}/links`, {
     headers: this.standardHeaders,
     params: {
        token: this.token
     },
    })
    const jsonObject = await response.json();
    const links = jsonObject.links;
    const signUpUrl = links.find(link => link.includes("sign-up"));
 
    console.log('link = ',links);
    console.log('signUpUrl = ', signUpUrl);
    return signUpUrl;
   }

   async getRestorePasswordLinkFomEmail(emailId) {
      this.request = await request.newContext();
      let response = await this.request.get(`${this.baseUrl}/api/v2/domains/private/inboxes/testinbox/messages/${emailId}/links`, {
       headers: this.standardHeaders,
       params: {
          token: this.token
       },
      })
      const jsonObject = await response.json();
      console.log('jsonObject = ',jsonObject);
      const links = jsonObject.links;
      console.log('links = ',links);
      const resetPasswordpUrl = links.find(link => link.includes("reset-password"));
   
      console.log('link = ',links);
      console.log('resetPasswordUrl = ', resetPasswordpUrl);
      return resetPasswordpUrl;
     }

   async deleteAllEmails() {
      this.request = await request.newContext();
      let response = await this.request.delete(`${this.baseUrl}/api/v2/domains/private/inboxes`, {
       headers: this.standardHeaders,
       params: {
          token: this.token
       },
      })
      const responceBody = await response.text();
  
      console.log(responceBody);
      return  responceBody;
     }

  }
