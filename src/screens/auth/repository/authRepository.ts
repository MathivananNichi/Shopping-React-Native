import { AxiosInstance } from "axios";
import { BaseRepository } from "../../../services/api/baseRepository";
import { AppEndPoints } from "../../../services/api/endpoints";
import { ApiResponse } from "../../../services/api/commonDto";
import {
  LoginDto,
  LoginResponse,
  SignUpDto,
  SignUpResponse,
} from "../api/auth.dto";

/**
 * Interface representing Auth contract (OOP Concept - Abstraction)
 */
export interface IAuthRepository {
  login(data: LoginDto): Promise<ApiResponse<LoginResponse>>;
  signUp(data: SignUpDto): Promise<ApiResponse<SignUpResponse>>;
  logout(): Promise<ApiResponse<null>>;
}

/**
 * AuthRepository (OOP Concept - Inheritance, Encapsulation, Polymorphism)
 * Extends BaseRepository to encapsulate Auth API communications.
 *
 * Injected with AxiosInstance via TSyringe factory provider or passed directly in tests:
 *   new AuthRepository(mockAxios)
 */
export class AuthRepository extends BaseRepository implements IAuthRepository {
  constructor(client: AxiosInstance) {
    super(client);
  }

  /**
   * Performs user login
   */
  async login(data: LoginDto): Promise<ApiResponse<LoginResponse>> {
    return this.post<ApiResponse<LoginResponse>, LoginDto>(
      AppEndPoints.login,
      data
    );
  }

  /**
   * Performs user sign up
   */
  async signUp(data: SignUpDto): Promise<ApiResponse<SignUpResponse>> {
    return this.post<ApiResponse<SignUpResponse>, SignUpDto>(
      AppEndPoints.signUp,
      data
    );
  }

  /**
   * Performs user logout
   */
  async logout(): Promise<ApiResponse<null>> {
    return this.delete<ApiResponse<null>>(AppEndPoints.logOut);
  }
}
