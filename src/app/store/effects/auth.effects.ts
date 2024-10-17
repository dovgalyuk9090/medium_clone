import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { authActions } from '../actions/auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const authEffects = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ payload }) => {
        return authService.register(payload).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.registerSuccess({
              currentUser,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
