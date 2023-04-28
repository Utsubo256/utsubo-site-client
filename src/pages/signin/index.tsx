import { Box, Button, Center, Container, Divider, HStack, Stack, Text } from '@chakra-ui/react';
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
      <Container maxW="lg" px={{ base: '0', sm: '8' }} py={12}>
        <Box
          bg="whiteAlpha.900"
          borderRadius={{ base: 'none', sm: 'xl' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          px={{ base: '4', sm: '10' }}
          py={{ base: '0', sm: '8' }}
        >
          <Stack spacing="6">
            <Button maxW={'md'} variant={'outline'} w={'full'}>
              ゲストログイン
            </Button>
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
      </Container>
    </>
  );
}
