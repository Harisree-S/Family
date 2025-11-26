import placeholder from '../assets/placeholder.svg';

export const memories = [
    {
        id: 1,
        title: "Family Vacation 2023",
        date: "2023-12-25",
        cover: placeholder,
        coverPosition: "50% 50%",
        description: "Our amazing trip to the mountains.",
        photos: [
            { url: placeholder, caption: "Mountain View" },
            { url: placeholder, caption: "Group Photo" },
            { url: placeholder, caption: "Campfire" }
        ],
        videos: [
            { url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Hiking", thumbnail: placeholder }
        ]
    },
    {
        id: 2,
        title: "Diwali Celebration",
        date: "2023-11-12",
        cover: placeholder,
        coverPosition: "50% 50%",
        description: "Lights, sweets, and family time.",
        photos: [
            { url: placeholder, caption: "Rangoli" },
            { url: placeholder, caption: "Fireworks" }
        ],
        videos: []
    }
];
