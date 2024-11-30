//this is just a function which we will use for creating fake user for our app to test few functionalities

const User = require("../Models/User");
const { faker } = require('@faker-js/faker');

exports . createFakeUser = async (count) => {
try{

    const user = [];//basically this is the array which will store promises of user creation

    //if you dont know then remember that every  time we interact with the database it return us a promise
    //fot this  perticular reason we use await keyword so that the promise should first get resolved or rejected then any other code will run

    for(let i=1;i<=count;i++){
        const tempUser = User.create({
            email:faker.internet.email(),
            password:'123456',
            userName:faker.internet.username(),
            bio:faker.lorem.sentence(),
            profilePic:faker.image.avatar()
        })

        user.push(tempUser);
    }

    await Promise.all(user);
    console.log(`${count} no of users got created `);
    process.exit(1);

}catch(err){

    console.error(err);
    process.exit(1);

}
}