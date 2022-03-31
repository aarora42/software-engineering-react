import * as service from "../../services/auth-service";

import MyTuits from "./my-tuits";
import {Route, Routes, useNavigate} from "react-router";
import {useEffect, useState} from "react";
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }
  return(
      <div>
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
        <button onClick={logout}>
          Logout</button>

          <Routes>
              <Route path="/mytuits"
                     element={<MyTuits/>}/>
              {/*<Route path="/tuits-and-replies"*/}
              {/*       element={<TuitsAndReplies/>}/>*/}
              {/*<Route path="/media"*/}
              {/*       element={<Media/>}/>*/}
              {/*<Route path="/mylikes"*/}
              {/*       element={<MyLikes/>}/>*/}
          </Routes>
      </div>
  );
};
export default Profile;