import { prisma } from '../db'

export async function writeAudit(actorEmail: string, action: string, entity: string, entityId = '') {
  await prisma.auditLog.create({
    data: { actorEmail, action, entity, entityId },
  })
}
