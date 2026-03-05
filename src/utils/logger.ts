import pino from 'pino'
import { getRequestContext } from './requestContext'

export const logger = pino({
    level: process.env.LOG_LEVEL ?? 'info',
    mixin() {
      const context = getRequestContext()
      return { actorUserId: context?.actorUserId ?? null }
    },
    transport: process.env.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
          }
        }
})
