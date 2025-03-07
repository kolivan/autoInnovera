import { faker } from '@faker-js/faker';

function generatedRegistrationData() {
    return{
    randomFirstName : faker.person.firstName(),
    randomLastName : faker.person.lastName(),
    randomOrgName : faker.company.name(),
    }
}

exports.generatedRegistrationData = generatedRegistrationData;