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

  getUserRole(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
}

getProfile() {
  return this.http.get<any>(
    'http://localhost:5000/api/profile/me'
  );
}

updateProfile(data: any) {
  return this.http.put(
    'http://localhost:5000/api/profile/me',
    data
  );
}

addTeachSkill(data: { skillName: string; level: string }) {
  return this.http.post(
    'http://localhost:5000/api/profile/teach-skill',
    data
  );
}

addLearnSkill(data: { skillName: string }) {
  return this.http.post(
    'http://localhost:5000/api/profile/learn-skill',
    data
  );
}


  logout() {
  localStorage.removeItem('token');
}

}



