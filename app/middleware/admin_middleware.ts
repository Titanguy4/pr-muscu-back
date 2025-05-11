import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (!ctx.auth.user) {
      return ctx.response.status(401).json({
        message: 'Vous devez être connecté pour accéder à cette ressource',
      })
    }

    if (!ctx.auth.user.isAdmin) {
      console.log('Admin middleware: User is not an admin')
      return ctx.response.status(403).json({
        message: 'Vous devez être administrateur pour accéder à cette ressource',
      })
    }
    await next()
  }
}
