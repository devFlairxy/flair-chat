import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useChatContext } from 'stream-chat-expo';
import { useAuth } from '../app/providers/AuthProvider';
import { router } from 'expo-router';

const UserListItem = ({ user }: any) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();
  const initiateChat = async () => {
    if (!me) return;
    const channel = client.channel('messaging', {
      members: [me.id, user.id],
    });
    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`)
    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <TouchableOpacity
      onPress={initiateChat}
      style={{ padding: 10, backgroundColor: 'white' }}
    >
      <Text style={{ fontWeight: '600' }}> {user.full_name} </Text>
    </TouchableOpacity>
  );
};

export default UserListItem;
