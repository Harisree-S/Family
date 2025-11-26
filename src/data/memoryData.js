import PSPhoto1 from '../assets/Wedding1/1.jpeg';
import PSPhoto3 from '../assets/Wedding1/3.jpg';
import PSPhoto4 from '../assets/Wedding1/4.jpeg';
import PSPhoto5 from '../assets/Wedding1/5.jpeg';
import PSPhoto6 from '../assets/Wedding1/6.jpg';
import PSPhoto7 from '../assets/Wedding1/7.jpg';
import PSPhoto8 from '../assets/Wedding1/8.jpg';
import PSPhoto9 from '../assets/Wedding1/9.jpg';
import PSPhoto2 from '../assets/Wedding1/2.jpg';
import ASPhoto1 from '../assets/Wedding2/1.jpeg';
import ASPhoto2 from '../assets/Wedding2/2.jpg';
import ASPhoto3 from '../assets/Wedding2/3.jpg';
import ASPhoto4 from '../assets/Wedding2/4.jpg';
import ASPhoto5 from '../assets/Wedding2/5.jpg';
import ASPhoto6 from '../assets/Wedding2/6.jpg';
import ASPhoto7 from '../assets/Wedding2/7.jpg';
import ASPhoto8 from '../assets/Wedding2/8.jpg';
import ASPhoto9 from '../assets/Wedding2/9.jpeg';
import ASPhoto10 from '../assets/Wedding2/10.jpeg';
import ASPhoto11 from '../assets/Wedding2/11.jpeg';
import ASPhoto12 from '../assets/Wedding2/12.jpeg';
import ASPhoto13 from '../assets/Wedding2/13.jpeg';
import ASPhoto14 from '../assets/Wedding2/14.jpeg';
import ASPhoto15 from '../assets/Wedding2/15.jpeg';
import ASPhoto16 from '../assets/Wedding2/V1.mp4';
import ASPhoto17 from '../assets/Wedding2/V2.mp4';
import ASPhoto18 from '../assets/Wedding2/V3.mp4';
import ASPhoto19 from '../assets/Wedding2/V4.mp4';
import ASPhoto20 from '../assets/Wedding2/V5.mp4';
import ASPhoto21 from '../assets/Wedding2/V6.mp4';
import ASPhoto30 from '../assets/Wedding2/V7.mp4';
import SLPhoto1 from '../assets/SL/1.jpg';
import SLPhoto2 from '../assets/SL/2.jpg';
import SLPhoto3 from '../assets/SL/3.jpg';
import SLPhoto4 from '../assets/SL/4.jpg';
import SLPhoto5 from '../assets/SL/5.mp4';
import SLPhoto6 from '../assets/SL/6.mp4';
import SLPhoto7 from '../assets/SL/7.mp4';
import AS1Photo1 from '../assets/AS/1.jpg';
import AS1Photo2 from '../assets/AS/2.jpg';
import AS1Photo3 from '../assets/AS/3.jpg';
import AS1Photo4 from '../assets/AS/4.jpg';
import AS1Photo5 from '../assets/AS/5.jpg';
import AS1Photo6 from '../assets/AS/6.jpg';
import AS1Photo7 from '../assets/AS/7.jpg';
import AS1Photo8 from '../assets/AS/8.mp4';
import AS1Photo9 from '../assets/AS/9.mp4';

import PS1Photo1 from '../assets/PS/1.jpg';
import PS1Photo2 from '../assets/PS/2.jpg';
import PS1Photo3 from '../assets/PS/3.jpg';
import PS1Photo4 from '../assets/PS/4.jpg';
import PS1Photo5 from '../assets/PS/5.jpg';
import PS1Photo6 from '../assets/PS/6.jpg';
import PS1Photo7 from '../assets/PS/7.jpg';
import PS1Photo8 from '../assets/PS/8.jpg';
import PS1Photo9 from '../assets/PS/9.jpg';
import PS1Photo10 from '../assets/PS/10.jpg';
import PS1Photo11 from '../assets/PS/11.jpg';
import PS1Photo12 from '../assets/PS/12.jpg';
import PS1Photo13 from '../assets/PS/13.jpg';
import PS1Photo14 from '../assets/PS/14.jpg';
import PS1Photo15 from '../assets/PS/15.jpg';
import PS1Photo16 from '../assets/PS/16.jpg';
import PS1Photo17 from '../assets/PS/17.jpg';
import PS1Photo18 from '../assets/PS/18.jpg';
import PS1Photo19 from '../assets/PS/19.jpg';
import PS1Photo20 from '../assets/PS/20.jpg';
import PS1Photo21 from '../assets/PS/21.jpg';
import PS1Photo22 from '../assets/PS/22.mp4';
import PS1Photo23 from '../assets/PS/23.mp4';

import M5 from '../assets/Family/5.jpg';
import M1 from '../assets/Family/1.jpg';
import M2 from '../assets/Family/2.jpg';
import M3 from '../assets/Family/3.jpg';
import M4 from '../assets/Family/4.jpg';
import M6 from '../assets/Family/6.jpg';
import M7 from '../assets/Family/7.jpg';
import M8 from '../assets/Family/8.jpg';
import M9 from '../assets/Family/9.jpg';
import M10 from '../assets/Family/10.jpg';
import M11 from '../assets/Family/11.jpg';
import M12 from '../assets/Family/12.jpg';
import M13 from '../assets/Family/13.jpg';
import M14 from '../assets/Family/14.jpg';
import M15 from '../assets/Family/15.jpg';
import M16 from '../assets/Family/16.jpg';
import M17 from '../assets/Family/17.jpg';
import M18 from '../assets/Family/18.jpg';
import M19 from '../assets/Family/19.jpg';
import M20 from '../assets/Family/20.jpg';
import M21 from '../assets/Family/21.jpg';
import M22 from '../assets/Family/22.jpg';
import M23 from '../assets/Family/23.mp4';
import M24 from '../assets/Family/24.mp4';


import sAudio from '../assets/audio/s.mp3';

import PSwedAudio from '../assets/audio/PS_wed.mp3';
import ASwedAudio from '../assets/audio/AS_wed.mp3';
import SLAudio from '../assets/audio/SL.mp3';
import ASAudio from '../assets/audio/AS.mp3';
import PSAudio from '../assets/audio/PS.mp3';

import candidAudio from '../assets/audio/candid.mp3';

import { audio } from 'framer-motion/client';

export const memories = [
    {
        id: 1,
        title: "Prabhu & Suku Wedding",
        cover: PSPhoto1,
        coverPosition: "50% 5%",
        coverScale: 1.0,
        description: "When our first princess found her prince!",
        entryAudio: PSwedAudio,
        audioVolume: 0.2,
        photos: [
            { url: PSPhoto9, caption: "Impressed?", position: "0% 32%" },
            { url: PSPhoto3, caption: "@ Family meet", position: "0% 25%" },
            { url: PSPhoto6, caption: "Family meet pic again", position: "0% 30%" },
            { url: PSPhoto8, caption: "Lovely", position: "0% 32%" },
            { url: PSPhoto4, caption: "Pre-wedding shoot alaparaigal", position: "0% 32%" },
            { url: PSPhoto5, caption: "Play the song - Perfect by Ed-Sheeran", position: "0% 32%" },
            { url: PSPhoto2, caption: "Engagement vibes", position: "0% 30%" },
            { url: PSPhoto7, caption: "Happily Married!", position: "0% 46%" },
        ],
        videos: []
    },
    {
        id: 2,
        title: "Arjun & Sneha Wedding",
        cover: ASPhoto1,
        coverPosition: "50% 24%",
        coverScale: 1.0,
        description: "Writing the next beautiful chapter of our family story",
        entryAudio: ASwedAudio,
        audioVolume: 0.11,
        photos: [
            { url: ASPhoto2, caption: "Bride to Be!", position: "0% 46%" },
            { url: ASPhoto6, caption: "Gorgeous", position: "0% 22%" },
            { url: ASPhoto3, caption: "Happiness", position: "0% 32%" },
            { url: ASPhoto4, caption: "Ammamma Love", position: "0% 30%" },
            { url: ASPhoto5, caption: "The Moment", position: "0% 32%" },
            { url: ASPhoto9, caption: "Happily Married!", position: "0% 32%" },
            //{ url: ASPhoto7, caption: "Eppadi?", position: "0% 32%" },
            { url: ASPhoto8, caption: "Frame parunga Ji", position: "0% 25%" },
            { url: ASPhoto10, caption: ":)", position: "0% 46%" },
            { url: ASPhoto11, caption: "Chetta oru pravishyam koodi", position: "0% 50%" },
            { url: ASPhoto12, caption: "Ee pose kollavo", position: "0% 17%" },
            { url: ASPhoto13, caption: "Vere pose und, ith enganund", position: "0% 32%" },
            { url: ASPhoto14, caption: "Hug", position: "0% 32%" },
            { url: ASPhoto15, caption: "Amma Love", position: "0% 32%" },
        ],
        videos: [
            { url: ASPhoto17, caption: "Bride" },
            { url: ASPhoto19, caption: "Pre-Wedding" },
            { url: ASPhoto16, caption: "Pre-Wedding edit" },
            { url: ASPhoto20, caption: "Makeover" },
            { url: ASPhoto18, caption: "Wedding Story" },
            { url: ASPhoto30, caption: "Alfa Horizon" },
            { url: ASPhoto21, caption: "Husky Trend" }
        ]
    },
    {
        id: 3,
        title: "Appa & Amma",
        cover: SLPhoto1,
        coverPosition: "50% 35%",
        coverScale: 1.0,
        description: "35 years of Love and Happiness",
        entryAudio: SLAudio,
        audioVolume: 0.3,
        photos: [
            { url: SLPhoto2, caption: "Since 1990", position: "0% 6%" },
            { url: SLPhoto3, caption: ":)", position: "0% 12%" },
            { url: SLPhoto4, caption: "Love", position: "0% 30%" },
        ],
        videos: [
            { url: SLPhoto5, caption: "Fun" },
            { url: SLPhoto6, caption: "Laughter" },
            { url: SLPhoto7, caption: "Anniversary edit" },
        ]
    },
    {
        id: 4,
        title: "Arjun & Sneha",
        cover: AS1Photo1,
        coverPosition: "50% 2%",
        coverScale: 1.0,
        description: "Side by Side, Hand in Hand, Heart to Heart",
        entryAudio: ASAudio,
        audioVolume: 0.12,
        photos: [
            { url: AS1Photo2, caption: "Since 2025", position: "0% 0%" },
            { url: AS1Photo3, caption: "Chiri", position: "0% 0%" },
            { url: AS1Photo4, caption: "Cubbon Park", position: "0% 40%" },
            { url: AS1Photo5, caption: "Yellove!", position: "0% 54%" },
            { url: AS1Photo6, caption: "eeeee", position: "0% 0%" },
            { url: AS1Photo7, caption: "Selfie", position: "0% 0%" },
        ],
        videos: [
            { url: AS1Photo9, caption: "Pandhalam" },
            { url: AS1Photo8, caption: "Editor Aju" }
        ]
    },
    {
        id: 5,
        title: "Prabhu & Suku",
        cover: PS1Photo15,
        coverPosition: "50% 31.5%",
        coverScale: 1.0,
        description: "The Happy Couple",
        entryAudio: PSAudio,
        audioVolume: 0.19,
        photos: [
            { url: PS1Photo2, caption: "Happiness!", position: "0% 20%" },
            { url: PS1Photo3, caption: ":)", position: "0% 20%" },
            { url: PS1Photo4, caption: "Smile!", position: "0% 30%" },
            { url: PS1Photo5, caption: ".....", position: "0% 50%" },
            { url: PS1Photo6, caption: "ilikal", position: "0% 30%" },
            { url: PS1Photo7, caption: "Aesthetics", position: "0% 10%" },
            { url: PS1Photo8, caption: "Idak idak ee pose idum", position: "0% 10%" },
            { url: PS1Photo9, caption: "Oonjal", position: "0% 60%" },
            { url: PS1Photo10, caption: "Variety alle", position: "0% 15%" },
            { url: PS1Photo11, caption: "Bhakthi", position: "0% 46%" },
            { url: PS1Photo12, caption: "@ a function", position: "0% 50%" },
            { url: PS1Photo13, caption: "Onam & Payasam", position: "0% 30%" },
            { url: PS1Photo14, caption: "Thrissur", position: "0% 40%" },
            //{ url: PS1Photo15, caption: "Bangalore", position: "0% 30%" },
            //{ url: PS1Photo16, caption: ":)", position: "0% 8%" },
            { url: PS1Photo17, caption: "Shades", position: "0% 40%" },
            { url: PS1Photo18, caption: "Padmanabhante Mannil", position: "0% 30%" },
            { url: PS1Photo19, caption: "Wrapped in Love", position: "0% 20%" },
            { url: PS1Photo21, caption: "Forum Mall", position: "0% 10%" },
        ],
        videos: [
            { url: PS1Photo23, caption: "Minnalvala" },
            { url: PS1Photo22, caption: "Engagement vibes!" },
        ]
    },
    {
        id: 6,
        title: "Moments",
        cover: M7,
        coverPosition: "50% 50%",
        coverScale: 1.0,
        description: "Time flies, memories stay",
        entryAudio: candidAudio,
        audioVolume: 0.25,
        photos: [
            { url: M2, caption: "Years back", position: "0% 10%" },
            { url: M3, caption: "Tripunithura", position: "0% 0%" },
            { url: M4, caption: "Meeting", position: "0% 30%" },
            { url: M6, caption: "Aussie & others", position: "0% 40%" },
            { url: M8, caption: "Appa Selfie", position: "0% 50%" },
            { url: M9, caption: "eee", position: "0% 40%" },
            { url: M10, caption: "Aussie again", position: "0% 30%" },
            { url: M12, caption: "Ammayum Molum", position: "0% 30%" },
            { url: M13, caption: "Akka Wedding!", position: "0% 30%" },
            { url: M14, caption: "Kollalo", position: "0% 10%" },
            { url: M15, caption: "Shunnani Veettilekk ", position: "0% 10%" },
            { url: M16, caption: "Sooryane ang kittanillallo", position: "0% 30%" },
            //{ url: M7, caption: "Forum Mall", position: "0% 60%" },
            { url: M18, caption: "Onam", position: "0% 55%" },
            { url: M19, caption: "Rameshwaram Cafe", position: "0% 20%" },
            { url: M20, caption: "Lovely", position: "0% 10%" },
            { url: M21, caption: "Mookambika", position: "0% 30%" },
            { url: M22, caption: "Banglore vibes", position: "0% 50%" },
        ],
        videos: [
            { url: M23, caption: "zzz" },
            { url: M24, caption: "Fun" },
        ]
    }
];
