import { SignupFormType } from "../types/SignupFormType";

export const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    var payload : SignupFormType = {
      name: data.get('name')?.toString() ?? "",
      email: data.get('email')?.toString() ?? "",
      password: data.get('password')?.toString() ?? "",
      passwordConfirm: data.get('passwordConfirm')?.toString() ?? "",
    }

    return payload;
}
