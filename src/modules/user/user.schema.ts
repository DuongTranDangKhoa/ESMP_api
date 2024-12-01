import { Static, t } from 'elysia'

/**
 * Authentication
 */

// export const LoginParams = t.Object(
//   {
//     loginType: t.String({
//       default: 'host',
//       format: 'regex',
//       pattern: '^(host|vendor|staff|admin)$',
//       error: "Login type must be specified between 'admin', 'host', 'vendor' or 'staff'",
//     }),
//   },
//   { error: 'Login type must be specified', required: true },
// )

export const LoginBody = t.Object({
  username: t.String({
    minLength: 8,
    maxLength: 40,
    default: '',
    pattern: '^[A-Za-z][A-Za-z0-9_-]{7,39}$',
    error:
      'Username must be between 8 - 40 characters and start with only letters and contain only letters, numbers and underscores',
  }),
  password: t.String({
    default: '',
    minLength: 8,
    maxLength: 40,
    pattern: '^[A-Za-z][.@A-Za-z0-9_-]{7,39}$',
    error:
      'Password must be between 8 - 40 characters and start with only letters and contain only letters, numbers and underscores',
  }),
})

export const UserInfoSchema = t.Object({
  username: t.String(),
  hostInfo: t.Optional(
    t.Object({
      hostName: t.String(),
    }),
  ),
  vendorInfo: t.Optional(
    t.Object({
      vendorName: t.String(),
    }),
  ),
   staffInfo: t.Optional(
    t.Object({
      staffName: t.String(),
    }),
  ),
})

export const LoginResponseSchema = t.Object({
  accessToken: t.String(),
  // refreshToken: t.String(),s
  userInfo: UserInfoSchema,
})

export type LoginResponseType = Static<typeof LoginResponseSchema>

export const AuthenticatedUserHeader = t.Required(
  t.Object(
    {
      authorization: t.String({
        format: 'uuid',
        error: 'Access key is invalid',
      }),
    },
    {
      error: 'Access key is not provided',
    },
  ),
)
