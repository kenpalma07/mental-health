import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const permissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  module: z.string(),
  guard_name: z.string(),
})

export type Permission = z.infer<typeof permissionSchema>