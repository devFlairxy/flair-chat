import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { ChannelList } from 'stream-chat-expo';
import { router } from 'expo-router';

const HomeTab = () => {
  return (
    <ChannelList
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
};

export default HomeTab;
