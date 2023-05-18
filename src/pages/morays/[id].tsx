import { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
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
  Icon,
  Grid,
  GridItem,
  Flex,
  AspectRatio,
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

type Aquarium = {
  address_city: string;
  id: number;
  image: string;
  name: string;
  region: string;
};

type Moray = {
  aquaria: Aquarium[];
  avatar: string;
  description: string;
  distribution: string;
  id: number;
  max_length_str: string;
  name_academic: string;
  name_en: string;
  name_ja: string;
  video_url: string;
};

type MorayComments = {
  body: string;
  created_at: string;
  id: number;
  image: string | null;
  user: {
    avatar: string | null;
    name: string;
    uid: string;
    uid: string;
  };
};

type MorayCommentInput = {
  body: string;
};

export default function MorayDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { currentUser, loading, userInfo } = useAuthContext();

  const [morayDetail, setMorayDetail] = useState<Moray>({
    aquaria: [],
    avatar: '',
    description: '',
    distribution: '',
    id: 0,
    max_length_str: '',
    name_academic: '',
    name_en: '',
    name_ja: '',
    video_url: '',
  });

  const [morayCommentInput, setMorayCommentInput] = useState<MorayCommentInput>({
    body: '',
  });
  const [morayComments, setMorayComments] = useState<MorayComments[]>([]);

  const [isAuthor, setIsAuthor] = useState(false);

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const data = {
      moray_comment: {
        body: morayCommentInput.body,
      },
    };

    const cookies = nookies.get();
    const config = {
      headers: { authorization: `Bearer ${cookies.token}` },
    };

    if (router.isReady) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/morays/${id}/moray_comments`, data, config)
        .then(() => {
          axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/morays/${id}/moray_comments`)
            .then((res) => setMorayComments(res.data));
        })
        .catch((e) => console.log(e));
    }
    setMorayCommentInput({ body: '' });
  }

  function onDelete(comment_id: number) {
    if (router.isReady) {
      const cookies = nookies.get();
      const config = {
        headers: { authorization: `Bearer ${cookies.token}` },
      };

      axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/morays/${id}/moray_comments/${comment_id}`, config).then(() => {
        axios
          .get(`${process.env.NEXT_PUBLIC_BASE_URL}/morays/${id}/moray_comments`)
          .then((res) => setMorayComments(res.data));
      });
    }
  }

  useEffect(() => {
    if (router.isReady) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/morays/${id}`).then((res) => setMorayDetail(res.data));
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/morays/${id}/moray_comments`)
        .then((res) => setMorayComments(res.data));
    }
  }, [id, router]);

  useEffect(() => {
    if (!loading && currentUser && currentUser.uid === userInfo.uid) {
      setIsAuthor(true);
    }
  }, [currentUser, loading, userInfo.uid]);

  function elapsedTimeFromNow(datetime: string) {
    return formatDistanceToNow(parseISO(datetime), { locale: ja });
  }

  return (
    <>
      <Head>
        <title>{`${morayDetail.name_ja} - うつぼさいと`}</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">{morayDetail.name_ja}</Text>
      </Center>
      <Center>
        <Box w={{ base: '85%', lg: '100%', md: '85%' }}>
          <VStack>
            <Image alt="moray_image" borderRadius="full" boxSize="200px" src={`/moray_image/${morayDetail.avatar}`} />
            <Box pt="25px">
              <Text fontSize={'xl'}>{`英名　: ${morayDetail.name_en ?? '?'}`}</Text>
              <Text fontSize={'xl'}>{`学名　: ${morayDetail.name_academic ?? '?'}`}</Text>
              {/* <Text fontSize={'xl'}>分布: {morayDetail.distribution}</Text> */}
              <Text fontSize={'xl'}>{`最大長: ${morayDetail.max_length_str ?? '? cm'}`}</Text>
            </Box>
            <VStack pt="20px" w={{ base: '70%', lg: '35%', md: '45%' }}>
              <Text fontSize={'2xl'}>ひとことメモ</Text>
              <Text fontSize={'xl'}>{morayDetail.description ?? '調査中です！しばらくお待ちください。'}</Text>
            </VStack>
          </VStack>
          {morayDetail.video_url ? (
            <>
              <VStack>
                <VStack pt="20px" w={{ base: '70%', lg: '35%', md: '45%' }}>
                  <Text fontSize={'2xl'}>ウツボ動画</Text>
                </VStack>
              </VStack>
              <Flex justifyContent="center">
                <AspectRatio ratio={16 / 9} w={{ base: '100%', lg: '50%', md: '80%' }}>
                  <iframe allowFullScreen src={`https://www.youtube-nocookie.com/embed/${morayDetail.video_url}`} />
                </AspectRatio>
              </Flex>
            </>
          ) : null}
          <VStack py="25px" spacing={0}>
            <Text fontSize="2xl">このウツボが観られる水族館</Text>
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
        <Grid gap={8} justifyContent="center" templateColumns="repeat(auto-fit, 300px)">
          {morayDetail.aquaria.map((aquarium) => (
            <GridItem key={aquarium.id}>
              <LinkBox
                _hover={{ cursor: 'pointer', opacity: 0.8 }}
                bg="whiteAlpha.800"
                borderRadius="30px"
                h="250px"
                rounded="lg"
                shadow="lg"
                w="300px"
              >
                <Stack spacing={1} textAlign="center">
                  <Image
                    alt={aquarium.name}
                    m="auto"
                    pb="8px"
                    roundedTop="lg"
                    src={`/aquarium_image/${aquarium.image}`}
                  />
                  <LinkOverlay as={NextLink} fontSize="lg" fontWeight="bold" href={`/aquaria/${aquarium.id}`}>
                    {aquarium.name}
                  </LinkOverlay>
                  <Text>{aquarium.address_city}</Text>
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
                  onChange={(e) => setMorayCommentInput({ ...morayCommentInput, body: e.target.value })}
                  placeholder="コメントを入力"
                  value={morayCommentInput.body}
                  variant="outline"
                />
                <Box display="flex" justifyContent="flex-end" py={2}>
                  <Button
                    _hover={{ bg: 'blue.300' }}
                    bg="blue.500"
                    color="whiteAlpha.900"
                    isDisabled={morayCommentInput.body === '' || morayCommentInput.body?.length > 255}
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
      {morayComments.length ? (
        <VStack pb={8}>
          <Box w={{ base: '80%', lg: '50%', md: '70%' }}>
            {morayComments.map((morayComment) => (
              <>
                <Box py={4}>
                  <Box display="flex" justifyContent="space-between">
                    <HStack spacing={2}>
                      {morayComment.user.avatar ? (
                        <Avatar size={'md'} src={morayComment.user.avatar ?? undefined} />
                      ) : (
                        <Avatar size={'md'} src="/default-user-icon.png" />
                      )}
                      <Text fontSize="md">{morayComment.user.name}</Text>
                      <Text fontSize="xs">{elapsedTimeFromNow(morayComment.created_at)}</Text>
                    </HStack>
                    <Menu>
                      {isAuthor && morayComment.user.uid === userInfo.uid && (
                        <Box>
                          <MenuButton>
                            <Icon as={BsThreeDots} boxSize="20px" />
                          </MenuButton>
                          <MenuList>
                            {/* <MenuItem onClick={() => alert('updated!')}>編集する</MenuItem> */}
                            <MenuItem onClick={() => onDelete(morayComment.id)}>削除する</MenuItem>
                          </MenuList>
                        </Box>
                      )}
                    </Menu>
                  </Box>
                </Box>
                <Text fontSize="md" whiteSpace={'pre-wrap'}>
                  {morayComment.body}
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
