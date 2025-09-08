import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ⚡ Reemplaza con tus credenciales de Supabase
const SUPABASE_URL = "https://TU-PROYECTO.supabase.co";
const SUPABASE_KEY = "TU-ANON-PUBLIC-KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Registro de usuario
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const pass = document.getElementById("signupPass").value;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  document.getElementById("msg").innerText = error ? error.message : "✅ Usuario registrado, revisa tu correo";
});

// Login de usuario
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });

  if (error) {
    document.getElementById("msg").innerText = "❌ " + error.message;
  } else {
    document.getElementById("msg").innerText = "✅ Bienvenido " + data.user.email;
    localStorage.setItem("supabaseSession", JSON.stringify(data.session)); // Guardar sesión
    // window.location.href = "dashboard.html"; // si quieres redirigir
  }
});
