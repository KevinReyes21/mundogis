// ==========================
// CONFIG SUPABASE
// ==========================

const SUPABASE_URL = "https://fkmerfevyfybyyuoeoix.supabase.co";

const SUPABASE_KEY = "sb_publishable_oRZGW69066Hnvz_kakWyxQ_fEzOxR3b";

const supabaseClient =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


// ==========================
// ELEMENTOS
// ==========================

const logoutBtn =
  document.getElementById("logoutBtn");


// ==========================
// VERIFICAR SESIÓN
// ==========================

async function verificarSesion(){

  const { data, error } =
    await supabaseClient.auth.getSession();

  if(!data.session){

    window.location.href = "login.html";

    return;
  }

  document.body.classList.remove("hidden");

  console.log("Sesión activa");

}

verificarSesion();


// ==========================
// LOGOUT
// ==========================

if(logoutBtn){

  logoutBtn.addEventListener("click", async () => {

    console.log("Logout click");

    await supabaseClient.auth.signOut();

    window.location.href = "login.html";

  });

}