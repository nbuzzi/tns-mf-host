const mockedData = require('../mocked');
const authHelper = require('../helpers/auth');
const CRUD = require('../helpers/CRUD');

module.exports = {
  getRoles: async (req, res) => {
    try {
      const result = await authHelper.jwtVerify(req.headers.authorization);
      if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
        return res.status(401).jsonp({ error: authHelper.badAccessToken });
      }

      const roles = mockedData.roles.roles;
      res.jsonp(roles);
    } catch (err) {
      res.status(400).jsonp({ error: err });
    }
  },

  isAvailable: async (req, res) => {
    try {
      const result = await authHelper.jwtVerify(req.headers.authorization);
      if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
        return res.status(401).jsonp({ error: authHelper.badAccessToken });
      }

      const roles = mockedData.roles.roles;

      const isAvailable = roles.find(
        (role) => role.name === req.params.roleName
      );

      res.jsonp({ available: isAvailable });
    } catch (err) {
      res.status(400).jsonp({ error: err });
    }
  },

  createRole: async (req, res) => {
    try {
      const result = await authHelper.jwtVerify(req.headers.authorization);
      if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
        return res.status(401).jsonp({ error: authHelper.badAccessToken });
      }

      const newRole = {
        name: req.body.name,
        canBeDeleted: true,
        userCount: 0,
      };

      CRUD.createData('../jsons/userRoles/roles.json', newRole, (err) => {
        if (err) {
          res.status(400).jsonp({ error: err });
        }
      });

      res.status(204).jsonp();
    } catch (err) {
      res.status(400).jsonp({ error: err });
    }
  },
};
