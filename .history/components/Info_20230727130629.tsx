import { useSession } from "next-auth/react";
import Image from "next/image";
import {useEffect, useState} from "react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from "recoil";
import { artistIdsState } from "../atoms/artistAtom";


function Info() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);

  const [artistIds, setArtistIds] = useRecoilState(artistIdsState);


  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopArtists({limit: 5}).then((data) => {
        setTopArtists(data.body.items);
      });
      spotifyApi.getMyTopTracks({limit: 10}).then((data) => {
        setTopTracks(data.body.items);
      });
        

    };

    const artIds:string[] = [];
    
    topArtists.forEach((artist) => (
      artIds.push(artist.id) 
    ));

    setArtistIds(artIds)



  }, [session, spotifyApi]);

  console.log(topArtists)

  console.log(artistIds)

  return (
    <div className="m-10">
      <div>
        <p className="p-5 text-xl">Your Top Artists:</p>
        <div className="flex flex-grow items-center space-x-20 p-4 justify-center">
          {topArtists.map((artist) => (
            <div key={artist.id} className="flex flex-col items-center"> {/* overflow-scroll w-screen --add if increase artists to 10*/}
              <div className="h-20 w-20 relative">
                <Image className="rounded-full" src={artist.images?.[0]?.url} alt="" fill/>
              </div>
              <p className="">{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="p-5 text-xl">Your Top Tracks:</p>
        <div className="flex flex-grow items-center space-x-10 p-4 bg-slate-700">
          {topTracks.map((track) => (
            <div key={track.id} className="flex flex-col flex-wrap items-center">
              <p>{track.artists?.[0]?.name}:</p>
              <p className="">{track.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/*interface InfoProps {
  setArtistIds: string[]
}*/

export default Info