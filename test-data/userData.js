import { faker } from '@faker-js/faker';

function generatedUserData() {
    return{
    randomFirstName : faker.person.firstName(),
    randomLastName : faker.person.lastName(),
    randomOrgName : faker.company.name(),
    randomPassword: faker.internet.password(),
    randomBio: faker.person.bio(),
    randomTag: faker.word.noun(),
    randomStageName: faker.word.noun() 
    }
}

exports.generatedUserData = generatedUserData;