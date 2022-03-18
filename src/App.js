
import SignIn from "./Components/SignIn";
import Chat from "./Components/Chat";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebaseConfig";


function App() {
  const [user] = useAuthState(auth);
  return (
    <>

      {user ? <Chat /> : <SignIn />}

    </>
  );
}

export default App;
