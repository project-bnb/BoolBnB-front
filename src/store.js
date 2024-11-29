import { reactive } from "vue";

export const store = reactive({
    searchInput: "",
    suggestions: [],
    filteredSuggestions: [],
    SearchFocus : false,

    jumbos : [
        {
            position:'absolute inset-0 flex flex-col items-center justify-center text-white text-center ',
            button:'router-link-active router-link-exact-active bg-teal-600 text-white font-bold py-4 px-8 rounded mt-4 animate__animated animate__fadeInUpBig animate__delay-5s',
            date:'text-lg font-bold mb-10 animate__animated animate__zoomIn animate__delay-4s',
            social:'text-6xl text-teal-600 font-extrabold mb-10 animate__animated animate__zoomIn animate__delay-2s',
            meet:'text-4xl mb-10 animate__animated animate__fadeInDown animate__delay-1s',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQmkT76WPNenQVynbIVJ3ruZw9wAyT677I0A&s',
            alt: 'Image 1',
            title: 'PRENOTA SU',
            subtitle: 'BOOLBNB',
            details: 'ESCLUSIVO / CONVENIENTE / INDIMENTICABILE',
            buttonText: 'REGISTRATI ONLINE',
            buttonLink: '/register',
            hr:'1',
        },
        {
            position:'absolute inset-0 flex flex-col items-center justify-center text-white text-center ml-96',
            button:'router-link-active router-link-exact-active bg-teal-600 text-white font-bold py-3 px-6 rounded mt-4 animate__animated animate__fadeInUp animate__delay-4s',
            date:'mt-4 text-lg animate__animated animate__fadeIn animate__delay-3s',
            social:'text-6xl font-bold animate__animated animate__fadeIn animate__delay-2s',
            meet:'text-8xl font-extrabold text-teal-600 mb-4 animate__animated animate__flip animate__delay-1s',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtGtjx1KW-dZmtSyZP2bOPl0PVxtDdLAMUGg&s',
            alt: 'Image 2',
            title: 'SOGGIORNA',
            subtitle: 'IN TUTTO IL MONDO',
            details: 'Nel confort più assoluto',
            buttonText: 'ACCEDI',
            buttonLink: '/login',
        },
        {
            position:'absolute inset-0 flex flex-col items-center justify-center text-white text-center ',
            meet:'text-6xl font-bold animate__animated animate__fadeIn animate__delay-2s',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuPpZ23FRAGIsXZ_i-o7kxW8XTnzU7Cu7wg&s',
            alt: 'Image 3',
            title: 'SUPPORTACI NELLA BATTAGLIA CONTRO VOLDEMORT',
            subtitle: '',
            details: '',
            buttonText: '',
            buttonLink: '',
        },
    ],
    filters: {
        minRooms: 1,           
        minBeds: 1,          
        radius: 20,      
        selectedServices: [],
    },

    jumboStaticImg: {
        img: 'src/assets/image/Jumbo.jpg',
    },
});
