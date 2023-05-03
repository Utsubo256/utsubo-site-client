import { Box, Center, Divider, Link, Text, ListItem, UnorderedList } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>プライバシーポリシー - うつぼさいと</title>
      </Head>
      <Center pt="25px">
        <Text fontSize="3xl">プライバシーポリシー</Text>
      </Center>
      <Center>
        <Box w={{ lg: '55%', md: '70%', sm: '90%' }}>
          <Divider borderColor="black" />
          <Text py={8}>
            うつぼさいとの管理者（以下、「管理者といいます。」）は、本ウェブサイト上で提供するサービス（以下「本サービス」といいます。）における、ユーザーについての個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold">
            第1条（収集する利用者情報）
          </Text>
          <Text pt={2} spacing={2}>
            本サービスは、ユーザーから以下の情報を取得します。
          </Text>
          <UnorderedList pl={5} pt={2}>
            <ListItem>ユーザーネーム</ListItem>
            <ListItem>メールアドレス</ListItem>
            <ListItem>プロフィール画像</ListItem>
            <ListItem>
              外部サービスでユーザーが利用するID、その他外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報
            </ListItem>
            <ListItem>Cookie（クッキー）を用いて生成された識別情報</ListItem>
          </UnorderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第2条（利用目的）
          </Text>
          <Text pt={2} spacing={2}>
            本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下のとおりです。
          </Text>
          <UnorderedList pl={5} pt={2}>
            <ListItem>本サービスに関する登録の受付、本人確認、ユーザー認証、ユーザー設定の記録</ListItem>
            <ListItem>ユーザーの本サービスの利用履歴を管理するため</ListItem>
            <ListItem>本サービスの向上、改善に向けた情報収集及び、新たなサービスを開発するため</ListItem>
            <ListItem>本サービスに関するご案内、お問い合わせ等への対応のため</ListItem>
            <ListItem>
              本サービスに関する当社の規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため
            </ListItem>
            <ListItem>本サービスに関する規約等の変更などを通知するため</ListItem>
            <ListItem>以上の他、本サービスの提供、維持、保護及び改善のため</ListItem>
          </UnorderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第3条（安全管理のために講じた措置）
          </Text>
          <Text pt={2} spacing={2}>
            管理者が、ユーザーから取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第4条（第三者提供）
          </Text>
          <Text pt={2} spacing={2}>
            管理者は、利用者情報のうち、個人情報については、あらかじめユーザーの同意を得ないで、第三者（日本国外にある者を含みます。）に提供しません。但し、次に掲げる必要があり第三者（日本国外にある者を含みます。）に提供する場合はこの限りではありません。
          </Text>
          <UnorderedList pl={5} pt={2}>
            <ListItem>
              管理者が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
            </ListItem>
            <ListItem>合併その他の事由による事業の承継に伴って個人情報が提供される場合</ListItem>
            <ListItem>
              国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合
            </ListItem>
            <ListItem>
              その他、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）その他の法令で認められる場合
            </ListItem>
          </UnorderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第5条（アクセス解析ツール）
          </Text>
          <Text pt={2} spacing={2}>
            管理者は、ユーザーのアクセス解析のために、「Googleアナリティクス」を利用しています。
            Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。
            詳しくはお使いのブラウザの設定をご確認ください。 Googleアナリティクスについて、詳しくは
            <Link
              as={NextLink}
              color="blue.400"
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              isExternal
            >
              こちら
            </Link>
            からご確認ください。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第6条（プライバシーポリシーの変更）
          </Text>
          <Text pt={2} spacing={2}>
            管理者は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第7条（お問い合わせ窓口）
          </Text>
          <Text pt={2} spacing={2}>
            ご意見、ご質問、苦情のお申出その他利用者情報の取扱いに関するお問い合わせは、管理者TwitterアカウントのDMにてご連絡ください。
          </Text>

          <Text py={10}>【2023年5月3日制定】</Text>
        </Box>
      </Center>
    </>
  );
}
