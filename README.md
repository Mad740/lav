# Auto Lavage Pro

Ce projet est une application web pour un service de lavage automobile, permettant aux clients de réserver des services de lavage en ligne.

## Installation locale

Pour installer et exécuter ce projet localement, suivez ces étapes :

1. Assurez-vous d'avoir Node.js installé sur votre machine (version 14.0.0 ou supérieure recommandée).

2. Clonez ce dépôt sur votre machine locale :
   ```
   git clone [URL_DU_REPO]
   cd auto-lavage-pro
   ```

3. Installez les dépendances :
   ```
   npm install
   ```

4. Lancez le serveur de développement :
   ```
   npm run dev
   ```

5. Ouvrez votre navigateur et accédez à `http://localhost:5173` pour voir l'application en action.

## Déploiement en ligne

Pour déployer cette application en ligne, vous pouvez utiliser plusieurs services. Voici les étapes pour un déploiement sur Netlify :

1. Créez un compte sur [Netlify](https://www.netlify.com/) si vous n'en avez pas déjà un.

2. Depuis votre tableau de bord Netlify, cliquez sur "New site from Git".

3. Choisissez votre dépôt Git (GitHub, GitLab, ou Bitbucket) et sélectionnez le dépôt de ce projet.

4. Dans les paramètres de build, utilisez les configurations suivantes :
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Cliquez sur "Deploy site".

Netlify va maintenant construire et déployer votre site. Une fois terminé, il vous fournira une URL où votre site est accessible.

## Fonctionnalités

- Page d'accueil présentant les services de lavage
- Page de services détaillant chaque offre
- Système de réservation en ligne
- Interface d'administration pour gérer les réservations

## Technologies utilisées

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React pour les icônes

## Contribution

Les contributions à ce projet sont les bienvenues. N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.