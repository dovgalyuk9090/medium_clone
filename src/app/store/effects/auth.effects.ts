import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { authActions } from '../actions/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from '../../shared/services/persistence.service';
import { Router } from '@angular/router';

export const authEffects = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ payload }) => {
        return authService.register(payload).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.set('accessToken', currentUser.token);
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

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);
