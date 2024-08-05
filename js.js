//? Selectorler
const boxes = document.querySelectorAll(".box");
const buttons = document.querySelectorAll(".box-top-last button");

//?fonksiyonları tanımlama
const guncelFiyat = (box) => {
  const span = box.querySelector("small span");
  const orjText = span.innerText;
  // Zaten indirim uygulanmışsa mouseover'da tekrar uygulama
  if (!span.innerHTML.includes("line-through")) {
    span.innerHTML = `<span class="line-through">${orjText}</span> <span>175TL<sup>%50 indirim</sup></span>`;
  }
  boxes.forEach((otherBox) => {
    if (otherBox !== box) {
      otherBox.style.opacity = "0.4"; // Diğer kutuların opaklığını azalt
    }
  });
};

const eskiFiyat = (box) => {
  const span = box.querySelector("small span");
  if (span.querySelector(".line-through")) {
    span.innerText = span.querySelector(".line-through").innerText;
  }// burayı koşullu yazmayınca fiyat güncelemeleri hatalı oldu.

  boxes.forEach((otherBox) => {
    otherBox.style.opacity = "1"; // Diğer kutuların opaklığını geri ayarla
  });
};

const kampanyaSec = (box, button) => {
 ;

  boxes.forEach((otherBox) => {
    if (otherBox !== box) {
      otherBox.style.backgroundColor = ""; 
      otherBox.querySelector(".box-top-last button").innerText = "Seç";
      eskiFiyat(otherBox);
    }
  });

  box.style.backgroundColor = "orangered";
  button.innerText = "Seçildi";
  guncelFiyat(box);
};

//?event tanımlamalari
//mouseover-out
boxes.forEach((box) => {
  box.addEventListener("mouseover", () => guncelFiyat(box));
  box.addEventListener("mouseout", () => {
    const button = box.querySelector(".box-top-last button");
    if (button.innerText === "Seç") {// koşul koyulmazsa seçilse bile mouseoverda fiyat eski haline dönüyor
      eskiFiyat(box);
    }
  });
});
//click
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const box = button.closest(".box"); // En yakın parent seçimi
    kampanyaSec(box, button);
  });
});
//keyup
document.addEventListener("keyup", (event) => {
  const key = +event.key - 1; // index 0 dan başladığından girilen sayıdan 1 çıkarılıyor.
  if (key >= 0 && key < boxes.length) {
    const box = boxes[key];
    const button = box.querySelector(".box-top-last button");
    guncelFiyat(box);
    eskiFiyat(box);
    kampanyaSec(box, button);
  }
});
