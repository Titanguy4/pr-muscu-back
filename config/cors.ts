import { defineConfig } from '@adonisjs/cors'

export default defineConfig({
  enabled: true,
  origin: '*',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: [
    'Accept',
    'Authorization',
    'Content-Type',
    'X-Requested-With',
    'X-XSRF-TOKEN',
    'X-CSRF-TOKEN',
    'Origin',
    'Cache-Control',
    'Pragma',
    'X-Auth-Token',
  ],
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})
