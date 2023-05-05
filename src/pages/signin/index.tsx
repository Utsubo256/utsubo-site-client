import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Divider, HStack, Stack, Text, Tooltip, VStack } from '@chakra-ui/react';
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
  const { loginWithGoogle, updateUserInfo } = useAuthContext();

  const handleLogin = async () => {
    const user = await loginWithGoogle();
    const token = await user?.getIdToken();

    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    const res = await axios.post('http://localhost:3000/api/v1/auth', null, config);
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
      <Box alignItems="center" display="flex" justifyContent="center" minH="calc(100vh - 64px - 70px - 61px)">
        <Box
          bg="whiteAlpha.900"
          borderRadius={{ base: 'none', sm: 'xl' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          px={20}
          py={10}
        >
          <Stack spacing="8">
            <VStack>
              <Button maxW={'md'} variant={'outline'} w={'full'}>
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
            </VStack>
            <HStack>
              <Divider />
              <Text color="muted" fontSize="sm" whiteSpace="nowrap">
                または
              </Text>
              <Divider />
            </HStack>
            <Button leftIcon={<FcGoogle />} maxW={'md'} onClick={() => handleLogin()} variant={'outline'} w={'full'}>
              <Center>
                <Text>Googleでログイン / ユーザー登録</Text>
              </Center>
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
