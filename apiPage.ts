import { APIRequestContext, expect } from '@playwright/test';

export class ApiPage {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUser(userId: number) {
    const response = await this.request.get(`/users/${userId}`);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async createUser(userData: object) {
    const response = await this.request.post('/users', { data: userData });
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async updateUser(userId: number, userData: object) {
    const response = await this.request.put(`/users/${userId}`, { data: userData });
    expect(response.ok()).toBeTruthy();
    return response.json();
  }
}
