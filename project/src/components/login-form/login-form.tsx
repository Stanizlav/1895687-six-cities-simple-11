import { FormEvent, useRef } from 'react';
import { isEmail, isPassword } from '../../utils/validation-utils';
import { toast } from 'react-toastify';
import AuthData from '../../types/auth-data';
import { useAppDispatch } from '../../hooks/store-hooks';
import { logIn } from '../../store/thunk-actions';

function LoginForm():JSX.Element{
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement|null>(null);
  const passwordRef = useRef<HTMLInputElement|null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(emailRef.current !== null && passwordRef.current !== null){
      const email = emailRef.current.value;
      if(!isEmail(email)){
        toast.warn('Please type a correct email');
        return;
      }
      const password = passwordRef.current.value;
      if(!isPassword(password)){
        toast.warn('Password must contain at least a letter and a digit');
        return;
      }
      const data:AuthData = {email, password};
      dispatch(logIn(data));
    }
  };

  return(
    <form className="login__form form" onSubmit={handleFormSubmit} action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="email">E-mail</label>
        <input id="email" className="login__input form__input" type="email" name="email" data-testid="email" placeholder="Email" ref={emailRef} required/>
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="password">Password</label>
        <input id="password" className="login__input form__input" type="password" name="password" data-testid="password" placeholder="Password" ref={passwordRef} required/>
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
