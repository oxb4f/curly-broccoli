import api from '@shared/services/api/api';
import { prepareRequest, processResponse } from '@shared/utils';

const getEvents = async (params) => {
  const requestPayload = prepareRequest(
    { orderField: 'createdAt', orderDirection: 'desc', limit: 10, ...params },
    'events',
    'get'
  );

  const response = await api.get(`events`, requestPayload);
  console.log(processResponse(response, 'events'));

  return processResponse(response, 'events');
};

export { getEvents };
