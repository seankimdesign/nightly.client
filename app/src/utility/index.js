import { Base64 } from 'js-base64'

const decodeAccountPayload = (token) => {
  const exploded = token.split('.')
  if (exploded && exploded.length === 3) {
    const payload = JSON.parse(Base64.decode(exploded[1]))
    return payload.hasOwnProperty('user_claims') ? {
      username: payload.sub,
      expires: payload.exp,
      ...payload.user_claims
    } : null
  }
}

export default {
  decodeAccountPayload
}
