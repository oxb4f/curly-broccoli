import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useBackForwardFix = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
      navigate(0);
    }
  }, [navigate]);
};

export default useBackForwardFix;
