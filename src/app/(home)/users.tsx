import { supabase } from '@/src/lib/supabase';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import UserListItem from '@/src/components/UserListItem';

export default function UsersScreen() {
  const [users, setUsers] = useState<any>([]);
  const { user } = useAuth();
  if (!user) return;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .neq('id', user.id);
        setUsers(profiles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  if (!users) return;
  return (
    <>
      <Stack.Screen options={{ headerBackTitle: 'Chats' }} />
      <FlatList
        data={users}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </>
  );
}
