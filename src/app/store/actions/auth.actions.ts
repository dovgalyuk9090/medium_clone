import { createAction, createActionGroup, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../../auth/types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';

export const register = createAction(
  '[Auth] register',
  props<{ payload: RegisterRequestInterface }>(),
);

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{
      payload: RegisterRequestInterface;
    }>(),
    'Register Success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    'Register Failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    Login: props<{
      payload: LoginRequestInterface;
    }>(),
    'Login Success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    'Login Failure': props<{
      errors: BackendErrorsInterface;
    }>(),
  },
});
