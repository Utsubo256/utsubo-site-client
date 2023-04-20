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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { BiLogOut } from 'react-icons/bi';

import { useAuthContext } from '@/context/AuthContext';

const navbarLinks = [
  { name: 'ホーム', url: '/' },
  { name: 'ウツボ一覧', url: '/morays' },
  { name: '水族館一覧', url: '/aquariums' },
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
          <Box>Logo</Box>
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
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
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
