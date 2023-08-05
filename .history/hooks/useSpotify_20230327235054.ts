import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
    const { data: session, status } = useSession();

    return (
        <div>useSpotify</div>
    )
}

export default useSpotify