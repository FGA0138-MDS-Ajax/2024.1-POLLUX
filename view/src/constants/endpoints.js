export default {
    user: {
        base: '/users',
        single: (id) => `/users/${id}`,
        password: (id) => `/users/password/${id}`,
        delete: (id) => `/users/delete/${id}`
    },

    storage: {
        base: '/storages',
        single: (id) => `/storages/${id}`,
        edit: (id) => `/storages/${id}/edit`,
        delete: (id) => `/storages/${id}/delete`,
    },
    document: {
        base: '/documents',
        single: (id) => `/documents/${id}`,
    },
    event: {
        base: '/eventos',
        single: (id) => `/eventos/${id}`,
    },
    meeting: {
        base: '/reuniaos',
        single: (id) => `/reuniaos/${id}`,
        delete: (id) => `/reuniaos/${id}/delete`,
        edit: (id) => `/reuniaos/${id}/edit`,
        newLink: (id) => `/reuniaos/${id}/new_link`,
        updateLink: (id, linkId) => `/reuniaos/${id}/update_link/${linkId}`,
        deleteLink: (id, linkId) => `/reuniaos/${id}/delete_link/${linkId}`,
        editPresence: (id) => `/reuniaos/${id}/edit_presence`,
    },
    task: {
        base: '/tasks',
        single: (id) => `/tasks/${id}`,
        batch: '/tasks/batch_update',
        delete: (id) => `/tasks/${id}/delete`,
    }
}