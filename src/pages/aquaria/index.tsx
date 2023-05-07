import { useEffect, useState } from 'react';

import { Center, Image, LinkBox, LinkOverlay, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import NextLink from 'next/link';

type Aquarium = {
  address_city: string;
  id: number;
  image: string;
  name: string;
  region: string;
};

export default function Aquaria() {
  const [aquaria, setAquaria] = useState<Aquarium[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/aquaria`).then((res) => setAquaria(res.data));
  }, []);

  const aquaria_hokkaido = aquaria.filter((aquarium) => aquarium.region === '北海道');
  const aquaria_tohoku = aquaria.filter((aquarium) => aquarium.region === '東北');
  const aquaria_kanto = aquaria.filter((aquarium) => aquarium.region === '関東');
  const aquaria_chubu = aquaria.filter((aquarium) => aquarium.region === '中部');
  const aquaria_kinki = aquaria.filter((aquarium) => aquarium.region === '近畿');
  const aquaria_chugoku = aquaria.filter((aquarium) => aquarium.region === '中国');
  const aquaria_shikoku = aquaria.filter((aquarium) => aquarium.region === '四国');
  const aquaria_kyushu = aquaria.filter((aquarium) => aquarium.region === '九州');
  const aquaria_okinawa = aquaria.filter((aquarium) => aquarium.region === '沖縄');

  const aquaria_all_region = [
    { data: aquaria_hokkaido, region: '北海道' },
    { data: aquaria_tohoku, region: '東北' },
    { data: aquaria_kanto, region: '関東' },
    { data: aquaria_chubu, region: '中部' },
    { data: aquaria_kinki, region: '近畿' },
    { data: aquaria_chugoku, region: '中国' },
    { data: aquaria_shikoku, region: '四国' },
    { data: aquaria_kyushu, region: '九州' },
    { data: aquaria_okinawa, region: '沖縄' },
  ];

  return (
    <>
      <Head>
        <title>水族館一覧 - うつぼさいと</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">水族館一覧</Text>
      </Center>
      {aquaria_all_region.map((aquaria_region) => (
        <>
          <Center key={aquaria_region.region} py="25px">
            <Text fontSize="2xl">{aquaria_region.region}</Text>
          </Center>
          <Wrap justify="center" pb={8} spacing={8}>
            {aquaria_region.data.map((aquarium) => (
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
      ))}
    </>
  );
}
