import { defineConfig } from '@adonisjs/cors'

export default defineConfig({
  enabled: true,
  origin: [
    'http://localhost:4200',
    'http://localhost:4000',
    'http://localhost:3000',
    'http://127.0.0.1:4200',
  ],
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
