
export const jwtConfig = () => ({
    jwt: {
      secret: process.env.JWT_SECRET || 'secreto_super_seguro',
      accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m', 
      refreshSecret: process.env.JWT_SECRET || 'secreto_refresh_seguro',
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d', 
    },
  });