# 📚 MindMesh - Flashcard Learning System

A simple, offline-first web application for creating and reviewing flashcards. Features user authentication and local data storage—no backend or internet connection required after initial load.

## 🚀 Quick Start (No Download Required!)

**Try it online instantly:**

👉 **[https://hydro08.github.io/mindmeshproj/](https://hydro08.github.io/mindmeshproj/)**

Just click the link above to start using the app immediately on any device (desktop or mobile). No installation needed!

## ✨ Features

- 🔐 **User Authentication** - Secure local login system with encrypted passwords
- 🗂️ **Deck Management** - Create, edit, and delete flashcard decks organized by subject
- 📝 **Flashcard Creation** - Add questions and answers to build your study sets
- 🎯 **Study Mode** - Review flashcards with reveal answer functionality
- 💾 **Auto-Save** - All changes are automatically saved to your browser's local storage
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔒 **Privacy-Focused** - All data stays on your device, nothing is sent to servers

## 🔐 Getting Started

### First Time Users

1. Visit the application
2. Click "Don't have an account yet?"
3. Enter a username and password
4. Confirm your password
5. Click "REGISTER"

### Returning Users

1. Enter your credentials
2. Click "LOGIN"
3. Access your dashboard

⚠️ **Important**: User accounts are stored locally in your browser. Different browsers or devices require separate registration.

## 🖥️ Desktop Setup & Usage

### ⚡ Easiest Way: Use Online Version

**No setup needed!** Just visit:
**[https://hydro08.github.io/mindmeshproj/](https://hydro08.github.io/mindmeshproj/)**

Works on any desktop browser instantly. Bookmark it for easy access!

### 💻 Local Setup (For Developers or Offline Use)

Only follow these steps if you want to modify the code or run it completely offline:

**Using VS Code + Live Server (Recommended)**

1. **Install VS Code** (if you don't have it)
   - Download from [code.visualstudio.com](https://code.visualstudio.com)

2. **Install Live Server Extension**
   - Open VS Code
   - Click the Extensions icon (or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search for "Live Server" by Ritwick Dey
   - Click "Install"

3. **Open the Project**
   - In VS Code: File → Open Folder
   - Select the **mindmeshproj** folder

4. **Launch the App**
   - Right-click on `index.html` in the file explorer
   - Select "Open with Live Server"
   - Your default browser will open with the app running

⚠️ **Important**: Always use Live Server. Do not double-click HTML files directly as this may cause functionality issues.

## 📱 Mobile Setup & Usage

### ⚡ Use Online Version

**No setup needed!** Just open your mobile browser and visit:
**[https://hydro08.github.io/mindmeshproj/](https://hydro08.github.io/mindmeshproj/)**

Works on both iOS and Android.

### Mobile Usage Tips

- **Create Deck**: Tap the "Create Deck" button
- **Navigation**: Use the hamburger menu (☰) to access options
- **Flashcards**: Tap "REVEAL ANSWER" to see the answer
- **Landscape Mode**: For now, use portrait mode for smoother viewing and layout.

## 📖 How to Use

### Creating Your First Deck

1. Log in to your account
2. Click/Tap **"Create New Deck"** from the dashboard
3. Enter a subject/deck name (e.g., "Biology", "Spanish")
4. Click/Tap **"CREATE DECK"**

### Adding Flashcards

1. Click/Tap on your newly created deck
2. Click/Tap **"Create Flashcard"**
3. Enter your question (e.g., "What is photosynthesis?")
4. Enter your answer (e.g., "The process by which plants...")
5. Click/Tap **"ADD CARD"** to save
6. Repeat for more cards!

### Studying Your Cards

1. Open a deck from the dashboard
2. Read the question on the front of the card
3. Try to recall the answer
4. Click/Tap **"REVEAL ANSWER"** to check
5. Use navigation buttons to move between cards
6. Click **"BACK"** to flip back to the question

### Managing Your Decks

- **Edit Deck**: Click the options menu (⋮) on a deck card
- **Delete Deck**: Select delete from the options menu
- **View Details**: Click anywhere on the deck card to open

## ⚠️ Important Notes

### Data Storage

- All data is stored in your **browser's localStorage**
- **User accounts** and **flashcards** are stored locally
- Data is **device and browser specific**:
  - Switching browsers (Chrome → Firefox) = separate data
  - Switching devices (Desktop → Mobile) = separate data
  - Incognito/Private mode = temporary storage (lost when closed)

### Data Persistence

- ✅ Data persists between sessions on the same browser
- ✅ Data survives browser restarts
- ❌ Data is lost if you:
  - Clear browser data/cache
  - Uninstall the browser
  - Use a different browser or device

### Security Note

Passwords are stored locally using browser encryption. For maximum security:

- Use unique passwords for this app
- Don't use sensitive personal passwords
- Remember that data is only as secure as your device

## 🛠️ Troubleshooting

### Login Issues

**Problem**: Forgot password

- **Solution**: No password recovery available. You'll need to create a new account or clear localStorage to reset.

**Problem**: Can't log in with correct credentials

- **Solution**: Check if you're using the same browser. Try clearing cache and re-registering.

### Data Issues

**Problem**: Lost all my flashcards

- **Solution**: Check if you accidentally cleared browser data. Check localStorage in console. No cloud backup available.

**Problem**: Flashcards not saving

- **Solution**: Ensure JavaScript is enabled. Check browser console for errors. Verify localStorage is not disabled.

### Reset All Data

If you need to start fresh:

1. Open browser console:
   - **Desktop**: Press `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`
   - **Mobile**: Use browser's developer tools option
2. Type: `localStorage.clear()`
3. Press Enter
4. Refresh the page

## 🎯 Pro Tips

- **Regular Review**: Study flashcards daily for better retention
- **Organize Decks**: Create separate decks for different subjects
- **Mobile Learning**: Add app to home screen for quick access
- **Backup Important Data**: Screenshot or manually record critical flashcards
- **Study Technique**: Test yourself before revealing answers
- **Active Recall**: Try to answer before flipping the card

## 📋 System Requirements

- **Desktop**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **Mobile**: iOS Safari 12+, Chrome for Android 70+
- **JavaScript**: Must be enabled
- **Storage**: Minimal (varies based on number of flashcards)
- **Internet**: Required for initial load (CDN resources), offline after

## 🤝 Credits & Contributors

Developed by:

- Ace Gabriel Balidio
- Razel Borja
- Jessie Herrera
- Justine Minaño
- Jemboy Mandawe
- Darwin Sumait
- Shan Boongaling
- Jaybee Condesa
- Justine Competente
- Sean Patrick Cabanela

## 📄 License

This project is for educational purposes.

**Happy Learning! 📚✨**

Remember: The key to effective learning is consistent review. Make flashcard review part of your daily routine!
