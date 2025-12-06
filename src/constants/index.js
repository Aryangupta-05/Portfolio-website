export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Projects',
        href: '#projects',
    },
    {
        id: 4,
        name: 'Experience',
        href: '#experience',
    },
    {
        id: 6,
        name: 'Testimonials',
        href: '#testimonials',
    },
    {
        id: 7,
        name: 'Contact',
        href: '#contact',
    },
];

export const clientReviews = [
    {
        id: 1,
        name: 'Monisha Kant',
        position: 'Associate Software Engineer at Qualcomm',
        img: 'assets/review1.png',
        review:
'He\'s a hardworking individual with a strong passion for technology and extensive experience in building web applications. His enthusiasm for problem-solving and competitive programming highlights his ability to tackle challenges with creativity and precision. I\'m confident in his potential to excel in any endeavor he pursues.'
    },
    {
        id: 2,
        name: 'Anish Kumar',
        position: 'Upcoming SDE @ Oracle',
        img: 'assets/review2.png',
        review:
    'I worked with Aryan on a project, and he proved to be a great team player. His problem-solving skills, honed through programming challenges, were key in tackling complex challenges. He\'s dedicated, collaborative, and consistently delivers high-quality work.'
    }
];

export const myProjects = [
    {
        title: 'Tweetie - Social Media Platform',
        desc: 'A full-stack social media platform with secure JWT authentication and real-time interaction features.',
        subdesc: 'Built with React, MongoDB, Express.js, Node.js, JWT, Cloudinary, and React Query. Integrated real-time notifications, post management, likes, comments, and a follow system. Achieved 99% uptime during testing and supported 100+ concurrent users.',
        href: 'https://github.com/Aryangupta-05/Tweetie', 
        texture: '/textures/project/project2.mp4',
        logo: '/assets/tweetie.png', 
        logoStyle: {
            backgroundColor: '#1C1C1C',
            border: '0.2px solid #333333',
            boxShadow: '0px 0px 60px 0px #5555554D',
        },
        spotlight: '/assets/spotlight-tweetie.png', 
        tags: [
            { id: 1, name: 'React.js', path: '/assets/react.svg' },
            { id: 2, name: 'MongoDB', path: '/assets/mongodb.svg' },
            { id: 3, name: 'Express.js', path: '/assets/express.png' },
            { id: 4, name: 'Node.js', path: '/assets/nodejs.png' },
            { id: 5, name: 'JWT', path: '/assets/jwt-icon.png' },
            { id: 6, name: 'Cloudinary', path: '/assets/cloudinary-icon.png' },
            { id: 7, name: 'React Query', path: '/assets/react-query-icon.jpeg' },
        ],
    },
    {
        title: 'ROAM-AN – Property Listing Website',
        desc: 'A full-stack platform for property listing management with authentication and map integration.',
        subdesc: 'Built using HTML, CSS, React.js, Express.js, MongoDB, Passport.js, Mapbox, Cloudinary, and EJS. Supports CRUD operations on listings, users, and reviews. Implements authentication to allow only logged-in users to post listings/reviews, and authorization for editing/deleting. Integrated Mapbox for location features and Cloudinary for file uploads.',
        href: 'https://github.com/Aryangupta-05/Listing-wesbite', 
        texture: '/textures/project/project3.mp4', 
        logo: '/assets/project-logo-roaman.png', 
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight-roaman.png', 
        tags: [
            { id: 1, name: 'HTML', path: '/assets/html-icon.svg' },
            { id: 2, name: 'CSS', path: '/assets/css-icon.svg' },
            { id: 3, name: 'React.js', path: '/assets/react.svg' },
            { id: 4, name: 'Express.js', path: '/assets/express.png' },
            { id: 5, name: 'MongoDB', path: '/assets/mongodb.svg' },
            { id: 6, name: 'Passport.js', path: '/assets/passportjs-icon.png' },
            { id: 7, name: 'Mapbox', path: '/assets/mapbox-icon.png' },
            { id: 8, name: 'Cloudinary', path: '/assets/cloudinary-icon.png' },
        ],
    },
];


export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'WorkerHub',
        pos: 'Web Developer and Graphic Designer',
        duration: 'July 2024 - August 2024',
        title: "Contributed to designing and developing responsive web portals and marketing assets, ensuring brand consistency and improved user engagement. Built responsive landing pages, increasing visitor engagement by 20%. Created brand-aligned UI graphics and interactive prototypes in Figma. Integrated REST APIs and optimized performance for SEO readiness. Designed marketing assets in Photoshop and Illustrator.",
        icon: '/assets/workerhub.png',
        animation: 'clapping',
    },
];
