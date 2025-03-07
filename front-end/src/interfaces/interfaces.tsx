export interface IRegisterUser {
  username: string
  email: string
  password: string
  "password-confirmation": string
}

export interface IRegisterErrorResponse {
  response: {
    data: {
      error: string
    }
  }
}

export interface IRegisterSuccessResponse {
  message: string
}

export interface ILoggedOutRoutesProps {
  setLogin: (userLoggedIn: boolean) => void
}

export interface IUserData {
  email: string
  username: string
}

export interface ILoginFormProps {
  setLogin: (userLoggedIn: boolean) => void
}

export interface ILoginUser {
  email: string
  password: string
}

export interface ILoginSuccessResponse {
  token: string
  data: {
    email: string
    username: string
  }
}

export interface ILoginErrorResponse {
  error: string // Adjust this based on your API's error format
}

export interface ITodo {
  id?: number
  completed: boolean
  description: string
  dateCompleted?: string
}

export interface ITodoItemProps {
  index: number
  todo: ITodo
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
  setNumCompletedTodos: (numCompletedTodos: number) => void
}

export interface IDaily {
  id?: number
  completed: boolean
  description: string
  dateCreated: Date | string
  streakCounter: number
  lastCompletedDate?: Date | string
}

export interface IDailyItemProps {
  index: number
  daily: IDaily
  dailies: IDaily[]
  setDailies: (dailies: IDaily[]) => void
  setCompletedDailies: (completedDailies: number) => void
}
