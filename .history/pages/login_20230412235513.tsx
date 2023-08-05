import { ProviderType } from "next-auth/providers";
import {getProviders, signIn} from "next-auth/react"; 
/*const Login: NextPage = (providers:any) => {
    return (
        <div>
            <h1>Spotify Account Login</h1>
            {Object.values(providers).map}
        </div>
    )
}
export default Login;*/
// rfce shortcut 

interface Props {
  providers: ProviderType;
}

const Login = ( {providers}: Props ) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <h1 className="text-5xl text-white py-10">DISCOVERSPOTIFY</h1>
      <h3 className="text-xl">This app is like spotify wrapped but a little different. Take a look if you're curious to see more about your listening habits and discover new sounds!</h3>
      <h3>This app connects directly to your spotify account and is protected by spotify's API authorization scopes which will be displayed to you before logging in.</h3>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button className="bg-[#18D860] text-white rounded-3xl p-4"
          onClick={() => signIn(provider.id, {callbackUrl: '/'})}
          >Login with {provider.name}</button>
        </div>
      ))}
    </div>
  )
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }
};

