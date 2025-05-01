import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useNavigatedMutation = (options, queryClient) => {
  const navigate = useNavigate();

  const mutation = useMutation(options, queryClient);

  const mutate = (variables, config = {}) => {
    const { navigateTo, navigateOptions = {}, ...restConfig } = config;

    const result = mutation.mutate(variables, restConfig);

    if (navigateTo) {
      navigate(navigateTo, navigateOptions);
    }

    return result;
  };

  const mutateAsync = async (variables, config = {}) => {
    const { navigateTo, navigateOptions = {}, ...restConfig } = config;

    const result = await mutation.mutateAsync(variables, restConfig);

    if (navigateTo) {
      navigate(navigateTo, navigateOptions);
    }

    return result;
  };

  return {
    ...mutation,
    mutate,
    mutateAsync
  };
};

export default useNavigatedMutation;
