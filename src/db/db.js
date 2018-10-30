const mongoDb = require('mongoose');
/*
  Mongoose is an ORM (Object Relational Mapper) that is used to interact 
  with MongoDB database instance. We have already setup our instance using MongoDB atlas
  and installed mongoose as the project dependency. 
*/
const connect = ({host, username, password}) => {
  const dbConnection = `mongodb+srv://${username}:${password}@${host}/localLibrary?retryWrites=true`;
  // I have a connection problem from cloud atlas, I need to whitelist the IP
  console.log(`${host}, ${username}, ${password}`);
  mongoDb.connect(dbConnection, { useNewUrlParser: true }).then((connection) => {
    console.log(connection);
  }).catch((res) => console.log("error???why??? ", res));

} 
module.exports = { connect };   
/*
  Here is an eye-opener - module.exports is the real deal. exports is just module.exports's 
  little helper. Your module returns module.exports to the caller ultimately, not exports. 
  All exports does is collect properties and attach them to module.exports IF module.exports 
  doesn't have something on it already. 
  If there's something attached to module.exports already, everything on exports is ignored.
   - As long are you don't overwrite the module.exports object with an assignment operation, 
     anything attached to module.exports and exports will be available in the 'required' module.
*/

/*
There are two approaches for interacting with a database: 
  - Using the databases' native query language (e.g. SQL)
  - Using an Object Data Model ("ODM") / Object Relational Model ("ORM"). 
An ODM/ORM represents the website's data as JavaScript objects, which are then mapped to the underlying
database. Some ORMs are tied to a specific database, while others provide a database-agnostic backend.

The benefit of using an ORM is that programmers can continue to think in terms of JavaScript objects
rather than database semantics

So let us start by defining a schema. Though, NoSQL database are schema-less
  it is consider a best practice to define a schema to give some structure to the data
  that will be stored in our database.
*/