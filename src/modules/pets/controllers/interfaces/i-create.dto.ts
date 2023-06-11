import { z } from 'zod';

const CreatePetDTO = z.object({
  name: z.string(),
  description: z.string().optional(),
  sex: z.enum(['M', 'F']).optional(),
  size: z
    .enum(['SMALL', 'SMALL_MEDIUM', 'MEDIUM', 'MEDIUM_LARGE', 'LARGE'])
    .optional(),
  castrated: z.boolean().optional(),
  age: z.number().optional(),
});

export { CreatePetDTO };
