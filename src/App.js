
import SignIn from "./Components/SignIn";
import Chat from "./Components/Chat";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <>

      {user ? <Chat user={user} /> : <SignIn />}

    </>
  );
}

export default App;
