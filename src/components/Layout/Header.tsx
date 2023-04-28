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
  useColorModeValue,
  Stack,
  Text,
  Link,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { BiLogOut } from 'react-icons/bi';

import { useAuthContext } from '@/context/AuthContext';

const navbarLinks = [
  { name: 'ホーム', url: '/' },
  { name: 'ウツボ一覧', url: '/morays' },
  { name: '水族館一覧', url: '/aquaria' },
];

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, loading, logout, userInfo } = useAuthContext();

  return (
    <Box bg={useColorModeValue('blue.500', 'blue.900')} px={4}>
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
            <Image alt="utsubo-site-logo" h="40px" src="utsubo-site-logo.png" w="160px" />
          </NextLink>
          <HStack as={'nav'} display={{ base: 'none', md: 'flex' }} spacing={4}>
            {navbarLinks.map((link) => (
              <Link
                _hover={{
                  bg: 'gray.200',
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
                  <Avatar size={'sm'} src="default-user-icon.png" />
                </MenuButton>
                <MenuList>
                  <MenuItem as="a" href="#">
                    <Stack>
                      <Text>ログインユーザー</Text>
                      <Text as="b">{userInfo.name}</Text>
                    </Stack>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as="a" href="##">
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
              <Link
                _hover={{
                  bg: 'gray.200',
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
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
