function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", () => {
 
  loadComponent("header", "header.html");
  loadComponent("contactpage", "contactpage.html");
  loadComponent("footer", "footer.html");
});
