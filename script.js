// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Waitlist Form Submission
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('waitlist-name').value;
        const email = document.getElementById('waitlist-email').value;
        
        // Hide any previous messages
        document.getElementById('waitlist-success').style.display = 'none';
        document.getElementById('waitlist-error').style.display = 'none';
        
        // Disable button during submission
        const submitBtn = waitlistForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span>Adding you...';
        
        try {
            // Here you would typically send the data to your backend/email service
            // For now, we'll simulate an API call
            console.log('Waitlist submission:', { name, email });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // TODO: Replace with actual API call
            // Example using fetch:
            // const response = await fetch('YOUR_API_ENDPOINT', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email })
            // });
            // if (!response.ok) throw new Error('Submission failed');
            
            // Show success message
            document.getElementById('waitlist-success').style.display = 'flex';
            
            // Reset form
            waitlistForm.reset();
            
            // Optional: Track with analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_signup', {
                    'event_category': 'engagement',
                    'event_label': email
                });
            }
            
            // Update counter (optional)
            const counter = document.getElementById('waitlist-count');
            if (counter) {
                const currentCount = parseInt(counter.textContent.replace('+', ''));
                counter.textContent = (currentCount + 1) + '+';
            }
            
        } catch (error) {
            console.error('Waitlist submission error:', error);
            document.getElementById('waitlist-error').style.display = 'flex';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Contact form submitted:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


// Smooth scroll for waitlist links
document.querySelectorAll('a[href="#waitlist"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
    });
});

// Waitlist Modal Functions
function openWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWaitlistModal();
    }
});

// Waitlist Signup Form Submission
const waitlistSignupForm = document.getElementById('waitlistSignupForm');
if (waitlistSignupForm) {
    waitlistSignupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const useCase = document.getElementById('use-case').value;
        
        // Hide any previous messages
        document.getElementById('waitlist-form-success').style.display = 'none';
        document.getElementById('waitlist-form-error').style.display = 'none';
        
        // Disable button during submission
        const submitBtn = waitlistSignupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Adding you...';
        
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }
            
            // Google Forms configuration
            const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfYQ_OMU_LasfdB8NBzEcnJvzpB7HFcrnfOeMM1MPCHUG0udg/formResponse';
            const ENTRY_IDS = {
                firstName: 'entry.428932020',
                lastName: 'entry.1957585788',
                email: 'entry.47470476',
                useCase: 'entry.736521513'
            };
            
            // Submit to Google Sheets via Google Forms
            const response = await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    [ENTRY_IDS.firstName]: firstName,
                    [ENTRY_IDS.lastName]: lastName,
                    [ENTRY_IDS.email]: email,
                    [ENTRY_IDS.useCase]: useCase
                })
            });
            
            // Note: 'no-cors' mode means we can't check response status
            // We'll assume it worked if no error was thrown
            console.log('Waitlist signup submitted to Google Sheets:', { firstName, lastName, email, useCase });
            
            // Show success message in modal briefly
            document.getElementById('waitlist-form-success').style.display = 'flex';
            
            // Reset form
            waitlistSignupForm.reset();
            
            // Optional: Track with analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_signup', {
                    'event_category': 'engagement',
                    'event_label': email,
                    'use_case': useCase
                });
            }
            
            // Close modal and show full-screen success overlay
            setTimeout(() => {
                closeWaitlistModal();
                document.getElementById('waitlist-form-success').style.display = 'none';
                showSuccessOverlay();
            }, 800);
            
        } catch (error) {
            console.error('Waitlist signup error:', error);
            document.getElementById('waitlist-form-error').style.display = 'flex';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Hero Animation: Saved Workflow → One-Click Run
const initUnifiedStory = () => {
    const browserWindow = document.querySelector('.browser-window');
    const extensionStates = document.querySelectorAll('.extension-state');
    const storySteps = document.querySelectorAll('.story-step');
    
    // Tabs
    const tabs = document.querySelectorAll('.browser-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const urlText = document.querySelector('.url-text');
    
    // Order page elements
    const orderRows = document.querySelectorAll('.highlight-row');
    
    // Spreadsheet rows (empty rows to be filled)
    const spreadsheetRows = document.querySelectorAll('.spreadsheet-row.empty-row');
    
    // Progress elements
    const checklistItems = document.querySelectorAll('.execution-checklist .checklist-item');
    
    if (!browserWindow) return;
    
    // Order data to fill into spreadsheet (simplified - matches new columns)
    const orderData = [
        { customer: 'Sarah Mitchell', product: 'Headphones × 2', total: '$299.98' }
    ];
    
    // Switch tab
    const switchTab = (tabName) => {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
        tabContents.forEach(c => c.classList.toggle('active', c.dataset.tab === tabName));
        if (urlText) {
            if (tabName === 'sheets') {
                urlText.textContent = 'docs.google.com/spreadsheets/orders';
            } else if (tabName === 'shipping') {
                urlText.textContent = 'ship.company.com/create-label';
            } else {
                urlText.textContent = 'shop.company.com/orders/view/12847';
            }
        }
    };
    
    // Update story indicator
    const setActivePhase = (phase) => {
        storySteps.forEach(step => {
            step.classList.remove('active');
            if (step.dataset.phase === phase) step.classList.add('active');
        });
    };
    
    // Typing animation helper - types text character by character
    const typeText = (element, text, speed = 40, showCursor = false) => {
        if (!element) return Promise.resolve();
        
        element.textContent = '';
        
        // Add typing cursor to parent if requested
        const parentBox = element.closest('.field-box');
        if (showCursor && parentBox) {
            parentBox.classList.add('typing');
        }
        
        let i = 0;
        
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text[i];
                    i++;
                } else {
                    clearInterval(interval);
                    // Remove typing cursor
                    if (showCursor && parentBox) {
                        parentBox.classList.remove('typing');
                    }
                    resolve();
                }
            }, speed);
        });
    };
    
    // Fill spreadsheet row with order data (with typing animation)
    const fillSpreadsheetRow = async (rowIndex, data) => {
        const row = spreadsheetRows[rowIndex];
        if (!row) return;
        
        row.classList.add('filling');
        
        // Fill each cell (simplified - only customer, product, total)
        const cells = {
            customer: row.querySelector('[data-col="customer"]'),
            product: row.querySelector('[data-col="product"]'),
            total: row.querySelector('[data-col="total"]')
        };
        
        // Type each field with small delays between
        await new Promise(resolve => setTimeout(resolve, 200));
        if (cells.customer) await typeText(cells.customer, data.customer, 35);
        
        await new Promise(resolve => setTimeout(resolve, 150));
        if (cells.product) await typeText(cells.product, data.product, 35);
        
        await new Promise(resolve => setTimeout(resolve, 150));
        if (cells.total) await typeText(cells.total, data.total, 35);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        row.classList.remove('filling');
        row.classList.add('done');
    };
    
    // Fill shipping form (with typing animation)
    const fillShippingForm = async () => {
        const fields = {
            name: { text: document.querySelector('[data-field="ship-name"] .field-text'), box: document.querySelector('[data-field="ship-name"]') },
            address: { text: document.querySelector('[data-field="ship-address"] .field-text'), box: document.querySelector('[data-field="ship-address"]') }
        };
        
        // Type name field with cursor
        await new Promise(resolve => setTimeout(resolve, 250));
        if (fields.name.box) fields.name.box.classList.add('filled');
        if (fields.name.text) await typeText(fields.name.text, 'Sarah Mitchell', 40, true);
        
        // Type address field with cursor
        await new Promise(resolve => setTimeout(resolve, 200));
        if (fields.address.box) fields.address.box.classList.add('filled');
        if (fields.address.text) await typeText(fields.address.text, '123 Main St, San Francisco, CA', 35, true);
    };
    
    // Clear shipping form (simplified)
    const clearShippingForm = () => {
        const fields = document.querySelectorAll('.shipping-view .field-text');
        fields.forEach(field => field.textContent = '');
        const boxes = document.querySelectorAll('.shipping-view .field-box');
        boxes.forEach(box => {
            box.classList.remove('filled');
            box.classList.remove('typing');
        });
    };
    
    // Reset all
    const resetAll = () => {
        // Clear spreadsheet cells
        spreadsheetRows.forEach(row => {
            row.classList.remove('active', 'done', 'filling');
            const cells = row.querySelectorAll('.cell:not(.cell-num)');
            cells.forEach(cell => cell.textContent = '');
        });
        
        // Clear order page highlights
        orderRows.forEach(row => row.classList.remove('active'));
        
        // Clear shipping form
        clearShippingForm();
        
        // Reset shipping button
        const createBtn = document.querySelector('.btn-create-label');
        if (createBtn) createBtn.classList.remove('clicked', 'highlight');
        const confirmation = document.querySelector('.label-confirmation');
        if (confirmation) confirmation.classList.remove('show');
        
        // Reset browser states including magic-moment
        browserWindow.classList.remove('state-watching', 'state-learning', 'state-running', 'state-success', 'spotlight-mode', 'magic-moment');
        
        // Reset popup emphasis
        const extensionPopup = document.querySelector('.extension-popup');
        if (extensionPopup) extensionPopup.classList.remove('zoom-emphasis', 'magic-moment');
        
        checklistItems.forEach(item => {
            item.classList.remove('active', 'done');
            const check = item.querySelector('.item-check');
            if (check) check.textContent = '○';
        });
        // Reset button clicked state and magic classes
        const allRunBtns = document.querySelectorAll('.workflow-ready-state .play-btn');
        allRunBtns.forEach(btn => {
            btn.classList.remove('clicked');
            btn.classList.remove('magic-target');
        });
        
        // Reset magic card classes
        const allCards = document.querySelectorAll('.workflow-card');
        allCards.forEach(card => card.classList.remove('magic-card'));
        
        // Reset cursor
        const cursor = document.querySelector('.extension-cursor');
        if (cursor) {
            cursor.classList.remove('visible', 'clicking');
            cursor.style.transition = 'none';
        }
        switchTab('order');
    };
    
    // Update checklist item
    const setChecklistItem = (step, state) => {
        checklistItems.forEach(item => {
            if (item.dataset.step === step) {
                item.classList.remove('active', 'done');
                item.classList.add(state);
                const check = item.querySelector('.item-check');
                if (check) {
                    check.textContent = state === 'done' ? '✓' : state === 'active' ? '→' : '○';
                }
            }
        });
    };
    
    
    // Extension cursor animation
    const extensionCursor = document.querySelector('.extension-cursor');
    const demoContainer = document.querySelector('.interactive-browser-demo');
    
    const animateCursorToButton = () => {
        if (!extensionCursor || !demoContainer) return;
        
        // Target the second workflow card (Order Fulfillment)
        const workflowCards = document.querySelectorAll('.workflow-ready-state .workflow-card');
        const orderFulfillmentCard = workflowCards[1]; // Second card (index 1)
        const runBtn = orderFulfillmentCard ? orderFulfillmentCard.querySelector('.play-btn') : null;
        if (!runBtn) return;
        
        const containerRect = demoContainer.getBoundingClientRect();
        const btnRect = runBtn.getBoundingClientRect();
        
        // Calculate button position relative to demo container
        const buttonX = btnRect.left - containerRect.left + btnRect.width / 2 - 12;
        const buttonY = btnRect.top - containerRect.top + btnRect.height / 2 - 12;
        
        // Start position - center of the browser content area
        const startX = 200;
        const startY = 250;
        
        // Phase 1: Position cursor at start (no transition yet)
        extensionCursor.style.transition = 'none';
        extensionCursor.style.top = startY + 'px';
        extensionCursor.style.left = startX + 'px';
        
        // Force reflow to apply position before showing
        extensionCursor.offsetHeight;
        
        // Phase 2: Make cursor visible at start position
        extensionCursor.classList.add('visible');
        
        // Phase 3: After a longer pause, enable SLOWER transition and move to button
        setTimeout(() => {
            // Slower, more deliberate cursor movement (1.2s instead of 0.8s)
            extensionCursor.style.transition = 'top 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), left 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s ease';
            extensionCursor.style.top = buttonY + 'px';
            extensionCursor.style.left = buttonX + 'px';
        }, 500);
        
        // Phase 3.5: Add zoom emphasis when cursor is near the button
        setTimeout(() => {
            const extensionPopup = document.querySelector('.extension-popup');
            if (extensionPopup) extensionPopup.classList.add('zoom-emphasis');
            if (browserWindow) browserWindow.classList.add('spotlight-mode');
            
            // Add magic-card class to Order Fulfillment card
            const workflowCards = document.querySelectorAll('.workflow-ready-state .workflow-card');
            const orderFulfillmentCard = workflowCards[1];
            if (orderFulfillmentCard) orderFulfillmentCard.classList.add('magic-card');
        }, 1200);
        
        // Phase 4: MAGIC MOMENT - dramatic pause before click
        setTimeout(() => {
            const extensionPopup = document.querySelector('.extension-popup');
            if (extensionPopup) {
                extensionPopup.classList.remove('zoom-emphasis');
                extensionPopup.classList.add('magic-moment');
            }
            if (browserWindow) browserWindow.classList.add('magic-moment');
            
            // Add magic classes to the specific Order Fulfillment button/card
            const workflowCards = document.querySelectorAll('.workflow-ready-state .workflow-card');
            const orderFulfillmentCard = workflowCards[1];
            const runBtn = orderFulfillmentCard ? orderFulfillmentCard.querySelector('.run-workflow-btn') : null;
            if (orderFulfillmentCard) orderFulfillmentCard.classList.add('magic-card');
            if (runBtn) runBtn.classList.add('magic-target');
        }, 1800);
        
        // Phase 5: The CLICK - with dramatic effect (after magic moment pause)
        setTimeout(() => {
            extensionCursor.classList.add('clicking');
        }, 2300);
        
        setTimeout(() => {
            extensionCursor.classList.remove('clicking');
        }, 2700);
        
        // Phase 6: Hide cursor and remove all emphasis classes
        setTimeout(() => {
            extensionCursor.classList.remove('visible');
            const extensionPopup = document.querySelector('.extension-popup');
            if (extensionPopup) {
                extensionPopup.classList.remove('zoom-emphasis');
                extensionPopup.classList.remove('magic-moment');
            }
            if (browserWindow) {
                browserWindow.classList.remove('spotlight-mode');
                browserWindow.classList.remove('magic-moment');
            }
            
            // Remove magic classes from button and card
            const workflowCards = document.querySelectorAll('.workflow-ready-state .workflow-card');
            workflowCards.forEach(card => card.classList.remove('magic-card'));
            const runBtns = document.querySelectorAll('.workflow-ready-state .play-btn');
            runBtns.forEach(btn => btn.classList.remove('magic-target'));
        }, 2900);
    };
    
    // Animation phases - Saved Workflow → One-Click Run
    const runStoryLoop = () => {
        // === PHASE 1: SAVED WORKFLOW READY (0-5s) ===
        resetAll();
        switchTab('order');
        setActivePhase('ready');
        
        extensionStates.forEach(s => s.classList.remove('active'));
        document.querySelector('.workflow-ready-state')?.classList.add('active');
        
        // Highlight order details
        orderRows.forEach(row => row.classList.add('active'));
        
        // Animate cursor to button (appears at 1s, dramatic journey to ~4s click)
        setTimeout(() => {
            animateCursorToButton();
        }, 1000);
        
        // === PHASE 2: BUTTON CLICKED - STARTING (synced with cursor click at ~4.3s) ===
        setTimeout(() => {
            // Show button press effect on Order Fulfillment button
            const workflowCards = document.querySelectorAll('.workflow-ready-state .workflow-card');
            const orderFulfillmentCard = workflowCards[1];
            const runBtn = orderFulfillmentCard ? orderFulfillmentCard.querySelector('.play-btn') : null;
            if (runBtn) runBtn.classList.add('clicked');
        }, 4300);
        
        setTimeout(() => {
            setActivePhase('click');
            
            extensionStates.forEach(s => s.classList.remove('active'));
            document.querySelector('.starting-state')?.classList.add('active');
        }, 5000);
        
        // === PHASE 3: EXECUTING (6-15s) - SLOWER, MORE DELIBERATE ===
        setTimeout(() => {
            browserWindow.classList.add('state-running');
            setActivePhase('done');
            
            extensionStates.forEach(s => s.classList.remove('active'));
            document.querySelector('.executing-state')?.classList.add('active');
            
            // Step 1: Start - Reading order details (still on order page)
            setChecklistItem('open', 'active');
            
            setTimeout(() => {
                // Highlight order details being read
                orderRows.forEach(row => row.classList.add('active'));
            }, 400);
            
            setTimeout(() => {
                setChecklistItem('open', 'done');
            }, 1500);
            
            // Step 2: Switch to spreadsheet and log order - more pause
            setTimeout(() => {
                setChecklistItem('read', 'active');
                orderRows.forEach(row => row.classList.remove('active'));
                switchTab('sheets');
            }, 2200);
            
            setTimeout(() => {
                fillSpreadsheetRow(0, orderData[0]);
            }, 2500);
            
            setTimeout(() => {
                setChecklistItem('read', 'done');
            }, 4800);
            
            // Step 3: Switch to shipping and create label - more deliberate
            setTimeout(() => {
                setChecklistItem('add', 'active');
                switchTab('shipping');
            }, 5800);
            
            setTimeout(() => {
                fillShippingForm();
            }, 6100);
            
            // Pause to let fields be visible
            // Highlight the Create Label button (after typing finishes - ~2.5s for typing)
            setTimeout(() => {
                const createBtn = document.querySelector('.btn-create-label');
                if (createBtn) createBtn.classList.add('highlight');
            }, 9000);
            
            // Click Create Label button
            setTimeout(() => {
                const createBtn = document.querySelector('.btn-create-label');
                if (createBtn) {
                    createBtn.classList.remove('highlight');
                    createBtn.classList.add('clicked');
                }
            }, 9800);
            
            setTimeout(() => {
                const createBtn = document.querySelector('.btn-create-label');
                if (createBtn) createBtn.classList.remove('clicked');
            }, 10100);
            
            // Show Label Created confirmation
            setTimeout(() => {
                const confirmation = document.querySelector('.label-confirmation');
                if (confirmation) confirmation.classList.add('show');
                setChecklistItem('add', 'done');
            }, 10400);
            
        }, 6000);
        
        // === PHASE 4: SUCCESS (17-22s) ===
        setTimeout(() => {
            browserWindow.classList.remove('state-running');
            browserWindow.classList.add('state-success');
            
            extensionStates.forEach(s => s.classList.remove('active'));
            document.querySelector('.complete-state')?.classList.add('active');
        }, 17000);
    };
    
    // Start initial run
    runStoryLoop();
    
    // Loop every 22 seconds (extended for typing animations)
    setInterval(runStoryLoop, 22000);
};


// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUnifiedStory);
} else {
    initUnifiedStory();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Sticky Scroll Steps Animation
const initStickySteps = () => {
    const stepTextItems = document.querySelectorAll('.step-text-item');
    const stepVisualItems = document.querySelectorAll('.step-visual-item');
    
    if (stepTextItems.length === 0 || stepVisualItems.length === 0) return;
    
    const updateActiveVisual = () => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight / 2;
        
        // Get current active index (don't default to 0!)
        let activeStepIndex = null;
        const currentActive = document.querySelector('.step-visual-item.active');
        if (currentActive) {
            activeStepIndex = Array.from(stepVisualItems).indexOf(currentActive);
        }
        if (activeStepIndex === -1) activeStepIndex = 0; // Only default to 0 on first load
        
        // Find which step's center is closest to the trigger point
        let closestIndex = activeStepIndex !== null ? activeStepIndex : 0;
        let closestDistance = Infinity;
        
        stepTextItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            
            // Only consider items that are at least partially visible
            if (rect.bottom > 0 && rect.top < windowHeight) {
                const distance = Math.abs(itemCenter - triggerPoint);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            }
        });
        
        activeStepIndex = closestIndex;
        
        // Update visual items
        stepVisualItems.forEach((visual, index) => {
            if (index === activeStepIndex) {
                visual.classList.add('active');
            } else {
                visual.classList.remove('active');
            }
        });
        
        // Update text items
        stepTextItems.forEach((item, index) => {
            if (index === activeStepIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };
    
    // Update on scroll with debouncing to prevent flashing
    let ticking = false;
    let lastUpdateTime = 0;
    const UPDATE_THROTTLE = 100; // Minimum 100ms between updates
    
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (!ticking && (now - lastUpdateTime) >= UPDATE_THROTTLE) {
            window.requestAnimationFrame(() => {
                updateActiveVisual();
                ticking = false;
                lastUpdateTime = Date.now();
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateActiveVisual();
};

// Initialize sticky steps after DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickySteps);
} else {
    initStickySteps();
}

// Step 3 Visual Animation: Cursor → Execute with Steps → Done
const initStep3Animation = () => {
    const visual3 = document.querySelector('[data-visual="3"]');
    if (!visual3) return;
    
    const phases = {
        ready: visual3.querySelector('.phase-ready'),
        executing: visual3.querySelector('.phase-executing'),
        done: visual3.querySelector('.phase-done')
    };
    
    const miniCursor = visual3.querySelector('.mini-cursor');
    const runButton = visual3.querySelector('.run-button-mini');
    const panel = visual3.querySelector('.minimal-extension-panel');
    const checklistItems = visual3.querySelectorAll('.step-check-item');
    
    if (!phases.ready || !miniCursor || !runButton) return;
    
    const animateCursorToButton = () => {
        const panelRect = panel.getBoundingClientRect();
        const btnRect = runButton.getBoundingClientRect();
        
        // Calculate button position relative to panel
        const buttonX = btnRect.left - panelRect.left + btnRect.width / 2 - 9;
        const buttonY = btnRect.top - panelRect.top + btnRect.height / 2 - 9;
        
        // Start position - top center of panel
        const startX = panelRect.width / 2 - 9;
        const startY = 80;
        
        // Position cursor at start
        miniCursor.style.transition = 'none';
        miniCursor.style.top = startY + 'px';
        miniCursor.style.left = startX + 'px';
        miniCursor.offsetHeight; // Force reflow
        
        // Show cursor
        miniCursor.classList.add('visible');
        
        // Move to button
        setTimeout(() => {
            miniCursor.style.transition = 'top 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), left 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
            miniCursor.style.top = buttonY + 'px';
            miniCursor.style.left = buttonX + 'px';
        }, 200);
        
        // Click animation
        setTimeout(() => {
            miniCursor.classList.add('clicking');
            runButton.style.transform = 'scale(0.95)';
        }, 1100);
        
        setTimeout(() => {
            miniCursor.classList.remove('clicking');
            runButton.style.transform = '';
        }, 1400);
        
        // Hide cursor
        setTimeout(() => {
            miniCursor.classList.remove('visible');
        }, 1600);
    };
    
    const setPhase = (phaseName) => {
        Object.keys(phases).forEach(key => {
            if (phases[key]) {
                phases[key].classList.toggle('active', key === phaseName);
            }
        });
    };
    
    const resetChecklistItems = () => {
        checklistItems.forEach(item => {
            item.classList.remove('active', 'completed');
        });
    };
    
    const animateChecklistItems = () => {
        // Step 1: Read order details
        setTimeout(() => {
            checklistItems[0].classList.add('active');
        }, 300);
        
        setTimeout(() => {
            checklistItems[0].classList.add('completed');
        }, 1500);
        
        // Step 2: Update spreadsheet
        setTimeout(() => {
            checklistItems[1].classList.add('active');
        }, 1600);
        
        setTimeout(() => {
            checklistItems[1].classList.add('completed');
        }, 2800);
        
        // Step 3: Create shipping label
        setTimeout(() => {
            checklistItems[2].classList.add('active');
        }, 2900);
        
        setTimeout(() => {
            checklistItems[2].classList.add('completed');
        }, 4100);
    };
    
    const runAnimationCycle = () => {
        // Reset checklist items
        resetChecklistItems();
        
        // Phase 1: Ready to Run (0-2.5s)
        setPhase('ready');
        
        // Animate cursor to button
        setTimeout(() => {
            animateCursorToButton();
        }, 500);
        
        // Phase 2: Mimo Executing with Steps (2.5-7s)
        setTimeout(() => {
            setPhase('executing');
            animateChecklistItems();
        }, 2500);
        
        // Phase 3: Task Done (7-9.5s)
        setTimeout(() => {
            setPhase('done');
        }, 7000);
    };
    
    // Check if visual is in viewport before animating
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start initial animation
                runAnimationCycle();
                
                // Loop animation every 10 seconds
                const interval = setInterval(() => {
                    if (entry.isIntersecting) {
                        runAnimationCycle();
                    }
                }, 10000);
                
                // Store interval so we can clear it if needed
                visual3.dataset.animationInterval = interval;
            } else {
                // Clear interval when out of view
                if (visual3.dataset.animationInterval) {
                    clearInterval(visual3.dataset.animationInterval);
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(visual3);
};

// Initialize step 3 animation after DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStep3Animation);
} else {
    initStep3Animation();
}

// Step 2 Visual Animation: Processing → Workflow → Understanding
const initStep2Animation = () => {
    const visual2 = document.querySelector('[data-visual="2"]');
    if (!visual2) return;
    
    const phases = {
        processing: visual2.querySelector('.phase-processing'),
        workflow: visual2.querySelector('.phase-workflow'),
        understood: visual2.querySelector('.phase-understood')
    };
    
    const workflowSteps = visual2.querySelectorAll('.workflow-step');
    const workflowArrows = visual2.querySelectorAll('.workflow-arrow');
    
    const setPhase = (phaseName) => {
        Object.keys(phases).forEach(key => {
            if (phases[key]) {
                phases[key].classList.toggle('active', key === phaseName);
            }
        });
    };
    
    const resetWorkflow = () => {
        workflowSteps.forEach(step => step.classList.remove('show'));
        workflowArrows.forEach(arrow => arrow.classList.remove('show'));
    };
    
    const showWorkflowSequentially = () => {
        // Steps and arrows appear in sequence
        setTimeout(() => {
            workflowSteps[0]?.classList.add('show');
        }, 200);
        
        setTimeout(() => {
            workflowArrows[0]?.classList.add('show');
        }, 600);
        
        setTimeout(() => {
            workflowSteps[1]?.classList.add('show');
        }, 800);
        
        setTimeout(() => {
            workflowArrows[1]?.classList.add('show');
        }, 1200);
        
        setTimeout(() => {
            workflowSteps[2]?.classList.add('show');
        }, 1400);
    };
    
    const runAnimationCycle = () => {
        // Reset
        resetWorkflow();
        
        // Phase 1: Processing/Thinking (0-2.5s)
        setPhase('processing');
        
        // Phase 2: Workflow Map (2.5-5.5s)
        setTimeout(() => {
            setPhase('workflow');
            showWorkflowSequentially();
        }, 2500);
        
        // Phase 3: Understanding (5.5-9s)
        setTimeout(() => {
            setPhase('understood');
        }, 5500);
    };
    
    // Check if visual is in viewport before animating
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start initial animation
                runAnimationCycle();
                
                // Loop animation every 10 seconds
                const interval = setInterval(() => {
                    if (entry.isIntersecting) {
                        runAnimationCycle();
                    }
                }, 10000);
                
                // Store interval so we can clear it if needed
                visual2.dataset.animationInterval = interval;
            } else {
                // Clear interval when out of view
                if (visual2.dataset.animationInterval) {
                    clearInterval(visual2.dataset.animationInterval);
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(visual2);
};

// Initialize step 2 animation after DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStep2Animation);
} else {
    initStep2Animation();
}

// Step 1 Visual Animation: Mimo Narrating Actions
const initStep1Animation = () => {
    const visual1 = document.querySelector('[data-visual="1"]');
    if (!visual1) return;
    
    const actionCards = visual1.querySelectorAll('.action-card');
    
    const fadeOutAll = async () => {
        actionCards.forEach(card => {
            card.classList.add('fading-out');
        });
        await new Promise(r => setTimeout(r, 400));
        actionCards.forEach(card => {
            card.classList.remove('active', 'completed', 'visible', 'fading-out');
        });
    };
    
    const showAction = async (index) => {
        const card = actionCards[index];
        if (!card) return;
        
        // Make card visible and active
        card.classList.add('visible', 'active');
        
        // Wait while active (highlighted)
        await new Promise(r => setTimeout(r, 1000));
        
        // Keep visible but mark as completed (dim slightly)
        card.classList.remove('active');
        card.classList.add('completed');
    };
    
    const runAnimationCycle = async () => {
        // Fade out all cards smoothly before reset
        await fadeOutAll();
        
        // Small pause
        await new Promise(r => setTimeout(r, 200));
        
        // Show actions one by one, keeping previous ones visible
        for (let i = 0; i < actionCards.length; i++) {
            await showAction(i);
            await new Promise(r => setTimeout(r, 300));
        }
        
        // Pause with all visible before loop
        await new Promise(r => setTimeout(r, 2000));
    };
    
    // Check if visual is in viewport before animating
    let animationRunning = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationRunning) {
                animationRunning = true;
                
                const runLoop = async () => {
                    while (animationRunning) {
                        await runAnimationCycle();
                        await new Promise(r => setTimeout(r, 800));
                    }
                };
                
                runLoop();
            } else if (!entry.isIntersecting) {
                animationRunning = false;
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(visual1);
};

// Initialize step 1 animation after DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStep1Animation);
} else {
    initStep1Animation();
}


// Success Overlay Functions
function showSuccessOverlay() {
    const overlay = document.getElementById('successOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessOverlay() {
    const overlay = document.getElementById('successOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close success overlay on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSuccessOverlay();
    }
});
