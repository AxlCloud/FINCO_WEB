import React from "react";
import LoginForm from "./LoginForm";

function LoginPage() {
  const handleLogin = (data) => {
    console.log("Login data:", data);
    // Redirect to admin or handle auth
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginPage;