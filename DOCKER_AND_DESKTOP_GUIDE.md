# Deployment & Delivery Guide: Docker & Windows Desktop Edition

This GRC application is fully optimized to run in two versatile delivery form factors:
1. **Docker Container Deployment** (for central server hosting)
2. **Native Windows Desktop Installer** (using Electron, fully compatible with Windows 10/11)

---

## Part 1: Running via Docker

The root level contains a fully production-optimized multi-stage `Dockerfile`.

### Steps for Build & Local Run:
1. **Install Docker Desktop** on your device of choice.
2. **Build the GRC Image**:
   ```bash
   docker build -t grc-platform:latest .
   ```
3. **Run the Container**:
   ```bash
   docker run -d -p 3000:3000 --name grc-instance grc-platform:latest
   ```
4. Access the platform by opening `http://localhost:3000` in your web browser.

---

## Part 2: Building the Windows Desktop App (.exe)

This project contains `/main-electron.cjs` so that you can compile it as a native Windows application with a single bundle command.

### Compilation Steps on a Windows Machine:

1. **Build the production assets**:
   Ensure you run the Vite production build so that `/dist/` contains the static files.
   ```bash
   npm run build
   ```

2. **Install Electron development dependencies**:
   ```bash
   npm install --save-dev electron electron-builder
   ```

3. **Configure `package.json` for Electron packaging**:
   Add the following properties to your `package.json` file:
   ```json
   {
     "main": "main-electron.cjs",
     "build": {
       "appId": "com.grc.voice.platform",
       "productName": "Agentic Voice GRC Platform",
       "directories": {
         "output": "dist-desktop"
       },
       "files": [
         "dist/**/*",
         "main-electron.cjs",
         "package.json"
       ],
       "win": {
         "target": "nsis"
       }
     }
   }
   ```

4. **Add Packaging Scripts**:
   Add these short commands inside the `"scripts"` field of your `package.json`:
   ```json
   "scripts": {
     "desktop:start": "electron .",
     "desktop:build": "electron-builder --win --x64"
   }
   ```

5. **Generate the Windows Installer (.exe)**:
   Run the following packaging command:
   ```bash
   npm run desktop:build
   ```

Once completed, a brand-new native installer `Agentic Voice GRC Platform Setup.exe` will be generated inside the `/dist-desktop` directory!

---

## Part 3: Firebase Connectivity & Fallback Logic

- **Continuous Firebase Synchronization**: When logged in using **Google Connect** (available in the *Integrations & Setup* tab), all risk logs, controls, audits, findings, approvals, and immutable ledger chains are synced continuously in real-time with Google Cloud FireStore.
- **Air-Gapped Offline Fallback**: In case of lost connectivity or no authentication setup, the application automatically triggers the local LLM simulation fallback and uses local localStorage state to satisfy your compliance workflows smoothly.
