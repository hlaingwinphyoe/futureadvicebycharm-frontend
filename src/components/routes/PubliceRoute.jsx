import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PubliceRoute({ children }) {
  const { accessToken } = useSelector((state) => state.user);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
