import faker from "faker";

const arrayOfObjects = Array.from({ length: 20 }, (_, index) => ({
  name: faker.name.findName(),
  age: Math.floor(Math.random() * 30) + 20, // Random age between 20 and 50
  job: faker.name.jobTitle(),
  avatarUrl: `avatar-${index + 1}`,
  gender: index % 2 === 0 ? "Male" : "Female",
}));

console.log(arrayOfObjects);
