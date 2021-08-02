
import SignIn from "./Components/SignIn";
import Chat from "./Components/Chat";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase";
import { useEffect } from "react";
import ChatEngine from "./Components/ChatEngine";
function App() {
  const [user] = useAuthState(auth);
  // const { uid, displayName } = auth.currentUser;
  console.log(user);

  return (
    <>

      {user ?
        <Chat />
        // <ChatEngine />
        : <SignIn />}

    </>
  );
}

export default App;
