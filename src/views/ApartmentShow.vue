<script>
import axios from 'axios';
import ContactForm from '../components/ContactForm.vue';

export default {
  data() {
    return {
      apartment: {},
      selectedImage: 0,
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      selectedCountry: '',
      phonePrefix: '',
      phone: '',
      countries: [
        { name: 'Afghanistan', prefix: '+93' },
        { name: 'Albania', prefix: '+355' },
        { name: 'Algeria', prefix: '+213' },
        { name: 'Andorra', prefix: '+376' },
        { name: 'Angola', prefix: '+244' },
        { name: 'Antigua and Barbuda', prefix: '+1-268' },
        { name: 'Argentina', prefix: '+54' },
        { name: 'Armenia', prefix: '+374' },
        { name: 'Australia', prefix: '+61' },
        { name: 'Austria', prefix: '+43' },
        { name: 'Azerbaijan', prefix: '+994' },
        { name: 'Bahamas', prefix: '+1-242' },
        { name: 'Bahrain', prefix: '+973' },
        { name: 'Bangladesh', prefix: '+880' },
        { name: 'Barbados', prefix: '+1-246' },
        { name: 'Belarus', prefix: '+375' },
        { name: 'Belgium', prefix: '+32' },
        { name: 'Belize', prefix: '+501' },
        { name: 'Benin', prefix: '+229' },
        { name: 'Bhutan', prefix: '+975' },
        { name: 'Bolivia', prefix: '+591' },
        { name: 'Bosnia and Herzegovina', prefix: '+387' },
        { name: 'Botswana', prefix: '+267' },
        { name: 'Brazil', prefix: '+55' },
        { name: 'Brunei', prefix: '+673' },
        { name: 'Bulgaria', prefix: '+359' },
        { name: 'Burkina Faso', prefix: '+226' },
        { name: 'Burundi', prefix: '+257' },
        { name: 'Cabo Verde', prefix: '+238' },
        { name: 'Cambodia', prefix: '+855' },
        { name: 'Cameroon', prefix: '+237' },
        { name: 'Canada', prefix: '+1' },
        { name: 'Central African Republic', prefix: '+236' },
        { name: 'Chad', prefix: '+235' },
        { name: 'Chile', prefix: '+56' },
        { name: 'China', prefix: '+86' },
        { name: 'Colombia', prefix: '+57' },
        { name: 'Comoros', prefix: '+269' },
        { name: 'Congo (Congo-Brazzaville)', prefix: '+242' },
        { name: 'Costa Rica', prefix: '+506' },
        { name: 'Croatia', prefix: '+385' },
        { name: 'Cuba', prefix: '+53' },
        { name: 'Cyprus', prefix: '+357' },
        { name: 'Czech Republic', prefix: '+420' },
        { name: 'Denmark', prefix: '+45' },
        { name: 'Djibouti', prefix: '+253' },
        { name: 'Dominica', prefix: '+1-767' },
        { name: 'Dominican Republic', prefix: '+1-809' },
        { name: 'Ecuador', prefix: '+593' },
        { name: 'Egypt', prefix: '+20' },
        { name: 'El Salvador', prefix: '+503' },
        { name: 'Equatorial Guinea', prefix: '+240' },
        { name: 'Eritrea', prefix: '+291' },
        { name: 'Estonia', prefix: '+372' },
        { name: 'Eswatini (fmr. "Swaziland")', prefix: '+268' },
        { name: 'Ethiopia', prefix: '+251' },
        { name: 'Fiji', prefix: '+679' },
        { name: 'Finland', prefix: '+358' },
        { name: 'France', prefix: '+33' },
        { name: 'Gabon', prefix: '+241' },
        { name: 'Gambia', prefix: '+220' },
        { name: 'Georgia', prefix: '+995' },
        { name: 'Germany', prefix: '+49' },
        { name: 'Ghana', prefix: '+233' },
        { name: 'Greece', prefix: '+30' },
        { name: 'Grenada', prefix: '+1-473' },
        { name: 'Guatemala', prefix: '+502' },
        { name: 'Guinea', prefix: '+224' },
        { name: 'Guinea-Bissau', prefix: '+245' },
        { name: 'Guyana', prefix: '+592' },
        { name: 'Haiti', prefix: '+509' },
        { name: 'Honduras', prefix: '+504' },
        { name: 'Hungary', prefix: '+36' },
        { name: 'Iceland', prefix: '+354' },
        { name: 'India', prefix: '+91' },
        { name: 'Indonesia', prefix: '+62' },
        { name: 'Iran', prefix: '+98' },
        { name: 'Iraq', prefix: '+964' },
        { name: 'Ireland', prefix: '+353' },
        { name: 'Israel', prefix: '+972' },
        { name: 'Italy', prefix: '+39' },
        { name: 'Jamaica', prefix: '+1-876' },
        { name: 'Japan', prefix: '+81' },
        { name: 'Jordan', prefix: '+962' },
        { name: 'Kazakhstan', prefix: '+7' },
        { name: 'Kenya', prefix: '+254' },
        { name: 'Kiribati', prefix: '+686' },
        { name: 'Korea (North)', prefix: '+850' },
        { name: 'Korea (South)', prefix: '+82' },
        { name: 'Kosovo', prefix: '+383' },
        { name: 'Kuwait', prefix: '+965' },
        { name: 'Kyrgyzstan', prefix: '+996' },
        { name: 'Laos', prefix: '+856' },
        { name: 'Latvia', prefix: '+371' },
        { name: 'Lebanon', prefix: '+961' },
        { name: 'Lesotho', prefix: '+266' },
        { name: 'Liberia', prefix: '+231' },
        { name: 'Libya', prefix: '+218' },
        { name: 'Liechtenstein', prefix: '+423' },
        { name: 'Lithuania', prefix: '+370' },
        { name: 'Luxembourg', prefix: '+352' },
        { name: 'Madagascar', prefix: '+261' },
        { name: 'Malawi', prefix: '+265' },
        { name: 'Malaysia', prefix: '+60' },
        { name: 'Maldives', prefix: '+960' },
        { name: 'Mali', prefix: '+223' },
        { name: 'Malta', prefix: '+356' },
        { name: 'Marshall Islands', prefix: '+692' },
        { name: 'Mauritania', prefix: '+222' },
        { name: 'Mauritius', prefix: '+230' },
        { name: 'Mexico', prefix: '+52' },
        { name: 'Micronesia', prefix: '+691' },
        { name: 'Moldova', prefix: '+373' },
        { name: 'Monaco', prefix: '+377' },
        { name: 'Mongolia', prefix: '+976' },
        { name: 'Montenegro', prefix: '+382' },
        { name: 'Morocco', prefix: '+212' },
        { name: 'Mozambique', prefix: '+258' },
        { name: 'Myanmar (formerly Burma)', prefix: '+95' },
        { name: 'Namibia', prefix: '+264' },
        { name: 'Nauru', prefix: '+674' },
        { name: 'Nepal', prefix: '+977' },
        { name: 'Netherlands', prefix: '+31' },
        { name: 'New Zealand', prefix: '+64' },
        { name: 'Nicaragua', prefix: '+505' },
        { name: 'Niger', prefix: '+227' },
        { name: 'Nigeria', prefix: '+234' },
        { name: 'North Macedonia (formerly Macedonia)', prefix: '+389' },
        { name: 'Norway', prefix: '+47' },
        { name: 'Oman', prefix: '+968' },
        { name: 'Pakistan', prefix: '+92' },
        { name: 'Palau', prefix: '+680' },
        { name: 'Palestine State', prefix: '+970' },
        { name: 'Panama', prefix: '+507' },
        { name: 'Papua New Guinea', prefix: '+675' },
        { name: 'Paraguay', prefix: '+595' },
        { name: 'Peru', prefix: '+51' },
        { name: 'Philippines', prefix: '+63' },
        { name: 'Poland', prefix: '+48' },
        { name: 'Portugal', prefix: '+351' },
        { name: 'Qatar', prefix: '+974' },
        { name: 'Romania', prefix: '+40' },
        { name: 'Russia', prefix: '+7' },
        { name: 'Rwanda', prefix: '+250' },
        { name: 'Saint Kitts and Nevis', prefix: '+1-869' },
        { name: 'Saint Lucia', prefix: '+1-758' },
        { name: 'Saint Vincent and the Grenadines', prefix: '+1-784' },
        { name: 'Samoa', prefix: '+685' },
        { name: 'San Marino', prefix: '+378' },
        { name: 'Sao Tome and Principe', prefix: '+239' },
        { name: 'Saudi Arabia', prefix: '+966' },
        { name: 'Senegal', prefix: '+221' },
        { name: 'Serbia', prefix: '+381' },
        { name: 'Seychelles', prefix: '+248' },
        { name: 'Sierra Leone', prefix: '+232' },
        { name: 'Singapore', prefix: '+65' },
        { name: 'Slovakia', prefix: '+421' },
        { name: 'Slovenia', prefix: '+386' },
        { name: 'Solomon Islands', prefix: '+677' },
        { name: 'Somalia', prefix: '+252' },
        { name: 'South Africa', prefix: '+27' },
        { name: 'South Sudan', prefix: '+211' },
        { name: 'Spain', prefix: '+34' },
        { name: 'Sri Lanka', prefix: '+94' },
        { name: 'Sudan', prefix: '+249' },
        { name: 'Suriname', prefix: '+597' },
        { name: 'Sweden', prefix: '+46' },
        { name: 'Switzerland', prefix: '+41' },
        { name: 'Syria', prefix: '+963' },
        { name: 'Tajikistan', prefix: '+992' },
        { name: 'Tanzania', prefix: '+255' },
        { name: 'Thailand', prefix: '+66' },
        { name: 'Timor-Leste', prefix: '+670' },
        { name: 'Togo', prefix: '+228' },
        { name: 'Tonga', prefix: '+676' },
        { name: 'Trinidad and Tobago', prefix: '+1-868' },
        { name: 'Tunisia', prefix: '+216' },
        { name: 'Turkey', prefix: '+90' },
        { name: 'Turkmenistan', prefix: '+993' },
        { name: 'Tuvalu', prefix: '+688' },
        { name: 'Uganda', prefix: '+256' },
        { name: 'Ukraine', prefix: '+380' },
        { name: 'United Arab Emirates', prefix: '+971' },
        { name: 'United Kingdom', prefix: '+44' },
        { name: 'United States', prefix: '+1' },
        { name: 'Uruguay', prefix: '+598' },
        { name: 'Uzbekistan', prefix: '+998' },
        { name: 'Vanuatu', prefix: '+678' },
        { name: 'Vatican City', prefix: '+379' },
        { name: 'Venezuela', prefix: '+58' },
        { name: 'Vietnam', prefix: '+84' },
        { name: 'Yemen', prefix: '+967' },
        { name: 'Zambia', prefix: '+260' },
        { name: 'Zimbabwe', prefix: '+263' }
      ],
    };
  },
  components: {
    ContactForm
  },
  mounted() {
    this.getApartment();

    const apartmentId = this.$route.params.id;
    this.incrementViews(apartmentId);

    // Inizializzazione di Braintree
    this.initializeBraintree();
  },
  methods: {

    async incrementViews(apartmentId) {
      await axios
        .post(`http://192.168.1.101:9000/api/apartments/${apartmentId}/views`)
        .then((response) => {
          console.log('Visualizzazioni incrementate con successo', response.data.message);
        })
        .catch((error) => {
          console.error('Errore nell\'incremento delle visualizzazioni:', error.response.data.message);
        });
    },

    initMap() {
      const tt = window.tt;
      const latitude = parseFloat(this.apartment.latitude);
      const longitude = parseFloat(this.apartment.longitude);

      const map = tt.map({
        key: 'SooRbYbji9V5qUxAh3i2ijnD8m9ZWVZ7',
        container: 'map',
        center: [longitude, latitude], 
        zoom: 14
      });

      new tt.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    },
    getApartment() {
      const apartmentId = this.$route.params.id;
      axios
        .get(`http://192.168.1.101:9000/api/apartments/${apartmentId}`)
        .then((res) => {
          this.apartment = res.data.data;
          console.log('Appartamento:', this.apartment);
          this.initMap();
          if (this.apartment.images && this.apartment.images.length > 0) {
            this.selectedImage = this.apartment.images[0];
          }
        })
        .catch((err) => {
          console.error('Errore:', err);
          this.$router.push({ name: 'not-found' });
        });
    },
    enlargeImage(image) {
      this.selectedImage = image;
    },
    initializeBraintree() {
      // Logica per inizializzare Braintree
      // 1. Ottenere un client token dal server
      // 2. Inizializzare il drop-in UI di Braintree con il client token
      // 3. Gestire l'evento di submit del form per inviare il nonce al server insieme al costo e ai dettagli dell'utente
    },
    updatePhonePrefix() {
      const country = this.countries.find(c => c.name === this.selectedCountry);
      if (country) {
        this.phonePrefix = country.prefix;
      }
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-8 bg-white mb-28 shadow-lg rounded-lg relative sm:grid-cols-1 mt-28 grid sm:gap-5 grid-cols-2 gap-10">
    <!-- Immagini con possibilità di selezione -->
    <div class="flex flex-col space-y-4 sm:contents">
      <div class="w-full sm:mb-0 sm:col-span-2 h-80 mb-4">
        <!-- Immagine Selezionata Grande -->
        <img :src="selectedImage ? selectedImage.image_path : (apartment.images && apartment.images.length > 0 ? apartment.images[0].image_path : '')" 
             alt="Selected Apartment Image" 
             class="w-full h-full object-cover rounded-lg shadow-md">
      </div>
      <div class="flex flex-cols-4 gap-4 flex-wrap justify-center sm:col-span-2">
        <!-- Thumbnail delle Immagini -->
        <img v-for="(image, index) in apartment.images" 
             :key="index" 
             :src="image.image_path" 
             alt="Apartment Image Thumbnail" 
             class="w-[130px] h-20 object-cover rounded-lg cursor-pointer border-2"
             :class="{ 'border-[#BBA796] shadow-pre': selectedImage && selectedImage.image_path === image.image_path, 'border-transparent': !selectedImage || selectedImage.image_path !== image.image_path }"
             @click="enlargeImage(image)" />
      </div>
    </div>
    
    <!-- Dettagli dell'Appartamento -->
    <div class="flex flex-col space-y-6">
      <h1 class="text-3xl font-extrabold text-gray-800">{{ apartment.title }}</h1>
      <p class="text-lg text-gray-600">{{ apartment.description }}</p>
      
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Dettagli</h2>
        <ul class="space-y-2">
          <li class="text-gray-700"><strong>Stanze:</strong> {{ apartment.rooms }}</li>
          <li class="text-gray-700"><strong>Letti:</strong> {{ apartment.beds }}</li>
          <li class="text-gray-700"><strong>Bagni:</strong> {{ apartment.bathrooms }}</li>
          <li class="text-gray-700"><strong>Indirizzo:</strong> {{ apartment.address }}</li>
          <li class="text-gray-700"><strong>Metri Quadri:</strong> {{ apartment.square_meters }} m²</li>
        </ul>
      </div>

      <!-- Servizi dell'appartamento -->
      <div v-if="apartment.services && apartment.services.length > 0">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Servizi Disponibili</h2>
        <ul class="list-disc pl-5 space-y-1 text-gray-700">
          <li v-for="(service, index) in apartment.services" :key="index">
            {{ service.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- mappa e form di contatto a tutta larghezza -->
    <div class="col-span-1 col-span-2 space-y-6">
      <!-- mappa -->
      <div id="map" class="w-full h-96 rounded-lg shadow-md"></div>

      <!-- Form di contatto -->
      <ContactForm :apartment-id="parseInt(this.$route.params.id)" class="mt-8 w-full" />
    </div>
    <!-- Bottone per tornare alla lista degli appartamenti -->
    <router-link to="/apartments" class="col-span-2 text-center inline-block bg-[#BFAFA2] text-[#EDEEF0] px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#BDAFA2] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      Torna alla lista degli appartamenti
    </router-link>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px; 
  border-radius: 12px;
  margin-top: 20px;
}

.shadow-pre{
  box-shadow: 0 0 3px #B49578;
}

.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.mr-2 {
  margin-right: 0.5rem;
}
.flex-1 {
  flex: 1;
}
</style>
