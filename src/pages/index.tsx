import { Box, Button, Center, Divider, SimpleGrid, Stack, Text, VStack, Image } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function LP() {
  const router = useRouter();

  const goToEachPages = async (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>ホーム - うつぼさいと</title>
      </Head>
      <Box
        alignItems="center"
        bgImage="url('/hero-image.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        display="flex"
        h="calc(100vh - 64px)"
        justifyContent="center"
        w={'full'}
      >
        <VStack>
          <Text
            color="whiteAlpha.900"
            fontSize={{ base: '2xl', lg: '6xl', md: '5xl', sm: '3xl' }}
            mt="50px"
            textShadow="1px 1px 5px gray"
          >
            ウツボを知って、観に行こう。
          </Text>
          <Text color="whiteAlpha.900" fontSize={{ base: '2xl', lg: '4xl', md: '3xl' }} textShadow="1px 1px 5px gray">
            あなたもウツボがもっと好きになる
          </Text>
        </VStack>
      </Box>
      <Box display="flex" justifyContent="center" minH="calc(100vh - 61px)">
        <VStack pb={8}>
          <Box h="64px"></Box>
          <Center pt="35px">
            <Text fontSize="3xl">このサイトでできること</Text>
          </Center>
          <Divider borderColor="black" />
          <SimpleGrid columns={{ base: 1, md: 2 }} pt={8} spacing={100} textAlign="center">
            <Stack>
              <Text fontSize={'2xl'}>ウツボを知る</Text>
              <Text>ウツボといっても、縞模様や斑点があったり、</Text>
              <Text>鮮やかな色をしていたり…様々な特徴を持っています。</Text>
              <Text>そんなウツボたちをイラスト付きでご紹介します。</Text>
              <Center>
                <Image
                  alt="moray_image"
                  borderRadius="full"
                  h="200px"
                  m="auto"
                  src={'moray_image/kidako-moray.png'}
                  w="200px"
                />
              </Center>
              <Center>
                <Button
                  _hover={{
                    bg: 'blue.300',
                  }}
                  bg="blue.500"
                  color="whiteAlpha.900"
                  mt="8px"
                  onClick={() => goToEachPages('/morays')}
                  rounded={'full'}
                  w="100px"
                >
                  <Text>見てみる</Text>
                </Button>
              </Center>
            </Stack>
            <Stack>
              <Text fontSize="2xl">ウツボを観に行く</Text>
              <Text>ウツボを知った後は、早速観に行きましょう！</Text>
              <Text>こちらのページでは、日本全国の</Text>
              <Text>ウツボがいる水族館をご紹介します。</Text>
              <Image
                alt="aquarium_image"
                borderRadius="10px"
                h="200px"
                m="auto"
                src={'/aquarium_image/lp-aquarium.jpg'}
              />
              <Center>
                <Button
                  _hover={{
                    bg: 'blue.300',
                  }}
                  bg="blue.500"
                  color="whiteAlpha.900"
                  mt="8px"
                  onClick={() => goToEachPages('/aquaria')}
                  rounded={'full'}
                  w="100px"
                >
                  <Text>見てみる</Text>
                </Button>
              </Center>
            </Stack>
          </SimpleGrid>
        </VStack>
      </Box>
    </>
  );
}
