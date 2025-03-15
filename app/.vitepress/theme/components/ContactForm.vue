<template>
  <div class="contact-form">
    <form @submit.prevent="submitForm">
      <!-- Hidden input required for Netlify -->
      <input type="hidden" name="form-name" value="contact" />

      <div class="form-group">
        <label for="name">Name</label>
        <input 
          id="name"
          v-model="formData.name"
          type="text" 
          name="name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="formData.email"
          type="email" 
          name="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea 
          id="message"
          v-model="formData.message"
          name="message"
          rows="5"
          required
        ></textarea>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Sending..." : "Send Message" }}
      </button>
    </form>

    <div v-if="formSubmitted" class="success-message">
      <p>Thank you! Your message has been sent.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const loading = ref(false);
const formSubmitted = ref(false);
const formData = reactive({
  name: '',
  email: '',
  message: ''
});

async function submitForm() {
  loading.value = true;

  // Create form data
  const formDataObject = new FormData();
  formDataObject.append("form-name", "contact");
  formDataObject.append("name", formData.name);
  formDataObject.append("email", formData.email);
  formDataObject.append("message", formData.message);

  try {
    const response = await fetch("/", {
      method: "POST",
      body: formDataObject,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      throw new Error("Form submission failed.");
    }

    // Success message
    formSubmitted.value = true;

    // Reset form fields
    formData.name = '';
    formData.email = '';
    formData.message = '';

    // Hide success message after 5 seconds
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error("Error:", error);
    alert("There was an issue submitting the form. Please try again.");
  } finally {
    loading.value = false;
  }
}
</script>