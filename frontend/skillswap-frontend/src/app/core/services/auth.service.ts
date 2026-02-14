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

discoverBySkill(skill: string = '') {
  return this.http.get<any[]>(
    `http://localhost:5000/api/discovery/search?skill=${skill}`
  );
}

getPublicProfile(userId: string) {
  return this.http.get<any>(
    `http://localhost:5000/api/public/user/${userId}`
  );
}

requestSession(teacherId: string, skillId: string) {
  return this.http.post(
    'http://localhost:5000/api/sessions/send',
    { teacherId, skillId }
  );
}

getTeacherRequests() {
  return this.http.get<any[]>(
    'http://localhost:5000/api/sessions/teacher'
  );
}

updateRequestStatus(requestId: string, status: string) {
  return this.http.patch(
    `http://localhost:5000/api/sessions/${requestId}/status`,
    { status }
  );
}

getMyRequests() {
  return this.http.get<any[]>(
    'http://localhost:5000/api/sessions/mine'
  );
}

markSessionCompleted(id: string) {
  return this.http.patch(
    `http://localhost:5000/api/sessions/${id}/complete`,
    {}
  );
}

submitFeedback(sessionId: string, rating: number, review: string) {
  return this.http.post(
    `http://localhost:5000/api/sessions/${sessionId}/feedback`,
    { rating, review }
  );
}

getMessages(sessionId: string) {
  return this.http.get<any[]>(
    `http://localhost:5000/api/messages/${sessionId}`
  );
}

sendMessage(sessionId: string, text: string) {
  return this.http.post(
    'http://localhost:5000/api/messages/send',
    { sessionId, text }
  );
}



  logout() {
  localStorage.removeItem('token');
}

}



