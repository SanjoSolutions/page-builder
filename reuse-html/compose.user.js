export function setTitle(compose, title) {
    compose.setVariable('title', title)
}

export function getTitle(compose) {
    return compose.getVariable('title') || ''
}
