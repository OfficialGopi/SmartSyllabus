import { useEffect } from "react";
import { authAPI } from "@/services/api";
import { useStore } from "@/store/useStore";

const Profile = () => {
  const { user, setUser } = useStore();

  useEffect(() => {
    (async () => {
      if (user) return;
      try {
        const res = await authAPI.getMe();
        setUser(res.data.data || null);
      } catch {
        // not logged in or error
      }
    })();
  }, [user, setUser]);

  if (!user)
    return <div className="text-sm text-neutral-500">Please login.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="border rounded-md p-4 grid gap-2">
        <div>
          <span className="font-medium">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-medium">Credits:</span> {user.credits}
        </div>
      </div>
    </div>
  );
};

export default Profile;
