import {
  PaymentInstancePayload,
  PaymentInstanceResponse,
  PaymentSubmitPayload,
} from "@/types/transactionType";
import { baseApi } from "../baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBeneficiaries: builder.query({
      query: (userId) => ({
        url: `/client/beneficiaries/${userId}`,
      }),
    }),
    paymentIntend: builder.mutation<
      PaymentInstanceResponse,
      PaymentInstancePayload
    >({
      query: (paymentBody) => ({
        url: "/payment/create-intent",
        method: "POST",
        body: paymentBody,
      }),
    }),
    paymentSubmit: builder.mutation<PaymentSubmitPayload, unknown>({
      query: (submitBody) => ({
        url: "/payment/confirm",
        method: "POST",
        body: submitBody,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllBeneficiariesQuery,
  usePaymentIntendMutation,
  usePaymentSubmitMutation,
} = transactionApi;
