import { useEffect, useState } from 'react';

import { Center, Image, LinkBox, LinkOverlay, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';

type Moray = {
  avatar: string;
  id: number;
  max_length: number;
  max_length_str: string;
  name_en: string;
  name_ja: string;
};

export default function Morays() {
  const [morays, setMorays] = useState<Moray[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/morays').then((res) => setMorays(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>ウツボ一覧 - うつぼさいと</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">ウツボ一覧</Text>
      </Center>
      <Wrap justify="center" pb={8} spacing={8}>
        {morays.map((moray) => (
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
                  src={`moray_image/${moray.avatar}`}
                />
                <LinkOverlay fontSize="xl" fontWeight="bold" href={`morays/${moray.id}`}>
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
