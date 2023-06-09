import { useEffect, useState } from 'react';

import { Avatar, Button, Center, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { useAuthContext } from '@/context/AuthContext';

type Profile = {
  avatar: string | null;
  name: string;
  uid: string;
};

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    avatar: '',
    name: '',
    uid: '',
  });

  const { currentUser, loading } = useAuthContext();

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
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, config).then((res) => setProfile(res.data));
    }
  }, [loading, currentUser, router]);

  return (
    <>
      <Head>
        <title>マイページ - うつぼさいと</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">マイページ</Text>
      </Center>
      <VStack>
        {profile?.avatar ? (
          <Avatar size={'2xl'} src={profile?.avatar} />
        ) : (
          <Avatar size={'2xl'} src="/default-user-icon.png" />
        )}
        <Text fontSize={'3xl'}>{profile?.name}</Text>
        <Button bg="blue.500" color="whiteAlpha.900" onClick={() => goToProfileEdit()} rounded={'full'}>
          編集する
        </Button>
      </VStack>
    </>
  );
}
