namespace AUTH {
	type GetResponse = {
		profile: User
	};
	type GetRequest = void;

	type PostLoginResponse = {
		accessToken: string;
		accessTokenExpiration: number;
		refreshToken: string
	};
	
	type PostLoginRequest = {
		email: string;
		password: string;
	};

	type PostRegistrationResponse = {
		message: string;
		accessToken: string;
		accessTokenExpiration: number;
		refreshToken: string
	};
	type PostRegistrationRequest = {
		email: string;
		password: string;
		userName: string;
		photo: string;
	};

	type PostLogoutResponse = {
		message: string;
	};
	type PostLogoutRequest = void;

	type PatchRefreshResponse = {
		accessToken: string;
		accessTokenExpiration: number;
	};
	type PatchRefreshRequest = void;

	type PostForgotPasswordResponse = {
		message: string;
	};
	type PostForgotPasswordRequest = {
		email: string;
		frontEndUrl: string;
	};

	type PatchResetPasswordResponse = {
		message: string;
	};
	type PatchResetPasswordRequest = {
		token: string;
		newPassword: string;
	};
}

