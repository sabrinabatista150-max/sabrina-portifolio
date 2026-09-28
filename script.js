// Tema claro/escuro
const raiz = document.documentElement;
const btnTema = document.getElementById("tema");
function aplicarTema(t) {
  raiz.dataset.tema = t;
  btnTema.textContent = t === "escuro" ? "☀️" : "🌙";
}
aplicarTema(matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro");
btnTema.addEventListener("click", () =>
  aplicarTema(raiz.dataset.tema === "escuro" ? "claro" : "escuro")
);

// Filtro de projetos
const filtros = document.querySelectorAll(".filtro");
const projetos = document.querySelectorAll(".p");
filtros.forEach(btn => btn.addEventListener("click", () => {
  filtros.forEach(b => b.classList.remove("ativo"));
  btn.classList.add("ativo");
  projetos.forEach(p =>
    p.classList.toggle("oculto", btn.dataset.f !== "todos" && p.dataset.t !== btn.dataset.f)
  );
}));

// Contador de projetos
const contador = document.getElementById("contador");
const total = projetos.length;
let n = 0;
const passo = setInterval(() => {
  contador.textContent = ++n;
  if (n >= total) clearInterval(passo);
}, 250);

// Menu destaca a seção atual
const links = document.querySelectorAll("nav a");
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting)
      links.forEach(a => a.classList.toggle("ativo", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("section").forEach(s => obs.observe(s));

// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
