import {useSession} from "next-auth/react"
import {useEffect, useState} from "react";
import useSpotify from '../hooks/useSpotify';
import { artistIdsState } from "../atoms/artistAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import Image from 'next/image'

function Recommend() {
  const spotifyApi = useSpotify();
  const {data:session} = useSession();
  const artistIds = useRecoilValue(artistIdsState);
  const [playlist1, setPlaylist1] = useState<SpotifyApi.RecommendationTrackObject[]>();
  const [playlist2, setPlaylist2] = useState<SpotifyApi.RecommendationTrackObject[]>();

  console.log(artistIds)

  /*useEffect(() => {
    if (artistIds) {
      spotifyApi.getRecommendations({
        seed_artists: artistIds,
        max_popularity: 50
      }).then((data) => {
        setPlaylist1(data.body.tracks);
      }).catch((err) => console.log("error while fetching recommendation", err));
    }
  }, [session, spotifyApi, artistIds]);*/

  console.log(playlist1)

  const generatePlaylist = () => {
    if (artistIds) {
      spotifyApi.getRecommendations({
        seed_artists: artistIds,
        max_popularity: 50
      }).then((data) => {
        setPlaylist1(data.body.tracks);
      }).catch((err) => console.log("error while fetching recommendation", err));
    }
  };

  const generatePlaylist2 = () => {
    if (artistIds) {
      spotifyApi.getRecommendations({
        seed_artists: artistIds,
      }).then((data) => {
        setPlaylist2(data.body.tracks);
      }).catch((err) => console.log("error while fetching recommendation", err));
    }
  };

  return (
    <div className="items-center space-y-5 p-5">
      <h2 className="text-xl text-center">Recommended Playlist:</h2>
      <div className="flex-col lg:flex-row space-x-10">
        <div>
          <button onClick={generatePlaylist} className="text-xl text-teal-400 py-2 px-4 bg-slate-800 rounded-full">Generate Playlist</button>
          <div className="flex flex-col space-y-2 bg-slate-800 mt-5 p-3 rounded-lg">
            {playlist1?.map((track) => (
              <div key={track.id} className="flex space-x-5 items-center ">
                <Image src={track.album?.images?.[0]?.url} alt="" width={25} height={25}/>
                <p>{track.artists?.[0]?.name}:</p>
                <p>{track.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={generatePlaylist2} className="text-xl text-teal-400 py-2 px-4 bg-slate-800 rounded-full">Generate Playlist2</button>
          <div className="flex flex-col space-y-2 bg-slate-800 mt-5 p-3 rounded-lg">
            {playlist2?.map((track) => (
              <div key={track.id} className="flex space-x-5 items-center ">
                <Image src={track.album?.images?.[0]?.url} alt="" width={25} height={25}/>
                <p>{track.artists?.[0]?.name}:</p>
                <p>{track.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommend