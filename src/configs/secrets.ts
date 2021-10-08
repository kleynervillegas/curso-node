// jsonWetToken Secret
export const secrets = {
  jwtSecret : process.env.JWT_SECRET, 
  emailPass: process.env.JWT_EMAIL_PASS,
  email: process.env.JWT_EMAIL,
  jwtSecretAdmin: process.env.JWT_SECRET_ADMIN,
  emailDisable2FA: process.env.JWT_EMAIL_DISABLE2FA,
  jwtApiPublic: process.env.JWT_API_PUBLIC,

};


//  Limit for the body size of a request
export const limitRequestBody = process.env.LIMIT_REQUEST_BODY;