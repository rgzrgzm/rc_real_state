import { useState, useEffect, useMemo } from "react";
import { supabase } from "./useSupabase";

export const useAuth = (setIsApproved) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only load the session — DO NOT CHECK WHITELIST HERE
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Only update user here — DO NOT CHECK WHITELIST HERE
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return { data, error };
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const isUserApproved = async (userId) => {
    if(!userId) return 
    const { data, error } = await supabase
      .from("white_list")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();
      let boolean = !!data;
    // If not found, data = null, so return false
    setIsApproved(boolean);
    return boolean;
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      let isApproved = await isUserApproved(data.user.id);

      return {
        isApproved,
      };
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
      setIsApproved(false);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return {
    user,
    loading,
    isUserApproved,
    signIn,
    signUp,
    signOut,
  };
};
