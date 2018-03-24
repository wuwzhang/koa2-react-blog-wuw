module.exports = {
  port: 3008,
  secretKey: 'wuw',
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog',
  redis: {
    port: 6379,
    host: 'localhost',
    auth: 'wuw',
    db: 6,
    family: 4
  },
  github: {
    'client_id': 'b3b9f407b0d5ad50b6ec',
    'client_secret': '8691d9c926b971ac02356f5233e266fdc1b07a37',
    'scope': ['user']
  },
  cors: 'http://zhanglisha.xyz'
}
