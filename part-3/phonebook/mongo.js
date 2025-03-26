const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://soulcrash345:${password}@cluster0.s69bz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const [newName, newNumber] = [process.argv[3], process.argv[4]];

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const generateId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const person = new Person({
    id: generateId(),
    name: newName,
    number: newNumber,
  });

  person.save().then((result) => {
    console.log(`added ${newName} number ${newNumber} to phonebook`);
    mongoose.connection.close();
  });
}
