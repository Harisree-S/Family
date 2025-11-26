import placeholder from '../assets/placeholder.svg';
import clickAudio from '../assets/audio/click.mp3';

// You can add specific theme music for each member here
// import memberTheme from '../assets/audio/member_theme.mp3';

export const familyMembers = [
  {
    id: 1,
    name: "Grandfather",
    birthday: "1950-01-01",
    photo: placeholder,
    imagePosition: "50% 20%",
    phone: "+1 234 567 8900",
    instagram: "https://instagram.com",
    bio: "The pillar of our family.",
    entryAudio: clickAudio, // Replace with specific theme
    audioVolume: 0.5,
    photos: [
      { url: placeholder, caption: "Family Gathering" },
      { url: placeholder, caption: "Old Memories", position: "0% 30%" }
    ],
    videos: [
      { url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Birthday Celebration", thumbnail: placeholder }
    ]
  },
  {
    id: 2,
    name: "Grandmother",
    birthday: "1955-05-15",
    photo: placeholder,
    imagePosition: "50% 20%",
    phone: "+1 234 567 8901",
    instagram: "https://instagram.com",
    bio: "The heart of our home.",
    entryAudio: clickAudio,
    audioVolume: 0.5,
    photos: [
      { url: placeholder, caption: "Cooking" },
      { url: placeholder, caption: "With Grandkids" }
    ],
    videos: []
  },
  {
    id: 3,
    name: "Father",
    birthday: "1975-08-20",
    photo: placeholder,
    imagePosition: "50% 20%",
    phone: "+1 234 567 8902",
    instagram: "https://instagram.com",
    bio: "Hardworking and loving dad.",
    entryAudio: clickAudio,
    audioVolume: 0.5,
    photos: [
      { url: placeholder, caption: "At Work" },
      { url: placeholder, caption: "Vacation" }
    ],
    videos: []
  },
  {
    id: 4,
    name: "Mother",
    birthday: "1980-03-10",
    photo: placeholder,
    imagePosition: "50% 20%",
    phone: "+1 234 567 8903",
    instagram: "https://instagram.com",
    bio: "The glue that holds us together.",
    entryAudio: clickAudio,
    audioVolume: 0.5,
    photos: [
      { url: placeholder, caption: "Gardening" },
      { url: placeholder, caption: "Family Dinner" }
    ],
    videos: []
  }
];
