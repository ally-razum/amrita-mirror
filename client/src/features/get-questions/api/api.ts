import { baseApi } from "../../../shared/api/api.ts";



export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query({
      query: ({ page, title, complexity, rate, specializationId, skills }) => ({
        url: `/questions/public-questions/`,
        params: {
          page,
          title,
          specializationId: specializationId || undefined,
          complexity: complexity || undefined,
          rate: rate || undefined,
          skills: skills || undefined,
        },
      }),
    }),
    getQuestionById: build.query({
      query: (id: number) => `/questions/public-questions/${id}`,
    }),
  }),
});

export const { useGetQuestionsQuery, useGetQuestionByIdQuery } = questionApi;
