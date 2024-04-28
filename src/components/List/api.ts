import {faker} from '@faker-js/faker';

function createRandomUser() {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        surname: faker.person.middleName(),
        jobTitle: faker.person.jobTitle(),
        department: faker.person.jobType(),
        avatar: faker.image.avatar(),
    };
}

export function getUsers(limit) {
    console.log('GET USERS')
    return faker.helpers.multiple(createRandomUser, {
        count: limit,
    });
}