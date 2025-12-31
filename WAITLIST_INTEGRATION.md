# Waitlist Integration Guide

This guide will help you connect your Mimo.AI waitlist form to an email collection service.

## 🚀 Quick Integration Options

### Option 1: Google Sheets (Free & Easy)

1. Create a Google Form with Name and Email fields
2. Get the form action URL
3. Update `script.js` waitlist submission to post to Google Sheets

**Implementation:**
```javascript
// In script.js, replace the TODO section with:
const response = await fetch('YOUR_GOOGLE_FORM_URL', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
        'entry.YOUR_NAME_FIELD_ID': name,
        'entry.YOUR_EMAIL_FIELD_ID': email
    })
});
```

### Option 2: Mailchimp (Popular)

1. Sign up for Mailchimp
2. Create an audience
3. Get your API key and audience ID
4. Create a simple backend endpoint or use Mailchimp's form

**Implementation:**
```javascript
const response = await fetch('YOUR_BACKEND_ENDPOINT/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
});
```

### Option 3: ConvertKit (Creator-Focused)

1. Sign up for ConvertKit
2. Create a form
3. Get the form embed code or API key
4. Update the submission endpoint

**Implementation:**
```javascript
const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        api_key: 'YOUR_API_KEY',
        email: email,
        first_name: name
    })
});
```

### Option 4: Netlify Forms (If hosting on Netlify)

1. Add `netlify` attribute to form
2. Add hidden input with form name
3. Netlify automatically collects submissions

**Implementation:**
```html
<!-- In index.html, update the form tag: -->
<form class="waitlist-form" id="waitlistForm" name="waitlist" method="POST" netlify>
    <input type="hidden" name="form-name" value="waitlist">
    <!-- rest of form -->
</form>
```

### Option 5: Custom Backend

Create a simple backend endpoint:

**Node.js/Express Example:**
```javascript
app.post('/api/waitlist', async (req, res) => {
    const { name, email } = req.body;
    
    // Validate email
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    
    // Save to your database
    await db.collection('waitlist').insertOne({
        name,
        email,
        timestamp: new Date(),
        source: 'landing_page'
    });
    
    // Send confirmation email (optional)
    await sendEmail({
        to: email,
        subject: 'You\'re on the Mimo.AI Waitlist!',
        html: `<h1>Thanks ${name}!</h1><p>We'll notify you when we launch.</p>`
    });
    
    res.json({ success: true });
});
```

## 📧 Email Service Providers Comparison

| Service | Free Plan | Ease of Use | Features |
|---------|-----------|-------------|----------|
| **Google Sheets** | ✅ Unlimited | ⭐⭐⭐⭐⭐ | Basic collection |
| **Mailchimp** | ✅ 500 contacts | ⭐⭐⭐⭐ | Full email marketing |
| **ConvertKit** | ✅ 1,000 subscribers | ⭐⭐⭐⭐ | Creator-focused |
| **Buttondown** | ✅ 1,000 subscribers | ⭐⭐⭐⭐⭐ | Simple newsletter |
| **Sendinblue** | ✅ Unlimited contacts | ⭐⭐⭐ | Marketing automation |
| **EmailOctopus** | ✅ 2,500 subscribers | ⭐⭐⭐⭐ | Affordable |

## 🔒 Security Best Practices

1. **Never expose API keys in frontend JavaScript**
   - Use a backend endpoint to make API calls
   - Keep API keys in environment variables

2. **Validate email addresses**
   - Use proper email validation regex
   - Consider email verification

3. **Add CAPTCHA protection**
   - Prevents spam submissions
   - Google reCAPTCHA or hCaptcha

4. **Rate limiting**
   - Limit submissions per IP address
   - Prevent abuse

## 📊 Analytics Integration

Track waitlist signups with Google Analytics:

```javascript
// Already included in the code!
if (typeof gtag !== 'undefined') {
    gtag('event', 'waitlist_signup', {
        'event_category': 'engagement',
        'event_label': email
    });
}
```

Don't forget to add Google Analytics to your `index.html`:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 Social Proof

The waitlist counter (`500+`) is currently static. To make it dynamic:

1. Store count in your database
2. Create an API endpoint to fetch current count
3. Update on page load:

```javascript
// Add to script.js
async function updateWaitlistCount() {
    try {
        const response = await fetch('YOUR_API_ENDPOINT/waitlist/count');
        const data = await response.json();
        document.getElementById('waitlist-count').textContent = data.count + '+';
    } catch (error) {
        console.error('Failed to load waitlist count');
    }
}

// Call on page load
updateWaitlistCount();
```

## ✉️ Confirmation Email Template

Send this to users who join the waitlist:

```
Subject: You're on the Mimo.AI Waitlist! 🐵

Hi [Name],

Thanks for joining the Mimo.AI waitlist!

You're now one of the first to know when we launch our AI-powered browser automation Chrome extension.

Here's what happens next:
✅ We'll email you when we launch (Q1 2025)
✅ You'll get early access before the public
✅ Special lifetime discount for early adopters
✅ Opportunity to shape features before launch

In the meantime, follow us on Twitter @MimoAI for updates and sneak peeks!

Questions? Just reply to this email.

Thanks,
The Mimo.AI Team

P.S. Know someone who spends hours on repetitive browser tasks? Share Mimo.AI with them: https://mimo.ai
```

## 🎯 Next Steps

1. Choose an email service provider from above
2. Sign up and get your API credentials
3. Update the `script.js` file with your endpoint
4. Test the submission thoroughly
5. Set up welcome email automation
6. Add Google Analytics tracking
7. Consider adding reCAPTCHA for spam protection

## 🆘 Need Help?

Check out these resources:
- [Mailchimp API Docs](https://mailchimp.com/developer/)
- [ConvertKit API Docs](https://developers.convertkit.com/)
- [Google Sheets Form Tutorial](https://www.youtube.com/results?search_query=google+sheets+form)

---

Good luck with your launch! 🚀

