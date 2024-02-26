const jose = require('jose');

module.exports = {
  badAccessToken: 'BAD_ACCESS_TOKEN',
  badRefreshToken: 'BAD_REFRESH_TOKEN',

  async signJWT(username, firstName, lastName, email, role, timeZone, menu) {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'tns-dashboard'
    );
    const alg = 'HS256';
    let accessToken;
    let refreshToken;

    accessToken = await new jose.SignJWT({
      'urn:example:claim': true,
      role: role,
      sub: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      timeZone: timeZone,
      userId: username,
      menu: menu,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .setExpirationTime(process.env.ACCESSTOKEN_EXP_TIME || '10m')
      .sign(secret);

    refreshToken = await new jose.SignJWT({
      'urn:example:claim': true,
      role: role,
      sub: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      timeZone: timeZone,
      userId: username,
      menu: menu,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .setExpirationTime(process.env.REFRESHTOKEN_EXP_TIME || '20m')
      .sign(secret);

    return { accessToken, refreshToken };
  },

  async jwtVerify(token) {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'tns-dashboard'
    );
    let response;
    // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      try {
        response = await jose.jwtVerify(token, secret, {
          issuer: 'urn:example:issuer',
          audience: 'urn:example:audience',
        });
      } catch (err) {
        response = err.code;
      }
      return response;
    }
  },

  async decodeJWT(token) {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'tns-dashboard'
    );
    const decoded = await jose.jwtVerify(token, secret);
    console.info('decoded', decoded.payload);
    return decoded.payload;
  },
};
