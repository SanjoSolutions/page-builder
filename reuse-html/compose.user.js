export function setTitle(compose, title) {
  compose.setVariable('title', title)
}

export function getTitle(compose) {
  return compose.getVariable('title') || ''
}

export function onlyInDevelopment(compose, content) {
  let result
  if (process.env.NODE_ENV === 'development') {
    result = content
  } else {
    result = ''
  }
  return result
}
