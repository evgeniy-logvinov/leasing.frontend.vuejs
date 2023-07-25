import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

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
          redirect: { name: 'Dashboard' },
          children: [
            {
              path: 'dashboard',
              name: 'Dashboard',
              component: () => import('~/views/private/DashboardView.vue'),
              props: true
            },
            {
              path: 'users',
              name: 'Users',
              component: () => import('~/views/private/UsersView.vue'),
              props: true
              // redirect: { name: 'UsersClients' }
              // children: [
              //   {
              //     path: 'clients',
              //     name: 'UsersClients',
              //     component: () => import('~/views/private/UsersClientsView.vue'),
              //     props: true
              //   },
              //   {
              //     path: 'companies',
              //     name: 'UsersCompanies',
              //     component: () => import('~/views/private/UsersCompaniesView.vue'),
              //     props: true
              //   }
              // ]
            },
            {
              path: 'applications',
              name: 'Applications',
              component: () => import('~/views/private/ApplicationsView.vue'),
              props: true
            },
            {
              path: 'statistic',
              name: 'Statistic',
              component: () => import('~/views/private/StatisticView.vue'),
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
          path: '/reset-password/:resetId',
          name: 'ResetPassword',
          component: () => import('~/views/public/ResetPasswordView.vue'),
          props: (route) => ({
            resetId: route.params.resetId as string
          })
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
  const { accessToken, user } = useAuthStore()

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
