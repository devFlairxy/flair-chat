import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContext = {
  session: Session | null;
  user: User | undefined;
  profile: any | null;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  user: undefined,
  profile: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      try {
        let { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        // console.log(data);
        setProfile(data);
        if (error) throw error;
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchProfile();
  }, [session?.user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
