import { z } from 'zod';

const DeleteManyPetsDTO = z.object({
  ids: z
    .string()
    .transform((idsString): number[] => idsString?.split(',').map(id => +id)),
});

export { DeleteManyPetsDTO };
