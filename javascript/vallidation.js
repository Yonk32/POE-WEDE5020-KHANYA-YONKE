document.addEventListener('DOMContentLoaded', function() {
    // Replace these three placeholders with your actual EmailJS credentials
    const EMAILJS_SERVICE_ID = "service_umtex9s";
    const EMAILJS_TEMPLATE_ID = "template_c8d0n2g";

    const enquiryNameInput = document.getElementById('enquirer-name');
    const contactNameInput = document.getElementById('name');

    // Helper functions for field errors
    function setFieldError(inputElement, message) {
        let errorSpan = inputElement.parentNode.querySelector('.field-error-msg');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'field-error-msg';
            errorSpan.style.display = 'block';
            errorSpan.style.color = '#d9534f';
            errorSpan.style.fontSize = '0.85rem';
            errorSpan.style.marginTop = '0.3rem';
            errorSpan.style.fontWeight = 'bold';
            inputElement.parentNode.appendChild(errorSpan);
        }
        inputElement.style.border = '1px solid #d9534f';
        errorSpan.textContent = message;
    }

    function clearFieldError(inputElement) {
        inputElement.style.border = '';
        const errorSpan = inputElement.parentNode.querySelector('.field-error-msg');
        if (errorSpan) {
            errorSpan.remove();
        }
    }

    function setGroupError(containerElement, message) {
        let errorSpan = containerElement.querySelector('.field-error-msg');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'field-error-msg';
            errorSpan.style.display = 'block';
            errorSpan.style.color = '#d9534f';
            errorSpan.style.fontSize = '0.85rem';
            errorSpan.style.marginTop = '0.4rem';
            errorSpan.style.fontWeight = 'bold';
            containerElement.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    function clearGroupError(containerElement) {
        const errorSpan = containerElement.querySelector('.field-error-msg');
        if (errorSpan) {
            errorSpan.remove();
        }
    }

    // ==========================================
    // 1. ENQUIRY PAGE VALIDATION & EMAILJS
    // ==========================================
    if (enquiryNameInput) {
        const enquiryForm = enquiryNameInput.closest('form');
        
        if (enquiryForm) {
            enquiryForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;

                // Inputs
                const fullNameInput = document.getElementById('enquirer-name');
                const emailInput = document.getElementById('enquirer-email');
                const phoneInput = document.getElementById('enquirer-phone');
                const enquiryTypeInput = document.getElementById('enquiry-type');
                const enquirySubjectInput = document.getElementById('enquiry-subject');
                const enquiryMessageInput = document.getElementById('enquiry-message');
                const responseContainer = document.getElementById('response-email').closest('fieldset');
                const preferredResponse = document.querySelector('input[name="preferred_response"]:checked');
                const confirmationInput = document.getElementById('enquiry-confirmation');
                const confContainer = confirmationInput.closest('p');

                // Validations
                if (!fullNameInput.value.trim()) { isValid = false; setFieldError(fullNameInput, 'Full Name is required.'); } else { clearFieldError(fullNameInput); }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) { isValid = false; setFieldError(emailInput, 'Please enter a valid email address.'); } else { clearFieldError(emailInput); }

                if (phoneInput.value.trim() && !phoneInput.value.trim().match(/^[\d\s\+\-\(\)]{10,15}$/)) { isValid = false; setFieldError(phoneInput, 'Please enter a valid phone number.'); } else { clearFieldError(phoneInput); }

                if (!enquiryTypeInput.value) { isValid = false; setFieldError(enquiryTypeInput, 'Please select an enquiry type.'); } else { clearFieldError(enquiryTypeInput); }

                if (!enquirySubjectInput.value.trim()) { isValid = false; setFieldError(enquirySubjectInput, 'Enquiry Subject is required.'); } else { clearFieldError(enquirySubjectInput); }

                if (!enquiryMessageInput.value.trim()) { isValid = false; setFieldError(enquiryMessageInput, 'Enquiry Details message is required.'); } else { clearFieldError(enquiryMessageInput); }

                if (!preferredResponse) { isValid = false; setGroupError(responseContainer, 'Please select a preferred response method.'); } else { clearGroupError(responseContainer); }

                if (!confirmationInput.checked) { isValid = false; setGroupError(confContainer, 'You must confirm that the information provided is correct.'); } else { clearGroupError(confContainer); }

                // Submit to EmailJS if Valid
                if (isValid) {
                    const submitBtn = enquiryForm.querySelector('button[type="submit"]');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';

                    // Collect form data for template
                    const templateParams = {
                        from_name: fullNameInput.value.trim(),
                        from_email: emailInput.value.trim(),
                        phone: phoneInput.value.trim() || 'N/A',
                        enquiry_type: enquiryTypeInput.value,
                        subject: enquirySubjectInput.value.trim(),
                        message: enquiryMessageInput.value.trim(),
                        preferred_response: preferredResponse.value
                    };

                    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                        .then(function(response) {
                            alert('Success! Your enquiry has been sent successfully.');
                            enquiryForm.reset();
                        }, function(error) {
                            alert('Failed to send enquiry. Error: ' + JSON.stringify(error));
                        })
                        .finally(function() {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Submit Enquiry';
                        });
                }
            });
        }
    }

    // ==========================================
    // 2. CONTACT US PAGE VALIDATION & EMAILJS
    // ==========================================
    if (contactNameInput) {
        const contactForm = contactNameInput.closest('form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;

                // Inputs
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const subjectInput = document.getElementById('subject');
                const messageInput = document.getElementById('message');
                const consentInput = document.getElementById('consent');
                const consentContainer = consentInput.closest('p');

                // Validations
                if (!nameInput.value.trim()) { isValid = false; setFieldError(nameInput, 'Full Name is required.'); } else { clearFieldError(nameInput); }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) { isValid = false; setFieldError(emailInput, 'Please enter a valid email address.'); } else { clearFieldError(emailInput); }

                if (phoneInput.value.trim() && !phoneInput.value.trim().match(/^[\d\s\+\-\(\)]{10,15}$/)) { isValid = false; setFieldError(phoneInput, 'Please enter a valid phone number.'); } else { clearFieldError(phoneInput); }

                if (!subjectInput.value) { isValid = false; setFieldError(subjectInput, 'Please select a subject.'); } else { clearFieldError(subjectInput); }

                if (!messageInput.value.trim()) { isValid = false; setFieldError(messageInput, 'Message body is required.'); } else { clearFieldError(messageInput); }

                if (!consentInput.checked) { isValid = false; setGroupError(consentContainer, 'You must agree to allow EcoRoots to use your contact details.'); } else { clearGroupError(consentContainer); }

                // Submit to EmailJS if Valid
                if (isValid) {
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';

                    const templateParams = {
                        from_name: nameInput.value.trim(),
                        from_email: emailInput.value.trim(),
                        phone: phoneInput.value.trim() || 'N/A',
                        subject: subjectInput.value,
                        message: messageInput.value.trim()
                    };

                    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                        .then(function(response) {
                            alert('Success! Your message has been sent successfully.');
                            contactForm.reset();
                        }, function(error) {
                            alert('Failed to send message. Error: ' + JSON.stringify(error));
                        })
                        .finally(function() {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Submit';
                        });
                }
            });
        }
    }
});