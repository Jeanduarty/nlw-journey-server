import envVar from 'env-var'

export const env = {
  DATABASE_URL: envVar.get('DATABASE_URL').required().asString(),
  API_BASE_URL: envVar.get('DATABASE_URL').required().asString(),
}