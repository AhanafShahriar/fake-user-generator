import { faker, fakerPL, fakerEL, fakerEN_US } from "@faker-js/faker";

const introduceErrors = (data, errorCount) => {
  const applyError = (str) => {
    if (str.length === 0) return str;
    const position = Math.floor(Math.random() * str.length);

    const randomType = Math.floor(Math.random() * 3);

    switch (randomType) {
      case 0:
        return str.slice(0, position) + str.slice(position + 1);
      case 1:
        const randomChar = String.fromCharCode(
          97 + Math.floor(Math.random() * 26)
        );
        return str.slice(0, position) + randomChar + str.slice(position);
      case 2:
        if (position < str.length - 1) {
          return (
            str.slice(0, position) +
            str[position + 1] +
            str[position] +
            str.slice(position + 2)
          );
        }
        return str;
      default:
        return str;
    }
  };

  let result = data;
  for (let i = 0; i < errorCount; i++) {
    result = applyError(result);
  }
  return result;
};

export const generateUserData = (region, errors, seed, count) => {
  faker.seed(seed);

  const users = [];

  for (let i = 0; i < count; i++) {
    const user = {};
    user.id = faker.string.uuid();
    user.uniqueIdentifier = faker.string.uuid();

    switch (region) {
      case "USA":
        user.name = `${fakerEN_US.person.firstName()} ${fakerEN_US.person.middleName()} ${fakerEN_US.person.lastName()}`;
        user.address = `${fakerEN_US.location.streetAddress()}, ${fakerEN_US.location.city()}, ${fakerEN_US.location.state()} ${fakerEN_US.location.zipCode()}`;
        user.phone = fakerEN_US.phone.number({ style: "international" });
        break;
      case "Poland":
        user.name = `${fakerPL.person.firstName(
          "pl"
        )} ${fakerPL.person.middleName("pl")} ${fakerPL.person.lastName()}`;
        user.address = `${fakerPL.location.streetAddress(
          "pl"
        )}, ${fakerPL.location.city()}, ${fakerPL.location.zipCode()}`;
        user.phone = fakerPL.phone.number({ style: "international" });
        break;
      case "Greece":
        user.name = `${fakerEL.person.firstName()} ${fakerEL.person.middleName()} ${fakerEL.person.lastName()}`;
        user.address = `${fakerEL.location.streetAddress()}, ${fakerEL.location.city()}, ${fakerEL.location.zipCode()}`;
        user.phone = fakerEL.phone.number({ style: "international" });
        break;
      default:
        user.name = `${faker.person.firstName()} ${faker.person.middleName()} ${faker.person.lastName()}`;
        user.address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`;
        user.phone = faker.phone.number("###-###-####");
        break;
    }

    if (errors > 0) {
      const errorCount = Math.floor(Math.random() * (errors + 1));
      user.name = introduceErrors(user.name, errorCount);
      user.address = introduceErrors(user.address, errorCount);
      user.phone = introduceErrors(user.phone, errorCount);
    }

    users.push(user);
  }

  return users;
};
