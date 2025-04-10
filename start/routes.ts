/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    calendar: 'a lot',
  }
})

/**
 *
 * AUTHENTIFICATION ROUTES
 *
 */
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

router
  .get('me', async ({ auth, response }) => {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  })
  .use(middleware.auth())

/**
 *
 * EVENTS ROUTES
 *
 */
const EventsController = () => import('#controllers/events_controller')

router
  .group(() => {
    router.get('all-repetitive', [EventsController, 'getAllRepetitiveEvents'])
    router.get('find-repetitive/:id', [EventsController, 'getRepetitiveEvent'])
    router.post('create', [EventsController, 'createRepetitiveEvent'])
  })
  .prefix('event')
  .use(middleware.auth())
