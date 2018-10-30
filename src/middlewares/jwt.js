/*
  The node JWT middleware checks that the JWT token received in the http request from the client
  is valid before allowing access to the API, if the token is invalid a "401 Unauthorized" 
  response is sent to the client.
*/
const expressJwt = require("express-jwt");
const config = require("../../config.json");

module.exports = jwt;

function jwt() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      "/api/login",
      "/api/users/authenticate"
    ]
  });
}

/*
IMPORTANT: The "secret" property is used by the api to sign and verify JWT tokens for authentication,
 update it with your own random string to ensure nobody else can generate a JWT to gain unauthorised access to your application.
*/