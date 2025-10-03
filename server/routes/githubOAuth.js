import express from 'express';
import axios from 'axios';

const router = express.Router();

// Step 1: Redirect user to GitHub for login
router.get('/login', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.BACKEND_URL}/api/github/oauth/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
  res.redirect(githubAuthUrl);
});

// Step 2: GitHub callback
router.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ message: 'Code not provided' });

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) throw new Error('No access token received');

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    res.json({ user: userResponse.data, token: accessToken });
  } catch (error) {
    console.error('GitHub OAuth error:', error.message);
    res.status(500).json({ message: 'Server configuration error', details: error.message });
  }
});

export default router;
