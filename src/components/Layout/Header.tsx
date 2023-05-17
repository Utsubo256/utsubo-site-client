import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Text,
  Link,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';

import { useAuthContext } from '@/context/AuthContext';

const navbarLinks = [
  { name: 'ホーム', url: '/' },
  { name: 'ウツボ一覧', url: '/morays' },
  { name: '水族館一覧', url: '/aquaria' },
];

export default function Header() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, loading, logout, userInfo } = useAuthContext();

  function handleLink(link: string) {
    router.push(link);
    onClose();
  }

  return (
    <>
      <Box bg="blue.500" position="fixed" px={4} w={'full'} zIndex={100}>
        <Flex alignItems={'center'} h={16} justifyContent={'space-between'}>
          <IconButton
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            size={'md'}
          />
          <HStack alignItems={'center'} spacing={8}>
            <NextLink href="/">
              <Image alt="utsubo-site-logo" h="40px" src="/utsubo-site-logo.png" w="160px" />
            </NextLink>
            <HStack as={'nav'} display={{ base: 'none', md: 'flex' }} spacing={4}>
              {navbarLinks.map((link) => (
                <Link
                  _hover={{
                    bg: 'blue.300',
                    textDecoration: 'none',
                  }}
                  as={NextLink}
                  color={'whiteAlpha.900'}
                  href={link.url}
                  key={link.name} // key propsはイテレータ内でどのアイテムかをReactが認識するために使われる
                  px={2}
                  py={1}
                  rounded={'md'}
                >
                  {link.name}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              {!loading && currentUser ? (
                <>
                  <MenuButton as={Button} cursor={'pointer'} minW={0} rounded={'full'} variant={'link'}>
                    <Avatar size={'sm'} src={userInfo.avatar ? userInfo.avatar : '/default-user-icon.png'} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={NextLink} href="/profile">
                      <Stack>
                        <Text>ログインユーザー</Text>
                        <Text as="b">{userInfo.name}</Text>
                      </Stack>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem as={NextLink} href="/profile/edit">
                      プロフィール編集
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<BiLogOut />} onClick={() => logout()}>
                      ログアウト
                    </MenuItem>
                  </MenuList>
                </>
              ) : (
                <Button as={NextLink} href="/signin">
                  ログイン
                </Button>
              )}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box display={{ md: 'none' }} pb={4}>
            <Stack as={'nav'} spacing={4}>
              {navbarLinks.map((link) => (
                <Button
                  _hover={{
                    bg: 'blue.300',
                    textDecoration: 'none',
                  }}
                  bg="blue.500"
                  color={'whiteAlpha.900'}
                  key={link.name} // key propsはイテレータ内でどのアイテムかをReactが認識するために使われる
                  onClick={() => handleLink(link.url)}
                  px={2}
                  py={1}
                  rounded={'md'}
                >
                  {link.name}
                </Button>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box h="64px"></Box>
    </>
  );
}
