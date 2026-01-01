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
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
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

