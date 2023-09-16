
const DEFAULT_ADMIN = {
    email: 'a@a.a',
    password: 'a',
}

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

// AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
const AdminModule = import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
    useFactory: () => ({
        adminJsOptions: {
            rootPath: '/admin',
            resources: [],
        },
        auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret'
        },
        sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret'
        },
    }),
}))

export default AdminModule