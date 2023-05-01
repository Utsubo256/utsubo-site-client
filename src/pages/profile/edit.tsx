import { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { useAuthContext } from '@/context/AuthContext';
import { setUserInfoCookies } from '@/lib/manageCookies';

type Profile = {
  avatar: string | null;
  name: string;
};

export default function ProfileEdit() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    avatar: '',
    name: '',
  });
  const { currentUser, loading, userInfo, updateUserInfo } = useAuthContext();

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const data = {
      profile: profile,
    };

    const cookies = nookies.get();
    const config = {
      headers: { authorization: `Bearer ${cookies.token}` },
    };

    axios.patch('http://localhost:3000/api/v1/profile', data, config).then((res) => {
      setProfile(res.data);
      setUserInfoCookies(res.data);
      updateUserInfo(res.data);
    });
    router.push('/profile');
  }

  function onCancel() {
    router.push('/profile');
  }

  function handleChangeAvatar(value: string) {
    if (value === 'default') {
      setProfile({ ...profile, avatar: null });
    } else {
      setProfile({ ...profile, avatar: currentUser.photoURL ?? null });
    }
  }

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
        <title>プロフィール編集 - うつぼさいと</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">プロフィール編集</Text>
      </Center>
      <Center>
        <form onSubmit={onSubmit}>
          <Box w="lg">
            <FormControl>
              <FormLabel fontSize={'xl'}>アイコン画像</FormLabel>
              <HStack pt={3}>
                {profile?.avatar ? (
                  <Avatar size={'xl'} src={currentUser?.photoURL ?? undefined} />
                ) : (
                  <Avatar size={'xl'} src="/default-user-icon.png" />
                )}
                {!currentUser?.isAnonymous && !loading && (
                  <RadioGroup
                    defaultValue={userInfo.avatar ? 'google-icon' : 'default'}
                    onChange={(value) => handleChangeAvatar(value)}
                    px={10}
                  >
                    <Box>
                      <Radio bg="whiteAlpha.900" value="default">
                        デフォルト画像を使用する
                      </Radio>
                      <Radio bg="whiteAlpha.900" value="google-icon">
                        Googleアイコンを使用する
                      </Radio>
                    </Box>
                  </RadioGroup>
                )}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xl'} mt={5}>
                ユーザー名
              </FormLabel>
              <Input
                bg="whiteAlpha.900"
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                type="text"
                value={profile.name}
              />
            </FormControl>
            <Center mt={8}>
              <HStack spacing={100}>
                <Button bg="whiteAlpha.900" onClick={onCancel} w="100px">
                  キャンセル
                </Button>
                <Button bg="blue.500" color="whiteAlpha.900" type="submit" w="100px">
                  更新する
                </Button>
              </HStack>
            </Center>
          </Box>
        </form>
      </Center>
    </>
  );
}
