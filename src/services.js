import axios from 'axios';

const url = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: url,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  getAddress(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  },
  login(body) {
    return axiosInstance.post('/login',body)
  },
  registerGym(body) {
    return axiosInstance.post(`/gym/store`,body)
  },
  getWorkers(slug) {
    return axiosInstance.get(`/gym/${slug}/workers`)
  },
  storeWorkers(slug,body) {
    return axiosInstance.post(`/gym/${slug}/workers/store`,body)
  },
  updateWorkers(slug,workerId,body) {
    return axiosInstance.put(`/gym/${slug}/workers/${workerId}/update`,body)
  },
  deleteWorkers(slug,workerId) {
    return axiosInstance.delete(`/gym/${slug}/workers/${workerId}/delete`)
  },
  indexWorkers(slug,workerId) {
    return axiosInstance.get(`/gym/${slug}/workers/${workerId}/`)
  },
  getGymPositions(slug) {
    return axiosInstance.get(`/gym/${slug}/positions`)
  },
  storeGymPositions(slug,body) {
    return axiosInstance.post(`/gym/${slug}/positions/store`,body)
  },
  indexGymPositions(slug,workerId) {
    return axiosInstance.get(`/gym/${slug}/positions/${workerId}/`)
  },
  updateGymPositions(slug,positionId,body) {
    return axiosInstance.put(`/gym/${slug}/positions/${positionId}/update`,body)
  },
  deleteGymPositions(slug,positionId) {
    return axiosInstance.delete(`/gym/${slug}/positions/${positionId}/delete`)
  },
  getOppeningHours(slug) {
    return axiosInstance.get(`/gym/${slug}/oppening-hours`)
  },
  storeOppeningHours(slug,body) {
    return axiosInstance.post(`/gym/${slug}/oppening-hours/store`,body)
  },
  indexOppeningHours(slug,oppeningId) {
    return axiosInstance.get(`/gym/${slug}/oppening-hours/${oppeningId}/`)
  },
  updateOppeningHours(slug,weekDay,body) {
    return axiosInstance.put(`/gym/${slug}/oppening-hours/${weekDay}/update`,body)
  },
  deleteOppeningHour(slug,weekday) {
    return axiosInstance.delete(`/gym/${slug}/oppening-hours/delete/${weekday}`)
  },
  getGymEquipaments(slug) {
    return axiosInstance.get(`/gym/${slug}/equipaments`)
  },
  storeGymEquipaments(slug,body) {
    return axiosInstance.post(`/gym/${slug}/equipaments/store`,body)
  },
  deleteGymEquipaments(slug,equipId) {
    return axiosInstance.delete(`/gym/${slug}/equipaments/${equipId}/delete`)
  },
  indexEquipaments(slug,equipamentId) {
    return axiosInstance.get(`/gym/${slug}/equipaments/${equipamentId}/`)
  },
  updateGymEquipaments(slug,equipamentId,body) {
    return axiosInstance.put(`/gym/${slug}/equipaments/${equipamentId}/update`,body)
  },
  getGymExercises(slug) {
    return axiosInstance.get(`/gym/${slug}/exercises`)
  },
  deleteGymExercises(slug,exerciseId) {
    return axiosInstance.delete(`/gym/${slug}/exercises/${exerciseId}/delete`)
  },
  storeGymExercises(slug,body) {
    return axiosInstance.post(`/gym/${slug}/exercises/store`,body)
  },
  indexGymExercises(slug,exerciseId) {
    return axiosInstance.get(`/gym/${slug}/exercises/${exerciseId}`)
  },
  updateGymExercises(slug,exerciseId,body) {
    return axiosInstance.put(`/gym/${slug}/exercises/${exerciseId}/update`,body)
  },


  getGymExercisesCategory(slug) {
    return axiosInstance.get(`/gym/${slug}/exercises-category/`)
  },
  storeGymExercisesCategory(slug,body) {
    return axiosInstance.post(`/gym/${slug}/exercises-category/store`,body)
  },
  updateGymExercisesCategory(slug,catId,body) {
    return axiosInstance.put(`/gym/${slug}/exercises-category/${catId}/update`,body)
  },
  deleteGymExercisesCategory(slug,catId) {
    return axiosInstance.delete(`/gym/${slug}/exercises-category/${catId}/delete`)
  },

  getGymStudents(slug) {
    return axiosInstance.get(`/gym/${slug}/students`)
  },

  getStudents(slug) {
    return axiosInstance.get(`/gym/${slug}/students/notConnected`)
  }
};