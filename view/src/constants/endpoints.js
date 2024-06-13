export default {
    user: {
        base: '/users',
        single: (id) => `/users/${id}`,
        password: (id) => `/users/password/${id}`
    },

    storage: {
        base: '/storages',
        single: (id) => `/storages/${id}`,
    },
    document: {
        base: '/documents',
        single: (id) => `/documents/${id}`,
    },
    event: {
        base: '/eventos',
        single: (id) => `/eventos/${id}`,
    }
}