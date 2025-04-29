import api from './api';
import { prepareRequest, processResponse } from '../../utils/dataTransformers';

const getUserFollowers = async (userId, params) => {
  const requestPayload = prepareRequest({ userId, ...params }, 'followers', 'get');

  const response = await api.get(`followers/followers`, requestPayload);
  console.log(response);

  // return processResponse(response, 'users');
};

const getUserFollowersCount = async (userId) => {
  const requestPayload = prepareRequest(userId, 'followers', 'get-count');

  const response = await api.get(`followers/count`, requestPayload);
  console.log(response);

  // return processResponse(response, 'users');
};

const followUser = async (userId) => {
  const requestPayload = prepareRequest(userId, 'followers', 'follow');
  const response = await api.post('followers', requestPayload);

  console.log(response);

  return processResponse(response, 'followers');
};

const unfollowUser = async (followId) => {
  const requestPayload = prepareRequest(followId, 'followers', 'unfollow');
  const response = await api.delete('followers', requestPayload);

  console.log(response);

  return processResponse(response, 'followers');
};

export { getUserFollowers, getUserFollowersCount, followUser, unfollowUser };
