const mockedData = require('../mocked');
const authHelper = require('../helpers/auth');
const CRUD = require('../helpers/CRUD');

module.exports = {
  getUsersByRole: async (req, res) => {
    try {
      const result = await authHelper.jwtVerify(req.headers.authorization);
      if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
        return res.status(401).jsonp({ error: authHelper.badAccessToken });
      }

      if (!req.params.roleName) {
        return res.status(400).jsonp({ error: 'Missing roleName' });
      }

      const roles = mockedData.roles.usersByRole;
      const response = {
        totalRecords: roles.length,
        returnedRecords: roles.slice(0, 10).length,
        users: roles.slice(0, 10),
      };

      res.jsonp(response);
    } catch (err) {
      res.status(400).jsonp({ error: err });
    }
  },
};
