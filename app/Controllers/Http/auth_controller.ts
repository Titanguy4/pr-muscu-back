import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      await db
        .from('auth_access_tokens')
        .where('tokenable_id', user.id)
        .where('tokenable_type', 'user')
        .where('name', 'api_token')
        .delete()

      const token = await User.accessTokens.create(user, ['*'], {
        name: 'api_token',
        expiresIn: '30 days',
      })
      console.log(token)

      return response.json({
        token: token.value!.release(),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          isAdmin: user.isAdmin,
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      return response.status(400).json({
        message: 'Email ou mot de passe incorrect',
        error: error.message,
      })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.user

      if (user) {
        auth.use('api').invalidateToken()
      }

      return response.json({
        message: 'Déconnexion réussie',
      })
    } catch (error) {
      console.error('Logout error:', error)
      return response.status(500).json({
        message: 'Erreur lors de la déconnexion',
        error: error.message,
      })
    }
  }

  public async me({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      return response.json({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          isAdmin: user.isAdmin,
        },
      })
    } catch (error) {
      console.error('Me endpoint error:', error)
      return response.status(401).json({
        message: 'Non autorisé',
      })
    }
  }
}
