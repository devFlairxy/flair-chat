import { Stack } from 'expo-router';
import ChatProvider from '../providers/ChatProvider';

const HomeLayout = () => {
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="channel/[cid]"
          options={{ headerTitle: 'Channel', headerBackTitle: 'Chats' }}
        />
      </Stack>
    </ChatProvider>
  );
};

export default HomeLayout;
