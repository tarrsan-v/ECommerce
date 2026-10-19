
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      if (isRegister) {
        if (form.password !== form.confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        if (form.password.length < 6) {
          throw new Error("Password must contain at least 6 characters.");
        }

        const { data, error } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: form.name.trim()
            }
          }
        });

        if (error) throw error;

        if (!data.session) {
          setMessage(
            "Registration successful! Check your email and click the verification link before logging in."
          );
        } else {
          setMessage("Registration successful!");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password
        });

        if (error) throw error;
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function resendVerification() {
    setMessage("");
    setErrorMessage("");

    if (!form.email.trim()) {
      setErrorMessage("Enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: form.email.trim(),
        options: {
          emailRedirectTo: window.location.origin
        }
      });

      if (error) throw error;

      setMessage(
        "If your account is awaiting confirmation, a verification email will be sent. Check your inbox and spam folder."
      );
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setIsRegister(!isRegister);
    setMessage("");
    setErrorMessage("");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-700 text-center mb-2">
          E-Commerce
        </h1>

        <p className="text-gray-500 text-center mb-6">
          {isRegister ? "Create your account" : "Login to your account"}
        </p>

        {message && (
          <div role="status" className="bg-green-100 text-green-800 p-3 rounded mb-4">
            {message}
          </div>
        )}

        {errorMessage && (
          <div role="alert" className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
            className="w-full border p-3 rounded-lg"
          />

          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={resendVerification}
          disabled={loading}
          className="w-full text-blue-600 text-sm mt-5 hover:underline disabled:opacity-50 cursor-pointer"
        >
          Resend Verification Email
        </button>

        <div className="border-t mt-6 pt-5 text-center">
          <p className="text-gray-500 text-sm">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>

          <button
            type="button"
            onClick={switchMode}
            className="text-blue-600 font-semibold mt-2 cursor-pointer"
          >
            {isRegister ? "Login Here" : "Register Now"}
          </button>
        </div>

      </div>
    </div>
  );
}
