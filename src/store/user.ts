import { runInAction, makeAutoObservable } from "mobx";
import { IUser } from "../Types/user/User";
import { notify } from "../UI";
import { UserApi } from "../API";
import { catchHelper } from "../helpers";

class User {
  private _userData: IUser | null = null;

  public get userData(): IUser | null {
    return this._userData;
  }

  public get getAvatar(): string | null {
    return this._userData?.avatarUrl ?? null;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public async toAuthorization(
    login: string,
    password: string
  ): Promise<boolean> {
    try {
      const { data } = await UserApi.auth(login, password);

      if (data.success) {
        runInAction(() => {
          this._userData = data.data.userData;
          localStorage.setItem("token", data.data.token);
        });
      }
      return data.success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async toRegistration(login: string, password: string, email: string) {
    try {
      const { data } = await UserApi.register(login, password, email);
      return data.success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async autoAuth() {
    if (!localStorage.token) return;
    try {
      const { data } = await UserApi.autoAuth();
      if (data.success) {
        runInAction(() => {
          this._userData = data.userData;
        });
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async saveNewAvatar(avatar: File): Promise<void> {
    try {
      let formData = new FormData();
      formData.append("avatar", avatar);
      const { data } = await UserApi.saveNewAvatar(formData);
      if (data.success) {
        runInAction(() => {
          this._userData = data.userData;
        });
      } else {
        notify(data.message, "error");
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public toSignOut(): void {
    localStorage.removeItem("token");

    const user = this.userData;
    if (user) {
      localStorage.setItem("login", user.login);
    }
    this._userData = null;
  }
}

export default new User();
