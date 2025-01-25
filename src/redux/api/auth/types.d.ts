namespace AUTH {
  type GetResponse = {
    profile: User;
  };
  type GetRequest = void;

  type PostLoginResponse = {
    access: string;
    // accessExpiration: number;
    refresh: string;
  };

  type PostLoginRequest = {
    email: string;
    password: string;
  };

  type PostRegistrationResponse = {
    // message: string;
    access: string;
    // accessExpiration: number;
    refresh: string;
  };
  type PostRegistrationRequest = {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    birth_date: string;
  };

  type PostLogoutResponse = {
    // message: string;
  };
  type PostLogoutRequest = void;

  type PatchRefreshResponse = {
    access: string;
    accessExpiration: number;
  };
  type PatchRefreshRequest = void;

  type PostForgotPasswordResponse = {
    // message: string;
  };
  type PostForgotPasswordRequest = {
    email: string;
    frontEndUrl: string;
  };

  type PatchResetPasswordResponse = {
    // message: string;
  };
  type PatchResetPasswordRequest = {
    token: string;
    newPassword: string;
  };
}
