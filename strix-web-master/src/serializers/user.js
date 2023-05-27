function serializeUser(user, account, accountType) {
  return {
    id: user.id,
    accountId: user.account_id,
    accountType: accountType[1],
    firstName: user.first_name,
    middleName: user.middle_name,
    lastName: user.last_name,
    username: user.username,
    securityPin: user.security_pin,
    identificationType: account.identification_type,
    identificationNumber: account.identification_number,
    countryId: account.country_id,
  };
}

export default serializeUser;
