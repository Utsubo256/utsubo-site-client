import { useEffect, useState } from 'react';

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { parseISO } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ja from 'date-fns/locale/ja';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { BsThreeDots } from 'react-icons/bs';

import { useAuthContext } from '@/context/AuthContext';

type Moray = {
  avatar: string;
  id: number;
  max_length: number;
  max_length_str: string;
  name_en: string;
  name_ja: string;
};

type Aquarium = {
  address_detail: string;
  business_days_hours_url: string;
  description: string;
  entrance_fee_url: string;
  id: number;
  image: string;
  morays: Moray[];
  name: string;
  region: string;
  site_url: string;
};

type AquariumComments = {
  body: string;
  created_at: string;
  id: number;
  image: string | null;
  user: {
    avatar: string | null;
    id: number;
    name: string;
  };
};

type AquariumCommentInput = {
  body: string;
};

export default function AquariumDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { currentUser, loading, userInfo } = useAuthContext();

  const [aquariumDetail, setAquariumDetail] = useState<Aquarium>({
    address_detail: '',
    business_days_hours_url: '',
    description: '',
    entrance_fee_url: '',
    id: 0,
    image: '',
    morays: [],
    name: '',
    region: '',
    site_url: '',
  });

  const [aquariumCommentInput, setAquariumCommentInput] = useState<AquariumCommentInput>({
    body: '',
  });
  const [aquariumComments, setAquariumComments] = useState<AquariumComments[]>([]);

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const data = {
      aquarium_comment: {
        body: aquariumCommentInput.body,
      },
    };
    const cookies = nookies.get();
    const config = {
      headers: { authorization: `Bearer ${cookies.token}` },
    };

    if (router.isReady) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/aquaria/${id}/aquarium_comments`, data, config)
        .then(() => {
          axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/aquaria/${id}/aquarium_comments`)
            .then((res) => setAquariumComments(res.data));
        })
        .catch((e) => console.log(e));
    }
    setAquariumCommentInput({ body: '' });
  }

  function onDelete(comment_id: number) {
    if (router.isReady) {
      const cookies = nookies.get();
      const config = {
        headers: { authorization: `Bearer ${cookies.token}` },
      };

      axios
        .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/aquaria/${id}/aquarium_comments/${comment_id}`, config)
        .then(() => {
          axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/aquaria/${id}/aquarium_comments`)
            .then((res) => setAquariumComments(res.data));
        });
    }
  }

  useEffect(() => {
    if (router.isReady) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/aquaria/${id}`).then((res) => setAquariumDetail(res.data));
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/aquaria/${id}/aquarium_comments`)
        .then((res) => setAquariumComments(res.data));
    }
  }, [id, router]);

  function elapsedTimeFromNow(datetime: string) {
    return formatDistanceToNow(parseISO(datetime), { locale: ja });
  }

  return (
    <>
      <Head>
        <title>{`${aquariumDetail.name} - うつぼさいと`}</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">{aquariumDetail.name}</Text>
      </Center>
      <Center>
        <Box w={{ base: '85%', lg: '100%', md: '85%' }}>
          <VStack>
            <Image
              alt={aquariumDetail.name}
              boxSize="200px"
              rounded={'lg'}
              src={`/aquarium_image/${aquariumDetail.image}`}
              w="300px"
            />
            <Box>
              <Text fontSize={'xl'}>
                サイト　:{' '}
                <Link as={NextLink} color="blue.400" href={aquariumDetail.site_url} isExternal>
                  {aquariumDetail.site_url}
                </Link>
              </Text>
              <Text fontSize={'xl'}>
                営業日時:{' '}
                <Link as={NextLink} color="blue.400" href={aquariumDetail.business_days_hours_url} isExternal>
                  {aquariumDetail.business_days_hours_url}
                </Link>
              </Text>
              <Text fontSize={'xl'}>
                料金　　:{' '}
                <Link as={NextLink} color="blue.400" href={aquariumDetail.entrance_fee_url} isExternal>
                  {aquariumDetail.entrance_fee_url}
                </Link>
              </Text>
              <Text fontSize={'xl'}>住所　　: {aquariumDetail.address_detail}</Text>
            </Box>
            <VStack pt="20px" w={{ lg: '35%', md: '45%', sm: '70%' }}>
              <Text fontSize={'2xl'}>ひとことメモ</Text>
              <Text fontSize={'xl'}>{aquariumDetail.description ?? '調査中です！しばらくお待ちください。'}</Text>
            </VStack>
          </VStack>
          {aquariumDetail.video_url ? (
            <>
              <VStack>
                <VStack pt="20px" w={{ base: '70%', lg: '35%', md: '45%' }}>
                  <Text fontSize={'2xl'}>ウツボ動画</Text>
                </VStack>
              </VStack>
              <Flex justifyContent="center">
                <AspectRatio ratio={16 / 9} w={{ base: '100%', lg: '50%', md: '80%' }}>
                  <iframe allowFullScreen src={`https://www.youtube-nocookie.com/embed/${aquariumDetail.video_url}`} />
                </AspectRatio>
              </Flex>
            </>
          ) : null}
          <VStack py="25px" spacing={0}>
            <Text fontSize="2xl">この水族館で観られるウツボ</Text>
            <Text color="red.500" fontSize="sm">
              ※ご注意※
            </Text>
            <Text color="red.500" fontSize="sm">
              展示されるウツボは通知無く変更される場合があります。
            </Text>
          </VStack>
        </Box>
      </Center>
      <Box m="auto" pb={8} w="90%">
        <Grid gap={8} justifyContent="center" templateColumns="repeat(auto-fit, 230px)">
          {aquariumDetail.morays.map((moray) => (
            <GridItem key={moray.id}>
              <LinkBox
                _hover={{ cursor: 'pointer', opacity: 0.8 }}
                bg="whiteAlpha.800"
                borderRadius="30px"
                h="300px"
                p={4}
                shadow="lg"
                w="230px"
              >
                <Stack spacing={1} textAlign="center">
                  <Image
                    alt="moray_image"
                    borderRadius="full"
                    boxSize="160px"
                    m="auto"
                    src={`/moray_image/${moray.avatar}`}
                  />
                  <LinkOverlay as={NextLink} fontSize="xl" fontWeight="bold" href={`/morays/${moray.id}`}>
                    {moray.name_ja}
                  </LinkOverlay>
                  <Text>{moray.name_en}</Text>
                  <Text>最大長: {moray.max_length_str}</Text>
                </Stack>
              </LinkBox>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <VStack py="25px">
        <Text fontSize="2xl">コメント</Text>
      </VStack>
      {!loading && currentUser ? (
        <>
          <VStack pb={4}>
            <Box display="flex" w={{ base: '80%', lg: '50%', md: '70%' }}>
              <HStack>
                <Avatar size={'md'} src={userInfo.avatar ? userInfo.avatar : '/default-user-icon.png'} />
                <Text fontSize="md">{userInfo.name}</Text>
              </HStack>
            </Box>
          </VStack>
          <VStack>
            <Box w={{ base: '80%', lg: '50%', md: '70%' }}>
              <form onSubmit={onSubmit}>
                <Textarea
                  bg="white"
                  onChange={(e) => setAquariumCommentInput({ ...aquariumCommentInput, body: e.target.value })}
                  placeholder="コメントを入力"
                  value={aquariumCommentInput.body}
                  variant="outline"
                />
                <Box display="flex" justifyContent="flex-end" py={2}>
                  <Button
                    _hover={{ bg: 'blue.300' }}
                    bg="blue.500"
                    color="whiteAlpha.900"
                    isDisabled={aquariumCommentInput.body === '' || aquariumCommentInput.body?.length > 255}
                    type="submit"
                  >
                    投稿する
                  </Button>
                </Box>
                <Divider borderColor="gray.400" />
              </form>
            </Box>
          </VStack>
        </>
      ) : (
        <VStack>
          <Box
            alignItems="center"
            bg="whiteAlpha.800"
            borderRadius="30px"
            display="flex"
            h="200px"
            justifyContent="center"
            rounded="lg"
            shadow="lg"
            w={{ base: '80%', lg: '50%', md: '70%' }}
          >
            <VStack>
              <Text fontSize="lg" fontWeight="bold">
                ログインしてコメントを投稿しよう！
              </Text>
              <Text fontSize="sm" w={{ lg: '100%', md: '100%', sm: '75%' }}>
                ゲストログインするとアカウント登録なしでコメント投稿ができます
              </Text>
              <Box h={4}></Box>
              <Button _hover={{ bg: 'blue.300' }} as={NextLink} bg="blue.500" color="whiteAlpha.900" href="/signin">
                ログインする
              </Button>
            </VStack>
          </Box>
        </VStack>
      )}
      {aquariumComments.length ? (
        <VStack pb={8}>
          <Box w={{ base: '80%', lg: '50%', md: '70%' }}>
            {aquariumComments.map((aquariumComment) => (
              <>
                <Box py={4}>
                  <Box display="flex" justifyContent="space-between">
                    <HStack spacing={2}>
                      {aquariumComment.user.avatar ? (
                        <Avatar size={'md'} src={aquariumComment.user.avatar ?? undefined} />
                      ) : (
                        <Avatar size={'md'} src="/default-user-icon.png" />
                      )}
                      <Text fontSize="md">{aquariumComment.user.name}</Text>
                      <Text fontSize="xs">{elapsedTimeFromNow(aquariumComment.created_at)}</Text>
                    </HStack>
                    <Menu>
                      {aquariumComment.user.id === Number(userInfo.id) ? (
                        <Box>
                          <MenuButton>
                            <Icon as={BsThreeDots} boxSize="20px" />
                          </MenuButton>
                          <MenuList>
                            {/* <MenuItem onClick={() => alert('updated!')}>編集する</MenuItem> */}
                            <MenuItem onClick={() => onDelete(aquariumComment.id)}>削除する</MenuItem>
                          </MenuList>
                        </Box>
                      ) : null}
                    </Menu>
                  </Box>
                </Box>
                <Text fontSize="md" whiteSpace={'pre-wrap'}>
                  {aquariumComment.body}
                </Text>
                <Divider borderColor="gray.400" pt={4} />
              </>
            ))}
          </Box>
        </VStack>
      ) : (
        <Center>
          <Text fontSize="xl" py={12}>
            まだコメントはありません。
          </Text>
        </Center>
      )}
    </>
  );
}
