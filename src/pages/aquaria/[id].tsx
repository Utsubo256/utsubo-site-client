import { useEffect, useState } from 'react';

import { Box, Center, Image, Link, LinkBox, LinkOverlay, Stack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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

export default function AquariumDetail() {
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    if (router.isReady) {
      axios.get(`http://localhost:3000/api/v1/aquaria/${id}`).then((res) => setAquariumDetail(res.data));
    }
  }, [id, router]);
  return (
    <>
      <Head>
        <title>{aquariumDetail.name} - うつぼさいと</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">{aquariumDetail.name}</Text>
      </Center>
      <VStack>
        <Image
          alt={aquariumDetail.name}
          boxSize="200px"
          rounded={'lg'}
          src={`/aquarium_image/${aquariumDetail.image}`}
          w="300px"
        />
        {/* <Box w={{ lg: '50%', md: '60%', sm: '70%' }}> */}
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
      <VStack py="25px" spacing={0}>
        <Text fontSize="3xl">この水族館で観られるウツボ</Text>
        <Text color="red.500" fontSize="md">
          ※ご注意※
        </Text>
        <Text color="red.500" fontSize="md">
          展示されるウツボは通知無く変更される場合があります。
        </Text>
      </VStack>
      <Wrap justify="center" pb={8} spacing={8}>
        {aquariumDetail.morays.map((moray) => (
          <WrapItem key={moray.id} mx="auto">
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
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}
