import { useEffect, useState } from 'react';

import { Avatar, Button, Center, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { useAuthContext } from '@/context/AuthContext';

type Profile = {
  avatar: string | null;
  id: number;
  name: string;
};

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({});

  const { currentUser, loading } = useAuthContext({
    avatar: '',
    id: 0,
    name: '',
  });

  const goToProfileEdit = async () => {
    router.push('/profile/edit');
  };

  useEffect(() => {
    const cookies = nookies.get();
    const config = {
      headers: { authorization: `Bearer ${cookies.token}` },
    };
    if (!loading && !currentUser) {
      router.push('/signin');
    } else {
      axios.get('http://localhost:3000/api/v1/profile', config).then((res) => setProfile(res.data));
    }
  }, [loading, currentUser, router]);

  return (
    <>
      <Head>
        <title>プロフィール - うつぼさいと</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">マイページ</Text>
      </Center>
      <VStack>
        {profile?.avatar ? (
          <Avatar size={'2xl'} src={profile?.avatar} />
        ) : (
          <Avatar size={'2xl'} src="default-user-icon.png" />
        )}
        <Text fontSize={'3xl'}>{profile?.name}</Text>
        <Button bg="blue.500" color="whiteAlpha.900" onClick={() => goToProfileEdit('/aquaria')} rounded={'full'}>
          編集する
        </Button>
      </VStack>
    </>
  );
}
