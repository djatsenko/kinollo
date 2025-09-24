// client/src/assets/assets.js
import logo from './logo.svg';
import marvellogo from './marvellogo.svg';   // <-- имя файла и регистра ровно такое же!
import googlePlay from './googlePlay.svg';
import appStore from './appStore.svg';
import screenImage from './screenImage.svg';
import profile from './profile.png';

export const assets = {
  logo,
  marvellogo,   // используем именно это имя
  googlePlay,
  appStore,
  screenImage,
  profile,
};

export const dummyTrailers = [
  {
    image: "https://img.youtube.com/vi/U2jTsGVkmP8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=U2jTsGVkmP8",
  },
  {
    image: "https://img.youtube.com/vi/OUXnmJOD7Zo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=OUXnmJOD7Zo",
  },
  {
    image: "https://img.youtube.com/vi/x7uLutVRBfI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=x7uLutVRBfI",
  },
  {
    image: "https://img.youtube.com/vi/y6Qu7xXDqGs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=y6Qu7xXDqGs",
  },
];
