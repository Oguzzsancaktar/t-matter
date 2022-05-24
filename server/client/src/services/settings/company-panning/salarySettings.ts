// import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery';
// import { createApi } from '@reduxjs/toolkit/query/react';
// import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

// const SALARY_SETTINGS_API_REDUCER_PATH = 'salarySettingsApi'
// const SALARY_SETTINGS_TAG = 'salarySettingsTag'

// type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof SALARY_SETTINGS_TAG, typeof SALARY_SETTINGS_API_REDUCER_PATH>

// const getSalarySettings = (builder:IBuilder)=>{
//   return builder.query<>({
//      query(){
//       return {
//         url:'/salarySetting'
//       }
//     }
//   })
// }

// const patchSalarySettings = (builder:IBuilder)=>{

// }

// const salarySettingsApi = createApi({
//   reducerPath:SALARY_SETTINGS_API_REDUCER_PATH,
//   tagTypes:[SALARY_SETTINGS_TAG],
//   baseQuery:axiosBaseQuery(),
//   endpoints:(builder)=> {
//     getSalarySettings:getSalarySettings(builder),
//     patchSalarySettings:patchSalarySettings(builder),
//   },
// })

// export {salarySettingsApi}
export {}
