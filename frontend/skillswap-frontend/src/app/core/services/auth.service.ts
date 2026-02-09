import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}
register(data: any) {
  return this.http.post(
    `${this.API_URL}/register`,
    data
  );
}

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string }>(
      `${this.API_URL}/login`,
      data
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
  localStorage.removeItem('token');
}

}



