/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ClassRoom = {
  __typename?: "ClassRoom";
  _id: Scalars["ID"];
  name: Scalars["String"];
  inviteSecret: Scalars["String"];
  owner: User;
  rate: Scalars["Float"];
  state: Scalars["String"];
  course: Array<Course>;
  members: Array<User>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type ClassRoomInput = {
  name: Scalars["String"];
  course?: Maybe<Array<Scalars["String"]>>;
  members?: Maybe<Array<Scalars["String"]>>;
  state?: Maybe<Scalars["String"]>;
};

export type ClassRoomUpdateInput = {
  _id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  rate?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
  course?: Maybe<Array<Scalars["String"]>>;
  members?: Maybe<Array<Scalars["String"]>>;
};

export type Comment = {
  __typename?: "Comment";
  _id: Scalars["ID"];
  name: Scalars["String"];
  content: Scalars["String"];
  rate: Scalars["String"];
  course: Scalars["String"];
};

export type CommentInput = {
  name: Scalars["String"];
  content: Scalars["String"];
  rate: Scalars["String"];
  course?: Maybe<Scalars["String"]>;
};

export type CommentUpdateInput = {
  _id: Scalars["ID"];
  name: Scalars["String"];
  content: Scalars["String"];
  rate: Scalars["String"];
  course?: Maybe<Scalars["String"]>;
};

export type Course = {
  __typename?: "Course";
  _id: Scalars["ID"];
  title: Scalars["String"];
  categories: Scalars["String"];
  description: Scalars["String"];
  video: Scalars["String"];
  link: Array<Link>;
  rating: Scalars["Float"];
  localRate: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type CourseInput = {
  title: Scalars["String"];
  categories: Scalars["String"];
  video: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  link?: Maybe<Array<LinkInput>>;
};

export type CourseUpdateInput = {
  _id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  categories?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  video?: Maybe<Scalars["String"]>;
  link?: Maybe<Array<LinkInput>>;
};

export type Ilama_Response = {
  __typename?: "ILAMA_Response";
  ok: Scalars["Boolean"];
  message: Scalars["String"];
  user: User;
};

export type IdeleteResponse = {
  __typename?: "IdeleteResponse";
  n: Scalars["Float"];
  ok: Scalars["Float"];
  deletedCount: Scalars["Float"];
};

export type Link = {
  __typename?: "Link";
  title: Scalars["String"];
  url: Scalars["String"];
  img: Scalars["String"];
};

export type LinkInput = {
  title: Scalars["String"];
  url: Scalars["String"];
  img: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createCourse: Course;
  updateCourse: Course;
  deleteCourse: IdeleteResponse;
  createComment: Comment;
  updateComment: Comment;
  deleteComment: Scalars["Boolean"];
  Register: RigesterResponse;
  UpdateUser: Ilama_Response;
  Login: RigesterResponse;
  createClass: ClassRoom;
  updateClass: ClassRoom;
  deleteClass: IdeleteResponse;
};

export type MutationCreateCourseArgs = {
  data: CourseInput;
};

export type MutationUpdateCourseArgs = {
  data: CourseUpdateInput;
};

export type MutationDeleteCourseArgs = {
  id: Scalars["String"];
};

export type MutationCreateCommentArgs = {
  data: CommentInput;
};

export type MutationUpdateCommentArgs = {
  data: CommentUpdateInput;
};

export type MutationDeleteCommentArgs = {
  id: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: UserInput;
};

export type MutationUpdateUserArgs = {
  email: Scalars["String"];
  name: Scalars["String"];
};

export type MutationLoginArgs = {
  data: UserLoginInput;
};

export type MutationCreateClassArgs = {
  data: ClassRoomInput;
};

export type MutationUpdateClassArgs = {
  data: ClassRoomUpdateInput;
};

export type MutationDeleteClassArgs = {
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getCourses: Array<Course>;
  getOneCourse: Course;
  getComments: Array<Comment>;
  getOneComment: Comment;
  getUser?: Maybe<User>;
  getMyClasses: Array<ClassRoom>;
  getPublicClasses: Array<ClassRoom>;
  getOneClassRoom: ClassRoom;
};

export type QueryGetOneCourseArgs = {
  id: Scalars["String"];
};

export type QueryGetCommentsArgs = {
  course: Scalars["String"];
};

export type QueryGetOneCommentArgs = {
  _id: Scalars["String"];
};

export type QueryGetOneClassRoomArgs = {
  id: Scalars["String"];
};

export type RigesterResponse = {
  __typename?: "RigesterResponse";
  accessToken: Scalars["String"];
  Ok: Scalars["Boolean"];
  message: Scalars["String"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UserInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UserLoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = { __typename?: "Query" } & {
  getUser?: Maybe<{ __typename?: "User" } & Pick<User, "name" | "email">>;
};

export type GetCoursesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCoursesQuery = { __typename?: "Query" } & {
  getCourses: Array<
    { __typename?: "Course" } & Pick<
      Course,
      "_id" | "title" | "createdAt" | "categories" | "description" | "video"
    > & { link: Array<{ __typename?: "Link" } & Pick<Link, "title" | "url">> }
  >;
};

export type GetOneCourseQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetOneCourseQuery = { __typename?: "Query" } & {
  getOneCourse: { __typename?: "Course" } & Pick<
    Course,
    "_id" | "title" | "categories" | "video" | "description" | "rating"
  > & { link: Array<{ __typename?: "Link" } & Pick<Link, "title" | "url">> };
};

export type CreateCourseMutationVariables = Exact<{
  data: CourseInput;
}>;

export type CreateCourseMutation = { __typename?: "Mutation" } & {
  createCourse: { __typename?: "Course" } & Pick<
    Course,
    "title" | "video" | "categories" | "description"
  > & { link: Array<{ __typename?: "Link" } & Pick<Link, "title" | "url">> };
};

export type CreateCommentMutationVariables = Exact<{
  data: CommentInput;
}>;

export type CreateCommentMutation = { __typename?: "Mutation" } & {
  createComment: { __typename?: "Comment" } & Pick<
    Comment,
    "_id" | "name" | "content" | "rate" | "course"
  >;
};

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  Register: { __typename?: "RigesterResponse" } & Pick<
    RigesterResponse,
    "accessToken" | "Ok" | "message"
  >;
};

export type LoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  Login: { __typename?: "RigesterResponse" } & Pick<
    RigesterResponse,
    "accessToken" | "Ok" | "message"
  >;
};

export const GetUserDocument = gql`
  query getUser {
    getUser {
      name
      email
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const GetCoursesDocument = gql`
  query getCourses {
    getCourses {
      _id
      link {
        title
        url
      }
      title
      createdAt
      categories
      description
      video
    }
  }
`;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCoursesQuery,
    GetCoursesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(
    GetCoursesDocument,
    options
  );
}
export function useGetCoursesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCoursesQuery,
    GetCoursesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(
    GetCoursesDocument,
    options
  );
}
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<
  typeof useGetCoursesLazyQuery
>;
export type GetCoursesQueryResult = Apollo.QueryResult<
  GetCoursesQuery,
  GetCoursesQueryVariables
>;
export const GetOneCourseDocument = gql`
  query getOneCourse($id: String!) {
    getOneCourse(id: $id) {
      _id
      title
      categories
      video
      description
      link {
        title
        url
      }
      rating
    }
  }
`;

/**
 * __useGetOneCourseQuery__
 *
 * To run a query within a React component, call `useGetOneCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneCourseQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOneCourseQuery,
    GetOneCourseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOneCourseQuery, GetOneCourseQueryVariables>(
    GetOneCourseDocument,
    options
  );
}
export function useGetOneCourseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOneCourseQuery,
    GetOneCourseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOneCourseQuery, GetOneCourseQueryVariables>(
    GetOneCourseDocument,
    options
  );
}
export type GetOneCourseQueryHookResult = ReturnType<
  typeof useGetOneCourseQuery
>;
export type GetOneCourseLazyQueryHookResult = ReturnType<
  typeof useGetOneCourseLazyQuery
>;
export type GetOneCourseQueryResult = Apollo.QueryResult<
  GetOneCourseQuery,
  GetOneCourseQueryVariables
>;
export const CreateCourseDocument = gql`
  mutation createCourse($data: CourseInput!) {
    createCourse(data: $data) {
      title
      video
      categories
      description
      link {
        title
        url
      }
    }
  }
`;
export type CreateCourseMutationFn = Apollo.MutationFunction<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >(CreateCourseDocument, options);
}
export type CreateCourseMutationHookResult = ReturnType<
  typeof useCreateCourseMutation
>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;
export const CreateCommentDocument = gql`
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      _id
      name
      content
      rate
      course
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const RegisterDocument = gql`
  mutation register($data: UserInput!) {
    Register(data: $data) {
      accessToken
      Ok
      message
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation login($data: UserLoginInput!) {
    Login(data: $data) {
      accessToken
      Ok
      message
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
