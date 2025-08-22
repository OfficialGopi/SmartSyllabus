import { authAPI } from "@/services/api";
import { useStore } from "@/store/useStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckAuthStatus = () => {
  const navigate = useNavigate();
  const { user, setUser, setLoading, isLoading } = useStore();

  const getMe = async () => {
    if (user) navigate("/chats");
    const toastId = toast.loading("Checking authentication status");
    try {
      setLoading(true);

      const { data } = await authAPI.getMe();
      if (data.success) {
        setUser(data.data);

        navigate("/chats");
        toast.success("Login successful", {
          id: toastId,
        });
      } else {
        navigate("/login");
        toast.error(data.message, {
          id: toastId,
        });
      }
    } catch (error) {
      navigate("/login");
      toast.error("Error checking authentication status", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading) {
    <Loader className="animate-spin" />;
  }
  return <></>;
};

export default CheckAuthStatus;
