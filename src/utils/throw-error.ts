import {
  InputError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  BadResponseError
} from './error-handler'

export const throwError = ({ status }: { status: number }) => {
  if (status === 400) {
    throw new InputError('Bad client request')
  } else if (status === 401) {
    throw new AuthenticationError('Unauthorized request')
  } else if (status === 403) {
    throw new ForbiddenError('Forbidden request')
  } else if (status === 404) {
    throw new NotFoundError('Invalid client request url')
  } else if (status === 500) {
    throw new InternalServerError('Internal server error')
  } else if (status === 502) {
    throw new BadResponseError('Invalid response from gateway server')
  }
}
