import { Box, Button, Center, Container, Divider, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

import useFirebaseAuth from '@/hooks/useFirebaseAuth';

export default function SigninPage() {
  const { loginWithGoogle, currentUser, logout } = useFirebaseAuth();

  const handleLogin = async () => {
    const user = await loginWithGoogle();
    const token = await user?.getIdToken();

    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    const res = await axios.post('http://localhost:3000/api/v1/auth', null, config);
    console.log(res);
  };

  return (
    <Container maxW="lg" px={{ base: '0', sm: '8' }} py={{ base: '12', md: '24' }}>
      <Stack spacing="6">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'xs', md: 'sm' }}>ログイン/ユーザー登録</Heading>
        </Stack>
      </Stack>
      <Box
        bg={{ base: 'transparent', sm: 'bg-surface' }}
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
          <Button leftIcon={<FcGoogle />} maxW={'md'} onClick={() => logout()} variant={'outline'} w={'full'}>
            <Center>
              <Text>ログアウト</Text>
            </Center>
          </Button>
          <p>ユーザー：{currentUser?.displayName}</p>
        </Stack>
      </Box>
    </Container>
  );
}
