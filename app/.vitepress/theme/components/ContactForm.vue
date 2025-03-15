<template>
  <div class="contact-form">
    <form @submit.prevent="submitForm" method="POST" data-netlify="true">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          id="name"
          v-model="formData.name"
          type="text" 
          placeholder="Your name" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="formData.email"
          type="email" 
          placeholder="Your email address" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea 
          id="message"
          v-model="formData.message"
          placeholder="Your message" 
          rows="5"
          required
        ></textarea>
      </div>
      
      <button type="submit">
        Send Message
      </button>
    </form>
    
    <div v-if="formSubmitted" class="success-message">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <p>Thank you for your message! We'll be in touch soon.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formSubmitted = ref(false)
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

async function submitForm() {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to send message.');
    }

    // Show success message
    formSubmitted.value = true;

    // Reset form data
    formData.name = '';
    formData.email = '';
    formData.message = '';

    // Hide success message after 5 seconds
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error sending your message. Please try again later.');
  }
}
</script>

<style>
.contact-form {
  margin: 2rem 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.contact-form form {
  background-color: var(--vp-c-bg-soft);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
  outline: none;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.contact-form button:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  transform: translateY(-1px);
}

.contact-form button:active {
  background-color: var(--vp-button-brand-active-bg);
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  transform: translateY(0);
}

.success-message {
  margin-top: 20px;
  padding: 16px;
  background-color: var(--vp-c-brand-soft);
  border-radius: 8px;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.success-message svg {
  margin-bottom: 8px;
}

.success-message p {
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .contact-form {
    padding: 0 16px;
  }
}
</style>