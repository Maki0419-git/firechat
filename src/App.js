
import SignIn from "./Components/SignIn";
import Chat from "./Components/Chat";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebaseConfig";
import { Context, ImgFiles } from "./Context";
import { useState } from 'react';

function App() {
  const [user] = useAuthState(auth);
  const [Img, setImg] = useState(ImgFiles)
  return (
    <>

      {user ? <Context.Provider value={{ Img, setImg }}><Chat /></Context.Provider> : <SignIn />}

    </>
  );
}

export default App;
