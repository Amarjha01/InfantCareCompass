export default function githubLoginRedirect(req, res) {
  const redirect_uri = `${process.env.VITE_API_BASE_URL}/api/auth/github/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user:email`;
  
  res.redirect(githubAuthUrl);
}
