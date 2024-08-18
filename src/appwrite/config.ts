import { Client, Account, ID } from 'appwrite';
import conf from '../conf/config';



export { ID } from 'appwrite';

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
}

type LoginUserAccount = {
  email: string;
  password: string;
}

export const client = new Client();

client
.setEndpoint(conf.appwriteUrl)
.setProject(conf.appwriteProjectId); // Replace with your project ID

export const account = new Account(client);

export class AppwriteService {
  //create a new reocord of user inside appsite
  async createUserAccount({ email, password, name}: CreateUserAccount) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password});
      } else {
        return null;
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      const session = await account.createSession(email, password);
      return session;
    } catch (error) {
      console.error(error);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const response = await this.getCurrentUser();
      return Boolean(response);
    } catch (error) {
      console.error(error);
      return false;
    }

  }

  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error(error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
