var swRegistered
// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator && 'PushManager' in window) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("sw.js")
      .then(function(swReg) {
        console.log("Pendaftaran ServiceWorker berhasil");

        swRegistered = swReg;
      })
      .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}