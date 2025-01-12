import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectorUser } from '../../services/userSlice';
import { TLoginData } from '@api';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { selectorLoginErrorMessage } = selectorUser;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginData: TLoginData = {
    email,
    password
  };

  const loginErrorMessage = useSelector(selectorLoginErrorMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  return (
    <LoginUI
      errorText={loginErrorMessage}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
