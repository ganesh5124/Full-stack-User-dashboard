import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

   // Simulated login with hardcoded credentials
   login(username: string, password: string): boolean {
    // In a real application, this method would make an HTTP request to your backend
    // to validate the credentials. For this example, we'll use hardcoded values.
    if (username === 'user' && password === 'password') {
      // In a real app, you would generate a token and store it securely (not in localStorage)
      localStorage.setItem('currentUser', JSON.stringify({ username: username }));
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
