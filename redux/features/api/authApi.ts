import {
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
  LoginRequest,
} from "@/types/authType";
import { baseApi } from "../baseApi";
import { setCredentials } from "../slice/authSlice";
import { logout as logoutAction } from "../slice/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: RegisterResponse) => {
        // Store token in localStorage for immediate availability
        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
        }
        return response;
      },
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: `/login`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        // Store token in localStorage for immediate availability
        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
        }
        return response;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({ token: data.access_token, user: data.user }),
          );
        } catch (error) {
          // Handle error if needed
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear token from localStorage
          localStorage.removeItem("token");
          // Dispatch logout action to clear Redux state
          dispatch(logoutAction());
        } catch (error) {
          // Even if API call fails, clear local state
          localStorage.removeItem("token");
          dispatch(logoutAction());
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
