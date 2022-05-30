"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("phone");
  var maskOptions = {
    mask: "+7 (000) 000-00-00",
    lazy: false,
  };
  var mask = new IMask(element, maskOptions);
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);
  let btnDel = null;
  let filesImg = [];
  let filesVideo = [];
  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    let i = 0,
      a = 0,
      len = formImage.files.length,
      lens = formVideo.files.length;

    for (; i < len; i++) {
      formData.append("image[]", formImage.files[i]);
    }
    for (; a < lens; a++) {
      formData.append("video[]", formVideo.files[a]);
    }

    if (error === 0) {
      form.classList.add("_sending");

      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Данные успешно доставлены",
          showConfirmButton: false,
          timer: 1500,
        });
        formPreview.innerHTML = "";
        videoPreview.innerHTML = "";
        form.reset();
        mask = new IMask(element, maskOptions);
        form.classList.remove("_sending");
      } else {
        Swal.fire({
          title: "Ошибка",
        });

        form.classList.remove("_sending");
      }
    } else {
      Swal.fire({
        title: "Заполните обязательные поля",
      });
    }
  }

  !(function (e) {
    "function" != typeof e.matches &&
      (e.matches =
        e.msMatchesSelector ||
        e.mozMatchesSelector ||
        e.webkitMatchesSelector ||
        function (e) {
          for (
            var t = this,
              o = (t.document || t.ownerDocument).querySelectorAll(e),
              n = 0;
            o[n] && o[n] !== t;

          )
            ++n;
          return Boolean(o[n]);
        }),
      "function" != typeof e.closest &&
        (e.closest = function (e) {
          for (var t = this; t && 1 === t.nodeType; ) {
            if (t.matches(e)) return t;
            t = t.parentNode;
          }
          return null;
        });
  })(window.Element.prototype);

  /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll(".js-open-modal"),
    overlay = document.querySelector(".js-overlay-modal"),
    closeButtons = document.querySelectorAll(".js-modal-close");

  /* Перебираем массив кнопок */
  modalButtons.forEach(function (item) {
    /* Назначаем каждой кнопке обработчик клика */
    item.addEventListener("click", function (e) {
      /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
      e.preventDefault();

      /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
      var modalId = this.getAttribute("data-modal"),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );
      console.log(modalId);

      /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
      modalElem.classList.add("active");
      overlay.classList.add("active");
    }); // end click
  }); // end foreach

  closeButtons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var parentModal = this.closest(".modal");

      parentModal.classList.remove("active");
      overlay.classList.remove("active");
    });
  }); // end foreach

  document.body.addEventListener(
    "keyup",
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        document.querySelector(".modal.active").classList.remove("active");
        document.querySelector(".overlay").classList.remove("active");
      }
    },
    false
  );

  overlay.addEventListener("click", function () {
    document.querySelector(".modal.active").classList.remove("active");
    this.classList.remove("active");
  });
  //PopUp
  // let popupBg = document.querySelector(".popup__bg"); // Фон попап окна
  // let popup = document.querySelector(".popup"); // Само окно
  // let openPopupButtons = document.querySelectorAll(".open-popup"); // Кнопки для показа окна
  // let closePopupButton = document.querySelector(".close-popup");
  // openPopupButtons.forEach((button) => {
  //   // Перебираем все кнопки
  //   button.addEventListener("click", (e) => {
  //     // Для каждой вешаем обработчик событий на клик
  //     e.preventDefault(); // Предотвращаем дефолтное поведение браузера
  //     popupBg.classList.add("active"); // Добавляем класс 'active' для фона
  //     popup.classList.add("active"); // И для самого окна
  //   });
  // });
  // closePopupButton.addEventListener("click", () => {
  //   // Вешаем обработчик на крестик
  //   popupBg.classList.remove("active"); // Убираем активный класс с фона
  //   popup.classList.remove("active"); // И с окна
  // });
  // document.addEventListener("click", (e) => {
  //   // Вешаем обработчик на весь документ
  //   if (e.target === popupBg) {
  //     // Если цель клика - фот, то:
  //     popupBg.classList.remove("active"); // Убираем активный класс с фона
  //     popup.classList.remove("active"); // И с окна
  //   }
  // });
  const headerNumber = document.querySelector(".header__number_phone");
  headerNumber.addEventListener("click", () => {
    headerNumber.classList.add("active");
  });
  headerNumber.addEventListener("animationend", AnimationHandler, false);
  function AnimationHandler() {
    // Удаляем класс с анимацией
    headerNumber.classList.remove("active");
  }
  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      console.log(formReq);
      console.log(error);

      if (input.classList.contains("_tel")) {
        if (!validatePhone(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  function validatePhone(input) {
    // let regex = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
    return /^(\+375).+(29|25|44|33).+(\d{3}).+(\d{2}).+(\d{2})$/.test(
      input.value
    );
  }

  const formImage = document.getElementById("formImage");
  const formPreview = document.getElementById("formPreview");

  formImage.addEventListener("change", () => {
    for (let i = 0; i < formImage.files.length; i++) {
      uploadFile(formImage.files[i]);
    }
  });

  function uploadFile(file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      Swal.fire({
        title: "Разрешены только изображения.",
      });
      formImage.value = "";
      return;
    }
    //размер файла < 6мб
    if (file.size > 6 * 1024 * 1024) {
      Swal.fire({
        title: "Файл должен быть менее 6 МБ.",
      });
      return;
    }
    var i = 0;
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      formPreview.insertAdjacentHTML(
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
    filesImg = formImage.files;
    console.log(filesImg);
    const block = formPreview
      .querySelector(`[data-name="${name}"]`)
      .closest(".preview-image");
    block.classList.add("removing");
    setTimeout(() => block.remove(), 300);
  };

  formPreview.addEventListener("click", removeHandler);

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
          <video src="${reader.result}" alt="${file.name}"></video>
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
  const removeHandlers = (event) => {
    // console.log("event", event.target.dataset);
    if (!event.target.dataset.name) {
      return;
    }
    const { name } = event.target.dataset; // получаем нужное значение в фигурных скобках
    console.log(name);
    filesVideo = formVideo.files;
    console.log(filesVideo);
    const block = videoPreview
      .querySelector(`[data-name="${name}"]`)
      .closest(".preview-image");
    block.classList.add("removing");
    setTimeout(() => block.remove(), 300);
  };

  videoPreview.addEventListener("click", removeHandlers);
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
//     let i=0,len = formImage.files.length;

//     for (;i < len;i++){
//         formData.append("image[]", formImage.files[i]);
//     }

//     if (error === 0) {
//       form.classList.add("_sending");
//       console.log(formImage.files)
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

//         formPreview.innerHTML = "";
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

//   const formImage = document.getElementById("formImage");
//   const formPreview = document.getElementById("formPreview");

//   formImage.addEventListener("change", () => {
//           for (let i= 0; i < formImage.files.length;i++){
//               uploadFile(formImage.files[i]);
//           }

//   });

//   function uploadFile(file) {
//     if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
//       Swal.fire({
//         title: "Разрешены только изображения.",
//       });
//       formImage.value = "";
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
//       formPreview.appendChild(img);
//       img.src = reader.result;
//       // formPreview.innerHTML = `<img src="${reader.result}" alt="Фото">`;
//     };
//     reader.onerror = function (e) {
//       Swal.fire({
//         title: "Ошибка",
//       });
//     };
//   };
// });
