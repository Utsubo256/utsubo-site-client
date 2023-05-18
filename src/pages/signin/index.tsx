import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Divider, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { FcGoogle } from 'react-icons/fc';

import { useAuthContext } from '@/context/AuthContext';
import { setUserInfoCookies } from '@/lib/manageCookies';

type UserInfo = {
  avatar: string | null;
  name: string;
  uid: string;
};

export default function SigninPage() {
  const { loginWithFirebase, updateUserInfo } = useAuthContext();

  const handleLogin = async (loginMethod: string) => {
    const user = await loginWithFirebase(loginMethod);
    const token = await user?.getIdToken();

    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, null, config);
    const userInfo: UserInfo = res.data;
    setUserInfoCookies(userInfo);
    updateUserInfo(userInfo);
  };

  return (
    <>
      <Head>
        <title>ログイン/ユーザー登録 - うつぼさいと</title>
      </Head>
      <Center pt="25px">
        <Text fontSize="3xl">ログイン/ユーザー登録</Text>
      </Center>
      <Box alignItems="center" display="flex" justifyContent="center" minH="calc(100vh - 64px - 70px - 70px - 61px)">
        <Box
          alignItems="center"
          bg="whiteAlpha.900"
          borderRadius="xl"
          boxShadow="md"
          display="flex"
          h="280px"
          justifyContent="center"
          w={{ base: '85%', lg: '30%', md: '50%' }}
        >
          <VStack>
            <Button maxW={'md'} onClick={() => handleLogin('guest')} variant={'outline'} w={'full'}>
              ゲストログイン
            </Button>
            <Tooltip
              aria-label="ゲストログインとは"
              bg="white"
              borderRadius="md"
              color="blue.500"
              h="120px"
              label={
                <VStack alignItems="center" display="flex" justifyContent="center">
                  <Text fontSize={'md'}>仮アカウントを作成し、ユーザー登録なしでログインできます。</Text>
                  <Text fontSize={'md'}>ログアウト後に同じアカウントでの再ログインはできません。</Text>
                </VStack>
              }
              w="400px"
            >
              <HStack textDecoration="underline">
                <InfoOutlineIcon />
                <Text fontSize={'sm'}>ゲストログインとは？</Text>
              </HStack>
            </Tooltip>
            <HStack py={6}>
              <Divider borderColor="gray.300" w={28} />
              <Text fontSize="sm" whiteSpace="nowrap">
                または
              </Text>
              <Divider borderColor="gray.400" w={28} />
            </HStack>
            <Button
              leftIcon={<FcGoogle />}
              maxW={'md'}
              onClick={() => handleLogin('google')}
              variant={'outline'}
              w={'full'}
            >
              <Center>
                <Text>Googleでログイン / ユーザー登録</Text>
              </Center>
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
}
