import type { Salon } from '@acme/types';

export type CreateSalonDto = Omit<Salon, 'id'>;
