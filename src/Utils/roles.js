export const isDirector = (role) => role === 'директор'

export const isManager = (role) => role === 'менеджер'

export const isLead = (role) => role === 'директор' || role === 'менеджер'
