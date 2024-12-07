import { reactive } from "vue";
import axios from "axios";
export const store = reactive({
    searchInput: "",
    suggestions: [],
    filteredSuggestions: [],
    SearchFocus : false,

    unreadMessages: 0,
    notifications: [],
    filters: {
        minRooms: 1,           
        minBeds: 1,          
        radius: 20,      
        selectedServices: [],
        filteredApartments: [],
    },
    functions: {
        getNotifications: () => {
            axios.get('http://127.0.0.1:8000/api/notifications', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                store.notifications = response.data;
                store.unreadMessages = response.data.length;
            })
            .catch(error => console.error('Errore:', error));
        }
    }
});