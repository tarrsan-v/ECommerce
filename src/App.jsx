
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

import Home from "./pages/customer/Home";
import Auth from "./pages/customer/Auth";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div>
      <div className="bg-gray-900 text-white px-6 py-2 flex justify-between">
        <span>{session.user.email}</span>

        <button
          onClick={() => supabase.auth.signOut()}
          className="cursor-pointer"
        >
          Logout
        </button>
      </div>

      <Home />
    </div>
  );
}

export default App;
