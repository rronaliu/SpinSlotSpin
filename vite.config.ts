import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  base: isGithubActions && repoName ? `/${repoName}/` : '/',
  plugins: [react()],
  server: {
    port: 5173,
  }
});
