import { PrismaClient } from '@prisma/client'
import { db } from '@/main/config/firebase'

const syncGroupsWithFirestore = async () => {
  const client = new PrismaClient()

  const disciplineGroups = await client.disciplineGroup.findMany()

  for (const group of disciplineGroups) {
    const groupRef = db.collection('disciplineGroups').doc(group.id)

    await groupRef.set(group)
  }

  console.log('SYNC FINISHED')
}

syncGroupsWithFirestore()
