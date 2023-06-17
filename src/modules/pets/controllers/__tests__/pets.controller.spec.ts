import app from '@shared/infra/http/app';
import request from 'supertest';
import { CreatePetDTO } from '../interfaces/i-create.dto';

const server = request(app);

describe('PETS Integration Tests (PetsController)', () => {
  describe('GET /pets', () => {
    it('should return a list of pets', async () => {
      const response = await server.get('/pets');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /pets', () => {
    it('should be able to create a new pet', async () => {
      const newPet = {
        name: 'Noemi Balistreri',
      } as (typeof CreatePetDTO)['_type'];

      const response = await server.post('/pets').send(newPet);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newPet.name);
    });
  });
});
