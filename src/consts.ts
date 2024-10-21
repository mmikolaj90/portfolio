import ArtStation from "./components/ui/icons/ArtStation.svg?raw";
import LinkedIn from "./components/ui/icons/LinkedIn.svg?raw";
import aboutImage from "./assets/about/about.jpg";
import ogImage from "./assets/og/ogimage.jpg";

export default {
  site: {
    url: "https://madejskimedia.com",
    owner: "Mikołaj Madejski",
    contact: {
      phone: "+48 536 523 165",
      mail: "mikolaj.madejskii@gmail.com",
    },
    title: "Madejski Media",
    // This is site description visible when searching for page SEO
    description:
      "I’m Mikołaj Madejski. Passionate creator of media. I do designs.",
    ogImage: ogImage
  },
  pages: {
    front: {
      description:
        "I’m Mikołaj Madejski. Passionate creator of media. I do designs.",
    },
    about: {
      description:
        "I’m Mikołaj Madejski. Passionate creator of media. I do designs.",
      header: {
        image: aboutImage,
        display: "Hi!",
        title: "WHO AM I?",
        text: "I’m Mikołaj Madejski. Passionate creator of media. I do designs.",
      },
    },
  },
};

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/miko%C5%82aj-madejski",
    alt: "Find Me on LinkedIn",
    icon: LinkedIn,
  },
  {
    name: "ArtStation",
    link: "https://www.artstation.com/mikolaj",
    alt: "Find Me on ArtStation",
    icon: ArtStation,
  },
];
