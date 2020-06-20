const generateAuthConfig = (token) => {
  const config = {};

  if(token) {
    config.headers = {};
    const AuthStr = `Bearer ${token}`;
    config.headers.Authorization = AuthStr;
  }
  
  return config;
}

export default generateAuthConfig;