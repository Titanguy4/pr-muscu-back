import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ParticipantController = () => import('../app/Controllers/Http/participant_controller.js')
const PronosticController = () => import('../app/Controllers/Http/pronostic_controller.js')
const AuthController = () => import('../app/Controllers/Http/auth_controller.js')
const CompetitionController = () => import('../app/Controllers/Http/competition_controller.js')

// Authentification
router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
    router.get('/me', [AuthController, 'me']).use(middleware.auth())
  })
  .prefix('api/auth')

// Competitions
router
  .group(() => {
    router.get('/competitions', [CompetitionController, 'index'])
    router.get('/competitions/next', [CompetitionController, 'next'])
  })
  .prefix('api')

// Participants
router
  .group(() => {
    router.get('/participants', [ParticipantController, 'index'])
    router.get('/participants/:id', [ParticipantController, 'show'])
  })
  .prefix('api')

// Routes protégées pour les participants (modification/ajout)
router
  .group(() => {
    router.post('/participants', [ParticipantController, 'store'])
    router.put('/participants/:id', [ParticipantController, 'update'])
    router.delete('/participants/:id', [ParticipantController, 'destroy'])
  })
  .prefix('api')
  .use([middleware.auth(), middleware.admin()])

// Routes pour les pronostics
router
  .group(() => {
    router.get('/pronostics', [PronosticController, 'index'])
    router.post('/pronostics', [PronosticController, 'store'])
    router.get('/pronostics/:id', [PronosticController, 'show'])
    router.put('/pronostics/:id', [PronosticController, 'update'])
    router.delete('/pronostics/:id', [PronosticController, 'destroy'])
  })
  .prefix('api')

router.on('/').render('pages/home')
