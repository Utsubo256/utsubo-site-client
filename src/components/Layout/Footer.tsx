import { Box, chakra, Flex, Link, Spacer, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
  return (
    <chakra.footer>
      <Flex bg="blue.500" bottom={0} direction={'column'} h="61px" pos="absolute" py={2} w="full">
        <Stack align="center" color="whiteAlpha.900" direction={'column'} spacing={0}>
          <Stack direction={'row'} spacing={2}>
            <Link as={NextLink} href={'/terms'}>
              利用規約
            </Link>
            <p> | </p>
            <Link as={NextLink} href={'/privacy'}>
              プライバシーポリシー
            </Link>
            <p> | </p>
            <Link as={NextLink} href={'https://twitter.com/Utsubo256'} target="_blank">
              <Box>お問い合わせ</Box>
            </Link>
          </Stack>
          <Box mb={2}>
            <Spacer />
            <Text fontSize="sm">Copyright &copy; {new Date().getFullYear()} - All right reserved by Utsubo256</Text>
            <Spacer />
          </Box>
        </Stack>
      </Flex>
    </chakra.footer>
  );
}
