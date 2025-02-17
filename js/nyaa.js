document.addEventListener("DOMContentLoaded", function () {
  getRandomAnime();
});

function getRandomAnime() {
  const randomIndex = Math.floor(Math.random() * 20) + 1;
  const randomImage = `img/grills/${randomIndex}.png`;

  document.body.style.backgroundImage = `url('${randomImage}'), url('img/bg.png')`;
  document.body.style.backgroundPosition = "right 10% bottom";
  document.body.style.backgroundRepeat = "no-repeat,repeat";
  document.body.style.backgroundSize = "auto";
}

function getRandomVideo() {
  const owner_id = -30316056;
  const video_id = Math.floor(Math.random() * (456389323 - 456239001 + 1)) + 456239001;
  const script = document.createElement("script");
  let token = localStorage.getItem("access_token");
  const apiUrl = `https://api.vk.com/method/video.get?access_token=${token}&v=5.113&videos=${owner_id}_${video_id}&callback=handleResponse`;

  script.src = apiUrl;

  document.head.appendChild(script);
}

function handleResponse(data) {
  if (data.response && data.response.count === 1) {
    const title = data.response.items[0].title;
    if (title && title == ".webm") {
      console.log(`Gotcha(video)! ${data.response.items[0].id} succeed. seed: ${Math.floor(Math.random() * 2 ** 32)}`);
      const playerUrl = data.response.items[0].player;
      displayVideoUrl(playerUrl);
    } else {
      console.log(`Retry(video), because ${data.response.items[0].id} failed. seed: ${Math.floor(Math.random() * 2 ** 32)}`);
      getRandomVideo();
    }
  } else {
    console.log(`Retry(video), because it failed. seed: ${Math.floor(Math.random() * 2 ** 32)}`);
    getRandomVideo();
  }

  document.head.removeChild(document.querySelector('script[src*="api.vk.com"]'));
}

function displayVideoUrl(playerUrl) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = `<iframe width="560" height="315" src="${playerUrl}" frameborder="0" allowfullscreen></iframe>`;
}

function getRandomMem() {
  const public = Math.floor(Math.random() * 5) + 1;
  let owner_idclub, groupname1;

  switch (public) {
    case 1:
      owner_idclub = -155464693;
      groupname1 = "Картинки категории Б";
      break;
    case 2:
      owner_idclub = -92337511;
      groupname1 = "абстрактные мемы для элиты всех сортов";
      break;
    case 3:
      owner_idclub = -93082454;
      groupname1 = "About 50 posts of trash per day";
      break;
    case 4:
      owner_idclub = -155340106;
      groupname1 = "Антивсё";
      break;
    case 5:
      owner_idclub = -113828034;
      groupname1 = "1337const";
      break;
    default:
      break;
  }
  let token = localStorage.getItem("access_token");
  const apiUrl = `https://api.vk.com/method/photos.get?access_token=${token}&v=5.113&album_id=wall&owner_id=${owner_idclub}&rev=1&count=1000&callback=handleMemResponse`;

  const script = document.createElement("script");
  script.src = apiUrl;

  document.head.appendChild(script);
}

function handleMemResponse(data) {
  const groupname1 = decodeURIComponent(getUrlParameter("groupname"));

  if (data.response && data.response.items && data.response.items.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.response.items.length);
    const owner_id = data.response.items[randomIndex].owner_id;
    const photo_id = data.response.items[randomIndex].id;
    console.log(`Gotcha(latephoto)! ${owner_id}_${photo_id} succeed. club = ${groupname1}`);
    loadPhotoDetails(owner_id, photo_id);
  } else {
    console.log(`Failed to get random photo. club: ${groupname1}`);
  }
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function handlePhotoDetailsResponse(response) {
  delete window.handlePhotoDetailsResponse;

  const script = document.getElementById("jsonpScript");
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }

  if (response && response.response && response.response.items && response.response.items.length > 0) {
    const photoSizes = response.response.items[0].sizes;

    const highestResolutionPhoto = photoSizes.reduce((prev, current) => {
      return current.width > prev.width || current.height > prev.height ? current : prev;
    });

    const highestResolutionUrl = highestResolutionPhoto.url;

    const videoContainer = document.getElementById("videoContainer");
    if (videoContainer) {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight / 1.5;

      let imageWidth, imageHeight;

      if (highestResolutionPhoto.width / containerWidth > highestResolutionPhoto.height / containerHeight) {
        imageWidth = containerWidth;
        imageHeight = (containerWidth / highestResolutionPhoto.width) * highestResolutionPhoto.height;
      } else {
        imageHeight = containerHeight;
        imageWidth = (containerHeight / highestResolutionPhoto.height) * highestResolutionPhoto.width;
      }

      videoContainer.innerHTML = `<a id="imagememe" href="${highestResolutionUrl}"><img src="${highestResolutionUrl}" alt="Highest Resolution Photo" width="${imageWidth}" height="${imageHeight}"></a>`;
    } else {
      console.error("Element with id 'videoContainer' not found.");
    }
  } else {
    console.error("Error in response or no items found.");
  }
}

function loadPhotoDetails(owner_id, photo_id) {
  let token = localStorage.getItem("access_token");
  const apiUrl = `https://api.vk.com/method/photos.get?access_token=${token}&v=5.113&album_id=wall&owner_id=${owner_id}&photo_ids=${photo_id}&callback=handlePhotoDetailsResponse`;

  const script = document.createElement("script");
  script.src = apiUrl;
  script.id = "jsonpScript";

  document.body.appendChild(script);
}

function drawTextOnImage(name) {
  let fontSize = 100;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = "img/cola.png";

  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    const font = new FontFace("CustomFont", `url('./custom.ttf')`);

    font.load().then(function () {
      document.fonts.add(font);
      ctx.font = `normal ${fontSize}px CustomFont`;

      while (ctx.measureText(name).width > 420 && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `normal ${fontSize}px CustomFont`;
      }

      const textMetrics = ctx.measureText(name);
      const x = (canvas.width - textMetrics.width) / 2;
      const y = (canvas.height + fontSize * 0.65) / 2;

      ctx.fillStyle = "white";
      ctx.fillText(name, x, y);

      const videoContainer = document.getElementById("videoContainer");
      videoContainer.innerHTML = "";

      const downloadButton = document.createElement("button");
      downloadButton.textContent = "";
      downloadButton.id = "downloadButton";
      downloadButton.addEventListener("click", function () {
        const canvasDataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = canvasDataUrl;
        link.download = "image.png";
        link.click();
      });

      videoContainer.appendChild(canvas);
      videoContainer.appendChild(downloadButton);
    });
  };
}

function generateCola() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value.trim();

  if (text.length > 0 && text.length <= 50) {
    drawTextOnImage(text);
  } else {
    alert("Enter text from 1 to 50 characters.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    document.getElementById("fileInput").addEventListener("change", handleFileSelect);
  } catch {
    console.log("Tools page or idk");
  }
});

let currentImage = null;

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;

    image.onload = function () {
      document.getElementById("videoContainer").innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
      currentImage = image;
    };
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function generateDem() {
  const titleText = document.getElementById("textInput1").value;
  const subtitleText = document.getElementById("textInput2").value;

  if (!currentImage) {
    const defaultImageUrl = "img/public.avif";
    currentImage = new Image();
    currentImage.src = defaultImageUrl;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const frameWidth = 500;
  const frameHeight = 500;
  const imageAreaWidth = frameWidth - 40;
  const imageAreaHeight = frameHeight - 140;

  canvas.width = frameWidth;
  canvas.height = frameHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, frameWidth, frameHeight);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, imageAreaWidth + 8, imageAreaHeight + 8);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, imageAreaWidth, imageAreaHeight);

  ctx.drawImage(currentImage, 24, 24, imageAreaWidth - 8, imageAreaHeight - 8);

  ctx.font = "48px Times New Roman";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  const textY = frameHeight - 32;

  ctx.fillText(titleText, frameWidth / 2, textY - 26);

  ctx.font = "24px Times New Roman";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.fillText(subtitleText, frameWidth / 2, textY + 8);

  document.getElementById("videoContainer").innerHTML = "";

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "";
  downloadButton.id = "downloadButton";
  downloadButton.addEventListener("click", function () {
    try {
      const canvasDataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = canvasDataUrl;
      link.download = "image.png";
      link.click();
    } catch {
      alert("This is an example, you cant download it");
    }
  });

  document.getElementById("videoContainer").appendChild(canvas);
  document.getElementById("videoContainer").appendChild(downloadButton);
}
