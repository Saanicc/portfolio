"use client";

import React, { useEffect, useState } from "react";
import { AdminPanel } from "@/components/AdminPanel/AdminPanel";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/init";
import { useAuth } from "@/components/AdminPanel/Login/useAuth";
import LoginForm from "@/components/AdminPanel/Login/LoginForm";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <AdminPanel onLogout={handleLogout} />
  ) : (
    <LoginForm onLogin={handleLogin} />
  );
};

export default AdminPage;
