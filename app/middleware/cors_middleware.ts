import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CorsMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { response } = ctx

    response.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept, X-Requested-With, Authorization, X-XSRF-TOKEN, X-CSRF-TOKEN, Origin, Cache-Control, Pragma'
    )
    response.header('Access-Control-Allow-Credentials', 'true')

    if (ctx.request.method() === 'OPTIONS') {
      return response.status(200).send('')
    }

    await next()
  }
}
