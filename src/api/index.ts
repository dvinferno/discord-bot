import { Elysia } from "elysia";
<<<<<<< HEAD
import { oauth2 } from "elysia-oauth2";
import { cors } from '@elysiajs/cors';

const port = Bun.env.API_PORT
const app = new Elysia()
  .use(
    oauth2({
      Discord: [
        Bun.env.APP_ID!,
        Bun.env.CLIENT_SECRET!,
        Bun.env.DISCORD_REDIRECT_URI!,
      ]
    })
  )

  .use(cors({
    origin: 'http://localhost:4321', // Allow requests from your Astro app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies or authorization headers
  }))

app.get('/', () => 'Hello');

// @ts-ignore
app.get('/auth/discord', async ({ oauth2, redirect, cookie: { oauth_state } }) => {
  try {
    const state = crypto.randomUUID();
    const url = oauth2.createURL("Discord", ["identify", "email"]);

    oauth_state.set({
      value: state,
      httpOnly: true,
    })

    return redirect(url.href)
  } catch (err) {
    console.error("Error generating Discord OAuth2 URL:", err);
    return "Failed to initiate authentication."
  }
})

// @ts-ignore
app.get('/auth/callback', async ({ oauth2, redirect, cookie: { auth_token, refresh_token } }) => {

  try {
    const tokens = await oauth2.authorize("Discord");
    const accessToken = tokens.accessToken();
    const refreshToken = tokens.refreshToken();

    auth_token.set({
      value: accessToken,
      httpOnly: true,
    })

    refresh_token.set({
      value: refreshToken,
      httpOnly: true,
    })

    return redirect('http://localhost:4321/');
  } catch (err) {
    console.error("Authorization error:", err);
    return "Failed to authorize."
  }

});

app.get('/auth/validate', async ({ cookie, error }) => {
  const accessToken = cookie.auth_token?.value;
  const refreshToken = cookie.refresh_token?.value;

  if (!accessToken) {
    return error(401, "Not authenticated.");
  }

  try {
    // Validate token using Discord API
    const response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    const user = await response.json();
    return { authenticated: true, user };
  } catch (err) {
    console.error("Validation error:", err);
  }
});

app.get('/logout', ({ cookie: { auth_token, refresh_token }, redirect }) => {
  auth_token.remove()
  refresh_token.remove()
  return redirect('http://localhost:4321/'); // Redirect to homepage or login
});

app.get('/dashboard', async ({ cookie, error }) => {
  const accessToken = cookie.auth_token.value;
  const refreshToken = cookie.refresh_token.value;
  return { accessToken, refreshToken }
});

app.listen(port!)
=======

const app = new Elysia().get("/", () => "Hello Elysia").listen(3002);
>>>>>>> 5723dd4 (added Elysia)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
