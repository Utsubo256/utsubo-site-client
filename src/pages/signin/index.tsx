import { Box, Button, Center, Container, Divider, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export default function SigninPage() {
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
          <Button leftIcon={<FcGoogle />} maxW={'md'} variant={'outline'} w={'full'}>
            <Center>
              <Text>Googleでログイン / ユーザー登録</Text>
            </Center>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
