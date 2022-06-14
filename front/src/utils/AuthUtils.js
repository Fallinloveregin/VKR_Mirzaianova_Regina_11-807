const AuthStorageKeys = {
  AuthToken: 'auth_token',
}

class AuthUtils {
  constructor() {
    this.listeners = []
  }

  onTokenChange(listener) {
    function handler({ key, newValue }) {
      if (key === AuthStorageKeys.AuthToken) {
        listener(newValue)
      }
    }

    this.listeners.push(listener)
    window.addEventListener('storage', handler)

    return {
      unsubscribe: () => {
        this.listeners = this.listeners.filter(l => l !== listener)
        window.removeEventListener('storage', handler)
      },
    }
  }

  _notifyTokenChange() {
    const authToken = this.getAuthToken()
    if (authToken !== this.prevAuthToken) {
      this.listeners.forEach(listener => listener(authToken))
      this.prevAuthToken = authToken
    }
  }

  isAuthenticated() {
    return Boolean(this.getAuthToken())
  }

  logout() {
    return this.clearAuthToken()
  }

  setAuthToken(token) {
    localStorage.setItem(AuthStorageKeys.AuthToken, token)
    this._notifyTokenChange()
  }

  clearAuthToken() {
    localStorage.removeItem(AuthStorageKeys.AuthToken)
    this._notifyTokenChange()
  }

  getAuthToken() {
    return localStorage.getItem(AuthStorageKeys.AuthToken)
  }
}

export default new AuthUtils()
