// ==========================
// CONFIG SUPABASE
// ==========================

const SUPABASE_URL = "AQUI_TU_PROJECT_URL";

const SUPABASE_KEY = "AQUI_TU_PUBLISHABLE_KEY";

// Crear conexión
const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================
// ELEMENTOS HTML
// ==========================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");


// ==========================
// LOGIN
// ==========================

loginForm.addEventListener("submit", async (event) => {

  // Evitar recarga
  event.preventDefault();

  // Obtener datos
  const email = emailInput.value;

  const password = passwordInput.value;

  // Login Supabase
  const { data, error } =
    await supabaseClient.auth.signInWithPassword({

      email: email,

      password: password

    });

  // Error
  if(error){

    alert("Correo o contraseña incorrectos");

    console.error(error);

    return;
  }

  // Correcto
  alert("Bienvenido a MundoGIS");

  // Redirección
  window.location.href = "visor.html";

});