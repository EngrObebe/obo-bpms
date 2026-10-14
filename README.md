# OBO-BPMS Santo Tomas

Building Permit Management System of the Office of the Building Official, Municipality of Santo Tomas, La Union.

Live app: https://engrobebe.github.io/obo-bpms/

- `index.html` — the app (built from the office source; contains no permit records or personal data).
- `sw.js`, `manifest.webmanifest`, `icon-*.png` — offline use, automatic updates and "Add to Home Screen".
- `vendor/` — Firebase Web SDK 10.12.2 (Auth and Firestore).
- `firestore.rules` — database security rules (copy into Firebase console → Firestore → Rules).

Permit records, applications, photos and other personal data are stored in the office Firebase database and are never committed here. Access is limited to staff accounts listed in the security rules.
