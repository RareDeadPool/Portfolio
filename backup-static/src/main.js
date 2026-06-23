/*
  Main Entry Module - Desktop Portfolio OS
  Bootstraps and orchestrates all submodules, handles general form submit, and landing loadouts.
*/

import './window-manager.js';
import { openWindow } from './desktop.js';
import './dock.js';
import './search.js';
import './terminal.js';
import './projects.js';

// Global contact form handling
export function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('contact-form-el');
  const successMsg = document.getElementById('contact-success-msg');
  
  if (form && successMsg) {
    // Collect values (simulated send)
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    console.log(`Contact message received: Name: ${name}, Email: ${email}, Message: ${message}`);

    // Fade form out and fade success message in
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
    
    // Re-create check icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}
window.handleContactSubmit = handleContactSubmit;

export function resetContactForm() {
  const form = document.getElementById('contact-form-el');
  const successMsg = document.getElementById('contact-success-msg');
  
  if (form && successMsg) {
    form.reset();
    form.classList.remove('hidden');
    successMsg.classList.add('hidden');
  }
}
window.resetContactForm = resetContactForm;

// Orchestrate loading on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons for initial desktop shell layout
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Pre-load default windows on first entry to wow the user
  setTimeout(() => {
    // Open About Me window by default on load
    openWindow('about');
    
    // Open terminal automatically to welcome developer users
    openWindow('terminal');
  }, 600);
});
