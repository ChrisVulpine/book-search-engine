const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {

//==============================================================================================================================
// Original Code [RESTful API]
//==============================================================================================================================

// authMiddleware: function (req, res, next) {
// allows token to be sent via  req.query or headers
// let token = req.query.token || req.headers.authorization;

//==============================================================================================================================
// My Code [GraphQL API built with Apollo Server.]
//==============================================================================================================================

    authMiddleware: function ({ req }) {
      // allows token to be sent via req.body, req.query, or headers
      let token = req.body.token || req.query.token || req.headers.authorization;

//==============================================================================================================================


    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // verify token and get user data out of it
    if (token) try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      
      req.user = data;
    } catch {}

    // send to next endpoint
    // next();

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
