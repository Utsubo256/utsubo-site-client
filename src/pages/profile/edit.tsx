import { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  // FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';
// import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';

import { useAuthContext } from '@/context/AuthContext';
import { setUserInfoCookies } from '@/lib/manageCookies';

// const schema = z.object({
//   profile: z.object({
//     name: z.string().min(1, '名前を入力してください'),
//   }),
// });

// type Schema = z.infer<typeof schema>;

type Profile = {
  avatar: string | null;
  name: string;
};

export default function ProfileEdit() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Schema>({
  //   resolver: zodResolver(schema),
  // });

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

    axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, data, config).then((res) => {
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
      setProfile({ ...profile, avatar: currentUser?.photoURL ?? null });
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
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, config).then((res) => setProfile(res.data));
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
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={onSubmit}>
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
                  px={{ base: 6, sm: 10 }}
                >
                  <Box display="flex" flexDir="column" justifyContent="flex-start">
                    <Radio bg="whiteAlpha.900" value="default">
                      <Text fontSize={{ base: 'sm', lg: 'md', md: 'md', sm: 'md' }}>デフォルト画像を使用する</Text>
                    </Radio>
                    <Radio bg="whiteAlpha.900" value="google-icon">
                      <Text fontSize={{ base: 'sm', lg: 'md', md: 'md', sm: 'md' }}>Googleアイコンを使用する</Text>
                    </Radio>
                  </Box>
                </RadioGroup>
              )}
            </HStack>
          </FormControl>
          {/* <FormControl id="name" isInvalid={!!errors.profile?.name}> */}
          <FormControl id="name">
            <FormLabel fontSize={'xl'} htmlFor="name" mt={5}>
              ユーザー名
            </FormLabel>
            <Input
              bg="whiteAlpha.900"
              // error={errors.profile?.name}
              id="name"
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              type="text"
              value={profile.name}
              // {...register('profile.name')}
            />
            {/* <FormErrorMessage>{errors.profile?.name.message && errors.profile?.name.message}</FormErrorMessage> */}
          </FormControl>
          <Center mt={8}>
            <HStack spacing={100}>
              <Button bg="whiteAlpha.900" onClick={onCancel} w="100px">
                キャンセル
              </Button>
              <Button _hover={{ bg: 'blue.300' }} bg="blue.500" color="whiteAlpha.900" type="submit" w="100px">
                更新する
              </Button>
            </HStack>
          </Center>
        </form>
      </Center>
    </>
  );
}
