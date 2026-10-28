# ATOMVERSE

ATOMVERSE is a static, browser-based science experience for exploring atoms, probability clouds, orbitals, VSEPR molecular shapes, and chemical bonding. It uses Vite and Three.js; no account, API key, paid service, or backend is needed.

## Run it on your computer

1. Install Node.js 20.19+ or 22.12+ from [nodejs.org](https://nodejs.org/).
2. Open a terminal in this project folder.
3. Install packages: `npm install`
4. Start the local site: `npm run dev`
5. Open the local address printed in the terminal (usually `http://localhost:5173`).

To stop the local server, focus its terminal and press **Ctrl+C**.

## Make a production build

Run `npm run build`. Vite writes the finished static site to `dist/`.

## Deploy to Netlify

1. Push this project to a GitHub, GitLab, or Bitbucket repository, or use Netlify's manual deploy flow after building.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Set **Build command** to `npm run build` and **Publish directory** to `dist` (these are also recorded in `netlify.toml`).
4. Deploy. Netlify installs the package dependencies and builds the static site. No environment variables are required.

For a manual deploy, run `npm install` and `npm run build`, then drag the generated `dist` folder into Netlify's deploy area.

## Controls and learning notes

- Drag the 3D model to rotate; use the wheel or pinch to zoom; choose **Reset view** to restore the camera.
- On Atomic Explorer, particle counters update element identity, mass number, and net charge. The Bohr-style shell view is explicitly a simplified teaching picture.
- Electron Cloud Lab samples the hydrogen 1s radial probability distribution with a Gamma-distributed radius and random directions. Each dot is a sample, not a moving electron.
- Orbital family views show illustrative angular point distributions. Radial structure is simplified.
- VSEPR views label lone pairs separately from atoms. Bond angles are approximate textbook values.
- Chemical bonding models are conceptual. Solid NaCl is described as an ionic lattice.

## Troubleshooting

- **The page is blank:** run `npm install` again, then `npm run dev`; check the terminal for an error.
- **3D does not appear:** update your browser and enable hardware acceleration/WebGL. A fallback note appears if WebGL setup fails.
- **The dev server port is in use:** Vite prints another available local address; use that one.
- **Netlify build fails:** confirm Node.js 20.19+ or 22.12+ is selected in Netlify and that its build command and publish directory match the values above.

## Current scope

The element selector includes the first 20 elements and several commonly explored heavier elements. Orbital d visualization is a simplified dxy-like angular sample, not a full radial orbital calculation. Molecular and bonding views are educational models rather than quantum-chemical simulations.
