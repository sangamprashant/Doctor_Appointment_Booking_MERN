import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import { fetchUserData } from "../../ApiCalls";
import { PropagateLoader } from "react-spinners";

function LoadingContainer({ isLoading }) {
  const { token, setToken, isLogged, setIsLogged, user, setUser } =
    useContext(AppContext);

  return (
    <div className={`loading-overlay ${isLoading ? "visible" : ""}`}>
      <div>
        {isLoading ? (
          <PropagateLoader color="blue" loading={true} size={15} />
        ) : (
          "Loaded"
        )}
      </div>
    </div>
  );
}

export default LoadingContainer;
