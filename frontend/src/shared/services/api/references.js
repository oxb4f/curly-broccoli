import api from './api';
import { processResponse } from '@shared/utils';

const getReferences = async () => {
  const response = await api.get('references');

  return processResponse(response, 'references');
};

export { getReferences };
