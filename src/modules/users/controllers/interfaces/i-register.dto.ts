import { z } from 'zod';

const RegisterUserDTO = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { RegisterUserDTO };
