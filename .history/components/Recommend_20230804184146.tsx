import {useSession} from "next-auth/react"
import {useEffect, useState} from "react";
import useSpotify from '../hooks/useSpotify';
import { artistIdsState } from "../atoms/artistAtom";
import { trackIdsState } from "../atoms/trackAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import Image from 'next/image'

function Recommend() {
  const spotifyApi = useSpotify();
  const {data:session} = useSession();
  const artistIds = useRecoilValue(artistIdsState);
  const trackIds = useRecoilValue(trackIdsState);
  const [playlist1, setPlaylist1] = useState<SpotifyApi.RecommendationTrackObject[]>();
  const [playlist2, setPlaylist2] = useState<SpotifyApi.RecommendationTrackObject[]>();
  const [playlist3, setPlaylist3] = useState<SpotifyApi.RecommendationTrackObject[]>();
  const [playlist4, setPlaylist4] = useState<SpotifyApi.RecommendationTrackObject[]>();


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

  const generatePlaylist3 = () => {
    if (trackIds) {
      spotifyApi.getRecommendations({
        seed_tracks: trackIds.slice(0, 5),
      }).then((data) => {
        setPlaylist3(data.body.tracks);
      }).catch((err) => console.log("error while fetching recommendation", err));
    }
  };

  const generatePlaylist4 = () => {
    if (artistIds) {
      spotifyApi.getRecommendations({
        seed_artists: artistIds,
        min_danceability: 0.8,
        target_energy: 0.8,
      }).then((data) => {
        setPlaylist4(data.body.tracks);
      }).catch((err) => console.log("error while fetching recommendation", err));
    }
  };

  return (
    <div className="items-center space-y-5 p-5">
      <h2 className="text-xl text-center">Recommended Playlist:</h2>
      <div className="flex flex-wrap space-x-10">
        <div>
          <h3>Underrated Tracks</h3>
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
        <h3>Based off your top artists</h3>
          <button onClick={generatePlaylist2} className="text-xl text-teal-400 py-2 px-4 bg-slate-800 rounded-full">Generate Playlist2</button>
          <div className="flex flex-col space-y-2 bg-slate-800 mt-5 p-3 rounded-lg h-[200px] overflow-y-scroll">
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
      <div className="flex flex-wrap space-x-10">
        <div>
        <h3>Based off your top tracks</h3>
          <button onClick={generatePlaylist3} className="text-xl text-teal-400 py-2 px-4 bg-slate-800 rounded-full">Generate Playlist3</button>
          <div className="flex flex-col space-y-2 bg-slate-800 mt-5 p-3 rounded-lg">
            {playlist3?.map((track) => (
              <div key={track.id} className="flex space-x-5 items-center ">
                <Image src={track.album?.images?.[0]?.url} alt="" width={25} height={25}/>
                <p>{track.artists?.[0]?.name}:</p>
                <p>{track.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
        <h3>Dance Party</h3>
          <button onClick={generatePlaylist4} className="text-xl text-teal-400 py-2 px-4 bg-slate-800 rounded-full">Generate Playlist4</button>
          <div className="flex flex-col space-y-2 bg-slate-800 mt-5 p-3 rounded-lg">
            {playlist4?.map((track) => (
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