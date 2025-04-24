export function isAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return !!token && role === 'admin';
  }
  
  export function loginAdmin(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'admin');
  }
  
  export function logoutAdmin() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  