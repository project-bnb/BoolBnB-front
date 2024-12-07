import { reactive } from "vue";

export const store = reactive({
    searchInput: "",
    suggestions: [],
    filteredSuggestions: [],
    SearchFocus : false,
    unreadMessages: 0,
    filters: {
        minRooms: 1,           
        minBeds: 1,          
        radius: 20,      
        selectedServices: [],
        filteredApartments: [],
    },
});
