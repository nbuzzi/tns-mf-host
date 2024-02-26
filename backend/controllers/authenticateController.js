const mockedData = require('../mocked');
const authHelper = require('../helpers/auth');

module.exports = {
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;

      const userInfo = mockedData.auth.users.find(
        (user) => user.username === username && user.password === password
      );

      if (!userInfo) {
        res.status(401).jsonp({ error: 'INVALID_CREDENTIALS' });
      } else {
        if (userInfo.enabled) {
          const token = await authHelper.signJWT(
            userInfo.username,
            userInfo.firstName,
            userInfo.lastName,
            userInfo.email,
            userInfo.role,
            userInfo.timeZone,
            userInfo.menu
          );
          res.jsonp({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          });
        } else {
          res.status(403).jsonp({
            error: 'ACCOUNT_DISABLED',
          });
        }
      }
    } catch (err) {
      res.status(400).res.json({ error: err });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const result = await authHelper.jwtVerify(req.body.refreshToken);

      if (result === 'ERR_JWS_INVALID') {
        return res.status(401).jsonp({ error: authHelper.badAccessToken });
      }
      if (result === 'ERR_JWT_EXPIRED') {
        return res.status(401).jsonp({ error: authHelper.badRefreshToken });
      }
      const payload = await authHelper.decodeJWT(req.body.refreshToken);
      console.warn('payload', payload);
      const token = await authHelper.signJWT(
        payload.sub,
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.role,
        payload.timeZone,
        payload.menu
      );
      res.jsonp({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } catch (err) {
      res.status(400).res.json({ error: err });
    }
  },
};
