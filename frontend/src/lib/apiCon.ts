import { type AppType } from '@api/app'
import { hc } from 'hono/client'

const app = hc<AppType>('/')

const api = app.api

export default api