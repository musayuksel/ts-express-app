declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    DB_HOST: string;
    DB_DB: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
  }
}
