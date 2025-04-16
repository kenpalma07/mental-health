import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  guard_name: z.string(),
})

export type Role = z.infer<typeof roleSchema>