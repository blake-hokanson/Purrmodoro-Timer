videos = [
  "https://www.youtube.com/embed/EG__qoGbVqM",
  "https://www.youtube.com/embed/QH2-TGUlwu4",
];

document.getElementById("video").src =
  videos[Math.floor(Math.random() * videos.length)];
