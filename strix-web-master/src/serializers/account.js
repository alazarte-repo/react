const serializeToken = token => ({
  accessToken: token.access_token,
  expiresIn: token.expires_in,
  refreshToken: token.refresh_token,
  scope: token.scope,
  tokenType: token.token_type,
});

export default serializeToken;
