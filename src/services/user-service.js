import { UserRepository } from "../repository/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }


async signIn(data) {
    try {
        const email = data.email;
        const currentPassword = data.password;
      const user = await this.userRepository.findBy({email: email}) // you're creating an object with a property named email and assigning it the value of the email variable that you pass in as an argument.
      
    //   console.log(user);

      if (!user) {
        throw {
          message: "no user found",
        };
      }

      if (!user.comparePassword(data.password)) {
        throw {
          success: false,
          message: "incorrect email or password",
        };
      }
      console.log("User successfully signed in")
      const token = user.genJWT();
      return token;
    } catch (error) {
        throw error;
      }
    }
}
export default UserService;