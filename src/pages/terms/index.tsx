import { Box, Center, Divider, Text, ListItem, OrderedList, UnorderedList } from '@chakra-ui/react';
import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>利用規約 - うつぼさいと</title>
      </Head>
      <Center pt="25px">
        <Text fontSize="3xl">利用規約</Text>
      </Center>
      <Center>
        <Box w={{ lg: '55%', md: '70%', sm: '90%' }}>
          <Divider borderColor="black" />
          <Text py={8}>
            本利用規約（以下「本規約」といいます。）には、本サービスの提供条件及び本サイトの管理者（以下「管理者」といいます。）と登録ユーザーの皆様との間の権利義務関係が定められています。本サービスの利用に際しては、本規約の全文をお読みいただいたうえで、本規約に同意いただく必要があります。
          </Text>
          <Text fontSize={'xl'} fontWeight="bold">
            第1条（適用）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              本規約は、本サービスの提供条件及び本サービスの利用に関する管理者と登録ユーザーとの間の権利義務関係を定めることを目的とし、登録ユーザーと管理者との間の本サービスの利用に関わる一切の関係に適用されます。
            </ListItem>
            <ListItem>
              管理者は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
            </ListItem>
            <ListItem>
              本規約の内容と、前項のルールその他の本規約外における本サービスの説明等とが異なる場合は、本規約の規定が優先して適用されるものとします。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第2条（登録）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              本サービスにおいては、登録希望者が本規約に同意の上、管理者の定める方法によって利用登録を申請し、管理者がこの承認を登録希望者に通知することによって、利用登録が完了するものとします。
            </ListItem>
            <ListItem>
              管理者は、利用登録の申請者に以下の事由があると判断した場合、登録及び再登録を拒否することがあり、その理由については一切の開示義務を負いません。
            </ListItem>
            <OrderedList pl={5} spacing={2}>
              <ListItem>管理者に提供した登録事項の全部または一部につき虚偽、誤記または記載漏れがあった場合</ListItem>
              <ListItem>過去管理者との契約に違反した者またはその関係者であると管理者が判断した場合</ListItem>
              <ListItem>その他、登録を適当でないと管理者が判断した場合</ListItem>
            </OrderedList>
            <ListItem>
              前項に定める登録の完了時に、サービス利用契約が登録ユーザーと管理者の間に成立し、登録ユーザーは本サービスを本規約に従い利用することができるようになります。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第3条（パスワード及びユーザーIDの管理）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              登録ユーザーは、自己の責任において、本サービスに関するパスワード及びユーザーIDを適切に管理及び保管するものとし、これを第三者に利用させ、または貸与、譲渡、名義変更、売買等をしてはならないものとします。
            </ListItem>
            <ListItem>
              パスワードまたはユーザーIDの管理不十分、使用上の過誤、第三者の使用等によって生じた損害に関する責任は登録ユーザーが負うものとします。
            </ListItem>
            <ListItem>
              ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、管理者に故意又は重大な過失がある場合を除き、管理者は一切の責任を負わないものとします。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第4条（禁止事項）
          </Text>
          <Text pt={2} spacing={2}>
            登録ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると管理者が判断する行為をしてはなりません。
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>法令に違反する行為または犯罪行為に関連する行為</ListItem>
            <ListItem>管理者、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為</ListItem>
            <ListItem>公序良俗に反する行為</ListItem>
            <ListItem>
              管理者、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為
            </ListItem>
            <ListItem>
              本サービスを通じ、以下に該当し、または該当すると管理者が判断する情報を管理者または本サービスの他の利用者に送信すること
            </ListItem>
            <UnorderedList>
              <ListItem>過度に暴力的または残虐な表現を含む情報</ListItem>
              <ListItem>コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報</ListItem>
              <ListItem>
                管理者、本サービスの他の利用者またはその他の第三者の名誉または信用を毀損する表現を含む情報
              </ListItem>
              <ListItem>過度にわいせつな表現を含む情報</ListItem>
              <ListItem>差別を助長する表現を含む情報</ListItem>
              <ListItem>自殺、自傷行為を助長する表現を含む情報</ListItem>
              <ListItem>薬物の不適切な利用を助長する表現を含む情報</ListItem>
              <ListItem>反社会的な表現を含む情報</ListItem>
              <ListItem>チェーンメール等の第三者への情報の拡散を求める情報</ListItem>
              <ListItem>他人に不快感を与える表現を含む情報</ListItem>
            </UnorderedList>
            <ListItem>本サービスのネットワークまたはシステム等に過度な負荷をかける行為</ListItem>
            <ListItem>
              管理者が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為
            </ListItem>
            <ListItem>本サービスの運営を妨害するおそれのある行為</ListItem>
            <ListItem>本サービスのネットワークまたはシステム等への不正アクセス</ListItem>
            <ListItem>第三者に成りすます行為</ListItem>
            <ListItem>本サービスの他の利用者のIDまたはパスワードを利用する行為</ListItem>
            <ListItem>管理者が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</ListItem>
            <ListItem>本サービスの他の利用者の情報の収集</ListItem>
            <ListItem>管理者、本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為</ListItem>
            <ListItem>反社会的勢力等への利益供与</ListItem>
            <ListItem>前各号の行為を直接または間接に惹起し、または容易にする行為</ListItem>
            <ListItem>前各号の行為を試みること</ListItem>
            <ListItem>その他、管理者が不適切と判断する行為</ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第5条（本サービスの停止等）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              管理者は、以下のいずれかに該当する場合には、登録ユーザーに事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
            </ListItem>
            <OrderedList pl={5} spacing={2}>
              <ListItem>本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合</ListItem>
              <ListItem>
                コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合
              </ListItem>
              <ListItem>
                地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合
              </ListItem>
              <ListItem>その他、管理者が停止または中断を必要と判断した場合</ListItem>
            </OrderedList>
            <ListItem>
              管理者は、本サービスの提供の停止または中断により、登録ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第6条（権利帰属）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              本ウェブサイト及び本サービスに関する知的財産権は全て管理者または管理者にライセンスを許諾している者に帰属しており、本規約に基づく本サービスの利用許諾は、本ウェブサイトまたは本サービスに関する管理者にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。
            </ListItem>
            <ListItem>
              登録ユーザーは、投稿データについて、自らが投稿その他送信することについての適法な権利を有していること、及び投稿データが第三者の権利を侵害していないことについて、管理者に対し表明し、保証するものとします。
            </ListItem>
            <ListItem>
              登録ユーザーは、投稿データについて、管理者に対し、世界的、非独占的、無償、サブライセンス可能かつ譲渡可能な使用、複製、配布、派生著作物の作成、表示及び実行に関するライセンスを付与します。また、他の登録ユーザーに対しても、本サービスを利用して登録ユーザーが投稿その他送信した投稿データの使用、複製、配布、派生著作物を作成、表示及び実行することについての非独占的なライセンスを付与します。
            </ListItem>
            <ListItem>
              登録ユーザーは、管理者及び管理者から権利を承継しまたは許諾された者に対して著作者人格権を行使しないことに同意するものとします。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第7条（登録抹消等）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              管理者は、登録ユーザーが、以下の各号のいずれかの事由に該当する場合は、事前に通知または催告することなく、投稿データを削除もしくは非表示にし、当該登録ユーザーについて本サービスの利用を一時的に停止し、または登録ユーザーとしての登録を抹消することができます。
            </ListItem>
            <OrderedList pl={5} spacing={2}>
              <ListItem>本規約のいずれかの条項に違反した場合</ListItem>
              <ListItem>登録事項に虚偽の事実があることが判明した場合</ListItem>
              <ListItem>管理者からの問い合わせその他の回答を求める連絡に対して30日以上応答がない場合</ListItem>
              <ListItem>第2条第2項各号に該当する場合</ListItem>
              <ListItem>
                その他、管理者が本サービスの利用または登録ユーザーとしての登録の継続を適当でないと判断した場合
              </ListItem>
            </OrderedList>
            <ListItem>
              管理者は、本条に基づき管理者が行なった行為により登録ユーザーに生じた損害について、一切の責任を負わないものとします。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第8条（退会）
          </Text>
          <Text pt={2} spacing={2}>
            登録ユーザーは、管理者の定める退会手続により、本サービスから退会できるものとします。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第9条（本サービスの内容の変更、終了）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>管理者の都合により、本サービスの内容を変更し、または提供を終了することができます。</ListItem>
            <ListItem>本サービスの提供を終了する場合、管理者は登録ユーザーに事前に通知するものとします。</ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第10条（保証の否認及び免責）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              管理者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </ListItem>
            <ListItem>
              管理者は、本サービスに起因して登録ユーザーに生じたあらゆる損害について、管理者の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する管理者と登録ユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
            </ListItem>
            <ListItem>
              前項ただし書に定める場合であっても、管理者は、管理者の過失（重過失を除きます。）による債務不履行または不法行為により登録ユーザーに生じた損害のうち特別な事情から生じた損害（管理者または登録ユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
            </ListItem>
            <ListItem>
              管理者は、本サービスに関して、登録ユーザーと他の登録ユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第11条（秘密保持）
          </Text>
          <Text pt={2} spacing={2}>
            登録ユーザーは、本サービスに関連して管理者が登録ユーザーに対して秘密に取扱うことを求めて開示した非公知の情報について、管理者の事前の書面による承諾がある場合を除き、秘密に取扱うものとします。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第12条（利用者情報の取扱い）
          </Text>
          <Text pt={2} spacing={2}>
            管理者による登録ユーザーの利用者情報の取扱いについては、別途本サービスのプライバシーポリシーの定めによるものとし、登録ユーザーはこのプライバシーポリシーに従って管理者が登録ユーザーの利用者情報を取扱うことについて同意するものとします。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第13条（本規約等の変更）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>管理者が必要と認めた場合は、本規約を変更できるものとします。</ListItem>
            <ListItem>
              管理者は登録ユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第14条（連絡／通知）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              本サービスに関する問い合わせその他登録ユーザーから管理者に対する連絡または通知、及び本規約の変更に関する通知その他管理者から登録ユーザーに対する連絡または通知は、管理者の定める方法で行うものとします。
            </ListItem>
            <ListItem>
              管理者が登録事項に含まれるメールアドレスその他の連絡先に連絡または通知を行った場合、登録ユーザーは当該連絡または通知を受領したものとみなします。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第15条（サービス利用契約上の地位の譲渡等）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>
              登録ユーザーは、管理者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。
            </ListItem>
            <ListItem>
              管理者は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びに登録ユーザーの登録事項その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、登録ユーザーは、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。
            </ListItem>
          </OrderedList>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第16条（分離可能性）
          </Text>
          <Text pt={2} spacing={2}>
            本規約のいずれかの条項またはその一部が、消費者契約法その他の法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。
          </Text>

          <Text fontSize={'xl'} fontWeight="bold" pt="20px">
            第17条（準拠法及び管轄裁判所）
          </Text>
          <OrderedList pt={2} spacing={2}>
            <ListItem>本規約及びサービス利用契約の準拠法は日本法とします。</ListItem>
            <ListItem>
              本規約またはサービス利用契約に起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </ListItem>
          </OrderedList>

          <Text py={10}>【2023年5月3日制定】</Text>
        </Box>
      </Center>
    </>
  );
}
