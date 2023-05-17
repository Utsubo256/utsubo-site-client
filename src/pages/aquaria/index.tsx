import { useEffect, useState } from 'react';

import { Box, Center, Grid, GridItem, Image, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
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

  return (
    <>
      <Head>
        <title>水族館一覧 - うつぼさいと</title>
      </Head>
      <Center py="25px">
        <Text fontSize="3xl">水族館一覧</Text>
      </Center>
      <Box m="auto" pb={8} w="90%">
        <Grid gap={8} justifyContent="center" templateColumns="repeat(auto-fit, 300px)">
          {aquaria.map((aquarium) => (
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
    </>
  );
}
