import React from 'react'

const Login = () => {
  const loginWithGoogle = () => window.open('http://localhost:4000/auth/google', '_self');
  const loginWithLinkedIn = () => window.open('http://localhost4000/auth/linkedin', '_self');
  const loginWithGitHub = () => window.open('http://localhost:4000/auth/github', '_self');
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <button onClick={loginWithGoogle}>Login with Google</button><br /><br />
      <button onClick={loginWithLinkedIn}>Login with LinkedIn</button><br /><br />
      <button onClick={loginWithGitHub}>Login with GitHub</button>
    </div>
  )
}

export default Login
