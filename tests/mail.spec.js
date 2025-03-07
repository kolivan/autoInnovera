const { test, expect } = require('@playwright/test');
const { EmailClient } = require('../utils/mailinator');


let testEmail;

/*test.describe('Mailinator Email Tests', () => {
    test('should retrieve emails from mailinator inbox', async () => {
        testEmail = new EmailClient();
        // Call the getEmail function
        const emailResponse = await testEmail.getEmails();
        const emailid = await testEmail.getEmailId();
        const emailRegistrationLink = await testEmail.getRegistrationLinkFomEmail(emailid);
        const deletesEmail = await testEmail.deleteAllEmails();
        
        // Add assertions to verify the response
        //expect(emailResponse).toBeDefined();
        
        // Log the response for debugging
        //console.log('Email Response:', emailResponse);
        
        // Add more specific assertions based on the expected response structure
        // For example:
        // expect(emailResponse.messages).toBeDefined();
        // expect(emailResponse.messages).toBeInstanceOf(Array);
    });
});*/