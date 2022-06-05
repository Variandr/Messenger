import axios, { AxiosResponse } from 'axios';
import { Auth, Interceptors, ProfileAxiosRes, Refresh, User } from '../../types/types';
import { useDispatch } from 'react-redux';
import { actions } from '../state/Reducers/snackbarReducer';

const instance = axios.create({
  baseURL: `http://localhost:5000/api/`,
  withCredentials: true,
});

instance.interceptors.response.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  async (error) => {
    const dispatch = useDispatch();
    const originalRequest = error.config;
    if (error.status === 401 && error.config && !error.config.isRetry) {
      originalRequest.isRetry = true;
      try {
        const response = await instance
          .get('auth/refresh')
          .then((res: AxiosResponse<Interceptors>) => res.data);
        localStorage.setItem('accessToken', response.accessToken);
        return instance.request(originalRequest);
      } catch (e) {
        dispatch(actions.setSnackbar(true, 'error', 'Unauthorized'));
      }
    }
  }
);

export const AuthAPI = {
  login(login: string, password: string, remember: boolean) {
    return instance
      .post<Auth>('auth/login', { login, password, remember })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data;
      })
      .catch((err) => err);
  },
  reg(login: string, password: string, username: string | null, remember: boolean) {
    return instance
      .post<Auth>('auth/reg', { login, password, username, remember })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data;
      })
      .catch((err) => err);
  },
  logout() {
    return instance
      .delete<AxiosResponse>('auth/logout')
      .then((res) => {
        localStorage.removeItem('accessToken');
        return res.data;
      })
      .catch((err) => err);
  },
  authMe() {
    return instance
      .get<Refresh>('auth/refresh')
      .then((res) => res)
      .catch((err) => err);
  },
};

export const ProfileAPI = {
  getProfile(userId: number | string) {
    return instance.get<ProfileAxiosRes>(`profile/${userId}`).then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance.put('profile/status', { status }).then((res) => res.data);
  },
  updateUsername(username: string) {
    return instance.put('profile/username', { username }).then((res) => res.data);
  },
};

export const UsersAPI = {
  getUsers() {
    return instance.get<Array<ProfileAxiosRes>>('profile/users').then((res) => res.data);
  },
};

export const DialogsAPI = {
  createChat(chatName: string, users: Array<User>) {
    return instance.post(`dialogs`, { chatName, users }).then((res) => res.data);
  },
  addParticipant(chatId: number, userId: number) {
    return instance.put(`dialogs/${chatId}`, { userId }).then((res) => res);
  },
};
