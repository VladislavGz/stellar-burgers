import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, selectorUser } from '..//../services/userSlice';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { selectorRegisterErrorMessage } = selectorUser;

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerData: TRegisterData = { email, name: userName, password };

  const registerErrorMessage = useSelector(selectorRegisterErrorMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
  };

  return (
    <RegisterUI
      errorText={registerErrorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
