import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, {LOGIN_URL} from "../../../lib/spotify";

// refresh token function 
async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);
        const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, //=1 hour as spotify api returns 3600
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken, //only replace if new refersh token exists
        }
    }
    catch (error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

// NextAuth 
export default NextAuth({
    // configure one or more auth providers 
    providers: [
        SpotifyProvider({
          clientId: process.env.SPOTIFY_CLIENT_ID,
          clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
          authorization: LOGIN_URL,
        }),
        // where you'd add more providers  
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    }, 
    callbacks: {
        async jwt({token, account, user}) {
            // initial signin
            if (account && user) {
                return {
                    ...token, 
                    accessToken: account.access_token, 
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                };
            }
            //if access token hasn't expired yet then return previous token 
            if (Date.now() < token.accessTokenExpires) {
                console.log("existing access token still valid")
                console.log(token.accessToken)
                return token;
            }

            // else: access token is expired --> need to refresh 
            console.log("access token expired, refreshing...")
            return await refreshAccessToken(token);
        },
        async session({session, token}) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;
            
            return session;
        },

    },

})