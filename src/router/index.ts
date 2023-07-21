import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = createRouter({
  // TODO: check
  // TODO: add router hook before entry
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0, left: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Main',
      redirect: { name: 'Private' },
      children: [
        {
          path: '/private',
          name: 'Private',
          component: () => import('~/views/private/PrivateLayout.vue'),
          meta: {
            requiresAuth: true
          },
          redirect: { name: 'Home' },
          children: [
            {
              path: 'home',
              name: 'Home',
              component: () => import('~/views/private/HomeView.vue'),
              props: true
            }
          ]
        },
        {
          path: 'signup',
          name: 'SignUp',
          component: () => import('~/views/public/SignUpView.vue'),
          props: true
        },
        {
          path: 'login',
          name: 'LogIn',
          component: () => import('~/views/public/LogInView.vue'),
          props: true
        },
        {
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: () => import('~/views/public/ForgotPasswordView.vue'),
          props: true
        },
        {
          path: '/reset-password/:id',
          name: 'ResetPassword',
          component: () => import('~/views/public/ResetPasswordView.vue'),
          props: true
        },
        {
          path: '/confirm-email/:id',
          name: 'ConfirmEmail',
          component: () => import('~/views/public/ConfrimEmailView.vue'),
          props: true
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('~/views/public/AboutView.vue')
        },
        {
          path: '/forbidden',
          name: '403',
          component: () => import('~/views/public/ForbiddenView.vue')
        },
        {
          path: '/not-confirmed-email',
          name: 'NotConfirmedEmail',
          meta: {
            requiresAuth: true
          },
          component: () => import('~/views/public/NotConfirmedEmailView.vue')
        },
        {
          path: '/:catchAll(.*)',
          name: '404',
          component: () => import('~/views/public/NotFoundView.vue')
        },
        {
          path: '/404/:resource',
          name: '404Resource',
          component: () => import('~/views/public/NotFoundView.vue'),
          props: true
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log(to)
  const { accessToken, user } = useUserStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!accessToken) {
      next({
        name: 'LogIn'
      })
    } else {
      if (!user.confirmed && !to.path.includes('/not-confirmed-email')) {
        next({
          name: 'NotConfirmedEmail'
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
  // TODO:
  // Check when login but has a token skip login page
})
export default router
