//Mapper for environmental variables
export const environment = process.env. NODE_ENV;
export const PORT = process.env.PORT;

export const db = {
    name: process.env.DB_NAME || ' ',
    host: process.env.HOST_NAME || ' ',
    port: process.env.PORT || ' ',
    user: process.env.USER || ' ',
    password: process.env.DB_USR_PSW || ' ',
};

export const corsUrl = process.env.CORS_URL ;

export const tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS || '0'),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
    issuer: process.env.TOKEN_ISSUER || ' ',
    audience: process.env.TOKEN_AUDIENCE || ' ',
};

export const logDirectory = process.env.LOG_DIR;