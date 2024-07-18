import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from './AuthProvider';
import { supabase } from '@/src/lib/supabase';
const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_API as string
);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();
  useEffect(() => {
    if (!profile) return;
    const { data } = supabase.storage
      .from('avatar')
      .getPublicUrl(profile.avatar_url);
    const connect = async () => {
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: data.publicUrl,
        },
        client.devToken(profile.id)
      );
      setIsReady(true);
    };
    connect();
    return () => {
      client.disconnectUser();
      setIsReady(false);
    };
  }, [profile?.id]);
  if (!isReady) return <ActivityIndicator />;
  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
