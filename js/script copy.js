"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // var element = document.getElementById("phone");
  // var maskOptions = {
  //   mask: "+375(00)000-00-00",
  //   lazy: false,
  // };
  // var mask = new IMask(element, maskOptions);
  // const form = document.getElementById("form");
  // form.addEventListener("submit", formSend);
  // let btnDel = null;
  // let files = [];
  // async function formSend(e) {
  //   e.preventDefault();

  //   let error = formValidate(form);

  //   let formData = new FormData(form);
  //   let i = 0,
  //     len = formVideo.files.length;

  //   for (; i < len; i++) {
  //     formData.append("image[]", formVideo.files[i]);
  //   }

  //   if (error === 0) {
  //     form.classList.add("_sending");

  //     let response = await fetch("sendmail.php", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     if (response.ok) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: "Данные успешно доставлены",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });

  //       videoPreview.innerHTML = "";
  //       form.reset();
  //       mask = new IMask(element, maskOptions);
  //       form.classList.remove("_sending");
  //     } else {
  //       Swal.fire({
  //         title: "Ошибка",
  //       });

  //       form.classList.remove("_sending");
  //     }
  //   } else {
  //     Swal.fire({
  //       title: "Заполните обязательные поля",
  //     });
  //   }
  // }

  const formVideo = document.getElementById("formVideo");
  const videoPreview = document.getElementById("videoPreview");

  formVideo.addEventListener("change", () => {
    for (let i = 0; i < formVideo.files.length; i++) {
      uploadVideo(formVideo.files[i]);
    }
  });

  function uploadVideo(file) {
    if (!["video/mp3", "video/mp4"].includes(file.type)) {
      Swal.fire({
        title: "Разрешены только видео.",
      });
      formVideo.value = "";
      return;
    }
    //размер файла < 15мб
    if (file.size > 15 * 1024 * 1024) {
      Swal.fire({
        title: "Файл должен быть менее 15 МБ.",
      });
      return;
    }
    var i = 0;
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      videoPreview.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="preview-image">
        <div class="preview-remove" data-name="${file.name}">&times;</div>
          <img src="${reader.result}" alt="${file.name}" />
          <div class="preview-info">
            <span>${file.name}</span>
            </div>
          </div>
      `
      );
    };
    reader.onerror = function (e) {
      Swal.fire({
        title: "Ошибка",
      });
    };
  }
  const removeHandler = (event) => {
    // console.log("event", event.target.dataset);
    if (!event.target.dataset.name) {
      return;
    }
    const { name } = event.target.dataset; // получаем нужное значение в фигурных скобках
    console.log(name);
    files = formVideo.files;
    console.log(files);
    const block = videoPreview
      .querySelector(`[data-name="${name}"]`)
      .closest(".preview-image");
    block.classList.add("removing");
    setTimeout(() => block.remove(), 300);
  };

  videoPreview.addEventListener("click", removeHandler);
});

//JS-файл измененный с хостинга

// "use strict";

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form");
//   form.addEventListener("submit", formSend);

//   async function formSend(e) {
//     e.preventDefault();

//     let error = formValidate(form);

//     let formData = new FormData(form);
//     let i=0,len = formVideo.files.length;

//     for (;i < len;i++){
//         formData.append("image[]", formVideo.files[i]);
//     }

//     if (error === 0) {
//       form.classList.add("_sending");
//       console.log(formVideo.files)
//       let response = await fetch("sendmail.php", {
//         method: "POST",
//         body: formData,
//       });
//       if (response.ok) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Данные успешно доставлены",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         videoPreview.innerHTML = "";
//         form.reset();
//         form.classList.remove("_sending");
//       } else {
//         Swal.fire({
//           title: "Ошибка",
//         });

//         form.classList.remove("_sending");
//       }
//     } else {
//       Swal.fire({
//         title: "Заполните обязательные поля",
//       });
//     }
//   }

//   function formValidate(form) {
//     let error = 0;
//     let formReq = document.querySelectorAll("._req");

//     for (let index = 0; index < formReq.length; index++) {
//       const input = formReq[index];
//       formRemoveError(input);
//       console.log(formReq);
//       console.log(error);

//       if (input.classList.contains("_tel")) {
//         if (!validatePhone(input)) {
//           formAddError(input);
//           error++;
//         }
//       } else {
//         if (input.value === "") {
//           formAddError(input);
//           error++;
//         }
//       }
//     }
//     return error;
//   }
//   function formAddError(input) {
//     input.parentElement.classList.add("_error");
//     input.classList.add("_error");
//   }
//   function formRemoveError(input) {
//     input.parentElement.classList.remove("_error");
//     input.classList.remove("_error");
//   }
//   function validatePhone(input) {
//     // let regex = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
//     return /^(\+375|375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/.test(
//       input.value
//     );
//   }

//   const formVideo = document.getElementById("formVideo");
//   const videoPreview = document.getElementById("videoPreview");

//   formVideo.addEventListener("change", () => {
//           for (let i= 0; i < formVideo.files.length;i++){
//               uploadVideo(formVideo.files[i]);
//           }

//   });

//   function uploadVideo(file) {
//     if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
//       Swal.fire({
//         title: "Разрешены только изображения.",
//       });
//       formVideo.value = "";
//       return;
//     }
//     //размер файла < 2мб
//     if (file.size > 2 * 1024 * 1024) {
//       Swal.fire({
//         title: "Файл должен быть менее 2 МБ.",
//       });
//       return;
//     }
//     var name;
//     var reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = function (e) {
//       let img = document.createElement("img");
//       videoPreview.appendChild(img);
//       img.src = reader.result;
//       // videoPreview.innerHTML = `<img src="${reader.result}" alt="Фото">`;
//     };
//     reader.onerror = function (e) {
//       Swal.fire({
//         title: "Ошибка",
//       });
//     };
//   };
// });
