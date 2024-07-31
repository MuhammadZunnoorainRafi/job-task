export type ISignUpData = {
  name: string;
  email: string;
  password: string;
};
export type ISignInData = {
  email: string;
  password: string;
};

export type ITask = {
  title: string;
  description: string;
};

export type ITaskEdit = {
  id: string;
  title: string;
  description: string;
};

export type TaskStats = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
