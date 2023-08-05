import React from 'react';
import { useSession } from "next-auth/react";
import Image from "next/image";
import {useEffect, useState} from "react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from "recoil";
import { artistIdsState } from "../atoms/artistAtom";
import { trackIdsState } from "../atoms/trackAtom";


function Info() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);

  const [artistIds, setArtistIds] = useRecoilState(artistIdsState);
  const [trackIds, setTrackIds] = useRecoilState(trackIdsState);


  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopArtists({limit: 10}).then((data) => {
        setTopArtists(data.body.items);
      });
      spotifyApi.getMyTopTracks({limit: 10}).then((data) => {
        setTopTracks(data.body.items);
      });
        

    }

    const artIds:string[] = [];
    const trackIds:string[] = [];
    
    topArtists.forEach((artist) => (
      artIds.push(artist.id) 
    ));
    topTracks.forEach((track) => (
      trackIds.push(track.id) 
    ));

    setArtistIds(artIds)
    setTrackIds(trackIds)



  }, [session, spotifyApi]);

  {/*console.log(topArtists)*/}

  console.log(artistIds)
  console.log(trackIds)

  return (
    <div className="m-10">
      <div>
        <p className="p-5 text-xl">Your Current Top Artists:</p>
        <div className="overflow-x-scroll flex justify-center items-center bg-slate-900 lg:bg-black rounded-lg">
        <div className="flex space-x-10 lg:space-x-20 p-4 w-[500px] lg:w-full">
          {topArtists.map((artist) => (
            <div key={artist.id} className="flex flex-col flex-wrap items-center"> {/* overflow-scroll w-screen --add if increase artists to 10*/}
              <div className="h-20 w-20 relative">
                <Image className="rounded-full" src={artist.images?.[0]?.url} alt="" fill/>
              </div>
              <p className="">{artist.name}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
      <div className="">
        <p className="p-5 text-xl">Your Current Top Tracks:</p>
        <div className="overflow-x-scroll flex justify-center items-center bg-slate-900 lg:bg-black rounded-lg">
        <div className="flex space-x-10 p-4 w-[500px] lg:w-full">
          {topTracks.map((track) => (
            <div key={track.id} className="flex flex-col flex-wrap items-center">
              <p>{track.artists?.[0]?.name}:</p>
              <p className=" text-teal-600">{track.name}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

/*interface InfoProps {
  setArtistIds: string[]
}*/

export default Info