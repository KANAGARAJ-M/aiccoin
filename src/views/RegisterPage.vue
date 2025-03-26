<template>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="validateAndRegister" class="register-form">
      <div v-if="errors.length" class="error-container">
        <div v-for="error in errors" :key="error" class="error-message">
          {{ error }}
        </div>
      </div>
      <div class="input-group">
        <input v-model="name" type="text" placeholder="Your Name" required class="input-field" />
      </div>

      <div class="input-group">
        <input v-model="email" type="email" placeholder="Your Email" required class="input-field" />
      </div>

      <div class="input-group">
        <input v-model="password" type="password" placeholder="Password" required class="input-field" />
      </div>

      <div class="input-group">
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required class="input-field" />
      </div>

      <div class="input-group">
        <select v-model="country" required class="input-field">
          <option value="" disabled>Select Your Country</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Brazil">Brazil</option>
          <option value="Brunei">Brunei</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cabo Verde">Cabo Verde</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Central African Republic">Central African Republic</option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo (Congo-Brazzaville)">Congo</option>
          <option value="Congo (Democratic Republic)">Congo (Democratic Republic)</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic (Czechia)">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Eswatini">Eswatini</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Greece">Greece</option>
          <option value="Grenada">Grenada</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-Bissau">Guinea-Bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Honduras">Honduras</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran">Iran</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea (North)">Korea (North)</option>
          <option value="Korea (South)">Korea (South)</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Laos">Laos</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libya">Libya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia">Micronesia</option>
          <option value="Moldova">Moldova</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montenegro">Montenegro</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar (Burma)">Myanmar (Burma)</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="North Macedonia">North Macedonia</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Qatar">Qatar</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russia</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
          <option value="Saint Lucia">Saint Lucia</option>
          <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Serbia">Serbia</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="South Sudan">South Sudan</option>
          <option value="Spain">Spain 🇪ṡ</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syria">Syria</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Thailand">Thailand</option>
          <option value="Timor-Leste">Timor-Leste</option>
          <option value="Togo">Togo</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States of America">United States</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Vatican City">Vatican City</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Yemen">Yemen</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </select>
      </div>

      <div class="input-group">
        <input v-model="referralCode" type="text" placeholder="Referral Code (Optional)" class="input-field" />
      </div>

      <div class="button-container">
        <button type="submit" class="submit-button" :disabled="isSubmitting">Register</button>
      </div>

      <div class="login-link">
        Already have an account?
        <router-link to="/login" class="link">Login here</router-link>
      </div>
    </form>
  </div>

  <div v-if="showPlayStoreModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Registration Successful! 🎉</h3>
      <p>Download our Android app for the best experience</p>
      <div class="modal-buttons">
        <button @click="goToPlayStore" class="playstore-button">
          <!-- <img src="@/assets/google-play-badge.png" alt="Get it on Google Play" /> -->
          Get it on Google Play
        </button>
        <!-- <button @click="continueToWeb" class="web-button">
          Continue to Web Version
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserDocument, updateReferralSystem, updateCoinBalance } from '../models/userModel';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const referralCode = ref('');
    const country = ref('');
    const router = useRouter();

    // Generate Unique Referral Code
    const generateReferralCode = () => 'REF' + Math.random().toString(36).substring(2, 12).toUpperCase();

    // Auto-fill referral code from URL or Telegram WebApp
    onMounted(() => {
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const urlRef = urlParams.get('ref');

      // Check Telegram WebApp data
      const tgWebApp = window.Telegram?.WebApp;
      if (tgWebApp) {
        try {
          const startParam = tgWebApp.initDataUnsafe?.start_param;
          if (startParam) {
            referralCode.value = startParam;
          } else if (urlRef) {
            referralCode.value = urlRef;
          }
        } catch (error) {
          console.error('Error getting Telegram start parameter:', error);
          if (urlRef) referralCode.value = urlRef;
        }
      } else {
        // Fallback to URL parameter if Telegram WebApp is not available
        if (urlRef) referralCode.value = urlRef;
      }
    });

    // Add new refs for validation
    const errors = ref([]);
    const isSubmitting = ref(false);
    const showPlayStoreModal = ref(false);

    const validateForm = () => {
      errors.value = [];

      // Name validation
      if (!name.value.trim()) {
        errors.value.push('Name is required');
      } else if (name.value.length < 2) {
        errors.value.push('Name must be at least 2 characters long');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value) {
        errors.value.push('Email is required');
      } else if (!emailRegex.test(email.value)) {
        errors.value.push('Please enter a valid email address');
      }

      // Password validation
      if (!password.value) {
        errors.value.push('Password is required');
      } else if (password.value.length < 8) {
        errors.value.push('Password must be at least 8 characters long');
      } else if (!/(?=.*[A-Z])/.test(password.value)) {
        errors.value.push('Password must contain at least one uppercase letter');
      } else if (!/(?=.*[0-9])/.test(password.value)) {
        errors.value.push('Password must contain at least one number');
      }

      // Confirm password validation
      if (password.value !== confirmPassword.value) {
        errors.value.push('Passwords do not match');
      }

      // Country validation
      if (!country.value) {
        errors.value.push('Please select your country');
      }

      return errors.value.length === 0;
    };

    const validateAndRegister = async () => {
      if (isSubmitting.value) return;
      
      if (!validateForm()) {
        // Add timeout to clear errors after 10 seconds
        setTimeout(() => {
          errors.value = [];
        }, 10000);
        return;
      }

      isSubmitting.value = true;
      errors.value = [];

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const userId = userCredential.user.uid;
        const newReferralCode = generateReferralCode();

        console.log("User Registered:", userId, email.value);
        console.log("Referral Code Used:", referralCode.value);

        // Generate a random initial coin balance (e.g., 80,000)
        const randomCoinBalance = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

        // Store user data in Firebase
        await createUserDocument(userId, {
          name: name.value,
          email: email.value,
          country: country.value,
          referralCode: newReferralCode,
          referralUsed: referralCode.value || '',
          coinBalance: randomCoinBalance
        });

        // Handle Referral System
        if (referralCode.value) {
          console.log("Updating Referral System for", referralCode.value);
          await updateReferralSystem(referralCode.value, userId, email.value, randomCoinBalance);
        }
        await updateCoinBalance(userId, 1000, 'Welcome bonus');
        // Show Play Store Modal
        showPlayStoreModal.value = true;
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          errors.value.push('This email address is already registered. Please login instead.');
        } else if (error.code === 'auth/weak-password') {
          errors.value.push('Password is too weak. Please choose a stronger password.');
        } else {
          errors.value.push('Registration failed. Please try again later.', error.message);
        }
        // Add timeout to clear errors after 10 seconds
        setTimeout(() => {
          errors.value = [];
        }, 10000);
      } finally {
        isSubmitting.value = false;
      }
    };

    const goToPlayStore = () => {
      window.location.href = 'https://play.google.com/store/apps/details?id=aiccoin.nocorps.org';
    };

    const continueToWeb = () => {
      router.push('/');
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      country,
      referralCode,
      validateAndRegister, // Changed from register to validateAndRegister
      errors,
      isSubmitting,
      showPlayStoreModal,
      goToPlayStore,
      continueToWeb
    };
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* Change from center to flex-start */
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(145deg, #1d1d1d, #2d2d2d);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  /* Add position relative */
}

h2 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #0ff, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  font-weight: 600;
  letter-spacing: 1px;
}

.register-form {
  background: linear-gradient(145deg, rgba(16, 20, 24, 0.95), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(15px);
  border-radius: 30px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(0, 255, 255, 0.1),
    inset 0 0 30px rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: formAppear 0.6s ease-out;
}

.input-group {
  margin-bottom: 1.25rem;
  /* Increased margin between input groups */
  position: relative;
  width: 100%;
}

.input-group:last-of-type {
  margin-bottom: 1.5rem;
  /* Extra space before the submit button */
}

.input-field {
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  margin: 0;
  /* Reset any default margins */
}

.input-field:focus {
  outline: none;
  border-color: rgba(0, 255, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.submit-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(45deg,
      rgba(0, 255, 255, 0.1),
      rgba(0, 200, 255, 0.15));
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  color: rgba(0, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-top: 1.5rem;
  letter-spacing: 1px;
}

.submit-button:hover {
  background: linear-gradient(45deg,
      rgba(0, 255, 255, 0.15),
      rgba(0, 200, 255, 0.2));
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 255, 255, 0.15);
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.link {
  color: rgba(0, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
  position: relative;
}

.link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background: rgba(0, 255, 255, 0.8);
  transition: width 0.3s ease;
}

.link:hover:after {
  width: 100%;
}

@keyframes formAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .register-container {
    padding: 1rem;
    height: auto;
    /* Change min-height to height: auto */
    justify-content: flex-start;
    padding-top: 2rem;
    /* Add some top padding */
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    margin-top: 1rem;
    /* Add top margin */
  }

  .register-form {
    width: 100%;
    max-width: 100%;
    /* Ensure form takes full width on mobile */
    padding: 1.5rem;
    margin: 0 auto;
    border-radius: 20px;
    overflow-y: auto;
    /* Add scroll for long forms */
    -webkit-overflow-scrolling: touch;
  }

  .input-field {
    width: 100%;
    font-size: 16px;
    /* Prevent iOS zoom on focus */
    padding: 12px 14px;
    font-size: 0.95rem;
  }

  .submit-button {
    padding: 12px;
    font-size: 1rem;
  }

  .input-group {
    margin-bottom: 1rem;
    /* Slightly reduced spacing on mobile */
  }

  .input-group:last-of-type {
    margin-bottom: 1.25rem;
  }

  select.input-field {
    background-size: 16px;
    padding-right: 40px;
    /* Space for dropdown arrow */
    font-size: 0.95rem;
  }
}

::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #fff;
  -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.05) inset;
  transition: background-color 5000s ease-in-out 0s;
}

select.input-field {
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(0, 255, 255, 0.7)'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;
  padding-right: 45px;
}

select.input-field option {
  background-color: #1d1d1d;
  color: #fff;
  padding: 12px;
  font-size: 1rem;
}

select.input-field:focus {
  outline: none;
  border-color: rgba(0, 255, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
}

select.input-field:hover {
  border-color: rgba(0, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.05);
}

/* Style for disabled placeholder option */
select.input-field option[value=""] {
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  select.input-field {
    background-size: 16px;
    padding-right: 40px;
    font-size: 0.95rem;
  }
}

/* Add touch-friendly styles */
@media (hover: none) {
  .input-field:focus {
    font-size: 16px !important;
  }

  .submit-button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
}

.error-container {
  width: 100%;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.3s ease-in-out;
}

.error-message {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: #ff4444;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-align: left;
  animation: fadeInAndShake 0.5s ease-in-out;
  position: relative;
  overflow: hidden;
}

.error-message::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: rgba(255, 68, 68, 0.5);
  width: 100%;
  animation: countdown 10s linear forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

@keyframes countdown {
  from { width: 100%; }
  to { width: 0%; }
}

@keyframes fadeInAndShake {
  0% { 
    opacity: 0;
    transform: translateY(-10px);
  }
  50% { 
    opacity: 1;
    transform: translateY(0);
  }
  60% { transform: translateX(-5px); }
  70% { transform: translateX(5px); }
  80% { transform: translateX(-2px); }
  90% { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

/* Disable submit button while submitting */
.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
}

.playstore-button,
.web-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.playstore-button {
  background: #0f9d58;
  color: #fff;
  display: flex;
  align-items: center;
}

.playstore-button img {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.web-button {
  background: #4285f4;
  color: #fff;
}
</style>
