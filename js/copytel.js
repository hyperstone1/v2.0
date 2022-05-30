document.body.onclick = (event) => {
  const elem = event.target;
  if (elem.classList.contains("copy-tel")) {
    navigator.clipboard.writeText("+79221110500").then(
      () => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Номер скопирован",
        });
      },
      () => {
        alert("Не удалось скопировать");
      }
    );
  }
};
