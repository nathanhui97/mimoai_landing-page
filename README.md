# Mimo.AI - Browser Automation Made Simple

![Mimo.AI Logo](https://img.shields.io/badge/🐵-Mimo.AI-ff6b35?style=for-the-badge)

**Monkey See, Monkey Do** - Turn repetitive browser tasks into reusable, intelligent workflows.

## 🎯 What is Mimo.AI?

Mimo.AI is an AI-powered Chrome Extension that transforms repetitive browser tasks into reusable, intelligent workflows. It's designed to make browser automation accessible to everyone—**no coding required**.

### The Core Problem We Solve

Every day, people perform the same repetitive tasks in their browsers:
- Filling out forms with similar information
- Navigating through multi-step processes
- Entering data into spreadsheets or databases
- Completing routine workflows across different websites

Traditional automation tools require technical knowledge, break when websites change, and don't understand context. **Mimo.AI solves this** by using AI to understand what you're doing and create smart, self-healing workflows.

---

## 💡 Core Value Proposition

**"Turn repetitive browser tasks into reusable Micro-Apps instantly."**

Watch yourself perform a task once, and Mimo.AI creates an intelligent form interface that lets you repeat that task with different data—even when websites update their UI.

---

## 🚀 How It Works

### 1. **Record** (The "Teach" Phase)

- Click "Start Recording" in the extension sidepanel
- Perform your task naturally in the browser:
  - Click buttons, fill forms, navigate pages
  - The extension captures everything: clicks, inputs, navigation, context
- Click "Stop Recording" when done

**What happens behind the scenes:**
- Records all user interactions (clicks, inputs, keyboard, navigation)
- Captures semantic context (labels, placeholders, surrounding text)
- Takes visual snapshots for AI understanding
- Generates stable selectors with multiple fallback options
- Detects wait conditions automatically

### 2. **Analyze** (The "Build" Phase)

- AI automatically analyzes your recorded workflow
- Detects which values should be variables (e.g., "Acme Corp" → Client Name field)
- Creates a dynamic form schema with appropriate input types
- Translates steps into natural language descriptions
- Validates and improves selectors proactively

**What happens behind the scenes:**
- Variable detection using AI vision analysis
- Natural language translation of workflow steps
- Selector validation and improvement
- Navigation optimization (removes unnecessary steps)
- Workflow intent analysis

### 3. **Execute** (The "Run" Phase)

- See your workflow in the library
- Click to open a clean, dynamically generated form
- Fill in new values for the detected variables
- Click "Execute" to run the automation

**What happens behind the scenes:**
- Navigates to the starting URL
- Finds elements using 9 different strategies (semantic matching, AI recovery)
- Fills in form data with your new values
- Handles wait conditions and page transitions
- Adapts to UI changes using AI-powered element recovery
- Completes the entire workflow automatically

---

## ✨ Key Features

### 🎯 No Coding Required
Simply perform your task once. Mimo.AI watches, learns, and creates reusable workflows automatically. Perfect for non-technical users.

### 🔄 Self-Healing Automation
Unlike traditional tools that break when websites update, Mimo.AI uses AI to adapt to UI changes and find elements intelligently using **9 different element-finding strategies**.

### 📝 Smart Form Generation
Automatically detects variables in your workflow and creates beautiful, dynamic forms with appropriate input types.

### 🧭 Semantic Understanding
Captures context like labels, placeholders, and surrounding text to understand what each step means, not just what it does.

### 🎨 Visual AI Analysis
Takes visual snapshots during recording to help AI understand page structure and improve element detection accuracy.

### 📚 Workflow Library
Save, organize, and reuse your automations. Build a library of Micro-Apps for all your repetitive tasks.

---

## 🎪 Perfect Use Cases

### 📋 Form Filling
Stop filling out the same forms repeatedly. Record once, then use a simple form to populate any similar form with different data.

**Example:** Client intake forms, job applications

### 🔄 Data Entry
Enter data into spreadsheets, databases, or CRM systems with ease. Mimo.AI handles multi-step processes automatically.

**Example:** Updating customer records, inventory management

### 🌐 Multi-Site Workflows
Navigate through complex, multi-step processes across different websites without losing your place or context.

**Example:** Research workflows, price comparisons

### 📊 Report Generation
Create reports by navigating through multiple systems and collecting data automatically—all with custom parameters.

**Example:** Weekly reports, analytics gathering

### 🛒 E-commerce Tasks
Update product listings, process orders, or manage inventory across multiple platforms with automated workflows.

**Example:** Product updates, order processing

### ✅ Testing & QA
Test web applications with different data sets. Create test scenarios that adapt to UI changes automatically.

**Example:** User flow testing, regression testing

---

## 🆚 Mimo.AI vs Traditional Automation

### ❌ Traditional Automation Tools

- **Require Technical Knowledge** - Most tools need coding skills or complex configurations
- **Break When Sites Change** - Brittle selectors fail when websites update their UI
- **Don't Understand Context** - Can't adapt to variations or understand what actions mean

### ✅ Mimo.AI Changes Everything

- **Zero Technical Skills Needed** - Just show Mimo.AI what to do—no coding, no setup
- **Self-Healing Automation** - AI adapts to UI changes using 9 different recovery strategies
- **Semantic Understanding** - Understands meaning and context, not just DOM elements

---

## 🏗️ Technical Architecture

### Element Detection Strategies (9 Layers)

1. **Exact Selector Match** - Uses recorded selector first
2. **Semantic Text Match** - Finds by label/placeholder text
3. **Visual Position Match** - Uses visual snapshots for positioning
4. **Attribute Similarity** - Matches based on similar attributes
5. **XPath Fallback** - Generated XPath selectors
6. **CSS Selector Fallback** - Multiple CSS selector options
7. **Text Content Search** - Searches by visible text content
8. **AI Vision Recovery** - Uses AI to understand page visually
9. **Context-Based Recovery** - Uses surrounding elements for context

### Workflow Components

```
Recording Phase:
  ├── User Interaction Capture
  ├── Semantic Context Extraction
  ├── Visual Snapshot Generation
  ├── Selector Generation (with fallbacks)
  └── Wait Condition Detection

Analysis Phase:
  ├── AI Variable Detection
  ├── Form Schema Generation
  ├── Natural Language Translation
  ├── Selector Validation & Improvement
  └── Navigation Optimization

Execution Phase:
  ├── URL Navigation
  ├── Multi-Strategy Element Finding
  ├── Dynamic Value Substitution
  ├── Wait Condition Handling
  └── AI-Powered Recovery
```

---

## 🚀 Join the Waitlist

**Mimo.AI is launching soon!** We're currently in development and will be launching in Q1 2025.

### Get Early Access

1. Visit [mimo.ai](https://mimo.ai) (your landing page)
2. Join the waitlist by entering your name and email
3. Get notified when we launch
4. Receive exclusive early adopter benefits:
   - ⚡ Early access before public launch
   - 🎁 Exclusive perks and features
   - 💬 Influence product development
   - 🏆 Lifetime discount on premium plans

### Coming Soon Features

- ✅ One-click recording of browser workflows
- ✅ AI-powered variable detection
- ✅ Self-healing automation (adapts to UI changes)
- ✅ Beautiful auto-generated forms
- ✅ Workflow library and management
- 🔜 Workflow sharing marketplace
- 🔜 Team collaboration
- 🔜 API access

---

## 📊 Roadmap

- [x] Core recording functionality
- [x] AI-powered variable detection
- [x] Self-healing selectors
- [x] Form generation
- [ ] Workflow sharing marketplace
- [ ] Team collaboration features
- [ ] API access for developers
- [ ] Integration with popular tools (Zapier, Make, etc.)
- [ ] Advanced scheduling options
- [ ] Cloud workflow sync

---

## 🤝 Contributing

We welcome contributions! Whether it's:
- Reporting bugs
- Suggesting features
- Improving documentation
- Sharing your workflows

Join our community and help make browser automation accessible to everyone!

---

## 📧 Support

- **Email:** support@mimo.ai
- **Discord:** [Join our community]
- **Documentation:** [docs.mimo.ai]
- **Twitter:** [@MimoAI]

---

## 📄 License

Mimo.AI Chrome Extension is proprietary software. See LICENSE for details.

---

## 🐵 About the Name

**Mimo** = Mimic Monkey

Just like a monkey learns by watching and imitating, Mimo.AI learns from watching you perform tasks once and then mimics those actions with new data. It's automation inspired by nature's best learners!

---

## 🎨 Landing Page

This repository contains the landing page for Mimo.AI built with:
- Modern, responsive HTML5
- CSS3 with custom properties and animations
- Vanilla JavaScript for interactivity
- Orange primary color theme (representing the monkey mascot)
- **Waitlist functionality** to collect early adopter emails

### Running the Landing Page Locally

```bash
# Option 1: Simple HTTP server
npm install -g serve
npm start

# Option 2: Live reload server
npm install -g live-server
npm run dev

# Option 3: Open directly
# Simply open index.html in your browser
```

### Waitlist Integration

The landing page includes a fully functional waitlist form. To connect it to your email service:

1. Check out `WAITLIST_INTEGRATION.md` for detailed integration guides
2. Choose an email service (Mailchimp, ConvertKit, Google Sheets, etc.)
3. Update the API endpoint in `script.js`
4. Test thoroughly before going live

Popular options:
- **Google Sheets** - Free, easy, no coding required
- **Mailchimp** - Full-featured email marketing (500 free contacts)
- **ConvertKit** - Creator-focused (1,000 free subscribers)
- **Netlify Forms** - Built-in if hosting on Netlify

See `WAITLIST_INTEGRATION.md` for complete setup instructions!

### Project Structure

```
mimoai_landingpage/
├── index.html                  # Main HTML file with waitlist form
├── styles.css                  # All styles and responsive design
├── script.js                   # JavaScript functionality & form handling
├── package.json                # Project configuration
├── README.md                   # This file (product overview)
└── WAITLIST_INTEGRATION.md     # Email service integration guide
```

---

**Made with ❤️ and 🐵 by the Mimo.AI Team**

*Monkey see, monkey do—automation for everyone!*
