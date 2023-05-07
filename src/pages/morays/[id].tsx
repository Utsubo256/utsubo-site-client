import { useEffect, useState } from 'react';

import { Box, Center, Image, LinkBox, LinkOverlay, Stack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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

export default function MorayDetail() {
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    if (router.isReady) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/morays/${id}`).then((res) => setMorayDetail(res.data));
    }
  }, [id, router]);

  return (
    <>
      <Head>
        <title>{`${morayDetail.name_ja} - うつぼさいと`}</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">{morayDetail.name_ja}</Text>
      </Center>

      <VStack>
        <Image alt="moray_image" borderRadius="full" boxSize="200px" src={`/moray_image/${morayDetail.avatar}`} />
        <Box pt="25px">
          <Text fontSize={'xl'}>{`英名　: ${morayDetail.name_en ?? '???'}`}</Text>
          <Text fontSize={'xl'}>{`学名　: ${morayDetail.name_academic ?? '???'}`}</Text>
          {/* <Text fontSize={'xl'}>分布: {morayDetail.distribution}</Text> */}
          <Text fontSize={'xl'}>{`最大長: ${morayDetail.max_length_str ?? '???cm'}`}</Text>
        </Box>
        <VStack pt="20px" w={{ lg: '35%', md: '45%', sm: '70%' }}>
          <Text fontSize={'2xl'}>ひとことメモ</Text>
          <Text fontSize={'xl'}>{morayDetail.description ?? '調査中です！しばらくお待ちください。'}</Text>
        </VStack>
      </VStack>

      <VStack py="25px" spacing={0}>
        <Text fontSize="3xl">このウツボが観られる水族館</Text>
        <Text color="red.500" fontSize="md">
          ※ご注意※
        </Text>
        <Text color="red.500" fontSize="md">
          展示されるウツボは通知無く変更される場合があります。
        </Text>
      </VStack>
      <Wrap justify="center" pb={8} spacing={8}>
        {morayDetail.aquaria.map((aquarium) => (
          <WrapItem key={aquarium.id} mx="auto">
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
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}
