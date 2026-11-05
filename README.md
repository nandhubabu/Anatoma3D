# Anatoma3D — Interactive 3D Human Anatomy & Virtual Dissection Platform

A professional, scientifically accurate 3D human anatomy educational platform and virtual surgical studio built with **React**, **Three.js**, **React Three Fiber**, **Tailwind CSS**, and **GLTF/GLB PBR models**. 

**100% Client-Side & Serverless**: Runs completely in the browser with zero backend dependency. Ready to deploy for free on **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 🌟 Key Capabilities & Features

### 1. Dedicated Reference Organ Laboratory: The Human Heart (`/organs/heart`)
- **Mode 1: External 3D View**
  - High-precision anatomical meshes for all 4 cardiac chambers: Right Atrium, Left Atrium, Right Ventricle, Left Ventricle.
  - Great vessels: Ascending Aorta with aortic arch and branch vessels, Superior Vena Cava, Inferior Vena Cava, Pulmonary Trunk, Pulmonary Arteries, and Pulmonary Veins.
  - Coronary Circulation: Left anterior descending (LAD), circumflex branch, right coronary artery, and coronary sinus.
  - Hover highlights, click-to-select, golden amber beacon pins, and multi-angle camera presets.
- **Mode 2: Scalpel / Cut View (Virtual Dissection Mode)**
  - Clean cross-sections across **Sagittal (X)**, **Transverse / Axial (Y)**, and **Coronal (Z)** axes.
  - Interactive cut-depth slider (-1.5 to +1.5) and section flip toggle.
  - Exposes internal cross-sections: Left ventricular thick myocardium (12-15 mm), right ventricular chamber, interventricular and interatrial septa, fibrous valve annuli, papillary muscles, and chordae tendineae (with zero wireframe grid clutter).
- **Mode 3: Deconstruct / Exploded View**
  - Smooth separation of individual cardiac components along anatomically meaningful direction vectors.
  - Continuous 0% to 100% distance slider + One-click "Explode All / Reassemble All".
  - Floating 3D badges pointing to separated parts.
- **Physiological Cardiac Cycle & Conduction Animation**
  - Ventricular systole vs diastole cyclic morphing with play/pause and 0.5x, 1x, 1.5x, 2x speed multipliers.
  - Synchronous valve leaflet action: AV valves (mitral/tricuspid) close during ventricular contraction while semilunar valves (aortic/pulmonary) open.
  - **Dual-circuit Blood Flow Particle Simulation**:
    - **Red arterial blood**: Pulmonary veins → Left Atrium → Mitral valve → Left Ventricle → Aorta → Systemic circulation.
    - **Blue venous blood**: Vena Cava → Right Atrium → Tricuspid valve → Right Ventricle → Pulmonary trunk → Lungs.

---

### 2. Full-Body 3D Exploration (`/explore`)
- Complete interactive 3D human body workspace with layer visibility controls:
  - **Integumentary (Skin)**: Translucent outer silhouette
  - **Muscular System**: Superficial and deep muscle groups
  - **Skeletal System**: Complete bone framework
  - **Circulatory System**: Systemic arterial and venous trees
  - **Nervous System**: Brain, spinal cord, and major nerve pathways
  - **Internal Organs**: Brain, heart, lungs, liver, stomach, kidneys, intestines
- Male / Female model proportion switcher.
- Click any organ or structure to open a direct HUD card linking to its dedicated 3D laboratory.

---

### 3. Dedicated Organ Laboratories
- **Brain (`/organs/brain`)**: Frontal, Parietal, Temporal, Occipital lobes, Cerebellum, Brainstem, Corpus Callosum, and Ventricular System with CSF.
- **Lungs (`/organs/lungs`)**: Trachea with cartilaginous rings, Right Lung (3 lobes), Left Lung (2 lobes with cardiac notch), Bronchial tree, and animated diaphragmatic breathing.
- **Kidneys (`/organs/kidneys`)**: Renal cortex, medullary pyramids, renal pelvis, calyces, ureter, and renal vascular pedicle.
- **Stomach (`/organs/stomach`)**: Cardia, fundus, body, pyloric antrum/canal, and internal mucosal rugae folds.
- **Liver (`/organs/liver`)**: Right lobe, left lobe, falciform ligament, gallbladder with cystic duct, and hepatic portal triad.

---

### 4. Interactive Human Skeleton (`/skeleton`)
- All 206 bones categorized into **Axial** (80 bones) and **Appendicular** (126 bones).
- Bone inspection: Classification (long, short, flat, irregular, sesamoid), joint articulations, anatomical landmarks, and clinical notes.
- Exploded skeleton view with adjustable separation.

---

### 5. Muscular System & Contraction Kinetics (`/muscles`)
- Superficial vs Deep muscular layers.
- Real-time antagonistic muscle contraction animation: Biceps brachii bulges while Triceps brachii elongates; Quadriceps contracts while Hamstrings relax.
- Muscular origin, insertion, action, and somatic nerve innervation.

---

### 6. Systemic Anatomy: 12 Body Systems (`/systems`)
- Cardiovascular, Nervous, Skeletal, Muscular, Respiratory, Digestive, Urinary, Endocrine, Lymphatic, Integumentary, Reproductive, Immune.
- Interactive 3D preview, key functions, primary organs, interrelationships with other systems, clinical notes, and learning objectives.

---

### 7. Learning Center & Quizzes (`/learning` & `/quiz`)
- **Interactive 3D Flashcards**: 3D flip card animation, front prompt, back scientific rationale, and active recall mastery tracking.
- **Adaptive Anatomy Quizzes**: Multi-difficulty questions, instant feedback with detailed anatomical explanations, celebratory confetti, and database-persisted progress tracking.
- **Global Anatomy Search (Ctrl+K)**: Instant in-memory multi-table search across organs, systems, bones, muscles, and subcomponents.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite, React Router v7 |
| **Styling & Theme** | Tailwind CSS v4, Obsidian Titanium Design System, Lucide Icons, Framer Motion |
| **3D Rendering Engine** | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Custom Clipping Shaders |
| **Data & Architecture** | 100% Client-Side Serverless, In-Memory Search, LocalStorage Student Assessment State |
| **CI / CD Deployment** | GitHub Actions Workflow for automated GitHub Pages hosting |

---

## 🚀 Quick Start Guide

### 1. Run with 1 Click
Double-click `start.bat` in the project root:
```bash
start.bat
```

### 2. Manual Start
```bash
cd frontend
npm install
npm run dev
```
Open **`http://127.0.0.1:5173/`** in your browser.

---

## 🌐 Deploy to GitHub Pages

This repository comes pre-configured with a GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment / Source**, select **GitHub Actions**.
4. GitHub will automatically build and publish your live 3D site at `https://<username>.github.io/<repo-name>/`.
