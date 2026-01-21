import React from "react";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
  const handleRegister = (data) => {
    console.log("Register data:", data);
    // Handle registration
  };

  return <RegisterForm onRegister={handleRegister} />;
}

export default RegisterPage;