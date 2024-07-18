import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from 'stream-chat-expo';
import { Channel as ChannelType } from 'stream-chat';

export default function ChannelScreen() {
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      setChannel(channels[0]);
      try {
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    };
    fetchChannel();
  }, [cid]);

  if (!channel) return <ActivityIndicator />;

  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
}
