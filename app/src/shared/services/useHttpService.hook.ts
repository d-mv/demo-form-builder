import { Optional } from '@mv-d/toolbelt';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { alertsSelector } from '../state';
import { HttpServiceClass } from './http.service';

export function useHttpService() {
  const setAlert = useSetRecoilState(alertsSelector);

  const [service, setService] = useState<Optional<HttpServiceClass>>();

  const sendAlertMessage = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('hello');

    setAlert('Disconnected!');
  }, [setAlert]);

  useEffect(() => {
    if (!service) setService(new HttpServiceClass(sendAlertMessage));
  }, [sendAlertMessage, service]);
}
