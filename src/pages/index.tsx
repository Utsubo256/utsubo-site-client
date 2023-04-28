import { Box, Button, Center, Divider, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function LP() {
  const router = useRouter();

  const gotomorays = async (path) => {
    router.push(path);
    console.log(path);
  };

  return (
    <>
      <Box
        alignItems="center"
        bgImage="url('hero-image.jpg')"
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
            fontSize={{ lg: '6xl', md: '5xl', sm: '4xl' }}
            mt="50px"
            textShadow="1px 1px 5px gray"
          >
            ウツボを知って、観に行こう。
          </Text>
          <Text color="whiteAlpha.900" fontSize={{ lg: '4xl', md: '3xl', sm: '2xl' }} textShadow="1px 1px 5px gray">
            あなたもウツボがもっと好きになる
          </Text>
        </VStack>
      </Box>
      <Box alignItems="center" display="flex" h="calc(100vh - 61px)" justifyContent="center">
        <VStack>
          <Text fontSize={{ base: '3xl', lg: '3xl' }}>このサイトでできること</Text>
          <Divider borderColor="black" />
          <SimpleGrid columns={{ base: 1, md: 2 }} pt={8} spacing={100} textAlign="center">
            <Stack>
              <Text fontSize="2xl">ウツボを知る</Text>
              <Text>どんなウツボがいるの？</Text>
              <Text>生息地はどこ？</Text>
              <Text>そんな疑問に答えます。</Text>
              <Center>
                <Button
                  bg="blue.500"
                  color="whiteAlpha.900"
                  mt="8px"
                  onClick={() => gotomorays('/morays')}
                  rounded={'full'}
                  w="100px"
                >
                  <Text>見てみる</Text>
                </Button>
              </Center>
            </Stack>
            <Stack>
              <Text fontSize="2xl">ウツボを観に行く</Text>
              <Text>日本全国にある</Text>
              <Text>ウツボがいる水族館を</Text>
              <Text>ご紹介します。</Text>
              <Center>
                <Button
                  bg="blue.500"
                  color="whiteAlpha.900"
                  mt="8px"
                  onClick={() => gotomorays('/aquaria')}
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
