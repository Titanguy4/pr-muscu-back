import { defineConfig } from '@adonisjs/shield'
import app from '@adonisjs/core/services/app'

const shieldConfig = defineConfig({
  /**
   * Configure CSP policies for your app. Refer documentation
   * to learn more
   */
  csp: {
    enabled: false,
    directives: {},
    reportOnly: false,
  },

  /**
   * Configure CSRF protection options. Refer documentation
   * to learn more
   */
  csrf: {
    // Désactivé en développement, activé en production
    enabled: app.inProduction,
    exceptRoutes: [
      // Exclure les routes d'API de la protection CSRF, car nous utilisons les token JWT
      '/api/*',
      '/api/auth/*',
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/logout',
      '/api/auth/me',
    ],
    enableXsrfCookie: false,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },

  /**
   * Control how your website should be embedded inside
   * iFrames
   */
  xFrame: {
    enabled: true,
    action: 'DENY',
  },

  /**
   * Force browser to always use HTTPS
   */
  hsts: {
    enabled: true,
    maxAge: '180 days',
  },

  /**
   * Disable browsers from sniffing the content type of a
   * response and always rely on the "content-type" header.
   */
  contentTypeSniffing: {
    enabled: true,
  },
})

export default shieldConfig
