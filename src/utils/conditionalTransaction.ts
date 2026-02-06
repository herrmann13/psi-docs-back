import type { Transaction } from 'sequelize'
import sequelize from './db'
import { logger } from './logger'

export async function withTransaction<T>(
  fn: (tx: Transaction) => Promise<T>,
  externalTx?: Transaction
): Promise<T> {
  if (externalTx) {
    return fn(externalTx)
  }

  logger.info('Transacao do banco de dados iniciada.')
  const tx = await sequelize.transaction()
  try {
    const result = await fn(tx)
    await tx.commit()
      logger.info('Transação do banco de dados concluida com sucesso.')
      return result
    } catch (err) {
      await tx.rollback()
      logger.error(err, 'Erro ao concluir transacao do banco de dados, rollback da transação concluido.')
      throw err
    }
  }
