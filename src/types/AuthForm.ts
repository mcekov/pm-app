export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  username: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}
