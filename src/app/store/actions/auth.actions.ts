import { createAction, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../../auth/types/registerRequest.interface';

export const register = createAction('[Auth] register', props<{ payload: RegisterRequestInterface }>());
