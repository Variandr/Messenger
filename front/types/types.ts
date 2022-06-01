export interface Interceptors {
  accessToken: string;
  refreshToken: string;
}

export interface Auth {
  user: {
    login: string;
    id: number;
  };
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export interface Refresh {
  user: {
    login: string;
    id: number;
  };
  accessToken: string;
  refreshToken: string;
}

export interface AuthProps {
  login(log: string, password: string, remember: boolean): void;

  registration(log: string, password: string, username: string | null, remember: boolean): void;
}

export interface LoginValues {
  login: string;
  password: string;
  remember: boolean;
}

export interface RegisterValues extends LoginValues {
  username: string;
}

export interface LoginProps {
  onSubmit: (values: LoginValues) => void;
  setSignUp: () => void;
}

export interface RegisterProps {
  onSubmit: (values: RegisterValues) => void;
  setSignUp: () => void;
}

export interface ChatProps {
  userId: number | null;
  isEditingAvailable: boolean;
  m: Message;

  editMessage(m: Message, messageForEdit: string): void;

  deleteMessageOnClick(m: Message): void;

  setEditing(prop: boolean): void;
}

export interface UsersProps {
  u: Users;
  myData: Array<User>;
  userId: number | null;
  dialogs: Array<Dialogs> | null;
}

interface members {
  id: number | null;
  username: string | null;
}

export interface ShowFreeUsersProps {
  chatMembers: Array<members> | null;
  setUsersShow: (isUsersShow: boolean) => void;
  addParticipant: (id: number, username: string) => void;
}

export interface User {
  id: number | null;
  username: string | null;
}

export interface Dialogs {
  id: number;
  chat_name: string;
  created_at: string;
  updated_at: null | string;
  message: string | null;
  username: string | null;
}

export interface Message {
  id: number;
  user_id: number;
  chat_id: number;
  username: string;
  body: string;
  created_at: string;
  updated_at: string | null;
}

interface ChatMembers {
  id: number;
  username: string;
  online: boolean;
  last_online: string;
}

export interface Chat {
  id: number;
  chat_name: string;
  created_at: string;
  updated_at: string | null;
  chatMembers: Array<ChatMembers>;
  messages: Array<Message>;
}

export interface Users {
  id: number;
  status: string | null;
  username: string;
  login: string;
  online: boolean;
  last_online: string;
}

export interface Profile {
  id: number;
  username: string;
  login: string;
  status: string | null;
}
