import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { ChannelList } from 'stream-chat-expo';
import { Link, router, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';
import { FontAwesome } from '@expo/vector-icons';

const HomeTab = () => {
  const { user } = useAuth();
  if (!user) return;
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={'/(home)/users'} asChild>
              <FontAwesome
                name="users"
                size={18}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
};

export default HomeTab;
