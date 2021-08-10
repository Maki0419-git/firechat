
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
  fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-B9DAF255-4D29-4E4B-BAE8-D4C8F3382B43&locationName=臺北")
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
