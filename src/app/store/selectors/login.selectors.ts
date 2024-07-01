import { createSelector } from '@ngrx/store';

const selectLogin = (state: any) => state.login;

export const selectLoginState = createSelector(
    selectLogin,
    (state) => state
)

export const selectAccessToken = createSelector(
    selectLogin,
    (state) => state.accessToken
);

export const selectError = createSelector(
    selectLogin,
    (state) => state.error
);

export const selectUserName = createSelector(
    selectLogin,
    (state) => state.userName
);

export const selectEmail = createSelector(
    selectLogin,
    (state) => state.email
);

export const selectIsLoading = createSelector(
    selectLogin,
    (state) => state.isLoading
);